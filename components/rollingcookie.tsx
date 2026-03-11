"use client";
import Image from "next/image";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
} 

export default function RollingCookie() {
  const handleBackToTop = () => {
    
    gsap.to(window, {
      scrollTo: 0,
      duration: 2,
      ease: "power4.inOut"
    });
  };
  return (
    <div 
      className="main-cookie opacity-0 invisible fixed top-1/2 left-1/2 z-25 pointer-events-none flex items-center justify-center" 
      style={{ 
        perspective: "1000px",
        willChange: "transform",
        transform: "translateZ(0)" 
       }}
    >
      
      <div onClick={handleBackToTop} className="cookie-inner relative  w-150 sm:w-170 md:w-275 max-w-200 lg:max-w-300 aspect-square cursor-pointer active:scale-95 transition-transform">
        <Image 
          src="/img/bimo.png" 
          alt="Bimo Galette" 
          fill
          priority
          className="object-contain md:drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
}