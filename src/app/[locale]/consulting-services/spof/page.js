import Header from '@/components/Header';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  return { title: t('spof.sublabel') };
}

export default async function SpofPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  const backLabel = locale === 'fr' ? '← Retour' : '← Back';

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="page-headline">{t('spof.sublabel')}</h1>
        <p>{t('spof.desc')}</p>
        <Link
          href={`/${locale}/consulting-services`}
          className="btn-sks cta-services"
          style={{ padding: 'var(--space-m) var(--space-l)', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center' }}
        >
          {backLabel}
        </Link>
      </main>
    </div>
  );
}
