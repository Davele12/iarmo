# iarmo · Soluciones inteligentes

Sitio corporativo B2B, landing-first y multipágina. Automatización, datos, software, inteligencia artificial y acompañamiento. Sin precios, CMS, chatbot activo ni testimonios inventados.

## Ejecutar

Node 24 LTS y npm. Desde la raíz:

```sh
npm ci --ignore-scripts
cp .env.example .env.local
npm run dev
```

En PowerShell usa `Copy-Item .env.example .env.local`. Abre http://localhost:3000. En este workspace se descargó Node portable verificado en `.tools/node-v24.21.0-win-x64`; si Node no está en PATH:

```powershell
$env:PATH = "$PWD\.tools\node-v24.21.0-win-x64;$env:PATH"
npm.cmd run dev
```

No necesitas credenciales para revisar el sitio o responder el autodiagnóstico. El formulario permanece deshabilitado si no hay política aprobada y SMTP configurado. Nunca simula recepción en producción.

## Comprobar

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

Con Chrome instalado, PowerShell: `$env:PLAYWRIGHT_CHANNEL='chrome'`. Los E2E usan datos sintéticos y simulan el límite de entrega para éxito/error de red; las pruebas unitarias verifican el handler real. No confundirlos con entrega SMTP real validada. Ver TESTING.md.

## Producción

```sh
npm run build
npm run start
```

Hostinger Node Web Apps, Node 24 y repositorio Git. Variables en el panel, nunca en Git. Revisar [DEPLOYMENT.md](DEPLOYMENT.md) y [ENVIRONMENT.md](ENVIRONMENT.md) antes de activar dominio/indexación.

## Qué incluye

- Home narrativa, soluciones, acompañamiento, clientes, casos individuales, nosotros, diagnóstico y legales.
- Sistema visual propio con SVG/CSS, responsive, navegación por teclado y movimiento reducido.
- Cuestionario de ocho preguntas con scoring independiente y transferencia opcional al contacto.
- API de diagnóstico validada, SMTP con TLS, antispam y errores honestos.
- Metadata, OG, sitemap, robots y JSON-LD; casos pendientes excluidos de indexación.
- Contratos de Odoo, analytics e IA; estructura preparada para inglés.
- Pruebas, pipeline GitHub, documentación y ADRs.

## Documentación

Estrategia: docs/01-discovery.md, docs/02-information-architecture.md, docs/03-content-strategy.md.
Construcción: ARCHITECTURE.md, DESIGN_SYSTEM.md, CONTENT_GUIDE.md, AGENTS.md.
Operación: SEO.md, SECURITY.md, DEPLOYMENT.md, TESTING.md, ENVIRONMENT.md, CONTRIBUTING.md.
Seguimiento: PROJECT_STATUS.md, ROADMAP.md, CHANGELOG.md.
Edición manual: [docs/GUIA-EDICION-MANUAL.md](docs/GUIA-EDICION-MANUAL.md).

## Pendientes del propietario

Identidad/canal de privacidad y aprobación jurídica; destinatario/remitente y secretos SMTP; datos verificables de los casos; cuenta y plan Hostinger; repositorio remoto y reglas de protección. El estado detallado y los resultados medidos están en PROJECT_STATUS.md y docs/audits.
