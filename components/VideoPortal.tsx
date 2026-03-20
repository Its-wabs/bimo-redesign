'use client';
import Image from 'next/image';
import BimoButton from './bimobutton';
import { useTranslations } from 'next-intl';

export default function VideoPortal() {
  const t = useTranslations('video');

  return (
    <div
      className="video-portal pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0"
      style={{ perspective: '1000px' }}
    >
      <div
        className="video-frame relative aspect-square w-[18vw] overflow-hidden shadow-2xl"
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
      >
        <video
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          className="video-bg h-full w-full object-cover"
        >
          <source src="/video/nostalgia.mp4" type="video/mp4" />
        </video>

        <div className="video-content absolute inset-0 flex flex-col items-center justify-center bg-black/20 opacity-0">
          <div className="video-content-inner flex flex-col items-center gap-y-5 px-4 text-center md:gap-y-7">
            <div className="video-logo-wrapper">
              <Image
                src="/img/logo.png"
                alt="Bimo Logo"
                width={140}
                height={60}
                loading='lazy'
                priority
                className="mb-6 h-auto w-24 md:w-36"
              />
            </div>

            <div className="mb-8 flex flex-col items-center gap-2 md:flex-row md:gap-4">
              <p className="video-tagline text-lg font-bold tracking-widest whitespace-nowrap text-white uppercase md:text-xl">
                {t('tagline')}
              </p>
              <span className="video-since text-lg font-light tracking-[0.2em] text-white uppercase opacity-0 md:text-xl">
                {t('since')}
              </span>
            </div>

            <div className="video-cta">
              <BimoButton text={t('cta')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
