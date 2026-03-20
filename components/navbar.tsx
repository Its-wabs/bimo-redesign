'use client';
import { forwardRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FullScreenMenu from './FullScreenMenu';
import BimoButton from './bimobutton';

import { useLiquidNavigation } from '@/hooks/useLiquidNavigation';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const NavBar = forwardRef<HTMLDivElement>((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();

  const { navigate } = useLiquidNavigation();

  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (href === pathname) return;

    navigate(href);
  };

  const handleLocaleSwitch = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <nav
        ref={ref}
        className="pointer-events-none fixed top-3 left-0 z-50 flex h-20 w-full items-center justify-between px-6 md:px-12"
      >
        {/* LEFT SECTION */}
        <div className="pointer-events-auto order-1 flex flex-1 items-center justify-start md:order-0">
          {/* Desktop Menu Icon */}
          <div
            onClick={() => setIsMenuOpen(true)}
            className="group hidden w-8 cursor-pointer flex-col gap-1.5 md:flex"
          >
            <div className="h-1 w-full origin-left rounded-full bg-black transition-transform group-hover:scale-x-110 group-hover:bg-[#E31E24]"></div>
            <div className="h-1 w-6 origin-left rounded-full bg-black transition-transform group-hover:scale-x-125 group-hover:bg-[#E31E24]"></div>
          </div>

          <Link
            href="/"
            onClick={(e) => handleNavigation(e, '/')}
            className="md:hidden"
          >
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={100}
              height={45}
              priority
              className="h-auto w-24"
            />
          </Link>
        </div>

        {/* LOGO CENTER */}
        <div className="pointer-events-auto absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <Link href="/" onClick={(e) => handleNavigation(e, '/')}>
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={140}
              height={60}
              priority
              className="h-auto w-32 lg:w-40"
            />
          </Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="pointer-events-auto order-2 flex flex-1 items-center justify-end md:order-0">
          {/* Mobile Menu Icon */}
          <div
            onClick={() => setIsMenuOpen(true)}
            className="group flex w-8 cursor-pointer flex-col items-end gap-1.5 md:hidden"
          >
            <div className="h-1 w-full rounded-full bg-black transition-all group-hover:bg-[#E31E24]"></div>
            <div className="h-1 w-6 rounded-full bg-black transition-all group-hover:w-full group-hover:bg-[#E31E24]"></div>
          </div>

          <div className="flex md:gap-2">
            <Link
              href="/products"
              onClick={(e) => handleNavigation(e, '/products')}
              className="hidden md:block"
            >
              <BimoButton
                text={t('shop')}
                bgColor="rgba(0,0,0,0.1)"
                shadowColor="rgba(0,0,0,0.2)"
                paddingX="px-6"
                paddingY="py-2"
                fontSize="text-base"
              />
            </Link>
            <div className="hidden md:inline">
              {/* Language switcher  */}
              <LanguageSwitcher
                locale={locale}
                toggleLanguage={handleLocaleSwitch}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});

NavBar.displayName = 'NavBar';

export default NavBar;
