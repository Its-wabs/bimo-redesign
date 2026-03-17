"use client";
import { useRef } from "react";
import NavBar from "@/components/navbar";
import BimoButton from "@/components/bimobutton";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLiquidNavigation } from "../../../hooks/useLiquidNavigation";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Preloader from "@/components/pre-loader";

gsap.registerPlugin(ScrollTrigger);


const PRODUCTS = [
  { id: 1, key: "classicBimoGalette",   price: "120.00", img: "/img/classic.png" },
  { id: 2, key: "deliciousBimoCookies", price: "150.00", img: "/img/cookiez.png" },
  { id: 3, key: "irresistibleBimoTango",      price: "140.00", img: "/img/tango1.png" },
] as const;

export default function ProductsPage() {
  const t  = useTranslations("collectionPage");
  const tf = useTranslations("footer");

  const locale = useLocale();

  const containerRef = useRef(null);
  const { navigate } = useLiquidNavigation();
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === pathname) return;
    navigate(href);
  };

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
      },
    });
  }, { scope: containerRef });

  useGSAP(() => {
    // Every time 'locale' changes, do a quick fade on the text elements
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, filter: "blur(4px)" },
      { opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }
    );
  }, { scope: containerRef, dependencies: [locale] });

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#FDF6E9] overflow-x-hidden">

      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
        style={{ backgroundImage: `url("/img/bg-pattern.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <NavBar />

      {/* COLLECTION SECTION */}
      <section className="relative z-10 pt-24 md:pt-32 px-6 md:px-10 pb-20 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-black text-[#3D1E12] uppercase tracking-tighter mb-8 md:mb-12 text-center md:text-start">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group flex flex-col items-center p-6 md:p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-full aspect-square relative mb-4 md:mb-6 group-hover:scale-105 transition-transform duration-500">
                <img src={product.img} alt={t(`items.${product.key}`)} className="object-contain w-full h-full drop-shadow-xl" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-[#3D1E12] text-center">
                {t(`items.${product.key}`)}
              </h3>
              <p className="text-[#E31E24] font-black mb-4 md:mb-6">
                {product.price} {t("priceSuffix")}
              </p>

              <BimoButton
                text={t("addToCart")}
                paddingX="px-8"
                paddingY="py-3"
                fontSize="text-xs"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer w-full min-h-[80vh] bg-[#151414] text-white pt-7 md:pt-22 pb-2 md:pb-8 px-6 flex flex-col items-center justify-center z-10 relative">

        <div className="h-[10vh] md:h-10 w-full" />

        <p className="text-md mt-5 md:mt-0 md:text-3xl font-english tracking-[0.2em] text-center uppercase mb-6 md:max-w-5xl">
          {tf("signup")}
        </p>

        <div className="relative w-[90vw] md:w-280 mb-10 md:mb-15">
          <input
            type="email"
            placeholder={tf("emailPlaceholder")}
            className="w-full bg-white rounded-full py-5 md:py-6 px-8 md:px-12 text-black focus:outline-none text-sm md:text-base"
          />
          <button className="absolute end-4 md:end-8 top-1/2 -translate-y-1/2 text-black font-english font-medium uppercase text-xs md:text-md tracking-tighter cursor-pointer hover:text-[#E31E24] transition-colors">
            {tf("submit")}
          </button>
        </div>

        <div className="mb-6 md:mb-4 flex justify-center w-full max-h-[15vh] md:max-h-[25vh]">
          <Image src="/img/logo.png" alt="Logo" width={500} height={300} className="w-auto h-full max-h-full object-contain" priority />
        </div>

        <div className="w-full md:w-[85vw] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:mb-3 pt-4 md:pt-8">
          <a href="/" onClick={(e) => handleNavigation(e, "/")} className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">
            {tf("links.home")}
          </a>
          <a href="/products" onClick={(e) => handleNavigation(e, "/products")} className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">
            {tf("links.products")}
          </a>

          <div className="flex gap-6 text-3xl md:text-4xl text-gray-200 order-first md:order-0 my-4 md:my-0">
            <i className="ri-facebook-circle-fill hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1" />
            <i className="ri-tiktok-fill hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1" />
            <i className="ri-instagram-line hover:text-[#E31E24] cursor-pointer transition-transform hover:-translate-y-1" />
          </div>

          <a href="#" className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">
            {tf("links.contact")}
          </a>
          <a href="#" className="font-bold uppercase text-xl md:text-2xl tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">
            {tf("links.about")}
          </a>
        </div>

         <div className="absolute w-full md:max-w-[85vw] max-w-[90vw] bottom-0.5 md:bottom-2 flex  justify-between items-center mb-2 md:mb-1 mt-7 md:mt-16 md:pt-8">
                        <a href="#" className="font-english uppercase text-xs md:text-sm tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">{tf("legal.privacyShort")} <span className="hidden md:inline">{tf("legal.privacyFull")}</span></a>
                        <p className="text-xs md:text-sm font-medium text-[#E31E24]/80 flex gap-2">{tf("copyright.groupeBimo")} <span className="text-gray-200">{tf("copyright.year")}</span></p>
                        <a href="#" className="font-english uppercase text-xs md:text-sm tracking-widest text-gray-200 transition-transform hover:-translate-y-1 hover:text-[#E31E24]">{tf("legal.termsShort")} <span className="hidden md:inline">{tf("legal.termsFull")}</span></a>
                    </div>
      </footer>
    </main>
  );
}