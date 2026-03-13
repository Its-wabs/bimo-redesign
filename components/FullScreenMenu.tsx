"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname, useRouter } from "next/navigation";

const MENU_LINKS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/#" },
  { name: "Find a Store", href: "/#" },
];

export default function FullScreenMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP( { scope: containerRef });

  const handleLinkClick = contextSafe((e: React.MouseEvent, href : string, index : number) => {
    e.preventDefault();

    if (href === pathname) {
      onClose();
      return;
    }

    if (tl.current) tl.current.kill();

    const exitTl = gsap.timeline({
      onComplete: () => {
        gsap.set(containerRef.current, { visibility : "hidden"});
        onClose();
      }
    });

    linksRef.current.forEach((link, i) => {

      if(i !== index) {
        exitTl.to(link, {
          opacity: 0,
          y: -30,
          duration: 0.3,
          ease: "power2.in",
        }, 0);
      }
    });

    exitTl.to(linksRef.current[index], {
      scale: 1.2,
      duration: 0.4,
      color : "#E31E24",
      ease : "power2.in"
    }, 0)
    .to(linksRef.current[index], {
      autoAlpha: 0,
      duration: 0.4,
      ease : "power2.in"
    }, 0.5)

    .to(waveContainerRef.current, {
      y:"-130%",
      duration: 1,
      ease: "power4.inOut"
    }, "+=0.5");

    exitTl.call(() => {
      router.push(href);
    }, [], "-=0.5");


  })

  // Scroll lock when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen) {
      if (tl.current) tl.current.kill();
      tl.current = gsap.timeline();

      // Show main container
      gsap.set(containerRef.current, { visibility: "visible" });

      // Slide chocolate down with Rainbow effect
      tl.current.to(waveContainerRef.current, {
        y: "0%",
        duration: 1,
        ease: "power4.inOut",
      }, 0);

      // RAINBOW TRANSITION 
      tl.current.fromTo(waveContainerRef.current, 
        { filter: "hue-rotate(0deg) brightness(2) saturate(2)" },
        { 
          filter: "hue-rotate(360deg) brightness(1) saturate(1)", 
          duration: 1.2, 
          ease: "none",
          onComplete: () => { gsap.set(waveContainerRef.current, { filter: "none" }); }
        }, 0);

      // TEXT REVEAL
      tl.current.fromTo(
        linksRef.current,
        { y: 100, opacity: 0, skewY: 5 },
        { 
          y: 0, 
          opacity: 1, 
          skewY: 0,
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power4.out" 
        },
        "-=0.4"
      );
    } else {
      const exitTl = gsap.timeline({
        onComplete: () => {gsap.set(containerRef.current, { visibility: "hidden" })} 
      });

      // Slide links up and out
      exitTl.to(linksRef.current, { 
        y: -50, 
        opacity: 0, 
        duration: 0.4, 
        stagger: 0.05 
      });

      // Retract chocolate 
      exitTl.to(waveContainerRef.current, {
        y: "-130%",
        duration: 0.8,
        ease: "power4.inOut",
      }, "-=0.2");
    }
  }, { dependencies: [isOpen], scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-100 invisible pointer-events-none"
    >
      {/* THE WAVY CHOCOLATE CONTAINER */}
      <div 
        ref={waveContainerRef}
        className="absolute inset-0 -translate-y-[130%] pointer-events-none w-full h-[120%] bg-[#3D1E12]"
      >
        {/* The Wave SVG */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-[15%] translate-y-[98%]"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#3D1E12" 
            d="M0,160 C120,320 240,0 360,160 C480,320 600,0 720,160 C840,320 960,0 1080,160 C1200,320 1320,0 1440,160 L1440,0 L0,0 Z" 
          />
        </svg>
      </div>

      {/* CONTENT LAYER */}
      <div className={`relative z-10 h-full w-full flex flex-col items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0"}`}>
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 group flex items-center gap-4 text-white cursor-pointer"
        >
          
          <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#E31E24] group-hover:border-[#E31E24] transition-all duration-300">
             <span className="text-xl leading-none">✕</span>
          </div>
        </button>

        {/* NAVIGATION */}
        <nav className="flex flex-col items-center">
          {MENU_LINKS.map((link, i) => (
            <div 
              key={link.name} 
              className="overflow-hidden mb-2 px-4"
              ref={(el) => { if (el) linksRef.current[i] = el; }}
            >
              <Link
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, i)}
                className="block text-white font-black text-5xl md:text-[8rem] leading-[0.85] uppercase tracking-tighter hover:text-[#E31E24] hover:scale-105 transition-all duration-300"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-12 w-full px-12 flex flex-col md:flex-row justify-between items-center gap-6 text-white/30 font-bold text-[10px] tracking-[0.3em] uppercase">
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Tiktok</a>
          </div>
          <p>©2026 BIMO CORPORATE</p>
        </div>
      </div>
    </div>
  );
}