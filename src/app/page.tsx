import Navbar from "@/components/navbar";
import Hero from "@/components/ui/Hero-Section";
import Products from "./Product/page";
import Product from "./Product/page";

export default function Home() {
  return (
    <section>
      <Navbar />
      <Hero />
      <Product />

    </section>
  );
}
