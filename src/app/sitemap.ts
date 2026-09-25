import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { cases } from '@/content/es/business';
export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.SITE_INDEXABLE !== 'true') return [];
  return ['/', '/soluciones', '/planes', '/nosotros', '/diagnostico', ...cases.filter(client => client.status === 'verified').map(client => `/casos/${client.slug}`)].map(path => ({ url: site.url + path, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : .7 }));
}
