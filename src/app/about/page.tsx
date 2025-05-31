// "use client"

// import { useRef, useLayoutEffect } from "react"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import Footer from "@/components/layout/footer"
// import { Target, Eye, Users, Globe, Shield, Sparkles, ArrowRight, Linkedin, Twitter } from "lucide-react"

// gsap.registerPlugin(ScrollTrigger)

// const teamMembers = [
//   {
//     name: "Alex Chen",
//     role: "CEO & Founder",
//     image: "/placeholder.svg?height=300&width=300",
//     bio: "Former aerospace engineer with 15+ years in drone technology. Led development teams at major tech companies.",
//     social: { linkedin: "#", twitter: "#" },
//   },
//   {
//     name: "Sarah Rodriguez",
//     role: "CTO",
//     image: "/placeholder.svg?height=300&width=300",
//     bio: "AI and robotics expert. PhD in Computer Science from MIT. Pioneer in autonomous flight systems.",
//     social: { linkedin: "#", twitter: "#" },
//   },
//   {
//     name: "Michael Thompson",
//     role: "Head of Design",
//     image: "/placeholder.svg?height=300&width=300",
//     bio: "Award-winning industrial designer. 10+ years creating user-centric technology products.",
//     social: { linkedin: "#", twitter: "#" },
//   },
//   {
//     name: "Emily Zhang",
//     role: "VP of Engineering",
//     image: "/placeholder.svg?height=300&width=300",
//     bio: "Hardware engineering specialist. Former lead engineer at top drone manufacturers.",
//     social: { linkedin: "#", twitter: "#" },
//   },
// ]

// const milestones = [
//   { year: "2019", title: "Company Founded", description: "Started with a vision to democratize aerial technology" },
//   { year: "2020", title: "First Product Launch", description: "Released our flagship Phantom Pro series" },
//   { year: "2021", title: "Series A Funding", description: "Raised $10M to expand our product line" },
//   { year: "2022", title: "Global Expansion", description: "Launched in 25+ countries worldwide" },
//   { year: "2023", title: "AI Integration", description: "Introduced advanced AI-powered flight systems" },
//   { year: "2024", title: "Industry Leader", description: "Became the #1 choice for professional pilots" },
// ]

// const values = [
//   {
//     icon: <Target className="w-8 h-8" />,
//     title: "Innovation First",
//     description: "We push the boundaries of what's possible in aerial technology.",
//   },
//   {
//     icon: <Shield className="w-8 h-8" />,
//     title: "Safety & Reliability",
//     description: "Every product is built with the highest safety standards in mind.",
//   },
//   {
//     icon: <Users className="w-8 h-8" />,
//     title: "Customer Obsessed",
//     description: "Our customers' success drives everything we do.",
//   },
//   {
//     icon: <Globe className="w-8 h-8" />,
//     title: "Global Impact",
//     description: "Making advanced drone technology accessible worldwide.",
//   },
// ]

// export default function AboutPage() {
//   const headerRef = useRef<HTMLDivElement>(null)
//   const storyRef = useRef<HTMLDivElement>(null)
//   const teamRef = useRef<HTMLDivElement>(null)
//   const valuesRef = useRef<HTMLDivElement>(null)

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // Header animation
//       const headerElements = headerRef.current?.children
//       if (headerElements) {
//         gsap.fromTo(
//           headerElements,
//           { opacity: 0, y: 50 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             stagger: 0.2,
//             ease: "power3.out",
//           },
//         )
//       }

//       // Story animation
//       const storyElements = storyRef.current?.children
//       if (storyElements) {
//         gsap.fromTo(
//           storyElements,
//           { opacity: 0, y: 60 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             stagger: 0.2,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: storyRef.current,
//               start: "top 80%",
//               once: true,
//             },
//           },
//         )
//       }

//       // Team animation
//       const teamCards = teamRef.current?.children
//       if (teamCards) {
//         gsap.fromTo(
//           teamCards,
//           { opacity: 0, y: 60, scale: 0.9 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 0.8,
//             stagger: 0.1,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: teamRef.current,
//               start: "top 80%",
//               once: true,
//             },
//           },
//         )
//       }

//       // Values animation
//       const valueCards = valuesRef.current?.children
//       if (valueCards) {
//         gsap.fromTo(
//           valueCards,
//           { opacity: 0, x: -50 },
//           {
//             opacity: 1,
//             x: 0,
//             duration: 0.8,
//             stagger: 0.1,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: valuesRef.current,
//               start: "top 80%",
//               once: true,
//             },
//           },
//         )
//       }
//     })

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill())
//       ctx.revert()
//     }
//   }, [])

