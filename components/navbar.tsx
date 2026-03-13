"use client";
import {  forwardRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FullScreenMenu from "./FullScreenMenu"; 
import BimoButton from "./bimobutton";
import { usePathname } from "next/navigation";
import { useLiquidNavigation } from "@/hooks/useLiquidNavigation";


const NavBar = forwardRef<HTMLDivElement>((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { navigate } = useLiquidNavigation();
 
  const pathname = usePathname();

  
  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === pathname) return;

    navigate(href);
  };
  
  


 
  return (
    <>
      <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <nav ref={ref} className="fixed top-3 left-0 w-full flex items-center justify-between h-20 px-6 md:px-12 z-50 pointer-events-none">
        
        {/* LEFT SECTION */}
        <div className="flex-1 flex justify-start items-center order-1 md:order-0 pointer-events-auto">
          {/* Desktop Menu Icon */}
          <div 
            onClick={() => setIsMenuOpen(true)}
            className="hidden md:flex w-8 cursor-pointer flex-col gap-1.5 group"
          >
            <div className="h-1 w-full bg-black rounded-full transition-transform group-hover:scale-x-110 group-hover:bg-[#E31E24] origin-left"></div>
            <div className="h-1 w-6 bg-black rounded-full transition-transform group-hover:scale-x-125 group-hover:bg-[#E31E24] origin-left"></div>
          </div>
          
          <Link href="/" onClick={(e) => handleNavigation(e, "/")} className="md:hidden">
            <Image src="/img/logo.png" alt="Logo" width={100} height={45} priority className="h-auto w-24" />
          </Link>
        </div>

        {/* LOGO CENTER */}
        <div  className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <Link href="/" onClick={(e) => handleNavigation(e, "/")}>
            <Image src="/img/logo.png" alt="Logo" width={140} height={60} priority className="h-auto w-32 lg:w-40" />
          </Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-1 flex justify-end items-center order-2 md:order-0 pointer-events-auto">
          {/* Mobile Menu Icon */}
          <div 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden w-8 cursor-pointer flex flex-col items-end gap-1.5 group"
          >
            <div className="h-1 w-full bg-black rounded-full transition-all group-hover:bg-[#E31E24]"></div>
            <div className="h-1 w-6 bg-black rounded-full transition-all group-hover:w-full group-hover:bg-[#E31E24]"></div>
          </div>

        <Link href="/products" onClick={(e) => handleNavigation(e, "/products")} className="hidden md:block">
            <BimoButton 
              text="Shop"
              bgColor="rgba(0,0,0,0.1)"
              shadowColor="rgba(0,0,0,0.2)"                   
              paddingX="px-6"                   
              paddingY="py-2"                   
              fontSize="text-base"              
            />
          </Link>
        </div>
      </nav>
    </>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;