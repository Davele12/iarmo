# Sistema visual IARMO v2

DirecciÃ³n: firma tecnolÃ³gica moderna, con blanco, grafito y cyan. JerarquÃ­a amplia, lectura cÃ³moda y venta consultiva. El punto cyan une marca, pasos, diagramas y seÃ±ales de secciÃ³n.

## Marca y activos

La variante 01 / Principal de Logoiarmo.png fue seleccionada por el propietario. Los originales se conservan. scripts/prepare-brand.mjs extrae su contorno, elimina el fondo y normaliza la tinta a la paleta aprobada; no redibuja las letras. Genera wordmark PNG transparente de 656Ã—210, WebP sin pÃ©rdida de 328Ã—105, isotipo de 320Ã—320, favicon de 64Ã—64 y Apple icon de 180Ã—180. Header/footer usan el WebP de 7 KiB con dimensiones reservadas; OG usa el PNG y Organization el isotipo. Archivos pÃºblicos en public/brand; iconos en App Router. No hay una fuente vectorial aprobada.

## Tokens

| Rol | Valor |
| --- | --- |
| canvas | #FFFFFF |
| surface | #F8FAFC |
| ink | #0F172A |
| graphite | #374151 |
| muted | #475569 |
| accent | #0EA5E9 |
| brand / enlace / foco | #0369A1 |
| line decorativa | #E2E8F0 |
| control-border | #64748B |
| tint | #F0F9FF |
| on-dark | #CBD5E1 |
| danger | #A12D31 |
| error-surface | #FFF1F2 |

El cyan se reserva para el punto de marca, seÃ±ales decorativas y CTA con texto ink. Los enlaces y controles usan el azul oscuro; los bordes decorativos no identifican inputs. Las secciones oscuras usan texto blanco y secundario on-dark. Estados con mensajes e iconos, no sÃ³lo color.

## TipografÃ­a y espacio

Manrope para titulares/destacados e Inter para lectura, navegaciÃ³n y formulario. Dos WOFF2 variables con ASCII, espaÃ±ol y signos de interfaz (60.720 bytes combinados), pesos 400â€“700, con licencias SIL OFL en src/assets/fonts. ExtracciÃ³n reproducible con scripts/fetch-fonts.ps1. next/font/local sirve y precarga desde el propio sitio, con swap y fallback ajustado. Ninguna descarga de Google durante navegaciÃ³n o build. Fuente de sistema sÃ³lo para la pantalla de error global independiente y la composiciÃ³n OG del servidor.

H1 home: 42â€“48 px mÃ³vil, escala fluida hasta 88 px en escritorio. H2: 34â€“56 px; H3: 24â€“32 px; lead: 19â€“23 px; cuerpo: 17â€“18 px; cards: 16â€“17 px; navegaciÃ³n/botones: 16 px; labels: 15 px; notas: 14 px; etiquetas grÃ¡ficas: 13 px mÃ­nimo. PÃ¡rrafos limitados a 62ch; hero a 44ch. Escala en rem/clamp y tracking moderado.

Contenedor mÃ¡ximo 1280 px, gutters 20 px mÃ³vil, 32 px tablet y 48 px escritorio. Secciones 72 / 96 / 112â€“144 px; hero 64 px mÃ³vil y hasta 160 px escritorio. Cards 20â€“24 px de radio y padding 24â€“36 px. Problemas y mÃ©todo en dos columnas, una en mÃ³vil; planes mÃ¡ximo tres columnas, reorganizados desde 1100 px. Se conserva la descripciÃ³n de capacidades tambiÃ©n en mÃ³vil.

## NavegaciÃ³n e interacciÃ³n

Header sticky de 64 px hasta 960 px y 76 px en escritorio, fondo blanco translÃºcido, blur fijo de 12 px y borde suave. CTA Agenda un diagnÃ³stico visible fuera del menÃº colapsable. En mÃ³vil estrecho se distribuye en dos lÃ­neas para conservar 16 px. Controles de al menos 44 px; botones 52 px (CTA compacto mÃ³vil 50 px). Foco visible de 3 px, Escape cierra el menÃº y devuelve el foco.

Hover limitado a transform/opacity de 180 ms con cubic-bezier(.22,1,.36,1). Reduced motion elimina transiciones y desplazamiento hover; scroll automÃ¡tico. Sin animaciones continuas ni dependencia de motion.

## Contenido y superficies

Home: hero ? soluciones desplegables ? metodolog?a en roadmap ? autodiagn?stico ? clientes ? acompa?amiento ? tecnolog?as ? nosotros ? preguntas frecuentes ? contacto. La home muestra ?nicamente una fila breve de logos en escala de grises para los dos clientes confirmados. Los casos detallados permanecen fuera de este recorrido hasta completar su validaci?n editorial; no se a?aden resultados cuantitativos, precios o testimonios no autorizados. La cinta de logos usa movimiento lineal suave y desvanecidos laterales; con movimiento reducido se muestra una sola fila fija.

Sistema compartido por todas las rutas, estados del formulario, legales y errores. AutodiagnÃ³stico, validaciÃ³n y contrato SMTP conservados. Metadatos y OG coherentes con la marca; Organization incluye isotipo local. Reglas noindex y sitemap condicional conservadas.

## Motion y clientes
Las cintas de clientes y herramientas usan tres grupos identicos y desplazan un grupo por ciclo para evitar huecos. Los clones llevan aria-hidden y prefers-reduced-motion detiene la animacion y deja una fila estatica. La geometria se valida en cinco anchos y cinco puntos del ciclo.

## Motion system

