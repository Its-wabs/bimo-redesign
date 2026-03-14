"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const cards = [
  { color: "#FFCB9A", rotate: "-2" },
  { color: "#F5935C", rotate: "3" },
  { color: "#FFF3E0", rotate: "-1" },
  { color: "#FFD54F", rotate: "4" },
  { color: "#FFCB9A", rotate: "-3" },
  { color: "#F5935C", rotate: "2" },
];

const TestimonialCard = ({ color, rotate }: { color: string; rotate: string }) => (
  <div 
    className="testimonial-card h-40 w-40 md:h-90 md:w-90 shrink-0 m-4 md:m-8 rounded-3xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center p-6"
    style={{ 
       backgroundColor: color,
       
    }}
  >
    <div className="w-full h-full border-2 border-white/20 rounded-2xl border-dashed flex items-center justify-center text-[#5C3526] font-bold opacity-30">
        STORY BOX
    </div>
  </div>
);

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(() => {
    // 1. SMOOTH MARQUEE
    marqueeRef.current = gsap.to(".card-row", {
      xPercent: -50,
      duration: isMobile ? 15 : 25, // Faster on mobile to feel "snappy"
      ease: "none",
      repeat: -1,
    });

    // 2. CONDITIONAL WIGGLE (Desktop Only)
    if (!isMobile) {
      gsap.to(".testimonial-card", {
        rotation: "+=6", // Slightly smaller wiggle for elegance
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          from: "random"
        }
      });
    } else {
      // If we switch to mobile, reset any stray rotations
      gsap.set(".testimonial-card", { clearProps: "rotation" });
    }

  }, { scope: containerRef, dependencies: [isMobile] });

  const handleInteraction = (pause: boolean) => {
    if (isMobile) return;
    pause ? marqueeRef.current?.pause() : marqueeRef.current?.play();
    // We target the wiggles separately to ensure they pause too
    pause ? gsap.getTweensOf(".testimonial-card").forEach(t => t.pause()) 
          : gsap.getTweensOf(".testimonial-card").forEach(t => t.play());
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-full py-20 flex flex-col text-center items-center justify-center bg-[#5C3526] overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: `url("/img/bg-pattern.jpg")`, backgroundSize: 'cover' }} />

      <div className="z-10 text-center mb-10 px-6">
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
          Every Cookie <br className="md:hidden" /> tells a Story
        </h2>
      </div>

      {/* MARQUEE ROW */}
      <div className="relative w-full overflow-hidden z-10 mb-16">
        <div 
          className="card-row flex w-fit"
          onMouseEnter={() => handleInteraction(true)}
          onMouseLeave={() => handleInteraction(false)}
        >
          {/* Double the cards for a seamless loop */}
          {[...cards, ...cards].map((card, idx) => (
            <TestimonialCard key={idx} color={card.color} rotate={card.rotate} />
          ))}
        </div>
      </div>

      <div className="testimonial-footer flex flex-col items-center gap-8 z-10">
        <h3 className="text-xl md:text-3xl font-bold text-white italic opacity-90">
          What’s your story? Share it with us
        </h3>
        
        <div className="flex gap-12 text-white text-5xl md:text-6xl">
            <i className="ri-instagram-line hover:text-[#FFCB9A] transition-all cursor-pointer hover:-translate-y-2"></i>
            <i className="ri-facebook-circle-line hover:text-[#FFCB9A] transition-all cursor-pointer hover:-translate-y-2"></i>
            <i className="ri-tiktok-fill hover:text-[#FFCB9A] transition-all cursor-pointer hover:-translate-y-2"></i>
        </div>
      </div>
    </section>
  );
}