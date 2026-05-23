import Header from '@/components/Header';
import { getTranslations } from 'next-intl/server';
import { replaceStylusBTChars } from '@/lib/stylusBT';

export default async function SqweezyPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sqweezy' });

  return (
    <div className="mobile-frame sqweezy-frame">
      <Header variant="sqweezy" />

      <div className="sqweezy-fixed-top">
        <div className="sqweezy-badge">{t('badge')}</div>
        <h1 className="sqweezy-title">{replaceStylusBTChars(t('title'))}</h1>
      </div>

      <main className="sqweezy-scroll">
        <p className="text-placeholder">{t('textPlaceholder')}</p>
      </main>

      <footer className="sqweezy-footer">
        <div className="sqweezy-footer-grid">
          <button className="footer-btn btn-order">{t('btnOrder')}</button>
          <button className="footer-btn btn-mysqweezy">{t('btnMySqweezy')}</button>
          <button className="footer-btn btn-pro">{t('btnPro')}</button>
          <button className="footer-btn btn-investors">{t('btnInvestors')}</button>
        </div>
      </footer>
    </div>
  );
}
