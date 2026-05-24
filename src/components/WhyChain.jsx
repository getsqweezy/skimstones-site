'use client';
import Image from 'next/image';
import { useState } from 'react';

function WhyItem({ item }) {
  return (
    <div className="why-item">
      <div className="why-spine">
        <Image
          src={item.icon}
          alt={item.iconAlt}
          width={40}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="why-content">
        <div className="why-step">{item.label}</div>
        <h3 className="why-title">{item.title}</h3>
        <p className="why-desc">{item.desc}</p>
        {item.stat && <span className="why-stat">{item.stat}</span>}
      </div>
    </div>
  );
}

export default function WhyChain({ items, expandLabel, collapseLabel }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <section className="why-chain">
      <div className="why-item-clickable" onClick={toggle}>
        <WhyItem item={items[0]} />
      </div>

      <button
        className="why-expand-btn"
        type="button"
        onClick={toggle}
      >
        {open ? collapseLabel : expandLabel}
        <span className={`expand-arrow${open ? ' rotated' : ''}`}>▼</span>
      </button>

      <div className={`why-hidden${open ? ' open' : ''}`}>
        {items.slice(1).map((item, i) => (
          <WhyItem key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
