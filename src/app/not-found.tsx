"use client"
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Home, RefreshCw, Plane } from 'lucide-react';

export default function NotFoundPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const droneRef = useRef<HTMLDivElement>(null);

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

        // Drone Hover Animation
        if (droneRef.current) {
            gsap.to(droneRef.current, {
                y: [-10, 10] as any, // Type assertion to resolve GSAP type issue
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
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
                    ref={droneRef}
                    className="mb-8 flex justify-center"
                >
                    <Plane
                        className="w-48 h-48 text-lime-500 opacity-80"
                        strokeWidth={1}
                    />
                </div>

                <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
                    404
                </h1>

                <p className="text-xl text-gray-300 mb-6">
                    Oops! Looks like this drone has gone off course.
                </p>

                <div className="flex justify-center space-x-4">
                    <Link
                        href="/"
                        className="flex items-center bg-lime-500 text-black px-6 py-3 rounded-lg hover:bg-lime-400 transition-colors group"
                    >
                        <Home className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Return Home
                    </Link>

                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center border border-white/20 bg-white/5 px-6 py-3 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                        <RefreshCw className="mr-2 w-5 h-5 group-hover:rotate-180 transition-transform" />
                        Retry
                    </button>
                </div>
            </div>

            {/* Subtle Drone Path Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full opacity-10"
                >
                    <defs>
                        <pattern
                            id="drone-grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="rgba(132, 204, 22, 0.1)"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="url(#drone-grid)"
                    />
                </svg>
            </div>
        </div>
    );
}