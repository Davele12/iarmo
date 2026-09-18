import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnalyticsObserver } from '@/components/analytics-observer';
import { JsonLd } from '@/lib/seo';
import { site } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'iarmo — Tecnología para operar mejor', template: '%s | iarmo' },
  description: site.description,
  robots: { index: process.env.SITE_INDEXABLE === 'true', follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-CO"><body><a href="#contenido" className="skip-link">Saltar al contenido</a><Header /><main id="contenido">{children}</main><Footer /><AnalyticsObserver /><JsonLd data={{ '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', '@id': `${site.url}/#organization`, name: 'IARMO', url: site.url, description: site.description }, { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: 'iarmo', inLanguage: site.language, publisher: { '@id': `${site.url}/#organization` } }] }} /></body></html>;
}