//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* Hero Section */}
//       <section className="relative py-24 bg-black text-white overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#0a1a0a]" />
//           <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_800px_at_50%_200px,#22c55e,transparent)]" />
//         </div>

//         <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
//           <div ref={headerRef} className="text-center mb-20 space-y-6">
//             <div className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-lime-500/40 bg-lime-500/10 backdrop-blur-md shadow-lg">
//               <Sparkles className="w-4 h-4 text-lime-400 mr-2" />
//               <span className="text-lime-400 text-sm font-semibold tracking-wide">Our Story</span>
//             </div>

//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bebas uppercase tracking-wide">
//               <span className="text-white block">Pioneering the</span>
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600">
//                 Future of Flight
//               </span>
//             </h1>

//             <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//               From a small startup to the world&apos;s leading drone technology company, our journey is driven by innovation,
//               passion, and the belief that the sky is not the limit.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Company Story */}
//       <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div ref={storyRef} className="max-w-6xl mx-auto">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//               <div className="space-y-8">
//                 <div>
//                   <h2 className="text-4xl font-bold mb-6">
//                     Our <span className="text-lime-400">Mission</span>
//                   </h2>
//                   <div className="flex items-start space-x-4 mb-6">
//                     <Target className="w-8 h-8 text-lime-400 flex-shrink-0 mt-1" />
//                     <p className="text-gray-300 leading-relaxed text-lg">
//                       To democratize aerial technology and empower creators, professionals, and innovators worldwide
//                       with cutting-edge drone solutions that push the boundaries of what&apos;s possible.
//                     </p>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold mb-4">
//                     Our <span className="text-lime-400">Vision</span>
//                   </h3>
//                   <div className="flex items-start space-x-4">
//                     <Eye className="w-8 h-8 text-lime-400 flex-shrink-0 mt-1" />
//                     <p className="text-gray-300 leading-relaxed">
//                       A world where advanced aerial technology is accessible to everyone, enabling new perspectives,
//                       solving complex challenges, and creating opportunities we never imagined.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-6 pt-8">
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-lime-400 mb-2">50K+</div>
//                     <div className="text-gray-400 text-sm">Drones Sold</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-lime-400 mb-2">25+</div>
//                     <div className="text-gray-400 text-sm">Countries</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-3xl font-bold text-lime-400 mb-2">99.8%</div>
//                     <div className="text-gray-400 text-sm">Satisfaction</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="absolute inset-0 bg-lime-500/10 rounded-3xl blur-3xl"></div>
//                 <img
//                   src="/placeholder.svg?height=500&width=600"
//                   alt="XDroneS Team"
//                   className="relative rounded-3xl border border-lime-500/20 shadow-2xl"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Timeline */}
//       <section className="py-20 bg-black">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">
//               Our <span className="text-lime-400">Journey</span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">Key milestones that shaped our company</p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             <div className="relative">
//               {/* Timeline line */}
//               <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-lime-400 to-lime-600"></div>

//               {milestones.map((milestone, index) => (
//                 <div
//                   key={index}
//                   className={`relative flex items-center mb-12 ${index % 2 === 0 ? "" : "flex-row-reverse"}`}
//                 >
//                   <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
//                     <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
//                       <div className="text-lime-400 font-bold text-lg mb-2">{milestone.year}</div>
//                       <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
//                       <p className="text-gray-400">{milestone.description}</p>
//                     </div>
//                   </div>

//                   {/* Timeline dot */}
//                   <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-lime-400 rounded-full border-4 border-black"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">
//               Meet Our <span className="text-lime-400">Team</span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">The brilliant minds behind XDroneS innovation and success</p>
//           </div>

//           <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//             {teamMembers.map((member, index) => (
//               <div
//                 key={index}
//                 className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:-translate-y-2 text-center"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                 <div className="relative z-10">
//                   <div className="relative w-24 h-24 mx-auto mb-6">
//                     <img
//                       src={member.image || "/placeholder.svg"}
//                       alt={member.name}
//                       className="w-full h-full rounded-full border-2 border-lime-500/30 group-hover:border-lime-400 transition-colors"
//                     />
//                   </div>

//                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-400 transition-colors">
//                     {member.name}
//                   </h3>
//                   <p className="text-lime-400 font-medium mb-4">{member.role}</p>
//                   <p className="text-gray-400 text-sm leading-relaxed mb-6">{member.bio}</p>

