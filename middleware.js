import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { ALL_LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/config';

const handleI18nRouting = createMiddleware({
  locales: ALL_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)',
  ],
};
