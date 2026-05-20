import Header from '@/components/Header';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  return {
    title: 'Services — SkimStones Smart Essentials',
    description: t('headline'),
  };
}

export default async function ConsultingServicesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="page-headline">{t('headline')}</h1>
      </main>
    </div>
  );
}