//                   <div className="flex justify-center space-x-3">
//                     <a
//                       href={member.social.linkedin}
//                       className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-lime-400 hover:bg-lime-500/20 transition-all"
//                     >
//                       <Linkedin className="w-4 h-4" />
//                     </a>
//                     <a
//                       href={member.social.twitter}
//                       className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-lime-400 hover:bg-lime-500/20 transition-all"
//                     >
//                       <Twitter className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-20 bg-black">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">
//               Our <span className="text-lime-400">Values</span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide everything we do</p>
//           </div>

//           <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//             {values.map((value, index) => (
//               <div
//                 key={index}
//                 className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:-translate-y-2 text-center"
//               >
//                 <div className="w-16 h-16 rounded-2xl bg-lime-500/10 flex items-center justify-center text-lime-400 mx-auto mb-6">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
//                 <p className="text-gray-400 leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
//             <p className="text-gray-400 text-lg mb-8">
//               Ready to be part of the future of aerial technology? Explore career opportunities or partner with us.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="px-8 py-4 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-xl hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-105">
//                 <span className="flex items-center justify-center">
//                   View Careers
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </span>
//               </button>
//               <button className="px-8 py-4 border-2 border-white/30 hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-300 rounded-xl text-white hover:text-lime-400">
//                 Partner With Us
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState, useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Mail, Phone, Clock, Send, MessageCircle,  CheckCircle, Linkedin } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

// Developer information
const developerInfo = {
  name: "Sami",
  role: "Developer & web design Specialist",
  image: "/sami2.jpg", 
  linkedin: "/https://pk.linkedin.com/in/muhammad-sami-gabol", 
  whatsapp: "+92 3302855702",
  email: "sami.gabol13@gmal.com", 
}

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
  const developerRef = useRef<HTMLDivElement>(null)

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

      // Developer animation
      const developerCard = developerRef.current
      if (developerCard) {
        gsap.fromTo(
          developerCard,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: developerRef.current,
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


      {/* Contact Form & Developer Info */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div ref={formRef} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Send Me a <span className="text-lime-400">Message</span>
                </h2>
                <p className="text-gray-400">Fill out the form below and I&apos;ll get back to you as soon as possible.</p>
              </div>

              {isSubmitted && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-green-400">Message sent successfully! I&apos;ll get back to you soon.</span>
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
                      placeholder="abdullah"
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
                      placeholder="adc@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-50 mb-2">
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-950 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="project">Project Collaboration</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Opportunity</option>
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
                    placeholder="How can I help you?"
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
                    placeholder="Tell me more about your inquiry..."
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

            {/* Developer Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  About the <span className="text-lime-400">Developer</span>
                </h2>
                <p className="text-gray-400">
                  I&apos;m passionate about drone technology and web development. Feel free to reach out to me directly.
                </p>
              </div>

              <div
                ref={developerRef}
                className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-8 border border-white/10"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-lime-500/30">
                    <Image
                      src={developerInfo.image || "/placeholder.svg"}
                      alt={developerInfo.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{developerInfo.name}</h3>
                    <p className="text-lime-400 font-medium mb-4">{developerInfo.role}</p>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <Mail className="w-5 h-5 text-lime-400 mr-3 flex-shrink-0" />
                        <a href={`mailto:${developerInfo.email}`} className="hover:text-lime-400 transition-colors">
                          {developerInfo.email}
                        </a>
                      </div>

                      <div className="flex items-center text-gray-300">
                        <Phone className="w-5 h-5 text-lime-400 mr-3 flex-shrink-0" />
                        <a
                          href={`https://wa.me/${developerInfo.whatsapp.replace(/[+\s]/g, "")}`}
                          className="hover:text-lime-400 transition-colors"
                        >
                          {developerInfo.whatsapp} (WhatsApp)
                        </a>
                      </div>

                      <div className="flex items-center text-gray-300">
                        <Linkedin className="w-5 h-5 text-lime-400 mr-3 flex-shrink-0" />
                        <a
                          href={developerInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-lime-400 transition-colors"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${developerInfo.whatsapp.replace(/[+\s]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Me
                </a>

                <a
                  href={developerInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Connect on LinkedIn
                </a>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-6 border border-white/10">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-lime-400 mr-3" />
                  <h3 className="text-xl font-bold">Availability</h3>
                </div>
                <p className="text-gray-300">
                  I typically respond to inquiries within 24 hours. Feel free to reach out anytime!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
          </div>
  )
}
