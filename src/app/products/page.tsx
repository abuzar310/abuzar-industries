import type { Metadata } from "next";
import ProductsContent from "./ProductsContent";

export const metadata: Metadata = {
  title: "Best Teak Wood Products Chitradurga | Premium Timber | Abuzar Industries",
  description:
    "Best teak wood products in Chitradurga. Premium teak, white teak & neem wood planks. Custom sizes, construction timber, furniture wood. KSSIDC Industrial Area, DVG Road.",
  alternates: { canonical: "https://abuzarindustries.in/products" },
};

export default function ProductsPage() {
  return <ProductsContent />;
}
