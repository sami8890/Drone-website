"use client"

import DroneHero from "@/components/drone-hero"
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
    </div>
  )
}
