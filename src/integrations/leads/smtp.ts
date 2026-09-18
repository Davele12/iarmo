import nodemailer from 'nodemailer';
import type { LeadDelivery, LeadEnvelope } from '@/types/lead';
import { scoreAssessment } from '@/features/assessment/scoring';

export function leadDeliveryReady(): boolean {
  return process.env.PRIVACY_APPROVED === 'true' && process.env.LEAD_TRANSPORT === 'smtp' && ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD', 'LEAD_FROM', 'LEAD_TO'].every(key => Boolean(process.env[key]));
}

export function formatLead({ id, receivedAt, lead }: LeadEnvelope): string {
  return [
    `Solicitud: ${id}`, `Recibida: ${receivedAt}`, `Nombre: ${lead.name}`, `Empresa: ${lead.company}`,
    `Cargo: ${lead.role || 'No indicado'}`, `Correo: ${lead.email}`, `Teléfono: ${lead.phone || 'No indicado'}`,
    `Colaboradores: ${lead.size}`, `Interés: ${lead.interest || 'Por definir'}`, `Reto: ${lead.challenge}`,
    `Mensaje: ${lead.message || 'Sin mensaje adicional'}`, `Consentimiento: autorizado; versión ${lead.consentVersion}`,
    ...(lead.assessment ? [`Autodiagnóstico orientativo: ${JSON.stringify(scoreAssessment(lead.assessment))}`] : []),
  ].join('\n\n');
}

export const smtpDelivery: LeadDelivery = {
  async deliver(envelope) {
    if (!leadDeliveryReady()) throw new Error('DELIVERY_UNAVAILABLE');
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST, port,
      secure: process.env.SMTP_SECURE !== 'false', requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      tls: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
      connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000,
      disableFileAccess: true, disableUrlAccess: true,
    });
    const result = await transport.sendMail({
      from: process.env.LEAD_FROM, to: process.env.LEAD_TO,
      replyTo: { address: envelope.lead.email, name: envelope.lead.name.replace(/[\r\n]/g, ' ') },
      subject: `Solicitud de diagnóstico IARMO · ${envelope.id}`,
      text: formatLead(envelope),
    });
    if (!result.accepted?.length || result.rejected?.length) throw new Error('DELIVERY_REJECTED');
  },
};
