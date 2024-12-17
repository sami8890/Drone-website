"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Terminal, Layers, Zap } from "lucide-react";

const TechIcon = ({ icon: Icon, color: color }: { icon: any; color: string }) => (
    <motion.div
        className={`p-3 rounded-full ${color} bg-opacity-10 flex items-center justify-center`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
    >
        <Icon className="w-6 h-6" />
    </motion.div>
);

export default function DynamicPortfolioHero() {
    const [activeSkill, setActiveSkill] = useState("Full Stack Developer");
    const skills = [
        "Full Stack Developer",
        "Next.js Developer",
        " React Developer",
        "Frontend Developer",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSkill(prev => {
                const currentIndex = skills.indexOf(prev);
                return skills[(currentIndex + 1) % skills.length];
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 relative z-10">
                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6 text-center md:text-left"
                >
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="block mb-2">Hello, I&apos;m</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            Your Name
                        </span>
                    </motion.h1>

                    <motion.div
                        key={activeSkill}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4"
                    >
                        {activeSkill}
                    </motion.div>

                    <p className="text-gray-400 max-w-xl mx-auto md:mx-0 mb-6">
                        Transforming ideas into elegant digital solutions with passion, creativity, and cutting-edge technology.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium"
                        >
                            View Projects
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800"
                        >
                            Contact Me
                        </motion.button>
                    </div>

                    {/* Tech Stack Icons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-8">
                        <TechIcon icon={Code} color="bg-blue-500" />
                        <TechIcon icon={Terminal} color="bg-green-500" />
                        <TechIcon icon={Layers} color="bg-red-500" />
                        <TechIcon icon={Zap} color="bg-yellow-500" />
                    </div>
                </motion.div>

                {/* Visual Element */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hidden md:flex items-center justify-center"
                >
                    <div className="w-full max-w-md aspect-square bg-gradient-to-br from-purple-600 to-pink-400 rounded-full blur-2xl opacity-30 absolute"></div>
                    <div className="relative z-10 w-64 h-64 bg-gray-800 rounded-full border-4 border-purple-500/30 shadow-2xl"></div>
                </motion.div>
            </div>

            {/* Background Animated Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
        </div>
    );
}