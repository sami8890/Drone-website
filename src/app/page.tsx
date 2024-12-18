import Hero from "@/components/ui/Hero-Section";
import ProductsSection from "./Product/page";
import TestimonialSection from "@/components/ui/testimonial";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <section>
      <Analytics />
      <Hero />
      <ProductsSection />
      <TestimonialSection />
    </section>
  );
}
