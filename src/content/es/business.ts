import type { ClientCase, Plan, Service } from '@/types/content';

export const home = {
  title: 'Tu empresa puede',
  emphasis: 'operar mejor.',
  description: 'Automatizamos procesos, conectamos información y construimos soluciones de datos, software e inteligencia artificial para pequeñas y medianas empresas.',
  cta: 'Agenda un diagnóstico',
  promise: 'Cuéntanos el reto. Acordamos contigo el siguiente paso.',
};

export const services: Service[] = [
  { id: 'automatizacion', title: 'Automatización e Integración', short: 'Menos tareas repetidas. Procesos conectados.', problem: 'Tu equipo vuelve a digitar datos, copiar archivos o perseguir aprobaciones.', action: 'Conectamos sistemas y diseñamos flujos de información, formularios y automatizaciones con reglas claras.', outcome: 'Liberar tiempo operativo y reducir errores de transferencia.', tools: ['n8n', 'Make', 'APIs', 'Python'] },
  { id: 'datos', title: 'Datos y Analítica', short: 'Información que se convierte en decisiones.', problem: 'La información está dispersa y preparar un reporte toma más tiempo que analizarlo.', action: 'Organizamos fuentes, definimos indicadores y construimos modelos de información y tableros útiles para cada decisión.', outcome: 'Tener una lectura consistente del negocio y detectar oportunidades a tiempo.', tools: ['Power BI', 'SQL', 'PostgreSQL', 'ETL'] },
  { id: 'software', title: 'Software Empresarial', short: 'Herramientas que se adaptan a tu operación.', problem: 'Tu proceso ya no cabe en una hoja de cálculo y las herramientas actuales se quedan cortas.', action: 'Diseñamos aplicaciones internas, módulos e instrumentos de trabajo alrededor de las personas que los usan.', outcome: 'Dar control y trazabilidad a procesos que necesitan una solución propia.', tools: ['Python', 'PostgreSQL', 'APIs', 'Docker'] },
  { id: 'ia', title: 'Inteligencia Artificial', short: 'IA donde tiene sentido para tu negocio.', problem: 'Hay información por revisar y tareas de conocimiento que consumen la capacidad del equipo.', action: 'Evaluamos asistentes, agentes y automatización inteligente con alcance acotado, revisión humana y criterios de calidad.', outcome: 'Ampliar las capacidades del equipo sin perder control sobre las decisiones.', tools: ['OpenAI', 'Gemini', 'Modelos LLM', 'APIs'] },
  { id: 'transformacion', title: 'Transformación y Tecnología Empresarial', short: 'Una ruta clara y un aliado para recorrerla.', problem: 'Tienes varias necesidades tecnológicas y no está claro por dónde empezar ni quién debe acompañarlas.', action: 'Diagnosticamos, priorizamos y acompañamos la adopción de herramientas, infraestructura y prácticas; capacitamos al equipo para usarlas.', outcome: 'Invertir con criterio y sostener mejoras que la empresa pueda adoptar.', tools: ['Odoo', 'Microsoft 365', 'Google Workspace', 'Cloud'] },
];

export const technologyTools = [
  'Python', 'JavaScript / TypeScript', 'React / Next.js', 'Node.js', 'FastAPI',
  'SQL', 'PostgreSQL', 'Power BI', 'Excel / Google Sheets', 'n8n', 'Make',
  'APIs', 'Docker', 'Git / GitHub', 'OpenAI', 'Gemini', 'Odoo',
  'Microsoft 365', 'Google Workspace', 'ETL',
] as const;

export const method = [
  { title: 'Descubrimos', text: 'Estudiamos tu operación, los objetivos del negocio y las necesidades de quienes participan en el proceso. Identificamos dependencias, riesgos y oportunidades de mejora.' },
  { title: 'Definimos', text: 'Convertimos los hallazgos en un alcance claro: prioridades, entregables, etapas, responsables y criterios para validar el avance del proyecto.' },
  { title: 'Implementamos', text: 'Construimos la solución por iteraciones. Entregamos avances verificables, validamos contigo cada etapa y ajustamos el trabajo con base en el uso real.' },
  { title: 'Transferimos y evolucionamos', text: 'Preparamos al equipo, documentamos lo entregado y revisamos la adopción. A partir de la operación, acordamos las siguientes mejoras y oportunidades.' },
];

