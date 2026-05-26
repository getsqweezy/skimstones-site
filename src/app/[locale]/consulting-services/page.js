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
      ? <strong key={i} style={{ fontWeight: 700, color: 'var(--title-color)' }}>{part}</strong>
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

/* ─── Styles réutilisables ──────────────────────────────── */

const label = (color) => ({
  fontFamily: 'var(--font-sks-l2)',
  fontSize: 'var(--fs-ui)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color,
});

const sectionTitle = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-body)',
  fontWeight: 700,
  color: 'var(--title-color)',
};

const sublabel = {
  fontFamily: 'var(--font-sks-l2)',
  fontSize: 'var(--fs-body)',
  fontWeight: 700,
  color: 'var(--title-color)',
};

const body = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-caption)',
  fontWeight: 400,
  color: 'var(--text-color)',
  lineHeight: 1.5,
};

const ctaLink = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-caption)',
  fontWeight: 700,
  color: 'var(--sks-bordeaux)',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

const section = {
  borderTop: '1px solid rgba(25, 40, 79, 0.08)',
  paddingTop: 'var(--space-l)',
  marginTop: 'var(--space-l)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-s)',
};

const labelRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--space-s)',
};

/* ─── Page ──────────────────────────────────────────────── */

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

  const expertiseBlocks = [
    { key: 'spof',    route: `/${locale}/consulting-services/spof` },
    { key: 'wvc',     route: `/${locale}/consulting-services/wvc` },
    { key: 'woil',    route: `/${locale}/consulting-services/woil` },
    { key: 'pm',      route: `/${locale}/consulting-services/pm` },
    { key: 'sqweezy', route: `/${locale}/sqweezy` },
  ];

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">

        {/* Titre h1 */}
        <h1 className="page-headline">{t('pageTitle')}</h1>

        {/* Intro 1 */}
        <p style={body}>
          {highlightTerms(t('intro1'), BOLD_INTRO1[locale])}
        </p>

        {/* Intro 2 */}
        <p style={body}>
          {highlightTerms(t('intro2'), BOLD_INTRO2[locale])}
        </p>

        {/* POSTURE */}
        <div style={section}>
          <span style={label('var(--sks-bordeaux)')}>{t('posture.label')}</span>
          <p style={sectionTitle}>{t('posture.title')}</p>
          <p style={body}>{t('posture.desc')}</p>
        </div>

        {/* PILLARS */}
        <div style={section}>
          <span style={label('var(--sks-bordeaux)')}>{t('pillars.label')}</span>
          <p style={sectionTitle}>{t('pillars.title')}</p>
          <p style={body}>{t('pillars.desc')}</p>
        </div>

        {/* STAGE-GATE */}
        <div style={section}>
          <div style={labelRow}>
            <span style={label('var(--title-color)')}>{t('stagegate.label')}</span>
            <Link href={`/${locale}/consulting-services/sg`} style={ctaLink}>
              {t('stagegate.cta')}
            </Link>
          </div>
          <p style={sectionTitle}>{t('stagegate.title')}</p>
          <p style={body}>{t('stagegate.desc')}</p>
        </div>

        {/* EXPERTISES — séparateur fort */}
        <div style={{ ...section, borderTopWidth: '2px', borderTopColor: 'var(--sks-mint)' }}>
          <span style={label('var(--sks-mint)')}>{t('expertises.label')}</span>
          <p style={body}>{t('expertises.intro')}</p>
        </div>

        {/* 5 blocs expertise */}
        {expertiseBlocks.map(({ key, route }) => (
          <div key={key} style={section}>
            <div style={labelRow}>
              <span style={label('var(--sks-mid)')}>{t(`${key}.label`)}</span>
              <Link href={route} style={ctaLink}>{t(`${key}.cta`)}</Link>
            </div>
            <p style={sublabel}>{t(`${key}.sublabel`)}</p>
            <p style={body}>{t(`${key}.desc`)}</p>
          </div>
        ))}

        {/* Bouton contact */}
        <Link
          href={`/${locale}/contact`}
          className="btn-sks cta-contact"
          style={{
            padding: 'var(--space-m) var(--space-l)',
            alignSelf: 'center',
            marginTop: 'var(--space-xl)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {tHome('btnContact')}
        </Link>

      </main>
    </div>
  );
}
