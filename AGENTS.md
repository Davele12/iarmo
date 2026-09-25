# Trabajar en IARMO

IARMO es un aliado tecnológico B2B colombiano. Este repositorio implementa un sitio landing-first multipágina para venta consultiva, no una tienda ni agencia de marketing. Lee PROJECT_STATUS.md, ARCHITECTURE.md y CONTENT_GUIDE.md antes de cambiar comportamiento.

## Estructura y límites
- src/app: rutas App Router y API. Server Components por defecto.
- src/components: UI y secciones; src/features: lógica de diagnóstico y leads.
- src/content/es: contenido comercial. src/integrations: contratos de entrega/analytics/IA.
- src/styles/globals.css: design tokens. public: activos SVG propios.
- tests: lógica, seguridad y journeys. docs: estrategia, ADRs y auditorías.

Se pueden mejorar componentes, copy y pruebas dentro del brief. No inventar métricas, testimonios, alianzas, datos de clientes o identidad legal. No publicar precios ni activar captación/analytics/agente sin configuración adecuada. No exponer secretos, registrar PII ni confirmar envíos fallidos. No convertir estados pendientes de casos en resultados verificados sin evidencia del propietario.

## Convenciones
TypeScript strict, no any indiscriminado, funciones puras para scoring/validación, accesibilidad semántica y mensajes en español. UI no importa SMTP ni SDK CRM. CSS usa tokens existentes; mínima dependencia nueva, revisar versión/peers/advisories primero. Mantener actualización de PROJECT_STATUS al cerrar una fase y CHANGELOG para comportamiento nuevo.

## Comandos y controles
Node 24 LTS. npm ci, npm run dev, npm run typecheck, npm run lint, npm test, npm run build, npm run test:e2e. Antes de integrar: tipos/lint/unidad/build; E2E si afecta navegación, formulario o cuestionario. npm audit y Lighthouse antes de entrega. No declarar comprobaciones ejecutadas si sólo están configuradas.

## Extensión
- Página: src/app/<ruta>/page.tsx, metadata propia, breadcrumb, semántica, sitemap si publicable y pruebas de enlace.
- Servicio: añadir entrada tipada en src/content/es/business.ts; id estable, problema antes de herramientas; formulario y SEO deben reflejarlo.
- Caso: completar siete apartados, evidencia y autorización; cambiar pending→verified únicamente con validación. Revisar robots/sitemap.
- Odoo: implementar LeadDelivery de servidor, mapear payload a crm.lead, agregar cola/idempotencia y pruebas de fallos; no modificar formulario para llamar CRM directamente.
- Chatbot: implementar AgentProvider, endpoint servidor autenticado/limitado según uso, políticas y evaluaciones; montar widget sólo cuando funcione. Ver ADR-006.

## Git
Commits lógicos tipo docs/feat/fix/test/chore. feature/* → PR a main protegido. Desplegar sólo versión con CI verde. No incluir .env, .tools, builds ni reportes con datos sensibles. No tocar archivos personales fuera del proyecto.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