export const plans: Plan[] = [
  { id: 'operacion', name: 'Operación Digital', audience: 'Para ordenar y dar continuidad.', description: 'Tu empresa necesita mantener sus herramientas y mejorar procesos digitales de forma progresiva.', scope: ['Organización y seguimiento de necesidades', 'Mejoras puntuales priorizadas', 'Orientación para el uso de herramientas'] },
  { id: 'evolucion', name: 'Evolución Digital', audience: 'Para avanzar en varios frentes.', description: 'Tienes oportunidades de automatización, integración y datos que necesitan una ruta de mejora continua.', scope: ['Priorización de iniciativas', 'Implementación y evolución de soluciones', 'Seguimiento de adopción y oportunidades'] },
  { id: 'partner', name: 'Tech Partner', audience: 'Para tener un brazo tecnológico.', description: 'Necesitas un aliado que participe de forma cercana en las decisiones y la ejecución tecnológica de tu empresa.', scope: ['Acompañamiento estratégico y operativo', 'Coordinación de una hoja de ruta', 'Visión integral de sistemas y procesos'] },
];

const pendingSections = ['Contexto', 'Problema', 'Oportunidad', 'Solución implementada', 'Tecnologías utilizadas', 'Impacto', 'Evolución'].map(title => ({ title, text: 'Contenido pendiente de validación con el cliente. Publicaremos únicamente información confirmada.' }));
export const cases: ClientCase[] = [
  {
    slug: 'grupo-empresarial-suga', name: 'Grupo Empresarial Suga', status: 'pending', sector: 'Contratación pública',
    headline: 'Inteligencia aplicada a la búsqueda de oportunidades.',
    summary: 'Diseñamos agentes inteligentes, APIs y sistemas de alertas que facilitan la consulta y seguimiento de información relacionada con procesos de contratación pública.',
    challenge: 'Identificar, consultar y hacer seguimiento a oportunidades relacionadas con contratación y licitaciones públicas.',
    solutions: ['Agentes inteligentes para consultas', 'Automatización de búsquedas', 'APIs e integraciones', 'Alertas sobre oportunidades de licitación'],
    capabilities: ['Agentes IA', 'APIs', 'Integraciones', 'Automatización', 'Procesamiento de información'],
    impact: 'Menos búsqueda manual. Más capacidad para identificar y analizar oportunidades.',
    technologies: ['APIs', 'Automatización', 'Agentes IA', 'Integraciones'], visualType: 'opportunity',
    image: { src: '/clients/grupo-empresarial-suga.webp', alt: 'Identidad visual de Grupo Empresarial Suga', fit: 'contain' }, sections: pendingSections,
  },
  {
    slug: 'productos-deli-ricura', name: 'Productos Deli Ricura', status: 'pending', sector: 'Manufactura y alimentos',
    headline: 'Un partner tecnológico para toda la operación.',
    summary: 'Acompañamos a Productos Deli Ricura en la evolución digital de diferentes procesos, combinando automatización, datos, herramientas internas e inteligencia artificial.',
    challenge: 'Acompañar diferentes áreas de la organización para identificar problemas, oportunidades de digitalización y soluciones tecnológicas.',
    solutions: ['Automatización de procesos', 'Digitalización de actividades internas', 'Integración y análisis de información', 'Herramientas internas e IA para atención al cliente'],
    capabilities: ['Acompañamiento', 'Automatización', 'Datos', 'Software', 'IA'],
    impact: 'Tecnología aplicada de forma transversal a diferentes áreas del negocio.',
    technologies: ['Analítica', 'Automatización', 'IA', 'Software', 'Datos'], visualType: 'operations',
    image: { src: '/clients/productos-deli-ricura.webp', alt: 'Logo de Productos Deli Ricura', fit: 'contain' }, sections: pendingSections,
  },
];

export const clients = cases.map(({ slug, name, image }) => ({ id: slug, name, image }));

export const faqs = [
  { question: '¿Necesito saber qué tecnología necesita mi empresa?', answer: 'No. Podemos empezar por el proceso que te está generando dificultades. El diagnóstico inicial nos ayuda a entender el contexto y acordar qué conviene explorar.' },
  { question: '¿Trabajan con las herramientas que ya utilizamos?', answer: 'Revisamos primero lo que tu empresa tiene. Según su capacidad de integración y las necesidades del proceso, proponemos aprovecharlo, conectarlo o evaluar alternativas.' },
  { question: '¿Puedo empezar con un solo proceso?', answer: 'Sí. Un proyecto puede enfocarse en un reto concreto. También podemos acordar acompañamiento continuo cuando existen varias necesidades.' },
  { question: '¿Qué pasa después de solicitar el diagnóstico?', answer: 'El equipo revisa tu solicitud y se comunica contigo para conocer tu situación y acordar una reunión. El envío no confirma automáticamente una cita ni una contratación.' },
];
