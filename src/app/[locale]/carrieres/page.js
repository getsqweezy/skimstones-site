'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { SKS_LOCALES } from '@/lib/i18n/config';

export default function CarrieresPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('careers');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfModal, setPdfModal] = useState(null);

  useEffect(() => {
    if (!SKS_LOCALES.includes(locale)) {
      router.replace('/fr/carrieres');
      return;
    }
    async function fetchOffers() {
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase
        .from('job_offers')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });
      setOffers(data || []);
      setLoading(false);
    }
    fetchOffers();
  }, [locale, router]);

  function openPdf(offer) {
    const url = (locale === 'en' && offer.pdf_en) ? offer.pdf_en : offer.pdf_fr;
    const title = locale === 'en' ? (offer.title_en || offer.title_fr) : offer.title_fr;
    if (url) setPdfModal({ url, title });
  }

  const thStyle = {
    background: 'var(--sks-primary)',
    color: '#fff',
    fontFamily: 'var(--font-sks-l2)',
    fontSize: 'var(--fs-caption)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: 'var(--space-s) var(--space-m)',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  };

  const tdStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--fs-caption)',
    color: 'var(--text-color)',
    padding: 'var(--space-s) var(--space-m)',
    borderBottom: '1px solid rgba(25,40,79,0.08)',
  };

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">

        <h1 className="page-headline" style={{ textAlign: 'center' }}>
          {t('pageTitle')}
        </h1>

        <p style={{
          fontFamily: 'var(--font-sks-l2)',
          fontSize: 'var(--fs-body)',
          color: 'var(--text-color)',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          {t('pageSubtitle')}
        </p>

        <p style={{
          fontFamily: 'var(--font-sks-l1)',
          fontSize: 'var(--fs-subtitle)',
          fontWeight: 700,
          color: 'var(--title-color)',
        }}>
          {t('tableTitle')}
        </p>

        {!loading && offers.length === 0 && (
          <p style={{
            fontStyle: 'italic',
            textAlign: 'center',
            color: 'var(--text-color)',
            fontSize: 'var(--fs-caption)',
          }}>
            {t('noOffers')}
          </p>
        )}

        {!loading && offers.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={thStyle}>{t('colTitle')}</th>
                  <th style={thStyle}>{t('colDate')}</th>
                  <th style={thStyle}>{t('colLocation')}</th>
                  <th style={thStyle}>{t('colMode')}</th>
                  <th style={thStyle}>{t('colAction')}</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer, i) => (
                  <tr key={offer.id} style={{ background: i % 2 === 0 ? 'var(--sks-bg)' : '#FBF5D3' }}>
                    <td style={tdStyle}>
                      {locale === 'en' ? (offer.title_en || offer.title_fr) : offer.title_fr}
                    </td>
                    <td style={tdStyle}>{offer.start_date || '—'}</td>
                    <td style={tdStyle}>{offer.location || '—'}</td>
                    <td style={tdStyle}>{offer.mode || '—'}</td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => openPdf(offer)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--sks-bordeaux)',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--fs-caption)',
                          fontWeight: 700,
                          textDecoration: 'underline',
                          textUnderlineOffset: '2px',
                          padding: 0,
                        }}
                      >
                        {t('viewOffer')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Section candidature spontanée */}
        <div style={{
          borderTop: '2px solid var(--sks-mint)',
          paddingTop: 'var(--space-l)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-s)',
        }}>
          <p style={{
            fontFamily: 'var(--font-sks-l2)',
            fontSize: 'var(--fs-body)',
            fontWeight: 700,
            color: 'var(--title-color)',
          }}>
            {t('spontaneous')}
          </p>
          <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-color)' }}>
            {t('spontaneousDesc')}
          </p>
          <div>
            <a
              href={`mailto:${t('spontaneousEmail')}`}
              className="btn-sks"
              style={{
                background: 'var(--sks-mint)',
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'var(--space-s) var(--space-l)',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              {t('spontaneousBtn')}
            </a>
          </div>
        </div>

        {/* Bouton retour */}
        <div>
          <Link
            href={`/${locale}`}
            className="btn-sks"
            style={{
              background: 'var(--sks-bordeaux)',
              display: 'inline-flex',
              alignItems: 'center',
              padding: 'var(--space-s) var(--space-l)',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            ← {t('backBtn')}
          </Link>
        </div>

      </main>

      {/* PDF Lightbox Modal */}
      {pdfModal && (
        <div className="modal-overlay" onClick={() => setPdfModal(null)}>
          <div
            style={{
              background: '#fff',
              borderRadius: '3px',
              maxWidth: '90vw',
              width: '800px',
              maxHeight: '90svh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '4px 6px 20px rgba(0,0,0,0.30)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-sticky-header">
              <span className="modal-founder-name">{pdfModal.title}</span>
              <div style={{ display: 'flex', gap: 'var(--space-s)', alignItems: 'center' }}>
                <a
                  href={pdfModal.url}
                  download
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-caption)',
                    color: 'var(--sks-primary)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '2px',
                  }}
                >
                  ↓ PDF
                </a>
                <button className="modal-close" onClick={() => setPdfModal(null)}>✕</button>
              </div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <iframe
                src={pdfModal.url}
                style={{ width: '100%', height: '70vh', border: 'none' }}
                title={pdfModal.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
