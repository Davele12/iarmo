import { validAnswers } from '../assessment/scoring';
import type { Lead } from '../../types/lead';

export const consentVersion = 'draft-2026-09-17';
export const sizes = ['1–4', '5–15', '16–30', '31–60', 'Más de 60'];
export const interests = ['automatizacion', 'datos', 'software', 'ia', 'transformacion'];
export type LeadErrors = Partial<Record<keyof Lead, string>>;
type Validation = { ok: true; lead: Lead } | { ok: false; errors: LeadErrors };

export function validateLead(input: unknown): Validation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, errors: { name: 'Revisa los datos del formulario.' } };
  const record = input as Record<string, unknown>;
  const errors: LeadErrors = {};
  const read = (key: keyof Lead, min: number, max: number) => {
    const raw = record[key];
    const value = typeof raw === 'string' ? raw.trim() : '';
    if ((raw !== undefined && typeof raw !== 'string') || value.length < min || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) errors[key] = min ? `Completa este campo (${min}–${max} caracteres).` : `Usa como máximo ${max} caracteres válidos.`;
    return value;
  };
  const name = read('name', 2, 100);
  const company = read('company', 2, 120);
  const role = read('role', 0, 100);
  const email = read('email', 3, 254);
  const phone = read('phone', 0, 30);
  const size = read('size', 1, 30);
  const challenge = read('challenge', 10, 1000);
  const interest = read('interest', 0, 40);
  const message = read('message', 0, 1500);
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email)) errors.email = 'Escribe un correo válido, por ejemplo nombre@empresa.com.';
  if (phone && !/^[+\d\s().-]{7,30}$/.test(phone)) errors.phone = 'Revisa el teléfono, incluido el indicativo si aplica.';
  if (!sizes.includes(size)) errors.size = 'Selecciona el tamaño aproximado de tu empresa.';
  if (interest && !interests.includes(interest)) errors.interest = 'Selecciona una de las áreas disponibles.';
  if (record.consent !== true) errors.consent = 'Necesitamos tu autorización para atender esta solicitud.';
  if (record.assessment !== undefined && !validAnswers(record.assessment)) errors.assessment = 'El resumen no es válido. Repite el autodiagnóstico o envía la solicitud sin adjuntarlo.';
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, lead: { name, company, role, email, phone, size, challenge, interest, message, consent: true, consentVersion, ...(validAnswers(record.assessment) ? { assessment: record.assessment } : {}) } };
}
