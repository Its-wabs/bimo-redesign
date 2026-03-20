'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const cookieRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  const [isComplete, setIsComplete] = useState(false);

  const t = useTranslations('preloader');

  useGSAP(() => {
    gsap.to(cookieRef.current, {
      x: 'random(-3, 3)',
      y: 'random(-3, 3)',
      rotation: 'random(-3, 3)',
      duration: 0.2,
      repeat: -1,
      repeatRefresh: true,
      ease: 'sine.inOut',
    });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'expo.inOut',
          onComplete: () => {
            setIsComplete(true);
            onComplete();
          },
        });
      },
    });

    // The Sprite Step
    tl.to(cookieRef.current, {
      backgroundPosition: '-2400px 0',
      duration: 4,
      ease: 'steps(12)',
    });

    // 3. THE TEXT PULSE
    gsap.to('.loading-text', {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
    });
  }, []);

  if (isComplete) return null;

  return (
    <div ref={preloaderRef} className="preloader overflow-hidden">
      <div className="relative">
        <div ref={cookieRef} className="cookie-animation" />
      </div>
      <p className="loading-text mt-8 text-xs font-bold tracking-widest uppercase">
        {t('cooking')}
        <span className="inline-block animate-bounce">...</span>
      </p>
    </div>
  );
}
