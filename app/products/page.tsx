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
    { id: 2, name: "Chocolate Enrobed", price: "150.00 DA", img: "/img/cookiez.png" },
    { id: 3, name: "Honey Crunch", price: "140.00 DA", img: "/img/tangooo.png" },
  ];

 useGSAP(() => {
    // We target the footer specifically to trigger the hide
    gsap.to("nav", {
      y: -100,
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".footer", 
        start: "center 80%",   
        end: "bottom 50%",
        toggleActions: "play none none reverse", 
      }
    });
  }, { scope: containerRef });


  return (
    <main ref={containerRef} className="h-full bg-[#FDF6E9] overflow-x-hidden">
        {/* Background Pattern */}
      <div 
        className="hero fixed inset-0 z-0 pointer-events-none opacity-10" 
        style={{ 
          backgroundImage: `url("/img/bg-pattern.jpg")`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} 
      />
      <NavBar />


      
      <div className="collection pt-32 px-10 pb-32 max-w-7xl md:h-screen max-h-full mx-auto z-10 relative">
        <h1 className="text-7xl font-black text-[#3D1E12] uppercase tracking-tighter mb-12">
          Our Collection
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-full aspect-square relative mb-6 group-hover:scale-110 transition-transform duration-500">
                <img src={product.img} alt={product.name} className="object-contain w-full h-full drop-shadow-xl" />
              </div>
              
              <h3 className="text-2xl font-bold text-[#3D1E12]">{product.name}</h3>
              <p className="text-[#E31E24] font-black mb-6">{product.price}</p>
              
              <BimoButton 
                text="Add to Cart"  
                paddingX="px-8" 
                paddingY="py-3" 
                fontSize="text-xs" 
              />
            </div>
          ))}
        </div>
      </div>
     
                  <footer className=" footer relative w-full h-[80vh] bg-[#151414] text-white pt-32 pb-8 px-6 flex flex-col items-center justify-center z-10">
                      <div className="w-screen flex flex-col items-center justify-center">
                          {/* The BuddyCookie will land in this empty space during the scroll */}
                          <div className="h-10 w-full" /> 
      
                          <p className="text-md md:text-3xl font-english tracking-[0.2em] uppercase mb-6">
                              Sign up to receive offers, updates & more
                          </p>
                          
                          <div className="relative w-[80vw] md:w-280  mb-12">
                              <input 
                                  type="email" 
                                  placeholder="Enter your email" 
                                  className="w-full bg-white rounded-full py-6 px-12 text-black focus:outline-none"
                              />
                              <button className="absolute right-8 top-1/2 -translate-y-1/2 text-black font-english font-medium  uppercase text-md tracking-tighter cursor-pointer hover:text-[#E31E24]">
                                  Submit
                              </button>
                          </div>
      
                          <div className="mb-2 md:mb-10">
                              <Image src="/img/logo.png" alt="Logo" width={600} height={400} className="w-full h-auto md:w-150" priority  />
                          </div>
      
                          <div className="w-[85vw] flex flex-col md:flex-row items-center justify-between gap-2 pt-4 md:pt-8">
                             
                                  <a href="/" onClick={(e) => handleNavigation(e, "/")} className="hover:text-[#E31E24]/80 transition-colors font-bold uppercase text-2xl tracking-widest text-gray-200">Home</a>
                                 
                              
                               <a href="#" onClick={(e) => handleNavigation(e, "/products")} className="hover:text-[#E31E24]/80 transition-colors font-bold uppercase text-2xl tracking-widest text-gray-200">Products</a>
                              <div className="flex order-last md:order-0 gap-6 text-4xl text-gray-200">
                                  <i className="ri-facebook-circle-fill hover:text-[#E31E24]/80 cursor-pointer"></i>
                                  <i className="ri-tiktok-fill hover:text-[#E31E24]/80 cursor-pointer"></i>
                                  <i className="ri-instagram-line hover:text-[#E31E24]/80 cursor-pointer"></i>
                                  
                              </div>
      
                              <a href="#" className="hover:text-[#E31E24]/80 transition-colors font-bold uppercase text-2xl tracking-widest text-gray-200">Contact</a>
                              <a href="#" className="hover:text-[#E31E24]/80 transition-colors font-bold uppercase text-2xl tracking-widest text-gray-200">About</a>
                          </div>
      
                          <div className="absolute bottom-2 flex justify-between items-center gap-8">
                              <a href="#" className="hover:text-[#E31E24]/80 transition-colors font-english uppercase text-sm tracking-widest text-gray-200">privacy & policy</a>
                              <p className="text-sm font-medium text-[#E31E24]/80 flex gap-2">© Groupe Bimo <span className="text-gray-200">2026</span></p>
                              <a href="#" className="hover:text-[#E31E24]/80 transition-colors font-english uppercase text-sm tracking-widest text-gray-200">terms of service</a>
                          </div>
                      </div>
                  </footer>
    </main>
  );
}