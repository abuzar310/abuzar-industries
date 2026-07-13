# 007 — Add stagger entrance to product cards and micro-interactions to calculator

- **Status**: TODO
- **Commit**: 81bbc16
- **Severity**: LOW
- **Category**: Missed opportunities
- **Estimated scope**: 2 files, ~20 lines

## Problem

Two areas lack motion where it would meaningfully improve feel:

**1. ProductsContent.tsx — Product cards (4 items)** appear simultaneously on scroll. The AUDIT says list/grid entrances with no stagger are a missed opportunity. A 60ms stagger per card adds rhythm without delaying interaction (stagger is decorative).

Current code (ProductsContent.tsx:130-145):
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
  {products.map((p, i) => (
    <motion.div
      key={p.title}
      initial={{ opacity: 0, y: 24 }}
      // No stagger — all animate at once
    >
```

**2. Calculator/QuoteTool — Zero micro-interactions.** Adding/removing rows and recalculating totals teleports with no transition. The AUDIT highlights this as a missed opportunity: brief transitions on row removal and a subtle pop on total recalculation make a tool "feel alive."

Current code (QuoteTool.tsx):
- Lines 319-331: submit button has `animate={{ opacity: 1, height: "auto" }}` for the quote result — correct.
- Rows (lines 237-270): input fields have no exit animation when removed.
- The "Remove row" button (q-rowx) has no transition on removal.

## Target

### 1. Product card stagger

Wrap the product grid in `Stagger` and each card in `StaggerItem` (same pattern as `Services.tsx` uses). The `StaggerItem` already has a 0.7s duration with 90ms stagger — perfect.

```tsx
import { Stagger, StaggerItem } from "../components/motion/Reveal";

// Grid wrapper
<Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
  {products.map((p) => (
    <StaggerItem key={p.title}>
      <div className="group rounded-2xl ...">
```

### 2. Calculator row removal animation

Wrap each row in `<AnimatePresence>` and add exit animation. The `q-rowx` button triggers row removal. Currently rows are at QuoteTool.tsx:221-280.

```tsx
import { AnimatePresence, motion } from "framer-motion";

<AnimatePresence>
  {sections.map((s) => (
    <motion.div
      key={s.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* existing section content */}
    </motion.div>
  ))}
</AnimatePresence>
```

### 3. Total recalculation micro-pop

When the total value changes, add a brief scale pop to draw attention. The total is displayed at QuoteTool.tsx ~line 300-310 (qt-grand).

```tsx
import { useAnimate } from "framer-motion";

// Inside the component, after calculation:
const [scope, animate] = useAnimate();
useEffect(() => {
  animate(scope.current, { scale: [1, 1.04, 1] }, { duration: 0.3, ease: [0.22, 1, 0.36, 1] });
}, [total]);
```

## Steps

### Step 1 — ProductsContent.tsx
1. Import `Stagger` and `StaggerItem` from `"../components/motion/Reveal"` (adjust path: file is at `src/app/products/ProductsContent.tsx`, so path should be `"../../components/motion/Reveal"`).
2. Replace the grid `<div className="grid ...">` with `<Stagger className="grid ...">`.
3. Replace the outer `<motion.div>` wrapping each card with `<StaggerItem>` (keep the inner `<div className="group rounded-2xl ...">` as the actual card).
4. Remove `initial={{ opacity: 0, y: 24 }}` from the card — StaggerItem handles that.

### Step 2 — QuoteTool.tsx
1. Import `AnimatePresence` from `"framer-motion"` (already imported — QuoteTool.tsx line 5 or similar).
2. Wrap the section list element with `<AnimatePresence>`.
3. Change `sections.map(...)` return to use `<motion.div>` with enter/exit animation props (instead of plain HTML div or the current wrapper).
4. Add the total pop animation using `useAnimate`.

### Step 3 — Verify section IDs
QuoteTool sections need stable IDs for AnimatePresence to match. Check that each section has a unique `id` or `key` prop — add one if missing (`crypto.randomUUID()` or incrementing counter on creation).

## Boundaries

- Do NOT change calculator calculation logic, only animation.
- Do NOT add stagger to the Services cards — they already have it via `Stagger`/`StaggerItem`.
- Do NOT remove the existing `animate={{ opacity: 1, height: "auto" }}` on the quote result — that's correct.

## Verification

- **Mechanical**: `npm run build` passes.
- **Feel check — Products**: Scroll to the products section. Cards should appear one after another with a subtle delay (60ms apart) rather than all at once.
- **Feel check — Calculator**: Add a row, then remove it. The row should slide/fade out rather than vanishing instantly. Watch the total — it should briefly pulse when it recalculates.
- **Done when**: Product cards stagger on scroll, calculator rows animate out on removal, and total pulses on recalculation.
