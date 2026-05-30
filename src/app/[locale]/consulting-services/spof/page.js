import Header from '@/components/Header';
import Link from 'next/link';
import SKSAccordion from '@/components/SKSAccordion';
import { getTranslations } from 'next-intl/server';

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
  const t = await getTranslations({ locale, namespace: 'consulting' });
  return { title: t('spof.pageTitle') };
}

export default async function SpofPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });

  const acc1LongFR = (
    <>
      <p className="sks-acc-long">SKIMSTONES analyse <strong>toute la chaîne</strong> de continuité de service : <strong>unités de production</strong>, <strong>réseaux</strong> de <strong>chaleur</strong> ou de <strong>froid</strong>, interfaces de <strong>couplage</strong>, <strong>supervision</strong>, alimentation auxiliaire, refroidissement, air d'instrumentation, télécommunications, procédures et compétences opérateur.</p>
      <p className="sks-acc-long">L'objectif est d'<strong>identifier les vulnérabilités</strong> qui ne ressortent pas toujours dans les analyses classiques centrées équipement par équipement.</p>
    </>
  );

  const acc2LongFR = (
    <>
      <p className="sks-acc-long">Notre approche combine la compréhension des <strong>installations</strong> réelles, des <strong>flux</strong> et des <strong>contraintes</strong> d'exploitation avec une lecture <strong>transverse</strong> des <strong>dépendances</strong>, <strong>interfaces</strong> et <strong>redondances effectives</strong>.</p>
      <p className="sks-acc-long">Cette <strong>double lecture</strong> permet de <strong>révéler</strong> des <strong>fragilités invisibles</strong> : celles qui se situent entre les équipements, dans les chaînes fonctionnelles ou dans les conditions réelles de reprise après incident.</p>
    </>
  );

  const acc3LongFR = (
    <>
      <p className="sks-acc-long">La démarche SPOF avance par étapes :</p>
      <ol style={{ paddingLeft: 'var(--space-l)', lineHeight: 'calc(1.5 * 0.9)', display: 'flex', flexDirection: 'column', gap: 'calc(var(--space-xs) * 0.9)' }}>
        <li className="sks-acc-long"><strong>cadrage</strong> du périmètre et collecte documentaire ;</li>
        <li className="sks-acc-long"><strong>cartographie fonctionnelle</strong> des installations et interfaces ;</li>
        <li className="sks-acc-long">identification et <strong>hiérarchisation</strong> des SPOF ;</li>
        <li className="sks-acc-long">construction d'un <strong>plan d'actions chiffré</strong> ;</li>
        <li className="sks-acc-long">mise en place d'un <strong>registre vivant</strong> et d'un suivi dans le temps.</li>
      </ol>
      <p className="sks-acc-long">Le <strong>terrain reste central</strong> : les scénarios sont validés avec les équipes d'exploitation et d'ingénierie.</p>
    </>
  );

  const acc4LongFR = (
    <>
      <p className="sks-acc-long">La mission produit une <strong>base de décision</strong> directement exploitable :</p>
      <ul style={{ paddingLeft: 'var(--space-l)', lineHeight: 'calc(1.5 * 0.9)', display: 'flex', flexDirection: 'column', gap: 'calc(var(--space-xs) * 0.9)' }}>
        <li className="sks-acc-long">un <strong>registre SPOF</strong> structuré ;</li>
        <li className="sks-acc-long">des <strong>cartographies</strong> fonctionnelles et de dépendances ;</li>
        <li className="sks-acc-long">une <strong>hiérarchisation</strong> des priorités ;</li>
        <li className="sks-acc-long">un <strong>plan d'actions chiffré</strong> ;</li>
        <li className="sks-acc-long">un <strong>outil de pilotage actualisable</strong> après <strong>incidents</strong>, <strong>modifications</strong> ou <strong>revues</strong> périodiques.</li>
      </ul>
      <p className="sks-acc-long">L'enjeu n'est pas seulement de détecter des vulnérabilités, mais de <strong>transformer</strong> un <strong>risque technique diffus</strong> en <strong>décisions claires</strong>, <strong>actionnables</strong> et <strong>pilotables</strong>.</p>
    </>
  );

  const accItems = [
    { title: t('spof.acc1Title'), short: t('spof.acc1Short'), long: locale === 'fr' ? acc1LongFR : t('spof.acc1Long') },
    { title: t('spof.acc2Title'), short: t('spof.acc2Short'), long: locale === 'fr' ? acc2LongFR : t('spof.acc2Long') },
    { title: t('spof.acc3Title'), short: t('spof.acc3Short'), long: locale === 'fr' ? acc3LongFR : t('spof.acc3Long') },
    { title: t('spof.acc4Title'), short: t('spof.acc4Short'), long: locale === 'fr' ? acc4LongFR : t('spof.acc4Long') },
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
