import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLead, consentVersion } from '../../src/features/leads/validation';
import { createLeadHandler } from '../../src/features/leads/handler';
import { RateLimiter } from '../../src/lib/rate-limit';
import type { LeadEnvelope } from '../../src/types/lead';

const valid = { name: 'Persona de prueba', company: 'Empresa de prueba', email: 'test@example.com', size: '5–15', challenge: 'Necesitamos conectar pedidos e inventario.', consent: true };
const origin = 'http://localhost:3000';
const request = (body: unknown, headers: Record<string, string> = {}) => new Request(`${origin}/api/diagnostico`, { method: 'POST', headers: { origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) });
const handler = (overrides: Partial<Parameters<typeof createLeadHandler>[0]> = {}) => createLeadHandler({ delivery: { async deliver() {} }, ready: () => true, origin: () => origin, ...overrides });

test('minimal lead is normalized with server consent version', () => {
  const result = validateLead({ ...valid, name: ' Persona de prueba ', consentVersion: 'forged', unknown: 'ignored' });
  assert.equal(result.ok, true);
  if (result.ok) { assert.equal(result.lead.name, valid.name); assert.equal(result.lead.role, ''); assert.equal(result.lead.consentVersion, consentVersion); assert.equal('unknown' in result.lead, false); }
});
test('validation rejects missing consent, header injection, bad enum and overflow', () => {
  for (const payload of [{ ...valid, consent: false }, { ...valid, email: 'test@example.com\r\nBcc:evil@example.com' }, { ...valid, size: 'invented' }, { ...valid, interest: 'unknown' }, { ...valid, message: 'a'.repeat(1501) }, { ...valid, assessment: [1] }, { ...valid, phone: '<script>' }, { ...valid, name: {} }]) assert.equal(validateLead(payload).ok, false);
});
test('accepted request delivers once and returns no personal information', async () => {
  const deliveries: LeadEnvelope[] = [];
  const post = handler({ delivery: { async deliver(envelope) { deliveries.push(envelope); } } });
  const response = await post(request({ ...valid, assessment: Array(8).fill(1) }));
  assert.equal(response.status, 200);
  assert.equal(deliveries.length, 1);
  assert.equal(deliveries[0].lead.consent, true);
  assert.ok(deliveries[0].id);
  assert.equal((await response.text()).includes(valid.email), false);
});
test('unconfigured and failed transports never report successful receipt', async () => {
  assert.equal((await handler({ ready: () => false })(request(valid))).status, 503);
  assert.equal((await handler({ delivery: { async deliver() { throw new Error('secret SMTP error'); } } })(request(valid))).status, 502);
});
test('cross-origin, malformed JSON, oversized payloads and honeypot are rejected', async () => {
  assert.equal((await handler()(request(valid, { origin: 'https://evil.example' }))).status, 403);
  assert.equal((await handler()(request(valid, { 'Content-Type': 'text/plain' }))).status, 415);
  assert.equal((await handler()(request({ ...valid, website: 'spam' }))).status, 400);
  assert.equal((await handler()(request({ ...valid, message: 'x'.repeat(17000) }))).status, 413);
  const malformed = new Request(`${origin}/api/diagnostico`, { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: '{bad' });
  assert.equal((await handler()(malformed)).status, 400);
});
test('invalid consent prevents delivery, and rate limit returns retry-after', async () => {
  let delivered = false;
  const post = handler({ limiter: new RateLimiter(1), delivery: { async deliver() { delivered = true; } } });
  assert.equal((await post(request({ ...valid, consent: false }))).status, 422);
  assert.equal(delivered, false);
  const limited = await post(request(valid));
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('Retry-After'), '600');
});
test('bounded limiter expires records and refuses new keys when full', () => {
  const limiter = new RateLimiter(2, 100, 1);
  assert.equal(limiter.allow('a', 0), true);
  assert.equal(limiter.allow('a', 1), true);
  assert.equal(limiter.allow('a', 2), false);
  assert.equal(limiter.allow('b', 2), false);
  assert.equal(limiter.allow('b', 101), true);
});
