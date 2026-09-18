import Link from 'next/link';
import { cases, method, plans, services } from '@/content/es/business';
import { Arrow, CapabilityIcon } from './icons';
import { Cta, SectionHeading } from './ui';

export function Capabilities() {
  return <section className="section container" id="capacidades"><SectionHeading eyebrow="Lo que podemos resolver" title="Un problema de negocio. La tecnología que necesita." description="Conectamos cinco capacidades para construir una solución que tenga sentido para tu empresa." /><div className="capability-list">{services.map((service, index) => <Link className="capability-row" href={`/soluciones#${service.id}`} key={service.id}><span className="row-number">0{index + 1}</span><span className="capability-icon"><CapabilityIcon index={index} /></span><h3>{service.title}</h3><p>{service.short}</p><Arrow diagonal /></Link>)}</div></section>;
}
export function Method() {
  return <section className="method-section" id="como-trabajamos"><div className="container section"><div className="method-heading"><SectionHeading light eyebrow="Cómo trabajamos" title="Primero entendemos. Después construimos." /><p>La mejor solución empieza con una buena conversación sobre tu negocio.</p></div><div className="method-grid">{method.map((step, index) => <article key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>;
}
export function CaseCards() {
  return <div className="case-grid">{cases.map((client, index) => <article className="case-card" key={client.slug}><div className={`case-art case-art-${index}`} aria-hidden="true"><div className="case-art-grid" /><span className="case-monogram">{index === 0 ? '01' : '02'}</span><span className="case-art-label">CLIENTE IARMO · {String(index + 1).padStart(2, '0')}</span></div><div className="case-content"><p className="eyebrow">Ficha en validación</p><h3>{client.name}</h3><p>Estamos preparando la historia del proyecto con información confirmada.</p><Link className="text-link" href={`/casos/${client.slug}`}>Ver estado del caso<Arrow diagonal /></Link></div></article>)}</div>;
}
export function Evidence() {
  return <section className="section container"><div className="split-heading"><SectionHeading eyebrow="Experiencia con empresas" title="Relaciones reales. Evidencia con contexto." /><Link className="text-link" href="/casos">Conoce los casos<Arrow /></Link></div><CaseCards /><p className="evidence-note">Una línea de trabajo confirmada: mejorar la eficiencia en la toma de decisiones comerciales mediante analítica de datos y reglas de negocio. Los detalles de cada proyecto están en validación.</p></section>;
}
export function PlanCards() {
  return <div className="plan-grid">{plans.map((plan, index) => <article className={`plan-card ${index === 1 ? 'plan-featured' : ''}`} key={plan.id}><span className="plan-level">{['CONTINUIDAD', 'MEJORA CONTINUA', 'ALIADO ESTRATÉGICO'][index]}</span><div className="plan-marker" aria-hidden="true">{[0, 1, 2].map(value => <i className={value <= index ? 'active' : ''} key={value} />)}</div><h3>{plan.name}</h3><p className="plan-audience">{plan.audience}</p><p>{plan.description}</p><ul>{plan.scope.map(item => <li key={item}>{item}</li>)}</ul><Cta href="/diagnostico" secondary>Solicitar diagnóstico</Cta></article>)}</div>;
}
export function PlansSection() {
  return <section className="plans-section"><div className="container section"><SectionHeading eyebrow="No tienes que hacerlo solo" title="Acompañamiento al ritmo de tu empresa." description="Desde una mejora puntual hasta un aliado que trabaja como parte de tu equipo. Definimos juntos el alcance." /><PlanCards /><div className="project-band"><div><h3>¿Tienes un proyecto concreto?</h3><p>Analizamos el reto y preparamos una propuesta específica.</p></div><Link className="text-link" href="/planes#proyectos">Proyectos personalizados<Arrow /></Link></div></div></section>;
}
