import Header from '@/components/Header';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  return { title: t('woil.sublabel') };
}

export default async function WoilPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  const backLabel = locale === 'fr' ? '← Retour' : '← Back';

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="page-headline">{t('woil.sublabel')}</h1>
        <p>{t('woil.desc')}</p>
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
