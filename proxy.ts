import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',

  localePrefix: 'always',
});

export default intlMiddleware;

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
