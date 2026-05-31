import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
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

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  /* ── /admin/* : entièrement hors i18n ───────────────────── */
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    let response = NextResponse.next({ request });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        cookies: {
          getAll() { return request.cookies.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return response;
  }

  /* ── Restriction des locales SQW-only aux pages /sqweezy ── */
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
  matcher: [
    '/admin/:path*',
    '/((?!admin|api|_next/static|_next/image|favicon\\.ico|.*\\..*).*)',
  ],
};
