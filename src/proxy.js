import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  SQW_ONLY_LOCALES,
} from '@/lib/i18n/config';

const handleI18nRouting = createMiddleware({
  locales: ALL_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const pathnameLocale = ALL_LOCALES.find(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameLocale && SQW_ONLY_LOCALES.includes(pathnameLocale)) {
    const pathAfterLocale = pathname.slice(`/${pathnameLocale}`.length) || '/';
    const isSqwPath =
      pathAfterLocale.startsWith('/sqweezy') || pathAfterLocale === '/sqweezy';

    if (!isSqwPath) {
      return NextResponse.redirect(
        new URL(`/${DEFAULT_LOCALE}${pathAfterLocale}`, request.url)
      );
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon|.*\\..*).*)'],
};
