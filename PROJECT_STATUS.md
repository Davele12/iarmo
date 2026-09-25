# Estado del proyecto IARMO

Objetivo: construir y verificar el sitio corporativo B2B completo, preparado para Hostinger.
Fecha de inicio: 2026-09-17. Fuente: brief del propietario adjunto a la conversaciÃ³n.

## Fase actual
Fondo de Inicio y Soluciones renovado con aros y halo cyan vinculados al scroll (2026-09-24). Capturas comparativas en `docs/audits/hero-background`.
RediseÃ±o visual y UX v2 implementado (2026-09-24). NavegaciÃ³n, metodologÃ­a y autodiagnÃ³stico refinados; verificaciÃ³n local funcional, responsive y de accesibilidad completada. El objetivo mÃ³vil de LCP â‰¤2,5 s sigue pendiente. CI remoto y lanzamiento requieren configuraciÃ³n del propietario.

## Completado
- Discovery con fuentes oficiales, arquitectura de informaciÃ³n y estrategia editorial.
- DirecciÃ³n visual, arquitectura tÃ©cnica y seis decisiones registradas.
- Scaffold: primer build completado con Next 16.3.5 / React 19.3 / Node 24.21.
- Home y pÃ¡ginas secundarias, casos pendientes, legales borrador y estados de error.
- Formulario con validaciÃ³n servidor, SMTP desacoplado, antispam y consentimiento.
- Ocho preguntas, scoring puro, transferencia opcional de respuestas.
- SEO por pÃ¡gina, sitemap/robots condicionales, datos estructurados e interfaces futuras.
- Sistema v2 blanco/grafito/cyan en todo el sitio, Manrope + Inter locales, marca extraÃ­da de la variante 01 aprobada y activos optimizados.
- Home reordenada, un ?nico apartado simple de clientes con logos en gris, cinta horizontal con desvanecido y CTA persistente en m?vil/escritorio; los casos detallados quedan ocultos del recorrido principal.
- CTA comercial consistente como Â«Agenda un diagnÃ³sticoÂ» en las rutas y puntos de conversiÃ³n principales.
- ImÃ¡genes proporcionadas de los dos clientes confirmados en una fila de logos monocromÃ¡ticos, sin mostrar casos detallados en la home ni alterar su estado pending.
- Suga y Deli Ricura presentan capacidades estructuradas en la home; sus slugs y fichas independientes se conservan para ampliar el detalle despuÃ©s de la validaciÃ³n editorial.
- Tipos, lint, 10 pruebas unitarias y build correctos; suite E2E ampliada con navegaciÃ³n continua, foco, historial, casos y motion.
- Axe sin infracciones detectadas en once rutas y estados del cuestionario; responsive de 320 a 1536 px y auditorÃ­a npm con cero vulnerabilidades.
- ValidaciÃ³n final: `typecheck`, lint, 10 pruebas unitarias y build correctos; comprobaciÃ³n directa en Chrome confirmÃ³ el enlace de ambos casos y el layout sin desbordamiento en 390, 768 y 1440 px. El runner E2E requiere descargar su navegador administrado en este entorno.
- La home ya no incluye Problemas, eyebrows decorativos ni el indicador ?Est?s en: Inicio?; el tracker de navegaci?n alinea la secci?n activa con el header real; metodolog?a usa roadmap progresivo y el diagn?stico precede a una fila breve de clientes.
- Axe WCAG 2.2 AA volviÃ³ a pasar sin infracciones en once rutas despuÃ©s del roadmap. Chrome directo confirmÃ³ anchors, orden del diagnÃ³stico, progreso de metodologÃ­a y responsive en 390, 768 y 1440 px.
- Capturas y reportes v2 guardados por separado en `docs/audits/v2`; la mediciÃ³n posterior de esta iteraciÃ³n estÃ¡ en `docs/audits/continuous/after` y la inspecciÃ³n responsive en `docs/audits/continuous/visual.json`.

- Cintas continuas: clientes y herramientas comparten un componente CSS con tres grupos, ciclo de un grupo, desvanecidos laterales y fallback estatico para movimiento reducido. El catalogo editorial incluye 20 herramientas sin implicar alianzas o certificaciones. Chrome directo valido 0%, 25%, 50%, 75% y 99% del ciclo en 320, 390, 768, 1280 y 1536 px: ambos tracks cubren el viewport sin huecos ni overflow; reduced-motion dejo un grupo visible y detuvo ambas animaciones. Axe WCAG 2.2 AA en home: 0 violaciones.

- Lighthouse posterior a las cintas: home movil LCP 3.10 s, desktop 0.58 s; diagnostico movil 2.55 s, desktop 0.53 s; CLS 0 en las cuatro ejecuciones. Accesibilidad y buenas practicas 100 en las cuatro; el objetivo movil de LCP <=2.5 s continua pendiente.

- Motion system: HomeMotion coordina el progreso de secciones y metodologia con un unico requestAnimationFrame; ContinuityRail y AmbientNetwork conectan la narrativa mediante SVG decorativo; el header usa un indicador activo compartido con ResizeObserver; prefers-reduced-motion detiene todas las capas continuas. Chrome directo valido ausencia de overflow en 320, 390, 768, 1280 y 1536 px, cambio de etapa del roadmap y estado reducido estatico.
- Metodologia editorial actualizada a cuatro fases de proyecto tecnologico: Descubrimos, Definimos, Implementamos, y Transferimos y evolucionamos. Se mantienen la geometria del roadmap, su progreso por scroll y el enlace al autodiagnostico.

