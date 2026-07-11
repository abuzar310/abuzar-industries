"use client";

import { motion } from "framer-motion";
import { Trees, Leaf, Building2, Ruler, MessageCircle } from "lucide-react";

const products = [
  {
    icon: Trees,
    name: "Premium Teak Wood Planks",
    specs: "2\"×6\"×6' · 2\"×8\"×8' · Custom sizes",
    price: "₹4,000/cu.ft",
    desc: "High-grade Burma & Indian teak. Kiln-dried, ready for joinery, furniture, and premium construction.",
    tag: "Best Seller",
  },
  {
    icon: Leaf,
    name: "White Teak Wood Planks",
    specs: "1.5\"×6\"×6' · 2\"×6\"×8' · Custom sizes",
    price: "₹2,800/cu.ft",
    desc: "Quality white teak for doors, windows, and interior woodworking projects.",
    tag: "Popular",
  },
  {
    icon: Building2,
    name: "Neem Wood Planks",
    specs: "1\"×4\"×6' · 2\"×6\"×8' · Custom sizes",
    price: "₹1,000/cu.ft",
    desc: "Durable, pest-resistant neem wood ideal for outdoor furniture, doors, and general construction.",
    tag: "Value",
  },
];

const features = [
  {
    icon: Ruler,
    title: "Premium Timber Quality",
    desc: "Only the finest graded timber, carefully selected and seasoned.",
  },
  {
    icon: Ruler,
    title: "Custom Cut Sizes",
    desc: "Cut to your exact Length × Width × Thickness specifications.",
  },
  {
    icon: Building2,
    title: "Delivery Across Karnataka",
    desc: "Reliable delivery from our Chitradurga yard to your project site.",
  },
  {
    icon: MessageCircle,
    title: "Affordable Pricing",
    desc: "Competitive rates with bulk discounts for regular buyers.",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-4">
            Our Products
          </span>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl sm:text-5xl text-walnut leading-[1.1]">
            Best Teak Wood Products
            <br />
            <span className="text-ochre">in Chitradurga</span>
          </h2>
          <p className="mt-4 text-ink-soft/80 text-sm sm:text-base leading-relaxed">
            Premium timber planks in standard and custom dimensions — available
            for delivery across Karnataka.
          </p>
        </motion.div>

        {/* Product cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {products.map((p) => (
            <div
              key={p.name}
              className="group relative rounded-2xl bg-paper border border-walnut/5 hover:border-ochre/20 hover:shadow-lg hover:shadow-ochre/5 transition-all duration-300 overflow-hidden"
            >
              {/* Tag */}
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-[10px] font-bold tracking-wider uppercase">
                {p.tag}
              </div>

              {/* Icon area */}
              <div className="p-6 pb-0">
                <div className="w-12 h-12 rounded-xl bg-ochre/10 flex items-center justify-center mb-4 group-hover:bg-ochre/20 transition-colors">
                  <p.icon size={22} className="text-ochre" />
                </div>
                <h3 className="font-[family:var(--font-display)] font-bold text-xl text-walnut mb-1">
                  {p.name}
                </h3>
                <div className="font-mono text-xs text-ink-soft/60 mb-2">
                  {p.specs}
                </div>
                <p className="text-sm text-ink-soft/70 leading-relaxed mb-4">
                  {p.desc}
                </p>
              </div>

              {/* Price + CTA */}
              <div className="px-6 pb-6 pt-2 border-t border-walnut/5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-ink-soft/60 uppercase tracking-wider">
                      Starting from
                    </span>
                    <div className="font-[family:var(--font-display)] font-bold text-2xl text-ochre">
                      {p.price}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/919845378626?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(p.name)}.%20Please%20share%20pricing%20and%20availability.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green text-paper text-xs font-semibold hover:bg-green/90 transition-colors whitespace-nowrap"
                  >
                    <MessageCircle size={14} />
                    Enquire
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((f) => (
            <div
              key={f.title}
              className="p-5 rounded-xl bg-panel/50 border border-walnut/5 text-center hover:bg-panel/80 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-ochre/10 flex items-center justify-center mx-auto mb-3">
                <f.icon size={17} className="text-ochre" />
              </div>
              <div className="font-[family:var(--font-display)] font-bold text-sm text-walnut mb-1">
                {f.title}
              </div>
              <div className="text-xs text-ink-soft/70 leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
