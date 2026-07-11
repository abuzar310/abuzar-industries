"use client";

import Image from "next/image";
import { Ruler, Building2, Truck, BadgeIndianRupee, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./motion/Reveal";

const PHONE = "919845378626";

const products = [
  {
    name: "Premium Teak Wood",
    image: "/images/teak-product.jpg",
    specs: "Ghana · Togo · Burma",
    price: "₹4,000",
    desc: "Imported, kiln-dried teak — the benchmark for doors, joinery and fine furniture.",
    tag: "Best Seller",
  },
  {
    name: "White Teak Wood",
    image: "/images/white-teak-product.jpg",
    specs: "Doors · Windows · Frames",
    price: "₹2,800",
    desc: "Pale, workable and clean-grained — a value choice for interior woodwork.",
    tag: "Popular",
  },
  {
    name: "Neem Wood",
    image: "/images/neem-product.jpg",
    specs: "Outdoor · Durable",
    price: "₹1,000",
    desc: "Naturally pest-resistant timber, ideal for outdoor furniture and general build.",
    tag: "Value",
  },
];

const features = [
  { icon: Ruler, title: "Graded & Seasoned", desc: "Only the finest graded timber, carefully selected and dried." },
  { icon: Building2, title: "Custom Cut Sizes", desc: "Cut to your exact Length × Width × Thickness." },
  { icon: Truck, title: "Karnataka Delivery", desc: "Reliable delivery from our Chitradurga yard to site." },
  { icon: BadgeIndianRupee, title: "Fair, Clear Pricing", desc: "Competitive rates with bulk discounts for regulars." },
];

export default function Products() {
  return (
    <section id="products" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <Reveal className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="rule-gold" />
            <span className="eyebrow text-ochre">The Timber</span>
          </div>
          <h2 className="t-h2 text-walnut">
            Three species, <span className="gold-text italic">one standard</span>
          </h2>
          <p className="mt-5 text-ink-soft/80 text-base leading-relaxed max-w-xl">
            Standard and custom dimensions, seasoned and cut to spec — delivered
            across Karnataka.
          </p>
        </Reveal>

        {/* product cards */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {products.map((p) => (
            <StaggerItem key={p.name}>
              <a
                href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}. Please share pricing and availability.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-premium sheen group block h-full rounded-2xl overflow-hidden"
              >
                {/* image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-walnut/55 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 rounded-full bg-paper/85 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-ochre">
                    {p.tag}
                  </span>
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-paper">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-paper/70">From</span>
                      <span className="font-[family:var(--font-serif)] font-semibold text-2xl leading-none">
                        {p.price}
                        <span className="text-xs font-normal text-paper/70"> /cu.ft</span>
                      </span>
                    </div>
                    <span className="h-9 w-9 grid place-items-center rounded-full bg-paper/90 text-walnut transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
                {/* body */}
                <div className="p-6">
                  <div className="eyebrow text-ink-soft/45 mb-2">{p.specs}</div>
                  <h3 className="font-[family:var(--font-serif)] font-semibold text-xl text-walnut mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-ink-soft/75 leading-relaxed">{p.desc}</p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        {/* feature strip */}
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-walnut/10 border border-walnut/10">
          {features.map((f) => (
            <StaggerItem key={f.title} className="h-full">
              <div className="h-full bg-paper p-6 transition-colors duration-300 hover:bg-panel/60">
                <f.icon size={20} className="text-ochre mb-3" strokeWidth={1.75} />
                <div className="font-[family:var(--font-serif)] font-semibold text-[15px] text-walnut mb-1.5">
                  {f.title}
                </div>
                <div className="text-xs text-ink-soft/70 leading-relaxed">{f.desc}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
