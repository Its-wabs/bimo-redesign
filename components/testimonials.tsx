"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from 'next-intl';

const cards = [
  { img: "/img/testimonials/post1.jpg", rotate: "-2" },
  { img: "/img/testimonials/post2.jpg", rotate: "3" },
  { img: "/img/testimonials/post3.jpg", rotate: "-1" },
  { img: "/img/testimonials/post4.jpg", rotate: "4" },
  { img: "/img/testimonials/post5.jpg", rotate: "-3" },
  { img: "/img/testimonials/post6.jpg", rotate: "2" },
];

const TestimonialCard = ({ img, rotate }: { img: string; rotate: string }) => (
  <div 
    className="testimonial-card aspect-square shrink-0 m-4 md:m-8 rounded-3xl shadow-xl transition-all overflow-hidden cursor-pointer flex items-center justify-center"
    style={{ 
      width: 'clamp(20rem, 35vmin, 30rem)',
       transform: `rotate(${rotate}deg)`,
    }}
  >
   <img
      src={img}
      alt="Bimo story"
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
    />
  </div>
);

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('testimonials');

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
      
      gsap.set(".testimonial-card", { clearProps: "rotation" });
    
    });

    return () => mm.revert(); 
  }, { scope: containerRef });

  return (
    <section  ref={containerRef} className="relative w-full min-h-screen py-12 md:py-24 flex flex-col text-center items-center justify-center bg-[#5C3526] overflow-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: `url("/img/bg-pattern.jpg")`, backgroundSize: 'cover' }} />

      <div className="z-10 text-center mb-6 md:mb-6 px-6">
        <h2 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
          {t("title")} <br className="md:hidden" /> {t("titleHighlight")}
        </h2>
      </div>

      <div dir="ltr" className="relative w-full overflow-hidden z-10 mb-10 md:mb-[2vh]">
        <div className="card-row flex w-fit">
          {[...cards, ...cards].map((card, idx) => (
            <TestimonialCard key={idx} img={card.img} rotate={card.rotate} />
          ))}
        </div>
      </div>

      <div className="testimonial-footer flex flex-col items-center gap-6 md:gap-[3vh] z-10 md:mb-[2vh]">
       <h3 className="text-lg md:text-3xl font-bold text-white italic opacity-90 px-4">
  {t("subtitle")} <span className="text-[#FFCB9A]">{t("tag")}</span>
</h3>
        
        
      </div>
    </section>
  );
}