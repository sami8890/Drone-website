"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownCircle, Shield, Zap } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const DroneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M12 2L8 6h8l-4-4z" />
    <path d="M12 22l4-4H8l4 4z" />
    <path d="M2 12l4-4v8l-4-4z" />
    <path d="M22 12l-4-4v8l4-4z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function Hero() {
  const droneRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <DroneIcon />,
      title: "Advanced Tech",
      description: "Latest drone technology",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe & Secure",
      description: "Enhanced safety features",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "High Performance",
      description: "Superior flight capabilities",
    },
  ];

  useEffect(() => {
    // Set initial states
    gsap.set(droneRef.current, {
      x: "100vw", // Start from right side of screen
      y: "50vh", // Start from middle height
      rotation: -15, // Slight tilt
      scale: 0.8,
      opacity: 0,
    });

    gsap.set(textRef.current?.children || [], {
      y: 50,
      opacity: 0,
    });

    // Main content animations
    const mainTimeline = gsap.timeline();

    // Drone flying in animation
    mainTimeline.to(droneRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power2.out",
      onComplete: () => {
        // Start hovering animation after flying in
        gsap.to(droneRef.current, {
          y: "+=10",
          rotation: "+=2",
          duration: 2,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      },
    });

    // Text fade in animation
    mainTimeline.to(
      textRef.current?.children || [],
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=1"
    ); // Start slightly before drone animation ends

    // Features animation
    mainTimeline.fromTo(
      featuresRef.current?.children || [],
      {
        y: 30,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Add a quick shake effect when hovering over the drone
    if (droneRef.current) {
      droneRef.current.addEventListener("mouseenter", () => {
        gsap.to(droneRef.current, {
          rotation: "+=5",
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        });
      });
    }

    return () => {
      mainTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920] animate-gradient-slow">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div
            className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
            ref={textRef}
          >
            {/* Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start px-4 py-2 rounded-full border border-lime-500/30 bg-lime-500/10 backdrop-blur-sm">
              <span className="text-lime-400 text-sm font-medium">
                Welcome to the Future
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-bold tracking-wide leading-none font-[Bebas Neue] uppercase transition-transform duration-300 ease-in-out hover:scale-105">
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 lg:mb-4">
                <span className="inline-block">A</span>
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
                  NEW
                </span>
                <span className="inline-block">ERA</span>
              </span>
           
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                OF DRONES
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 opacity-90">
              Experience the future of aerial technology with our cutting-edge
              drone solutions, designed to revolutionize your perspective.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/product">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium hover:shadow-lg hover:shadow-lime-500/25 transition-all duration-300 transform hover:-translate-y-1">
                Explore Now
              </button>
              </Link>

              <button className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Drone Image */}
          <div
            ref={droneRef}
            className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src="/one.png"
                alt="Advanced Drone Technology"
                width={600}
                height={400}
                className="object-contain drop-shadow-[0_0_25px_rgba(0,255,150,0.3)] transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="relative w-full max-w-7xl mx-auto px-4 pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-lime-500/10 flex items-center justify-center text-lime-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="relative flex justify-center pb-8 animate-bounce">
        <ArrowDownCircle className="w-6 h-6 text-white/50" />
      </div>

      <style jsx>{`
        @keyframes gradient-slow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-slow {
          animation: gradient-slow 15s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </main>
  );
}
