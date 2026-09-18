import type { Metadata } from 'next';
import { site } from '@/config/site';

export function pageMetadata(title: string, description: string, path: string, noindex = false): Metadata {
  return {
    title: { absolute: `${title} | iarmo` }, description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | iarmo`, description, url: path, siteName: site.name, locale: site.locale, type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'iarmo — Tu empresa puede operar mejor.' }] },
    twitter: { card: 'summary_large_image', title: `${title} | iarmo`, description, images: ['/opengraph-image'] },
    robots: { index: !noindex && process.env.SITE_INDEXABLE === 'true', follow: true },
  };
}
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
export function BreadcrumbSchema({ items }: { items: { name: string; path: string }[] }) {
  return <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ name: 'Inicio', path: '/' }, ...items].map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: site.url + item.path })) }} />;
}
