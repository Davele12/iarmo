import { CaseCards } from '@/components/sections';
import { Breadcrumb, FinalCta, PageIntro } from '@/components/ui';
import { BreadcrumbSchema, pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Experiencia y casos de clientes', 'Conoce los clientes de IARMO y el estado de publicación de sus proyectos. Evidencia real, sin cifras ni testimonios no verificados.', '/casos', true);
export default function CasesPage() {
  return <><div className="container page-bottom-space"><Breadcrumb current="Casos" /><PageIntro eyebrow="Clientes y casos" title="Tecnología aplicada a problemas reales." description="Dos formas de trabajar: una solución especializada para una oportunidad concreta y un partner tecnológico que acompaña la evolución de toda la operación." /><CaseCards /><section className="content-band"><h2>Información cualitativa en validación</h2><p>Los casos resumen las capacidades compartidas por el equipo. La autorización editorial final, el alcance de cada implementación y cualquier evidencia cuantitativa siguen en validación.</p></section></div><FinalCta /><BreadcrumbSchema items={[{ name: 'Casos', path: '/casos' }]} /></>;
}
