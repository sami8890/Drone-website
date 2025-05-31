"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function DroneHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const droneRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(droneRef.current, {
        x: 100,
        opacity: 0,
      })

      const textElements = textRef.current?.querySelectorAll(".animate-in") || [];
      gsap.set(textElements, {
        y: 30,
        opacity: 0,
      })

      // Main timeline
      const tl = gsap.timeline()

      // Text animation
      if (textElements) {
        tl.to(textElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      // Drone animation
      tl.to(
        droneRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.4",
      )

      // Hover animation for drone
      gsap.to(droneRef.current, {
        y: "+=10",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(132,204,22,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(132,204,22,0.1),transparent_40%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,#84cc1620_1px,transparent_1px),linear-gradient(to_bottom,#84cc1620_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[90vh] py-16 lg:py-24">
          {/* Left content */}
          <div ref={textRef} className="w-full lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            {/* Badge */}
            <div className="animate-in inline-flex items-center px-3 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/20 backdrop-blur-sm">
              <span className="text-lime-400 text-sm font-medium">Next-Gen Drone Technology</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="animate-in text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                <span className="block">Experience the</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">
                  Future of Flight
                </span>
              </h1>

              <p className="animate-in text-lg md:text-xl text-gray-300 max-w-xl">
                Cutting-edge drones with AI-powered navigation, military-grade security, and unmatched performance for
                professionals and enthusiasts.
              </p>
            </div>

            {/* Stats */}
            <div className="animate-in grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-lime-400">99.8%</div>
                <div className="text-sm text-gray-400">Flight Success</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-lime-400">60+ min</div>
                <div className="text-sm text-gray-400">Flight Time</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-lime-400">8K</div>
                <div className="text-sm text-gray-400">Video Quality</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="animate-in flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/Product">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-lime-500/25 transition-all">
                  <span className="flex items-center justify-center">
                    Explore Drones
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </button>
              </Link>

              <button className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all">
                <span className="flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="animate-in flex items-center justify-center lg:justify-start space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-400">Trusted by 10,000+ pilots worldwide</span>
            </div>
          </div>

          {/* Right content - Drone image */}
          <div ref={droneRef} className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-center items-center z-10">
            <div className="relative w-full max-w-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 -z-10 bg-lime-500/10 rounded-full blur-[100px]"></div>

              <Image
                src="/drone.png"
                alt="Advanced Drone"
                width={600}
                height={600}
                className="object-contain drop-shadow-[0_0_30px_rgba(132,204,22,0.3)]"
                priority
              />

              {/* Feature callouts */}
              <div className="absolute top-1/4 -left-4 px-3 py-1.5 bg-black/80 border border-lime-500/30 rounded-lg backdrop-blur-sm text-xs text-lime-400">
                AI Navigation
              </div>

              <div className="absolute bottom-1/4 -right-4 px-3 py-1.5 bg-black/80 border border-lime-500/30 rounded-lg backdrop-blur-sm text-xs text-lime-400">
                4K Camera
              </div>

              <div className="absolute top-1/2 right-1/4 px-3 py-1.5 bg-black/80 border border-lime-500/30 rounded-lg backdrop-blur-sm text-xs text-lime-400">
                60min Battery
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
