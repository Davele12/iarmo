# Despliegue Hostinger

Validación oficial al 2026-09-17: [Node Web Apps](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/) admite Next.js y Node 24 en planes Business/Cloud. Cuenta/plan del propietario no verificados. Sin publicación externa realizada.

## Preparar repositorio y entorno
1. Crear repositorio Git privado y subir commits locales; no .tools, .env ni node_modules.
2. Activar GitHub Actions; proteger main exigiendo `verify` y revisión. Restringir pushes directos. Para despliegue automático usar sólo rama protegida o rama release actualizada después del gate; Hostinger puede desplegar cada push sin esperar Actions por sí mismo.
3. En Hostinger: Websites → Add website → Node.js web app → Import Git repository. Seleccionar repositorio/rama aprobada.
4. Framework Next.js; Node 24; raíz `.`; install `npm ci --ignore-scripts`; build `npm run build`; start `npm run start`. Usar configuración detectada de Next y verificar logs. No configurar `output: export`.
5. Variables de ENVIRONMENT.md en panel. SITE_URL debe coincidir con el origen usado, incluido staging. SITE_INDEXABLE=false en preview. No abrir captación hasta aprobar privacidad.
6. Probar URL temporal, responsive, API, 404, robots y recursos. Si el panel no permite personalizar start, conservar preset Next y verificar que inicia servidor Node y no salida estática.

## Checklist de producción
- [ ] Confirmar plan con Node 24 y límites de recursos.
- [ ] Confirmar razón social/NIT, domicilio, canal de privacidad, finalidades, encargados y retención; reemplazar borradores.
- [ ] Confirmar receptor/remitente SMTP, validar SPF/DKIM/DMARC y envío real a buzón controlado.
- [ ] Revisar datos/logos de casos. Los pending pueden seguir como fichas noindex; no presentarlos como casos de éxito detallados.
- [ ] Tipos, lint, unidad, build y E2E verdes en CI.
- [ ] Crear preview noindex y probar con configuración real sin datos de clientes.
- [ ] Respaldar DNS actual antes de modificar; preservar MX/TXT de correo.
- [ ] Asociar iarmo.com y www siguiendo los registros exactos entregados por Hostinger.
- [ ] Emitir certificado válido; HTTPS forzado; 301 de www a https://iarmo.com conservando ruta/query.
- [ ] Configurar SITE_URL=https://iarmo.com; SITE_INDEXABLE=true; rebuild; habilitar PRIVACY_APPROVED tras revisión.
- [ ] Validar cabecera de IP en proxy y rate limit perimetral. Nunca confiar a ciegas en X-Forwarded-For.
- [ ] No cachear POST /api/diagnostico ni /diagnostico dinámico; conservar Cache-Control:no-store de API.
- [ ] Next sirve archivos con hash bajo /_next/static con caché inmutable. CDN opcional: respetar cache headers, no cachear API y evitar doble compresión conflictiva.
- [ ] Verificar headers de seguridad en HTTPS público y redirects sin bucles.
- [ ] Comprobar éxito/fracaso real SMTP y confirmar recepción; aceptación SMTP no garantiza bandeja.
- [ ] Search Console, sitemap y vigilancia de errores.

## Observabilidad
Uptime de / y /diagnostico; alertar 5xx y fallos de entrega sin payload personal. Revisar logs de Hostinger por proceso, memoria/restarts y errores de build. Proveedor SMTP debe ofrecer registros de rechazo/entrega con acceso restringido. Establecer responsable y canal de incidentes antes de lanzamiento. Analítica de conversión no sustituye monitoreo de disponibilidad.

## Rollback
Registrar SHA del despliegue y variables vigentes en un lugar seguro. Ante fallo, redeploy del último commit verde desde panel/rama protegida; no reset forzado del historial compartido. Si afecta privacidad o entrega, PRIVACY_APPROVED=false mientras se investiga. Restaurar DNS sólo usando el respaldo validado; cambios de DNS tienen propagación. Probar home, API, noindex e integraciones tras rollback.

## Alternativa VPS
Sólo si el plan administrado no satisface runtime: Node 24, proxy HTTPS, supervisor de proceso, usuario sin privilegios, backups y actualizaciones. No se instala VPS ni se compra hosting automáticamente. La aplicación usa next build/start estándar y no depende de Vercel.
