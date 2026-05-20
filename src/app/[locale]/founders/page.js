'use client';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const PIERRE = {
  name: 'Pierre-Emmanuel CREPIN',
  title: 'CEO',
  photo: '/pic-pec.jpg',
  education: [
    "Process Engineer, École des Mines de Douai (1992)",
    "Architect (1989)",
    "Bilingual FR, EN",
    "French nationality",
  ],
  expHeadline:
    '35 years of International experience in engineering, energy and industrial projects',
  expBullets: [
    'Senior roles as Engineering Lead, Consultant and CEO',
    '17 power plants delivered, representing 5 GW of installed capacity',
    '18 years of experience in waste recovery and circular economy projects',
  ],
  patentsHeadline: 'Inventor and patent holder – 4 registered patents',
  patents: [
    '1992: CONCRETE FIBER – Composite fiber solution replacing steel reinforcement in concrete structures',
    '1994: ISOPLANT – Centrifugal PET fiber technology – ANVAR Innovation Award Winner',
    '2000s – M3S INDUSTRIE – Real-time leak detection and precise localization system for hydraulic structures. To: €15 million/year; sold in 2024',
    '2017: SQWEEZY – Domestic compactor for plastic bottles and aluminum cans, designed to reduce waste volume at source',
  ],
};

const LENDA = {
  name: 'Lenda AIT KADDOUR',
  title: 'Executive director',
  photo: '/pic-lak.png',
  education: [
    "Engineer, Bordeaux Sciences Agro (1997)",
    "Advanced expertise in data, risk and spatial analysis:",
    "Valedictorian, Master's degree in Statistics Applied to Risk Management, IAE Montpellier II (2011)",
    "Graduate, Specialized Master's Degree SILAT (Geographic Information Systems), AgroParisTech (2012)",
    "Trilingual FR, EN, AR",
    "French and Moroccan nationality",
  ],
  expHeadline: '30 years of international consulting',
  expBullets: [
    'PMO, program management and project strategy, Change management for complex transformation programs',
    'Based in Morocco since 2014',
    'Strategic advisor to executives and management teams (10 years)',
    '8 years of missions in the energy and environmental sectors, including waste, circular economy and infrastructure-related projects',
    '3 years of operational management support within a high-end metal carpentry workshop, strengthening industrial, production and supply-chain understanding',
  ],
};

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
              <h4 className="modal-section-title">{t('educationTitle')}</h4>
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

  return (
    <div className="mobile-frame">
      <Header />
      <main className="page-main">
        <h1 className="page-headline">{t('headline')}</h1>

        <div className="founders-row">
          <FounderCard founder={PIERRE} />
          <FounderCard founder={LENDA} />
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
