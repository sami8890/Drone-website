"use client"

import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShoppingCart, Star, BadgeCheck, Sparkles } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Accessory {
  id: string
  name: string
  price: string
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  features: string[]
  compatibility: string[]
}

const accessories: Accessory[] = [
  {
    id: "propeller-guards",
    name: "Professional Propeller Guards",
    price: "$49",
    image: "/placeholder.svg?height=300&width=300",
    category: "Safety",
    rating: 5,
    reviews: 234,
    description:
      "Lightweight carbon fiber propeller guards for enhanced safety during indoor drones and tight spaces.",
    features: ["Carbon fiber construction", "Quick-release design", "Minimal weight impact", "360° protection"],
    compatibility: ["Phantom Pro X", "Swift Explorer", "Precision Elite"],
  },
  {
    id: "landing-pad",
    name: "Waterproof Landing Pad",
    price: "$79",
    image: "/placeholder.svg?height=300&width=300",
    category: "Landing",
    rating: 5,
    reviews: 189,
    description: "Professional-grade waterproof landing pad with LED lights for safe takeoffs and landings.",
    features: ["Waterproof material", "LED lighting", "Foldable design", "80cm diameter"],
    compatibility: ["All XDroneS Models"],
  },
  {
    id: "gimbal-protector",
    name: "Gimbal Protection Cover",
    price: "$29",
    image: "/placeholder.svg?height=300&width=300",
    category: "Protection",
    rating: 4,
    reviews: 156,
    description: "Transparent protective cover for gimbal and camera during transport and storage.",
    features: ["Crystal clear material", "Shock absorption", "Easy installation", "Dust protection"],
    compatibility: ["Phantom Pro X", "Precision Elite", "Atlas Heavy"],
  },
  {
    id: "battery-pack",
    name: "Extended Battery Pack",
    price: "$199",
    image: "/placeholder.svg?height=300&width=300",
    category: "Power",
    rating: 5,
    reviews: 298,
    description: "High-capacity lithium battery pack extending flight time by up to 50%.",
    features: ["50% longer flight time", "Fast charging", "Temperature monitoring", "Smart battery management"],
    compatibility: ["Phantom Pro X", "Swift Explorer"],
  },
  {
    id: "carrying-case",
    name: "Professional Carrying Case",
    price: "$149",
    image: "/placeholder.svg?height=300&width=300",
    category: "Storage",
    rating: 5,
    reviews: 167,
    description: "Rugged waterproof case with custom foam inserts for complete drone protection.",
    features: ["Waterproof design", "Custom foam inserts", "TSA approved", "Lifetime warranty"],
    compatibility: ["All XDroneS Models"],
  },
  {
    id: "nd-filters",
    name: "ND Filter Set (4-Pack)",
    price: "$89",
    image: "/placeholder.svg?height=300&width=300",
    category: "Camera",
    rating: 5,
    reviews: 203,
    description: "Professional ND filter set for cinematic video recording in various lighting conditions.",
    features: ["ND4, ND8, ND16, ND32", "Multi-coated glass", "Lightweight design", "Quick-swap system"],
    compatibility: ["Phantom Pro X", "Precision Elite"],
  },
]


export default function AccessoriesPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const { dispatch } = useCart()

  const addToCart = (accessory: Accessory) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: accessory.id,
        name: accessory.name,
        price: accessory.price,
        image: accessory.image,
        slug: accessory.id,
      },
    })
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      const headerElements = headerRef.current?.children
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          },
        )
      }

      // Grid animation
      const gridItems = gridRef.current?.children
      if (gridItems) {
        gsap.fromTo(
          gridItems,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          },
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative py-24 bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#0a1a0a]" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_800px_at_50%_200px,#22c55e,transparent)]" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-lime-500/40 bg-lime-500/10 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-lime-400 mr-2" />
              <span className="text-lime-400 text-sm font-semibold tracking-wide">Premium Accessories</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bebas uppercase tracking-wide">
              <span className="text-white block">Drone</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600">
                Accessories
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Enhance your drone experience with our premium accessories designed for safety, performance, and
              convenience.
            </p>

            <div className="h-1 w-24 bg-gradient-to-r from-lime-400 to-lime-600 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Accessories Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {accessories.map((accessory) => (
              <div
                key={accessory.id}
                className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-lime-500/20 border border-lime-500/30">
                    <span className="text-lime-400 text-xs font-semibold">{accessory.category}</span>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 mb-6 flex items-center justify-center">
                    <Image  
                    width={300} 
                    height={300}
                      referrerPolicy="no-referrer"              
                      src={accessory.image || "/placeholder.svg"}
                      alt={accessory.name}
                      className="object-contain h-full drop-shadow-[0_0_25px_rgba(132,204,22,0.3)] transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < accessory.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                          />
                        ))}
                        <span className="text-gray-400 text-xs ml-1">({accessory.reviews})</span>
                      </div>
                      <div className="text-2xl font-bold text-lime-400">{accessory.price}</div>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors">
                      {accessory.name}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">{accessory.description}</p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {accessory.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300 text-sm">
                          <BadgeCheck className="w-3 h-3 text-lime-400 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Compatibility */}
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-400 mb-2">Compatible with:</p>
                      <div className="flex flex-wrap gap-1">
                        {accessory.compatibility.map((model, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(accessory)}
                      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-500/25 mt-6"
                    >
                      <span className="flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
