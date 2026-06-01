import Header from '@/components/Header';
import Link from 'next/link';
import SKSAccordion from '@/components/SKSAccordion';
import { getTranslations } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo/metadata';

/* ─── helper : bold selected terms ──────────────────── */
function highlight(text, terms) {
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

const HERO1_BOLD = {
  fr: ['centrales', 'réseaux thermiques', 'infrastructures critiques', 'chaînes fonctionnelles complexes', 'production', 'distribution', 'clients critiques', 'continuité de service'],
  en: ['power plants', 'thermal networks', 'critical infrastructures', 'complex functional chains', 'production', 'distribution', 'critical customers', 'service continuity'],
};
const HERO2_BOLD = {
  fr: ['identifie', 'hiérarchise', 'sécurise'],
  en: ['identifies', 'prioritises', 'secures'],
};
const POS_BOLD = {
  fr: ['interfaces', 'systèmes supports', 'dépendances fonctionnelles', 'modes dégradés'],
  en: ['interfaces', 'support systems', 'functional dependencies', 'degraded modes'],
};

/* ─── Styles ─────────────────────────────────────────── */
const heroTitle = {
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-title)',
  color: 'var(--title-color)',
  textAlign: 'center',
  fontWeight: 700,
};
const heroSubtitle = {
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-subtitle)',
  color: 'var(--title-color)',
  textAlign: 'center',
  fontWeight: 700,
  lineHeight: 'calc(1.3 * 0.8)',
};
const bodyText = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-caption)',
  color: 'var(--text-color)',
  lineHeight: 1.5,
};
const sectionHeading = {
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-subtitle)',
  fontWeight: 700,
  color: 'var(--title-color)',
  textAlign: 'center',
  lineHeight: 'calc(1.3 * 0.8)',
};
const modalitiesTitle = {
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-subtitle)',
  color: 'var(--title-color)',
  textAlign: 'center',
  fontWeight: 700,
};
const ctaTitle = {
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-subtitle)',
  color: 'var(--title-color)',
  textAlign: 'center',
  fontWeight: 700,
  fontStyle: 'italic',
  lineHeight: 'calc(1.3 * 0.8)',
};
const cardTitle = {
  fontFamily: 'var(--font-sks-l2)',
  fontSize: 'var(--fs-caption)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--sks-bordeaux)',
  lineHeight: 'calc(1.3 * 0.9)',
  marginBottom: 'var(--space-xs)',
  textAlign: 'center',
};
const cardBody = {
  fontFamily: 'var(--font-body)',
  fontSize: 'calc(var(--fs-caption) * 1.2)',
  color: 'var(--text-color)',
  lineHeight: 1.5,
};

