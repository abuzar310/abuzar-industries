"use client";

import { Trees, Ruler, Building2, Truck, ClipboardList, Leaf } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const services = [
  { icon: Trees, n: "01", title: "Premium Teak Wood", desc: "Imported Ghana, Togo & Burma teak from ₹4,000/cu.ft. Kiln-dried, ready for joinery and fine furniture." },
  { icon: Leaf, n: "02", title: "White Teak Wood", desc: "Quality white teak from ₹2,800/cu.ft. Ideal for doors, windows and interior woodwork." },
  { icon: Building2, n: "03", title: "Neem Wood", desc: "Durable, pest-resistant neem from ₹1,000/cu.ft. Perfect for outdoor furniture and construction." },
  { icon: Ruler, n: "04", title: "Custom Dimension Cutting", desc: "Cut to exact Length × Width × Thickness. No waste, just fit — every plank to your spec." },
  { icon: Truck, n: "05", title: "Delivery Across Karnataka", desc: "Reliable delivery from our KSSIDC Industrial Area yard, Chitradurga, straight to your site." },
  { icon: ClipboardList, n: "06", title: "Instant WhatsApp Quoting", desc: "Use our calculator or message dimensions on WhatsApp — a professional quote within minutes." },
];

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative bg-panel/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <Reveal className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule-gold" />
            <span className="eyebrow text-ochre">What We Offer</span>
          </div>
          <h2 className="t-h2 text-walnut">
            Everything a build <span className="gold-text italic">needs</span>
          </h2>
          <p className="mt-5 text-ink-soft/80 text-base leading-relaxed max-w-xl">
            Premium timber, custom sizes and dependable delivery — the full
            supply for construction and woodworking.
          </p>
        </Reveal>

        {/* grid */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <StaggerItem key={s.title} className="h-full">
              <div className="card-premium group relative h-full p-7 rounded-2xl overflow-hidden">
                <span className="pointer-events-none absolute -top-3 right-4 font-[family:var(--font-serif)] text-6xl font-semibold text-walnut/[0.05] transition-colors duration-500 group-hover:text-ochre/15">
                  {s.n}
                </span>
                <div className="relative w-11 h-11 rounded-xl bg-ochre/10 grid place-items-center mb-5 transition-colors duration-300 group-hover:bg-ochre/20">
                  <s.icon size={20} className="text-ochre" strokeWidth={1.75} />
                </div>
                <h3 className="font-[family:var(--font-serif)] font-semibold text-lg text-walnut mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-ink-soft/78 leading-relaxed">{s.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
