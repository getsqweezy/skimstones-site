'use client';
import { useState } from 'react';

/**
 * items: { title, short, long }[]
 * Each item is independently togglable — no auto-close of others.
 * Toggle via title button or short text click.
 */
export default function SKSAccordion({ items }) {
  const [openStates, setOpenStates] = useState(() => items.map(() => false));

  function toggle(i) {
    setOpenStates(prev => prev.map((v, j) => (j === i ? !v : v)));
  }

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openStates[i];
        return (
          <div key={i}>
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
