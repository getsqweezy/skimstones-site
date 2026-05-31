import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    title: tMeta('founders.title'),
    description: tMeta('founders.description'),
    locale,
    pathname: '/founders',
  });
}

export default function FoundersLayout({ children }) {
  return children;
}
