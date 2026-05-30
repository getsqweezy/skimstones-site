import Header from '@/components/Header';
import Link from 'next/link';
import WoilLightbox from '@/components/WoilLightbox';
import SKSAccordion from '@/components/SKSAccordion';
import { getTranslations } from 'next-intl/server';

/* ─── Styles ─────────────────────────────────────────── */
const heroTitle = {
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-title)',
  color: 'var(--title-color)',
  textAlign: 'center',
  fontWeight: 700,
  lineHeight: 'calc(1.3 * 0.9)',
};
const heroSubtitle = {
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-subtitle)',
  fontWeight: 700,
  color: 'var(--title-color)',
  textAlign: 'center',
  lineHeight: 'calc(1.3 * 0.8)',
};
const sksLabel = {
  fontFamily: 'var(--font-sks-l2)',
  fontSize: 'var(--fs-caption)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--sks-bordeaux)',
};
const bodyText = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-caption)',
  color: 'var(--text-color)',
  lineHeight: 1.5,
};
const bodyLg = {
  fontFamily: 'var(--font-body)',
  fontSize: 'calc(var(--fs-caption) * 1.2)',
  color: 'var(--text-color)',
  lineHeight: 1.5,
};

const cardBg = 'var(--sks-header-bg)';

const pillBtn = (bg) => ({
  display: 'inline-block',
  background: bg,
  color: '#fff',
  fontFamily: 'var(--font-sks-l1)',
  fontSize: 'var(--fs-caption)',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: 'var(--space-xs) var(--space-m)',
  borderRadius: '50px',
  marginTop: 'var(--space-s)',
});

