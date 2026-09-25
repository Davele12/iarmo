import { LeadForm } from '@/features/leads/lead-form';
import { leadDeliveryReady } from '@/integrations/leads/smtp';
import { SectionHeading } from './ui';

export function ContactSection() {
  return <section id="contacto" tabIndex={-1} data-section="Contacto" className="contact-section section">
    <div className="container diagnostic-layout">
      <div><SectionHeading title="Cuéntanos qué está frenando a tu empresa." description="Comparte el reto. Revisamos tu solicitud y acordamos contigo una reunión para entender por dónde empezar." />
        <ol className="diagnostic-steps"><li><span>1</span><p><strong>Nos cuentas tu situación.</strong>Un proceso, una necesidad o una oportunidad.</p></li><li><span>2</span><p><strong>Revisamos tu solicitud.</strong>El equipo se comunica contigo para ampliar el contexto.</p></li><li><span>3</span><p><strong>Acordamos una reunión.</strong>Definimos juntos el siguiente paso.</p></li></ol>
        <p className="small-note">El envío es una solicitud de contacto. No confirma automáticamente una cita ni una contratación.</p>
      </div>
      <LeadForm available={leadDeliveryReady()} />
    </div>
  </section>;
}
