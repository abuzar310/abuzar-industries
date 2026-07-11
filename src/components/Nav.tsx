"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/calculator", label: "Calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-md border-b border-walnut/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-brand-512.png"
              alt="Abuzar Industries"
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-[family:var(--font-display)] font-bold text-xl tracking-wide text-walnut">
              Abuzar <span className="text-ochre">Industries</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-ink-soft hover:text-walnut hover:bg-panel transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+919845378626"
              className="ml-3 flex items-center gap-2 px-4 py-2 rounded-lg bg-walnut text-paper text-sm font-semibold hover:bg-walnut-2 transition-colors"
            >
              <Phone size={14} />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-ink-soft hover:text-walnut hover:bg-panel transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-walnut/10 bg-paper/98 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-ink-soft hover:text-walnut hover:bg-panel transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:+919845378626"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 mt-3 px-4 py-3 rounded-lg bg-walnut text-paper text-sm font-semibold hover:bg-walnut-2 transition-colors"
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
