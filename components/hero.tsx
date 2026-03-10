"use client";
import { useLiquidNavigation } from "@/hooks/useLiquidNavigation";
import BimoButton from "./bimobutton";
import { usePathname } from "next/navigation";

export default function Hero() {

    const { navigate } = useLiquidNavigation();
   
    const pathname = usePathname();
  
    
    const handleNavigation = (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      if (href === pathname) return;
  
      navigate(href);
    };
    
  return (
    <section className="hero relative h-screen w-full flex flex-col items-center bg-[#FDF6E9] justify-start pt-[12vh] md:pt-[12vh] px-6 pointer-events-none overflow-hidden">
      
      {/* Background Pattern */}
      <div 
        className="hero absolute inset-0 z-0 pointer-events-none opacity-10" 
        style={{ 
          backgroundImage: `url("/img/bg-pattern.jpg")`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} 
      />

      <div className="relative z-30 flex flex-col items-center w-full">
        
        {/* Secondary Header */}
        <div className="hero-text text-center mb-2 md:mb-2">
          <h3 className="text-xl md:text-3xl font-english text-black leading-none uppercase tracking-tighter">
            SINCE THE BEGINNING
          </h3>
          <h3 className="text-3xl md:text-5xl font-english text-[#E31E24] leading-none uppercase tracking-tighter mt-1">
            EVERY DAY
          </h3>
        </div>

        {/* Main Arabic Headline */}
        <div className="hero-text text-center flex flex-col items-center gap-8 md:gap-8">
          <h1 
            dir="rtl" // Ensures Arabic punctuation and flow is correct
            className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4 text-[16vw] md:text-[9vw] lg:text-[110px] font-arabic font-black text-black leading-[0.9] md:leading-none"
            style={{ 
              textShadow: `
                -4px 4px 0px #fff, 
                -1px -1px 0px #fff, 
                1px -1px 0px #fff, 
                -1px 1px 0px #fff, 
                1px 1px 0px #fff,
                -6px 6px 20px rgba(0,0,0,0.12)
              ` 
            }}
          >
            {/* Split the text into spans for better control */}
            <span className="whitespace-nowrap mb-7 md:mb-0">من بكري</span>
            <span className="whitespace-nowrap">
              كل يوم <span className="text-[#E31E24]">بيمو</span>
            </span>
          </h1>
          
          {/* CTA Button */}
          <div className="pointer-events-auto mt-4" onClick={(e) => handleNavigation(e, "/products")}>
            <BimoButton text="relive the taste" bgColor="#E31E24"  />
          </div>
        </div>
        
      </div>
    </section>
  );
}