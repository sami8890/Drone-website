"use client";
import React from 'react';
import Link from 'next/link';
import {
    Twitter,
    Linkedin,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone
} from 'lucide-react';

const Footer = () => {
    const quickLinks = [
        {
            title: "Services",
            links: [
                { name: "Telehealth", href: "/services/telehealth" },
                { name: "AI Diagnostics", href: "/services/ai-diagnostics" },
                { name: "Personal Health Tracking", href: "/services/health-tracking" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Our Team", href: "/team" },
                { name: "Careers", href: "/careers" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Blog", href: "/blog" },
                { name: "Research", href: "/research" },
                { name: "Patient Guide", href: "/patient-guide" }
            ]
        }
    ];

    const socialLinks = [
        { icon: Twitter, href: "https://twitter.com/healthtech", color: "text-blue-400" },
        { icon: Linkedin, href: "https://linkedin.com/company/healthtech", color: "text-blue-600" },
        { icon: Facebook, href: "https://facebook.com/healthtech", color: "text-blue-700" },
        { icon: Instagram, href: "https://instagram.com/healthtech", color: "text-pink-500" }
    ];

    return (
        <footer className="bg-gradient-to-br from-[#0a0a0a] via-[#161616] to-[#1e1e1e] text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Company Introduction */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold">HT</span>
                            </div>
                            <h2 className="text-2xl font-bold">HealthTech</h2>
                        </div>
                        <p className="text-gray-400">
                            Revolutionizing healthcare through innovative technology,
                            personalized diagnostics, and compassionate care.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    className={`
                    ${social.color} 
                    hover:bg-white/10 
                    p-3 
                    rounded-full 
                    transition-all 
                    duration-300 
                    border 
                    border-white/20
                    hover:scale-110
                  `}
                                >
                                    <social.icon className="w-6 h-6" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-3 gap-8">
                        {quickLinks.map((section, index) => (
                            <div key={index}>
                                <h4 className="font-bold mb-4 text-lg">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-6 h-6 text-blue-500" />
                                <span className="text-gray-400">support@healthtech.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-6 h-6 text-emerald-500" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-6 h-6 text-red-500" />
                                <span className="text-gray-400">
                                    123 Innovation Drive,
                                    Tech City, ST 12345
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Border and Copyright */}
                <div className="mt-16 pt-8 border-t border-white/10 text-center">
                    <p className="text-gray-500">
                        © {new Date().getFullYear()} HealthTech. All Rights Reserved.
                        <Link
                            href="/privacy"
                            className="ml-4 hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="ml-4 hover:text-white transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;