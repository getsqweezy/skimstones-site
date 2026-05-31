import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tMeta('home.title'),
    description: t('tagline'),
    icons: { icon: '/images/favicon-sks.svg' },
  };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const isSksLocale = locale === 'fr' || locale === 'en';
  const tCareers = isSksLocale
    ? await getTranslations({ locale, namespace: 'careers' })
    : null;

  return (
    <div className="mobile-frame">
      <Header />
      <main className="home-main">
        <p className="hero-tagline">{t('tagline')}</p>

        <div className="home-row">
          <p>{t('sqweezyBlurb')}</p>
          <Link href={`/${locale}/sqweezy`} className="cta-btn cta-sqweezy">
            <span className="cta-discover">{t('btnDiscover')}</span>
            <Image
              src="/images/logo-sqweezy-long.png"
              alt="SQWEEZY"
              width={90}
              height={28}
              style={{ objectFit: 'contain', width: '90px', height: '28px' }}
            />
          </Link>
        </div>

        <div className="home-row">
          <p>{t('servicesBlurb')}</p>
          <Link
            href={`/${locale}/consulting-services`}
            className="cta-btn cta-services"
          >
            {t('btnServices')}
          </Link>
        </div>

        <div className="home-row">
          <p>{t('foundersBlurb')}</p>
          <Link href={`/${locale}/founders`} className="cta-btn cta-founders">
            {t('btnFounders')}
          </Link>
        </div>

        <div className="home-row">
          <p>{t('contactBlurb')}</p>
          <Link href={`/${locale}/contact`} className="cta-btn cta-contact">
            {t('btnContact')}
          </Link>
        </div>

        {isSksLocale && tCareers && (
          <div className="home-row">
            <p>{tCareers('homeBlurb')}</p>
            <Link
              href={`/${locale}/carrieres`}
              className="cta-btn btn-sks"
              style={{ background: 'var(--sks-bordeaux)' }}
            >
              {tCareers('homeBtn')}
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
