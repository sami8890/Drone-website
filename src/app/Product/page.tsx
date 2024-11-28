// "main page  "// app/products/page.tsx 

"use client";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCart, BadgeCheck } from "lucide-react";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

interface ProductFeature {
    icon: React.ReactNode;
    text: string;
}

interface Product {
    slug: any;
    name?: string;
    price: string;
    image: string;
    category: string;
    features: string[];
    badge: string;
}

interface ProductCardProps {
    product: Product;
    index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Create a context for this card's animations
        const ctx = gsap.context(() => {
            // Initial reveal animation
            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    y: 50,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power3.out",
                }
            );

            // Hover animations setup
            const image = card.querySelector(".product-image");
            const content = card.querySelector(".product-content");

            const tl = gsap.timeline({ paused: true });
            tl.to(image, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
            }).to(
                content,
                {
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out",
                },
                0
            );

            // Add event listeners
            const onEnter = () => tl.play();
            const onLeave = () => tl.reverse();

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);

            // Return cleanup function
            return () => {
                card.removeEventListener("mouseenter", onEnter);
                card.removeEventListener("mouseleave", onLeave);
                tl.kill();
            };
        }, card); // Scope the context to the card

        return () => ctx.revert(); // Clean up the context
    }, [index]); // Only re-run if index changes

    return (
        <div
            ref={cardRef}
            className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-lime-500/50 transition-all duration-300"
        >
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-lime-500/20 border border-lime-500/30">
                <span className="text-lime-400 text-xs font-medium">
                    {product.badge}
                </span>
            </div>

            <Link href={`/Product/${product.slug}`}>
                <div className="product-image relative h-48 mb-6 flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.name || "Product"}
                        width={200}
                        height={200}
                        className="object-contain drop-shadow-[0_0_15px_rgba(0,255,150,0.2)]"
                    />
                </div>
            </Link>

            <div className="product-content space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <Link href={`/Product/${product.slug}`}>
                            <h3 className="text-xl font-semibold hover:text-lime-400 transition-colors">
                                {product.name}
                            </h3>
                        </Link>
                        <p className="text-gray-400 text-sm">{product.category}</p>
                    </div>
                    <span className="text-lime-400 font-bold">{product.price}</span>
                </div>

                <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                            <BadgeCheck className="w-4 h-4 text-lime-400 mr-2" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <Link
                    href={`/Product/${product.slug}`}
                    className="block w-full mt-4"
                >
                    <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <span className="flex items-center justify-center">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            View Details
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );
};


const ProductsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const products: Product[] = [
        {
            name: "Phantom Pro X",
            slug: "phantom-pro-x",
            price: "$1,299",
            image: "/one.png",
            category: "Professional",
            features: ["4K Camera", "45min Flight Time", "10km Range"],
            badge: "Best Seller",
        },
        {
            name: "Swift Explorer",
            slug: "swift-explorer",
            price: "$899",
            image: "/drones/drone1.png",
            category: "Amateur",
            features: ["2.7K Camera", "30min Flight Time", "5km Range"],
            badge: "New",
        },
        {
            name: "Precision Elite",
            slug: "precision-elite",
            price: "$2,499",
            image: "/drones/drone2.png",
            category: "Professional",
            features: ["8K Camera", "60min Flight Time", "15km Range"],
            badge: "Premium",
        },
        {
            name: "Nano Scout",
            slug: "nano-scout",
            price: "$499",
            image: "/drones/drone3.png",
            category: "Beginner",
            features: ["1080p Camera", "20min Flight Time", "2km Range"],
            badge: "Popular",
        },
        {
            name: "Atlas Heavy",
            slug: "atlas-heavy",
            price: "$3,999",
            image: "/drones/drone4.png",
            category: "Industrial",
            features: ["Thermal Camera", "45min Flight Time", "20km Range"],
            badge: "Pro Choice",
        },
        {
            name: "Mini Spark",
            slug: "mini-spark",
            price: "$699",
            image: "/drones/drone5.png",
            category: "Consumer",
            features: ["2.7K Camera", "25min Flight Time", "4km Range"],
            badge: "Compact",
        },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            const headerElements = headerRef.current?.children;
            if (headerElements) {
                gsap.fromTo(
                    headerElements,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
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
                        <span className="text-lime-400 text-sm font-medium">Our Fleet</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Bebas Neue] uppercase tracking-wide">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
                            Premium
                        </span>{" "}
                        Drone Collection
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Discover our cutting-edge drone lineup, engineered for every need
                        from professional cinematography to industrial applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
