import { createNavigation } from 'next-intl/navigation';
import { locales } from './request';

export const { Link, useRouter, usePathname, redirect } = createNavigation({ locales });