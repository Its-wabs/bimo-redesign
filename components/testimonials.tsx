"use client";

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
    className="testimonial-card aspect-square shrink-0 m-4 md:m-8 rounded-3xl shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center p-6"
    style={{ 
       backgroundColor: color,
       // FIX: Use vh/vw so they scale down on small height laptops
      width: 'clamp(14rem, 25vmin, 22rem)',
       transform: `rotate(${rotate}deg)`,
    }}
  >
    <div className="w-full h-full border-2 border-white/20 rounded-2xl border-dashed flex items-center justify-center text-[#5C3526] font-bold opacity-30">
        STORY BOX
    </div>
  </div>
);

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // 1. Setup the Marquee (Runs on ALL screens)
    const marquee = gsap.to(".card-row", {
      xPercent: -50,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    // 2. Setup the Responsive Logic
    mm.add("(min-width: 768px)", () => {
      // DESKTOP ONLY: Add the wiggle
      gsap.to(".testimonial-card", {
        rotation: "+=6",
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: "sine.inOut",
        stagger: { each: 0.3, from: "random" }
      });

      // Desktop Hover Logic
      const handleEnter = () => {
        marquee.pause();
        gsap.getTweensOf(".testimonial-card").forEach(t => t.pause());
      };
      const handleLeave = () => {
        marquee.play();
        gsap.getTweensOf(".testimonial-card").forEach(t => t.play());
      };

      const row = document.querySelector(".card-row");
      row?.addEventListener("mouseenter", handleEnter);
      row?.addEventListener("mouseleave", handleLeave);

      return () => {
        row?.removeEventListener("mouseenter", handleEnter);
        row?.removeEventListener("mouseleave", handleLeave);
      };
    });

    mm.add("(max-width: 767px)", () => {
      // MOBILE ONLY: Force cards to stop wiggling and reset rotation
      gsap.set(".testimonial-card", { clearProps: "rotation" });
      
      // Speed up the marquee slightly for mobile "flicker" feel
      marquee.duration(15);
    });

    return () => mm.revert(); // Clean up everything perfectly
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-12 md:py-24 flex flex-col text-center items-center justify-center bg-[#5C3526] overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: `url("/img/bg-pattern.jpg")`, backgroundSize: 'cover' }} />

      <div className="z-10 text-center mb-6 md:mb-10 px-6">
        <h2 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
          Every Cookie <br className="md:hidden" /> tells a Story
        </h2>
      </div>

      <div className="relative w-full overflow-hidden z-10 mb-10 md:mb-16">
        <div className="card-row flex w-fit">
          {[...cards, ...cards].map((card, idx) => (
            <TestimonialCard key={idx} color={card.color} rotate={card.rotate} />
          ))}
        </div>
      </div>

      <div className="testimonial-footer flex flex-col items-center gap-6 md:gap-8 z-10">
        <h3 className="text-lg md:text-3xl font-bold text-white italic opacity-90 px-4">
          What’s your story? Share it with us
        </h3>
        
        <div className="flex gap-10 text-white text-4xl md:text-6xl">
            <i className="ri-instagram-line hover:text-[#FFCB9A] transition-all cursor-pointer"></i>
            <i className="ri-facebook-circle-line hover:text-[#FFCB9A] transition-all cursor-pointer"></i>
            <i className="ri-tiktok-fill hover:text-[#FFCB9A] transition-all cursor-pointer"></i>
        </div>
      </div>
    </section>
  );
}