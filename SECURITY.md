# Seguridad

Base: [OWASP Top 10:2025](https://top10.owasp.org/2025/), advisories Next/React y auditoría npm. No representa una certificación ni pentest externo.

## Superficie y controles
- No login, pagos, archivos ni consultas SQL en V1. API pública exclusivamente POST JSON.
- Origen exacto y sec-fetch-site bloquean solicitudes de otros sitios. No se usa autenticación cookie; no hay acciones con credenciales de sesión.
- Límite 16 KiB incluso sin Content-Length, validación tipos/longitudes/enums y consentimiento servidor, honeypot y rate limit acotado.
- Texto de usuario se envía como texto plano; no interpolación HTML ni ejecución. Reply-To estructurado y correo sin saltos de línea.
- SMTP TLS ≥1.2, verificación de certificado y STARTTLS obligatorio cuando corresponda. Timeouts y sin lectura de archivos/URLs por Nodemailer.
- Headers CSP, nosniff, DENY, referrer y permissions; HSTS sólo al habilitar producción HTTPS. No habilitar includeSubDomains sin revisar todos los subdominios.
- CSP mantiene unsafe-inline para scripts de bootstrap Next y estilos; no unsafe-eval en producción. Es una limitación explícita: React escapa contenido y JSON-LD escapa `<`. Migrar a nonces/hashes si se necesita política estricta, evaluando coste sobre páginas estáticas.
- No PII en analytics ni logs de aplicación. Proveedor de hosting/correo puede registrar datos: configurar acceso, retención y encargados.

## Configuración y escala
Rate limit en memoria válido por proceso, no entre réplicas ni reinicios. TRUSTED_IP_HEADER sólo tras verificar sanitización en proxy; defecto comparte cupo. Incorporar WAF/rate limit compartido antes de escalar. No garantiza resistencia a ataques volumétricos; plataforma debe limitar conexiones y duración/cuerpo antes de Next.

No hay cola persistente ni deduplicación entre solicitudes. No se reintenta automáticamente SMTP para evitar duplicados inciertos; un timeout puede ocurrir después de aceptación. Éxito significa aceptación del proveedor, no bandeja de entrada. Si la operación necesita entrega garantizada, implementar outbox durable con idempotencia y seguimiento.

## Cadena de suministro
Lockfile versionado, npm ci --ignore-scripts, npm audit con umbral alto en CI y Dependabot. Revisar avisos oficiales antes de actualizar. ESLint 10 con plugins Next, TypeScript y React Hooks compatibles; se evita la configuración agregada que requiere plugins aún limitados a ESLint 9 fuera de soporte. Accesibilidad validada con axe/teclado. No forzar peers ni ocultar advisories.

## Incidentes
Desactivar captación con PRIVACY_APPROVED=false; rotar secretos comprometidos; revisar logs del proveedor con acceso restringido; identificar solicitudes afectadas sin copiar PII a issues. Evaluar obligaciones legales con responsable. Rollback de código no restaura secretos filtrados.

## Verificación
tests/unit/leads.test.ts prueba origen, formatos, cuerpo, consentimiento, spam, límites y fallos de transporte. E2E comprueba headers y conservación de datos al fallar red. Resultados reales en docs/audits/verification.md. Pendiente de infraestructura: TLS público, proxy, rate limit perimetral, retención, buzón y pruebas de entrega.
