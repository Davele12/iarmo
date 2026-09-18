export type Lead = {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  size: string;
  challenge: string;
  interest: string;
  message: string;
  consent: true;
  consentVersion: string;
  assessment?: number[];
};
export type LeadEnvelope = { id: string; receivedAt: string; lead: Lead };
export interface LeadDelivery { deliver(envelope: LeadEnvelope): Promise<void> }
