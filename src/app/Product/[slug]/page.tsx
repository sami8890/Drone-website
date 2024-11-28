// app/Product/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import { BadgeCheck, ShoppingCart } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';


// Product interface for type safety
interface Product {
    slug: string;
    name: string;
    price: string;
    image: string;
    category: string;
    features: string[];
    badge: string;
    description: string;
    specifications: Record<string, string>;
}

// product data 

const productData: Record<string, Product> = {
    "phantom-pro-x": {
        slug: "phantom-pro-x",
        name: "Phantom Pro X",
        price: "$1,299",
        image: "/one.png",
        category: "Professional",
        badge: "Best Seller",
        features: [
            "4K Camera",
            "45min Flight Time",
            "10km Range"
        ],
        description: "The Phantom Pro X represents the pinnacle of professional drone technology, designed for cinematographers and aerial photography professionals who demand uncompromising performance and image quality.",
        specifications: {
            "Camera Resolution": "4K Ultra HD (3840 x 2160)",
            "Sensor Size": "1-inch CMOS",
            "Flight Time": "45 minutes",
            "Control Range": "10 kilometers",
            "Max Speed": "20 m/s",
            "Wind Resistance": "Level 5 (up to 10.7-13.8 m/s)",
            "Weight": "1.2 kg",
            "Gimbal Stabilization": "3-Axis Mechanical",
            "GPS": "Dual-Frequency GPS/GLONASS"
        }
    },
    "swift-explorer": {
        slug: "swift-explorer",
        name: "Swift Explorer",
        price: "$899",
        image: "/drones/drone1.png",
        category: "Amateur",
        badge: "New",
        features: [
            "2.7K Camera",
            "30min Flight Time",
            "5km Range"
        ],
        description: "Perfect for enthusiasts and amateur photographers, the Swift Explorer offers an intuitive flying experience with professional-grade features at an accessible price point.",
        specifications: {
            "Camera Resolution": "2.7K (2704 x 1520)",
            "Sensor Size": "1/2.3-inch CMOS",
            "Flight Time": "30 minutes",
            "Control Range": "5 kilometers",
            "Max Speed": "15 m/s",
            "Wind Resistance": "Level 4 (up to 8-10.5 m/s)",
            "Weight": "0.8 kg",
            "Gimbal Stabilization": "2-Axis Mechanical",
            "GPS": "Single-Frequency GPS"
        }
    },
    "precision-elite": {
        slug: "precision-elite",
        name: "Precision Elite",
        price: "$2,499",
        image: "/drones/drone2.png",
        category: "Professional",
        badge: "Premium",
        features: [
            "8K Camera",
            "60min Flight Time",
            "15km Range"
        ],
        description: "The Precision Elite is our most advanced professional drone, offering unparalleled imaging capabilities and extended flight time for the most demanding aerial imaging professionals.",
        specifications: {
            "Camera Resolution": "8K (7680 x 4320)",
            "Sensor Size": "Dual 1-inch CMOS",
            "Flight Time": "60 minutes",
            "Control Range": "15 kilometers",
            "Max Speed": "22 m/s",
            "Wind Resistance": "Level 6 (up to 13.9-17.1 m/s)",
            "Weight": "1.5 kg",
            "Gimbal Stabilization": "3-Axis Advanced Gimbal",
            "GPS": "Tri-Frequency RTK GPS"
        }
    },
    "nano-scout": {
        slug: "nano-scout",
        name: "Nano Scout",
        price: "$499",
        image: "/drones/drone3.png",
        category: "Beginner",
        badge: "Popular",
        features: [
            "1080p Camera",
            "20min Flight Time",
            "2km Range"
        ],
        description: "Compact and user-friendly, the Nano Scout is the ideal entry-level drone for beginners looking to explore aerial photography without a steep learning curve.",
        specifications: {
            "Camera Resolution": "1080p Full HD",
            "Sensor Size": "1/3-inch CMOS",
            "Flight Time": "20 minutes",
            "Control Range": "2 kilometers",
            "Max Speed": "10 m/s",
            "Wind Resistance": "Level 3 (up to 5-7.9 m/s)",
            "Weight": "0.5 kg",
            "Gimbal Stabilization": "Single-Axis Electronic",
            "GPS": "Basic Positioning"
        }
    },
    "atlas-heavy": {
        slug: "atlas-heavy",
        name: "Atlas Heavy",
        price: "$3,999",
        image: "/drones/drone4.png",
        category: "Industrial",
        badge: "Pro Choice",
        features: [
            "Thermal Camera",
            "45min Flight Time",
            "20km Range"
        ],
        description: "Designed for industrial and research applications, the Atlas Heavy offers robust performance with advanced thermal imaging capabilities for precise data collection.",
        specifications: {
            "Camera Resolution": "Dual Thermal + 4K RGB",
            "Sensor Size": "640x512 Thermal, 1-inch RGB CMOS",
            "Flight Time": "45 minutes",
            "Control Range": "20 kilometers",
            "Max Speed": "18 m/s",
            "Wind Resistance": "Level 5 (up to 10.7-13.8 m/s)",
            "Weight": "2.0 kg",
            "Gimbal Stabilization": "3-Axis Heavy-Duty Gimbal",
            "GPS": "Dual-Frequency RTK GPS"
        }
    },
    "mini-spark": {
        slug: "mini-spark",
        name: "Mini Spark",
        price: "$699",
        image: "/drones/drone5.png",
        category: "Consumer",
        badge: "Compact",
        features: [
            "2.7K Camera",
            "25min Flight Time",
            "4km Range"
        ],
        description: "The Mini Spark brings professional-grade features into a ultra-portable package, perfect for travelers and casual drone enthusiasts who don't want to compromise on quality.",
        specifications: {
            "Camera Resolution": "2.7K (2704 x 1520)",
            "Sensor Size": "1/2.3-inch CMOS",
            "Flight Time": "25 minutes",
            "Control Range": "4 kilometers",
            "Max Speed": "14 m/s",
            "Wind Resistance": "Level 4 (up to 8-10.5 m/s)",
            "Weight": "0.6 kg",
            "Gimbal Stabilization": "2-Axis Mechanical",
            "GPS": "Single-Frequency GPS"
        }
    }

};

