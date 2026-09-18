# Estado del proyecto IARMO

Objetivo: construir y verificar el sitio corporativo B2B completo, preparado para Hostinger.
Fecha de inicio: 2026-09-17. Fuente: brief del propietario adjunto a la conversación.

## Fase actual
Fases 1–5 documentadas. Próxima: scaffold y verificación inicial (fase 6).

## Completado
- Discovery con fuentes oficiales, arquitectura de información y estrategia editorial.
- Dirección visual, arquitectura técnica y seis decisiones registradas.

## Decisiones
- Next.js 16 Active LTS, Node 24 LTS, React, TypeScript strict, Tailwind 4.
- Venta consultiva, sin precios; conversión = solicitud de diagnóstico, no reserva inmediata.
- Contenido español versionado, sin CMS; inglés preparado pero no publicado.
- Casos incompletos identificados y excluidos de indexación; ninguna métrica inventada.
- Correo mediante adaptador de servidor; sin credenciales no se confirma un envío.
- Analítica sin proveedor por defecto; autodiagnóstico local, envío sólo con consentimiento.

## Pendiente
- Implementación, CI, pruebas, auditorías y documentación operativa.
- Confirmar razón social/NIT, domicilio, canal de privacidad y retención con responsable legal.
- Validar alcance y atribución de cada caso; el resultado confirmado no está asignado a un cliente.
- Credenciales de correo, remitente y destinatario; plan/cuenta Hostinger y repositorio remoto.

## Bloqueos
No bloquean desarrollo. Publicación y captación real requieren datos legales, canal de entrega y acceso al hosting. Node no está instalado: se prepara runtime portable dentro de .tools, ignorado por Git.

## Próxima acción
Instalar dependencias verificadas, crear scaffold, ejecutar build inicial.
