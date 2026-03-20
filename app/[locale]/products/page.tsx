'use client';
import { useRef } from 'react';
import NavBar from '@/components/navbar';
import BimoButton from '@/components/bimobutton';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLiquidNavigation } from '../../../hooks/useLiquidNavigation';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Preloader from '@/components/pre-loader';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: 1,
    key: 'classicBimoGalette',
    price: '120.00',
    img: '/img/classic.png',
  },
  {
    id: 2,
    key: 'deliciousBimoCookies',
    price: '150.00',
    img: '/img/cookiez.png',
  },
  {
    id: 3,
    key: 'irresistibleBimoTango',
    price: '140.00',
    img: '/img/tango1.png',
  },
] as const;

export default function ProductsPage() {
  const t = useTranslations('collectionPage');
  const tf = useTranslations('footer');

  const locale = useLocale();

  const containerRef = useRef(null);
  const { navigate } = useLiquidNavigation();
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === pathname) return;
    navigate(href);
  };

  useGSAP(
    () => {
      gsap.to('nav', {
        y: -100,
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 80%',
          end: 'bottom 50%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      // Every time 'locale' changes, do a quick fade on the text elements
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, filter: 'blur(4px)' },
        { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }
      );
    },
    { scope: containerRef, dependencies: [locale] }
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-[#FDF6E9]"
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url("/img/bg-pattern.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <NavBar />

      {/* COLLECTION SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 md:px-10 md:pt-32">
        <h1 className="mb-8 text-center text-4xl font-black tracking-tighter text-[#3D1E12] uppercase md:mb-12 md:text-start md:text-7xl">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl md:p-8"
            >
              <div className="relative mb-4 aspect-square w-full transition-transform duration-500 group-hover:scale-105 md:mb-6">
                <img
                  src={product.img}
                  alt={t(`items.${product.key}`)}
                  className="h-full w-full object-contain drop-shadow-xl"
                />
              </div>

              <h3 className="text-center text-xl font-bold text-[#3D1E12] md:text-2xl">
                {t(`items.${product.key}`)}
              </h3>
              <p className="mb-4 font-black text-[#E31E24] md:mb-6">
                {product.price} {t('priceSuffix')}
              </p>

              <BimoButton
                text={t('addToCart')}
                paddingX="px-8"
                paddingY="py-3"
                fontSize="text-xs"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer relative z-10 flex min-h-[80vh] w-full flex-col items-center justify-center bg-[#151414] px-6 pt-7 pb-2 text-white md:pt-22 md:pb-8">
        <div className="h-[10vh] w-full md:h-10" />

        <p className="text-md font-english mt-5 mb-6 text-center tracking-[0.2em] uppercase md:mt-0 md:max-w-5xl md:text-3xl">
          {tf('signup')}
        </p>

        <div className="relative mb-10 w-[90vw] md:mb-15 md:w-280">
          <input
            type="email"
            placeholder={tf('emailPlaceholder')}
            className="w-full rounded-full bg-white px-8 py-5 text-sm text-black focus:outline-none md:px-12 md:py-6 md:text-base"
          />
          <button className="font-english md:text-md absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-medium tracking-tighter text-black uppercase transition-colors hover:text-[#E31E24] md:end-8">
            {tf('submit')}
          </button>
        </div>

        <div className="mb-6 flex max-h-[15vh] w-full justify-center md:mb-4 md:max-h-[25vh]">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={500}
            height={300}
            className="h-full max-h-full w-auto object-contain"
            priority
          />
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 pt-4 md:mb-3 md:w-[85vw] md:flex-row md:gap-2 md:pt-8">
          <a
            href="/"
            onClick={(e) => handleNavigation(e, '/')}
            className="text-xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24] md:text-2xl"
          >
            {tf('links.home')}
          </a>
          <a
            href="/products"
            onClick={(e) => handleNavigation(e, '/products')}
            className="text-xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24] md:text-2xl"
          >
            {tf('links.products')}
          </a>

          <div className="order-first my-4 flex gap-6 text-3xl text-gray-200 md:order-0 md:my-0 md:text-4xl">
            <i className="ri-facebook-circle-fill cursor-pointer transition-transform hover:-translate-y-1 hover:text-[#E31E24]" />
            <i className="ri-tiktok-fill cursor-pointer transition-transform hover:-translate-y-1 hover:text-[#E31E24]" />
            <i className="ri-instagram-line cursor-pointer transition-transform hover:-translate-y-1 hover:text-[#E31E24]" />
          </div>

          <a
            href="#"
            className="text-xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24] md:text-2xl"
          >
            {tf('links.contact')}
          </a>
          <a
            href="#"
            className="text-xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24] md:text-2xl"
          >
            {tf('links.about')}
          </a>
        </div>

        <div className="absolute bottom-0.5 mt-7 mb-2 flex w-full max-w-[90vw] items-center justify-between md:bottom-2 md:mt-16 md:mb-1 md:max-w-[85vw] md:pt-8">
          <a
            href="#"
            className="font-english text-xs tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24] md:text-sm"
          >
            {tf('legal.privacyShort')}{' '}
            <span className="hidden md:inline">{tf('legal.privacyFull')}</span>
          </a>
          <p className="flex gap-2 text-xs font-medium text-[#E31E24]/80 md:text-sm">
            {tf('copyright.groupeBimo')}{' '}
            <span className="text-gray-200">{tf('copyright.year')}</span>
          </p>
          <a
            href="#"
            className="font-english text-xs tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24] md:text-sm"
          >
            {tf('legal.termsShort')}{' '}
            <span className="hidden md:inline">{tf('legal.termsFull')}</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
