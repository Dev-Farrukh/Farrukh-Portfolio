export function FaqJsonLd({ faqs }: { faqs: unknown[] }) {
  return <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs })}</script>;
}