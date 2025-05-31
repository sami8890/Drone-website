"use client"

import { useState, useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Footer from "@/components/layout/footer" 
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Book,
  Video,
  Download,
  Sparkles,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is the maximum flight time for XDroneS models?",
    answer:
      "Flight times vary by model. Our Precision Elite offers up to 60 minutes, Phantom Pro X provides 45 minutes, and our entry-level models offer 20-30 minutes of flight time.",
    category: "Technical",
  },
  {
    id: 2,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping costs and delivery times vary by location. Most international orders arrive within 7-14 business days.",
    category: "Shipping",
  },
  {
    id: 3,
    question: "What warranty coverage do you provide?",
    answer:
      "All XDroneS products come with a 2-year manufacturer warranty covering defects and malfunctions. Extended warranty options are available for purchase.",
    category: "Warranty",
  },
  {
    id: 4,
    question: "Can I upgrade my drone's camera system?",
    answer:
      "Yes, many of our models support camera upgrades. Our technical team can help you choose compatible upgrades and provide professional installation services.",
    category: "Technical",
  },
  {
    id: 5,
    question: "Do you provide pilot training courses?",
    answer:
      "We offer comprehensive training programs from beginner to advanced levels, including commercial certification preparation and specialized industry training.",
    category: "Training",
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, bank transfers, and offer financing options for qualified customers. Enterprise customers can also set up net payment terms.",
    category: "Payment",
  },
]

const supportOptions = [
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7 Available",
    action: "Start Chat",
  },
  {
    icon: <Phone className="w-8 h-8" />,
    title: "Phone Support",
    description: "Speak directly with our experts",
    availability: "Mon-Fri 9AM-6PM EST",
    action: "Call Now",
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Email Support",
    description: "Send us your questions anytime",
    availability: "Response within 24 hours",
    action: "Send Email",
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: "Video Support",
    description: "Schedule a video call with our team",
    availability: "By Appointment",
    action: "Schedule Call",
  },
]

const resources = [
  {
    icon: <Book className="w-6 h-6" />,
    title: "User Manuals",
    description: "Comprehensive guides for all drone models",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video Tutorials",
    description: "Step-by-step video instructions",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Software Downloads",
    description: "Latest firmware and companion apps",
  },
  {
    icon: <HelpCircle className="w-6 h-6" />,
    title: "Troubleshooting",
    description: "Common issues and solutions",
  },
]

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const supportRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const categories = ["All", "Technical", "Shipping", "Warranty", "Training", "Payment"]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

      // Support options animation
      const supportCards = supportRef.current?.children
      if (supportCards) {
        gsap.fromTo(
          supportCards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
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

      // FAQ animation
      const faqElements = faqRef.current?.children
      if (faqElements) {
        gsap.fromTo(
          faqElements,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqRef.current,
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
              <span className="text-lime-400 text-sm font-semibold tracking-wide">24/7 Support Available</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bebas uppercase tracking-wide">
              <span className="text-white block">How Can We</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600">
                Help You?
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get the support you need with our comprehensive help center, expert technical team, and extensive
              resources.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Get <span className="text-lime-400">Instant Support</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Choose the support method that works best for you</p>
          </div>

          <div ref={supportRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:-translate-y-2 text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-lime-500/10 flex items-center justify-center text-lime-400 group-hover:scale-110 group-hover:bg-lime-500/20 transition-all duration-300 mx-auto mb-6">
                    {option.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-lime-400 transition-colors">{option.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{option.description}</p>

                  <div className="text-sm text-lime-400 mb-6 flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {option.availability}
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-lg hover:from-lime-600 hover:to-lime-700 transition-all">
                    {option.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked <span className="text-lime-400">Questions</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Find quick answers to common questions about our drones and services
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-12 space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-lime-500 text-black"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div ref={faqRef} className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-lime-500/30 transition-all"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-all"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    {openFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-lime-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No FAQs found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Helpful <span className="text-lime-400">Resources</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access manuals, tutorials, and downloads to get the most out of your drone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-lime-500/30 transition-all text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-lime-400 transition-colors">{resource.title}</h3>
                <p className="text-gray-400 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
