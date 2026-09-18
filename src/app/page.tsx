import { home, problems, faqs } from '@/content/es/business';
import { Cta, FinalCta, SectionHeading } from '@/components/ui';
import { OperationDiagram } from '@/components/operation-diagram';
import { Capabilities, Evidence, Method, PlansSection } from '@/components/sections';
import { Assessment } from '@/features/assessment/assessment';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Tecnología para empresas que quieren operar mejor', home.description, '/');
export default function Home() {
  return <>
    <section className="hero container"><div className="hero-copy"><p className="eyebrow"><span className="status-dot" />{home.eyebrow}</p><h1>{home.title}<br /><em>{home.emphasis}</em></h1><p className="hero-description">{home.description}</p><div className="hero-actions"><Cta /><a href="#como-trabajamos" className="text-link">Conoce cómo trabajamos<span aria-hidden="true">↘</span></a></div><p className="hero-note">{home.promise}</p></div><OperationDiagram /></section>
    <div className="sector-strip"><div className="container"><span>PARA EMPRESAS QUE MUEVEN EL DÍA A DÍA</span><p>Manufactura<span>·</span>Alimentos<span>·</span>Distribución<span>·</span>Comercio<span>·</span>Y tu empresa.</p></div></div>
    <section className="section container"><div className="problem-intro"><SectionHeading eyebrow="¿Te suena familiar?" title="El trabajo crece. Los reprocesos no deberían." /><p>A veces, el freno no es la falta de esfuerzo. Es la forma en que los procesos, la información y las herramientas trabajan juntos.</p></div><div className="problem-grid">{problems.map((problem, index) => <article className="problem-card" key={problem.title}><span className="problem-index">0{index + 1} /</span><h3>{problem.title}</h3><p>{problem.text}</p><span className="problem-tag">{problem.tag}<span aria-hidden="true">↗</span></span></article>)}</div></section>
    <Capabilities /><Method /><Evidence /><PlansSection />
    <section className="technology-section container"><p className="eyebrow">La herramienta sigue al propósito</p><h2>Elegimos la tecnología después<br />de entender el reto.</h2><div className="technology-list">{['Python', 'Power BI', 'Odoo', 'Microsoft 365', 'Google Workspace', 'n8n', 'PostgreSQL', 'OpenAI'].map(tool => <span key={tool}>{tool}</span>)}</div><p className="small-note">Herramientas de nuestro portafolio. Su mención no implica alianza ni certificación.</p></section>
    <Assessment />
    <section className="section container faq-section"><SectionHeading eyebrow="Antes de conversar" title="Lo que quizá te estás preguntando." /><div>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
    <FinalCta />
  </>;
}
