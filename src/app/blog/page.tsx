"use client"

import { useRef, useLayoutEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Calendar, User, ArrowRight, Search, Tag, Clock, Sparkles, TrendingUp, Camera, Shield, Zap } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured: boolean
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: "future-of-drone-technology",
    title: "The Future of Drone Technology: What to Expect in 2024",
    excerpt:
      "Explore the latest innovations in drone technology, from AI-powered autonomous flight to advanced imaging systems that are reshaping industries.",
    content: "",
    author: "Alex Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    tags: ["AI", "Innovation", "Future Tech"],
  },
  {
    id: "drone-photography-tips",
    title: "10 Essential Tips for Professional Drone Photography",
    excerpt:
      "Master the art of aerial photography with these expert tips and techniques that will elevate your drone photography to professional levels.",
    content: "",
    author: "Sarah Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Photography",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["Photography", "Tips", "Professional"],
  },
  {
    id: "drone-regulations-2024",
    title: "Understanding Drone Regulations: A Complete Guide for 2024",
    excerpt:
      "Stay compliant with the latest drone regulations and understand what you need to know before taking your drone to the skies.",
    content: "",
    author: "Michael Thompson",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Regulations",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["Regulations", "Legal", "Safety"],
  },
  {
    id: "commercial-drone-applications",
    title: "Commercial Drone Applications: Transforming Industries",
    excerpt:
      "Discover how drones are revolutionizing industries from agriculture and construction to search and rescue operations.",
    content: "",
    author: "Emily Zhang",
    date: "2024-01-08",
    readTime: "10 min read",
    category: "Business",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["Commercial", "Industry", "Applications"],
  },
  {
    id: "drone-maintenance-guide",
    title: "Complete Drone Maintenance Guide: Keep Your Drone Flying",
    excerpt:
      "Learn essential maintenance tips and best practices to ensure your drone stays in perfect condition and performs at its best.",
    content: "",
    author: "David Wilson",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Maintenance",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["Maintenance", "Care", "Longevity"],
  },
  {
    id: "ai-powered-drones",
    title: "AI-Powered Drones: The Next Generation of Autonomous Flight",
    excerpt:
      "Explore how artificial intelligence is enabling drones to fly smarter, safer, and more efficiently than ever before.",
    content: "",
    author: "Lisa Park",
    date: "2024-01-03",
    readTime: "9 min read",
    category: "Technology",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["AI", "Autonomous", "Innovation"],
  },
]

const categories = ["All", "Technology", "Photography", "Regulations", "Business", "Maintenance"]

const categoryIcons = {
  Technology: <Zap className="w-4 h-4" />,
  Photography: <Camera className="w-4 h-4" />,
  Regulations: <Shield className="w-4 h-4" />,
  Business: <TrendingUp className="w-4 h-4" />,
  Maintenance: <Tag className="w-4 h-4" />,
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const headerRef = useRef<HTMLDivElement>(null)
  const postsRef = useRef<HTMLDivElement>(null)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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

      // Posts animation
      const postCards = postsRef.current?.children
      if (postCards) {
        gsap.fromTo(
          postCards,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: postsRef.current,
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
  }, [filteredPosts])

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
              <span className="text-lime-400 text-sm font-semibold tracking-wide">Drone Insights</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bebas uppercase tracking-wide">
              <span className="text-white block">XDroneS</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600">
                Blog
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest drone technology trends, expert tips, industry insights, and comprehensive
              guides from our team of aerial technology specialists.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gradient-to-br from-gray-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
                    selectedCategory === category
                      ? "bg-lime-500 text-black"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {category !== "All" && categoryIcons[category as keyof typeof categoryIcons]}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Featured <span className="text-lime-400">Article</span>
              </h2>

              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-lime-500/30 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      width={600}
                      height={400}
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-lime-500 text-black text-sm font-semibold rounded-full">
                      Featured
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-lime-500/20 text-lime-400 text-sm font-medium rounded-full">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {featuredPost.readTime}
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed mb-6">{featuredPost.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-lime-500/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-lime-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{featuredPost.author}</p>
                          <p className="text-gray-400 text-sm">Author</p>
                        </div>
                      </div>

                      <Link href={`/blog/${featuredPost.id}`}>
                        <button className="px-6 py-3 bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold rounded-lg hover:from-lime-600 hover:to-lime-700 transition-all flex items-center">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-900/50 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Latest <span className="text-lime-400">Articles</span>
              </h2>
              <p className="text-gray-400">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No articles found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("All")
                  }}
                  className="mt-4 px-6 py-3 bg-lime-500/20 text-lime-400 rounded-lg hover:bg-lime-500/30 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-gradient-to-br from-white/5 to-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-lime-500/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-lime-400 text-sm font-medium rounded-full">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-lime-400 transition-colors leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed">{post.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-white/10 text-gray-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-lime-500/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-lime-400" />
                          </div>
                          <span className="text-gray-300 text-sm">{post.author}</span>
                        </div>

                        <Link href={`/blog/${post.id}`}>
                          <button className="text-lime-400 hover:text-lime-300 transition-colors flex items-center text-sm font-medium">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
