# ADR-001 — Framework
Estado: aceptado, 2026-09-17.
Elegimos Next.js 16 Active LTS, React compatible y Node 24 LTS. App Router permite contenido servidor y endpoint de contacto en una sola aplicación. Alternativa estática necesita backend separado; SPA añade JS sin valor. Coste: seguimiento de advisories y runtime Node. Versiones exactas en lockfile, sin canary.

Validación de peers: ESLint 10 y TypeScript 7 son estables pero los plugins incluidos por eslint-config-next aún restringen sus rangos. Se seleccionan ESLint 9.39.5 y TypeScript 6.0.3 compatibles; no forzar peers ni usar legacy-peer-deps. Runtime verificado: Next 16.3.5, React 19.3.0, Node 24.21.0.
