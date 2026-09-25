# Entorno y variables

Node 24 LTS, npm incluido y runtime Node (no export estático). Las versiones directas se fijan en package.json; resolución reproducible en lockfile. `.env.local` sólo local; en Hostinger usar variables del panel. Todas las variables siguientes son servidor: ninguna usa NEXT_PUBLIC_.

| Variable | Requerida | Valor / función |
| --- | --- | --- |
| SITE_URL | Producción | Origen exacto autorizado, `https://iarmo.com`; local `http://localhost:3000` |
| SITE_INDEXABLE | No | `false` por defecto; `true` sólo lanzamiento. Afecta build estático, robots, sitemap y HSTS |
| PRIVACY_APPROVED | Contacto | `true` sólo después de completar y aprobar política/identidad |
| LEAD_TRANSPORT | Contacto | `smtp`; futuros adaptadores requieren implementación explícita |
| SMTP_HOST | Contacto | Servidor SMTP del proveedor verificado |
| SMTP_PORT | Contacto | `465` con TLS implícito; `587` con STARTTLS |
| SMTP_SECURE | Contacto | `true` para 465; `false` para 587, STARTTLS sigue obligatorio |
| SMTP_USER | Contacto | Usuario del buzón o credencial SMTP |
| SMTP_PASSWORD | Contacto | Secreto, nunca en logs o frontend |
| LEAD_FROM | Contacto | Remitente autorizado por el proveedor |
| LEAD_TO | Contacto | Buzón de IARMO que recibirá la solicitud |
| TRUSTED_IP_HEADER | Opcional | Sólo cabecera que el proxy sobrescribe de forma confiable; nunca asumir X-Forwarded-For |
| AGENT_PROVIDER | Futuro | Sin uso en V1 |
| AGENT_ENDPOINT | Futuro | URL del adaptador de agente, sólo servidor |
| AGENT_API_KEY | Futuro | Secreto del agente, sólo servidor |
| PORT | Hosting | Puerto asignado por plataforma; Next lo respeta |
| NEXT_TELEMETRY_DISABLED | Opcional | `1` deshabilita telemetría de herramientas Next |

Variables de pruebas: PLAYWRIGHT_CHANNEL=chrome para usar Chrome instalado; CHROME_PATH ruta de navegador para Lighthouse; AUDIT_URL URL local de auditoría. Nunca reutilizar datos de prueba como credenciales productivas.

SITE_INDEXABLE se lee al construir páginas estáticas: cambiarlo exige nuevo build. PRIVACY_APPROVED y SMTP se evalúan en página dinámica/API. `.env.example` no contiene secretos. No pasar credenciales por URL ni por argumentos visibles. Si un secreto fue publicado, revocarlo primero y revisar historial.

Sin TRUSTED_IP_HEADER el límite es global por instancia (5 intentos/10 minutos). Es conservador y puede limitar usuarios legítimos; antes de publicar validar proxy y configurar control perimetral adecuado. No confiar en una cabecera enviada libremente por el cliente.
