export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SKIMSTONES Smart Essentials',
    url: 'https://www.skimstones.com',
    logo: 'https://www.skimstones.com/images/logo-sks-baseline.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@skimstones.com',
      contactType: 'customer service',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ locale }) {
  const isFr = locale === 'fr';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'SQWEEZY',
    description: isFr
      ? 'Le compacteur malin qui change la vie à la maison. 100% ABS recyclé, certifié CE.'
      : 'The smart compactor that transforms everyday life. 100% recycled ABS, CE Certified.',
    brand: { '@type': 'Brand', name: 'SKIMSTONES' },
    image: 'https://www.skimstones.com/images/sqweezy-standard.webp',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: '30.00',
      availability: 'https://schema.org/PreOrder',
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
