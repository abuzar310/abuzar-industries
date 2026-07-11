import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-walnut text-paper/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-brand-512.png"
                alt="Abuzar Industries"
                className="w-10 h-10 object-contain"
              />
              <span className="font-[family:var(--font-display)] font-bold text-xl tracking-wide text-paper">
                Abuzar <span className="text-ochre">Industries</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-paper/60">
              Premium teak, white teak & neem wood — custom cut and delivered
              across Karnataka from Chitradurga since 1995.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-[family:var(--font-display)] font-bold text-lg tracking-wide text-paper mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/products", label: "Our Products" },
                { href: "/calculator", label: "Price Calculator" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="flex items-center gap-1 text-sm hover:text-ochre transition-colors"
                  >
                    {l.label}
                    <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[family:var(--font-display)] font-bold text-lg tracking-wide text-paper mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ochre" />
                <span>
                  KSSIDC Industrial Area, DVG Road,
                  <br />
                  Chitradurga, Karnataka
                </span>
              </li>
              <li>
                <a
                  href="tel:+919845378626"
                  className="flex items-center gap-3 hover:text-ochre transition-colors"
                >
                  <Phone size={16} className="shrink-0 text-ochre" />
                  <span>+91 98453 78626</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@abuzarindustries.in"
                  className="flex items-center gap-3 hover:text-ochre transition-colors"
                >
                  <Mail size={16} className="shrink-0 text-ochre" />
                  <span>info@abuzarindustries.in</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-paper/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-paper/40">
          <span>© {year} Abuzar Industries. All rights reserved.</span>
          <span>Crafted with care ✦ Timber since 1995</span>
        </div>
      </div>
    </footer>
  );
}
