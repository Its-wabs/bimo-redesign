'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BimoButton from './bimobutton';
import { useTranslations } from 'next-intl';

const PRODUCTS = [
  {
    id: 1,
    key: 'classicBimoGalette',
    img: '/img/bimogallo.png',
    bgColor: '#E97A3E',
  },
  {
    id: 2,
    key: 'deliciousBimoCookies',
    img: '/img/cookie.png',
    bgColor: '#7C4DFF',
  },
  {
    id: 3,
    key: 'irresistibleBimoTango',
    img: '/img/tangooo.png',
    bgColor: '#4CAF50',
  },
];

export default function ProductSection() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgPopRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isAnimating, setIsAnimating] = useState(false);

  const currentProduct = PRODUCTS[index];
  const prevIndex = (index - 1 + PRODUCTS.length) % PRODUCTS.length;
  const nextIndex = (index + 1) % PRODUCTS.length;

  const [isDesktop, setIsDesktop] = useState(false);

  const t = useTranslations('products.carousel');

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  });

  //  PERSISTENT ANIMATIONS
  useGSAP(
    () => {
      gsap.to('.floating-product', {
        y: '-=12',
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to('.side-star', {
        rotation: 360,
        duration: 23,
        ease: 'none',
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  // MAIN ENTRANCE & PROGRESS BAR
  useGSAP(
    () => {
      const tl = gsap.timeline({
        onStart: () => setIsAnimating(true),
        onComplete: () => {
          setIsAnimating(false);
          setIndex((prev) => (prev + 1) % PRODUCTS.length);
        },
      });

      timelineRef.current = tl;

      tl.fromTo(
        '.progress-fill',
        { width: '0%' },
        { width: '100%', duration: 4, ease: 'none' },
        0
      );

      tl.fromTo(
        bgPopRef.current,
        {
          clipPath: 'circle(0% at 50% 50%)',
          backgroundColor: currentProduct.bgColor,
          autoAlpha: 1,
        },
        {
          clipPath: 'circle(150% at 50% 50%)',
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            gsap.set(containerRef.current, {
              backgroundColor: currentProduct.bgColor,
            });

            gsap.set(bgPopRef.current, {
              autoAlpha: 0,
              clipPath: 'circle(0% at 50% 50%)',
            });
          },
        },
        0
      );

      tl.fromTo(
        '.product-kit',
        { x: 100, opacity: 0, scale: 1, rotation: -15 },
        {
          x: 0,
          opacity: 1,
          scale: isDesktop ? 1.4 : 1.2,
          rotation: -8,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.1
      );

      // Star Burst
      tl.fromTo(
        '.side-star',
        { scale: 0, opacity: 0, x: (i) => (i < 2 ? 40 : -40) },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(2)',
        },
        0.4
      );
    },
    { dependencies: [index], scope: containerRef }
  );

  const handleManualNext = () => {
    if (!timelineRef.current) return;

    timelineRef.current.progress(1);
  };

  const handleManualPrev = () => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    setIsAnimating(false);
    setIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      <div
        ref={bgPopRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-5 opacity-10"
        style={{
          backgroundImage: `url("/img/bg-pattern.jpg")`,
          backgroundSize: 'cover',
        }}
      />

      {/* Side Previews */}
      {isDesktop && (
        <>
          <div className="side-left pointer-events-none absolute top-1/2 left-[-7%] z-10 hidden h-100 w-70 -translate-y-1/2 -rotate-6 opacity-30 lg:block">
            <Image
              src={PRODUCTS[prevIndex].img}
              alt="prev"
              fill
              className="object-contain blur-[1px] grayscale-40"
            />
          </div>

          <div className="side-right pointer-events-none absolute top-1/2 right-[-7%] z-10 hidden h-100 w-70 -translate-y-1/2 -rotate-6 opacity-30 lg:block">
            <Image
              src={PRODUCTS[nextIndex].img}
              alt="next"
              fill
              className="object-contain blur-[1px] grayscale-40"
            />
          </div>
        </>
      )}

      <div className="relative z-20 flex h-full max-h-[85vh] w-full flex-col items-center justify-center gap-12 pt-20 md:gap-22">
        <div className="product-kit relative flex h-[45vh] max-h-125 w-[30vh] max-w-[80vw] items-center justify-center">
          {/* Stars  */}
          <div className="side-star absolute top-[33%] left-[-15%] z-10 h-9 w-9 md:h-12 md:w-12">
            <Image
              src="/img/stars.svg"
              alt="star"
              fill
              className="object-contain"
            />
          </div>
          <div className="side-star absolute top-[22%] left-[10%] z-10 h-7 w-7 md:h-10 md:w-10">
            <Image
              src="/img/stars.svg"
              alt="star"
              fill
              className="object-contain"
            />
          </div>
          <div className="side-star absolute top-[35%] right-[5%] z-10 h-7 w-7 md:h-10 md:w-10">
            <Image
              src="/img/stars.svg"
              alt="star"
              fill
              className="object-contain"
            />
          </div>
          <div className="side-star absolute top-[50%] right-[-10%] z-10 h-9 w-9 md:h-12 md:w-12">
            <Image
              src="/img/stars.svg"
              alt="star"
              fill
              className="object-contain"
            />
          </div>

          <div className="floating-product relative z-20 h-full w-full">
            <Image
              src={currentProduct.img}
              alt={currentProduct.key}
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="product-text flex flex-col items-center text-center">
          <h2 className="mb-6 text-2xl font-black tracking-tighter text-white uppercase md:text-4xl">
            {t(`items.${currentProduct.key}`)}
          </h2>

          <div className="pointer-events-auto z-30 mb-8 inline-flex">
            <BimoButton text={t('cta')} />
          </div>

          <div className="flex items-center gap-3">
            {PRODUCTS.map((_, i) => (
              <div
                key={i}
                onClick={() => !isAnimating && setIndex(i)}
                className={`relative cursor-pointer overflow-hidden rounded-full bg-white/30 transition-all duration-500 ${i === index ? 'h-2 w-5' : 'h-2 w-2 hover:bg-white/50'}`}
              >
                {i === index && (
                  <div className="progress-fill absolute top-0 left-0 h-full rounded-full bg-white" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NAVIGATION ARROWS */}
      {/* LEFT HOVER ZONE */}
      <div
        onPointerDown={handleManualPrev}
        className="group absolute top-0 left-0 z-50 flex h-full w-[20vw] cursor-pointer items-center justify-center"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 md:opacity-0 md:group-hover:opacity-100">
          <div className="rounded-full p-4">
            <i className="ri-arrow-left-wide-line text-4xl text-white"></i>
          </div>
        </div>
      </div>

      {/* RIGHT HOVER ZONE */}
      <div
        onPointerDown={handleManualNext}
        className="group absolute top-0 right-0 z-50 flex h-full w-[20vw] cursor-pointer items-center justify-center"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110 md:opacity-0 md:group-hover:opacity-100">
          <div className="rounded-full p-4">
            <i className="ri-arrow-right-wide-line text-4xl text-white"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
