"use client";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import  { forwardRef } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function BuddyCookie() {

  const cookieRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const jumpTween = useRef<gsap.core.Tween | null>(null);

 

  const handleMouseEnter = () => {
    
    jumpTween.current = gsap.to(cookieRef.current, {
      y: -40,               
      scaleX: 0.95,         
      scaleY: 1.05,         
      duration: 0.4,
      repeat: -1,
      yoyo: true,           
      ease: "power1.inOut",
    });

  };

  const handleMouseLeave = () => {
   
    jumpTween.current?.kill();
    gsap.to(cookieRef.current, {
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.6,
      ease: "back.out(2)", 
    });

  };
  
  const handleClick = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 2,
      ease: "power4.inOut",
     
    });
  };

  return (
    <div 
      className="buddy-cookie opacity-0 invisible fixed top-1/2 left-1/2 z-40 pointer-events-none flex items-center justify-center" 
      style={{ perspective: "1000px" }}
    >

      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cookie-wrapper relative pointer-events-auto cursor-pointer"
      >
      <div ref={cookieRef} className="cookie-inner relative  w-200 sm:w-200 md:w-275 max-w-275 lg:max-w-300 aspect-square">
        <Image 
          src="/img/bimo.png" 
          alt="Bimo Galette" 
          fill
          priority
          className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        />
      </div>
      </div>
    </div>
  );
}