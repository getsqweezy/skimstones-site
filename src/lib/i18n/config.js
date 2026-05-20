export const SKS_LOCALES = ['fr', 'en'];
export const SQW_LOCALES = ['fr', 'en', 'es', 'it', 'de', 'nl', 'pt'];
export const ALL_LOCALES = [...new Set([...SKS_LOCALES, ...SQW_LOCALES])];
export const DEFAULT_LOCALE = 'fr';

export const SQW_ONLY_LOCALES = SQW_LOCALES.filter((l) => !SKS_LOCALES.includes(l));

export const LOCALE_LABELS = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  de: 'Deutsch',
  nl: 'Nederlands',
  pt: 'Português',
};
