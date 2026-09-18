import { notFound } from 'next/navigation';
import { cases } from '@/content/es/business';
import { Breadcrumb, FinalCta, PageIntro } from '@/components/ui';
import { BreadcrumbSchema, pageMetadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return cases.map(client => ({ slug: client.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = cases.find(item => item.slug === slug);
  if (!client) return { title: 'Caso no encontrado', robots: { index: false } };
  return pageMetadata(client.name, `Ficha de ${client.name}. Información del proyecto pendiente de validación.`, `/casos/${slug}`, client.status === 'pending');
}
export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = cases.find(item => item.slug === slug);
  if (!client) notFound();
  return <><div className="container page-bottom-space"><Breadcrumb current={client.name} parent={{ label: 'Casos', href: '/casos' }} /><PageIntro eyebrow="Cliente IARMO" title={client.name} description="Una historia que estamos preparando con el cuidado que merece la información de nuestros clientes." /><div className="pending-notice"><strong>Ficha pendiente de validación.</strong><p>El vínculo como cliente está confirmado. Los apartados siguientes se completarán con evidencia revisada antes de comunicar alcance o resultados.</p></div><div className="case-sections">{client.sections.map(section => <article key={section.title}><h2>{section.title}</h2><p>{section.text}</p></article>)}</div></div><FinalCta /><BreadcrumbSchema items={[{ name: 'Casos', path: '/casos' }, { name: client.name, path: `/casos/${client.slug}` }]} /></>;
}
