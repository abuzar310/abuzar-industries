# 002 — Replace transition-all with explicit property transitions

- **Status**: TODO
- **Commit**: 81bbc16
- **Category**: Performance
- **Severity**: HIGH
- **Estimated scope**: 16+ lines across 7 files

## Problem

`transition-all` animates every CSS property change — including non-GPU properties like `color`, `background`, `border`, `box-shadow` — triggering layout + paint + composite on every frame. The AUDIT says: animate `transform` and `opacity` only. Every `transition-all` must become explicit.

Affected locations (current code verbatim):

**Nav.tsx:31**
```tsx
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
```

**Nav.tsx:38**
```tsx
<div className={`flex items-center justify-between transition-all duration-500 ${solid ? "h-16" : "h-20"}`}>
```

**Hero.tsx:90**
```tsx
className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-walnut text-paper text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-walnut-2 active:scale-[0.98] shadow-[0_18px_40px_-18px_rgba(90,61,36,0.6)]"
```

**Hero.tsx:101**
```tsx
className="relative z-10 inline-flex items-center px-8 py-4 rounded-full border border-walnut/25 text-ink-soft text-sm font-semibold tracking-wide transition-all duration-300 hover:border-walnut hover:text-walnut hover:bg-panel/60 active:scale-[0.98]"
```

**Contact.tsx:103,116** (form inputs)
```tsx
className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-all text-ink placeholder:text-ink-soft/30"
```

**Contact.tsx:121** (submit button)
```tsx
className="sheen group w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-walnut text-paper text-sm font-semibold transition-all duration-300 hover:bg-walnut-2 active:scale-[0.98]"
```

**ProductsContent.tsx:138** (product card)
```tsx
className="group rounded-2xl bg-paper border border-walnut/5 hover:border-ochre/20 hover:shadow-xl hover:shadow-ochre/5 transition-all duration-300 overflow-hidden"
```

**ProductsContent.tsx:273,281** (CTAs)
```tsx
className="px-8 py-3.5 rounded-xl bg-walnut text-paper font-semibold text-sm hover:bg-walnut-2 transition-all active:scale-[0.97] shadow-lg shadow-walnut/20"
```

**AboutContent.tsx:161** (value cards)
```tsx
className="p-8 rounded-2xl bg-paper border border-walnut/5 text-center hover:border-ochre/20 hover:shadow-lg hover:shadow-ochre/5 transition-all"
```

**AboutContent.tsx:200,206,212** (CTAs)
```tsx
// line 200
className="px-8 py-3.5 rounded-xl bg-paper text-walnut font-semibold text-sm hover:bg-ochre-soft transition-all active:scale-[0.97]"
// line 206, 212
className="px-8 py-3.5 rounded-xl border border-paper/30 text-paper font-semibold text-sm hover:bg-paper/10 transition-all active:scale-[0.97]"
```

**QuoteTool.tsx:142,154,168,239,248,257,268** (form inputs)
```tsx
className="... outline-none transition-all text-ink placeholder:text-ink-soft/30"
```

**QuoteTool.tsx:319** (submit)
```tsx
className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-green text-paper text-sm font-semibold hover:bg-green/90 transition-all active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-green/20"
```

**Services.tsx:76** (service card)
```tsx
className="group relative h-full rounded-2xl overflow-hidden border border-walnut/10 bg-paper transition-all duration-500 hover:shadow-lg hover:shadow-walnut/15 hover:-translate-y-1"
```

**Services.tsx:117** (decorative line)
```tsx
className="mt-4 h-px w-0 bg-gradient-to-r from-ochre to-transparent transition-all duration-500 group-hover:w-full"
```

## Target

Replace every `transition-all` with the minimum set of explicit properties that change on hover/focus/active.

| Component | Properties that change | Replace `transition-all` with |
|---|---|---|
| Nav bar background | opacity, background | `transition-colors` or `transition-[background,opacity,box-shadow]` |
| Hero CTA buttons | background, transform(border-color, color) | `transition-colors duration-300` (already has transform via active:) — add `transition-transform duration-150` separately or keep `transition-[color,background,border-color,transform]` |
| Form inputs | border-color, box-shadow | `transition-[border-color,box-shadow]` |
| Product cards | border-color, box-shadow | `transition-[border-color,box-shadow]` |
| Value cards (about) | border-color, box-shadow | `transition-[border-color,box-shadow]` |
| CTA buttons | background, transform | `transition-[background,transform]` |
| Service cards | transform, box-shadow | `transition-[transform,box-shadow]` |
| Decorative line | width | `transition-[width]` |
| Quote submit | background, transform | `transition-[background,transform]` |

## Repo conventions to follow

- Duration values remain unchanged (300ms, 500ms as-is) — only the property list changes.
- Tailwind v4 supports arbitrary property lists: `transition-[property1,property2]`.
- This project already uses `transition-colors` in Footer.tsx:41,62,68 and Contact.tsx:75,93 — use that pattern.
- Active scale effects (`active:scale-[0.98]`) are transforms — if a button has both hover and active transforms, they need `transition-transform` included.

## Steps

For each file, one line per `transition-all` → explicit replacement:

1. **Nav.tsx:31** — `transition-all duration-500` → `transition-[background,opacity,box-shadow] duration-500`
2. **Nav.tsx:38** — `transition-all duration-500` → `transition-[padding,height] duration-500` (height changes with scroll)
3. **Hero.tsx:90** — `transition-all duration-300` → `transition-[background,transform] duration-300` (hover=bg, active=scale)
4. **Hero.tsx:101** — `transition-all duration-300` → `transition-[border-color,color,background,transform] duration-300`
5. **Contact.tsx:103,116** — `transition-all` → `transition-[border-color,box-shadow]`
6. **Contact.tsx:121** — `transition-all duration-300` → `transition-[background,transform] duration-300`
7. **ProductsContent.tsx:138** — `transition-all duration-300` → `transition-[border-color,box-shadow] duration-300`
8. **ProductsContent.tsx:273,281** — `transition-all` → `transition-[background,transform]`
9. **AboutContent.tsx:161** — `transition-all` → `transition-[border-color,box-shadow]`
10. **AboutContent.tsx:200,206,212** — `transition-all` → `transition-[background,transform]`
11. **QuoteTool.tsx:142,154,168,239,248,257,268** — `transition-all` → `transition-[border-color,box-shadow]`
12. **QuoteTool.tsx:319** — `transition-all` → `transition-[background,transform]`
13. **Services.tsx:76** — `transition-all duration-500` → `transition-[transform,box-shadow] duration-500`
14. **Services.tsx:117** — `transition-all duration-500` → `transition-[width] duration-500`

## Boundaries

- Do NOT touch the duration values (300ms, 500ms stay).
- Do NOT change `transition-colors` in Footer.jsx or Contact.tsx — those are already correct.
- Do NOT add `transition-transform` to form inputs — they have no transform changes.
- Keep `active:scale-[0.98]` — it's a UX requirement. Just make sure the transition list includes `transform`.

## Verification

- **Mechanical**: `npm run build` passes. `grep -r "transition-all" src/` returns empty.
- **Feel check**: Hover every button, card, and input. All transitions should feel identical — nothing should snap or jump.
- **DevTools**: In the Performance panel, hover a card. Confirm no layout recalc — only composite layers.
- **Done when**: Zero `transition-all` remain in `src/`, all replaced with explicit property lists.
