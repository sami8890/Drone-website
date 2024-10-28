import Navbar from "@/components/navbar";
import Hero from "@/components/ui/Hero-Section";
import Products from "./Product/page";
 
export default function Home() {
  return (
    <section>
      <Navbar /> 
      <Hero/>
      <Products/>
      
    </section>


  );
}
