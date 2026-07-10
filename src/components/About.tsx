"use client";

import { motion } from "framer-motion";
import { Shield, Users, Leaf, TrendingUp } from "lucide-react";
import VideoFrame from "./VideoFrame";

const stats = [
  { icon: Shield, value: "30+", label: "Years Experience" },
  { icon: Users, value: "1000+", label: "Happy Clients" },
  { icon: Leaf, value: "50K+", label: "CFT Delivered" },
  { icon: TrendingUp, value: "99%", label: "On-Time Delivery" },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-walnut/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Brand decorative panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-walnut/5">
              <VideoFrame
                src="/videos/timber-yard.mp4"
                poster="/timber-yard-poster.jpg"
                className="h-full w-full"
              />
              {/* caption over the footage */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6">
                <p className="font-[family:var(--font-display)] font-bold text-2xl text-paper drop-shadow">
                  Since 1995
                </p>
                <p className="text-sm text-paper/85 mt-0.5 drop-shadow">
                  Three generations of timber expertise
                </p>
              </div>
              <div className="pointer-events-none absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-paper/40 rounded-tl-xl" />
              <div className="pointer-events-none absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-paper/40 rounded-br-xl" />
            </div>

            {/* Owner cards */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-paper border border-walnut/5 text-center">
                <div className="w-14 h-14 rounded-full bg-ochre/10 flex items-center justify-center mx-auto mb-2">
                  <span className="font-[family:var(--font-display)] font-bold text-lg text-ochre">AA</span>
                </div>
                <div className="font-[family:var(--font-display)] font-bold text-sm text-walnut">
                  Athaulla Afroz
                </div>
                <div className="text-[10px] text-ink-soft/60 uppercase tracking-wider mt-0.5">
                  Founder
                </div>
              </div>
              <div className="p-4 rounded-xl bg-paper border border-walnut/5 text-center">
                <div className="w-14 h-14 rounded-full bg-ochre/10 flex items-center justify-center mx-auto mb-2">
                  <span className="font-[family:var(--font-display)] font-bold text-lg text-ochre">MA</span>
                </div>
                <div className="font-[family:var(--font-display)] font-bold text-sm text-walnut">
                  Mohammed Afsar
                </div>
                <div className="text-[10px] text-ink-soft/60 uppercase tracking-wider mt-0.5">
                  Owner
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-4">
              About Us
            </span>
            <h2 className="font-[family:var(--font-display)] font-bold text-4xl sm:text-5xl text-walnut leading-[1.1] mb-6">
              Leading Timber Merchant
              <br />
              <span className="text-ochre">in Chitradurga</span>
            </h2>
            <p className="text-ink-soft/80 text-sm sm:text-base leading-relaxed mb-4">
              Founded in 1995 by <strong>Athaulla Afroz</strong>, Abuzar
              Industries started from humble beginnings and grew into the leading
              timber supplier in Chitradurga through a commitment to quality and
              customer trust.
            </p>
            <p className="text-ink-soft/80 text-sm sm:text-base leading-relaxed mb-4">
              Today, under the leadership of his son{" "}
              <strong>Mohammed Afsar</strong>, we blend three decades of timber
              expertise with modern approaches — providing premium teak, white
              teak, and neem wood to builders, carpenters, and craftsmen across
              Karnataka.
            </p>
            <p className="text-ink-soft/80 text-sm sm:text-base leading-relaxed mb-8">
              Located at KSSIDC Industrial Area, DVG Road, Chitradurga, we
              maintain large stockyards of premium timber and offer custom
              dimension cutting so you get exactly what you need — with zero
              waste.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-3">
              {[
                "Premium grade timber only",
                "Custom dimension cutting",
                "Delivery across Karnataka",
                "Affordable pricing",
              ].map((v) => (
                <div
                  key={v}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
                  {v}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl bg-panel/60 border border-walnut/5 text-center"
            >
              <s.icon size={18} className="text-ochre mx-auto mb-2" />
              <div className="font-[family:var(--font-display)] font-bold text-2xl text-walnut">
                {s.value}
              </div>
              <div className="text-xs text-ink-soft/60 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
