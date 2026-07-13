# 001 — Use transform string instead of Framer Motion shorthand props

- **Status**: TODO
- **Commit**: 81bbc16
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 7 files, ~40 lines changed

## Problem

Framer Motion shorthand props (`y`, `x`, `scale`) run on the main thread, not GPU-accelerated. Under scroll or load they drop frames. The AUDIT specifies animating `transform` directly via the full transform string instead.

Affected files (every `animate={{ y: …, x: …, scale: … }}`):

**Hero.tsx:132** — current:
```tsx
animate={{ opacity: 1, scale: 1 }}
```

**Hero.tsx:50-55** — current:
```tsx
initial="hidden"
animate="visible"
```
(uses `fadeUp` variants that set `y: 0`, `opacity: 1`)

**Preloader.tsx:50** — current:
```tsx
animate={{ opacity: 1, scale: 1, y: 0 }}
```

**Preloader.tsx:59** — current:
```tsx
animate={{ y: 0 }}
```

**Reveal.tsx:27-29** — current:
```tsx
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, delay, ease: EASE }}
```

**Patterns.tsx:67** — current:
```tsx
animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
```

**Reveal.tsx:41-42** (StaggerItem) — current:
```tsx
child: {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
```

**AboutContent.tsx:32-33**, **ContactContent.tsx:42-43**, **ProductsContent.tsx:107-108** — current:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

**ContactContent.tsx:67-68** — current:
```tsx
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
```

**ContactContent.tsx:121-122** — current:
```tsx
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
```

**Nav.tsx:29** — current:
```tsx
animate={{ y: 0, opacity: 1 }}
```

## Target

Replace every `y` → `transform: "translateY(…)"`, every `x` → `transform: "translateX(…)"`, every `scale` → `transform: "scale(…)"`. Combine when both translate and scale appear. Framer Motion supports `transform` string and auto-detects it for GPU compositing.

```tsx
// before
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// after
initial={{ opacity: 0, transform: "translateY(20px)" }}
animate={{ opacity: 1, transform: "translateY(0px)" }}
```

When scale is combined:
```tsx
// before
initial={{ opacity: 0, scale: 0.82, y: 8 }}
animate={{ opacity: 1, scale: 1, y: 0 }}

// after
initial={{ opacity: 0, transform: "scale(0.82) translateY(8px)" }}
animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
```

## Repo conventions to follow

- Easing token `EASE = [0.22, 1, 0.36, 1]` is defined in each file that uses it — do not change easing, only the animated property.
- The project uses Tailwind v4 + Framer Motion. CSS transitions remain unchanged — this plan touches only Framer Motion `animate`/`initial`/`variants` props.
- Pattern exemplar: the DeliveryMap already uses `style={{ offsetPath: … }}` for GPU-friendly animation — mimic the approach of avoiding JS-driven shorthand.

## Steps

### Step 1 — Hero.tsx
1. Line 132: replace `animate={{ opacity: 1, scale: 1 }}` → `animate={{ opacity: 1, transform: "scale(1)" }}`
2. The `fadeUp` variant (line 10-16) uses `y: 0` — this is a variant object, not inline. Replace `y: 0` → `transform: "translateY(0)"` and `y: 28` → `transform: "translateY(28px)"`.

### Step 2 — Preloader.tsx
1. Line 49-51: replace `initial={{ opacity: 0, scale: 0.82, y: 8 }}` → `initial={{ opacity: 0, transform: "scale(0.82) translateY(8px)" }}`
2. Line 50: replace `animate={{ opacity: 1, scale: 1, y: 0 }}` → `animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}`
3. Line 58-59: replace `initial={{ y: "110%" }}` → `initial={{ transform: "translateY(110%)" }}`
4. Line 59: replace `animate={{ y: 0 }}` → `animate={{ transform: "translateY(0%)" }}`

### Step 3 — Reveal.tsx
1. Line 27: replace `initial={{ opacity: 0, y }}` → `initial={{ opacity: 0, transform: "translateY(26px)" }}` (hardcode `26` since it's the default)
   — Note: `y` is a prop with default `26`. Replace the template: `initial={{ opacity: 0, transform: \`translateY(${y}px)\` }}`
2. Line 27: replace `whileInView={{ opacity: 1, y: 0 }}` → `whileInView={{ opacity: 1, transform: "translateY(0px)" }}`
3. Line 41-42: replace `hidden: { opacity: 0, y: 24 }` → `hidden: { opacity: 0, transform: "translateY(24px)" }`
4. Line 42: replace `show: { opacity: 1, y: 0, ... }` → `show: { opacity: 1, transform: "translateY(0px)", ... }`

### Step 4 — Patterns.tsx
1. Line 67: replace `animate={inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}` →
   `animate={inView ? { transform: "translateY(0%)", opacity: 1 } : { transform: "translateY(110%)", opacity: 0 }}`

### Step 5 — AboutContent.tsx
1. **Line 32-33**: replace `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` → `initial={{ opacity: 0, transform: "translateY(20px)" }} animate={{ opacity: 1, transform: "translateY(0px)" }}`
2. **Line 57**: same change for `initial`
3. **Line 140**: same change
4. **Line 157**: `initial={{ opacity: 0, y: 20 }}` → `initial={{ opacity: 0, transform: "translateY(20px)" }}`
5. **Line 182**: same

### Step 6 — ContactContent.tsx
1. **Line 42-43**: same `y: 20` → `transform: "translateY(20px)"` swap
2. **Line 67-68**: `initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}` → `initial={{ opacity: 0, transform: "translateX(-20px)" }} animate={{ opacity: 1, transform: "translateX(0px)" }}`
3. **Line 121-122**: `initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}` → `initial={{ opacity: 0, transform: "translateX(20px)" }} animate={{ opacity: 1, transform: "translateX(0px)" }}`

### Step 7 — ProductsContent.tsx
1. **Line 107-108**: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` → same swap
2. **Line 134**: `initial={{ opacity: 0, y: 24 }}` → `initial={{ opacity: 0, transform: "translateY(24px)" }}`
3. **Line 243**: same

### Step 8 — Nav.tsx
1. **Line 29**: `animate={{ y: 0, opacity: 1 }}` → `animate={{ transform: "translateY(0px)", opacity: 1 }}`

## Boundaries

- Do NOT touch DeliveryMap.tsx — it uses `offsetDistance` and `scale` keyframes safely.
- Do NOT touch the `EASE` constant or any duration values.
- Do NOT change CSS classes or Tailwind utilities.
- Do NOT modify `Hero.tsx` variants `fadeUp` — only inline animate/initial props.
- When `y` or `x` use pixel values (numbers), append `px`. When they use percentage strings, append `%`.

## Verification

- **Mechanical**: `npm run build` passes with no type errors.
- **Feel check**: Open the page, scroll through hero → about → products. All entrance animations should feel identical to before — the change is purely behind-the-scenes GPU routing.
- **DevTools**: In the Performance panel, record a scroll pass. Confirm no forced layouts from the animations. Compare before/after frame rate.
- **Done when**: All `y`, `x`, `scale` shorthand props across these 7 files are replaced with explicit `transform:` strings, and the build passes.
