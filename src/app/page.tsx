"use client"

import DroneHero from "@/components/drone-hero"
import Footer from "@/components/layout/footer"
import ProductsSection from "./Product/page"
import AboutPage from "./about/page"


export default function DronePage() {
  return (
    <div className="min-h-screen bg-black">
      <DroneHero />
      <div id="products-section">
        <ProductsSection />
      </div>
      <AboutPage/>
      <Footer />
    </div>
  )
}
