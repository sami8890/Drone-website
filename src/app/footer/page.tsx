"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const socialIconsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const newsletterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure animations only run on client-side
    if (typeof window !== "undefined") {
      // Store the current social icons for the cleanup function
      const currentSocialIcons = socialIconsRef.current;

      // Social Icons Hover Animation
      currentSocialIcons.forEach((icon) => {
        if (icon) {
          const hoverAnimation = (scale: number, color: string) => {
            gsap.to(icon, {
              scale,
              color,
              duration: 0.3,
              ease: "power1.out",
            });
          };

          const mouseEnterHandler = () => hoverAnimation(1.2, "#84cc16");
          const mouseLeaveHandler = () => hoverAnimation(1, "white");

          icon.addEventListener("mouseenter", mouseEnterHandler);
          icon.addEventListener("mouseleave", mouseLeaveHandler);

          // Store handlers for removal in cleanup
          (icon as any).mouseEnterHandler = mouseEnterHandler;
          (icon as any).mouseLeaveHandler = mouseLeaveHandler;
        }
      });

      // Footer Entrance Animation with improved trigger
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom", // Trigger when top of footer enters bottom of viewport
              end: "bottom top", // Complete animation when bottom of footer leaves top of viewport
              toggleActions: "play none none reverse", // Play forward on enter, reverse on leave
            },
          }
        );
      }

      // Newsletter Input Focus Animation
      const newsletterInput = newsletterRef.current?.querySelector("input");
      if (newsletterInput) {
        newsletterInput.addEventListener("focus", () =>
          gsap.to(newsletterRef.current, {
            borderColor: "#84cc16",
            boxShadow: "0 0 10px rgba(132, 204, 22, 0.3)",
            duration: 0.3,
          })
        );

        newsletterInput.addEventListener("blur", () =>
          gsap.to(newsletterRef.current, {
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow: "none",
            duration: 0.3,
          })
        );
      }

      // Cleanup event listeners
      return () => {
        currentSocialIcons.forEach((icon) => {
          if (icon) {
            icon.removeEventListener(
              "mouseenter",
              (icon as any).mouseEnterHandler
            );
            icon.removeEventListener(
              "mouseleave",
              (icon as any).mouseLeaveHandler
            );
          }
        });

        // Additional cleanup for ScrollTrigger
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []); // Empty dependency array ensures this runs once after initial render

  const socialLinks = [
    {
      icon: <Facebook className="w-6 h-6" />,
      href: "/under-development",
      label: "Facebook",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "/under-development",
      label: "Instagram",
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "/under-development",
      label: "Twitter",
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      href: "/under-development",
      label: "YouTube",
    },
  ];

  const navigationLinks = {
    "Product Categories": [
      { name: "Drone Models", href: "/under-development" },
      { name: "Accessories", href: "/under-development" },
      { name: "Professional Series", href: "/under-development" },
      { name: "Custom Solutions", href: "/under-development" },
    ],
    Company: [
      { name: "About Us", href: "/under-development" },
      { name: "Careers", href: "/under-development" },
      { name: "Press", href: "/under-development" },
      { name: "Investors", href: "/under-development" },
    ],
    Support: [
      { name: "Help Center", href: "/under-development" },
      { name: "Documentation", href: "/under-development" },
      { name: "Community", href: "/under-development" },
      { name: "Contact Support", href: "/under-development" },
    ],
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920] opacity-80" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        {/* Company Information */}
        <div>
          <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
            DroneX
          </h3>
          <p className="text-gray-300 mb-6">
            Revolutionizing aerial technology with cutting-edge drone solutions
            for professionals and enthusiasts.
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  socialIconsRef.current[index] = el;
                }}
                aria-label={link.label}
                className="text-white hover:text-lime-500 transition-colors"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        {Object.entries(navigationLinks).map(([category, links]) => (
          <div key={category}>
            <h4 className="font-semibold mb-6 text-lime-400">{category}</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-lime-500 flex items-center group transition-colors"
                  >
                    {link.name}
                    <ExternalLink className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 text-lime-500 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-semibold mb-6 text-lime-400">Stay Updated</h4>
          <div
            ref={newsletterRef}
            className="bg-white/5 border border-white/10 rounded-lg p-4 transition-all duration-300"
          >
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to our newsletter for the latest drone innovations
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent border-b border-white/20 focus:border-lime-500 text-white placeholder-gray-500 outline-none pb-2"
              />
              <button
                className="ml-2 text-lime-500 hover:text-lime-400 transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Legal */}
      <div className="relative max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <div className="flex items-center space-x-2 text-gray-300">
            <Mail className="w-5 h-5 text-lime-500" />
            <span>sami.gabol13@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <Phone className="w-5 h-5 text-lime-500" />
            <span>+92 3302855702</span>
          </div>
        </div>

        <div className="flex space-x-4 text-gray-400 text-sm">
          <Link
            href="/under-development"
            className="hover:text-lime-500 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/under-development"
            className="hover:text-lime-500 transition-colors"
          >
            Terms of Service
          </Link>
          <span>© {new Date().getFullYear()} DroneX. All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
