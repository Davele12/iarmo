# Contribuir

Leer AGENTS.md y PROJECT_STATUS.md. Node 24 LTS; instalar con npm ci --ignore-scripts. No modificar secretos ni datos personales. Código y copy se revisan juntos cuando cambie el comportamiento.

## Flujo Git
main debe representar una versión verificable. Trabajar en feature/<tema>, fix/<tema> o docs/<tema>, PR breve con problema, comportamiento final, pruebas y riesgos. Commits lógicos: feat, fix, test, docs, chore. No generar un solo commit monolítico ni forzar push en ramas compartidas. Reglas de protección se configuran cuando exista remoto.

## Calidad
TypeScript strict; hooks sólo en islas cliente; contenido comercial tipado. No any generalizado, console.log de solicitudes, dependencias para utilidades triviales ni datos ficticios de clientes. Actualizar tokens centrales en vez de inventar colores por componente. Validar teclado, labels, foco y reducción de movimiento.

Antes de PR: npm run check. Si cambia un journey: npm run test:e2e. Dependencias: consulta registro/advisories/peers, actualiza lockfile y ejecuta npm audit. Imágenes nuevas: tamaño explícito, formato adecuado, alt contextual y presupuesto de rendimiento. No tests que sólo repitan la implementación; cubrir reglas, límites y resultados observables.

## Contenido y casos
Servicios se añaden en src/content/es/business.ts; sincronizar áreas permitidas en validation.ts. Caso nuevo necesita evidencia del vínculo y campos confirmados; pending hasta aprobación. No publicar precios o promesas no autorizadas. Cambios legales requieren revisión del responsable y nueva consentVersion.

## Publicar
Seguir DEPLOYMENT.md. No habilitar producción por tener build verde: también revisar correo, privacidad, DNS y proxy. Mantener registros de validación en docs/audits y release SHA para rollback.
