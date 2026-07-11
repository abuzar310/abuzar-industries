"use client";

import { motion } from "framer-motion";
import { Trees, Ruler, Building2, Truck, ClipboardList, Leaf } from "lucide-react";

const services = [
  {
    icon: Trees,
    title: "Premium Teak Wood",
    desc: "Premium imported teak planks — Ghana, Togo & Burma — from ₹4,000/cu.ft. Kiln-dried and ready for joinery, furniture, and construction.",
  },
  {
    icon: Leaf,
    title: "White Teak Wood",
    desc: "Quality white teak planks from ₹2,800/cu.ft. Ideal for doors, windows, and interior woodwork.",
  },
  {
    icon: Building2,
    title: "Neem Wood",
    desc: "Durable neem wood planks from ₹1,000/cu.ft. Pest-resistant and perfect for outdoor furniture and construction.",
  },
  {
    icon: Ruler,
    title: "Custom Dimension Cutting",
    desc: "Cut to exact Length × Width × Thickness as required. No waste, just fit — every plank tailored to your specs.",
  },
  {
    icon: Truck,
    title: "Delivery Across Karnataka",
    desc: "Reliable timber delivery from our yard in KSSIDC Industrial Area, DVG Road, Chitradurga to your site.",
  },
  {
    icon: ClipboardList,
    title: "Instant WhatsApp Quoting",
    desc: "Use our online calculator or simply message us dimensions on WhatsApp. Get a professional quote within minutes.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative bg-panel/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-4">
            What We Offer
          </span>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl sm:text-5xl text-walnut leading-[1.1]">
            Best Teak Wood Products
            <br />
            <span className="text-ochre">in Chitradurga</span>
          </h2>
          <p className="mt-4 text-ink-soft/80 text-sm sm:text-base leading-relaxed">
            Premium timber, custom sizes, and reliable delivery — everything you
            need for your construction and woodworking projects.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="tilt-3d group p-6 sm:p-8 rounded-2xl bg-paper border border-walnut/5 hover:border-ochre/20"
            >
              <div className="w-11 h-11 rounded-xl bg-ochre/10 flex items-center justify-center mb-4 group-hover:bg-ochre/20 transition-colors">
                <s.icon size={20} className="text-ochre" />
              </div>
              <h3 className="font-[family:var(--font-display)] font-bold text-lg text-walnut mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-ink-soft/80 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
