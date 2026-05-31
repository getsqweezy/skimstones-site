import Header from '@/components/Header';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';

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

const label = (color, extra = {}) => ({
  fontFamily: 'var(--font-sks-l2)',
  fontSize: 'var(--fs-ui)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color,
  ...extra,
});

const sublabel = {
  fontFamily: 'var(--font-sks-l2)',
  fontSize: 'var(--fs-body)',
  fontWeight: 700,
  color: 'var(--title-color)',
  lineHeight: 'calc(1.3 * 0.9)',
};

const body = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-caption)',
  fontWeight: 400,
  color: 'var(--text-color)',
  lineHeight: 1.5,
};

/* desc without color — inherits from .consulting-desc-link for hover */
const bodyDesc = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-caption)',
  fontWeight: 400,
  lineHeight: 1.5,
};

const sectionNoSep = {
  marginTop: 'calc(var(--space-l) * 0.5)',
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
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    title: tMeta('services.title'),
    description: tMeta('services.description'),
    locale,
    pathname: '/consulting-services',
  });
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

        <h1 className="page-headline" style={{ fontSize: 'var(--fs-subtitle)', textAlign: 'center' }}>
          {t('pageTitle')}
        </h1>

        {/* Intro + Posture + Piliers — grille 2 cols mobile / 4 cols desktop */}
        <div className="consulting-four-cols" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-m)',
          marginBottom: 'var(--space-l)',
        }}>

          {/* Intro 1 */}
          <div style={{ borderLeft: '3px solid var(--sks-bordeaux)', background: '#FBF5D3', padding: 'var(--space-m)' }}>
            <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--sks-bordeaux)', marginBottom: 'var(--space-s)' }}>
              {t('missionLabel')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)', lineHeight: 1.5 }}>
              {highlightTerms(t('intro1'), BOLD_INTRO1[locale])}
            </p>
          </div>

          {/* Intro 2 */}
          <div style={{ borderLeft: '3px solid var(--sks-bordeaux)', background: '#FBF5D3', padding: 'var(--space-m)' }}>
            <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--sks-bordeaux)', marginBottom: 'var(--space-s)' }}>
              {t('valueLabel')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)', lineHeight: 1.5 }}>
              {highlightTerms(t('intro2'), BOLD_INTRO2[locale])}
            </p>
          </div>

          {/* Posture */}
          <div style={{ borderLeft: '3px solid var(--sks-bordeaux)', background: '#FBF5D3', padding: 'var(--space-m)' }}>
            <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--sks-bordeaux)', marginBottom: 'var(--space-s)' }}>
              {t('posture.label')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--title-color)', marginBottom: 'var(--space-s)' }}>
              {t('posture.title')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)', lineHeight: 1.5 }}>
              {t('posture.desc')}
            </p>
          </div>

          {/* Piliers */}
          <div style={{ borderLeft: '3px solid var(--sks-bordeaux)', background: '#FBF5D3', padding: 'var(--space-m)' }}>
            <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--sks-bordeaux)', marginBottom: 'var(--space-s)' }}>
              {t('pillars.label')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', fontWeight: 700, color: 'var(--title-color)', marginBottom: 'var(--space-s)' }}>
              {t('pillars.title')}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)', lineHeight: 1.5 }}>
              {t('pillars.desc')}
            </p>
          </div>

        </div>

        {/* EXPERTISES */}
        <div style={{ ...sectionNoSep, marginTop: 'calc(var(--space-l) * 0.125)' }}>
          <span style={label('var(--sks-bordeaux)', {
            fontSize: 'calc(var(--fs-body) * 1.3)',
            textAlign: 'center',
            display: 'block',
          })}>
            {t('expertises.label')}
          </span>
          <p style={body}>{t('expertises.intro')}</p>
        </div>

        {/* 5 blocs expertise */}
        {expertiseBlocks.map(({ key, route }) => {
          const desc = t(`${key}.desc`);
          const parts = desc.split(/(?<=\.)\s+/);
          const first = parts[0];
          const rest = parts.slice(1).join(' ');
          return (
            <div key={key} style={sectionNoSep}>
              <Link
                href={route}
                className="consulting-bloc-link"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'color 0.15s' }}
              >
                <div style={labelRow}>
                  <span style={label('var(--sks-bordeaux)')}>{t(`${key}.label`)}</span>
                  <span className="consulting-cta">{t(`${key}.cta`)}</span>
                </div>
                <p style={sublabel}>{t(`${key}.sublabel`)}</p>
                <p style={bodyDesc}><strong>{first}</strong></p>
                {rest && <p style={{ ...bodyDesc, marginTop: 'var(--space-xs)' }}>{rest}</p>}
              </Link>
            </div>
          );
        })}

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
