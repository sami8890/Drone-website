// // src/app/Product/[slug]/page.tsx
// import { notFound } from "next/navigation";
// import ProductDetailPageClient from "./ProductDetailPageClient";
// import type { Metadata } from "next";

// interface Product {
//   slug: string;
//   name: string;
//   price: string;
//   image: string;
//   category: string;
//   badge: string;
//   features: string[];
//   description: string;
//   specifications: Record<string, string>;
//   rating: number;
//   reviews: number;
// }

// const productData: Record<string, Product> = {
//   "phantom-pro-x": {
//     slug: "phantom-pro-x",
//     name: "Phantom Pro X",
//     price: "$1,299",
//     image: "/placeholder.svg", // Updated to placeholder; replace with actual image path
//     category: "Professional",
//     badge: "Best Seller",
//     features: ["4K Ultra HD Camera", "45min Flight Time", "10km Control Range", "AI Obstacle Avoidance"],
//     description:
//       "The Phantom Pro X represents the pinnacle of professional drone technology, designed for cinematographers and aerial photography professionals who demand uncompromising performance and image quality.",
//     specifications: {
//       "Camera Resolution": "4K Ultra HD (3840 x 2160)",
//       "Sensor Size": "1-inch CMOS",
//       "Flight Time": "45 minutes",
//       "Control Range": "10 kilometers",
//       "Max Speed": "20 m/s",
//       "Wind Resistance": "Level 5 (up to 10.7-13.8 m/s)",
//       Weight: "1.2 kg",
//       "Gimbal Stabilization": "3-Axis Mechanical",
//       GPS: "Dual-Frequency GPS/GLONASS",
//     },
//     rating: 5,
//     reviews: 324,
//   },
//   "swift-explorer": {
//     slug: "swift-explorer",
//     name: "Swift Explorer",
//     price: "$899",
//     image: "/placeholder.svg",
//     category: "Amateur",
//     badge: "New",
//     features: ["2.7K Camera", "30min Flight Time", "5km Range", "GPS Return Home"],
//     description:
//       "Perfect for enthusiasts and amateur photographers, the Swift Explorer offers an intuitive flying experience with professional-grade features at an accessible price point.",
//     specifications: {
//       "Camera Resolution": "2.7K (2704 x 1520)",
//       "Sensor Size": "1/2.3-inch CMOS",
//       "Flight Time": "30 minutes",
//       "Control Range": "5 kilometers",
//       "Max Speed": "15 m/s",
//       "Wind Resistance": "Level 4 (up to 8-10.5 m/s)",
//       Weight: "0.8 kg",
//       "Gimbal Stabilization": "2-Axis Mechanical",
//       GPS: "Single-Frequency GPS",
//     },
//     rating: 4,
//     reviews: 156,
//   },
//   "precision-elite": {
//     slug: "precision-elite",
//     name: "Precision Elite",
//     price: "$2,499",
//     image: "/placeholder.svg",
//     category: "Professional",
//     badge: "Premium",
//     features: ["8K Cinema Camera", "60min Flight Time", "15km Range", "Professional Gimbal"],
//     description:
//       "The Precision Elite is our most advanced professional drone, offering unparalleled imaging capabilities and extended flight time for the most demanding aerial imaging professionals.",
//     specifications: {
//       "Camera Resolution": "8K (7680 x 4320)",
//       "Sensor Size": "Dual 1-inch CMOS",
//       "Flight Time": "60 minutes",
//       "Control Range": "15 kilometers",
//       "Max Speed": "22 m/s",
//       "Wind Resistance": "Level 6 (up to 13.9-17.1 m/s)",
//       Weight: "1.5 kg",
//       "Gimbal Stabilization": "3-Axis Advanced Gimbal",
//       GPS: "Tri-Frequency RTK GPS",
//     },
//     rating: 5,
//     reviews: 89,
//   },
//   "nano-scout": {
//     slug: "nano-scout",
//     name: "Nano Scout",
//     price: "$499",
//     image: "/placeholder.svg",
//     category: "Beginner",
//     badge: "Popular",
//     features: ["1080p HD Camera", "20min Flight Time", "2km Range", "Easy Controls"],
//     description:
//       "Compact and user-friendly, the Nano Scout is the ideal entry-level drone for beginners looking to explore aerial photography without a steep learning curve.",
//     specifications: {
//       "Camera Resolution": "1080p Full HD",
//       "Sensor Size": "1/3-inch CMOS",
//       "Flight Time": "20 minutes",
//       "Control Range": "2 kilometers",
//       "Max Speed": "10 m/s",
//       "Wind Resistance": "Level 3 (up to 5-7.9 m/s)",
//       Weight: "0.5 kg",
//       "Gimbal Stabilization": "Single-Axis Electronic",
//       GPS: "Basic Positioning",
//     },
//     rating: 4,
//     reviews: 567,
//   },
//   "atlas-heavy": {
//     slug: "atlas-heavy",
//     name: "Atlas Heavy",
//     price: "$3,999",
//     image: "/placeholder.svg",
//     category: "Industrial",
//     badge: "Pro Choice",
//     features: ["Thermal + RGB Camera", "45min Flight Time", "20km Range", "Weather Resistant"],
//     description:
//       "Designed for industrial and research applications, the Atlas Heavy offers robust performance with advanced thermal imaging capabilities for precise data collection.",
//     specifications: {
//       "Camera Resolution": "Dual Thermal + 4K RGB",
//       "Sensor Size": "640x512 Thermal, 1-inch RGB CMOS",
//       "Flight Time": "45 minutes",
//       "Control Range": "20 kilometers",
//       "Max Speed": "18 m/s",
//       "Wind Resistance": "Level 5 (up to 10.7-13.8 m/s)",
//       Weight: "2.0 kg",
//       "Gimbal Stabilization": "3-Axis Heavy-Duty Gimbal",
//       GPS: "Dual-Frequency RTK GPS",
//     },
//     rating: 5,
//     reviews: 43,
//   },
//   "mini-spark": {
//     slug: "mini-spark",
//     name: "Mini Spark",
//     price: "$699",
//     image: "/placeholder.svg",
//     category: "Consumer",
//     badge: "Compact",
//     features: ["2.7K Camera", "25min Flight Time", "4km Range", "Ultra Portable"],
//     description:
//       "The Mini Spark brings professional-grade features into a ultra-portable package, perfect for travelers and casual drone enthusiasts who don't want to compromise on quality.",
//     specifications: {
//       "Camera Resolution": "2.7K (2704 x 1520)",
//       "Sensor Size": "1/2.3-inch CMOS",
//       "Flight Time": "25 minutes",
//       "Control Range": "4 kilometers",
//       "Max Speed": "14 m/s",
//       "Wind Resistance": "Level 4 (up to 8-10.5 m/s)",
//       Weight: "0.6 kg",
//       "Gimbal Stabilization": "2-Axis Mechanical",
//       GPS: "Single-Frequency GPS",
//     },
//     rating: 4,
//     reviews: 298,
//   },
// };

