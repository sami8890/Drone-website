// import React from "react";
// import Image from "next/image";

// export default function Hero() {
//     return (
//         <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white mt-16">
//             {/* Headline */}
//             <h1 className="text-center font-extrabold tracking-wide leading-tight text-white">
//                 <span className="block text-[3.5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] transform rotate-[-5deg]">
//                     A{" "}
//                     <span
//                         className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600"
//                         style={{
//                             display: "inline-block",
//                             transform: "rotate(-3deg)",
//                         }}
//                     >
//                         NEW
//                     </span>
//                     ERA
//                 </span>
//                 <span className="block text-[3.5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] transform rotate-[-3deg]">
//                     OF DRONES
//                 </span>
//             </h1>

//             {/* Drone Image */}
//             <div className="mt-8">
//                 <Image
//                     src="/drone-image.png" // Update this path with the actual image location
//                     alt="Drone"
//                     width={500} // Adjust width as needed
//                     height={300} // Adjust height as needed
//                     className="object-contain"
//                 />
//             </div>
//         </div>
//     );
// }
// import React from "react";
// import Image from "next/image";

// export default function Hero() {
//   return (
//     <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white mt-16">
//

//       {/* Headline */}
//       <h1 className="text-center font-extrabold tracking-wide leading-tight text-white">
//         <span className="block text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem] transform rotate-[-3deg]">
//           A{" "}
//           <span
//             className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-lime-600"
//             style={{
//               display: "inline-block",
//               transform: "rotate(-3deg)",
//             }}
//           >
//             NEW
//           </span>
//           ERA
//         </span>
//         <span className="block text-[2.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem] transform rotate-[-3deg]">
//           OF DRONES
//         </span>
//       </h1>

//       {/* Drone Image */}
//       <div className="mt-8">
//         <Image
//           src="/drone-image.png" // Update this path with the actual image location
//           alt="Drone"
//           width={500} // Adjust width as needed
//           height={300} // Adjust height as needed
//           className="object-contain"
//         />
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const droneRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null); // Explicitly typing the ref

    useEffect(() => {
        // GSAP Animation for Drone
        gsap.fromTo(
            droneRef.current,
            { x: 200, y: -200, opacity: 0, scale: 0.9 },
            {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 5,
                ease: "power3.out",
            }
        );

        // Adding slight, subtle rotation animation to the drone
        gsap.to(droneRef.current, {
            rotate: -5,
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
        });

        // GSAP Animation for each word in the text with ScrollTrigger
        if (textRef.current) {
            const words = textRef.current.children;
            gsap.fromTo(
                words,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1, // Duration for each word
                    stagger: {
                        amount: 1.5, // Total duration for staggering the words
                        from: "start", // Start staggering from the first word
                    },
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="relative flex flex-col md:flex-row items-center justify-between h-screen px-4 md:px-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1b] via-[#000000] to-[#090920] animate-gradient-slow" />

            {/* Tilted Headline */}
            <div
                className="relative z-10 w-full md:w-1/2 animate-float md:mb-11 transform rotate-[-5deg] text-glow transition duration-300 ease-in-out hover:scale-110 hover:rotate-[-2deg]"
                ref={textRef}
            >
                <h1 className="font-bold tracking-wide leading-tight font-[Bebas Neue] uppercase">
                    <span className="block text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem]">
                        <span className="mr-2">A</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-200 to-lime-500 mr-6">
                            NEW
                        </span>
                        <span className="mr-2">ERA</span>
                    </span>
                    <span className="block text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem]">
                        OF DRONES
                    </span>
                </h1>
            </div>

            <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end" ref={droneRef}>
                <Image
                    src="/one.png"
                    alt="Drone"
                    width={500}
                    height={300}
                    className="object-contain drop-shadow-[0_10px_10px_rgba(0,255,150,0.5)]"
                />
            </div>

            <style jsx>{`
                @keyframes gradient-slow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-slow {
                    animation: gradient-slow 12s ease infinite;
                    background-size: 400% 400%;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .neon-flicker {
                    animation: flicker 2s infinite;
                }
                @keyframes flicker {
                    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
                    20%, 24%, 55% { opacity: 0.4; }
                }

                @keyframes shake {
                    0%, 100% { transform: rotate(-5deg); }
                    50% { transform: rotate(5deg); }
                }
                .hover\\:animate-shake:hover {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}
