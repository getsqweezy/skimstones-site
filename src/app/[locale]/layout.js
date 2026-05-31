import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ALL_LOCALES } from '@/lib/i18n/config';
import { OrganizationJsonLd } from '@/components/JsonLd';

const BASE_URL = 'https://www.skimstones.com';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'SKIMSTONES Smart Essentials',
      template: '%s',
    },
    alternates: {
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/fr`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(ALL_LOCALES, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <OrganizationJsonLd />
      {children}
    </NextIntlClientProvider>
  );
}
