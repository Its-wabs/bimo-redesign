'use client';
import Image from 'next/image';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { forwardRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

const RollingCookie = forwardRef<HTMLDivElement>((props, ref) => {
  const handleBackToTop = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 2,
      ease: 'power4.inOut',
    });
  };
  return (
    <div
      ref={ref}
      className="main-cookie pointer-events-none invisible fixed top-1/2 left-1/2 z-25 flex items-center justify-center opacity-0"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        onClick={handleBackToTop}
        className="cookie-inner relative aspect-square w-150 max-w-200 cursor-pointer transition-transform active:scale-95 sm:w-170 md:w-275 lg:max-w-300"
      >
        <Image
          src="/img/bimo.png"
          alt="Bimo Galette"
          fill
          priority
          className="object-contain md:drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        />
      </div>
    </div>
  );
});

RollingCookie.displayName = 'RollingCookie';

export default RollingCookie;
