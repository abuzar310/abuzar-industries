import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-walnut text-paper/80">
      {/* warm gold top edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C79A4B]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-brand-512.png" alt="Abuzar Industries" className="w-11 h-11 object-contain" />
              <div>
                <span className="font-[family:var(--font-serif)] font-semibold text-xl text-paper">
                  Abuzar <span className="gold-text">Industries</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-paper/35">Est. 1995</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-paper/55 max-w-xs">
              Premium teak, white teak and neem — custom cut and delivered across Karnataka since three generations.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <span className="block eyebrow text-paper/45 mb-5">Links</span>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "Our Products" },
                { href: "/calculator", label: "Price Calculator" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-ochre transition-colors duration-300 link-underline after:bg-ochre after:bottom-0 after:h-px">
                    {l.label}
                    <ArrowUpRight size={12} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="block eyebrow text-paper/45 mb-5">Contact</span>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-paper/65">
                <MapPin size={15} className="mt-0.5 shrink-0 text-ochre" strokeWidth={1.75} />
                <span>
                  KSSIDC Industrial Area, DVG Road<br />
                  Chitradurga, Karnataka — 577501
                </span>
              </li>
              <li>
                <a href="tel:+919845378626" className="inline-flex items-center gap-3 text-paper/65 hover:text-ochre transition-colors duration-300">
                  <Phone size={15} className="shrink-0 text-ochre" strokeWidth={1.75} />
                  +91 98453 78626
                </a>
              </li>
              <li>
                <a href="mailto:info@abuzarindustries.in" className="inline-flex items-center gap-3 text-paper/65 hover:text-ochre transition-colors duration-300">
                  <Mail size={15} className="shrink-0 text-ochre" strokeWidth={1.75} />
                  info@abuzarindustries.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-paper/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-paper/30">
          <span>© {year} Abuzar Industries</span>
          <span>Made by Abuzar</span>
        </div>
      </div>
    </footer>
  );
}
