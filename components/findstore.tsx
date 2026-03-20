'use client';
import { useLiquidNavigation } from '@/hooks/useLiquidNavigation';
import BimoButton from './bimobutton';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const FindStore = () => {
  const t = useTranslations('findStore');
  const tf = useTranslations('footer');

  const { navigate } = useLiquidNavigation();

  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === pathname) return;

    navigate(href);
  };

  return (
    <section className="find-store-container relative flex w-full flex-col items-center overflow-hidden bg-[#F7CD99]">
      {/* Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url("/img/bg-pattern.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="z-10 flex h-screen w-full flex-col items-center justify-center">
        <p className="md:text-md mb-6 text-sm font-black tracking-[0.5em] text-[#151414] uppercase opacity-50">
          {t('availableIn')}
        </p>
        <p className="font-english mb-6 text-2xl tracking-[0.2em] text-[#151414] uppercase md:text-5xl">
          {t('headline')}
        </p>
        <BimoButton
          text={t('cta')}
          bgColor="#8B5A3C"
          shadowColor="#5D3C28"
          paddingX="px-16"
          paddingY="py-6"
          fontSize="text-2xl"
          textColor="#FDF6E9"
        />
      </div>

      <footer className="z-10 flex min-h-[80vh] w-full flex-col items-center justify-center bg-[#151414] px-6 pt-7 pb-2 text-white md:pt-22 md:pb-8">
        {/* empty space for buddy cookie */}
        <div className="h-[10vh] w-full md:h-10" />

        <p className="text-md font-english mt-5 mb-6 text-center tracking-[0.2em] uppercase md:mt-0 md:max-w-5xl md:text-3xl">
          {tf('signup')}
        </p>

        <div className="relative mb-10 w-[80vw] md:mb-15 md:w-280">
          <input
            type="email"
            placeholder={tf('emailPlaceholder')}
            className="w-full rounded-full bg-white px-12 py-6 text-black focus:outline-none"
          />
          <button className="font-english text-md absolute end-4 top-1/2 -translate-y-1/2 cursor-pointer font-medium tracking-tighter text-black uppercase hover:text-[#E31E24] md:end-8">
            {tf('submit')}
          </button>
        </div>

        <div className="mb- flex max-h-[15vh] w-full justify-center md:mb-4 md:max-h-[25vh]">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={500}
            height={300}
            className="h-full max-h-full w-auto object-contain"
            priority
          />
        </div>

        <div className="flex w-[85vw] flex-col items-center justify-between gap-2 pt-4 md:mb-3 md:flex-row md:pt-8">
          <a
            href="/"
            onClick={(e) => handleNavigation(e, '/')}
            className="text-2xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24]"
          >
            {tf('links.home')}
          </a>

          <a
            href="/products"
            onClick={(e) => handleNavigation(e, '/products')}
            className="text-2xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24]"
          >
            {tf('links.products')}
          </a>

          <div className="order-first flex gap-6 text-3xl text-gray-200 md:order-0 md:text-4xl">
            <i className="ri-facebook-circle-fill cursor-pointer transition-transform hover:-translate-y-1 hover:text-[#E31E24]"></i>
            <i className="ri-tiktok-fill cursor-pointer transition-transform hover:-translate-y-1 hover:text-[#E31E24]"></i>
            <i className="ri-instagram-line cursor-pointer transition-transform hover:-translate-y-1 hover:text-[#E31E24]"></i>
          </div>

          <a
            href="#"
            className="text-2xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24]"
          >
            {tf('links.contact')}
          </a>
          <a
            href="#"
            className="text-2xl font-bold tracking-widest text-gray-200 uppercase transition-transform hover:-translate-y-1 hover:text-[#E31E24]"
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
    </section>
  );
};

export default FindStore;
