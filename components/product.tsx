"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BimoButton from "./bimobutton";

const PRODUCTS = [
  {
    id: 1,
    name: "CLASSIC BIMO GALETTE",
    img: "/img/classic.png",
    bgColor: "#E97A3E",
    blob: "/img/blob.svg",
    crown: "/img/crown.svg", 
    flower: "/img/flower.svg",
  },
  {
    id: 2,
    name: "DELICIOUS BIMO COOKIES",
    img: "/img/cookiez.png",
    bgColor: "#7C4DFF",
    blob: "/img/cook.svg",
    crown: "", 
    flower: "", 
  },
  {
    id: 3,
    name: "IRRESISTIBLE BIMO TANGO",
    img: "/img/tangooo.png",
    bgColor: "#4CAF50",
    blob: "/img/Stango.svg",
    crown: "", 
    flower: "", 
  }
];

export default function ProductSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgPopRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const currentProduct = PRODUCTS[index];
  const prevIndex = (index - 1 + PRODUCTS.length) % PRODUCTS.length;
  const nextIndex = (index + 1) % PRODUCTS.length;

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    
    return () => window.removeEventListener("resize", checkDesktop);
  });

  //  PERSISTENT ANIMATIONS
  useGSAP(() => {
    gsap.to(".floating-product", {
      y: "-=12",
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(".side-star", {
      rotation: 360,
      duration: 23,
      ease: "none",
      repeat: -1,
    });
  }, { scope: containerRef });

  // MAIN ENTRANCE & PROGRESS BAR
  useGSAP(() => {
    const tl = gsap.timeline({ 
        onStart: () => setIsAnimating(true),
        onComplete: () => {
          setIsAnimating(false);
          setIndex((prev) => (prev + 1) % PRODUCTS.length);
        }
    });

    timelineRef.current = tl;

    tl.fromTo(".progress-fill", { width: "0%" }, { width: "100%", duration: 4, ease: "none" }, 0);

    tl.fromTo(bgPopRef.current, 
      { 
        clipPath: "circle(0% at 50% 50%)", 
        backgroundColor: currentProduct.bgColor,
        autoAlpha: 1
      },
      { 
        clipPath: "circle(150% at 50% 50%)", 
        duration: 1, 
        ease: "power3.inOut",
        onComplete: () => {
         
          gsap.set(containerRef.current, { backgroundColor: currentProduct.bgColor });
         
          gsap.set(bgPopRef.current, { autoAlpha: 0, clipPath: "circle(0% at 50% 50%)" });
        }
      }, 0);

    tl.fromTo(".product-kit", 
      { x: 100, opacity: 0, scale: 1, rotation: -15 },
      { x: 0, 
        opacity: 1, 
        scale: isDesktop ? 1.4 : 1.2,
        rotation: -8, 
        duration: 0.8, 
        ease: "power3.out" 
      },
      0.1
    );

    // Star Burst
    tl.fromTo(".side-star", 
      { scale: 0, opacity: 0, x: (i) => (i < 2 ? 40 : -40) },
      { scale: 1, opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: "back.out(2)" },
      0.4
    );

  }, { dependencies: [index], scope: containerRef });


  const handleManualNext = () => {
    
    if (!timelineRef.current) return;

    timelineRef.current.progress(1); 
  };

  const handleManualPrev = () => {
    if (timelineRef.current) {
      timelineRef.current.kill(); 
    }
    setIsAnimating(false);
    setIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };
 

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <div ref={bgPopRef} className="absolute inset-0 z-0 pointer-events-none" style={{ clipPath: "circle(0% at 50% 50%)" }} />

      <div className="absolute inset-0 z-5 pointer-events-none opacity-10" 
        style={{ backgroundImage: `url("/img/bg-pattern.jpg")`, backgroundSize: 'cover' }} 
      />

      {/* Side Previews */}
      {isDesktop && (
        <>
        <div className="side-left absolute left-[-7%] top-1/2 -translate-y-1/2 z-10 w-70 h-100   opacity-30 pointer-events-none hidden lg:block -rotate-6">
         <Image src={PRODUCTS[prevIndex].img} alt="prev" fill className="object-contain grayscale-40 blur-[1px]" />
      </div>

      <div className="side-right absolute right-[-7%] top-1/2 -translate-y-1/2 z-10 w-70 h-100 opacity-30 pointer-events-none hidden lg:block -rotate-6">
         <Image src={PRODUCTS[nextIndex].img} alt="next" fill className="object-contain grayscale-40 blur-[1px]" />
      </div>

        </>
      )

      }
      

      <div className="relative z-20 flex flex-col gap-12 md:gap-22 items-center justify-center pt-20">
        <div className="product-kit relative w-[30vh] h-[45vh] max-w-[80vw] max-h-125 flex items-center justify-center">
          
          {/* Stars  */}
          <div className="side-star absolute top-[33%] left-[-15%] w:9 h-9 md:w-12 md:h-12 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          <div className="side-star absolute top-[22%] left-[10%] w-7 h-7 md:w-10 md:h-10 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          <div className="side-star absolute top-[35%] right-[5%] w-7 h-7 md:w-10 md:h-10 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          <div className="side-star absolute top-[50%] right-[-10%] w-9 h-9  md:w-12 md:h-12 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          
          {/* CROWN */}
          {currentProduct.crown && (
            <div className="absolute top-[6%] left-[35%] -translate-x-1/2 z-30 w-10 h-10 md:w-15 md:h-15">
              <Image src={currentProduct.crown} alt="crown" fill className="object-contain" />
            </div>
          )}

        

          {/* FLOWER*/}
          {currentProduct.flower && (
            <div className="absolute bottom-[12%] right-[5%] md:right-[18%] z-15 w-24 h-24 md:w-30 md:h-30">
              <Image src={currentProduct.flower} alt="flower" fill className="object-contain" />
            </div>
          )}

          <div className="floating-product relative w-full h-full z-20 ">
            <Image src={currentProduct.img} alt={currentProduct.name} fill priority className="object-contain" />
          </div>
        </div>

        <div className="product-text text-center flex flex-col items-center">
          <h2 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter mb-6">
            {currentProduct.name}
          </h2>
          
          <div className="pointer-events-auto inline-flex z-30 mb-8">
                <BimoButton 
             text="View product" 
           />
          </div>

          <div className="flex items-center gap-3">
            {PRODUCTS.map((_, i) => (
              <div 
                key={i}
                onClick={() => !isAnimating && setIndex(i)}
                className={`relative overflow-hidden cursor-pointer transition-all duration-500 rounded-full bg-white/30 
                  ${i === index ? 'w-5 h-2' : 'w-2 h-2 hover:bg-white/50'}`}
              >
                {i === index && (
                  <div className="progress-fill absolute left-0 top-0 h-full bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVIGATION ARROWS */}
      {/* LEFT HOVER ZONE */}
<div 
  onPointerDown={handleManualPrev}
  className="group absolute left-0 top-0 z-50 h-full w-[20vw] flex items-center justify-center cursor-pointer"
>
  <div className="w-24 h-24 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
    <div className="p-4 rounded-full">
       <i className="ri-arrow-left-wide-line text-4xl text-white"></i>
    </div>
  </div>
</div>

{/* RIGHT HOVER ZONE */}
<div 
  onPointerDown={handleManualNext}
  className="group absolute right-0 top-0 z-50 h-full w-[20vw] flex items-center justify-center cursor-pointer"
>
  <div className="w-24 h-24 rounded-full  flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
    <div className="p-4 rounded-full">
       <i className="ri-arrow-right-wide-line text-4xl text-white"></i>
    </div>
  </div>
</div>

    </section>
  );
}