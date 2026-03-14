"use client";
import { useRef } from "react";
import NavBar from "@/components/navbar";
import BimoButton from "@/components/bimobutton";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLiquidNavigation } from "../../hooks/useLiquidNavigation";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const containerRef = useRef(null);
  const { navigate } = useLiquidNavigation();
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === pathname) return;
    navigate(href);
  };

  const products = [
    { id: 1, name: "The Classic Galette", price: "120.00 DA", img: "/img/classic.png" },
    { id: 2, name: "Chocolate cookies", price: "150.00 DA", img: "/img/cookiez.png" },
    { id: 3, name: "tango galette", price: "140.00 DA", img: "/img/tango1.png" },
  ];

  useGSAP(() => {
    gsap.to("nav", {
      y: -100,
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
        end: "bottom 50%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: containerRef });

  return (
    // FIX: Changed h-full to min-h-screen to kill the double scrollbar
    <main ref={containerRef} className="relative min-h-screen bg-[#FDF6E9] overflow-x-hidden">
      
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-10" 
        style={{ 
          backgroundImage: `url("/img/bg-pattern.jpg")`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
      />
      
      <NavBar />

      {/* COLLECTION SECTION: Fixed mobile padding and removed md:h-screen */}
      <section className="relative z-10 pt-24 md:pt-32 px-6 md:px-10 pb-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-black text-[#3D1E12] uppercase tracking-tighter mb-8 md:mb-12 text-center md:text-left">
          Our Collection
        </h1>

        {/* GRID: Now fits perfectly on mobile and small laptops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col items-center p-6 md:p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-full aspect-square relative mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-500">
                <img src={product.img} alt={product.name} className="object-contain w-full h-full drop-shadow-xl" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-[#3D1E12] text-center">{product.name}</h3>
              <p className="text-[#E31E24] font-black mb-4 md:mb-6">{product.price}</p>
              
              <BimoButton 
                text="Add to Cart"  
                paddingX="px-8" 
                paddingY="py-3" 
                fontSize="text-xs" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER: Matches your specific request perfectly */}
      <footer className="footer w-full min-h-[80vh] bg-[#151414] text-white pt-7 md:pt-22 pb-2 md:pb-8 px-6 flex flex-col items-center justify-center z-10 relative">
        
        {/* Empty space for buddy cookie */}
        <div className="h-[10vh] md:h-10 w-full" />

        <p className="text-md mt-5 md:mt-0 md:text-3xl font-english tracking-[0.2em] text-center uppercase mb-6 md:max-w-5xl">
          Sign up to receive offers, updates & more
        </p>
        
        <div className="relative w-[90vw] md:w-280 mb-10 md:mb-15">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full bg-white rounded-full py-5 md:py-6 px-8 md:px-12 text-black focus:outline-none text-sm md:text-base"
          />
          <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-black font-english font-medium uppercase text-xs md:text-md tracking-tighter cursor-pointer hover:text-[#E31E24] transition-colors">
            Submit
          </button>
        </div>

        <div className="mb-6 md:mb-4 flex justify-center w-full max-h-[15vh] md:max-h-[25vh]">
          <Image 
            src="/img/logo.png" 
            alt="Logo" 
            width={500} 
            height={300} 
            className="w-auto h-full max-h-full object-contain" 
            priority  
          />
        </div>

        <div className="w-full md:w-[85vw] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:mb-3 pt-4 md:pt-8">
          <a href="/" onClick={(e) => handleNavigation(e, "/")} className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">Home</a>
          <a href="/products" onClick={(e) => handleNavigation(e, "/products")} className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">Products</a>
          
          <div className="flex gap-6 text-3xl md:text-4xl text-gray-200 order-first md:order-0 my-4 md:my-0">
            <i className="ri-facebook-circle-fill hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1"></i>
            <i className="ri-tiktok-fill hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1"></i>
            <i className="ri-instagram-line hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1"></i>
          </div>

          <a href="#" className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">Contact</a>
          <a href="#" className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">About</a>
        </div>

        <div className="w-full md:max-w-[85vw] flex justify-between items-center mt-12 md:mt-16 pb-4 md:pb-0">
          <a href="#" className="font-english uppercase text-[10px] md:text-sm tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">privacy <span className="hidden md:inline">& policy</span></a>
          <p className="text-[10px] md:text-sm font-medium text-[#E31E24]/80 flex gap-2">© Groupe Bimo <span className="text-gray-200">2026</span></p>
          <a href="#" className="font-english uppercase text-[10px] md:text-sm tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">terms <span className="hidden md:inline">of service</span></a>
        </div>
      </footer>
    </main>
  );
}