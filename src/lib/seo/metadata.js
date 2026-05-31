import { SKS_LOCALES } from '@/lib/i18n/config';

const BASE_URL = 'https://www.skimstones.com';

export function buildMetadata({ title, description, locale, pathname, locales, keywords }) {
  const langs = locales ?? SKS_LOCALES;
  const canonical = `${BASE_URL}/${locale}${pathname}`;

  const languages = Object.fromEntries(langs.map((l) => [l, `${BASE_URL}/${l}${pathname}`]));
  languages['x-default'] = `${BASE_URL}/fr${pathname}`;

  return {
    title,
    description,
    ...(keywords?.length && { keywords }),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SKIMSTONES Smart Essentials',
      locale: locale.replace(/-/g, '_'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
