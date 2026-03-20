import { getRequestConfig } from 'next-intl/server';

// Single source of truth for supported locales
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale comes from the [locale] segment in the URL
  let locale = await requestLocale;

  // Fall back to default if locale is missing or unsupported
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    // Load messages server-side — this is critical to avoid client waterfalls
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
