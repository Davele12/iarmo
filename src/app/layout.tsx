import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/motion.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AnalyticsObserver } from '@/components/analytics-observer';
import { JsonLd } from '@/lib/seo';
import { site } from '@/config/site';
import { inter, manrope } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `iarmo — ${site.tagline}`, template: '%s | iarmo' },
  description: site.description,
  robots: { index: process.env.SITE_INDEXABLE === 'true', follow: true },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-CO" className={`${inter.variable} ${manrope.variable}`}><body><a href="#contenido" className="skip-link">Saltar al contenido</a><Header /><main id="contenido">{children}</main><Footer /><AnalyticsObserver /><JsonLd data={{ '@context': 'https://schema.org', '@graph': [{ '@type': 'Organization', '@id': `${site.url}/#organization`, name: 'IARMO', slogan: site.tagline, url: site.url, description: site.description, logo: { '@type': 'ImageObject', url: `${site.url}/brand/iarmo-symbol.png`, width: 320, height: 320 } }, { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: 'iarmo', inLanguage: site.language, publisher: { '@id': `${site.url}/#organization` } }] }} /></body></html>;
}
