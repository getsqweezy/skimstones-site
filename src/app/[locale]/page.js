import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return {
    ...buildMetadata({
      title: tMeta('home.title'),
      description: tMeta('home.description'),
      locale,
      pathname: '',
    }),
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
          <Link href={`/${locale}/sqweezy`} className="home-row-text-link">
            {t('sqweezyBlurb')}
          </Link>
          <Link href={`/${locale}/sqweezy`} className="cta-btn cta-sqweezy">
            <span className="cta-discover">{t('btnDiscover')}</span>
            <Image
              src="/images/logo-sqweezy-long.png"
              alt="SQWEEZY"
              width={117}
              height={36}
              style={{ objectFit: 'contain', width: '117px', height: '36px' }}
            />
          </Link>
        </div>

        <div className="home-row">
          <Link href={`/${locale}/consulting-services`} className="home-row-text-link">
            {t('servicesBlurb')}
          </Link>
          <Link
            href={`/${locale}/consulting-services`}
            className="cta-btn cta-services"
          >
            {t('btnServices')}
          </Link>
        </div>

        <div className="home-row">
          <Link href={`/${locale}/founders`} className="home-row-text-link">
            {t('foundersBlurb')}
          </Link>
          <Link href={`/${locale}/founders`} className="cta-btn cta-founders">
            {t('btnFounders')}
          </Link>
        </div>

        <div className="home-row">
          <Link href={`/${locale}/contact`} className="home-row-text-link">
            {t('contactBlurb')}
          </Link>
          <Link href={`/${locale}/contact`} className="cta-btn cta-contact">
            {t('btnContact')}
          </Link>
        </div>

        {isSksLocale && tCareers && (
          <div className="home-row">
            <Link href={`/${locale}/carrieres`} className="home-row-text-link">
              {tCareers('homeBlurb')}
            </Link>
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
