"use client"

import type React from "react"

import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  DrillIcon as Drone,
  Shield,
  Award,
  Users,
} from "lucide-react"

export default function Footer() {

  const footerLinks = {
    products: [
      { name: "Phantom Pro X", href: "/Product/phantom-pro-x" },
      { name: "Swift Explorer", href: "/Product/swift-explorer" },
      { name: "Precision Elite", href: "/Product/precision-elite" },
      { name: "All Drones", href: "/Product" },
    ],
    services: [
      { name: "Drone Repair", href: "/service" },
      { name: "Pilot Training", href: "/service" },
      { name: "Custom Config", href: "/service" },
      { name: "24/7 Support", href: "/service" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Story", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Contact Us", href: "/contact" },
      { name: "Warranty", href: "/warranty" },
      { name: "Returns", href: "/returns" },
    ],
  }

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", name: "YouTube" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
  ]

  const trustBadges = [
    { icon: <Shield className="w-6 h-6" />, text: "2-Year Warranty" },
    { icon: <Award className="w-6 h-6" />, text: "Industry Leader" },
    { icon: <Users className="w-6 h-6" />, text: "10K+ Customers" },
    { icon: <Drone className="w-6 h-6" />, text: "Premium Quality" },
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black border-t border-lime-500/20">
    

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <span className="text-3xl font-bold text-lime-400">X</span>
              <span className="text-2xl font-semibold text-white">DroneS</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading the future of aerial technology with cutting-edge drones designed for professionals and
              enthusiasts worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 text-lime-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 text-lime-400" />
                <span>support@xdrones.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 text-lime-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-lime-400 hover:bg-lime-500/20 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-lime-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-lime-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-lime-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-lime-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-center justify-center space-x-3 text-gray-400">
              <div className="text-lime-400">{badge.icon}</div>
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 XDroneS. All rights reserved. Built with precision and passion.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-lime-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-lime-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-lime-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