/* ─── Page ───────────────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({
    title: tMeta('spof.title'),
    description: tMeta('spof.description'),
    locale,
    pathname: '/consulting-services/spof',
  });
}

export default async function SpofPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });

  const acc1Long = (
    <>
      <p className="sks-acc-long">
        {t('spof.acc1Intro')}
        {' '}<strong>{t('spof.acc1Chain')}</strong>
        {t('spof.acc1ChainRest')}
      </p>
      <p className="sks-acc-long">
        {t('spof.acc1Concl')}
        {' '}<strong>{t('spof.acc1ConclKey')}</strong>
        {t('spof.acc1ConclRest')}
      </p>
    </>
  );

  const acc2Long = (
    <>
      <p className="sks-acc-long">
        {t('spof.acc2Intro')}
        {' '}<strong>{t('spof.acc2Key1')}</strong>
        {t('spof.acc2Rest1')}
        {' '}<strong>{t('spof.acc2Key2')}</strong>
        {', '}
        <strong>{t('spof.acc2Key3')}</strong>
        {' '}{t('spof.acc2Rest2')}
      </p>
      <p className="sks-acc-long">
        {t('spof.acc2Concl')}
        {' '}<strong>{t('spof.acc2ConclKey')}</strong>
        {t('spof.acc2ConclRest')}
      </p>
    </>
  );

  const acc3Long = (
    <>
      <p className="sks-acc-long">{t('spof.acc3Intro')}</p>
      <ol style={{ paddingLeft: 'var(--space-l)', lineHeight: 'calc(1.5 * 0.9)', display: 'flex', flexDirection: 'column', gap: 'calc(var(--space-xs) * 0.9)' }}>
        <li className="sks-acc-long"><strong>{t('spof.acc3Step1Key')}</strong>{t('spof.acc3Step1Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc3Step2Key')}</strong>{t('spof.acc3Step2Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc3Step3Key')}</strong>{t('spof.acc3Step3Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc3Step4Key')}</strong>{t('spof.acc3Step4Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc3Step5Key')}</strong>{t('spof.acc3Step5Rest')}</li>
      </ol>
      <p className="sks-acc-long"><strong>{t('spof.acc3ConclKey')}</strong>{t('spof.acc3ConclRest')}</p>
    </>
  );

  const acc4Long = (
    <>
      <p className="sks-acc-long">{t('spof.acc4Intro')}<strong>{t('spof.acc4IntroKey')}</strong>{t('spof.acc4IntroRest')}</p>
      <ul style={{ paddingLeft: 'var(--space-l)', lineHeight: 'calc(1.5 * 0.9)', display: 'flex', flexDirection: 'column', gap: 'calc(var(--space-xs) * 0.9)' }}>
        <li className="sks-acc-long"><strong>{t('spof.acc4Item1Key')}</strong>{t('spof.acc4Item1Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc4Item2Key')}</strong>{t('spof.acc4Item2Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc4Item3Key')}</strong>{t('spof.acc4Item3Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc4Item4Key')}</strong>{t('spof.acc4Item4Rest')}</li>
        <li className="sks-acc-long"><strong>{t('spof.acc4Item5Key')}</strong>{t('spof.acc4Item5Rest')}</li>
      </ul>
      <p className="sks-acc-long">{t('spof.acc4Concl1')}<strong>{t('spof.acc4Concl1Key')}</strong>{t('spof.acc4Concl2')}<strong>{t('spof.acc4Concl2Key')}</strong>{t('spof.acc4Concl3')}</p>
    </>
  );

  const accItems = [
    { title: t('spof.acc1Title'), short: t('spof.acc1Short'), long: acc1Long },
    { title: t('spof.acc2Title'), short: t('spof.acc2Short'), long: acc2Long },
    { title: t('spof.acc3Title'), short: t('spof.acc3Short'), long: acc3Long },
    { title: t('spof.acc4Title'), short: t('spof.acc4Short'), long: acc4Long },
  ];

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">

        {/* ── Zone 1 : Hero ────────────────────────────── */}
        <h1 style={heroTitle}>{t('spof.pageTitle')}</h1>

        <p style={heroSubtitle}>{t('spof.pageSubtitle')}</p>

        <p style={bodyText}>
          {highlight(t('spof.hero1'), HERO1_BOLD[locale])}
        </p>

        <p style={bodyText}>
          {highlight(t('spof.hero2'), HERO2_BOLD[locale])}
        </p>

        {/* Bouton hero aligné à droite */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href={`/${locale}/contact?situation=spof`} className="consulting-cta">
            {t('spof.heroCta')}
          </Link>
        </div>

        {/* ── Zone 2 : Positionnement ──────────────────── */}
        <p style={sectionHeading}>{t('spof.positioning')}</p>

        <p style={bodyText}>
          {highlight(t('spof.positioningDesc'), POS_BOLD[locale])}
        </p>

        {/* ── Zone 3 : Accordéons ──────────────────────── */}
        <SKSAccordion items={accItems} />

        {/* ── Zone 4 : Modalités d'engagement ─────────── */}
        <p style={modalitiesTitle}>{t('spof.modalitiesTitle')}</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-m)',
        }}>
          {[
            { title: t('spof.mod1Title'), desc: t('spof.mod1Desc') },
            { title: t('spof.mod2Title'), desc: t('spof.mod2Desc') },
            { title: t('spof.mod3Title'), desc: t('spof.mod3Desc') },
            { title: t('spof.mod4Title'), desc: t('spof.mod4Desc') },
          ].map(({ title, desc }) => (
            <div key={title} style={{
              background: '#FBF5D3',
              border: '1px solid rgba(25,40,79,0.12)',
              borderRadius: '3px',
              padding: 'var(--space-m)',
              boxShadow: '1px 2px 6px rgba(0,0,0,0.06)',
            }}>
              <p style={cardTitle}>{title}</p>
              <p style={cardBody}>{desc}</p>
            </div>
          ))}
        </div>

        {/* ── Zone 5 : CTA final + Retour ──────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-m)', alignItems: 'center', textAlign: 'center' }}>
          <p style={ctaTitle}>{t('spof.ctaTitle')}</p>
          <p style={bodyText}>{t('spof.ctaDesc')}</p>
          <div style={{
            display: 'flex',
            gap: 'var(--space-m)',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: 'var(--space-l)',
          }}>
            <Link
              href={`/${locale}/consulting-services`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--space-s) var(--space-l)',
                background: 'var(--sks-bordeaux)',
                color: '#fff',
                borderRadius: '3px',
                fontFamily: 'var(--font-sks-l1)',
                fontSize: 'var(--fs-ui)',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '2px 3px 6px rgba(0,0,0,0.25)',
              }}
            >
              ← {t('spof.backBtn')}
            </Link>
            <Link
              href={`/${locale}/contact?situation=spof`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--space-s) var(--space-l)',
                background: 'var(--sks-primary)',
                color: '#fff',
                borderRadius: '3px',
                fontFamily: 'var(--font-sks-l1)',
                fontSize: 'var(--fs-ui)',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '2px 3px 6px rgba(0,0,0,0.25)',
              }}
            >
              {t('spof.ctaBtn')}
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
