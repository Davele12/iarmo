# Sistema visual IARMO v1

Dirección: ingeniería clara y humana. Fondo marfil, tipografía contundente, acento verde bosque y pequeñas señales lima. Diagramas propios representan información que se conecta; son conceptuales, no dashboards de clientes.

| Token | Valor / uso |
| --- | --- |
| canvas | #f7f8f2 — fondo |
| surface | #ffffff — superficies |
| ink | #172b28 — texto y secciones oscuras |
| muted | #566760 — texto secundario |
| brand | #245c46 — CTA y enlaces |
| accent | #d8f36a — énfasis sobre tinta |
| line | #dce2d8 — separadores decorativos |
| danger | #a12d31 — error |
| success | #245c46 — confirmación |

Fuente: stack local Arial/Helvetica/sans-serif; sin descargas, gran consistencia y coste cero de fuentes. Títulos con tracking -0.045em; cuerpo 16–18 px y línea 1.6. Escala 12,14,16,18,24,32,48,64,80 (clamp para display). Monoespaciada local en etiquetas técnicas pequeñas.

Grid max 1200 px, gutter 20 móvil/40 desktop, 4/8/12 columnas conceptuales. Espaciado base 4 px: 4,8,12,16,24,32,48,64,96,128. Radios 6 controles, 12 cards, 24 visuales. Sombra suave sólo en diagrama y superficies elevadas.

Botón mínimo 44 px, foco de 3 px con offset; primario verde y texto blanco, secundario transparente borde oscuro. Links de texto subrayados al hover y en prosa. Inputs con labels persistentes, borde suficiente y error textual asociado. Cards sin sombras repetitivas: borde y composición editorial. Íconos SVG propios de 24 px, stroke 1.6, decorativos aria-hidden.

Estados: hover cambia color/contraste; disabled opacidad y cursor; loading texto explícito; success/error con título y orientación. No depender sólo del color. Motion 160 ms ease; nada esencial animado, respetar prefers-reduced-motion. Sin parallax, vídeo ni librería de animaciones.

Implementación: src/styles/globals.css con variables CSS y @theme de Tailwind. Componentes consumen los mismos tokens. Validación visual en 360,390,768,1280,1536; contraste y teclado antes de cierre.
