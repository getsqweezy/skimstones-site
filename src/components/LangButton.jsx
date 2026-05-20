'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { SKS_LOCALES, SQW_LOCALES, LOCALE_LABELS } from '@/lib/i18n/config';

export default function LangButton({ variant = 'skimstones' }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const availableLocales = variant === 'sqweezy' ? SQW_LOCALES : SKS_LOCALES;

  function switchLocale(newLocale) {
    const pathAfterLocale = pathname.slice(`/${locale}`.length) || '/';
    router.push(`/${newLocale}${pathAfterLocale}`);
    setOpen(false);
  }

  return (
    <div className="lang-wrapper">
      <button
        className="lang-btn"
        onClick={() => setOpen(!open)}
        aria-label="Language"
        aria-expanded={open}
      >
        <Image src="/langage-choice.png" alt="" width={28} height={28} />
        <span className="lang-code">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div className="lang-backdrop" onClick={() => setOpen(false)} />
          <div className="lang-dropdown">
            {availableLocales.map((l) => (
              <button
                key={l}
                className={`lang-option${l === locale ? ' lang-active' : ''}`}
                onClick={() => switchLocale(l)}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
