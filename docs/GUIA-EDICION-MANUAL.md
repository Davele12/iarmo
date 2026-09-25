# Guía rápida para editar IARMO

El sitio no usa CMS. La información se edita directamente en archivos TypeScript, JSX y CSS desde la raíz del proyecto.

## 1. Preparar el entorno

En PowerShell:

```powershell
$nodeRoot = (Resolve-Path .tools/node-v24.21.0-win-x64).Path
$env:Path = "$nodeRoot;$env:Path"
npm.cmd run dev
```

Abre `http://localhost:3000`. El servidor recarga la página al guardar cambios.

## 2. Dónde cambiar cada cosa

| Necesidad | Archivo |
| --- | --- |
| Textos principales, soluciones, planes, preguntas frecuentes y casos | `src/content/es/business.ts` |
| Navegación y nombre de las secciones | `src/config/site.ts` |
| Estructura de la home y orden de bloques | `src/app/page.tsx` |
| Secciones reutilizables, tarjetas y visualizaciones de casos | `src/components/sections.tsx` |
| Header y menú móvil | `src/components/header.tsx` |
| Pie de página | `src/components/footer.tsx` |
| Formulario de diagnóstico y sus textos | `src/components/contact-section.tsx` y `src/features/leads/lead-form.tsx` |
| Colores, tipografías, tamaños y layout base | `src/styles/globals.css` |
| Animaciones y comportamiento visual al hacer scroll | `src/styles/motion.css` y `src/components/home-motion.tsx` |
| SEO general, JSON-LD y logo | `src/app/layout.tsx` y `src/lib/seo.tsx` |
| SEO de una ruta concreta | El `page.tsx` de esa carpeta, por ejemplo `src/app/casos/page.tsx` |
| Imágenes y logos públicos | `public/` |

## 3. Editar un caso

En `src/content/es/business.ts`, modifica el objeto correspondiente dentro de `cases`. Conserva estos campos:

```ts
headline, summary, challenge, solutions, capabilities,
impact, technologies, status, image, sections
```

Los casos actuales permanecen como `status: 'pending'` y en `noindex` hasta contar con autorización y evidencia verificable. No agregues porcentajes, testimonios, logos de terceros o resultados que no estén aprobados.

## 4. Cambiar estilos

Edita primero los tokens al inicio de `src/styles/globals.css`. Para animaciones usa `src/styles/motion.css`; respeta `prefers-reduced-motion` y evita ocultar contenido importante con `opacity: 0` en el HTML inicial.

## 5. Comprobar antes de publicar

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

Si cambias navegación, formulario, diagnóstico o responsive, ejecuta también:

```powershell
npx playwright install chromium
npm.cmd run test:e2e
```

Consulta [CONTENT_GUIDE.md](../CONTENT_GUIDE.md) para copy comercial, [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) para reglas visuales y [PROJECT_STATUS.md](../PROJECT_STATUS.md) para el estado de validación.

## 6. Qué no editar manualmente

No edites `.next/`, `node_modules/`, `tsconfig.tsbuildinfo` ni los archivos generados dentro de `docs/audits/`. No guardes secretos en el repositorio; las credenciales se configuran mediante variables de entorno.