/* ─── Page ───────────────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });
  return { title: t('woil.pageTitle') };
}

export default async function WoilPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'consulting' });

  /* ── Shorts (version résumée visible à l'état fermé) ── */
  const acc1Short = (
    <div>
      <p style={{ fontFamily: 'var(--font-sks-l1)', fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: 'var(--title-color)', margin: '0 0 var(--space-xs)' }}>
        {t('woil.techTitle')}
      </p>
      <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--title-color)', margin: 0 }}>
        {t('woil.techSubtitle')}
      </p>
    </div>
  );

  const acc2Short = (
    <div>
      <p style={{ textAlign: 'left', fontFamily: 'var(--font-sks-l1)', fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: 'var(--title-color)', margin: '0 0 var(--space-xs)' }}>
        {t('woil.productsTitle')}
      </p>
      <p style={{ textAlign: 'left', fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--title-color)', margin: '0 0 var(--space-xs)' }}>
        {t('woil.productsSubtitle')}
      </p>
      <p style={{ textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)', fontStyle: 'italic', margin: 0 }}>
        {t('woil.productsNote')}
      </p>
    </div>
  );

  const acc3Short = (
    <div>
      <p style={{ textAlign: 'left', fontFamily: 'var(--font-sks-l1)', fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: 'var(--title-color)', margin: '0 0 var(--space-xs)' }}>
        {t('woil.perfTitle')}
      </p>
      <p style={{ textAlign: 'left', fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--title-color)', margin: '0 0 var(--space-xs)' }}>
        {t('woil.perfSubtitle')}
      </p>
      <p style={{ textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-caption)', color: 'var(--text-color)', lineHeight: 1.5, margin: 0 }}>
        {t('woil.perfNote')}
      </p>
    </div>
  );

  const acc4Short = (
    <div>
      <p style={{ fontFamily: 'var(--font-sks-l1)', fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: 'var(--title-color)', margin: '0 0 var(--space-xs)' }}>
        {t('woil.roleTitle')}
      </p>
      <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--title-color)', margin: '0 0 var(--space-xs)' }}>
        {t('woil.roleSubtitle')}
      </p>
      <p style={{ ...bodyLg, margin: 0 }}>
        {t('woil.roleDesc')}
      </p>
    </div>
  );

  /* ── Accordion 1 : Notre Technologie ── */
  const acc1Long = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-m)' }}>
      {/* 3 cartes — colonne sur mobile, ligne sur desktop */}
      <div className="woil-tech-cards" style={{ gap: 'var(--space-m)', position: 'relative' }}>
        <div className="woil-tech-line" />
        {[
          { num: t('woil.card1Num'), title: t('woil.card1Title'), desc: t('woil.card1Desc'), btn: t('woil.card1Btn'), btnColor: 'var(--sks-mid)' },
          { num: t('woil.card2Num'), title: t('woil.card2Title'), desc: t('woil.card2Desc'), btn: t('woil.card2Btn'), btnColor: 'var(--sks-mint)' },
          { num: t('woil.card3Num'), title: t('woil.card3Title'), desc: t('woil.card3Desc'), btn: t('woil.card3Btn'), btnColor: 'var(--sks-gold)' },
        ].map((card) => (
          <div key={card.num} style={{
            background: cardBg,
            border: '1px solid rgba(25,40,79,0.12)',
            borderRadius: '3px',
            padding: 'var(--space-m)',
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
            textAlign: 'center',
            alignItems: 'center',
          }}>
            <p style={{ fontFamily: 'var(--font-sks-l1)', fontSize: 'calc(var(--fs-title) * 2)', color: 'var(--sks-bordeaux)', margin: 0, lineHeight: 1 }}>
              {card.num}
            </p>
            <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-caption)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--title-color)', margin: 0 }}>
              {card.title}
            </p>
            <p className="woil-tech-card-desc" style={{ ...bodyLg, margin: 0 }}>{card.desc}</p>
            <span style={pillBtn(card.btnColor)}>{card.btn}</span>
          </div>
        ))}
      </div>

      {/* Avantage clé */}
      <div style={{
        borderLeft: '3px solid var(--title-color)',
        background: '#FBF5D3',
        padding: 'var(--space-s) var(--space-m)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
      }}>
        <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--title-color)', margin: 0 }}>
          {t('woil.advantageTitle')}
        </p>
        <p style={{ ...bodyLg, margin: 0 }}>{t('woil.advantageDesc')}</p>
      </div>
    </div>
  );

  /* ── Accordion 2 : Produits issus du traitement ── */
  const acc2Long = (
    <div className="woil-product-cards" style={{ gap: 'var(--space-m)' }}>
      {[
          { label: t('woil.prod1Label'), title: t('woil.prod1Title'), value: t('woil.prod1Value'), desc: t('woil.prod1Desc'), color: 'var(--sks-primary)' },
          { label: t('woil.prod2Label'), title: t('woil.prod2Title'), value: t('woil.prod2Value'), desc: t('woil.prod2Desc'), color: 'var(--sks-bordeaux)' },
          { label: t('woil.prod3Label'), title: t('woil.prod3Title'), value: t('woil.prod3Value'), desc: t('woil.prod3Desc'), color: 'var(--sks-mint)' },
        ].map((card) => (
          <div key={card.label} style={{
            background: cardBg,
            border: '1px solid rgba(25,40,79,0.12)',
            borderRadius: '3px',
            padding: 'var(--space-m)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
            textAlign: 'center',
            alignItems: 'center',
          }}>
            <span style={{ ...pillBtn(card.color), marginTop: 0 }}>{card.label}</span>
            <p style={{ fontFamily: 'var(--font-sks-l1)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--sks-mid)', margin: 0 }}>
              {card.title}
            </p>
            <p style={{ fontFamily: 'var(--font-sks-l1)', fontSize: 'var(--fs-title)', fontWeight: 700, color: card.color, margin: 0, lineHeight: 1 }}>
              {card.value}
            </p>
            <p className="woil-product-card-desc" style={{ ...bodyLg, margin: 0 }}>{card.desc}</p>
          </div>
        ))}
    </div>
  );

  /* ── Accordion 3 : Performances & chiffres clés ── */
  const acc3Long = (
    <div className="woil-stat-cards" style={{ gap: 'var(--space-m)' }}>
      {[
        { value: t('woil.stat1Value'), desc: t('woil.stat1Desc'), color: 'var(--sks-primary)' },
        { value: t('woil.stat2Value'), desc: t('woil.stat2Desc'), color: 'var(--sks-mid)' },
        { value: t('woil.stat3Value'), desc: t('woil.stat3Desc'), color: 'var(--sks-bordeaux)' },
        { value: t('woil.stat4Value'), desc: t('woil.stat4Desc'), color: 'var(--sks-mint)' },
      ].map((stat) => (
        <div key={stat.value + stat.color} style={{
          background: cardBg,
          border: '1px solid rgba(25,40,79,0.12)',
          borderRadius: '3px',
          padding: 'var(--space-m)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xs)',
          textAlign: 'center',
          alignItems: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-sks-l1)', fontSize: 'var(--fs-subtitle)', fontWeight: 700, color: stat.color, margin: 0, lineHeight: 1 }}>
            {stat.value}
          </p>
          <p style={{ ...bodyLg, margin: 0 }}>{stat.desc}</p>
        </div>
      ))}
    </div>
  );

  /* ── Accordion 4 : Notre Rôle ── */
  const acc4Long = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-m)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-m)' }}>
        {[
          { title: t('woil.role1Title'), desc: t('woil.role1Desc') },
          { title: t('woil.role2Title'), desc: t('woil.role2Desc') },
          { title: t('woil.role3Title'), desc: t('woil.role3Desc') },
        ].map((role) => (
          <div key={role.title} style={{
            borderLeft: '3px solid var(--sks-bordeaux)',
            background: '#FBF5D3',
            padding: 'var(--space-s) var(--space-m)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-xs)',
          }}>
            <p style={{ fontFamily: 'var(--font-sks-l2)', fontSize: 'var(--fs-body)', fontWeight: 700, color: 'var(--sks-bordeaux)', margin: 0 }}>
              {role.title}
            </p>
            <p style={{ ...bodyLg, margin: 0 }}>{role.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const accordionItems = [
    { title: t('woil.acc1Label'), short: acc1Short, long: acc1Long },
    { title: t('woil.acc2Label'), short: acc2Short, long: acc2Long },
    { title: t('woil.acc3Label'), short: acc3Short, long: acc3Long },
    { title: t('woil.acc4Label'), short: acc4Short, long: acc4Long },
  ];

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main" style={{ overflow: 'hidden' }}>

        {/* ── Zone 0 : En-tête ─────────────────────────── */}
        <h1 style={heroTitle}>{t('woil.pageTitle')}</h1>

        <p style={heroSubtitle}>{t('woil.pageSubtitle')}</p>

        <p style={{ ...bodyText, textAlign: 'center' }}>{t('woil.intro')}</p>

        {/* ── Zone 1 : Image cliquable / lightbox ──────── */}
        <WoilLightbox
          imgAlt={t('woil.imgAlt')}
          imgCaption={t('woil.imgCaption')}
        />

        {/* ── Zones 2/4/5/6 : Accordéons ──────────────── */}
        <SKSAccordion items={accordionItems} />

        {/* ── Zone 7 : Citation ────────────────────────── */}
        <blockquote style={{
          fontFamily: 'var(--font-sks-l1)',
          fontStyle: 'italic',
          fontSize: 'var(--fs-body)',
          color: 'var(--title-color)',
          textAlign: 'center',
          borderLeft: 'none',
          padding: 'var(--space-l) 0',
          lineHeight: 1.5,
          margin: 0,
        }}>
          <p style={{ margin: 0 }}>{t('woil.quote')}</p>
          <footer style={{
            fontFamily: 'var(--font-sks-l2)',
            fontSize: 'var(--fs-caption)',
            fontStyle: 'normal',
            color: 'var(--sks-bordeaux)',
            marginTop: 'var(--space-s)',
          }}>
            {t('woil.quoteAuthor')}
          </footer>
        </blockquote>

        {/* ── Zone 8 : CTA final ───────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-s)', alignItems: 'center', textAlign: 'center' }}>
          <p style={bodyText}>{t('woil.ctaText')}</p>
          <p style={bodyText}>{t('woil.ctaSubtext')}</p>
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
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '2px 3px 6px rgba(0,0,0,0.25)',
              }}
            >
              ← {t('woil.backBtn')}
            </Link>
            <Link
              href={`/${locale}/contact?situation=wvc`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--space-s) var(--space-l)',
                background: 'var(--sks-primary)',
                color: '#fff',
                borderRadius: '3px',
                fontFamily: 'var(--font-sks-l1)',
                fontSize: 'var(--fs-ui)',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '2px 3px 6px rgba(0,0,0,0.25)',
              }}
            >
              {t('woil.ctaBtn')}
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
