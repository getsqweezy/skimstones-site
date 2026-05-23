'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import LangButton from './LangButton';

export default function Header({ variant = 'skimstones' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('nav');

  const isSqw = variant === 'sqweezy';

  return (
    <header className="site-header">
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="desktop-nav">
        <Link href={`/${locale}`}>{t('home')}</Link>
        <Link href={`/${locale}/consulting-services`}>{t('services')}</Link>
        <Link href={`/${locale}/founders`}>{t('founders')}</Link>
        <Link href={`/${locale}/contact`}>{t('contact')}</Link>
      </nav>

      <div className="header-logo">
        <Link href={`/${locale}`}>
          <Image
            src={isSqw ? '/logo-sqweezy-long.png' : '/logo-sks-baseline.png'}
            alt={isSqw ? 'SQWEEZY' : 'SkimStones Smart Essentials'}
            width={140}
            height={48}
            style={{ objectFit: 'contain', height: '48px', width: 'auto' }}
            priority
          />
        </Link>
      </div>

      <LangButton variant={variant} />

      {menuOpen && (
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          <Link href={`/${locale}`}>{t('home')}</Link>
          <Link href={`/${locale}/sqweezy`}>{t('sqweezy')}</Link>
          <Link href={`/${locale}/consulting-services`}>{t('services')}</Link>
          <Link href={`/${locale}/founders`}>{t('founders')}</Link>
          <Link href={`/${locale}/contact`}>{t('contact')}</Link>
        </nav>
      )}
    </header>
  );
}
