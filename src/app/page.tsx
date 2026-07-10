import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Process from "@/components/Process";
import About from "@/components/About";
import QuoteTool from "@/components/QuoteTool";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Products />
      <Process />
      <About />
      <QuoteTool />
      <Contact />
    </>
  );
}
