"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-ochre/10 border border-ochre/20 text-ochre text-xs font-semibold tracking-wider uppercase mb-4">
            Contact
          </span>
          <h2 className="font-[family:var(--font-display)] font-bold text-4xl sm:text-5xl text-walnut leading-[1.1]">
            Get in
            <br />
            <span className="text-ochre">Touch</span>
          </h2>
          <p className="mt-4 text-ink-soft/80 text-sm sm:text-base leading-relaxed">
            Have a project in mind? Call us, visit our yard, or send us a
            message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4"
          >
            {[
              {
                icon: Phone,
                label: "Call Us",
                value: "+91 98453 78626",
                href: "tel:+919845378626",
              },
              {
                icon: Mail,
                label: "Email",
                value: "info@abuzarindustries.in",
                href: "mailto:info@abuzarindustries.in",
              },
              {
                icon: MapPin,
                label: "Visit Our Yard",
                value:
                  "KSSIDC Industrial Area, DVG Road,\nChitradurga, Karnataka\nMon–Sat · 9 AM – 7 PM",
                href: null,
              },
              {
                icon: Clock,
                label: "WhatsApp",
                value: "Quick replies within minutes",
                href: "https://wa.me/919845378626",
              },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-4 p-5 rounded-xl bg-paper border border-walnut/5 hover:border-ochre/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-ochre/10 flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-ochre" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-0.5">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={
                        c.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="font-semibold text-walnut hover:text-ochre transition-colors"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-sm text-ink/80 whitespace-pre-line">
                      {c.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = fd.get("name");
              const msg = fd.get("message");
              const url = `https://wa.me/919845378626?text=${encodeURIComponent(
                `Hi, I'm ${name}. ${msg}`
              )}`;
              window.open(url, "_blank");
            }}
            className="p-6 sm:p-8 rounded-2xl bg-paper border border-walnut/5 shadow-lg shadow-walnut/5"
          >
            <h3 className="font-[family:var(--font-display)] font-bold text-xl text-walnut mb-6">
              Send a Message
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Rajesh"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-all text-ink placeholder:text-ink-soft/30"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold tracking-wider uppercase text-ink-soft/60 mb-1.5"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your wood requirement..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-panel border border-walnut/10 focus:border-ochre/40 focus:ring-2 focus:ring-ochre/10 outline-none transition-all text-ink placeholder:text-ink-soft/30 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-walnut text-paper text-sm font-semibold hover:bg-walnut-2 transition-all active:scale-[0.97]"
              >
                <Send size={16} />
                Send via WhatsApp
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
