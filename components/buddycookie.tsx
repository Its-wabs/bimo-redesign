'use client';
import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { forwardRef } from 'react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

const BuddyCookie = forwardRef<HTMLDivElement>((props, ref) => {
  const cookieRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const jumpTween = useRef<gsap.core.Tween | null>(null);

  const handleMouseEnter = () => {
    jumpTween.current = gsap.to(cookieRef.current, {
      y: -40,
      scaleX: 0.95,
      scaleY: 1.05,
      duration: 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  };

  const handleMouseLeave = () => {
    jumpTween.current?.kill();
    gsap.to(cookieRef.current, {
      y: 0,
      scaleX: 1,
      scaleY: 1,
      duration: 0.6,
      ease: 'back.out(2)',
    });
  };

  const handleClick = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 2,
      ease: 'power4.inOut',
    });
  };

  return (
    <div
      ref={ref}
      className="buddy-cookie pointer-events-none invisible fixed top-1/2 left-1/2 z-40 flex items-center justify-center opacity-0"
      style={{ perspective: '1000px' }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="cookie-wrapper pointer-events-auto relative cursor-pointer"
      >
        <div
          ref={cookieRef}
          className="cookie-inner relative aspect-square w-200 max-w-275 sm:w-200 md:w-275 lg:max-w-300"
        >
          <Image
            src="/img/bimo.png"
            alt="Bimo Galette"
            fill
            priority
            loading='lazy'
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
});

BuddyCookie.displayName = 'BuddyCookie';

export default BuddyCookie;
