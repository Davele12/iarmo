# Arquitectura

Next.js App Router + React + TypeScript strict, Node 24, Tailwind 4/PostCSS. Server Components por defecto; islas cliente para menú, formulario, cuestionario y eventos. Contenido local tipado, sin CMS ni base de datos en V1.

```text
src/app/                 rutas, metadata, endpoints, errores
src/components/          layout, UI, secciones compartidas
src/features/assessment/ preguntas, scoring puro, UI y transferencia
src/features/leads/      validación y formulario
src/integrations/        lead delivery, analytics, contrato futuro de agente
src/content/es/          copy y datos editoriales
src/config/              sitio y entorno
src/lib/                 SEO, seguridad y utilidades
src/types/               contratos compartidos
src/styles/              tokens y estilos
public/                  SVG propios y recursos públicos
tests/                   unidad, integración y E2E
docs/                    decisiones, estrategia, resultados
```

## Flujo de contacto
Browser → POST /api/diagnostico → origen/límite cuerpo/rate limit → validación compartida → consentimiento y configuración → LeadDelivery → correo. Nunca enviar secretos al navegador ni registrar el payload. Resultados del cuestionario se recalculan en servidor. Respuesta de éxito sólo tras aceptación del proveedor; aceptación no garantiza entrega en bandeja.

Se utilizará SMTP con Nodemailer si sus versiones/advisories permiten uso seguro: resuelve TLS y MIME, no implementar SMTP manual. Transporte local de prueba separado y prohibido en producción pública. Adaptador intercambiable por Odoo; contratos sin dependencia de SDK. Límite local acotado para instancia única; documentar WAF/distribuido al escalar.

## Seguridad
Content-Security-Policy compatible con Next, headers de tipo/referrer/frame/permissions y HSTS sólo en HTTPS producción. No auth ni carga de archivos. Validar toda entrada servidor. Consentimiento versionado. No PII en analytics, query strings o logs. Formulario cerrado si revisión legal o destino no configurados.

## SEO e internacionalización
Metadata helper, canonical iarmo.com, OG local, sitemap sólo páginas publicables, JSON-LD Organization/WebSite/Service/BreadcrumbList. ProfessionalService no se usa hasta tener dirección/datos empresariales verificados. Preview noindex mediante variable, no publicar /en hasta disponer de traducción. No blog.

## Futuras integraciones
LeadDelivery entrega contrato tipado, Odoo lo transforma a crm.lead con idempotencia persistente. AnalyticsAdapter recibe eventos de catálogo y propiedades sin PII; defecto noop. AgentProvider y ChatWidgetProps definen interfaces futuras; ningún SDK, endpoint ficticio o widget vacío en V1.

## Dependencias justificadas
Runtime: next/react/react-dom (framework), nodemailer (SMTP seguro). Build: TypeScript/types, ESLint/config Next, Tailwind/PostCSS. QA: Playwright (journeys/responsive), axe (accesibilidad), Lighthouse (laboratorio), tsx (pruebas TypeScript con runner nativo). No UI kit, state manager, icon pack, ORM ni SDK de IA/CRM. Versiones exactas y auditoría se registran después de resolver el registro.