El movimiento de la home sigue un flujo vertical de avance y reserva el eje horizontal para conexiones entre sistemas. Los tokens viven en `src/styles/motion.css`: microinteracciones de 140-180 ms, entradas de 420 ms, transiciones graficas de 760 ms, ciclos ambientales de 24 s y easing `cubic-bezier(.22,1,.36,1)`. Las animaciones usan `transform`, `opacity`, `clip-path` o `stroke-dashoffset`; no se anima el layout.

`HomeMotion` es el unico coordinador de scroll. Escribe `--conductor-progress`, `--section-progress`, `--section-exit`, `--section-opacity`, `--section-shift` y `--active-node` en la home, y sincroniza tambien el progreso del roadmap de metodologia. `ContinuityRail` y `HeroBackdrop` son capas SVG decorativas, sin espacio de layout, foco ni anuncios para lectores de pantalla. El indicador del header es una sola linea compartida que se posiciona con `transform` y `ResizeObserver`.

La metodologia presenta cuatro fases de gestion tecnologica: Descubrimos, Definimos, Implementamos, y Transferimos y evolucionamos. El contenido cubre estudio de la operacion, alcance, entregables, validacion, documentacion, adopcion y mejora continua sin atribuir una metodologia formal no confirmada.

Los niveles `data-motion-level="primary|secondary|graphic|micro"` documentan la jerarquia de cada entrada. En `prefers-reduced-motion: reduce` se detienen fondos, ruta, marquees y transiciones; el contenido permanece visible, navegable y con opacidad completa. En mobile se reduce la densidad de la red y la ruta, sin parallax de contenido.


La home usa `ClientsSection` para mostrar ?nicamente los logos proporcionados de Productos Deli Ricura y Grupo Empresarial Suga, con tratamiento monocrom?tico y sin copy de casos. `CaseCards` se conserva s?lo para `/casos` y sus fichas pendientes, fuera de la navegaci?n principal y sin convertir estados `pending` en resultados verificados.
## VerificaciÃ³n

Resultados de la ejecuciÃ³n v2: docs/audits/v2/verification.md. Capturas completas y de viewport en docs/audits/v2/screenshots. Los reportes anteriores permanecen en docs/audits. Axe y Lighthouse son controles automÃ¡ticos, no sustituyen pruebas con lectores de pantalla y usuarios reales.

## Fondo interactivo de Inicio y Soluciones (2026-09-24)

La red SVG estirada a toda la home fue sustituida por HeroBackdrop, un componente de servidor con variantes hero y transition. Dos aros concentricos de proporcion 1:1 (el interior al 72%) y un halo radial cyan aparecen desde SSR; Inicio y Soluciones tienen superficies propias que ocultan la ruta global en ese tramo. El hero conserva su grilla dentro de un contenedor interior de ancho limitado.

HomeMotion calcula progreso local de Inicio, separado del progreso global de la pagina. El halo se desplaza hasta 48 px verticales y 24 horizontales; los aros hasta 24 px y escala 1-1.04. Tablet limita el desplazamiento a 24 px y mobile a 16 px con un solo aro. La capa de cursor admite hasta 8 px en escritorio y comparte requestAnimationFrame con el scroll. No hay bucle autonomo ni seguimiento de las piezas internas del diagrama.

El fondo no captura eventos ni foco. Reduced motion neutraliza las transformaciones incluso si cambia durante la sesion; sin JavaScript conserva la composicion estatica. Las mascaras difuminan ambos extremos y mantienen blanco detras del texto. Las capturas y mediciones reproducibles se guardan en docs/audits/hero-background.

## Roadmap de metodologÃ­a pseudo-3D (2026-09-25)

La secciÃ³n â€œCÃ³mo trabajamosâ€ conserva cuatro artÃ­culos de contenido siempre visible y los referencia con numeraciÃ³n simple 1â€“4. Su ruta SVG usa una geometrÃ­a estable `preserveAspectRatio="xMidYMid meet"`, una lÃ­nea de profundidad tenue, nodos cyan y progreso mediante `stroke-dashoffset`. En mobile se utiliza una variante vertical independiente para evitar deformaciones.

`HomeMotion` mantiene el Ãºnico scheduler de scroll y escribe estados `active`, `next`, `completed` y `future` junto con variables de opacidad, escala, desplazamiento y profundidad. La fase activa alcanza como mÃ¡ximo una escala de 1.01; el texto no usa blur ni se oculta. No hay scroll hijacking, perspectiva intensa ni dependencia nueva.

Con `prefers-reduced-motion`, la ruta aparece completa, los nodos y textos permanecen estÃ¡ticos y toda la informaciÃ³n sigue disponible para teclado y lectores de pantalla. El SVG es decorativo con `aria-hidden` y no recibe eventos.
## Corrección visual del roadmap (2026-09-25)

La ruta de metodología se simplificó después de la revisión visual. Ahora es una única guía vertical recta con cuatro nodos, sin perspectiva, curvas, capas duplicadas ni profundidad 3D. El movimiento se concentra en los artículos de texto con opacidad, desplazamiento vertical y escala mínima; la lectura y la posición de la guía permanecen estables.


En la metodologia, los marcadores son independientes y no existe una ruta visual SVG; la jerarquia se comunica mediante escala tipografica, contraste y desvanecimiento suave.

## Ruta SVG de metodología, contenida en el texto (2026-09-25)

Se reintrodujo la ruta visual entre las cuatro fases, evitando la causa del retiro anterior: la geometría se ancla a la posición real de los marcadores (medida con `getBoundingClientRect`, no una posición horizontal independiente), así que la ruta nunca se separa del texto. La curva es leve y alterna, más contenida en tablet y móvil. El progreso, el punto viajero y el trazo recorrido derivan del mismo `--method-progress` que ya controla los estados de fase; `prefers-reduced-motion` la muestra completa y estática.