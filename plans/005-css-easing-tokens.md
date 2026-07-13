# 005 — Consolidate CSS transitions to use the same easing token as Framer Motion

- **Status**: TODO
- **Commit**: 81bbc16
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 2 files (globals.css + Tailwind config), then apply to components

## Problem

Framer Motion animations use the custom EASE token `cubic-bezier(0.22, 1, 0.36, 1)` — a premium ease-out curve. But CSS transitions (hover effects, form focus states) use Tailwind's default `ease` = `cubic-bezier(0.25, 0.1, 0.25, 1)`, which is weaker and has a different feel. Users perceive this as inconsistent motion quality — JS-animated elements feel polished, CSS-hover elements feel generic.

The mismatch is visible everywhere a `transition-*` class is used without an explicit easing. Affected files include all CSS-based hover effects in AboutContent, Contact, Hero, Nav, Products, QuoteTool, Services, and Footer.

## Target

Make CSS transitions use the same easing as Framer Motion animations. Two approaches — pick one:

**Approach A (Tailwind v4)** — Define the custom curve in Tailwind:
```css
/* Already in globals.css: */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```
Then add to `@theme` block in `globals.css`:
```css
@theme inline {
  /* ... existing ... */
  --ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
}
```
Then apply via `transition ease-premium` in classes.

**Approach B (simpler)** — Override the CSS `transition` property at the root:
```css
/* not recommended — too aggressive */
```

**Approach C (recommended — minimal blast radius)** — Use Tailwind's arbitrary value:
```css
ease-[cubic-bezier(0.22,1,0.36,1)]
```
Append this to every `transition-*` class that already has an explicit `duration-*`. This is the most targeted fix and matches the existing `ease-[cubic-bezier(0.22,1,0.36,1)]` already used in Products.tsx:111.

### Existing exemplar (Products.tsx:111 — already uses the correct easing for CSS):
```tsx
className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
```

## Steps

### Step 1 — Add a CSS variable in globals.css
Add to the `@theme inline` block:
```css
--ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
```

### Step 2 — Key CSS transitions to update
Focus on the highest-visibility CSS hover effects listed in Plan 002. After Plan 002 replaces `transition-all` with explicit properties, add the easing:

For each `transition-[props] duration-XXX`, append `ease-premium`:
```tsx
// Before (after Plan 002):
transition-[transform,box-shadow] duration-500

// After:
transition-[transform,box-shadow] duration-500 ease-premium
```

Wait — Tailwind v4 uses `ease-*` tokens from the config, and `--ease-premium` must be defined via `@theme`. Since the existing `globals.css` already has `--ease-out: ...` as a vanilla CSS variable (not in `@theme`), the cleanest path is:

**Use Tailwind v4 arbitrary easing directly:**
```tsx
transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
```

### Step 3 — Apply to these specific files
Files with CSS `transition-*` hover effects (after Plan 002 is done):

| File | Lines | Change |
|---|---|---|
| Nav.tsx | 31, 38 | `duration-500` → `duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]` |
| Hero.tsx | 90, 101 | `duration-300` → `duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]` |
| Contact.tsx | 103, 116, 121 | append easing to each |
| ProductsContent.tsx | 138, 273, 281 | append easing to each |
| AboutContent.tsx | 161, 200, 206, 212 | append easing to each |
| Services.tsx | 76 | `duration-500` → `duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]` |
| Footer.tsx | 41, 62, 68 | `duration-300` → `duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]` |

## Boundaries

- Do NOT change the EASE constant in Framer Motion files — it's already correct.
- Do NOT change JS-animated properties — only CSS `transition-*` classes.
- Skip `transition-colors duration-300` without explicit easing in Footer — low priority, can be done in bulk.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: Hover over buttons, cards, nav links. The hover transition should feel smoother and more premium — the difference is subtle (10% curve change) but cumulative.
- **DevTools**: Inspect a button, check the `transition` computed property includes `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Done when**: All `duration-300` and `duration-500` CSS transition classes also carry an explicit easing that matches the Framer Motion EASE token.
