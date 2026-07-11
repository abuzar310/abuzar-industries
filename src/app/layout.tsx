import type { Metadata } from "next";
import { Saira_Condensed, Inter, Spline_Sans_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const display = Saira_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// editorial serif for premium headings (variable font, full weight range)
const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = Spline_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abuzarindustries.in"),
  title: "Abuzar Industries — Best Teak Wood Supplier in Chitradurga",
  description:
    "Trusted timber supplier in Chitradurga since 1995. Premium teak, white teak & neem wood planks — custom cut sizes, instant WhatsApp quotes, delivery across Karnataka.",
  keywords: [
    "teak wood Chitradurga",
    "timber supplier Chitradurga",
    "teak wood planks",
    "white teak",
    "neem wood",
    "custom cut timber",
    "wood supplier Karnataka",
    "Abuzar Industries",
  ],
  alternates: { canonical: "https://abuzarindustries.in" },
  openGraph: {
    title: "Abuzar Industries — Best Teak Wood Supplier in Chitradurga",
    description:
      "Premium teak, white teak & neem wood since 1995. Custom cut sizes and delivery across Karnataka.",
    url: "https://abuzarindustries.in",
    siteName: "Abuzar Industries",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo-brand-og.png", width: 1200, height: 1200, alt: "Abuzar Industries" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable} scroll-smooth`}
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <Preloader />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
