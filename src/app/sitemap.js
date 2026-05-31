const BASE_URL = 'https://www.skimstones.com';
const SKS_LOCALES = ['fr', 'en'];
const SQW_LOCALES = ['fr', 'en', 'es', 'it', 'de', 'nl', 'pt'];

const SKS_PATHS = [
  '',
  '/consulting-services',
  '/consulting-services/spof',
  '/consulting-services/wvc',
  '/consulting-services/woil',
  '/consulting-services/pm',
  '/founders',
  '/contact',
  '/carrieres',
];

export default function sitemap() {
  const sksPaths = SKS_PATHS.flatMap((path) =>
    SKS_LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1.0 : 0.8,
    }))
  );

  const sqweezyPaths = SQW_LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}/sqweezy`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...sksPaths, ...sqweezyPaths];
}
