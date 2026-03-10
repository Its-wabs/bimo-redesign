"use client";
import { useState, useRef } from "react";
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
      { scale: 0, autoAlpha: 1, backgroundColor: currentProduct.bgColor },
      { 
        scale: 1.5, duration: 2, ease: "expo.out",
        onComplete: () => {
          gsap.set(containerRef.current, { backgroundColor: currentProduct.bgColor });
          gsap.set(bgPopRef.current, { scale: 0, autoAlpha: 0 });
        }
      }, 0);

    tl.fromTo(".product-kit", 
      { x: 100, opacity: 0, scale: 1, rotation: -15 },
      { x: 0, opacity: 1, scale: 1.7, rotation: -8, duration: 0.8, ease: "power3.out" },
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
      <div ref={bgPopRef} className="absolute z-0 w-[150vmax] h-[150vmax] rounded-full pointer-events-none invisible" />

      <div className="absolute inset-0 z-5 pointer-events-none opacity-10" 
        style={{ backgroundImage: `url("/img/bg-pattern.jpg")`, backgroundSize: 'cover' }} 
      />

      {/* Side Previews */}
      <div className="side-left absolute left-[-7%] top-1/2 -translate-y-1/2 z-10 w-70 h-100 scale-125  opacity-30 pointer-events-none hidden lg:block -rotate-6">
         <Image src={PRODUCTS[prevIndex].img} alt="prev" fill className="object-contain grayscale-40 blur-[1px]" />
      </div>

      <div className="side-right absolute right-[-7%] top-1/2 -translate-y-1/2 z-10 w-70 h-100 scale-125 opacity-30 pointer-events-none hidden lg:block -rotate-6">
         <Image src={PRODUCTS[nextIndex].img} alt="next" fill className="object-contain grayscale-40 blur-[1px]" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center pt-20">
        <div className="product-kit relative w-48 h-72 md:w-60 md:h-96 flex items-center justify-center">
          
          {/* Stars  */}
          <div className="side-star absolute top-[30%] left-[-18%] w-12 h-12 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          <div className="side-star absolute top-[18%] left-[10%] w-10 h-10 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          <div className="side-star absolute top-[40%] right-[-2%] w-10 h-10 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          <div className="side-star absolute top-[50%] right-[-10%] w-12 h-12 z-10"><Image src="/img/stars.svg" alt="star" fill className="object-contain" /></div>
          
          {/* CROWN */}
          {currentProduct.crown && (
            <div className="absolute top-[4%] left-[35%] -translate-x-1/2 z-30 w-10 h-10 md:w-15 md:h-15">
              <Image src={currentProduct.crown} alt="crown" fill className="object-contain" />
            </div>
          )}

          {/* BLOBS */}
          <div className="absolute inset-0 -z-10 scale-[1.5] opacity-70">
            <Image src={currentProduct.blob} alt="shape" fill className="object-contain" />
          </div>

          {/* FLOWER*/}
          {currentProduct.flower && (
            <div className="absolute bottom-[3%] right-[6%] z-15 w-24 h-24 md:w-35 md:h-35">
              <Image src={currentProduct.flower} alt="flower" fill className="object-contain" />
            </div>
          )}

          <div className="floating-product relative w-full h-full z-20 scale-[1.3]">
            <Image src={currentProduct.img} alt={currentProduct.name} fill priority className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" />
          </div>
        </div>

        <div className="product-text text-center mt-24 md:mt-32 flex flex-col items-center">
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
  <div className="w-24 h-24 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 backdrop-blur-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </div>
</div>

{/* RIGHT HOVER ZONE */}
<div 
  onPointerDown={handleManualNext}
  className="group absolute right-0 top-0 z-50 h-full w-[20vw] flex items-center justify-center cursor-pointer"
>
  <div className="w-24 h-24 rounded-full  flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 backdrop-blur-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-10 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </div>
</div>

    </section>
  );
}