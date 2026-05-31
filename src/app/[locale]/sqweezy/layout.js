import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';
import { ProductJsonLd } from '@/components/JsonLd';
import { SQW_LOCALES } from '@/lib/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return {
    ...buildMetadata({
      title: tMeta('sqweezy.title'),
      description: tMeta('sqweezy.description'),
      locale,
      pathname: '/sqweezy',
      locales: SQW_LOCALES,
    }),
    icons: { icon: '/images/favicon-sqw.ico' },
  };
}

export default async function SqweezyLayout({ children, params }) {
  const { locale } = await params;
  return (
    <>
      <ProductJsonLd locale={locale} />
      {children}
    </>
  );
}
