# Extender integraciones

## Odoo
Contrato `LeadDelivery.deliver(LeadEnvelope)` en src/types/lead.ts. Crear src/integrations/leads/odoo.ts del lado servidor, configurar credenciales mediante variables no públicas y sustituir adapter en route.ts. Mapear nombre del contacto, empresa, correo, teléfono, descripción del reto, tamaño, interés y consentimiento a los campos reales de crm.lead. No asumir IDs de equipo, etapa o campos personalizados: descubrirlos en la versión/instancia destino usando documentación oficial actualizada.

Recalcular assessment con scoreAssessment, adjuntar orientación como nota identificada como orientativa. No enviar respuestas silenciosamente. Añadir idempotencia por envelope.id persistida, cola/outbox y política de reintentos con backoff; no duplicar leads si Odoo recibió la solicitud pero el cliente agotó timeout. Testear permisos mínimos, autenticación, schema, timeout, error, duplicado y recuperación. Ningún secreto sale a UI.

## Analytics
`configureAnalytics(adapter)` conecta proveedor desde una isla cliente de bootstrap. Defecto noop. Catálogo: diagnostic_cta, form_start, form_submit, assessment_start, assessment_complete, plans_view, case_view, contact. Propiedades limitadas a ubicación/área; jamás email, nombre, empresa, teléfono, texto del reto o respuestas. form_submit ocurre sólo tras HTTP aceptado.

Antes de instalar GA/Plausible/PostHog: revisar documentación/advisories, privacidad, base legal/consentimiento cuando corresponda, retención y destinos; actualizar CSP y presupuesto. No cargar SDK sin necesidad. Para QA, inyectar adapter que recolecte en memoria y verificar eventos sin red.

## Agente de IA
Interfaces AgentProvider, AgentMessage, ChatWidgetProps y AgentConfiguration en src/integrations/agent/contracts.ts. En V1 no existe endpoint ni widget. Futuro /api/agente debe limitar tamaño/turnos/rate/coste, usar AbortSignal, validar input y filtrar herramientas/autorizaciones. AGENT_PROVIDER/ENDPOINT/API_KEY sólo servidor. Evitar envío de PII innecesaria, definir retención y ruta a contacto humano.

Widget aislado cargado bajo interacción, teclado/foco correctos, errores recuperables y señal clara de asistencia automatizada. Evaluar respuestas contra contenido empresarial validado, prompt injection, falsas promesas y extracción de datos. No acceso de escritura a CRM por defecto. No reemplazar el diagnóstico consultivo con una respuesta automática.
