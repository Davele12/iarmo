import { CaseCards } from '@/components/sections';
import { Breadcrumb, FinalCta, PageIntro } from '@/components/ui';
import { BreadcrumbSchema, pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Experiencia y casos de clientes', 'Conoce los clientes de IARMO y el estado de publicación de sus proyectos. Evidencia real, sin cifras ni testimonios no verificados.', '/casos');
export default function CasesPage() {
  return <><div className="container page-bottom-space"><Breadcrumb current="Casos" /><PageIntro eyebrow="Experiencia con contexto" title="Cada empresa tiene una historia distinta." description="Productos Deli Ricura y Grupo Empresarial Suga son clientes de IARMO. Estamos preparando los detalles de sus proyectos para compartir únicamente información confirmada." /><CaseCards /><section className="content-band"><h2>Lo que sí podemos compartir</h2><p>Una línea de trabajo confirmada es la mejora de la eficiencia en procesos de toma de decisiones comerciales mediante analítica de datos y reglas de negocio.</p><p>La atribución y los detalles de cada implementación están en validación. Por eso, las fichas no incluyen métricas, testimonios ni resultados individuales.</p></section></div><FinalCta /><BreadcrumbSchema items={[{ name: 'Casos', path: '/casos' }]} /></>;
}
