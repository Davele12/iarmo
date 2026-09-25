# Changelog

## 0.4.4 - 2026-09-25

- Se simplificó el roadmap después de la revisión visual: se retiraron la perspectiva, la ruta curva y los SVG duplicados.
- La guía volvió a una línea vertical recta con cuatro nodos; el movimiento queda concentrado en el texto de cada fase mediante opacidad, desplazamiento y escala mínima.

## 0.4.3 - 2026-09-25

- Se refinó el roadmap de metodología con numeración 1–4, ruta SVG pseudo-3D y una capa de profundidad sutil.
- Las fases ahora coordinan estados futura, próxima, activa y completada mediante el scheduler único de `HomeMotion`, sin ocultar contenido ni introducir dependencias.
- Mobile usa una geometría vertical estable y reduced-motion muestra ruta, nodos y textos sin transformaciones.

## 0.4.2 - 2026-09-25

- Se actualizo la metodologia de la home para reflejar gestion de proyectos tecnologicos: descubrimiento, definicion de alcance, implementacion iterativa y transferencia/evolucion.
- Se ajusto el encabezado de la seccion y el CTA contextual hacia el autodiagnostico.

## 0.4.1 - 2026-09-24

- Fondo localizado en Inicio y Soluciones: aros concentricos y degradado cyan, visibles desde SSR y vinculados al scroll del hero.
- Una sola coordinacion para cursor y scroll, sin seguimiento independiente del diagrama; variantes mobile, touch y reduced motion.
- Corregida la busqueda del enlace para el indicador del header: HomeLink usa anchors #id en la home, por lo que se compara la propiedad hash del enlace.
- Capturas comparativas, Lighthouse y cobertura E2E para geometria, reversibilidad, foco y fallback sin JavaScript.
## 0.4.0 - 2026-09-24

- Se consolido el Motion System de la home con tokens de duracion/easing, niveles semanticos y un coordinador unico de progreso.
- Se anadieron ContinuityRail y AmbientNetwork como capas SVG decorativas de baja intensidad, sin afectar el layout ni el foco.
- El indicador activo del header ahora es una sola linea compartida, medida con la geometria real de los enlaces y actualizada con ResizeObserver.
- El roadmap de metodologia comparte el scheduler de scroll de HomeMotion; mobile simplifica la ruta y reduced-motion deja una version estatica completa.

## 0.3.3 - 2026-09-24

- Se corrigio el hueco visual de la cinta de clientes con tres grupos identicos y un ciclo que desplaza exactamente un grupo.
- Se anadio una cinta inversa de herramientas con un catalogo editorial de 20 opciones; los clones son invisibles para lectores de pantalla y el movimiento reducido muestra una fila estatica.


- Lighthouse de home y diagnostico en movil/escritorio: CLS 0 y accesibilidad 100; el LCP movil medido fue 3.10 s en home y 2.55 s en diagnostico, por encima del objetivo de laboratorio de 2.5 s.

## 0.3.2 ? 2026-09-24

- Se retiraron los eyebrows decorativos de la home para simplificar la jerarqu?a visual.
- La fila de clientes ahora usa tarjetas m?s compactas, m?scara de desvanecido y desplazamiento horizontal continuo con fallback est?tico para `prefers-reduced-motion`.

## 0.3.1 ? 2026-09-24

- Se retiraron los casos detallados de la home y se sustituyeron por una fila simple de logos en escala de grises bajo ?Clientes que respaldan nuestro trabajo?.
- El men? principal ahora enlaza a Clientes; las rutas `/casos` y sus fichas pendientes se conservan fuera del recorrido principal para futuras validaciones.

## 0.3.0 — 2026-09-24

- Se eliminó la sección redundante de problemas de la home y se acortó el recorrido hacia Soluciones.
- El estado activo del menú ahora usa una línea de activación alineada con el header sticky para clicks, scroll manual y deep links.
- La metodología se presentó como roadmap SVG progresivo con fallback estático y soporte para `prefers-reduced-motion`.
- El autodiagnóstico se movió después de metodología y antes de casos, con una transición narrativa hacia la identificación de oportunidades.
- Se retiró “Estás en: Inicio” de la home sin alterar breadcrumbs interiores.

