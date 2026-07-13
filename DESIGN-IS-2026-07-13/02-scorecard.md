# Design Is — Abuzar Industries

**What was audited:** https://abuzarindustries.in (dev on localhost:3001) — homepage, products, about, contact, calculator  
**Primary user:** Builder / contractor / carpenter in Chitradurga, Karnataka looking for teak wood  
**Primary task:** Find timber → check price → get quote via WhatsApp

---

## Scorecard

| # | Principle | Score | Evidence |
|---|-----------|-------|----------|
| 1 | **Innovative** | 2/3 | Live timber calculator + instant WhatsApp quoting is unique among wood suppliers; homepage design follows premium brand conventions |
| 2 | **Useful** | 3/3 | Primary task (get timber quote) completes in 2 steps. Calculator → WhatsApp send. |
| 3 | **Aesthetic** | 3/3 | Warm earth tones, consistent Fraunces/Inter pairing, clean card grid, unified spacing system |
| 4 | **Understandable** | 3/3 | "Build a Quotation" is unambiguous; "Chitradurga's Timber House" immediately identifies location |
| 5 | **Unobtrusive** | 2/3 | Animations and glass nav are tasteful, but DeliveryMap still doesn't look like Karnataka — visual element that distracts |
| 6 | **Honest** | 3/3 | Pricing shown upfront (₹4,000/cu.ft), "Est. Price*" disclaimer, no hidden costs |
| 7 | **Long-lasting** | 3/3 | Classic typography, warm minimalism — no trendy glassmorphism overuse, no fad gradients |
| 8 | **Thorough** | 2/3 | States: loading (preloader ✅), empty ✅, error ⚠️ (calculator edge cases), focus ✅, disabled ✅ |
| 9 | **Environmentally friendly** | 3/3 | Static SSG build, minimal JS (no bloated framework), animations respect reduced-motion, dark mode not applicable for warm brand |
| 10 | **As little design as possible** | 2/3 | Each element earns its place. DeliveryMap is the weakest — designed to solve a problem but the map doesn't read as Karnataka |

**Total: 26/30**

---

## Verdict: **REFINE** (26/30, no principle scored 0)

## Top 3 moves

1. **#5 Unobtrusive + #10 Less design** — Replace the current DeliveryMap SVG path with a properly recognizable Karnataka shape or use a simple route-text-list instead. The map currently doesn't look like Karnataka and draws attention for the wrong reason.
2. **#8 Thorough** — Add inline validation errors to the calculator (negative numbers, non-numeric input), success state animation on quote sent, empty state for 0-rows.
3. **#1 Innovative** — Add "Recently viewed" or "Popular dimensions" quick-select chips to the calculator to reduce friction for returning users.
