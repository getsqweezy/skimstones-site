'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function WoilLightbox({ imgAlt, imgCaption }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer', position: 'relative', maxWidth: '100%', overflow: 'hidden' }}
      >
        <Image
          src="/images/waste-oil-light.webp"
          alt={imgAlt}
          width={400}
          height={300}
          style={{ width: '100%', height: 'auto', borderRadius: '6px', display: 'block' }}
          onContextMenu={(e) => e.preventDefault()}
        />
        <span style={{
          position: 'absolute',
          top: 8, right: 8,
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          fontSize: 'var(--fs-caption)',
          padding: '2px 8px',
          borderRadius: '4px',
        }}>
          {imgCaption}
        </span>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-m)',
            cursor: 'pointer',
          }}
        >
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute',
                top: -12, right: -12,
                background: 'var(--sks-bordeaux)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 28, height: 28,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >×</button>
            <Image
              src="/images/waste-oil.png"
              alt={imgAlt}
              width={1200}
              height={800}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
                borderRadius: '6px',
                display: 'block',
              }}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}
    </>
  );
}