## 0.2.0 — 2026-09-18

- Rediseño integral blanco/grafito/cyan; Manrope e Inter locales con licencias y subconjunto español.
- Marca extraída de la variante principal aprobada, WebP/PNG transparentes, favicon, Apple icon y OG renovados.
- Tipografía de lectura 17–18 px, etiquetas mínimas de 13 px, cards amplias y grillas de hasta tres columnas.
- Header sticky de 64/76 px con CTA visible también al cerrar/abrir el menú móvil; teclado y movimiento reducido conservados.
- Home reordenada con clientes confirmados en texto tras el hero y casos pendientes antes del método.
- CTA comercial unificado como «Agenda un diagnóstico» en la navegación, contenidos de acompañamiento, resultado del autodiagnóstico y pie de página.
- Imágenes proporcionadas de Productos Deli Ricura y Grupo Empresarial Suga optimizadas y mostradas en tarjetas de caso, que continúan marcadas como pendientes.
- Apartado único de clientes y casos en home: Suga como solución especializada de oportunidades; Deli Ricura como partner tecnológico transversal, ambos con contenido cualitativo estructurado y visualizaciones con nodos cyan.
- Animaciones de entrada, timeline de metodología, interacción sutil del diagrama hero y pruebas de navegación continua, reduced-motion y deep links documentadas en docs/continuous-experience.md.
- Sistema extendido a páginas interiores, estados del formulario y errores; título/OG coherentes y logo en Organization.
- E2E aislado en puerto 3101; ampliación responsive, marca, fuentes locales, CTA persistente y axe en once rutas.
- Reportes v2 separados de auditorías anteriores; fuentes y logo optimizados tras medición móvil.
- Sin cambios al scoring, contrato de leads, configuración de captación ni aprobación de casos.

## 0.1.0 — 2026-09-17 (en preparación)

- Estrategia UX/editorial, sitemap y seis ADRs antes de desarrollo.
- Sistema visual marfil/tinta/verde, diagramas propios y componentes reutilizables.
- Home narrativa, cinco capacidades, tres acompañamientos y proyectos, clientes/casos, nosotros y contacto.
- Formulario validado con SMTP desacoplado, consentimiento, límites y estados honestos.
- Autodiagnóstico local de ocho preguntas, scoring puro y adjunto opcional.
- SEO por página, OG local, JSON-LD y control de indexación de preview/casos pendientes.
- Contratos para Odoo, analytics, futuro agente e i18n sin dependencias pesadas.
- Pruebas unitarias/E2E, accesibilidad, pipeline y documentación operativa.
- Casos individuales, política y lanzamiento pendientes de validación comercial/legal y configuración del propietario.

### Correccion 0.4.5 - metodologia sin linea guia

Se retiro por completo la linea SVG y cualquier conductor visual de la metodologia. Cada etapa conserva un marcador circular independiente, ahora de mayor tamano, mientras el texto utiliza una columna mas amplia, escala fluida y una transicion suave de opacidad y desplazamiento controlada por el scroll. La informacion permanece visible y navegable con movimiento reducido.

### Politica de tratamiento de datos adaptada para IARMO

Se reemplazo el borrador breve de privacidad por una politica estructurada para los servicios de IARMO. La ruta permanece sin indexar y pendiente de aprobacion hasta completar razon social, NIT, domicilio y canales oficiales.

Ajuste juridico: la politica de IARMO usa DIARMO S.A.S. como responsable, con domicilio, correo y telefonos confirmados en la politica publicada de DIARMO.

Se reemplazo el borrador de /terms por una politica de terminos de uso adaptada al sitio IARMO y a la operacion de DIARMO S.A.S.

Se incorporo el eslogan Soluciones inteligentes en el pie bajo el logo, metadata de marca, JSON-LD y Open Graph.