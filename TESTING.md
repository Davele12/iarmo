# Estrategia de pruebas

Pruebas proporcionales a riesgos: scoring, validación y seguridad en unidad; recorridos y accesibilidad en navegador; laboratorio de rendimiento separado. No afirmar que axe sustituye revisión humana ni que Lighthouse mide INP en campo.

## Comandos

```sh
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

E2E arranca su propio next start en 127.0.0.1:3101. Usa SMTP sintético inaccesible (localhost:25252); no envía mensajes externos. Prueba de éxito intercepta el límite HTTP para validar UI; el handler real se prueba con LeadDelivery inyectado. Por tanto, **la entrega SMTP real al buzón requiere prueba adicional en staging con credenciales reales**. No se añade transporte falso a producción.

El servidor de desarrollo del puerto 3000 puede continuar abierto. E2E usa reuseExistingServer=false también localmente para no reutilizar un formulario con otra configuración. El puerto 3101 debe estar libre. Para Chrome instalado usar PLAYWRIGHT_CHANNEL=chrome. Datos de tests son sintéticos; trazas/screenshots pueden guardar formulario y nunca deben contener datos personales reales.

## Cobertura
- Scoring: ocho respuestas, umbrales, selección de oportunidades, inválidos y caso sin oportunidades.
- Leads: mínimo, normalización, consentimiento servidor, enums, inyección de cabeceras, límites, origen, JSON y honeypot.
- Entrega: aceptación sólo tras adapter, fallo/ausencia config ≠ éxito.
- Rate limiter: expiración, cupo y capacidad máxima.
- E2E: CTA→formulario→éxito simulado, errores de campo, red fallida y conservación de datos, cuestionario/anterior/resultado/adjunto opcional.
- Rutas/enlaces internos, 404, títulos, noindex en casos y headers.
- Responsive: 320,360,390,768,960,1280,1536 px en diez rutas; capturas para inspección visual.
- Axe WCAG 2.2 AA en once rutas y estados de pregunta/resultado; teclado, menú móvil, Escape, skip link y reduced-motion.
- CTA del header visible tras scroll y con menú abierto; acceso al formulario en 320,390,768 y 1280 px.
- Logos cargados, fuentes locales, título/OG coherentes, enlaces a fichas pendientes y logo de Organization.

## Rendimiento
Levantar build productivo y ejecutar `npm run audit:performance`. CHROME_PATH selecciona Chrome local, AUDIT_URL por defecto http://127.0.0.1:3000. Cuatro combinaciones: home y diagnóstico, mobile y desktop. AUDIT_OUTPUT_DIR permite guardar una nueva versión sin sobrescribir los informes anteriores (v2: docs/audits/v2). AUDIT_RUNS acepta de 1 a 5 muestras por combinación (defecto 1): guarda informes individuales, samples.json y summary.json con medianas independientes y rango LCP. La verificación final v2 usa tres muestras en docs/audits/v2/repeated. Registrar condiciones, métricas y limitaciones. Para medir SEO productivo usar build indexable local de auditoría y no exponerlo como preview público.

`node scripts/inspect-design.mjs` genera capturas completas y de viewport de seis páginas a 390/1440 px, además de comprobar desbordamiento y textos visibles menores de 13 px. Usa AUDIT_URL (por defecto http://127.0.0.1:3102) y CHROME_PATH. Los resultados v2 están en docs/audits/v2.

Presupuestos: LCP ≤2.5 s, CLS ≤0.1; INP ≤200 ms a verificar con usuarios reales. JS ≤220 KiB gzip/ruta; CSS ≤35 KiB; total home ≤600 KiB. Lighthouse objetivo ≥90 performance, ≥95 accesibilidad y SEO. Investigar diferencias antes de publicar.

## Verificaciones humanas de lanzamiento
Inspeccionar capturas a escala legible; zoom 200%/reflow; orden de Tab y foco tras errores/resultado; probar VoiceOver/NVDA disponible y lectores reales con usuario cuando sea posible. Validar SMTP, DNS/SSL, Search Console y dispositivos físicos. Consultar docs/audits/verification.md para resultados efectivamente ejecutados.
