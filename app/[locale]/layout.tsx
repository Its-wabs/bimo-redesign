import type { Metadata } from 'next';
import 'remixicon/fonts/remixicon.css';
import { Cairo, Kanit } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';

const peace = localFont({
  src: [
    {
      path: '../fonts/PeaceSans.ttf',
    },
  ],
  variable: '--font-english',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  weight: ['400', '700', '900'],
  display: 'swap',
});

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  variable: '--font-extra',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Group Bimo',
  description: "Redesigning the heritage of Algerian cookies Bimo with modern motion.",
  icons: {
    icon: "/bimo-icon.png",
    shortcut: "/bimoshort.png", 
    apple: "/bimo-short.png", 
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${peace.variable} ${cairo.variable} ${kanit.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <SpeedInsights />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
