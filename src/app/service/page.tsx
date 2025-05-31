"use client"

import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import {
  Wrench,
  Shield,
  Headphones,
  Truck,
  Clock,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Settings,
  Users,
  Zap,
} from "lucide-react"


gsap.registerPlugin(ScrollTrigger)

export default function ServicePage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Drone Repair & Maintenance",
      description: "Professional repair services for all drone models with certified technicians and genuine parts.",
      features: ["Free diagnostics", "90-day warranty", "Same-day service", "Certified technicians"],
      price: "Starting at $99",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Custom Configuration",
      description: "Tailored drone setup and configuration to meet your specific operational requirements.",
      features: ["Performance tuning", "Custom firmware", "Payload integration", "Flight optimization"],
      price: "Starting at $199",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Pilot Training",
      description: "Comprehensive training programs from beginner to advanced commercial drone operations.",
      features: ["Certified instructors", "Hands-on training", "Safety protocols", "Certification prep"],
      price: "Starting at $299",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Insurance & Protection",
      description: "Comprehensive coverage plans to protect your investment and operations.",
      features: ["Damage protection", "Theft coverage", "Liability insurance", "Global coverage"],
      price: "Starting at $49/month",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Performance Upgrades",
      description: "Enhance your drone's capabilities with professional upgrade services.",
      features: ["Hardware upgrades", "Software optimization", "Range extension", "Camera upgrades"],
      price: "Starting at $149",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Technical Support",
      description: "Round-the-clock technical assistance for all your drone-related needs.",
      features: ["Live chat support", "Remote diagnostics", "Video assistance", "Priority response"],
      price: "Starting at $29/month",
    },
  ]

  const supportFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Response Time",
      description: "Average response time under 2 hours for critical issues",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Technicians",
      description: "Certified professionals with years of drone experience",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "On-Site Service",
      description: "Mobile repair units available for enterprise customers",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Warranty Protection",
      description: "Extended warranty options for complete peace of mind",
    },
  ]

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

      // Services animation
      const serviceCards = servicesRef.current?.children
      if (serviceCards) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              once: true,
            },
          },
        )
      }

      // Support features animation
      const supportElements = supportRef.current?.children
      if (supportElements) {
        gsap.fromTo(
          supportElements,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: supportRef.current,
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
        {/* Background elements - matching hero section */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(132,204,22,0.15),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(132,204,22,0.1),transparent_40%)]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#84cc1620_1px,transparent_1px),linear-gradient(to_bottom,#84cc1620_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={headerRef} className="text-center mb-20 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full border border-lime-500/40 bg-lime-500/10 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-lime-400 mr-2" />
              <span className="text-lime-400 text-sm font-semibold tracking-wide">Professional Services</span>
            </div>

            {/* Main Headline - matching hero style */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                <span className="block text-white">Expert Drone</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600">
                  Services & Support
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                From maintenance and repairs to training and support, our comprehensive service offerings ensure your
                drones perform at their peak with military-grade precision.
              </p>
            </div>

            {/* Stats - matching hero section */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-lime-400">24/7</div>
                <div className="text-sm text-gray-400">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-lime-400">99.9%</div>
                <div className="text-sm text-gray-400">Service Success</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-lime-400">2hr</div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="h-1 w-32 bg-gradient-to-r from-lime-400 to-lime-600 mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-lime-500/10 flex items-center justify-center text-lime-400 group-hover:scale-110 group-hover:bg-lime-500/20 transition-all duration-300 mb-6">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-lime-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-lime-400 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lime-400 font-bold text-lg">{service.price}</span>
                    <button className="px-4 py-2 rounded-lg border border-lime-500/30 hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-300 flex items-center text-lime-400 hover:text-lime-300">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Features */}
      <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Our <span className="text-lime-400">Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We&apos;re committed to providing exceptional service and support for all your drone needs
            </p>
          </div>

          <div ref={supportRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {supportFeatures.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-lime-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  )
}
