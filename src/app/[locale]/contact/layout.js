import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    title: tMeta('contact.title'),
    description: tMeta('contact.description'),
    locale,
    pathname: '/contact',
  });
}

export default function ContactLayout({ children }) {
  return children;
}
