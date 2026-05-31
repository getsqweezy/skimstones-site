'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

export default function WoilLightbox({ imgAlt, imgCaption }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      const lightboxEl = document.querySelector('.yarl__root');
      if (lightboxEl) {
        const handler = (e) => e.preventDefault();
        lightboxEl.addEventListener('contextmenu', handler);
        return () => lightboxEl.removeEventListener('contextmenu', handler);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [open]);

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
          draggable={false}
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: '/images/waste-oil.png' }]}
        plugins={[Zoom]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{
          maxZoomPixelRatio: 4,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: true,
        }}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.9)' },
        }}
      />
    </>
  );
}
