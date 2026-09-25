# Acta de preparación de lanzamiento

Este documento distingue entrega de código y activación del servicio. No constituye autorización legal ni evidencia de configuración en una cuenta a la que no se ha accedido.

| Control | Evidencia | Estado |
| --- | --- | --- |
| Estrategia y arquitectura | docs/01–03, ARCHITECTURE, ADRs | Implementado |
| Sitio y componentes | src/app, src/components, screenshots | Implementado |
| Cuestionario | scoring/UI/transfer y tests | Implementado |
| Formulario/API | validación, SMTP y tests | Implementado; buzón real pendiente |
| Casos | dos fichas estructuradas | Vínculo confirmado; contenido individual pendiente |
| Privacidad | /privacy, /terms | Borradores; revisión jurídica pendiente |
| Calidad local | docs/audits/verification.md | Ver acta de pruebas |
| CI | .github/workflows/ci.yml | Preparado; remoto y ejecución GitHub pendientes |
| Hosting | DEPLOYMENT.md | Preparado; plan/cuenta no verificados |
| DNS/SSL | checklist DEPLOYMENT | Pendiente en infraestructura |
| Correo | SMTP + TLS y manejo de fallos | Credenciales/entrega final pendientes |
| Proxy/rate limit | SECURITY.md | Verificar cabecera fiable y control perimetral |
| SEO | metadata/JSON-LD/sitemap/robots | Implementado; Search Console pendiente |
| Rendimiento de campo | presupuesto TESTING | INP/CWV de usuarios reales pendientes tras tráfico |

## Información que sólo puede completar el propietario
1. Razón social/NIT, domicilio y canal de privacidad; responsable de revisar y aprobar textos.
2. Política de conservación y proveedores/encargados aprobados.
3. Buzón destino, remitente y acceso SMTP mediante variables privadas.
4. Plan Hostinger, cuenta/dominio y repositorio remoto con permisos de despliegue.
5. Evidencia y autorización editorial para cada caso.

Con estos datos se puede ejecutar staging, validar entrega, activar captación y completar lanzamiento. Mientras falten, no declarar objetivo de producción completo.
