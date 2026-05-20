import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { ALL_LOCALES, DEFAULT_LOCALE } from '../lib/i18n/config';

const messagesMap = {
  fr: () => import('../../messages/fr.json'),
  en: () => import('../../messages/en.json'),
  es: () => import('../../messages/es.json'),
  it: () => import('../../messages/it.json'),
  de: () => import('../../messages/de.json'),
  nl: () => import('../../messages/nl.json'),
  pt: () => import('../../messages/pt.json'),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(ALL_LOCALES, requested) ? requested : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await messagesMap[locale]()).default,
  };
});