// Server Component for Product Details
export default function ProductDetailPage({
    params
}: {
    params: { slug: string }
}) {
    // Fetch product or return not found
    const product = productData[params.slug];

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-24 text-center min-h-[65vh]  ">
                <h1 className="text-4xl font-bold text-red-500">Product Not Found</h1>
                <p className="mt-4 text-gray-800">The requested product does not exist.</p>

                <Link href="/Product" className='mt-8 inline-block text-lime-400 bg-black  font-semibold py-2 px-4 rounded' >Back to Products</Link>

            </div>

        );
    }
 

  

















    return (
        <div className="bg-black text-white min-h-screen py-16">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-start"> {/* Adjusted alignment */}
                {/* Product Image Section */}
                <div className="flex items-start justify-center"> {/* Changed items-center to items-start */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={900}
                        height={900}
                        className="object-contain drop-shadow-[0_0_20px_rgba(0,255,150,0.3)]"
                    />
                </div>

                {/* Product Details Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-bold text-lime-400">{product.name}</h1>
                            <p className="text-gray-400 mt-2">{product.category}</p>
                        </div>
                        <span className="text-lime-400 text-3xl font-bold">{product.price}</span>
                    </div>

                    <p className="text-gray-300">{product.description}</p>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Key Features</h3>
                        <ul className="space-y-2">
                            {product.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-gray-300">
                                    <BadgeCheck className="w-5 h-5 text-lime-400 mr-2" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Specifications</h3>
                        <table className="w-full">
                            <tbody>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <tr key={key} className="border-b border-white/10">
                                        <td className="py-2 text-gray-400">{key}</td>
                                        <td className="py-2 text-white">{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium flex items-center justify-center hover:from-lime-600 hover:to-lime-700 transition-all">
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

// Static Params Generation for Performance
export async function generateStaticParams() {
    return Object.keys(productData).map((slug) => ({
        slug: slug
    }));
}

