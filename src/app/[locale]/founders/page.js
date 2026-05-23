'use client';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

function FounderCard({ founder }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="founder-card">
      <button
        className="founder-photo-btn"
        onClick={() => setOpen(true)}
        aria-label={`Profile of ${founder.name}`}
      >
        <Image
          src={founder.photo}
          alt={founder.name}
          width={110}
          height={110}
          className="founder-photo"
        />
      </button>
      <button className="founder-name" onClick={() => setOpen(true)}>
        {founder.name}
      </button>
      <p className="founder-role">{founder.title}</p>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-sticky-header">
              <span className="modal-founder-name">{founder.name}</span>
              <span className="modal-founder-role">{founder.title}</span>
              <button
                className="modal-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <h4 className="modal-section-title">{founder.educationTitle}</h4>
              <ul className="modal-list">
                {founder.education.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <h4 className="modal-section-title">{founder.expHeadline}</h4>
              <ul className="modal-list">
                {founder.expBullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {founder.patentsHeadline && (
                <>
                  <h4 className="modal-section-title">{founder.patentsHeadline}</h4>
                  <ul className="modal-list">
                    {founder.patents.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FoundersPage() {
  const t = useTranslations('founders');

  const pierre = {
    name: 'Pierre-Emmanuel CREPIN',
    title: t('pierre.title'),
    photo: '/pic-pec.jpg',
    educationTitle: t('pierre.educationTitle'),
    education: [t('pierre.edu1'), t('pierre.edu2'), t('pierre.edu3'), t('pierre.edu4')],
    expHeadline: t('pierre.expHeadline'),
    expBullets: [t('pierre.exp1'), t('pierre.exp2'), t('pierre.exp3')],
    patentsHeadline: t('pierre.patentsHeadline'),
    patents: [t('pierre.patent1'), t('pierre.patent2'), t('pierre.patent3'), t('pierre.patent4')],
  };

  const lenda = {
    name: 'Lenda AIT KADDOUR',
    title: t('lenda.title'),
    photo: '/pic-lak.png',
    educationTitle: t('lenda.educationTitle'),
    education: [
      t('lenda.edu1'), t('lenda.edu2'), t('lenda.edu3'),
      t('lenda.edu4'), t('lenda.edu5'), t('lenda.edu6'),
    ],
    expHeadline: t('lenda.expHeadline'),
    expBullets: [
      t('lenda.exp1'), t('lenda.exp2'), t('lenda.exp3'),
      t('lenda.exp4'), t('lenda.exp5'),
    ],
    patentsHeadline: null,
    patents: null,
  };

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="page-headline">{t('headline')}</h1>

        <div className="founders-row">
          <FounderCard founder={pierre} />
          <FounderCard founder={lenda} />
        </div>

        <section className="dna-section">
          <h2 className="dna-title">{t('dnaTitle')}</h2>

          <div className="dna-item">
            <span className="dna-label">{t('mission')}</span>
            <p>{t('missionText')}</p>
          </div>

          <div className="dna-item">
            <span className="dna-label">{t('vision')}</span>
            <p>{t('visionText')}</p>
          </div>

          <div className="dna-item">
            <span className="dna-label">{t('values')}</span>
            <p>{t('valuesText')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
