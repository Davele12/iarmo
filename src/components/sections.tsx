import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { cases, clients, method, plans, services } from '@/content/es/business';
import { Arrow, CapabilityIcon } from './icons';
import { Cta, SectionHeading } from './ui';
import { MethodRoadmap } from './method-roadmap';
import { InfiniteMarquee } from './infinite-marquee';
import { HeroBackdrop } from './hero-backdrop';

export function Capabilities({ homeBackground = false }: { homeBackground?: boolean }) {
  return <section className={homeBackground ? "solutions-section has-backdrop" : "solutions-section"} id="soluciones" tabIndex={-1} data-section="Soluciones">{homeBackground && <HeroBackdrop variant="transition" />}<div className="section container solutions-content"><span id="capacidades" className="anchor-alias" /><SectionHeading title="Un problema de negocio. La tecnología que necesita." description="Conectamos cinco capacidades para construir una solución que tenga sentido para tu empresa." /><div className="capability-list">{services.map((service, index) => <details className="solution-item" id={service.id} key={service.id}><summary className="capability-row"><span className="row-number">0{index + 1}</span><span className="capability-icon"><CapabilityIcon index={index} /></span><h3>{service.title}</h3><p>{service.short}</p><span className="solution-toggle" aria-hidden="true">+</span></summary><div className="solution-body"><p><strong>El reto.</strong> {service.problem}</p><p><strong>Cómo te ayudamos.</strong> {service.action}</p><p><strong>Lo que buscamos.</strong> {service.outcome}</p><div className="tool-chips" aria-label="Herramientas posibles">{service.tools.map(tool => <span key={tool}>{tool}</span>)}</div><Cta interest={service.id} secondary /></div></details>)}</div></div></section>;
}
export function Method() {
  return <MethodRoadmap steps={method} />;
}
function CaseVisual({ client }: { client: (typeof cases)[number] }) {
  const nodes = client.visualType === 'opportunity'
    ? ['Información', 'API', 'Agente IA', 'Alerta']
    : ['Comercial', 'Producción', 'Datos', 'Atención'];
  return <div className={`case-study-visual case-study-visual-${client.visualType}`}>
    <div className={`case-art case-art-${client.image.fit}`}><Image src={client.image.src} alt={client.image.alt} fill sizes="(max-width: 960px) 100vw, 560px" className="case-image" /></div>
    <div className="case-flow" aria-hidden="true"><span className="case-flow-line" />{nodes.map((node, index) => <span className="case-flow-node" key={node} style={{ '--case-index': index } as CSSProperties}><i />{node}</span>)}</div>
    <p className="case-visual-caption">{client.visualType === 'opportunity' ? 'Información → integración → oportunidad' : 'Áreas del negocio → una capa tecnológica común'}</p>
  </div>;
}
export function CaseCards() {
  return <div className="case-study-list">{cases.map(client => <article className={`case-study case-study-${client.visualType}`} key={client.slug}>
    <CaseVisual client={client} />
    <div className="case-study-copy"><p className="eyebrow">{client.name} · {client.sector}</p><p className="case-status">Experiencia compartida · ficha en validación</p><h3>{client.headline}</h3><p className="case-summary">{client.summary}</p>
      <div className="case-fact"><span>El reto</span><p>{client.challenge}</p></div><div className="case-fact"><span>Qué hicimos</span><ul>{client.solutions.map(solution => <li key={solution}>{solution}</li>)}</ul></div><div className="case-fact case-impact"><span>Resultado cualitativo</span><p>{client.impact}</p></div>
      <div className="case-tags" aria-label="Capacidades aplicadas">{client.capabilities.map(capability => <span key={capability}>{capability}</span>)}</div><p className="case-technologies"><span>Tecnologías</span>{client.technologies.join(' · ')}</p><Link className="text-link" href={`/casos/${client.slug}`}>Conocer el caso<Arrow diagonal /></Link>
    </div>
  </article>)}</div>;
}
export function ClientsSection() {
  return <section className="section clients-section" id="clientes" tabIndex={-1} data-section="Clientes"><span id="casos" className="anchor-alias" /><div className="container"><SectionHeading title="Clientes que respaldan nuestro trabajo." /><InfiniteMarquee label="Clientes confirmados" className="client-logo-marquee">{clients.map(client => <div className={`client-logo client-logo-${client.id}`} key={client.id}><Image src={client.image.src} alt={client.image.alt} fill sizes="(max-width: 600px) 180px, 220px" className="client-logo-image" /></div>)}</InfiniteMarquee></div></section>;
}
export function PlanCards() {
  return <div className="plan-grid">{plans.map((plan, index) => <article className={`plan-card ${index === 1 ? 'plan-featured' : ''}`} key={plan.id}><span className="plan-level">{['CONTINUIDAD', 'MEJORA CONTINUA', 'ALIADO ESTRATÉGICO'][index]}</span><div className="plan-marker" aria-hidden="true">{[0, 1, 2].map(value => <i className={value <= index ? 'active' : ''} key={value} />)}</div><h3>{plan.name}</h3><p className="plan-audience">{plan.audience}</p><p>{plan.description}</p><ul>{plan.scope.map(item => <li key={item}>{item}</li>)}</ul><Cta secondary /></article>)}</div>;
}
export function PlansSection() {
  return <section className="plans-section" id="planes" tabIndex={-1} data-section="Planes"><div className="container section"><SectionHeading title="Acompañamiento al ritmo de tu empresa." description="Desde una mejora puntual hasta un aliado que trabaja como parte de tu equipo. Definimos juntos el alcance." /><PlanCards /><div className="project-band" id="proyectos"><div><h3>Proyecto personalizado</h3><p>Una integración, un tablero o una aplicación. Definimos alcance, entregables y cómo validarlos contigo antes de preparar la propuesta.</p></div><Cta secondary /></div><p className="small-note">Dedicación, entregables y tiempos se acuerdan según tu contexto.</p></div></section>;
}
