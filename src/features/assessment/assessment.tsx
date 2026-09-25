'use client';
import { useRef, useState } from 'react';
import { questions, scoreAssessment } from './scoring';
import { assessmentTransfer } from './transfer';
import { track } from '@/integrations/analytics';
import { Cta } from '@/components/ui';
import { Arrow } from '@/components/icons';

export function Assessment() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [complete, setComplete] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusHeading = () => setTimeout(() => heading.current?.focus(), 0);
  const result = complete ? scoreAssessment(answers) : null;
  function next() {
    if (answers[step] === undefined) return;
    if (step === questions.length - 1) { setComplete(true); assessmentTransfer.save(answers); track('assessment_complete'); }
    else setStep(step + 1);
    focusHeading();
  }
  return <section className="assessment-section" id="diagnostico" tabIndex={-1} data-section="Autodiagnóstico"><span id="autodiagnostico" className="anchor-alias" /><div className="container assessment-layout"><div className="assessment-intro"><h2>Ya viste cómo podemos ayudar.<br />Ahora mira dónde empezar.</h2><p>Ocho preguntas para identificar dónde puede operar mejor tu empresa.</p><span className="assessment-label">Sin registro · A tu ritmo</span><p className="small-note">Es una orientación inicial. No reemplaza un diagnóstico con el equipo.</p></div><div className="assessment-panel">
    {!started ? <div className="assessment-welcome"><span className="assessment-glyph" aria-hidden="true">↗</span><h3>Convierte la intuición en un punto de partida.</h3><p>Revisa procesos, información y herramientas. Al terminar, encontrarás una orientación para conversar con IARMO.</p><button className="button button-primary" onClick={() => { setStarted(true); track('assessment_start'); focusHeading(); }}>Iniciar autodiagnóstico<Arrow /></button><p className="small-note">Tus respuestas se quedan en esta pestaña. Sólo se envían si decides adjuntarlas al solicitar contacto.</p><noscript>Activa JavaScript para responder el autodiagnóstico.</noscript></div>
    : result ? <div className="assessment-result"><h3 ref={heading} tabIndex={-1}>{result.title}</h3><p>{result.description}</p>{result.opportunities.length > 0 && <ul>{result.opportunities.map(item => <li key={item}>{item}</li>)}</ul>}<h4>Hablemos sobre estas oportunidades.</h4><Cta interest={result.area}>Agenda un diagnóstico</Cta><button className="text-button" onClick={() => { setAnswers([]); setStep(0); setComplete(false); assessmentTransfer.clear(); focusHeading(); }}>Volver a responder</button></div>
    : <div className="assessment-question"><div className="question-progress"><span>Pregunta {step + 1} de {questions.length}</span><span>{String(step + 1).padStart(2, '0')} / 08</span></div><progress max={questions.length} value={step + 1} aria-label={`Pregunta ${step + 1} de ${questions.length}`} /><h3 ref={heading} tabIndex={-1} id="question-heading">{questions[step].title}</h3><fieldset aria-labelledby="question-heading"><legend className="sr-only">Selecciona una respuesta</legend>{questions[step].options.map((option, index) => <label className={`answer-option ${answers[step] === index ? 'selected' : ''}`} key={`${step}-${index}`}><input type="radio" name={`question-${step}`} value={index} checked={answers[step] === index} onChange={() => { const nextAnswers = [...answers]; nextAnswers[step] = index; setAnswers(nextAnswers); }} /><span>{option}</span></label>)}</fieldset><div className="question-actions"><button className="text-button" disabled={step === 0} onClick={() => { setStep(step - 1); focusHeading(); }}>Anterior</button><button className="button button-primary" disabled={answers[step] === undefined} onClick={next}>{step === 7 ? 'Ver orientación' : 'Siguiente'}<Arrow /></button></div></div>}
  </div></div></section>;
}
