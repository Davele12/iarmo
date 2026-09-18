import type { ClientCase, Plan, Service } from '@/types/content';

export const home = {
  eyebrow: 'Tu aliado tecnológico',
  title: 'Tu empresa puede',
  emphasis: 'operar mejor.',
  description: 'Automatizamos procesos, conectamos información y construimos soluciones de datos, software e inteligencia artificial para pequeñas y medianas empresas.',
  cta: 'Agenda un diagnóstico',
  promise: 'Cuéntanos el reto. Acordamos contigo el siguiente paso.',
};

export const problems = [
  { title: 'La misma información, una y otra vez.', text: 'Un pedido pasa del correo a Excel y de Excel al sistema. Cada copia abre la puerta a un error.', tag: 'MENOS REPROCESOS' },
  { title: 'Reportes que llegan tarde.', text: 'Cuando la información está lista, la decisión ya no puede esperar. Necesitas ver lo que importa a tiempo.', tag: 'MÁS CLARIDAD' },
  { title: 'Herramientas que no se hablan.', text: 'Ventas, inventario y operación tienen versiones distintas de la misma realidad.', tag: 'MÁS CONEXIÓN' },
  { title: 'Todo depende de una persona.', text: 'El proceso vive en la memoria de alguien. Crecer también exige compartir conocimiento y control.', tag: 'MÁS CONTINUIDAD' },
];

export const services: Service[] = [
  { id: 'automatizacion', title: 'Automatización e Integración', short: 'Menos tareas repetidas. Procesos conectados.', problem: 'Tu equipo vuelve a digitar datos, copiar archivos o perseguir aprobaciones.', action: 'Conectamos sistemas y diseñamos flujos de información, formularios y automatizaciones con reglas claras.', outcome: 'Liberar tiempo operativo y reducir errores de transferencia.', tools: ['n8n', 'Make', 'APIs', 'Python'] },
  { id: 'datos', title: 'Datos y Analítica', short: 'Información que se convierte en decisiones.', problem: 'La información está dispersa y preparar un reporte toma más tiempo que analizarlo.', action: 'Organizamos fuentes, definimos indicadores y construimos modelos de información y tableros útiles para cada decisión.', outcome: 'Tener una lectura consistente del negocio y detectar oportunidades a tiempo.', tools: ['Power BI', 'SQL', 'PostgreSQL', 'ETL'] },
  { id: 'software', title: 'Software Empresarial', short: 'Herramientas que se adaptan a tu operación.', problem: 'Tu proceso ya no cabe en una hoja de cálculo y las herramientas actuales se quedan cortas.', action: 'Diseñamos aplicaciones internas, módulos e instrumentos de trabajo alrededor de las personas que los usan.', outcome: 'Dar control y trazabilidad a procesos que necesitan una solución propia.', tools: ['Python', 'PostgreSQL', 'APIs', 'Docker'] },
  { id: 'ia', title: 'Inteligencia Artificial', short: 'IA donde tiene sentido para tu negocio.', problem: 'Hay información por revisar y tareas de conocimiento que consumen la capacidad del equipo.', action: 'Evaluamos asistentes, agentes y automatización inteligente con alcance acotado, revisión humana y criterios de calidad.', outcome: 'Ampliar las capacidades del equipo sin perder control sobre las decisiones.', tools: ['OpenAI', 'Gemini', 'Modelos LLM', 'APIs'] },
  { id: 'transformacion', title: 'Transformación y Tecnología Empresarial', short: 'Una ruta clara y un aliado para recorrerla.', problem: 'Tienes varias necesidades tecnológicas y no está claro por dónde empezar ni quién debe acompañarlas.', action: 'Diagnosticamos, priorizamos y acompañamos la adopción de herramientas, infraestructura y prácticas; capacitamos al equipo para usarlas.', outcome: 'Invertir con criterio y sostener mejoras que la empresa pueda adoptar.', tools: ['Odoo', 'Microsoft 365', 'Google Workspace', 'Cloud'] },
];

export const method = [
  { title: 'Entendemos', text: 'Escuchamos a quienes viven el proceso. Aclaramos el problema, el contexto y lo que necesitas lograr.' },
  { title: 'Priorizamos', text: 'Identificamos oportunidades y definimos una ruta según impacto, esfuerzo y capacidad de tu empresa.' },
  { title: 'Construimos', text: 'Implementamos por etapas, validamos contigo y dejamos al equipo preparado para usar la solución.' },
  { title: 'Acompañamos', text: 'Revisamos la adopción, aprendemos de la operación y acordamos las siguientes mejoras.' },
];

export const plans: Plan[] = [
  { id: 'operacion', name: 'Operación Digital', audience: 'Para ordenar y dar continuidad.', description: 'Tu empresa necesita mantener sus herramientas y mejorar procesos digitales de forma progresiva.', scope: ['Organización y seguimiento de necesidades', 'Mejoras puntuales priorizadas', 'Orientación para el uso de herramientas'] },
  { id: 'evolucion', name: 'Evolución Digital', audience: 'Para avanzar en varios frentes.', description: 'Tienes oportunidades de automatización, integración y datos que necesitan una ruta de mejora continua.', scope: ['Priorización de iniciativas', 'Implementación y evolución de soluciones', 'Seguimiento de adopción y oportunidades'] },
  { id: 'partner', name: 'Tech Partner', audience: 'Para tener un brazo tecnológico.', description: 'Necesitas un aliado que participe de forma cercana en las decisiones y la ejecución tecnológica de tu empresa.', scope: ['Acompañamiento estratégico y operativo', 'Coordinación de una hoja de ruta', 'Visión integral de sistemas y procesos'] },
];

const pendingSections = ['Contexto', 'Problema', 'Oportunidad', 'Solución implementada', 'Tecnologías utilizadas', 'Impacto', 'Evolución'].map(title => ({ title, text: 'Contenido pendiente de validación con el cliente. Publicaremos únicamente información confirmada.' }));
export const cases: ClientCase[] = [
  { slug: 'productos-deli-ricura', name: 'Productos Deli Ricura', status: 'pending', sections: pendingSections },
  { slug: 'grupo-empresarial-suga', name: 'Grupo Empresarial Suga', status: 'pending', sections: pendingSections },
];

export const faqs = [
  { question: '¿Necesito saber qué tecnología necesita mi empresa?', answer: 'No. Podemos empezar por el proceso que te está generando dificultades. El diagnóstico inicial nos ayuda a entender el contexto y acordar qué conviene explorar.' },
  { question: '¿Trabajan con las herramientas que ya utilizamos?', answer: 'Revisamos primero lo que tu empresa tiene. Según su capacidad de integración y las necesidades del proceso, proponemos aprovecharlo, conectarlo o evaluar alternativas.' },
  { question: '¿Puedo empezar con un solo proceso?', answer: 'Sí. Un proyecto puede enfocarse en un reto concreto. También podemos acordar acompañamiento continuo cuando existen varias necesidades.' },
  { question: '¿Qué pasa después de solicitar el diagnóstico?', answer: 'El equipo revisa tu solicitud y se comunica contigo para conocer tu situación y acordar una reunión. El envío no confirma automáticamente una cita ni una contratación.' },
];
