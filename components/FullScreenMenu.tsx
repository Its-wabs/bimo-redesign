'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';

import LanguageSwitcher from './LanguageSwitcher';

const MENU_LINKS = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'about', href: '/#' },
  { key: 'findStore', href: '/#' },
] as const;

export default function FullScreenMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('menu');
  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();

  const containerRef = useRef<HTMLDivElement>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement[]>([]);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleLinkClick = contextSafe(
    (e: React.MouseEvent, href: string, index: number) => {
      e.preventDefault();

      if (href === pathname) {
        onClose();
        return;
      }

      if (tl.current) tl.current.kill();

      const exitTl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { visibility: 'hidden' });
          onClose();
        },
      });

      linksRef.current.forEach((link, i) => {
        if (i !== index) {
          exitTl.to(
            link,
            { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' },
            0
          );
        }
      });

      exitTl
        .to(
          linksRef.current[index],
          { scale: 1.2, color: '#E31E24', duration: 0.4, ease: 'power2.in' },
          0
        )
        .to(
          linksRef.current[index],
          { autoAlpha: 0, duration: 0.4, ease: 'power2.in' },
          0.5
        )
        .to(
          waveContainerRef.current,
          { y: '-130%', duration: 1, ease: 'power4.inOut' },
          '+=0.7'
        );

      exitTl.call(
        () => {
          router.push(href);
        },
        [],
        '-=0.6'
      );
    }
  );

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useGSAP(
    () => {
      if (isOpen) {
        // Kill any running timeline before starting open
        if (tl.current) tl.current.kill();
        tl.current = gsap.timeline();

        gsap.set(containerRef.current, { visibility: 'visible' });

        tl.current
          .to(
            waveContainerRef.current,
            { y: '0%', duration: 1, ease: 'power4.inOut' },
            0
          )
          .fromTo(
            waveContainerRef.current,
            { filter: 'hue-rotate(0deg) brightness(2) saturate(2)' },
            {
              filter: 'hue-rotate(360deg) brightness(1) saturate(1)',
              duration: 1.2,
              ease: 'none',
              onComplete: () => {
                gsap.set(waveContainerRef.current, { filter: 'none' });
              },
            },
            0
          )
          .fromTo(
            linksRef.current,
            { y: 100, opacity: 0, skewY: 5 },
            {
              y: 0,
              opacity: 1,
              skewY: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power4.out',
            },
            '-=0.4'
          )
          .fromTo(
            '.switcher',
            { y: -100, opacity: 0, skewY: 5 },
            {
              y: 0,
              opacity: 1,
              skewY: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power4.out',
            },
            '-=0.2'
          );
      } else {
        if (tl.current) tl.current.kill();

        gsap.set(linksRef.current, { clearProps: 'color,scale' });

        const exitTl = gsap.timeline({
          onComplete: () => {
            gsap.set(containerRef.current, { visibility: 'hidden' });

            gsap.set(linksRef.current, { clearProps: 'all' });
          },
        });

        exitTl
          .to(linksRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
          })
          .to(
            waveContainerRef.current,
            { y: '-130%', duration: 0.8, ease: 'power4.inOut' },
            '-=0.2'
          );
      }
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  const handleLocaleSwitch = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none invisible fixed inset-0 z-100"
    >
      {/* WAVY CHOCOLATE CONTAINER */}
      <div
        ref={waveContainerRef}
        className="pointer-events-none absolute inset-0 h-[120%] w-full -translate-y-[130%] bg-[#3D1E12]"
      >
        <svg
          className="absolute bottom-0 left-0 h-[15%] w-full translate-y-[98%]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#3D1E12"
            d="M0,160 C120,320 240,0 360,160 C480,320 600,0 720,160 C840,320 960,0 1080,160 C1200,320 1320,0 1440,160 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* CONTENT LAYER */}
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center justify-center transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'opacity-0'
        }`}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="group absolute top-10 right-10 flex cursor-pointer items-center gap-4 text-white"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-[#E31E24] group-hover:bg-[#E31E24]">
            <span className="text-xl leading-none">✕</span>
          </div>
        </button>
        <div className="switcher absolute top-10 left-10 inline md:hidden">
          {/* Language switcher  */}
          <LanguageSwitcher
            locale={locale}
            toggleLanguage={handleLocaleSwitch}
          />
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col items-center gap-3 md:gap-6">
          {MENU_LINKS.map((link, i) => (
            <div
              key={link.key}
              className="mb-2 px-4"
              ref={(el) => {
                if (el) linksRef.current[i] = el;
              }}
            >
              <Link
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, i)}
                className="block text-5xl leading-[0.85] font-black tracking-tighter text-white uppercase transition-all duration-300 hover:scale-105 hover:text-[#E31E24] md:text-[8rem]"
              >
                {t(link.key)}
              </Link>
            </div>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-12 flex w-full flex-col items-center justify-between gap-6 px-12 text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase md:flex-row">
          <div className="flex gap-10">
            <a href="#" className="transition-colors hover:text-white">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-white">
              TikTok
            </a>
          </div>
          <p>©2026 BIMO CORPORATE</p>
        </div>
      </div>
    </div>
  );
}
