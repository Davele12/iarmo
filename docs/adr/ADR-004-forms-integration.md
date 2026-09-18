# ADR-004 — Entrega de solicitudes
Estado: aceptado.
Route Handler con validación y LeadDelivery separado. SMTP inicial; Odoo futuro sin modificar UI. No guardar PII local, no éxito simulado. Conservar consentimiento y versión junto al correo. Límite por proceso requiere capa compartida al desplegar múltiples instancias. Idempotencia durable y cola serán necesarias si se requiere entrega garantizada/reintentos automáticos.
