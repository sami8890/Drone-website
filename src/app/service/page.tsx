"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Radar,
  Camera,
  Factory,
  Wheat,
  Ambulance,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  capabilities: string[];
  industries: string[];
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // Scroll-triggered reveal animation
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover interactions
      const content = card.querySelector(".service-content");
      const tl = gsap.timeline({ paused: true });

      tl.to(card, {
        boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      }).to(
        content,
        {
          y: -10,
          duration: 0.3,
          ease: "power2.out",
        },
        0
      );

      card.addEventListener("mouseenter", () => tl.play());
      card.addEventListener("mouseleave", () => tl.reverse());

      return () => {
        tl.kill();
        card.removeEventListener("mouseenter", () => tl.play());
        card.removeEventListener("mouseleave", () => tl.reverse());
      };
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-500/50 transition-all duration-300 will-change-transform"
    >
      <div className="service-content space-y-4">
        <div className="text-lime-400 mb-4 transition-transform group-hover:-translate-y-2">
          {service.icon}
        </div>
        <h3 className="text-xl font-semibold transition-colors ">
          {service.title}
        </h3>
        <p className="text-gray-400 text-sm">{service.description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-lime-300">
            Key Capabilities
          </h4>
          <ul className="space-y-1">
            {service.capabilities.map((cap, idx) => (
              <li
                key={idx}
                className="text-xs text-gray-300 flex items-center transform transition-transform group-hover:translate-x-1"
              >
                <span className="w-2 h-2 bg-lime-400 mr-2 rounded-full"></span>
                {cap}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-medium text-lime-300">Industries</h4>
          <div className="flex flex-wrap gap-2">
            {service.industries.map((industry, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-lime-500/10 text-lime-300 text-xs rounded-full transition-all group-hover:bg-lime-500/20"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="flex items-center justify-center">
            Learn More <ArrowRight className="w-4 h-4 ml-2" />
          </span>
        </button>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      icon: <Radar className="w-10 h-10" />,
      title: "Aerial Mapping & Surveying",
      description:
        "Advanced geospatial data collection with centimeter-level precision.",
      capabilities: [
        "High-resolution orthomosaic mapping",
        "3D terrain modeling",
        "Volume calculation",
        "GIS data integration",
      ],
      industries: ["Construction", "Mining", "Urban Planning"],
    },
    {
      icon: <Camera className="w-10 h-10" />,
      title: "Professional Photography & Videography",
      description:
        "Cinematic aerial content creation for diverse visual storytelling.",
      capabilities: [
        "4K/8K video capture",
        "Stabilized gimbal systems",
        "Custom flight path programming",
        "Low-light performance",
      ],
      industries: ["Film", "Real Estate", "Tourism"],
    },
    {
      icon: <Factory className="w-10 h-10" />,
      title: "Industrial Inspection",
      description: "Non-destructive testing and asset management solutions.",
      capabilities: [
        "Thermal imaging",
        "Live infrastructure assessment",
        "Detailed damage detection",
        "Remote monitoring",
      ],
      industries: ["Energy", "Infrastructure", "Utilities"],
    },
    {
      icon: <Wheat className="w-10 h-10" />,
      title: "Agricultural Monitoring",
      description: "Precision agriculture through advanced aerial analytics.",
      capabilities: [
        "Crop health assessment",
        "Multispectral imaging",
        "Irrigation mapping",
        "Yield optimization",
      ],
      industries: ["Agriculture", "Farming", "Research"],
    },
    {
      icon: <Ambulance className="w-10 h-10" />,
      title: "Emergency Response Support",
      description: "Critical situational awareness and rapid deployment.",
      capabilities: [
        "Search and rescue operations",
        "Real-time disaster mapping",
        "Thermal human detection",
        "Emergency supply delivery",
      ],
      industries: ["Disaster Management", "Public Safety", "Humanitarian Aid"],
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const headerElements = headerRef.current?.children;
      if (headerElements) {
        gsap.fromTo(
          headerElements,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_800px_at_50%_-100px,#3e3e3e,transparent)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-lime-500/30 bg-lime-500/10 backdrop-blur-sm">
            <span className="text-lime-400 text-sm font-medium">
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Bebas Neue] uppercase tracking-wide">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
              Transforming
            </span>{" "}
            Industries with Precision Aerial Solutions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Cutting-edge drone technologies delivering comprehensive solutions
            across multiple sectors, combining innovation, expertise, and
            unparalleled performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex space-x-4">
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium hover:scale-105 transition-transform">
              Explore All Services
            </button>
            <button className="px-6 py-3 rounded-lg border border-lime-500/30 text-lime-400 font-medium hover:bg-lime-500/10 transition-colors">
              Request a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
