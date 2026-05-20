import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ALL_LOCALES } from '@/lib/i18n/config';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(ALL_LOCALES, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
