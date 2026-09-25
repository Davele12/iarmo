import { faqs, home, technologyTools } from '@/content/es/business';
import { Cta, FinalCta, SectionHeading } from '@/components/ui';
import { OperationDiagram } from '@/components/operation-diagram';
import { Capabilities, ClientsSection, Method, PlansSection } from '@/components/sections';
import { Assessment } from '@/features/assessment/assessment';
import { ContactSection } from '@/components/contact-section';
import { HomeMotion } from '@/components/home-motion';
import { InfiniteMarquee } from '@/components/infinite-marquee';
import { HeroBackdrop } from '@/components/hero-backdrop';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Automatización, datos, software e IA para empresas', 'Ayudamos a empresas a automatizar procesos, integrar información y desarrollar soluciones de datos, software e inteligencia artificial. Agenda un diagnóstico con iarmo.', '/');
export const dynamic = 'force-dynamic';
export default function Home() {
  return <div className="home-story"><HomeMotion />
    <section className="hero" id="inicio" tabIndex={-1} data-section="Inicio"><HeroBackdrop /><div className="container hero-layout"><div className="hero-copy"><h1 data-motion-level="primary">{home.title}<br /><em>{home.emphasis}</em></h1><p className="hero-description" data-motion-level="secondary">{home.description}</p><div className="hero-actions" data-motion-level="micro"><Cta /><a href="#metodologia" className="text-link">Conoce cómo trabajamos<span aria-hidden="true">↘</span></a></div><p className="hero-note" data-motion-level="secondary">{home.promise}</p></div><OperationDiagram /></div></section>
    <Capabilities homeBackground /><Method /><Assessment /><ClientsSection /><PlansSection />
    <section className="technology-section container" id="tecnologias" tabIndex={-1} data-section="Tecnologías" data-nav="planes"><h2>Elegimos la tecnología después<br />de entender el reto.</h2><InfiniteMarquee label="Herramientas que manejamos" className="technology-marquee" reverse>{technologyTools.map(tool => <span className="technology-tool" key={tool}>{tool}</span>)}</InfiniteMarquee><p className="small-note">Herramientas de nuestro portafolio. Su mención no implica alianza ni certificación.</p></section>
    <section className="section container" id="nosotros" tabIndex={-1} data-section="Nosotros"><SectionHeading title="Entendemos la tecnología. Hablamos de negocios." /><div className="about-story"><div className="about-statement"><p>El punto de partida:<br /><em>entender tu negocio.</em></p></div><div className="prose"><h3>Una evolución con propósito.</h3><p>IARMO nace como evolución de DIARMO para ayudar a pequeñas y medianas empresas a operar mejor: procesos más ágiles, información organizada y herramientas conectadas.</p><p>Acordamos prioridades, explicamos decisiones y definimos contigo cómo validar cada solución. Consideramos la adopción y la capacidad del equipo desde el inicio.</p><a className="text-link" href="#metodologia">Así trabajamos contigo<span aria-hidden="true">↗</span></a></div></div></section>
    <section className="section container faq-section" data-section="Preguntas frecuentes" data-nav="nosotros"><SectionHeading title="Lo que quizá te estás preguntando." /><div>{faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></section>
    <FinalCta /><ContactSection />
  </div>;
}
