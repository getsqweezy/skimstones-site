import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    title: tMeta('carrieres.title'),
    description: tMeta('carrieres.description'),
    locale,
    pathname: '/carrieres',
  });
}

export default function CarrieresLayout({ children }) {
  return children;
}
