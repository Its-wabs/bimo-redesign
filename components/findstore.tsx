"use client";
import { useLiquidNavigation } from "@/hooks/useLiquidNavigation";
import BimoButton from "./bimobutton";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FindStore = () => {

    const { navigate } = useLiquidNavigation();
       
        const pathname = usePathname();
      
        
        const handleNavigation = (e: React.MouseEvent, href: string) => {
          e.preventDefault();
          if (href === pathname) return;
      
          navigate(href);
        };
        
        
    return (  
       
        <section className="find-store-container relative w-full bg-[#F7CD99] flex flex-col items-center overflow-hidden">
            {/* Background Pattern */}
            <div 
                className="absolute inset-0 z-0 pointer-events-none opacity-10" 
                style={{ 
                    backgroundImage: `url("/img/bg-pattern.jpg")`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} 
            />

            
            <div className="h-screen w-full flex flex-col items-center justify-center z-10">
                <p className="text-sm md:text-md text-[#151414] font-black tracking-[0.5em] mb-6 uppercase opacity-50">Available in 68 Wilaya</p>
                <p className="text-2xl md:text-5xl text-[#151414] font-english tracking-[0.2em] uppercase mb-6">
                        Find Bimo near you
                    </p>
                <BimoButton 
  text="Find store" 
  bgColor="#8B5A3C" 
  shadowColor="#5D3C28" 
  paddingX="px-16" 
  paddingY="py-6" 
  fontSize="text-2xl"
  textColor="#FDF6E9" 
/>
            </div>

            
            <footer className="w-full h-[80vh] bg-[#151414] text-white pt-32 pb-8 px-6 flex flex-col items-center justify-center z-10">
                <div className="w-screen flex flex-col items-center justify-center">
                    {/* empty space for buddy cookie */}
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
                           
                        
                         <a href="/products" onClick={(e) => handleNavigation(e, "/products")} className="hover:text-[#E31E24]/80 transition-colors font-bold uppercase text-2xl tracking-widest text-gray-200">Products</a>
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
        </section>
    );
    
}

export default FindStore;