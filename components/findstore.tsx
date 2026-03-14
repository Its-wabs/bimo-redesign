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

            
            <footer className="w-full min-h-[80vh] bg-[#151414] text-white pt-7 md:pt-22 pb-2 md:pb-8 px-6 flex flex-col items-center justify-center z-10">
                
                    {/* empty space for buddy cookie */}
                   <div className="h-[10vh] md:h-10 w-full" />

                    <p className="text-md mt-5 md:mt-0 md:text-3xl font-english tracking-[0.2em] text-center uppercase mb-6 md:max-w-5xl">
                        Sign up to receive offers, updates & more
                    </p>
                    
                    <div className="relative w-[80vw] md:w-280 mb-10 md:mb-15">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full bg-white rounded-full py-6 px-12 text-black focus:outline-none"
                        />
                        <button className="absolute right-8 top-1/2 -translate-y-1/2 text-black font-english font-medium  uppercase text-md tracking-tighter cursor-pointer hover:text-[#E31E24]">
                            Submit
                        </button>
                    </div>

                   <div className="mb- md:mb-4 flex justify-center w-full max-h-[15vh] md:max-h-[25vh]">
            <Image 
                src="/img/logo.png" 
                alt="Logo" 
                width={500} 
                height={300} 
                className="w-auto h-full max-h-full object-contain" 
                priority  
            />
        </div>

                    <div className="w-[85vw] flex flex-col md:flex-row items-center justify-between gap-2 md:mb-3 pt-4 md:pt-8">
                       
                            <a href="/" onClick={(e) => handleNavigation(e, "/")} className="font-bold uppercase text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">Home</a>
                           
                        
                         <a href="/products" onClick={(e) => handleNavigation(e, "/products")} className="font-bold uppercase text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">Products</a>
                        
                        <div className="flex gap-6 text-3xl md:text-4xl text-gray-200 order-first md:order-0">
                <i className="ri-facebook-circle-fill hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1"></i>
                <i className="ri-tiktok-fill hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1"></i>
                <i className="ri-instagram-line hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1"></i>
            </div>

                        <a href="#" className="font-bold uppercase text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">Contact</a>
                        <a href="#" className="font-bold uppercase text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">About</a>
                    </div>

                    <div className="absolute w-full md:max-w-[85vw] max-w-[90vw] bottom-0.5 md:bottom-2 flex  justify-between items-center mb-2 md:mb-1 mt-7 md:mt-16 md:pt-8">
                        <a href="#" className="font-english uppercase text-xs md:text-sm tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">privacy <span className="hidden md:inline">& policy</span></a>
                        <p className="text-xs md:text-sm font-medium text-[#E31E24]/80 flex gap-2">© Groupe Bimo <span className="text-gray-200">2026</span></p>
                        <a href="#" className="font-english uppercase text-xs md:text-sm tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">terms <span className="hidden md:inline">of service</span></a>
                    </div>
                
            </footer>
        </section>
    );
    
}

export default FindStore;