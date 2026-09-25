import { Breadcrumb, PageIntro } from '@/components/ui';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Política de tratamiento de datos personales',
  'Política de tratamiento de datos personales de DIARMO S.A.S. para la operación de la marca IARMO.',
  '/privacy',
);

export default function PrivacyPage() {
  return <div className="container">
    <Breadcrumb current="Privacidad" />
    <PageIntro
      eyebrow="Transparencia y datos personales"
      title="Política de tratamiento de datos personales"
      description="DIARMO S.A.S. aplica esta política a la información de las personas que se relacionan con los servicios de IARMO y con este sitio."
    />
    <div className="legal-content prose">
      <div className="pending-notice">
        <strong>Responsable del tratamiento: DIARMO S.A.S.</strong>
        <p>Esta política aplica a la información tratada por DIARMO S.A.S. en la operación de la marca IARMO.</p>
      </div>
      <h2>1. Política de protección de datos personales</h2>
      <p>Esta Política de Tratamiento de Datos Personales se aplica a las bases de datos y archivos que contienen datos personales tratados por DIARMO S.A.S., que opera la marca IARMO, en adelante «la compañía», de acuerdo con la Constitución Política de Colombia, la Ley 1581 de 2012, sus decretos reglamentarios y las normas que las modifiquen o sustituyan.</p>
      <h2>2. Identificación del responsable</h2>
      <p>DIARMO S.A.S., entidad con domicilio en la Cll 50 # 92 – 56 de Santiago de Cali, Colombia, es el responsable del tratamiento de los datos personales tratados en la operación de IARMO. Para consultas y reclamos puede contactarse al correo administrador@diarmo.co y al teléfono +57 (2) 3171524–3171525.</p>
      <h2>3. Definiciones</h2>
      <ul>
        <li><strong>Autorización:</strong> consentimiento previo, expreso e informado del titular para realizar el tratamiento de sus datos personales.</li>
        <li><strong>Aviso de privacidad:</strong> comunicación mediante la cual se informa al titular sobre la existencia de esta política, la forma de consultarla y las finalidades del tratamiento.</li>
        <li><strong>Base de datos:</strong> conjunto organizado de datos personales objeto de tratamiento.</li>
        <li><strong>Dato personal:</strong> información vinculada o que puede asociarse a una persona natural determinada o determinable.</li>
        <li><strong>Dato sensible:</strong> información que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación, incluidos datos de salud, biométricos, origen racial o étnico, orientación política, convicciones religiosas o filosóficas y vida sexual.</li>
        <li><strong>Encargado:</strong> persona natural o jurídica que trata datos personales por cuenta del responsable.</li>
        <li><strong>Responsable:</strong> persona natural o jurídica que decide sobre la base de datos y el tratamiento.</li>
        <li><strong>Reclamo:</strong> solicitud para corregir, actualizar o suprimir datos, o para revocar la autorización cuando proceda.</li>
        <li><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</li>
        <li><strong>Transferencia:</strong> envío de datos a otro responsable ubicado dentro o fuera de Colombia.</li>
        <li><strong>Transmisión:</strong> comunicación de datos a un encargado, dentro o fuera de Colombia, para que los trate por cuenta del responsable.</li>
        <li><strong>Tratamiento:</strong> cualquier operación sobre datos personales, como recolección, almacenamiento, uso, circulación, actualización o supresión.</li>
      </ul>
      <h2>4. Principios aplicables</h2>
      <p>La compañía aplicará los principios de legalidad, finalidad, libertad, veracidad o calidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad. Los datos se tratarán para finalidades determinadas, con autorización cuando sea exigible y con medidas razonables para evitar accesos no autorizados, pérdida o adulteración.</p>
      <h2>5. Tratamiento y finalidades</h2>
      <p>La compañía recolecta y trata datos de personas que solicitan información, realizan un autodiagnóstico, diligencian un formulario, participan en un proyecto o mantienen una relación contractual o comercial con IARMO. Las finalidades pueden incluir:</p>
      <ul>
        <li>Atender consultas, solicitudes de diagnóstico, peticiones, quejas y reclamos.</li>
        <li>Comprender el contexto empresarial comunicado por el titular y acordar una reunión o un siguiente paso.</li>
        <li>Preparar, ejecutar, validar y dar seguimiento a propuestas, proyectos y servicios contratados.</li>
        <li>Enviar comunicaciones relacionadas con una solicitud, una relación contractual o la operación del servicio.</li>
        <li>Administrar proveedores, aliados, contratistas y procesos de selección o vinculación cuando corresponda.</li>
        <li>Cumplir obligaciones legales, contractuales, contables, administrativas o requerimientos de autoridades competentes.</li>
        <li>Proteger la seguridad de los sistemas, prevenir fraude y mantener la continuidad del sitio y de los servicios.</li>
      </ul>
      <p>El autodiagnóstico se procesa localmente en el navegador. Sus respuestas sólo se adjuntan a una solicitud si la persona lo decide. IARMO no solicita datos sensibles para iniciar una conversación y pide no incluirlos en campos abiertos.</p>
      <h2>6. Derechos de los titulares</h2>
      <p>El titular puede conocer los datos tratados, solicitar su actualización o rectificación, pedir prueba de la autorización, conocer el uso dado a la información, presentar quejas ante la Superintendencia de Industria y Comercio y solicitar la supresión o revocatoria cuando sea procedente.</p>
      <p>Estos derechos también pueden ejercerse por los causahabientes, por el representante o apoderado acreditado y por quien tenga una estipulación válida a favor del titular. El acceso a los datos personales será gratuito en los términos de la ley.</p>
      <h2>7. Deberes de la compañía</h2>
      <p>La compañía tratará los datos únicamente para las finalidades autorizadas o permitidas por la ley, conservará la información bajo condiciones de seguridad, atenderá las solicitudes de los titulares y exigirá a los encargados contractuales medidas adecuadas de protección y confidencialidad.</p>
      <h2>8. Autorización y datos sensibles</h2>
      <p>La autorización será previa, expresa e informada y podrá otorgarse por escrito o mediante mecanismos electrónicos que permitan conservar evidencia de la decisión. El silencio no se entenderá como autorización. El titular no está obligado a autorizar el tratamiento de datos sensibles; IARMO no los requiere para atender una solicitud comercial ordinaria.</p>
      <p>El tratamiento de datos de niños, niñas y adolescentes sólo se realizará cuando sea estrictamente necesario, respete su interés superior y cuente con la autorización del representante legal, además de las garantías exigidas por la normativa aplicable.</p>
      <h2>9. Procedimiento para consultas y reclamos</h2>
      <p>Las consultas, solicitudes de actualización, rectificación, supresión o revocatoria deberán presentarse por los canales oficiales que se completen en la versión aprobada de esta política. La solicitud debe identificar al titular o a su representante, indicar un medio de respuesta, describir con claridad la petición y adjuntar los documentos necesarios para acreditar la representación cuando aplique.</p>
      <p>Si una consulta o reclamo está incompleto, se solicitará la información faltante dentro del término legal. Las consultas se atenderán en un máximo de diez (10) días hábiles; si no es posible responder en ese plazo, se informará la razón y la nueva fecha, que no podrá superar cinco (5) días hábiles adicionales. Los reclamos se atenderán en un máximo de quince (15) días hábiles contados desde el día siguiente a su recibo; la prórroga legal no podrá superar ocho (8) días hábiles adicionales.</p>
      <p>Las consultas y reclamos serán atendidos por el área de Servicio al Cliente de DIARMO S.A.S. mediante el correo administrador@diarmo.co, el teléfono +57 (2) 3171524 y la dirección Cll 50 # 92 – 56 de Santiago de Cali, Colombia.</p>
      <h2>10. Información obtenida de forma pasiva</h2>
      <p>El sitio puede recibir información técnica básica del navegador y del dispositivo, como dirección IP, tipo de navegador, sistema operativo, dominio de procedencia y tiempo de acceso, cuando sea necesaria para entregar el sitio, protegerlo o diagnosticar errores. La versión actual no incorpora cookies publicitarias ni un proveedor de analítica que recolecte datos personales con fines de seguimiento.</p>
      <h2>11. Conservación, encargados y seguridad</h2>
      <p>Los datos se conservarán durante el tiempo razonable y necesario para cumplir las finalidades informadas, atender obligaciones legales o defender derechos. El formulario puede transmitir una solicitud al proveedor de correo configurado por IARMO; la configuración definitiva de proveedores, plazos de conservación, ubicación del tratamiento y eventuales transmisiones internacionales debe ser documentada antes de aprobar esta política.</p>
      <p>La compañía implementará medidas técnicas, humanas y administrativas razonables. Ningún sistema puede garantizar seguridad absoluta; por ello se gestionarán los riesgos y se exigirán controles adecuados a los encargados que traten información por cuenta de IARMO.</p>
      <h2>12. Transferencia, transmisión y revelación</h2>
      <p>IARMO podrá comunicar datos a proveedores tecnológicos, asesores, contratistas o encargados que necesiten tratarlos para prestar un servicio o cumplir una obligación. Cuando corresponda, se definirán por contrato las finalidades, instrucciones, deberes de seguridad, confidencialidad y condiciones de transferencia o transmisión dentro o fuera de Colombia.</p>
      <h2>13. Legislación aplicable</h2>
      <p>Esta política se rige por el artículo 15 de la Constitución Política de Colombia, la Ley 1581 de 2012, el Decreto 1377 de 2013, el Decreto 1074 de 2015 y las demás normas que los modifiquen, adicionen o sustituyan.</p>
      <h2>14. Vigencia y cambios</h2>
      <p>Esta política está vigente desde el 1 de enero de 2017 y será revisada por el área de Servicio al Cliente de DIARMO S.A.S. Cualquier cambio relevante en las finalidades o en el tratamiento será informado por los medios disponibles y requerirá una nueva autorización cuando la ley lo exija.</p>
      <h2>15. Responsable y canales</h2>
      <p>Para ejercer sus derechos, el titular puede comunicarse con DIARMO S.A.S., área de Servicio al Cliente, en la Cll 50 # 92 – 56 de Santiago de Cali, Colombia, mediante administrador@diarmo.co o el teléfono +57 (2) 3171524.</p>
    </div>
  </div>;
}
