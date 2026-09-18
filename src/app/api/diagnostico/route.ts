import { createLeadHandler } from '@/features/leads/handler';
import { leadDeliveryReady, smtpDelivery } from '@/integrations/leads/smtp';

export const runtime = 'nodejs';
export const POST = createLeadHandler({
  delivery: smtpDelivery,
  ready: leadDeliveryReady,
  origin: () => process.env.SITE_URL ?? 'http://localhost:3000',
  trustedIpHeader: () => process.env.TRUSTED_IP_HEADER,
});
