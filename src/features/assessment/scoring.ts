export const questions = [
  { id: 'manual', title: '¿Cuánto trabajo del equipo consiste en copiar, digitar o mover información?', options: ['Gran parte del día', 'Algunas tareas frecuentes', 'Muy poco; el flujo está resuelto'], opportunity: 'Automatizar tareas repetitivas', area: 'automatizacion' },
  { id: 'sheets', title: '¿Qué papel tienen las hojas de cálculo en los procesos críticos?', options: ['Sostienen casi todo y son difíciles de controlar', 'Son útiles, pero duplicamos versiones', 'Tienen un uso acotado y controlado'], opportunity: 'Dar trazabilidad a procesos críticos', area: 'software' },
  { id: 'information', title: '¿Qué tan fácil es encontrar información confiable de la operación?', options: ['Está dispersa y depende de preguntar a alguien', 'Se encuentra, pero requiere consolidarla', 'Está organizada y disponible'], opportunity: 'Organizar las fuentes de información', area: 'datos' },
  { id: 'integration', title: '¿Cómo se conectan ventas, inventario y las demás herramientas?', options: ['A mano, copiando información', 'Algunas están conectadas', 'Comparten la información necesaria'], opportunity: 'Conectar sistemas y evitar doble digitación', area: 'automatizacion' },
  { id: 'reports', title: '¿Cuándo están listos los reportes para tomar decisiones?', options: ['Llegan tarde o cuesta mucho prepararlos', 'A tiempo, con esfuerzo manual', 'Están disponibles cuando los necesitamos'], opportunity: 'Simplificar la preparación de reportes', area: 'datos' },
  { id: 'decisions', title: '¿Cómo dan seguimiento a los indicadores del negocio?', options: ['No hay indicadores claros', 'Los revisamos ocasionalmente', 'Se revisan y se usan para decidir'], opportunity: 'Definir indicadores que orienten decisiones', area: 'datos' },
  { id: 'ai', title: '¿Cómo evalúan el uso de inteligencia artificial?', options: ['Sin criterios claros para elegir o controlar su uso', 'Estamos explorando tareas concretas', 'Evaluamos utilidad, riesgos y revisión humana'], opportunity: 'Evaluar IA con un objetivo y controles claros', area: 'ia' },
  { id: 'tools', title: '¿Las herramientas internas acompañan el crecimiento de la empresa?', options: ['El equipo resuelve sus límites con trabajo manual', 'Cubren parte del proceso', 'Se ajustan al proceso y el equipo sabe usarlas'], opportunity: 'Alinear herramientas, procesos y adopción', area: 'transformacion' },
] as const;

export type AssessmentResult = {
  version: '1';
  score: number;
  level: 'ordenar' | 'conectar' | 'evolucionar';
  title: string;
  description: string;
  opportunities: string[];
  area: string;
};

export function validAnswers(value: unknown): value is number[] {
  return Array.isArray(value) && value.length === questions.length && value.every(v => Number.isInteger(v) && v >= 0 && v <= 2);
}

export function scoreAssessment(answers: readonly number[]): AssessmentResult {
  if (!validAnswers(answers)) throw new Error('Responde las ocho preguntas con una opción válida.');
  const score = answers.reduce((sum, answer) => sum + (2 - answer), 0);
  const ranked = questions.map((question, index) => ({ ...question, priority: 2 - answers[index] })).sort((a, b) => b.priority - a.priority);
  const opportunities = ranked.filter(q => q.priority > 0).slice(0, 3).map(q => q.opportunity);
  const level = score >= 11 ? 'ordenar' : score >= 5 ? 'conectar' : 'evolucionar';
  const messages = {
    ordenar: { title: 'Hay una oportunidad para ordenar la operación.', description: 'Empezar por un proceso frecuente y una fuente de información confiable puede ayudarte a definir una primera mejora concreta.' },
    conectar: { title: 'El siguiente paso puede ser conectar lo que ya tienes.', description: 'Tu empresa tiene bases sobre las cuales trabajar. Revisar los puntos de transferencia y la preparación de información puede revelar oportunidades.' },
    evolucionar: { title: 'Tienes una base para seguir evolucionando.', description: 'Puede ser un buen momento para revisar excepciones, adopción y nuevas capacidades con objetivos definidos.' },
  };
  return { version: '1', score, level, ...messages[level], opportunities, area: opportunities.length ? ranked[0].area : 'transformacion' };
}
