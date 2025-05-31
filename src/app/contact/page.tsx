"use client"

import type React from "react"

import { useState, useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Sparkles, CheckCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const contactMethods = [
  {
    icon: <Phone className="w-8 h-8" />,
    title: "Phone Support",
    description: "Speak directly with our experts",
    contact: "+1 (555) 123-4567",
    availability: "Mon-Fri 9AM-6PM EST",
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Email Support",
    description: "Send us your questions anytime",
    contact: "support@xdrones.com",
    availability: "Response within 24 hours",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Live Chat",
    description: "Get instant help from our team",
    contact: "Available on website",
    availability: "24/7 Available",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Technical Support",
    description: "Expert help for technical issues",
    contact: "tech@xdrones.com",
    availability: "Mon-Fri 8AM-8PM EST",
  },
]

const offices = [
  {
    city: "San Francisco",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@xdrones.com",
  },
  {
    city: "New York",
    address: "456 Tech Avenue, New York, NY 10001",
    phone: "+1 (555) 987-6543",
    email: "ny@xdrones.com",
  },
  {
    city: "Austin",
    address: "789 Startup Blvd, Austin, TX 73301",
    phone: "+1 (555) 456-7890",
    email: "austin@xdrones.com",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      type: "general",
    })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
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

      // Form animation
      const formElements = formRef.current?.children
      if (formElements) {
        gsap.fromTo(
          formElements,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              once: true,
            },
          },
        )
      }

      // Contact methods animation
      const contactCards = contactRef.current?.children
      if (contactCards) {
        gsap.fromTo(
          contactCards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
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
              <span className="text-lime-400 text-sm font-semibold tracking-wide">Get In Touch</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bebas uppercase tracking-wide">
              <span className="text-white block">Contact</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600">
                Our Team
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our drones or need expert advice? Our team is here to help you find the perfect
              aerial solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div ref={formRef} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Send Us a <span className="text-lime-400">Message</span>
                </h2>
                <p className="text-gray-400">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
              </div>

              {isSubmitted && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-400">Message sent successfully! We&apos;ll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="sales">Sales</option>
                      <option value="support">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media & Press</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg font-bold transition-all ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-lime-500 to-lime-600 text-black hover:from-lime-600 hover:to-lime-700 hover:shadow-lg hover:shadow-lime-500/25"
                  }`}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 inline" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Get in <span className="text-lime-400">Touch</span>
                </h2>
                <p className="text-gray-400">
                  Choose the best way to reach us. Our team is ready to assist you with any questions or concerns.
                </p>
              </div>

              <div ref={contactRef} className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-lime-500/30 transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-lime-500/10 flex items-center justify-center text-lime-400 flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{method.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                        <p className="text-lime-400 font-medium mb-1">{method.contact}</p>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          {method.availability}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Locations */}
              <div className="pt-8">
                <h3 className="text-xl font-bold mb-6">
                  Our <span className="text-lime-400">Offices</span>
                </h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <h4 className="text-white font-semibold mb-2">{office.city}</h4>
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-lime-400" />
                          {office.address}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-lime-400" />
                          {office.phone}
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-lime-400" />
                          {office.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
