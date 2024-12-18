"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FacebookIcon,
  LinkedinIcon,
  ChromeIcon,
  GithubIcon,
  TwitterIcon,
} from "lucide-react";

export default function LoginPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial setup
    if (formRef.current && socialRef.current) {
      gsap.set(Array.from(formRef.current.children), {
        y: 50,
        opacity: 0,
      });

      gsap.set(Array.from(socialRef.current.children), {
        y: 30,
        opacity: 0,
        scale: 0.9,
      });

      // Animation timeline
      const timeline = gsap.timeline();

      // Form elements animation
      timeline.to(Array.from(formRef.current.children), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Social login buttons animation
      timeline.to(
        Array.from(socialRef.current.children),
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      return () => {
        timeline.kill();
      };
    }
  }, []);

  const socialLogins = [
    {
      icon: <ChromeIcon className="w-5 h-5" />,
      name: "Google",
      bgColor: "bg-[#db4437]",
    },
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      name: "LinkedIn",
      bgColor: "bg-[#0077b5]",
    },
    {
      icon: <FacebookIcon className="w-5 h-5" />,
      name: "Facebook",
      bgColor: "bg-[#3b5998]",
    },
    {
      icon: <GithubIcon className="w-5 h-5" />,
      name: "GitHub",
      bgColor: "bg-[#333]",
    },
    {
      icon: <TwitterIcon className="w-5 h-5" />,
      name: "Twitter",
      bgColor: "bg-[#1da1f2]",
    },
  ];

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920] animate-gradient-slow">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-md p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl">
        {/* Form Section */}
        <div ref={formRef} className="space-y-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
            Welcome Back
          </h2>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-lime-500 focus:outline-none transition-all duration-300"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-lime-500 focus:outline-none transition-all duration-300"
          />

          {/* Login Button */}
          <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium hover:shadow-lg hover:shadow-lime-500/25 transition-all duration-300 transform hover:-translate-y-1">
            Sign In
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="mx-4 text-gray-400 text-sm">or continue with</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        {/* Social Login */}
        <div ref={socialRef} className="grid grid-cols-5 gap-2">
          {socialLogins.map((social, index) => (
            <button
              key={index}
              className={`
                flex items-center justify-center 
                p-3 rounded-lg 
                ${social.bgColor}
                hover:opacity-80 
                transition-all 
                duration-300
                transform 
                hover:scale-105
              `}
            >
              {social.icon}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Don&apos;t have an account?
          <a href="/signup" className="text-lime-400 ml-2 hover:underline">
            Sign Up
          </a>
        </div>
      </div>

      {/* Gradient Animation Style */}
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
