"use client"

import { useRef, useLayoutEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Cinematographer",
    company: "SkyVision Studios",
    content:
      "The XDroneS Phantom Pro X has revolutionized our aerial cinematography. The 8K video quality and AI-powered stabilization deliver results that exceed our clients' expectations every time.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Construction Manager",
    company: "BuildTech Solutions",
    content:
      "We've been using XDroneS for site surveys and progress monitoring. The precision and reliability have improved our project efficiency by 40%. Outstanding customer support too.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Real Estate Agent",
    company: "Premier Properties",
    content:
      "The drone photography services have transformed how we showcase properties. Our listings get 3x more views, and the professional quality sets us apart from competitors.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Search & Rescue Coordinator",
    company: "Emergency Response Team",
    content:
      "XDroneS thermal imaging capabilities have been crucial in our rescue operations. The reliability and performance in challenging conditions are unmatched.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-lime-400">Customers Say</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust XDroneS for their aerial technology needs
            </p>
          </div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl p-8 md:p-12 border border-white/10 backdrop-blur-sm">
              <div className="flex items-start space-x-6">
                <Quote className="w-12 h-12 text-lime-400 flex-shrink-0 mt-2" />

                <div className="flex-1">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                    &quot;{testimonials[currentIndex].content}&quot;
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        width={60}
                        height={60}
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        className="w-12 h-12 rounded-full border-2 border-lime-500/30"
                      />
                      <div>
                        <h4 className="text-white font-semibold">{testimonials[currentIndex].name}</h4>
                        <p className="text-gray-400 text-sm">
                          {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-lime-500/20 hover:border-lime-500/40 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? "bg-lime-400" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-lime-500/20 hover:border-lime-500/40 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-400 mb-2">10,000+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-400 mb-2">4.9/5</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-400 mb-2">50K+</div>
              <div className="text-gray-400">Flights Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-400 mb-2">99.8%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
