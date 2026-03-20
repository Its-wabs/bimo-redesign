'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface BimoButtonProps {
  text: string;
  bgColor?: string; // Hex or RGB
  shadowColor?: string; // Hex or RGB
  paddingX?: string; // Tailwind class: px-10
  paddingY?: string; // Tailwind class: py-4
  fontSize?: string; // Tailwind class: text-md
  className?: string; // Extra classes like "mt-10"
  textColor?: string;
}

export default function BimoButton({
  text,
  bgColor = '#E31E24',
  shadowColor = 'rgb(160,20,25)',
  paddingX = 'px-10',
  paddingY = 'py-4',
  fontSize = 'text-md',
  className = '',
  textColor = '#fff',
}: BimoButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const exitTlRef = useRef<gsap.core.Timeline | null>(null);

  const onMouseEnter = contextSafe(() => {
    if (tl.current) tl.current.kill();
    tl.current = gsap.timeline({ delay: 0.12 });

    // 1. Wave slides down
    tl.current.to(
      waveContainerRef.current,
      {
        y: '0%',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      0
    );

    // 2. Animate to Hardcoded Chocolate Shadow
    tl.current.to(
      buttonRef.current,
      {
        boxShadow: '0 6px 0 0 #2A140B',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      0
    );

    // 3. Rainbow Filter
    tl.current.fromTo(
      waveContainerRef.current,
      { filter: 'hue-rotate(0deg) brightness(2) saturate(2)' },
      {
        filter: 'hue-rotate(360deg) brightness(1) saturate(1)',
        duration: 0.9,
        ease: 'none',
        onComplete: () => {
          gsap.set(waveContainerRef.current, { filter: 'none' });
        },
      },
      0
    );

    tl.current.to(textRef.current, { scale: 1.05, duration: 0.3 }, 0.1);
  });

  const onMouseLeave = contextSafe(() => {
    if (tl.current) tl.current.kill();
    if (exitTlRef.current) exitTlRef.current.kill();

    exitTlRef.current = gsap.timeline();

    exitTlRef.current.to(
      waveContainerRef.current,
      {
        y: '-130%',
        duration: 0.5,
        ease: 'power2.in',
      },
      0
    );

    // RESET: Animates back to the dynamic prop shadowColor
    exitTlRef.current.to(
      buttonRef.current,
      {
        boxShadow: `0 6px 0 0 ${shadowColor}`,
        duration: 0.4,
        ease: 'power2.in',
      },
      0
    );

    exitTlRef.current.to(textRef.current, { scale: 1, duration: 0.3 }, 0);
  });

  return (
    <div
      ref={buttonRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // Dynamic styles for the prop colors
      style={{
        backgroundColor: bgColor,
        boxShadow: `0 6px 0 0 ${shadowColor}`,
      }}
      className={`group pointer-events-auto relative flex cursor-pointer items-center overflow-hidden rounded-2xl transition-all select-none active:translate-y-1 active:shadow-none ${className}`}
    >
      {/* THE WAVY LIQUID LAYER */}
      <div
        ref={waveContainerRef}
        className="pointer-events-none absolute inset-0 z-20 h-[150%] w-full -translate-y-[130%]"
      >
        <div className="absolute top-0 left-0 h-full w-full bg-[#3D1E12]" />
        <svg
          className="absolute bottom-0 left-0 h-[30%] w-full translate-y-[95%]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#3D1E12"
            d="M0,160 C120,320 240,0 360,160 C480,320 600,0 720,160 C840,320 960,0 1080,160 C1200,320 1320,0 1440,160 L1440,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* BUTTON TEXT (Uses Layout Props) */}
      <div
        className={`relative z-30 ${paddingX} ${paddingY} flex w-full items-center justify-center`}
      >
        <span
          ref={textRef}
          style={{
            color: textColor,
          }}
          className={`font-english tracking-tighter whitespace-nowrap uppercase will-change-transform hover:text-[#FDF6E9] ${fontSize}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
