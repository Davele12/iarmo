import { Breadcrumb, PageIntro } from '@/components/ui';
import { LeadForm } from '@/features/leads/lead-form';
import { leadDeliveryReady } from '@/integrations/leads/smtp';
import { BreadcrumbSchema, pageMetadata } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('Agenda un diagnóstico', 'Cuéntanos el principal reto de tu empresa. El equipo de IARMO se comunicará contigo para conocer tu situación y acordar una reunión.', '/diagnostico');
export default function DiagnosticPage() {
  return <div className="container"><Breadcrumb current="Diagnóstico" /><div className="diagnostic-layout"><aside><PageIntro eyebrow="La conversación empieza aquí" title="Cuéntanos qué está frenando a tu empresa." description="No necesitas un documento técnico ni tener la solución. Comparte el reto y busquemos por dónde empezar." /><ol className="diagnostic-steps"><li><span>1</span><p><strong>Nos cuentas tu situación.</strong>Un proceso, una necesidad o una oportunidad.</p></li><li><span>2</span><p><strong>Revisamos tu solicitud.</strong>El equipo se comunica contigo para ampliar el contexto.</p></li><li><span>3</span><p><strong>Acordamos una reunión.</strong>Definimos juntos el siguiente paso.</p></li></ol><p className="small-note">El formulario es una solicitud de contacto. No confirma una cita ni genera una contratación.</p></aside><LeadForm available={leadDeliveryReady()} /></div><BreadcrumbSchema items={[{ name: 'Diagnóstico', path: '/diagnostico' }]} /></div>;
}
