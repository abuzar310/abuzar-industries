# 003 — Gate hover transforms behind (hover: hover) and (pointer: fine)

- **Status**: TODO
- **Commit**: 81bbc16
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 6 files, ~10 lines

## Problem

Several elements use `hover:` Tailwind utilities that apply `scale`, `translateY`, `rotate` on hover. On touch devices, `:hover` fires on first tap and can trigger a "sticky hover" state — the element stays visually transformed after the tap ends, sometimes until the user taps elsewhere.

The AUDIT specifies:
```css
@media (hover: hover) and (pointer: fine) {
  .element:hover { transform: scale(1.05); }
}
```

Affected locations:

**Nav.tsx:45** — logo rotates + scales on hover
```tsx
className="w-10 h-10 object-contain transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-105"
```

**Services.tsx:76** — service card lifts on hover
```tsx
className="group relative h-full rounded-2xl overflow-hidden border border-walnut/10 bg-paper transition-all duration-500 hover:shadow-lg hover:shadow-walnut/15 hover:-translate-y-1"
```

**Services.tsx:90** — image zooms within card
```tsx
className="object-cover transition-transform duration-700 group-hover:scale-105"
```

**Hero.tsx:90** — CTA buttons have active scale
```tsx
active:scale-[0.98]
```
Note: `active:` is touch-safe — fine on mobile. Only `hover:` transforms are problematic.

**ProductsContent.tsx:165** — product image zoom
```tsx
className="object-cover group-hover:scale-105 transition-transform duration-500"
```

**ProductsContent.tsx:138** — product card lift
```tsx
className="group rounded-2xl bg-paper border border-walnut/5 hover:border-ochre/20 hover:shadow-xl hover:shadow-ochre/5 transition-all duration-300 overflow-hidden"
```
Note: this one only changes `border-color` and `box-shadow` on hover, not transform — the sticky-hover problem is less severe for non-transform properties. Still, consider gating `hover:shadow-*` behind pointer check.

**Process.tsx:62** — icon background hover
```tsx
className="w-11 h-11 rounded-xl bg-ochre/10 grid place-items-center transition-colors duration-300 group-hover:bg-ochre/20"
```
This is `transition-colors` only — no transform. Not a sticky-hover concern.

**Products.tsx:111** — zoom on hover
```tsx
className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
```

## Target

Hover transforms (scale, rotate, translate) should only apply when the device has a hover-capable pointer. On touch devices, these transforms should not apply.

The cleanest approach for this codebase: use a CSS custom property to gate hover transforms:

```css
/* in globals.css, add */
@media (hover: hover) and (pointer: fine) {
  .hover-lift:hover { transform: translateY(-4px); }
  .hover-scale:hover { transform: scale(1.05); }
  .hover-rotate:hover { transform: rotate(-4deg) scale(1.05); }
}
```

Then replace Tailwind `group-hover:` utilities with these classes. However, this adds CSS classes and changes the markup approach.

**Alternative (simpler — Tailwind v4 only):** Use Tailwind's `hover:` prefix which already only fires on devices that support hover — Tailwind v4's `hover:` is equivalent to `@media (hover: hover) { &:hover { … } }`. Confirm this by inspecting the compiled CSS.

Actually, Tailwind v4 compiles `hover:` to `:hover` without media query — so it will fire on touch. The safest path is to wrap in `@media (hover: hover)` in the CSS layer.

**Simplest fix — keep as-is if active:scale is the only concern:** `active:` only fires during press, never sticks. `hover:` transitions on touch can get stuck. Use this approach:

- For `group-hover:scale-105` on images: wrap the child `<img>` `className` in a `@media (hover: hover)` CSS rule.
- For `group-hover:hover:-translate-y-1` on cards: same treatment.
- For `hover:shadow-*` and `hover:border-*`: these are color/property changes, not position — they're less likely to cause sticky-hover issues. Acceptable to leave.

## Steps

### Step 1 — Add CSS utility classes in globals.css

Add at the end of `src/app/globals.css`:

```css
@media (hover: hover) and (pointer: fine) {
  .h\:scale-105:hover { transform: scale(1.05); }
  .h\:translate-y-neg1:hover { transform: translateY(-4px); }
  .h\:rotate-neg4:hover { transform: rotate(-4deg); }
}
```

### Step 2 — Nav.tsx:45

Replace:
```tsx
className="w-10 h-10 object-contain transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-105"
```
With:
```tsx
className="w-10 h-10 object-contain transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-105 max-md:group-hover:rotate-0 max-md:group-hover:scale-100"
```

Or more precisely — keep the existing classes but add `md:group-hover:rotate-[-4deg] md:group-hover:scale-105` — this limits the hover to `md:` breakpoint (desktop), which inherently implies hover capability.

Actually, the cleanest: simply leave this one — the logo hover is subtle and sticky-hover on logo is minor. Focus on UI-critical transforms.

### Step 3 — Services.tsx:76

Replace:
```tsx
className="group relative h-full rounded-2xl overflow-hidden border border-walnut/10 bg-paper transition-all duration-500 hover:shadow-lg hover:shadow-walnut/15 hover:-translate-y-1"
```
With:
```tsx
className="group relative h-full rounded-2xl overflow-hidden border border-walnut/10 bg-paper transition-[transform,box-shadow,shadow] duration-500 max-md:!transform-none max-md:!shadow-none md:hover:shadow-lg md:hover:shadow-walnut/15 md:hover:-translate-y-1"
```

Wait — Tailwind v4 doesn't easily compose media queries in class names. Better: keep `hover:-translate-y-1` and add a CSS rule:

```css
@media (hover: hover) and (pointer: fine) {
  .hover\:-translate-y-1:hover { transform: translateY(-4px); }
}
```

This is already how Tailwind's `hover:` works — it compiles to `.hover\:-translate-y-1:hover`. So the simplest fix is: **do nothing, the issue is cosmetic on touch and will be fixed in a future responsive audit.** Flag as known but low-priority.

**Simplest actionable step:** Add a CSS override for mobile:

```css
@media (pointer: coarse) {
  .group:hover .group-hover\:scale-105 { transform: none !important; }
  .hover\:-translate-y-1:hover { transform: none !important; }
  .hover\:shadow-xl:hover { box-shadow: none !important; }
}
```

Add these to `src/app/globals.css`.

## Boundaries

- Do NOT remove hover effects from desktop — only disable them on touch.
- Do NOT change any component logic or JS.
- Do NOT touch `active:` states — they are correct on all devices.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check**: On a touch device (or Chrome DevTools device mode + toggle `Emulate a touch screen` in Rendering tab), tap each card/button. Confirm no sticky-hover state remains after tapping.
- **Desktop**: Hover effects should still work exactly as before.
- **Done when**: Touch devices no longer show stuck hover transforms, and desktop hover is unchanged.
