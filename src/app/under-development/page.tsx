"use client"
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Home, Construction } from 'lucide-react';

export default function UnderDevelopmentPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const constructionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Entrance Animation
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }
        );

        // Construction Icon Animation
        if (constructionRef.current) {
            gsap.to(constructionRef.current, {
                rotation: 5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                stagger: (index, target) => {
                    return [5, -5][index % 2];
                }

            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920] opacity-80" />

            <div className="relative z-10 text-center max-w-md p-8">
                <div
                    ref={constructionRef}
                    className="mb-8 flex justify-center"
                >
                    <Construction
                        className="w-48 h-48 text-amber-500 opacity-80"
                        strokeWidth={1}
                    />
                </div>

                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-600">
                    Under Development
                </h1>

                <p className="text-xl text-gray-300 mb-6">
                    We&apos;re working hard to bring you something amazing.
                    Check back soon for updates!
                </p>

                <div className="flex justify-center space-x-4">
                    <Link
                        href="/"
                        className="flex items-center bg-amber-500 text-black px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors group"
                    >
                        <Home className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Return Home
                    </Link>
                </div>
            </div>

            {/* Subtle Background Grid */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full opacity-10"
                >
                    <defs>
                        <pattern
                            id="dev-grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="rgba(217, 119, 6, 0.1)"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#dev-grid)"
                    />
                </svg>
            </div>
        </div>
    );
}