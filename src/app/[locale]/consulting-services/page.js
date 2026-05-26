import Header from '@/components/Header';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

function highlightTerms(text, terms) {
  if (!terms?.length) return text;
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  return text.split(regex).map((part, i) =>
    sorted.some(s => s.toLowerCase() === part.toLowerCase())
      ? <strong key={i}>{part}</strong>
      : part
  );
}

const BOLD_INTRO1 = {
  fr: ['industriels', 'collectivités', 'opérateurs', 'investisseurs', 'robustes', 'pilotables', 'finançables'],
  en: ['industrials', 'local authorities', 'operators', 'investors', 'robust', 'manageable', 'fundable'],
};

const BOLD_INTRO2 = {
  fr: ['systèmes critiques', 'déchets difficiles', 'chaînes de valeur fragmentées', 'technologies émergentes', 'modèles économiques à construire', 'enjeux', 'complexes'],
  en: ['critical systems', 'difficult waste streams', 'fragmented value chains', 'emerging technologies', 'business models yet to be built', 'stakes', 'complex'],
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: tMeta('services.title'),
    description: t('headline'),
  };
}

export default async function ConsultingServicesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const labelStyle = (color = 'var(--sks-bordeaux)', fontSize = 'var(--fs-ui)') => ({
    fontFamily: 'var(--font-sks-l2)',
    color,
    fontSize,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: 700,
  });

  const ctaLinkStyle = {
    color: 'var(--sks-bordeaux)',
    fontWeight: 700,
    textDecoration: 'none',
    fontSize: 'var(--fs-ui)',
    flexShrink: 0,
  };

  const sublabelStyle = {
    fontFamily: 'var(--font-sks-l2)',
    color: 'var(--title-color)',
    fontWeight: 700,
    fontSize: 'var(--fs-body)',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-s)',
  };

  const sectionStyle = {
    borderTop: '1px solid rgba(25,40,79,0.12)',
    paddingTop: 'var(--space-m)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-xs)',
  };

  const expertiseBlocks = [
    { key: 'spof',     route: `/${locale}/consulting-services/spof` },
    { key: 'wvc',      route: `/${locale}/consulting-services/wvc` },
    { key: 'woil',     route: `/${locale}/consulting-services/woil` },
    { key: 'pm',       route: `/${locale}/consulting-services/pm` },
    { key: 'sqweezy',  route: `/${locale}/sqweezy` },
  ];

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="page-headline">{t('pageTitle')}</h1>

        <p>{highlightTerms(t('intro1'), BOLD_INTRO1[locale])}</p>
        <p>{highlightTerms(t('intro2'), BOLD_INTRO2[locale])}</p>

        {/* POSTURE */}
        <div style={sectionStyle}>
          <span style={labelStyle()}>{t('posture.label')}</span>
          <p><strong>{t('posture.title')}</strong></p>
          <p>{t('posture.desc')}</p>
        </div>

        {/* PILLARS */}
        <div style={sectionStyle}>
          <span style={labelStyle()}>{t('pillars.label')}</span>
          <p><strong>{t('pillars.title')}</strong></p>
          <p>{t('pillars.desc')}</p>
        </div>

        {/* STAGE-GATE */}
        <div style={sectionStyle}>
          <div style={rowStyle}>
            <span style={labelStyle('var(--title-color)')}>{t('stagegate.label')}</span>
            <Link href={`/${locale}/consulting-services/sg`} style={ctaLinkStyle}>
              {t('stagegate.cta')}
            </Link>
          </div>
          <p><strong>{t('stagegate.title')}</strong></p>
          <p>{t('stagegate.desc')}</p>
        </div>

        {/* EXPERTISES — separator */}
        <div style={{ ...sectionStyle, borderTopWidth: '2px', borderTopColor: 'var(--sks-mint)' }}>
          <span style={labelStyle('var(--sks-mint)', 'var(--fs-body)')}>{t('expertises.label')}</span>
          <p>{t('expertises.intro')}</p>
        </div>

        {/* 5 blocs expertise */}
        {expertiseBlocks.map(({ key, route }) => (
          <div key={key} style={sectionStyle}>
            <div style={rowStyle}>
              <span style={labelStyle()}>{t(`${key}.label`)}</span>
              <Link href={route} style={ctaLinkStyle}>{t(`${key}.cta`)}</Link>
            </div>
            <p style={sublabelStyle}>{t(`${key}.sublabel`)}</p>
            <p>{t(`${key}.desc`)}</p>
          </div>
        ))}

        {/* Bouton contact */}
        <Link
          href={`/${locale}/contact`}
          className="btn-sks cta-contact"
          style={{ padding: 'var(--space-m) var(--space-l)', alignSelf: 'center', marginTop: 'var(--space-m)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {tHome('btnContact')}
        </Link>
      </main>
    </div>
  );
}
