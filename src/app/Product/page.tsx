// src/app/Product/page.tsx
"use client";

import type React from "react";
import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingCart, BadgeCheck, Sparkles, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { Product, products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);


interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { dispatch } = useCart();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

    const button = e.currentTarget as HTMLButtonElement;
    const originalText = button.innerHTML;
    button.innerHTML = "Added!";
    button.classList.add("bg-green-500");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("bg-green-500");
    }, 1500);
  };

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        },
      );

      const image = card.querySelector(".product-image");
      const content = card.querySelector(".product-content");
      const badge = card.querySelector(".product-badge");

      const tl = gsap.timeline({ paused: true });
      tl.to(image, { y: -10, scale: 1.05, duration: 0.3, ease: "power2.out" })
        .to(content, { y: -5, duration: 0.3, ease: "power2.out" }, 0)
        .to(badge, { scale: 1.1, duration: 0.2, ease: "power2.out" }, 0);

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
        tl.kill();
      };
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-lime-500/50 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="product-badge absolute top-6 right-6 px-4 py-2 rounded-full bg-lime-500/20 border border-lime-500/30">
        <span className="text-lime-400 text-xs font-semibold">{product.badge}</span>
      </div>

      <Link href={`/Product/${product.slug}`}>
        <div className="product-image relative h-56 mb-8 flex items-center justify-center">
          <div className="w-full h-full max-w-[250px] max-h-[250px] relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(132,204,22,0.3)] transition-all duration-500"
            />
          </div>
        </div>
      </Link>

      <div className="product-content space-y-6 relative z-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-lime-400/80 text-sm font-medium uppercase tracking-wide">{product.category}</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                />
              ))}
              <span className="text-gray-400 text-xs ml-1">({product.reviews})</span>
            </div>
          </div>

          <Link href={`/Product/${product.slug}`}>
            <h3 className="text-2xl font-bold text-white hover:text-lime-400 transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          <div className="text-3xl font-bold text-lime-400">{product.price}</div>
        </div>

        <ul className="space-y-3">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-gray-300">
              <BadgeCheck className="w-4 h-4 text-lime-400 mr-3 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={addToCart}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-lime-500 to-lime-600 text-black font-bold hover:from-lime-600 hover:to-lime-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-500/25"
          >
            <span className="flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </span>
          </button>

          <Link
            href={`/Product/${product.slug}`}
            className="px-6 py-3 rounded-xl border-2 border-lime-500/30 hover:border-lime-400 hover:bg-lime-400/10 transition-all duration-300 flex items-center justify-center text-lime-400 hover:text-lime-300"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animation logic remains unchanged
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#0a1a0a]" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_800px_at_50%_200px,#22c55e,transparent)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_400px_at_80%_300px,#84cc16,transparent)]" />
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-lime-400 rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-lime-500/40 bg-lime-500/10 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-lime-400 mr-2" />
            <span className="text-lime-400 text-sm font-semibold tracking-wide">Premium Drone Collection</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-bebas uppercase tracking-wide">
            <span className="text-white block">Choose Your</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-lime-400 to-lime-600">
              Perfect Drone
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our cutting-edge drone lineup, engineered for every need from professional cinematography to
            industrial applications. Each drone represents the pinnacle of aerial technology.
          </p>

          <div className="h-1 w-24 bg-gradient-to-r from-lime-400 to-lime-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;