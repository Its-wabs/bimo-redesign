"use client";
import Image from "next/image";
import BimoButton from "./bimobutton";

export default function VideoPortal() {
  return (
    <div className="video-portal absolute inset-0 z-50 flex items-center justify-center opacity-0 pointer-events-none" style={{ perspective: "1000px" }}>
      <div 
        className="video-frame relative w-[18vw] aspect-square overflow-hidden shadow-2xl"
        style={{ clipPath: "circle(50% at 50% 50%)" }}
      >
        <video autoPlay muted loop playsInline className="video-bg w-full h-full object-cover">
          <source src="/video/nostalgia.mp4" type="video/mp4" />
        </video>
        
        <div className="video-content absolute inset-0 flex flex-col items-center justify-center opacity-0 bg-black/20">
          <div className="video-content-inner flex flex-col items-center text-center px-4 gap-y-5 md:gap-y-7">
            
            <div className="video-logo-wrapper">
              <Image 
                src="/img/logo.png" 
                alt="Bimo Logo" 
                width={140} 
                height={60} 
                priority 
                className="h-auto w-24 md:w-36 mb-6" 
              />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-8">
              <p className="video-tagline text-white text-lg md:text-xl font-bold uppercase tracking-widest whitespace-nowrap">
                Memories in every bite
              </p>
              <span className="video-since opacity-0 text-white text-lg md:text-xl font-light uppercase tracking-[0.2em]">
                Since 1998
              </span>
            </div>

          <div className="video-cta">
             <BimoButton text="Learn more" />

          </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}