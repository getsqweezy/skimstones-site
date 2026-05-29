'use client';
import { useState } from 'react';

/**
 * items: { title, short, long }[]
 * openLabel / closeLabel: optional translated strings (defaults FR)
 * Each item is independently togglable — no auto-close of others.
 */
export default function SKSAccordion({ items, openLabel = 'Ouvrir', closeLabel = 'Refermer' }) {
  const [openStates, setOpenStates] = useState(() => items.map(() => false));

  function toggle(i) {
    setOpenStates(prev => prev.map((v, j) => (j === i ? !v : v)));
  }

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openStates[i];
        return (
          <div
            key={i}
            style={{
              borderTop: '1px solid rgba(25,40,79,0.08)',
              paddingTop: 'var(--space-s)',
              marginTop: 'var(--space-s)',
            }}
          >
            {/* Titre + triangle — cliquables */}
            <button
              className="sks-acc-toggle"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
            >
              <span className="sks-acc-title">{item.title}</span>
              <span className={`sks-acc-arrow${isOpen ? ' open' : ''}`}>▼</span>
            </button>

            {/* Texte court — toujours visible, cliquable */}
            <p className="sks-acc-short" onClick={() => toggle(i)}>
              {item.short}
            </p>

            {/* Zone dépliable */}
            <div className={`sks-acc-body${isOpen ? ' open' : ''}`}>
              <div style={{ paddingTop: 'var(--space-s)', display: 'flex', flexDirection: 'column', gap: 'var(--space-s)' }}>
                {item.long.split('\n\n').map((block, j) => (
                  <p key={j} className="sks-acc-long">{block}</p>
                ))}
              </div>
              <button className="sks-acc-btn" onClick={() => toggle(i)}>
                {closeLabel}
              </button>
            </div>

            {/* Bouton OUVRIR — visible seulement quand fermé */}
            {!isOpen && (
              <button className="sks-acc-btn" onClick={() => toggle(i)}>
                {openLabel}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