// // Metadata for SEO
// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//   const resolvedParams = await params; // Await params
//   const product = productData[resolvedParams.slug];

//   if (!product) {
//     return {
//       title: "Product Not Found",
//       description: "The requested product could not be found.",
//     };
//   }

//   return {
//     title: `${product.name} - Drone Store`,
//     description: product.description,
//     openGraph: {
//       title: product.name,
//       description: product.description,
//       images: [product.image],
//     },
//   };
// }

// export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
//   const resolvedParams = await params; // Await params to resolve the slug
//   const product = productData[resolvedParams.slug];

//   if (!product) {
//     notFound();
//   }

//   return <ProductDetailPageClient product={product} />;
// }

// export async function generateStaticParams() {
//   return Object.keys(productData).map((slug) => ({
//     slug,
//   }));
// }


// src/app/Product/[slug]/page.tsx
import { notFound } from "next/navigation";
import ProductDetailPageClient from "./ProductDetailPageClient";
import type { Metadata } from "next";
import { productData } from "@/data/products";

// Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productData[resolvedParams.slug];

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} - Drone Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = productData[resolvedParams.slug];

  if (!product) {
    notFound();
  }

  return <ProductDetailPageClient product={product} />;
}

export async function generateStaticParams() {
  return Object.keys(productData).map((slug) => ({
    slug,
  }));
}