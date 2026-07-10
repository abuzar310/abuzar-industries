"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Ruler, Truck, BadgeIndianRupee, ShieldCheck } from "lucide-react";

const PHONE = "919845378626";

const products = [
  {
    name: "Premium Teak Wood Planks",
    image: "/images/1.jpg",
    sizes: ['2" × 6" × 6\'', '2" × 8" × 8\'', "Custom sizes available"],
    price: "₹4,000",
    unit: "per cubic foot",
    desc: "High-grade teak — kiln-dried and ready for joinery, furniture, doors, and premium construction.",
    tag: "Best Seller",
  },
  {
    name: "White Teak Wood Planks",
    image: "/images/2.jpg",
    sizes: ['1.5" × 6" × 6\'', '2" × 6" × 8\'', "Custom sizes available"],
    price: "₹2,800",
    unit: "per cubic foot",
    desc: "Quality white teak for doors, windows, frames, and interior woodworking projects.",
    tag: "Popular",
  },
  {
    name: "Neem Wood Planks",
    image: "/images/3.jpg",
    sizes: ['1" × 4" × 6\'', '2" × 6" × 8\'', "Custom sizes available"],
    price: "₹1,500",
    unit: "per cubic foot",
    desc: "Durable, pest-resistant neem wood — ideal for outdoor furniture and general construction.",
    tag: "Value",
  },
];

const whyUs = [
  {
    icon: ShieldCheck,
    title: "Best Quality Teak Wood",
    desc: "The finest teak wood in Chitradurga with premium quality and durability.",
  },
  {
    icon: Ruler,
    title: "Custom Sizing Available",
    desc: "Timber cut to your exact specifications — any size, any dimension.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    desc: "Fast delivery across Karnataka from our KSSIDC Industrial Area yard.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Competitive Pricing",
    desc: "Best timber prices in Chitradurga — transparent, with no hidden costs.",
  },
];

export default function ProductsContent() {
  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-pattern">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-6">
              Our Products
            </span>
            <h1 className="font-[family:var(--font-display)] font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-walnut">
              Best Teak Wood
              <br />
              <span className="text-ochre">in Chitradurga</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-ink-soft/80 leading-relaxed">
              Premium teak, white teak, and neem wood planks — custom cut and
              delivered across Karnataka.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product cards */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl bg-paper border border-walnut/5 hover:border-ochre/20 hover:shadow-xl hover:shadow-ochre/5 transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-paper/90 backdrop-blur-sm text-ochre text-[10px] font-bold tracking-wider uppercase">
                    {p.tag}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-[family:var(--font-display)] font-bold text-xl text-walnut mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-ink-soft/70 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.sizes.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-panel text-ink-soft font-mono text-[11px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-walnut/5">
                    <div>
                      <div className="font-[family:var(--font-display)] font-bold text-2xl text-ochre leading-none">
                        {p.price}
                      </div>
                      <span className="text-[10px] text-ink-soft/50 uppercase tracking-wider">
                        {p.unit}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}. Please share pricing and availability.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-green text-paper text-xs font-semibold hover:bg-green/90 transition-colors"
                    >
                      <MessageCircle size={14} />
                      Enquire
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            className="rounded-3xl bg-panel/60 border border-walnut/5 p-8 sm:p-12"
          >
            <h2 className="font-[family:var(--font-display)] font-bold text-3xl sm:text-4xl text-walnut text-center mb-10">
              Why Choose Our Timber
              <span className="text-ochre"> Products?</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((w) => (
                <div key={w.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-ochre/10 flex items-center justify-center mx-auto mb-3">
                    <w.icon size={20} className="text-ochre" />
                  </div>
                  <h3 className="font-[family:var(--font-display)] font-bold text-base text-walnut mb-1.5">
                    {w.title}
                  </h3>
                  <p className="text-xs text-ink-soft/70 leading-relaxed">
                    {w.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA row */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/calculator"
              className="px-8 py-3.5 rounded-xl bg-walnut text-paper font-semibold text-sm hover:bg-walnut-2 transition-all active:scale-[0.97] shadow-lg shadow-walnut/20"
            >
              Try Price Calculator
            </a>
            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-green text-paper font-semibold text-sm hover:bg-green/90 transition-all active:scale-[0.97]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
