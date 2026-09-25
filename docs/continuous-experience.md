# Experiencia continua de IARMO · 21 septiembre 2026

## Auditoría y decisiones

La home contiene hero, cinco capacidades, método, diagnóstico, clientes, planes, herramientas y cuestionario. Las capacidades sólo enlazaban a otra página; faltaban el contexto de la empresa y un formulario dentro del recorrido. La navegación y los CTA interrumpían el scroll. El cuestionario transfería respuestas únicamente al montar una nueva página, incompatible con un formulario ya montado.

Se reutilizan los componentes existentes. Las cinco soluciones despliegan problema, intervención, resultado buscado y herramientas con `details` nativo. El visitante puede informarse sin cambiar de documento. Nosotros resume el contenido confirmado. El formulario existente se monta al final y conserva validación, envío, consentimiento y configuración del servidor.

## Mapa de navegación

| Ancla | Función |
| --- | --- |
| #inicio | Propuesta de valor y entrada al recorrido |
| #soluciones | Cinco capacidades con detalle desplegable |
| #metodologia | Cuatro etapas en roadmap progresivo |
| #diagnostico | Cuestionario orientativo local y primer paso de conversión |
| #clientes | Fila breve de logos de clientes confirmados, sin detalle de casos |
| #planes | Tres acompañamientos y proyecto personalizado |
| #tecnologias | Herramientas en cinta continua, sin alegar alianzas |
| #nosotros | Propósito, origen y forma de trabajar |
| #contacto | Solicitud de contacto en la home |

El menú tiene seis entradas para evitar diez opciones compitiendo con el CTA. Metodología pertenece al grupo Soluciones; tecnologías a Planes; preguntas frecuentes a Nosotros. El enlace activo usa `aria-current="location"` y una línea cyan alineada con el offset real del header. El indicador redundante “Estás en” ya no aparece en la home. Contacto activa el CTA. Se conservan #capacidades, #como-trabajamos y #autodiagnostico como alias.

Las URLs /soluciones, /planes, /nosotros, /casos y /diagnostico siguen atendiendo enlaces anteriores y consultas espec?ficas; sus men?s vuelven a las anclas de la home. Los casos conservan sus slugs reales, pending/noindex y p?ginas de detalle, pero no aparecen en el recorrido principal. La home muestra una fila breve y monocrom?tica con los logos confirmados de Suga y Deli Ricura, sin atribuir resultados ni presentar detalle editorial pendiente.

## Motion y componentes

- `HomeLink`: usa anclas nativas en la home y Next Link desde páginas secundarias. Preserva historial y acciones del navegador. Mueve el foco al destino sin interferir con el desplazamiento nativo. Los enlaces de interés emiten una selección validada por el formulario.
- `Header`: un único resolver geométrico con IntersectionObserver, línea de activación basada en la altura real del header y actualización inicial, por hash y resize. No mueve el foco ni modifica el hash al hacer scroll manual.
- `HomeMotion`: una isla cliente sin contenido visual. Observa elementos que inicialmente están fuera del viewport; revela una vez y desconecta cada objetivo. No oculta el hero/LCP ni destinos que ya están visibles. El SSR y la navegación sin JavaScript conservan todo el contenido. El foco de teclado revela de inmediato su contenedor.
- Reveals de 520 ms, desplazamiento vertical de 20 px, escalonado de 80 ms limitado a tres intervalos. En móvil, 400 ms sin escalonado. Easing `cubic-bezier(.22,1,.36,1)`.
- Diagrama del hero: seguimiento limitado a ±4 px, sólo ratón con hover y puntero preciso. requestAnimationFrame agrupa escrituras; pointerleave restablece la posición. No hay cursor personalizado, bucle continuo ni parallax de página.
- Cards: elevación de 4 px; botones 1 px; flechas 3 px. Transiciones de 180 ms. El punto cyan señala sección activa y etapas del proceso.
- Metodología: roadmap SVG progresivo con cuatro etapas, estado activo y contenido siempre presente. El progreso usa una única actualización por `requestAnimationFrame`; en tablet/móvil el camino se simplifica y pasa a flujo natural. No hay scroll-snap ni scroll hijacking.

`src/styles/motion.css` concentra el sistema y se carga después de los tokens. Con reduced-motion se muestra todo inmediatamente, se elimina seguimiento, movimiento y animación; también responde al cambio de preferencia durante la sesión.

Para añadir motion: usar `data-reveal` sobre contenido secundario renderizado en servidor, evitando controles, H1/LCP y contenedores anidados animados. El roadmap es la ?nica excepci?n con progreso de scroll, aislada en su componente y limitada a variables CSS. Las fichas de casos permanecen fuera de la home para conservar sus rutas estables y el estado editorial pendiente. No aplicar opacity:0 en HTML/CSS inicial. No a?adir librer?as ni listeners de scroll por componente. Verificar teclado, deep links, reduced-motion, m?vil y CLS al extenderlo.

## Estado, SEO y rendimiento

El contacto lee la configuración de entrega en cada render de servidor; por eso la home pasa a SSR dinámico como /diagnostico. No se envían credenciales al cliente. El evento de transferencia notifica un cambio de sessionStorage; no envía respuestas a un proveedor ni añade datos personales a URLs. Desmarcar adjuntos conserva la elección al seleccionar un interés.

HTML completo, un H1, jerarquía H2/H3, metadata/canonical y esquemas existentes se conservan. Formularios, cuestionario y roadmap son las islas interactivas necesarias. No se añaden dependencias de animación. Las imágenes mantienen espacio reservado y carga diferida.

