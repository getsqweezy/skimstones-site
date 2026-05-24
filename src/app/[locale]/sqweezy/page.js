import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import WhyChain from '@/components/WhyChain';
import { getTranslations } from 'next-intl/server';
import { replaceStylusBTChars } from '@/lib/stylusBT';

export default async function SqweezyPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sqweezy' });

  return (
    <div className="mobile-frame sqweezy-frame">
      <Header variant="sqweezy" />

      <main className="sqweezy-scroll">

        {/* ── HERO ───────────────────────────────────────── */}
        <section className="sqw-hero">
          <div className="sqw-badges-row">
            <span className="sqweezy-badge">{t('badgeABS')}</span>
            <span className="sqweezy-badge sqweezy-badge-ce">{t('badgeCE')}</span>
          </div>

          <h1 className="sqweezy-title">{replaceStylusBTChars(t('title'))}</h1>

          <div className="sqw-compat-box">
            <p>{t('compatText')}</p>
          </div>

          <div className="sqw-stat-cards">
            <div className="sqw-stat-card">
              <span className="sqw-stat-value">{t('stat1Value')}</span>
              <span className="sqw-stat-label">{t('stat1Label')}</span>
            </div>
            <div className="sqw-stat-card">
              <span className="sqw-stat-value">{t('stat2Value')}</span>
              <span className="sqw-stat-label">{t('stat2Label')}</span>
            </div>
            <div className="sqw-stat-card">
              <span className="sqw-stat-value">{t('stat3Value')}</span>
              <span className="sqw-stat-label">{t('stat3Label')}</span>
            </div>
          </div>

          <div className="product-images">
            <div className="product-img-card">
              <Image
                src="/images/pic-sqw-t.png"
                alt={t('home.product_img_standard_alt')}
                width={200}
                height={130}
                style={{ objectFit: 'contain', padding: '8px' }}
              />
              <div className="img-caption">{t('home.product_img_standard_caption')}</div>
            </div>
            <div className="product-img-card">
              <Image
                src="/images/gif-sqw-t.gif"
                alt={t('home.product_img_action_alt')}
                unoptimized
                width={200}
                height={130}
                style={{ objectFit: 'contain', padding: '8px' }}
              />
              <div className="img-caption">{t('home.product_img_action_caption')}</div>
            </div>
          </div>

          <Link href={`/${locale}/sqweezy/pre-order`} className="cta-preorder-link">
            {t('home.ctaPreorder')}
          </Link>
        </section>

        {/* ── WHY CHAIN ──────────────────────────────────── */}
        <h2 className="sqw-section-title">{t('home.whySectionTitle')}</h2>
        <WhyChain
          items={[
            {
              icon: '/icons/95pc-air.png',
              iconAlt: t('home.whyItem1IconAlt'),
              label: t('home.whyItem1Step'),
              title: t('home.whyItem1Title'),
              desc: t('home.whyItem1Desc'),
            },
            {
              icon: '/icons/home-recy-bin.png',
              iconAlt: t('home.whyItem2IconAlt'),
              label: t('home.whyItem2Step'),
              title: t('home.whyItem2Title'),
              desc: t('home.whyItem2Desc'),
              stat: t('home.whyItem2Stat'),
            },
            {
              icon: '/icons/street-recy_bin.png',
              iconAlt: t('home.whyItem3IconAlt'),
              label: t('home.whyItem3Step'),
              title: t('home.whyItem3Title'),
              desc: t('home.whyItem3Desc'),
            },
            {
              icon: '/icons/time-waste.png',
              iconAlt: t('home.whyItem4IconAlt'),
              label: t('home.whyItem4Step'),
              title: t('home.whyItem4Title'),
              desc: t('home.whyItem4Desc'),
              stat: t('home.whyItem4Stat'),
            },
            {
              icon: '/icons/wasted-money.png',
              iconAlt: t('home.whyItem5IconAlt'),
              label: t('home.whyItem5Step'),
              title: t('home.whyItem5Title'),
              desc: t('home.whyItem5Desc'),
              stat: t('home.whyItem5Stat'),
            },
          ]}
          conclusion={{
            text: t('home.whyConclusionText'),
            btnLabel: t('home.whyConclusionCta'),
            btnHref: `/${locale}/sqweezy/pre-order`,
          }}
          expandLabel={t('home.whyExpandLabel')}
          collapseLabel={t('home.whyCollapseLabel')}
        />

        {/* ── VIRTUES ────────────────────────────────────── */}
        <section className="sqw-virtues-section">
          <h2 className="sqw-section-title">{t('virtuesTitle')}</h2>
          <div className="sqw-virtues-grid">
            <div className="sqw-virtue-card">
              <span className="sqw-virtue-title">{t('virt1Title')}</span>
              <span className="sqw-virtue-desc">{t('virt1Desc')}</span>
            </div>
            <div className="sqw-virtue-card">
              <span className="sqw-virtue-title">{t('virt2Title')}</span>
              <span className="sqw-virtue-desc">{t('virt2Desc')}</span>
            </div>
            <div className="sqw-virtue-card">
              <span className="sqw-virtue-title">{t('virt3Title')}</span>
              <span className="sqw-virtue-desc">{t('virt3Desc')}</span>
            </div>
            <div className="sqw-virtue-card">
              <span className="sqw-virtue-title">{t('virt4Title')}</span>
              <span className="sqw-virtue-desc">{t('virt4Desc')}</span>
            </div>
            <div className="sqw-virtue-card sqw-virtue-full">
              <span className="sqw-virtue-title">{t('virt5Title')}</span>
              <span className="sqw-virtue-desc">{t('virt5Desc')}</span>
            </div>
          </div>
        </section>

        {/* ── MALTA ──────────────────────────────────────── */}
        <section className="sqw-malta-section">
          <h2 className="sqw-section-title">{t('maltaTitle')}</h2>
          <div className="sqw-malta-card">
            <p className="sqw-malta-flag">{t('maltaFlag')}</p>
            <p className="sqw-malta-subtitle">{t('maltaSubtitle')}</p>
            <div className="sqw-malta-stats">
              <span>{t('maltaStat1')}</span>
              <span>{t('maltaStat2')}</span>
              <span>{t('maltaStat3')}</span>
            </div>
            <a href="#" className="sqw-malta-link">{t('maltaLink')}</a>
          </div>
        </section>

        {/* ── PRICING ────────────────────────────────────── */}
        <section id="order" className="sqw-pricing-section">
          <h2 className="sqw-section-title">{t('pricingTitle')}</h2>
          <p className="sqw-pricing-label">SQWEEZY</p>
          <div className="sqw-pricing-prices">
            <span className="sqw-price-strike-lg">{t('priceStrike')}</span>
            <span className="sqw-price-launch-lg">{t('priceLaunch')}</span>
          </div>
          <Link href="#" className="sqw-reserve-btn">{t('reserveBtn')}</Link>
          <p className="sqw-price-note">{t('priceNote')}</p>
        </section>

      </main>

      <footer className="sqweezy-footer">
        <div className="sqweezy-footer-grid">
          <Link href="#order" className="footer-btn btn-order">{t('btnOrder')}</Link>
          <Link href="#" className="footer-btn btn-mysqweezy">{t('btnMySqweezy')}</Link>
          <Link href="#" className="footer-btn btn-pro">{t('btnPro')}</Link>
          <Link href="#" className="footer-btn btn-investors">{t('btnInvestors')}</Link>
        </div>
      </footer>
    </div>
  );
}
