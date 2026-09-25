'use client';

import { Arrow } from './icons';
import { HomeLink } from './home-link';
import { SectionHeading } from './ui';

type MethodStep = { title: string; text: string };

export function MethodRoadmap({ steps }: { steps: readonly MethodStep[] }) {
  return <section data-motion-section="method" className="method-section is-enhanced" id="metodologia" tabIndex={-1} data-section="Cómo trabajamos" data-nav="soluciones">
    <span id="como-trabajamos" className="anchor-alias" />
    <div className="container section method-roadmap">
      <div className="method-roadmap-intro">
        <div><SectionHeading light title="Del reto a una solución que puede evolucionar." /><p>Ordenamos el trabajo, hacemos visibles las decisiones y entregamos avances que tu equipo pueda validar.</p></div>
        <HomeLink href="/#diagnostico" className="text-link method-diagnostic-link">Define el siguiente paso<Arrow /></HomeLink>
      </div>
      <div className="method-roadmap-body">
        <p className="method-route-guide" aria-hidden="true">Recorre nuestro proceso<Arrow className="method-route-guide-arrow" /></p>
        <div className="method-steps">
          <div className="method-route" aria-hidden="true">
            <svg className="method-route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
              <path className="method-route-path-future" d="M8,2 L8,98" />
              <path className="method-route-path-active" d="M8,2 L8,98" />
              <circle className="method-route-dot-halo" cx="8" cy="2" r="9" />
              <circle className="method-route-dot" cx="8" cy="2" r="4" />
            </svg>
          </div>
          {steps.map((step, index) => <article className={`method-step ${index === 0 ? 'is-active' : 'is-next'}`} data-phase-index={index} data-phase-state={index === 0 ? 'active' : 'future'} aria-current={index === 0 ? 'step' : undefined} key={step.title}><span className="method-step-marker"><i aria-hidden="true" /><span>{index + 1}</span></span><div><h3>{step.title}</h3><p>{step.text}</p></div></article>)}
        </div>
      </div>
    </div>
  </section>;
}
