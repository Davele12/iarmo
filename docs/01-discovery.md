# 01 — Discovery y validación

Investigación: 17 septiembre 2026. Las versiones exactas se resuelven en el registro oficial y quedan fijadas en package-lock.json. No confundir recomendaciones de diseño con evidencia estadística.

## Negocio y usuarios
IARMO evoluciona de DIARMO hacia soluciones tecnológicas B2B en Colombia. Su interlocutor es el gerente, dueño o responsable de proceso de empresas de aproximadamente 5–60 personas. Su problema es operacional: doble digitación, reportes demorados, sistemas aislados y trabajo manual. El sitio debe convertir comprensión en una conversación; no vender un paquete cerrado.

Éxito del producto: solicitudes pertinentes que el equipo pueda atender. Medir posteriormente CTA → inicio → envío aceptado y autodiagnóstico → solicitud; no fijar tasas ni prometer resultados sin línea base.

## Referencias actuales e interpretación
- [Thoughtworks: servicios](https://www.thoughtworks.com/what-we-do): organiza capacidades alrededor de necesidades de dirección y acompañamiento. Adoptamos explicación por problema y método; no imitamos escala ni credenciales.
- [Stripe Enterprise](https://stripe.com/en-ca/enterprise): vincula capacidad técnica con operación empresarial y evidencia. Adoptamos jerarquía editorial y diagramas; no copiamos copy, marcas ni cifras.
- Estas observaciones son un muestreo de comunicación B2B actual, no una afirmación sobre todas las tendencias de 2026. La elección marfil/tinta/verde y los diagramas propios son criterio de diseño para este brief.

## Validación tecnológica
- [Política Next.js](https://nextjs.org/support-policy): 16.x Active LTS; 15.x Maintenance. Elegimos 16 y parche estable verificado.
- [Seguridad agosto 2026](https://nextjs.org/blog/august-2026-security-release): parche 16.3.3, entre otros. Revisar [advisories](https://github.com/vercel/next.js/security/advisories) y npm audit antes de instalar/publicar.
- [Node](https://nodejs.org/en/download): 24 LTS. Runtime portable local cuando no está instalado; comprobar SHA256 oficial.
- [React](https://react.dev/blog): versión estable compatible con peerDependencies de Next; no canary directo.
- [Tailwind PostCSS](https://tailwindcss.com/docs/installation/using-postcss): integración v4, tokens CSS.
- [Hostinger](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/): Next.js frontend/backend, Node 24, importación GitHub en planes Business/Cloud. El plan del propietario aún no está confirmado. No usar export estático: existe endpoint de formulario.
- [Self hosting Next](https://nextjs.org/docs/app/guides/self-hosting): build/start estándar y proxy TLS del proveedor; sin dependencia Vercel.

## Calidad y restricciones
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): objetivo AA, teclado, foco visible, errores asociados y tamaños de objetivos. Axe apoya pero no certifica conformidad.
- [Web Vitals](https://web.dev/articles/vitals): objetivos LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 al percentil 75 en campo; Lighthouse es laboratorio, no medición INP real.
- [Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): semántica, contenido útil, rastreo y títulos propios. Ninguna promesa de posicionamiento por JSON-LD.
- [OWASP 2025](https://top10.owasp.org/2025/): validación, configuración, cadena de suministro, excepciones y registros sin datos personales.
- [SIC / Ley 1581](https://sedeelectronica.sic.gov.co/transparencia/normativa/ley-estatutaria-1581-de-2012) y [política de referencia SIC](https://sedeelectronica.sic.gov.co/politica-de-tratamiento-de-datos-personales): orientar borrador, finalidad y derechos. Revisión jurídica pendiente; no afirmar cumplimiento certificado.

## Riesgos y respuestas
| Riesgo | Respuesta |
| --- | --- |
| Evidencia comercial incompleta | Nombres autorizados por brief; fichas pendientes, sin resultados atribuidos |
| Datos legales ausentes | Borrador visible y bloqueo de captación real hasta aprobación configurada |
| Correo sin configurar | Error honesto; nunca simular envío exitoso en producción |
| Spam y abuso | Límite de cuerpo, origen, honeypot, rate limit, validación servidor |
| Múltiples réplicas | Límite local sólo una instancia; rate limit compartido/WAF requerido al escalar |
| Cambios de dependencias | Lockfile, auditoría, CI y actualización deliberada |
| Hosting sin Node | Confirmar plan compatible o VPS antes de publicar |

## Presupuesto inicial
JS transferido ≤220 KiB gzip por ruta; CSS ≤35 KiB gzip; sin vídeo, fuentes remotas ni scripts terceros. Home ≤600 KiB transferidos. Objetivo Lighthouse mobile/desktop ≥90 rendimiento y ≥95 accesibilidad/SEO; toda diferencia debe documentarse y corregirse o quedar explícita. Vistas 360, 390, 768, 1280 y 1536 px.
