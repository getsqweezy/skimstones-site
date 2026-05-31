'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import LangButton from './LangButton';

const servicesSubmenu = [
  { href: '/consulting-services/spof', labelFr: 'Gestion des risques',        labelEn: 'Risk management'   },
  { href: '/consulting-services/wvc',  labelFr: 'Valorisation des déchets',   labelEn: 'Waste recovery'    },
  { href: '/consulting-services/woil', labelFr: 'Recyclage des huiles usagées', labelEn: 'Waste oil recovery' },
  { href: '/consulting-services/pm',   labelFr: 'Gestion de projets',         labelEn: 'Project management' },
];

export default function Header({ variant = 'skimstones' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesHover, setServicesHover] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isSqw = variant === 'sqweezy';

  function close() {
    setMenuOpen(false);
    setServicesOpen(false);
  }

  const isServicesActive = pathname.includes('/consulting-services');
  const isCareeresActive = pathname.includes('/carrieres');

  return (
    <header className="site-header">
      <button
        className="hamburger"
        onClick={() => { setMenuOpen(!menuOpen); setServicesOpen(false); }}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="desktop-nav">
        <Link href={`/${locale}`}>{t('home')}</Link>

        <div
          className="desktop-nav-item"
          onMouseEnter={() => setServicesHover(true)}
          onMouseLeave={() => setServicesHover(false)}
        >
          <Link
            href={`/${locale}/consulting-services`}
            className={isServicesActive ? 'active' : ''}
          >
            {t('services')}
          </Link>
          {servicesHover && (
            <div className="services-dropdown">
              {servicesSubmenu.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className="services-dropdown-item"
                >
                  {locale === 'fr' ? item.labelFr : item.labelEn}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href={`/${locale}/founders`}>{t('founders')}</Link>
        <Link href={`/${locale}/contact`}>{t('contact')}</Link>
        <Link
          href={`/${locale}/carrieres`}
          className={isCareeresActive ? 'active' : ''}
        >
          {locale === 'fr' ? 'RECRUTEMENT' : 'HIRING'}
        </Link>
      </nav>

      <div className="header-logo">
        <Link href={`/${locale}`}>
          <Image
            src={isSqw ? '/images/logo-sqweezy-long.png' : '/images/logo-sks-baseline.png'}
            alt={isSqw ? 'SQWEEZY' : 'SkimStones Smart Essentials'}
            width={isSqw ? 1454 : 942}
            height={isSqw ? 400 : 287}
            style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
            priority
          />
        </Link>
      </div>

      <LangButton variant={variant} />

      {menuOpen && (
        <nav className="mobile-nav" onClick={close}>

          <Link href={`/${locale}`}>{t('home')}</Link>
          <Link href={`/${locale}/sqweezy`}>{t('sqweezy')}</Link>

          {/* Services accordion — stopPropagation pour ne pas fermer le menu */}
          <div className="mobile-nav-services" onClick={(e) => e.stopPropagation()}>
            <button
              className="mobile-nav-services-btn"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>{t('services')}</span>
              <span className={`mobile-nav-arrow${servicesOpen ? ' open' : ''}`}>
                {servicesOpen ? '▾' : '▶'}
              </span>
            </button>
            <div className={`mobile-nav-submenu${servicesOpen ? ' open' : ''}`}>
              {servicesSubmenu.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={close}
                  className="mobile-nav-subitem"
                >
                  {locale === 'fr' ? item.labelFr : item.labelEn}
                </Link>
              ))}
            </div>
          </div>

          <Link href={`/${locale}/founders`}>{t('founders')}</Link>
          <Link href={`/${locale}/contact`}>{t('contact')}</Link>
          <Link href={`/${locale}/carrieres`} onClick={close}>
            {locale === 'fr' ? 'RECRUTEMENT' : 'HIRING'}
          </Link>

        </nav>
      )}
    </header>
  );
}
