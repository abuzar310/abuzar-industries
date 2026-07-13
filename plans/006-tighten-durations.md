# 006 — Tighten animation durations for snappier feel

- **Status**: TODO
- **Commit**: 81bbc16
- **Severity**: LOW
- **Category**: Easing & duration
- **Estimated scope**: 4 files, ~10 lines

## Problem

Several decorative animations run longer than the AUDIT's recommended maximum for their category. While marketing animations can be longer, the current spreads feel slow on repeat view:

| Location | Current | Audit max | Delta |
|---|---|---|---|
| Preloader logo scale-in | 0.9s | — (marketing) | fine |
| Preloader progress bar | 1.4s | — | feels long on revisit |
| Preloader wordmark reveal | 0.8s | — | fine |
| Hero video fade-in | 1s | 0.6-0.8s | +25% slow |
| Service card hover | 500ms | 200-300ms | +67% slow |
| Service card image zoom | 700ms | 300-500ms | could be snappier |
| Stagger item entrance | 700ms | 500-600ms | slight |

## Target

Tighten the most noticeable long durations:

- `Services.tsx:90` — image zoom on hover: `duration-700` → `duration-500`
- `Services.tsx:76` — card hover: `duration-500` → `duration-300`
- `Services.tsx:117` — decorative line: `duration-500` → `duration-400`
- `HeroVideo.tsx:28` — video fade-in: `duration-700` → `duration-500`
- `VideoFrame.tsx:41` — generic video fade: `duration-700` → `duration-500`
- `Preloader.tsx:71` — progress bar: `duration: 1.4` → `1.0`
- `Reveal.tsx:29` — reveal duration: `0.8` → `0.6` (matches stagger child duration)
- `Reveal.tsx:42` — stagger child duration: `0.7` → `0.6` (already close)
- `Patterns.tsx:68` — word reveal per-word: `0.6` → `0.45`

## Steps

### Step 1 — Services.tsx:90
```tsx
// Before
className="object-cover transition-transform duration-700 group-hover:scale-105"
// After
className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
```

### Step 2 — Services.tsx:76
The card hover uses Tailwind's duration utility, and the `transition-[transform,box-shadow]` from Plan 002. Change `duration-500` → `duration-300`.

### Step 3 — Services.tsx:117
```tsx
// Before
className="mt-4 h-px w-0 bg-gradient-to-r from-ochre to-transparent transition-[width] duration-500 group-hover:w-full"
// After
className="mt-4 h-px w-0 bg-gradient-to-r from-ochre to-transparent transition-[width] duration-400 group-hover:w-full"
```

### Step 4 — HeroVideo.tsx:28
```tsx
// Before
className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
// After
className={`h-full w-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
```

### Step 5 — VideoFrame.tsx:41 (same change, `duration-700` → `duration-500`)

### Step 6 — Preloader.tsx:71
```tsx
// Before
transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
// After
transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
```

### Step 7 — Reveal.tsx:29
```tsx
// Before
transition={{ duration: 0.8, delay, ease: EASE }}
// After
transition={{ duration: 0.6, delay, ease: EASE }}
```

### Step 8 — Patterns.tsx:68
```tsx
// Before
transition={{ duration: 0.6, delay: i * 0.04, ease: EASE }}
// After
transition={{ duration: 0.45, delay: i * 0.03, ease: EASE }}
```
(Reduce stagger gap from 40ms to 30ms for faster word animation)

## Boundaries

- Do NOT change durations in Hero.tsx — the hero entrance is a first-impression moment where 0.85s is appropriate.
- Do NOT change the Preloader overall timing (2100ms timeout) — only the progress bar fill duration.
- Do NOT touch Nav entrance or Preloader exit — they're correctly paced.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: Refresh the page. The preloader should feel leaner. Hover over service cards — the zoom and lift should feel immediate. Scroll through a word-reveal heading — words arrive faster.
- **DevTools**: Time each animation in the Animations panel and confirm new durations.
- **Done when**: All changed durations match the target values above, and the overall feel is snappier but still premium.
