# 02 — Arquitectura de información

## Navegación
Marca → inicio. Soluciones, Acompañamiento, Casos, Nosotros y CTA persistente «Agenda un diagnóstico». En móvil menú desplegable accesible. Footer con descriptor, privacidad y términos. No inventar dirección, teléfono o redes.

| URL | Propósito y estructura |
| --- | --- |
| / | Problema → propuesta → oportunidades → capacidades → método → evidencia → acompañamiento → herramientas → autodiagnóstico → CTA |
| /soluciones | Cinco capacidades; reto, intervención, beneficio buscado y herramientas secundarias |
| /planes | Operación Digital, Evolución Digital, Tech Partner y proyectos; orientación, alcance conversable y CTA sin precios |
| /casos | Clientes confirmados y estado editorial transparente |
| /casos/productos-deli-ricura | Ficha estructurada pendiente de validación; noindex |
| /casos/grupo-empresarial-suga | Ficha estructurada pendiente de validación; noindex |
| /nosotros | Propósito, evolución DIARMO, principios y manera de trabajar |
| /diagnostico | Expectativa de contacto, formulario breve, consentimiento, estados |
| /privacy | Borrador de tratamiento de datos con pendientes explícitos |
| /terms | Borrador de condiciones de uso; no transacciones ni contratación online |

## Journeys
1. Gerente identifica un problema en hero → CTA → formulario → servidor valida → adaptador acepta → confirmación de solicitud; equipo acuerda reunión después.
2. Visitante explora ocho preguntas → orientación local por dimensión → solicita diagnóstico → puede adjuntar el resumen con consentimiento.
3. Responsable compara capacidades/acompañamiento → solicitud con área preseleccionada cuando aplique.

## Reglas
Una H1 por página. Breadcrumb en páginas internas. CTA repetido sólo al cerrar decisiones. Anchors visibles, botones para acciones, enlaces para navegación. Sin apertura de ventanas innecesaria. Las páginas deben ser legibles sin JavaScript; formulario y cuestionario explican dependencia de JS mediante noscript.

## Modelo editorial
Contenido español en src/content/es, tipos compartidos, slugs estables. Servicios: id, título, problema, acción, resultado buscado, herramientas. Casos: slug, cliente, estado, siete campos de evidencia. Planes: destinatario, intensidad, alcance orientativo. Futuro idioma separado en diccionario y rutas /en, sin páginas vacías ni hreflang prematuro.
