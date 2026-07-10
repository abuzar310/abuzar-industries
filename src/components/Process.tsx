"use client";

import { motion } from "framer-motion";
import { Ruler, Scissors, Truck } from "lucide-react";
import VideoFrame from "./VideoFrame";

const steps = [
  {
    icon: Ruler,
    title: "You Send Sizes",
    desc: "Share your exact Length × Width × Thickness on WhatsApp or our calculator.",
  },
  {
    icon: Scissors,
    title: "We Cut to Spec",
    desc: "Premium teak, white teak or neem — precision cut with zero waste.",
  },
  {
    icon: Truck,
    title: "Delivered to Site",
    desc: "Reliable delivery from our Chitradurga yard across Karnataka.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — cutting video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-walnut/10 shadow-[0_40px_90px_-40px_rgba(90,61,36,0.45)]">
              <VideoFrame
                src="/videos/saw-cutting.mp4"
                poster="/saw-cutting-poster.jpg"
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 backdrop-blur-md">
                <Scissors size={13} className="text-ochre-soft" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-paper">
                  Precision Cutting
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right — steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-4">
              How We Work
            </span>
            <h2 className="font-[family:var(--font-display)] font-bold text-4xl sm:text-5xl text-walnut leading-[1.1] mb-8">
              From Log to
              <br />
              <span className="text-ochre">Your Doorstep</span>
            </h2>

            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={s.title} className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-xl bg-ochre/10 flex items-center justify-center">
                      <s.icon size={19} className="text-ochre" />
                    </div>
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-walnut text-paper text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-[family:var(--font-display)] font-bold text-lg text-walnut">
                      {s.title}
                    </h3>
                    <p className="text-sm text-ink-soft/80 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
