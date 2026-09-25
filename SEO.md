# SEO e indexación

Cada ruta tiene título, descripción y canonical bajo https://iarmo.com. Open Graph/Twitter con imagen PNG generada localmente mediante next/og. Icono SVG propio. Una H1 y breadcrumbs en páginas internas. Sin manifest: el sitio no requiere instalación/PWA.

JSON-LD: Organization y WebSite en layout; Service en soluciones; BreadcrumbList en páginas comerciales. No ProfessionalService/LocalBusiness sin identidad/dirección verificadas, no reviews ni FAQ schema fabricados. El contenido FAQ visible responde preguntas útiles sin promesa de rich results.

`SITE_INDEXABLE=false` por defecto: metadata noindex, robots disallow y sitemap vacío. En lanzamiento, reconstruir con true; sitemap incluye rutas comerciales y sólo casos verified. Borradores legales y casos pending permanecen noindex. Robots permite rastrear los pending en producción para que Google lea noindex; no bloquearlos en robots si se desea retirar indexación.

## Lanzamiento
1. Revisar títulos, URL canónica, contenido legal y evidencia.
2. HTTPS y www→non-www 301 en hosting; evitar bucles y cadenas.
3. Build con SITE_INDEXABLE=true y SITE_URL=https://iarmo.com.
4. Comprobar robots.txt, sitemap.xml, headers y canonical HTML en dominio real.
5. Crear propiedad de dominio en Google Search Console y verificar TXT DNS con valor que entregue Google; no inventar token.
6. Enviar sitemap y usar inspección de URL en inicio/soluciones/diagnóstico.
7. Revisar cobertura, errores, rendimiento y Core Web Vitals después de obtener datos suficientes.

Referencias: [guía Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Web Vitals](https://web.dev/articles/vitals). Estructura clara ayuda a interpretación por buscadores y sistemas IA; no garantiza citas ni ranking. No llms.txt especulativo, keyword stuffing o páginas masivas. Inglés preparado en arquitectura, sin hreflang hasta publicación real.
