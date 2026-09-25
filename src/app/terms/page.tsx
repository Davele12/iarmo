import Link from 'next/link';
import { Breadcrumb, PageIntro } from '@/components/ui';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Términos de uso',
  'Condiciones de acceso y uso del sitio web de IARMO, operado por DIARMO S.A.S.',
  '/terms',
);

export default function TermsPage() {
  return <div className="container">
    <Breadcrumb current="Términos" />
    <PageIntro
      eyebrow="Uso del sitio"
      title="Términos de uso"
      description="Estas condiciones explican el alcance del sitio de IARMO, sus contenidos, el autodiagnóstico y las solicitudes de contacto."
    />
    <div className="legal-content prose">
      <div className="pending-notice">
        <strong>Titular del sitio: DIARMO S.A.S.</strong>
        <p>IARMO es la marca bajo la cual DIARMO S.A.S. presenta servicios de automatización, datos, software e inteligencia artificial.</p>
      </div>
      <h2>1. Identificación y aceptación</h2>
      <p>Este sitio es operado por DIARMO S.A.S., con domicilio en la Cll 50 # 92 – 56 de Santiago de Cali, Colombia. Para comunicaciones relacionadas con estas condiciones puedes escribir a administrador@diarmo.co o llamar al +57 (2) 3171524–3171525.</p>
      <p>Al acceder, navegar o utilizar este sitio aceptas estos Términos de uso y la <Link href="/privacy">Política de tratamiento de datos personales</Link>. Si no estás de acuerdo con alguna condición, debes abstenerte de utilizar el sitio.</p>
      <h2>2. Objeto del sitio</h2>
      <p>El sitio presenta información sobre las capacidades, servicios, metodología y formas de acompañamiento de IARMO. Su contenido tiene carácter informativo y comercial. El sitio no permite compras, contratación automática ni la aceptación automática de propuestas.</p>
      <p>Una solicitud enviada mediante el formulario expresa interés en conversar. No confirma una cita, un precio, un plazo, la disponibilidad de un equipo, la aceptación de un servicio ni la celebración de un contrato. Las condiciones de cada proyecto se definirán en una propuesta y, cuando corresponda, en un contrato firmado.</p>
      <h2>3. Solicitudes de diagnóstico y contacto</h2>
      <p>La información que envíes debe ser veraz, suficiente y pertinente para atender tu solicitud. No incluyas datos sensibles, documentos de identidad, secretos empresariales o datos de terceros que no estés autorizado a compartir.</p>
      <p>DIARMO S.A.S. podrá solicitar aclaraciones antes de decidir si existe un siguiente paso. La recepción de una solicitud no obliga a IARMO a presentar una propuesta ni a iniciar una relación comercial.</p>
      <p>El tratamiento de los datos suministrados se rige por la <Link href="/privacy">Política de tratamiento de datos personales</Link>. El consentimiento para tratar datos se solicita por separado mediante la casilla correspondiente del formulario.</p>
      <h2>4. Autodiagnóstico orientativo</h2>
      <p>El autodiagnóstico utiliza las respuestas que introduces para generar una orientación general basada en reglas predefinidas. No constituye una auditoría, consultoría, diagnóstico técnico, financiero, jurídico o de seguridad, y no reemplaza la revisión del contexto particular de tu empresa.</p>
      <p>Las respuestas se procesan localmente en el navegador y sólo se adjuntan a una solicitud de contacto si decides hacerlo. La orientación no garantiza resultados, ahorros, plazos, viabilidad técnica ni una recomendación de compra.</p>
      <h2>5. Contenido, herramientas y casos</h2>
      <p>Procuramos mantener la información clara y actualizada, pero las capacidades, herramientas, integraciones y descripciones pueden cambiar. Las menciones a Python, React, Microsoft 365, OpenAI, Google, Odoo u otras marcas describen herramientas que podemos evaluar o utilizar; no implican alianza, patrocinio, certificación ni representación de sus titulares.</p>
      <p>Los nombres de clientes se muestran únicamente cuando existe autorización para identificarlos. Las fichas marcadas como pendientes no constituyen resultados verificados, testimonios, métricas ni una garantía de alcance. Los diagramas, ejemplos y representaciones visuales son ilustrativos.</p>
      <h2>6. Propiedad intelectual</h2>
      <p>El código, diseño, textos, marcas, logotipos, diagramas, fotografías, componentes y demás materiales de este sitio pertenecen a DIARMO S.A.S. o se utilizan con autorización de sus respectivos titulares. El acceso al sitio no transfiere derechos de propiedad intelectual.</p>
      <p>Puedes consultar y utilizar el contenido para conocer los servicios de IARMO. No puedes copiarlo sistemáticamente, modificarlo, redistribuirlo, venderlo, crear obras derivadas, eliminar avisos de titularidad ni utilizar la identidad de IARMO o de DIARMO S.A.S. para aparentar una relación que no existe.</p>
      <h2>7. Uso permitido y prohibido</h2>
      <p>Debes utilizar el sitio de forma lícita, responsable y compatible con su propósito informativo. Está prohibido introducir código malicioso, intentar acceder a áreas no públicas, interferir con la disponibilidad, evadir controles, extraer información de forma automatizada que afecte el servicio o utilizar el formulario para enviar publicidad no solicitada.</p>
      <p>También está prohibido suplantar a otra persona, compartir información sin autorización, usar el sitio para vulnerar derechos de terceros o realizar actividades contrarias a la legislación colombiana.</p>
      <h2>8. Herramientas y servicios de terceros</h2>
      <p>El sitio puede contener enlaces o referencias a servicios externos. Esos servicios tienen sus propias condiciones y políticas de privacidad. DIARMO S.A.S. no controla sus contenidos, disponibilidad, seguridad o prácticas y no asume responsabilidad por las decisiones que tomes al utilizarlos.</p>
      <h2>9. Disponibilidad y seguridad</h2>
      <p>Trabajamos para mantener el sitio disponible y seguro, pero no garantizamos que funcione sin interrupciones, errores, incompatibilidades o mantenimiento. Podemos modificar, suspender o retirar una sección cuando sea necesario para operar, proteger o actualizar el sitio.</p>
      <p>No existe una garantía de seguridad absoluta en internet. No envíes información que no sea necesaria para la solicitud y utiliza dispositivos y conexiones bajo tu control.</p>
      <h2>10. Responsabilidad</h2>
      <p>La información del sitio se ofrece en el estado en que se encuentra y dentro de los límites permitidos por la ley. No garantizamos que el contenido sea completo para una decisión particular ni que una orientación general produzca un resultado determinado.</p>
      <p>Estas condiciones no excluyen responsabilidades que no puedan limitarse legalmente. Las obligaciones específicas de DIARMO S.A.S. y del cliente se definirán en el contrato aplicable a cada proyecto.</p>
      <h2>11. Privacidad</h2>
      <p>El tratamiento de datos personales, las finalidades, los derechos de los titulares, los canales de atención y las reglas de conservación se encuentran en la <Link href="/privacy">Política de tratamiento de datos personales</Link>.</p>
      <h2>12. Cambios en estas condiciones</h2>
      <p>DIARMO S.A.S. puede actualizar estos Términos de uso para reflejar cambios legales, técnicos o de servicio. La versión publicada en esta página será la aplicable desde su fecha de actualización. Los cambios que requieran una nueva autorización se informarán por los medios correspondientes.</p>
      <h2>13. Legislación y jurisdicción</h2>
      <p>Estos términos se interpretan de acuerdo con las leyes de la República de Colombia. Las partes procurarán resolver de buena fe cualquier diferencia relacionada con el uso del sitio y, cuando no sea posible, acudirán a las autoridades competentes conforme a las reglas aplicables.</p>
      <h2>14. Vigencia y contacto</h2>
      <p>Esta versión entra en vigencia el 25 de septiembre de 2026. Para preguntas sobre estas condiciones puedes comunicarte con DIARMO S.A.S. en la Cll 50 # 92 – 56 de Santiago de Cali, Colombia, mediante administrador@diarmo.co o el teléfono +57 (2) 3171524–3171525.</p>
    </div>
  </div>;
}
