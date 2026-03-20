'use client';
import { useLiquidNavigation } from '@/hooks/useLiquidNavigation';
import BimoButton from './bimobutton';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  const { navigate } = useLiquidNavigation();

  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === pathname) return;

    navigate(href);
  };

  return (
    <section className="hero pointer-events-none relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#FDF6E9] px-6 pt-[12vh] md:pt-[12vh]">
      {/* Background Pattern */}
      <div
        className="hero pointer-events-none absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url("/img/bg-pattern.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="relative z-30 flex w-full flex-col items-center">
        {/* Secondary Header */}
        <div className="hero-text mb-2 text-center md:mb-2">
          <h3 className="font-english text-xl leading-none tracking-tighter text-black uppercase md:text-3xl">
            SINCE THE BEGINNING
          </h3>
          <h3 className="font-english mt-1 text-3xl leading-none tracking-tighter text-[#E31E24] uppercase md:text-5xl">
            EVERY DAY
          </h3>
        </div>

        {/* Main Arabic Headline */}
        <div className="hero-text flex flex-col items-center gap-8 text-center md:gap-8">
          <h1
            dir="rtl"
            className="font-arabic flex flex-col items-center justify-center gap-0 text-[16vw] leading-[0.9] font-black text-black md:flex-row md:gap-4 md:text-[9vw] md:leading-none lg:text-[110px]"
            style={{
              textShadow: `
                -4px 4px 0px #fff, 
                -1px -1px 0px #fff, 
                1px -1px 0px #fff, 
                -1px 1px 0px #fff, 
                1px 1px 0px #fff,
                -6px 6px 20px rgba(0,0,0,0.12)
              `,
            }}
          >
            {/* Split the text into spans for better control */}
            <span className="mb-7 whitespace-nowrap md:mb-0">من بكري</span>
            <span className="whitespace-nowrap">
              كل يوم <span className="text-[#E31E24]">بيمو</span>
            </span>
          </h1>

          {/* CTA Button */}
          <div
            className="pointer-events-auto mt-4"
            onClick={(e) => handleNavigation(e, '/products')}
          >
            <BimoButton text={t('cta')} bgColor="#E31E24" />
          </div>
        </div>
      </div>
    </section>
  );
}
