// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Battery, Wifi, Clock, Wind, Shield, Zap } from 'lucide-react';
// import Image from 'next/image';

// gsap.registerPlugin(ScrollTrigger);

// const products = [
//     {
//         id: 1,
//         name: "Phantom X-1",
//         price: 1299,
//         image: "/one.png",
//         category: "Professional",
//         features: [
//             { icon: <Battery className="w-4 h-4" />, text: "45min Flight Time" },
//             { icon: <Wifi className="w-4 h-4" />, text: "10km Range" },
//             { icon: <Wind className="w-4 h-4" />, text: "72km/h Speed" },
//         ],
//         description: "Professional-grade drone with 8K camera and advanced stabilization"
//     },
//     {
//         id: 2,
//         name: "Stealth Pro",
//         price: 899,
//         image: "/one.png",
//         category: "Amateur",
//         features: [
//             { icon: <Battery className="w-4 h-4" />, text: "35min Flight Time" },
//             { icon: <Wifi className="w-4 h-4" />, text: "7km Range" },
//             { icon: <Wind className="w-4 h-4" />, text: "65km/h Speed" },
//         ],
//         description: "Compact drone with 4K camera and smart tracking features"
//     },
//     {
//         id: 3,
//         name: "Navigator Elite",
//         price: 1599,
//         image: "/one.png",
//         category: "Enterprise",
//         features: [
//             { icon: <Battery className="w-4 h-4" />, text: "55min Flight Time" },
//             { icon: <Wifi className="w-4 h-4" />, text: "15km Range" },
//             { icon: <Wind className="w-4 h-4" />, text: "80km/h Speed" },
//         ],
//         description: "Enterprise solution with thermal imaging and LiDAR capabilities"
//     }
// ];

// export default function ProductList() {
//     const productsRef = useRef<HTMLDivElement>(null);
//     const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

//     useEffect(() => {
//         const cards = cardsRef.current;

//         // Initial state
//         gsap.set(cards, {
//             y: 100,
//             opacity: 0,
//             scale: 0.9
//         });

//         // Create animations for each card
//         cards.forEach((card, index) => {
//             gsap.to(card, {
//                 y: 0,
//                 opacity: 1,
//                 scale: 1,
//                 duration: 0.8,
//                 delay: index * 0.2,
//                 ease: "power3.out",
//                 scrollTrigger: {
//                     trigger: card,
//                     start: "top bottom-=100",
//                     toggleActions: "play none none reverse"
//                 }
//             });
//         });

//         // Hover animations
//         cards.forEach((card) => {
//             if (card) {
//                 const image = card.querySelector('.product-image');
//                 const content = card.querySelector('.content-wrapper');

//                 card.addEventListener('mouseenter', () => {
//                     gsap.to(image, {
//                         scale: 1.05,
//                         duration: 0.3,
//                         ease: "power2.out"
//                     });
//                     gsap.to(content, {
//                         y: -10,
//                         duration: 0.3,
//                         ease: "power2.out"
//                     });
//                 });

//                 card.addEventListener('mouseleave', () => {
//                     gsap.to(image, {
//                         scale: 1,
//                         duration: 0.3,
//                         ease: "power2.out"
//                     });
//                     gsap.to(content, {
//                         y: 0,
//                         duration: 0.3,
//                         ease: "power2.out"
//                     });
//                 });
//             }
//         });

//         return () => {
//             ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//         };
//     }, []);

//     return (
//         <section className="relative min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
//             {/* Background with gradient */}
//             <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920] animate-gradient-slow">
//                 <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />
//             </div>

//             {/* Content */}
//             <div className="relative max-w-7xl mx-auto">
//                 {/* Section Header */}
//                 <div className="text-center mb-16">
//                     <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[Bebas Neue] uppercase">
//                         <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600">
//                             Our Fleet
//                         </span>
//                     </h2>
//                     <p className="text-gray-400 max-w-2xl mx-auto">
//                         Discover our cutting-edge drone collection, engineered for excellence and designed for innovation
//                     </p>
//                 </div>

//                 {/* Products Grid */}
//                 <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {products.map((product, index) => (
//                         <div
//                             key={product.id}
//                             ref={el => cardsRef.current[index] = el}
//                             className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-lime-500/50 transition-all duration-300"
//                         >
//                             {/* Product Image */}
//                             <div className="relative h-48 overflow-hidden">
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
//                                 <Image
//                                     src={product.image}
//                                     alt={product.name}
//                                     width={400}
//                                     height={300}
//                                     className="product-image object-cover w-full h-full transform transition-transform duration-300"
//                                 />
//                                 <div className="absolute top-4 left-4 z-20">
//                                     <span className="px-3 py-1 rounded-full text-xs font-medium bg-lime-500/20 text-lime-400 border border-lime-500/30">
//                                         {product.category}
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* Product Content */}
//                             <div className="content-wrapper p-6 space-y-4">
//                                 <div className="flex justify-between items-start">
//                                     <h3 className="text-xl font-semibold">{product.name}</h3>
//                                     <p className="text-lime-400 font-bold">${product.price}</p>
//                                 </div>

//                                 <p className="text-gray-400 text-sm">{product.description}</p>

//                                 {/* Features */}
//                                 <div className="grid grid-cols-3 gap-2">
//                                     {product.features.map((feature, idx) => (
//                                         <div key={idx} className="flex items-center space-x-1 text-gray-300">
//                                             {feature.icon}
//                                             <span className="text-xs">{feature.text}</span>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* CTA Button */}
//                                 <button className="w-full py-3 rounded-lg bg-gradient-to-r from-lime-500 to-lime-600 text-white font-medium
//                                  opacity-90 hover:opacity-100 transform hover:-translate-y-1 transition-all duration-300
//                                  hover:shadow-lg hover:shadow-lime-500/25">
//                                     Configure Now
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <style jsx>{`
//         @keyframes gradient-slow {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
//         .animate-gradient-slow {
//           animation: gradient-slow 15s ease infinite;
//           background-size: 200% 200%;
//         }
//       `}</style>
//         </section>
//     );
// }
