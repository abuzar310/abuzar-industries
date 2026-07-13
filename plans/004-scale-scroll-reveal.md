# 004 — Add scale 0.97 to scroll-revealed sections for physical entrance

- **Status**: TODO
- **Commit**: 81bbc16
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 4 files, ~10 lines

## Problem

Fade-in entrances (`opacity: 0 → 1`) with no scale change make elements feel like they materialize from nothing. The AUDIT says: "Nothing in the real world appears from nothing." Every entrance should scale from 0.97–0.9 + fade.

Current code in every scroll-reveal component:

**AboutContent.tsx:32-33** (section header)
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

**AboutContent.tsx:157** (value cards)
```tsx
initial={{ opacity: 0, y: 20 }}
```

**AboutContent.tsx:182** (CTA section)
```tsx
initial={{ opacity: 0, y: 20 }}
```

**ContactContent.tsx:42-43** (section header)
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

**ContactContent.tsx:67-68** (info cards, enter from left)
```tsx
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
```

**ContactContent.tsx:121-122** (form, enter from right)
```tsx
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
```

**ProductsContent.tsx:107-108** (section header)
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

**ProductsContent.tsx:134** (product cards)
```tsx
initial={{ opacity: 0, y: 24 }}
```

**ProductsContent.tsx:243** (bottom CTA)
```tsx
initial={{ opacity: 0, y: 20 }}
```

**Reveal.tsx:27** (shared scroll-reveal — does NOT have scale)
```tsx
initial={{ opacity: 0, y }}
whileInView={{ opacity: 1, y: 0 }}
```

**Services.tsx:58-69** (uses `Reveal` and `StaggerItem` components — Reveal.tsx handles its animation; Services wrap doesn't have its own `animate`)

## Target

Add `scale: 0.97` to every `initial` state and `scale: 1` to every `animate`/`whileInView` state for scroll-revealed content. This gives a subtle "inhale" effect as elements settle into view.

```tsx
// before
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// after
initial={{ opacity: 0, y: 20, scale: 0.97 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
```

**⚠️ With Plan 001 applied first:** The transform string version should read:
```tsx
initial={{ opacity: 0, transform: "translateY(20px) scale(0.97)" }}
animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
```

If Plan 001 is NOT applied yet, use the shorthand `scale:` above. Both plans use the same files — **apply Plan 001 first**, then add `scale(0.97)` to the existing transform strings.

## Steps

Apply these changes AFTER Plan 001 has been executed (so the transform strings are in place):

### Step 1 — Reveal.tsx:27
```tsx
// Before (with Plan 001 applied):
initial={{ opacity: 0, transform: `translateY(${y}px)` }}
whileInView={{ opacity: 1, transform: "translateY(0px)" }}

// After:
initial={{ opacity: 0, transform: `translateY(${y}px) scale(0.97)` }}
whileInView={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
```

### Step 2 — AboutContent.tsx:32-33
```tsx
// Before:
initial={{ opacity: 0, transform: "translateY(20px)" }}
animate={{ opacity: 1, transform: "translateY(0px)" }}

// After:
initial={{ opacity: 0, transform: "translateY(20px) scale(0.97)" }}
animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
```
Repeat for line 57, 140, 157, 182.

### Step 3 — ContactContent.tsx:42-43 (same pattern)
### Step 4 — ContactContent.tsx:67-68
```tsx
initial={{ opacity: 0, transform: "translateX(-20px) scale(0.97)" }}
animate={{ opacity: 1, transform: "translateX(0px) scale(1)" }}
```
### Step 5 — ContactContent.tsx:121-122 (same, but `translateX(20px)`)
### Step 6 — ProductsContent.tsx:107-108, 134, 243 (same pattern)

## Boundaries

- Do NOT add scale to the Preloader — it already has `scale: 0.82 → 1`.
- Do NOT add scale to Nav entrance.
- Do NOT add scale to DeliveryMap — it uses offset-based motion.
- Keep `transform-origin` as default (center) — it's correct for scroll-revealed content.
- Must be applied AFTER Plan 001 since it builds on the transform string format.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: Scroll down through About, Contact, Products pages. Each section should have a subtle "breathe in" effect as it enters — elements shrink-into-view rather than pure-fading. The effect should be almost imperceptible at normal scroll speed — visible only when scrolling slowly.
- **DevTools**: In Animations panel set to 25% speed. Confirm each section scales from 0.97 → 1.
- **Done when**: All scroll-revealed entrance transforms in these 4 files include `scale(0.97)` in their initial state.
