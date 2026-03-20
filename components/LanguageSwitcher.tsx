'use client';

import { useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LanguageSwitcherProps {
  locale: string;
  toggleLanguage: () => void;
}

const LanguageSwitcher = forwardRef<HTMLDivElement, LanguageSwitcherProps>(
  ({ locale, toggleLanguage }, ref) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const waveContainerRef = useRef<HTMLDivElement>(null);
    const flagContainerRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const isEn = locale === 'en';

    const currentBg = isEn ? '#00247D' : '#006C35';
    const currentShadow = isEn ? '#00154d' : '#004d26';
    const targetWaveColor = isEn ? '#006C35' : '#00247D';

    const { contextSafe } = useGSAP({ scope: buttonRef });

    const onMouseEnter = contextSafe(() => {
      if (tl.current) tl.current.kill();
      tl.current = gsap.timeline();

      // Liquid Wave drops down
      tl.current.to(
        waveContainerRef.current,
        {
          y: '0%',
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0
      );

      //  Flags Slide
      tl.current.to(
        flagContainerRef.current,
        {
          y: '-50%',
          duration: 0.2,
          ease: 'back.out(1.5)',
        },
        0.1
      );

      // target color
      tl.current.to(
        buttonRef.current,
        {
          boxShadow: `0 6px 0 0 ${isEn ? '#004d26' : '#00154d'}`,
          duration: 0.6,
        },
        0
      );
    });

    const onMouseLeave = contextSafe(() => {
      if (tl.current) tl.current.kill();

      const exit = gsap.timeline();

      exit.to(
        waveContainerRef.current,
        { y: '-130%', duration: 0.4, ease: 'power2.in' },
        0
      );
      exit.to(
        flagContainerRef.current,
        { y: '0%', duration: 0.4, ease: 'power2.in' },
        0
      );
      exit.to(
        buttonRef.current,
        { boxShadow: `0 6px 0 0 ${currentShadow}`, duration: 0.4 },
        0
      );
    });

    return (
      <div
        ref={buttonRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={toggleLanguage}
        style={{
          backgroundColor: currentBg,
          boxShadow: `0 6px 0 0 ${currentShadow}`,
        }}
        className="group relative flex h-10 w-15 cursor-pointer items-center justify-center overflow-hidden rounded-xl transition-all select-none active:translate-y-1 active:shadow-none"
      >
        {/* THE LIQUID LAYER (Target Color) */}
        <div
          ref={waveContainerRef}
          className="pointer-events-none absolute inset-0 z-10 h-[150%] w-full -translate-y-[130%]"
        >
          <div
            className="absolute top-0 left-0 h-full w-full"
            style={{ backgroundColor: targetWaveColor }}
          />
          <svg
            className="absolute bottom-0 left-0 h-[30%] w-full translate-y-[95%]"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill={targetWaveColor}
              d="M0,160 C120,320 240,0 360,160 C480,320 600,0 720,160 C840,320 960,0 1080,160 C1200,320 1320,0 1440,160 L1440,0 L0,0 Z"
            />
          </svg>
        </div>

        {/* THE FLAG STACK */}
        <div className="relative z-20 h-8 overflow-hidden">
          <div
            ref={flagContainerRef}
            className="flex flex-col items-center transition-transform"
          >
            {/* Top Flag (Current) */}
            <span className="flex h-8 items-center justify-center text-2xl">
              {isEn ? '🇬🇧' : '🇸🇦'}
            </span>
            {/* Bottom Flag (Target) */}
            <span className="flex h-8 items-center justify-center text-2xl">
              {isEn ? '🇸🇦' : '🇬🇧'}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

LanguageSwitcher.displayName = 'LanguageSwitcher';
export default LanguageSwitcher;
