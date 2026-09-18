# ADR-001 — Framework
Estado: aceptado, 2026-09-17.
Elegimos Next.js 16 Active LTS, React compatible y Node 24 LTS. App Router permite contenido servidor y endpoint de contacto en una sola aplicación. Alternativa estática necesita backend separado; SPA añade JS sin valor. Coste: seguimiento de advisories y runtime Node. Versiones exactas en lockfile, sin canary.

Validación de peers: TypeScript 7 estable aún excede el rango del parser de typescript-eslint; se selecciona TypeScript 6.0.3. Para usar ESLint 10 soportado se configura directamente @next/eslint-plugin-next + typescript-eslint + react-hooks compatibles, evitando eslint-config-next que arrastra plugins limitados a ESLint 9 fuera de soporte. Accesibilidad se verifica con axe y teclado en navegador. No forzar peers ni usar legacy-peer-deps. Runtime: Next 16.3.5, React 19.3.0, Node 24.21.0.
