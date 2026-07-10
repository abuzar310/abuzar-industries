"use client";

import { motion } from "framer-motion";
import { ArrowDown, Shield, Truck, BadgeCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stamps = [
  { icon: Shield, label: "Trusted Since 1995" },
  { icon: Truck, label: "Delivery Across Karnataka" },
  { icon: BadgeCheck, label: "Custom Cut Sizes" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-pattern"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-ochre/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-walnut/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ochre animate-pulse" />
          Chitradurga&apos;s Trusted Timber Supplier
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-[family:var(--font-display)] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-walnut"
        >
          Trusted Timber
          <br />
          <span className="text-ochre">Specialists</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-ink-soft/80 leading-relaxed"
        >
          Premium teak wood, white teak, and neem wood — cut to your exact
          specifications. Serving builders and craftsmen across Karnataka since
          1995.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/calculator"
            className="px-8 py-3.5 rounded-xl bg-walnut text-paper font-semibold text-sm tracking-wide hover:bg-walnut-2 transition-all active:scale-[0.97] shadow-lg shadow-walnut/20"
          >
            Get Instant Quote
          </a>
          <a
            href="https://wa.me/919845378626?text=Hi%20Abuzar%20Industries%2C%20I%20want%20to%20check%20timber%20prices%20and%20availability"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl border border-walnut/20 text-ink-soft font-semibold text-sm tracking-wide hover:bg-panel hover:text-walnut transition-all active:scale-[0.97]"
          >
            WhatsApp Us
          </a>
        </motion.div>

        {/* Trust stamps */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {stamps.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 text-ink-soft/60"
            >
              <s.icon size={17} className="text-ochre" />
              <span className="text-xs font-medium tracking-wide uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-soft/40 hover:text-ochre transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
