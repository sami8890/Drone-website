"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

// Testimonial data type
interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

// Sample testimonial data (would typically come from a server-side data source)
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Thompson",
    position: "Lead Photographer",
    company: "Aerial Media Solutions",
    quote:
      "These drones have completely transformed our aerial photography workflow. The precision and stability are unmatched.",
    avatar: "/testimonials/client1.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "Research Director",
    company: "Environmental Mapping Institute",
    quote:
      "The advanced sensor technology provides unprecedented data collection capabilities for our ecological studies.",
    avatar: "/testimonials/client2.jpeg",
    rating: 4,
  },
  {
    id: 3,
    name: "John Doe",
    position: "Chief Innovation Officer",
    company: "TechFrontiers Inc.",
    quote:
      "A game-changing solution that pushes the boundaries of drone technology and industrial applications.",
    avatar: "/testimonials/client3.jpeg",
    rating: 5,
  },
];

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-lime-500 fill-lime-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function TestimonialSection() {
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered entrance animation
    const testimonialElements = testimonialRefs.current.filter(Boolean);

    gsap.fromTo(
      testimonialElements,
      {
        y: 50,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Hover interactions
    testimonialElements.forEach((el) => {
      if (el) {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(109, 255, 51, 0.2)",
            duration: 0.3,
            ease: "power1.out",
          });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power1.out",
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-black text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920] opacity-80" />

      {/* Section Header */}
      <div className="relative max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-wide">
          What 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
            Our Clients 
          </span>
          Say
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Real experiences from professionals who have revolutionized their work
          with our drone technology.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="relative grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            ref={(el) => {
              testimonialRefs.current[index] = el;
            }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-lime-500/50 group"
          >
            <Quote className="text-lime-500 mb-4 opacity-50 w-12 h-12" />

            <p className="text-gray-300 mb-6 italic">&quot;{testimonial.quote}&quot;</p>

            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="rounded-full object-cover border-2 border-lime-500/50 group-hover:border-lime-500 transition-all"
                />
              </div>

              <div>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-400">
                  {testimonial.position}, {testimonial.company}
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