Pruebas y mediciones antes/después: `docs/audits/continuous/`. La medición final del 24 de septiembre registra home móvil LCP 2,86 s, home escritorio 0,63 s, diagnóstico móvil 2,51 s y diagnóstico escritorio 0,54 s; CLS fue 0 en las cuatro rutas y Lighthouse marcó accesibilidad 100 en todas. Las cifras son laboratorio local y no datos de usuarios reales ni percentil 75.

- Motion System: HomeMotion coordina en un solo scheduler el progreso de las secciones, la salida sutil del diagrama y el estado activo de los cuatro pasos de metodologia. La home incorpora ContinuityRail (ruta cyan vertical con nodos) y AmbientNetwork (red SVG ambiental); ambas capas son decorativas, no ocupan layout y usan solo transformaciones, opacity y stroke-dashoffset. El header mantiene una unica linea indicadora, posicionada con la geometria real y ResizeObserver.
- Los niveles data-motion-level distinguen contenido primario, secundario, grafico y microinteracciones. El movimiento horizontal queda reservado a las cintas de clientes y herramientas. En mobile se reduce la ruta y la red; con movimiento reducido se detienen fondos, ruta, marquees y transiciones sin ocultar contenido.

## Fondo interactivo de Inicio y Soluciones (2026-09-24)

La red SVG estirada a toda la home fue sustituida por HeroBackdrop, un componente de servidor con variantes hero y transition. Dos aros concentricos de proporcion 1:1 (el interior al 72%) y un halo radial cyan aparecen desde SSR; Inicio y Soluciones tienen superficies propias que ocultan la ruta global en ese tramo. El hero conserva su grilla dentro de un contenedor interior de ancho limitado.

HomeMotion calcula progreso local de Inicio, separado del progreso global de la pagina. El halo se desplaza hasta 48 px verticales y 24 horizontales; los aros hasta 24 px y escala 1-1.04. Tablet limita el desplazamiento a 24 px y mobile a 16 px con un solo aro. La capa de cursor admite hasta 8 px en escritorio y comparte requestAnimationFrame con el scroll. No hay bucle autonomo ni seguimiento de las piezas internas del diagrama.

El fondo no captura eventos ni foco. Reduced motion neutraliza las transformaciones incluso si cambia durante la sesion; sin JavaScript conserva la composicion estatica. Las mascaras difuminan ambos extremos y mantienen blanco detras del texto. Las capturas y mediciones reproducibles se guardan en docs/audits/hero-background.

## Roadmap pseudo-3D de metodología (2026-09-25)

La ruta de “Cómo trabajamos” conserva el recorrido libre y la lectura completa de sus cuatro fases. Los números se muestran como 1–4 y cada artículo expone un índice estable para asociarlo con su nodo decorativo.

En escritorio la ruta usa SVG con `preserveAspectRatio="xMidYMid meet"`, una capa de profundidad, nodos con contraste progresivo y una línea cyan controlada por `--method-progress`. `HomeMotion` calcula el estado dominante y escribe variables CSS para opacidad, escala, desplazamiento y profundidad. En tablet se reduce la perspectiva; en mobile se cambia a una línea vertical para conservar la proporción y evitar deformaciones.

Las etapas futuras, próximas, activas y completadas permanecen en el DOM. La etapa activa usa `aria-current="step"`; el SVG tiene `aria-hidden="true"`. Reduced motion muestra la ruta completa, elimina escala/perspectiva y conserva la navegación por teclado. No se incorporó una dependencia de animación ni scroll hijacking.
## Corrección visual del roadmap (2026-09-25)

La ruta pseudo-3D fue retirada. La metodología utiliza una sola línea vertical recta y cuatro nodos estables, mientras `HomeMotion` conserva únicamente la transición sutil de los textos entre fases. Mobile comparte la misma guía recta y no crea una segunda geometría.
La versi�n vigente de la metodolog�a elimina la l�nea conductora para mantener una lectura limpia. Los cuatro pasos permanecen en HTML, con marcadores circulares grandes y transiciones suaves de opacidad.


La version vigente de la metodologia elimina la linea conductora para mantener una lectura limpia. Los cuatro pasos permanecen en HTML, con marcadores circulares grandes y transiciones suaves de opacidad.

## Ruta SVG contenida en la columna de texto (2026-09-25)

Se reintroduce una guía visual entre las cuatro fases, corrigiendo la causa de la retirada anterior: la ruta ya no se separa horizontalmente del texto. Los cuatro marcadores conservan su posición fija en la columna de números; `HomeMotion` mide su centro real con `getBoundingClientRect()` (sólo al montar y en `ResizeObserver`, nunca por frame) y construye un único `path` SVG que pasa exactamente por esos cuatro puntos, con una curvatura alterna y pequeña (22px escritorio, 14px tablet, 8px móvil) en vez de una línea recta o una serpiente literal.

Dos capas comparten esa geometría: una tenue y fija (`--color-control-border`, blur mínimo solo en escritorio) para el tramo futuro, y una cian revelada por `stroke-dasharray/dashoffset` para el tramo recorrido. Un punto viajero (`getPointAtLength`, pre-muestreado en 48 puntos durante la medición, sin lecturas de layout por frame) marca la posición exacta del progreso de scroll. Todo se deriva del mismo `--method-progress` que ya gobierna el estado de cada fase; no hay temporizadores ni animación autónoma. Con `prefers-reduced-motion: reduce` la ruta se muestra completa y estática, el punto viajero se oculta y los marcadores pierden la transición de tamaño, conservando toda la información.