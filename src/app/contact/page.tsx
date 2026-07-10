import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Timber Supplier Chitradurga | Abuzar Industries",
  description:
    "Contact Abuzar Industries — KSSIDC Industrial Area, DVG Road, Chitradurga. Call +91 98453 78626 or WhatsApp for teak wood prices, custom sizes & delivery across Karnataka.",
  alternates: { canonical: "https://abuzarindustries.in/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
