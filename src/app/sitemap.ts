import type { MetadataRoute } from "next";

const BASE = "https://abuzarindustries.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/products`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/calculator`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];
}