- Fondo del hero: composicion estatica desde SSR, dos aros concentricos, variante mobile con un aro y respuesta al cursor limitada a escritorio. Sin nuevas dependencias. Lighthouse final: home movil 2.97 s (antes 2.81 s), escritorio 0.60 s (antes 0.60 s), CLS 0; el objetivo movil sigue pendiente. El total transferido aumenta 762 bytes.

## Decisiones
- Next.js 16 Active LTS, Node 24 LTS, React, TypeScript strict, Tailwind 4.
- Venta consultiva, sin precios; conversiÃ³n = solicitud de diagnÃ³stico, no reserva inmediata.
- Contenido espaÃ±ol versionado, sin CMS; inglÃ©s preparado pero no publicado.
- Casos incompletos identificados y excluidos de indexaciÃ³n; ninguna mÃ©trica inventada.
- Correo mediante adaptador de servidor; sin credenciales no se confirma un envÃ­o.
- AnalÃ­tica sin proveedor por defecto; autodiagnÃ³stico local, envÃ­o sÃ³lo con consentimiento.

## Pendiente
- Afinar LCP movil para alcanzar <=2.5 s; la medicion posterior marca 3.10 s en home y 2.55 s en diagnostico, con CLS 0. Consultar `docs/audits/marquee/summary.json`; el SEO de preview esta limitado por noindex deliberado.
- Ejecutar CI remoto y verificaciones de lanzamiento con dispositivos fÃ­sicos y lector de pantalla.
- Confirmar razÃ³n social/NIT, domicilio, canal de privacidad y retenciÃ³n con responsable legal.
- Validar alcance y atribuciÃ³n de cada caso; el resultado confirmado no estÃ¡ asignado a un cliente.
- Credenciales de correo, remitente y destinatario; plan/cuenta Hostinger y repositorio remoto.

## Bloqueos
No bloquean desarrollo. PublicaciÃ³n y captaciÃ³n real requieren datos legales, canal de entrega y acceso al hosting. Node portable 24.21.0 estÃ¡ disponible en .tools, ignorado por Git.

## PrÃ³xima acciÃ³n
Revisar visualmente v2 con el propietario, optimizar la carga mÃ³vil restante y completar datos legales, entrega y CI antes de publicar. No se activaron indexaciÃ³n, SMTP real ni analÃ­tica.

- Roadmap de metodologÃ­a refinado: numeraciÃ³n 1â€“4, ruta SVG pseudo-3D con geometrÃ­a estable, nodos por fase y estados progresivos active/next/completed/future coordinados por el scheduler Ãºnico de HomeMotion. Mobile usa una ruta vertical propia y reduced-motion muestra la composiciÃ³n completa sin transformaciones.
## Verificación del roadmap 2026-09-25

- `typecheck`, lint, pruebas unitarias (10/10), build y `git diff --check` completados.
- Chrome directo confirmó la ruta en 390, 768 y 1440 px, sin overflow; la variante móvil usa el SVG vertical y reduced-motion deja opacidad 1, transform `none` y la ruta completa.
- Axe WCAG 2.2 AA sobre la home: 0 violaciones.
- La suite E2E administrada requiere un navegador Playwright descargado; la validación equivalente se realizó con Chrome instalado y el servidor de producción local.
## Corrección visual del roadmap 2026-09-25

- Se retiró la perspectiva y la ruta curva del roadmap. La guía es ahora una sola línea vertical recta; el movimiento visual queda en los textos de cada etapa.


La metodologia actualmente no utiliza linea guia: cada etapa se presenta con un marcador circular independiente y texto con entrada gradual.

## Ruta SVG reintroducida, contenida en el texto (2026-09-25)

- Se reintrodujo una ruta SVG entre las cuatro fases, corrigiendo la separación horizontal que motivó el retiro anterior: los marcadores no se mueven, la ruta se mide desde su posición real (`getBoundingClientRect` en mount/resize, no por frame) y curva de forma leve y alterna alrededor de ellos.
- Progreso derivado del mismo `--method-progress` ya usado por los estados de fase; sin listeners ni animaciones independientes. Reduced motion muestra la ruta completa y estática, oculta el punto viajero y detiene la transición de tamaño de los marcadores.
- Pendiente: validar `typecheck`, `lint`, `test`, `build` y la suite E2E tras el cambio.

La ruta /privacy ahora contiene una politica adaptada al servicio tecnologico de IARMO, con tratamiento, derechos, procedimientos, seguridad y transferencia. Sigue marcada como pendiente hasta confirmar la identidad juridica y los canales oficiales.

La identidad juridica confirmada para IARMO es DIARMO S.A.S., con los mismos datos publicados por DIARMO: Cll 50 # 92 – 56, Cali; administrador@diarmo.co; +57 (2) 3171524–3171525. La politica /privacy ya los refleja.

La ruta /terms ahora contiene terminos de uso para IARMO: alcance informativo, solicitudes, autodiagnostico, propiedad intelectual, uso permitido, terceros, disponibilidad, responsabilidad, privacidad, cambios y jurisdiccion. Identifica a DIARMO S.A.S. como titular.

La marca usa el eslogan Soluciones inteligentes en el footer, metadata de marca, Organization JSON-LD y Open Graph.