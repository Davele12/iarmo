import { randomUUID, createHash } from 'node:crypto';
import type { LeadDelivery } from '../../types/lead';
import { validateLead } from './validation';
import { RateLimiter } from '../../lib/rate-limit';

const maxBytes = 16_384;
const json = (body: unknown, status: number, headers?: Record<string, string>) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } });
export function createLeadHandler(options: {
  delivery: LeadDelivery;
  ready: () => boolean;
  origin: () => string;
  trustedIpHeader?: () => string | undefined;
  limiter?: RateLimiter;
}) {
  const limiter = options.limiter ?? new RateLimiter();
  return async function POST(request: Request): Promise<Response> {
    let expectedOrigin: string;
    try { expectedOrigin = new URL(options.origin()).origin; } catch { return json({ message: 'El formulario no está disponible en este momento.' }, 503); }
    if (request.headers.get('origin') !== expectedOrigin || request.headers.get('sec-fetch-site') === 'cross-site') return json({ message: 'No pudimos verificar el origen de la solicitud.' }, 403);
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ message: 'Formato de solicitud no válido.' }, 415);
    const ipHeader = options.trustedIpHeader?.();
    const ip = ipHeader ? request.headers.get(ipHeader)?.split(',')[0].trim() : undefined;
    const key = createHash('sha256').update(ip || 'shared-single-instance').digest('hex');
    if (!limiter.allow(key)) return json({ message: 'Has realizado varios intentos. Espera unos minutos antes de volver a enviar.' }, 429, { 'Retry-After': '600' });
    if (Number(request.headers.get('content-length')) > maxBytes) return json({ message: 'La solicitud es demasiado extensa.' }, 413);
    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json({ message: 'La solicitud está vacía.' }, 400);
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        size += chunk.value.byteLength;
        if (size > maxBytes) { await reader.cancel(); return json({ message: 'La solicitud es demasiado extensa.' }, 413); }
        chunks.push(chunk.value);
      }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch { return json({ message: 'No pudimos leer la solicitud. Revisa los datos.' }, 400); }
    if (input && typeof input === 'object' && 'website' in input && input.website) return json({ message: 'No pudimos procesar la solicitud.' }, 400);
    const validation = validateLead(input);
    if (!validation.ok) return json({ message: 'Revisa los campos indicados.', errors: validation.errors }, 422);
    if (!options.ready()) return json({ message: 'El formulario no está disponible en este momento. Tu solicitud no ha sido enviada. Inténtalo más tarde.' }, 503);
    try {
      await options.delivery.deliver({ id: randomUUID(), receivedAt: new Date().toISOString(), lead: validation.lead });
      return json({ message: 'Recibimos tu solicitud. El equipo de IARMO se comunicará contigo para conocer tu situación y acordar una reunión.' }, 200);
    } catch { return json({ message: 'No pudimos confirmar el envío. Conservamos tus respuestas para que puedas volver a intentarlo.' }, 502); }
  };
}
