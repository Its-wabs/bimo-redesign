"use client";

import Image from "next/image";
import { useRef } from "react";
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
    className="testimonial-card  w-48 h-48 md:w-100 md:h-100 m-10 rounded-3xl shadow-xl transition-transform hover:scale-105 cursor-pointer flex items-center justify-center p-6"
    style={{ backgroundColor: color, transform: `rotate(${rotate}deg)` }}
  >
    {/* Placeholder for text content if needed later */}
    <div className="w-full h-full border-2 border-white/20 rounded-2xl border-dashed" />
  </div>
);

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<gsap.core.Tween | null>(null);
  const wiggleRef = useRef<gsap.core.Tween[] | null>(null);

 useGSAP(() => {
    
    marqueeRef.current = gsap.to(".card-row", {
      xPercent: -50,
      duration: 30, 
      ease: "none",
      repeat: -1,
    });

    //  THE MOVING WIGGLE
   
    wiggleRef.current = gsap.to(".testimonial-card", {
      rotation: "+=8",
      yoyo: true,
      repeat: -1,
      duration: 0.8,
      ease: "power1.inOut",
      stagger: {
        each: 0.2,
        from: "random"
      }
    }) as unknown as gsap.core.Tween[]; 

  }, { scope: containerRef });

  const handleMouseEnter = () => {
    marqueeRef.current?.pause();
    
    gsap.getTweensOf(".testimonial-card").forEach(t => t.pause());
  };

  const handleMouseLeave = () => {
    marqueeRef.current?.play();
    gsap.getTweensOf(".testimonial-card").forEach(t => t.play());
  };

  return (
    <section ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center bg-[#5C3526] overflow-hidden">
       {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-10" 
        style={{ 
          backgroundImage: `url("/img/bg-pattern.jpg")`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} 
      />

      {/* Main Heading */}
      <div className="z-10 text-center mb-5">
        <h2 className="testimonial-heading text-3xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
          Every Cookie tells a Story
        </h2>
      </div>

      {/* HORIZONTAL WALKING ROW */}
      <div className="relative w-full overflow-hidden z-10 mb-16">
        
        <div className="card-row flex gap-6 md:gap-10 w-fit"
        onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          >
          {[...cards, ...cards].map((card, idx) => (
            <TestimonialCard key={idx} color={card.color} rotate={card.rotate} />
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="testimonial-footer flex flex-col items-center gap-6 z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center italic">
          What’s your story? Share it with us
        </h3>
        
        {/* Social Icons */}
        <div className="flex gap-10 text-white text-5xl md:text-6xl">
            <i className="ri-instagram-line  hover:text-[#FFCB9A] transition-colors cursor-pointer"></i>
            <i className="ri-facebook-circle-line hover:text-[#FFCB9A] transition-colors cursor-pointer"></i>
            <i className="ri-tiktok-fill hover:text-[#FFCB9A] transition-colors cursor-pointer"></i>
        </div>
      </div>

     
    </section>
  );
}