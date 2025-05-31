// src/app/Product/[slug]/ProductDetailPageClient.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  ShoppingCart,
  Star,
  ArrowLeft,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

gsap.registerPlugin(ScrollTrigger);

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
  rating: number;
  reviews: number;
}

interface ProductDetailPageClientProps {
  product: Product;
}

export default function ProductDetailPageClient({ product }: ProductDetailPageClientProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
      },
    });

    const button = document.querySelector(".add-to-cart-btn") as HTMLButtonElement;
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = "Added to Cart!";
      button.classList.add("bg-green-500");

      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove("bg-green-500");
      }, 2000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
      );

      const contentElements = contentRef.current?.children;
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: "power3.out" },
        );
      }

      const specRows = specsRef.current?.querySelectorAll("tr");
      if (specRows) {
        gsap.fromTo(
          specRows,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: specsRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  const guarantees = [
    { icon: <Shield className="w-4 h-4" />, text: "2 Year Warranty" },
    { icon: <Truck className="w-4 h-4" />, text: "Free Shipping" },
    { icon: <RotateCcw className="w-4 h-4" />, text: "30-Day Returns" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#0a1a0a]" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_400px_at_30%_40%,#22c55e,transparent)]" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_300px_at_70%_60%,#84cc16,transparent)]" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-8 overflow-x-auto">
            <Link href="/" className="hover:text-lime-400 transition-colors whitespace-nowrap">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <Link href="/Product" className="hover:text-lime-400 transition-colors whitespace-nowrap">
              Products
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="text-lime-400 truncate">{product.name}</span>
          </div>

          <Link
            href="/Product"
            className="inline-flex items-center space-x-2 text-lime-400 hover:text-lime-300 transition-colors mb-6 sm:mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>

          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start">
            <div ref={imageRef} className="space-y-4 sm:space-y-6">
              <div className="relative">
                <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-lime-500/20 border border-lime-500/30 backdrop-blur-sm">
                  <span className="text-lime-400 text-xs sm:text-sm font-semibold">{product.badge}</span>
                </div>

                <div className="relative bg-gradient-to-br from-white/5 to-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10 aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent rounded-2xl sm:rounded-3xl" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-full h-full max-w-md max-h-md relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-[0_0_30px_rgba(132,204,22,0.4)]"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {guarantees.map((guarantee, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-2 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 text-center"
                  >
                    <div className="text-lime-400 mb-1 sm:mb-2">{guarantee.icon}</div>
                    <span className="text-xs sm:text-sm text-gray-300">{guarantee.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={contentRef} className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
                  <Sparkles className="w-3 h-3 text-lime-400 mr-1" />
                  <span className="text-lime-400 text-xs font-medium uppercase tracking-wide">{product.category}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                  {product.name}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
                </div>

                <div className="text-3xl sm:text-4xl font-bold text-lime-400">{product.price}</div>
              </div>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">{product.description}</p>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-white">Key Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={addToCart}
                  className="add-to-cart-btn w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold text-base sm:text-lg hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-500/25"
                >
                  <span className="flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    Add to Cart
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-white/20 hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-300 flex items-center justify-center text-white hover:text-lime-400 text-sm sm:text-base">
                    <Heart className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Add to Wishlist</span>
                    <span className="sm:hidden">Wishlist</span>
                  </button>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-white/20 hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-300 flex items-center justify-center text-white hover:text-lime-400 text-sm sm:text-base">
                    <Share2 className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Share</span>
                    <span className="sm:hidden">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div ref={specsRef} className="mt-12 sm:mt-16 lg:mt-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">
                Technical Specifications
              </h2>
              <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="space-y-1">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr
                          key={key}
                          className={`border-b border-white/10 ${index % 2 === 0 ? "bg-white/5" : ""} hover:bg-lime-500/5 transition-colors`}
                        >
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-400 font-medium text-sm sm:text-base whitespace-nowrap">
                            {key}
                          </td>
                          <td className="py-3 sm:py-4 px-3 sm:px-6 text-white font-semibold text-sm sm:text-base">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}