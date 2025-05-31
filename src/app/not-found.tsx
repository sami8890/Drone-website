"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { Home, Search, Zap } from "lucide-react"

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the 404 number
      gsap.fromTo(
        ".error-number",
        { opacity: 0, scale: 0.5, rotationY: 180 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 1, ease: "back.out(1.7)" },
      )

      // Animate content
      gsap.fromTo(
        ".error-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, stagger: 0.1, ease: "power3.out" },
      )

      // Floating animation for drone
      gsap.to(".floating-drone", {
        y: "+=20",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">

      <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#0a1a0a]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_600px_at_50%_50%,#22c55e,transparent)]" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-lime-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* 404 Number */}
            <div className="error-number">
              <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold font-bebas leading-none">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600">
                  404
                </span>
              </h1>
            </div>

            {/* Floating Drone */}
            <div className="floating-drone relative mx-auto w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-lime-500/20 rounded-full blur-xl"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Zap className="w-16 h-16 text-lime-400" />
              </div>
            </div>

            {/* Error Content */}
            <div className="space-y-6">
              <div className="error-content">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Page Not</span> <span className="text-lime-400">Found</span>
                </h2>
              </div>

              <div className="error-content">
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Looks like this page took an unexpected flight path. The page you&apos;re looking for doesn&apos;t exist or has
                  been moved to a new location.
                </p>
              </div>

              <div className="error-content">
                <p className="text-gray-400 mb-8">
                  Don&apos;t worry, our navigation system will help you get back on course.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="error-content flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/">
                  <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-xl hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-500/25">
                    <span className="flex items-center">
                      <Home className="w-5 h-5 mr-2" />
                      Back to Home
                    </span>
                  </button>
                </Link>

                <Link href="/Product">
                  <button className="px-8 py-4 border-2 border-white/30 hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-300 rounded-xl text-white hover:text-lime-400">
                    <span className="flex items-center">
                      <Search className="w-5 h-5 mr-2" />
                      Browse Products
                    </span>
                  </button>
                </Link>
              </div>

              {/* Quick Links */}
              <div className="error-content pt-8">
                <p className="text-gray-400 mb-4">Or try these popular pages:</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/Product" className="text-lime-400 hover:text-lime-300 transition-colors">
                    Products
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/service" className="text-lime-400 hover:text-lime-300 transition-colors">
                    Services
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/support" className="text-lime-400 hover:text-lime-300 transition-colors">
                    Support
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/about" className="text-lime-400 hover:text-lime-300 transition-colors">
                    About Us
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link href="/contact" className="text-lime-400 hover:text-lime-300 transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
