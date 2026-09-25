export interface Service {
  id: string;
  title: string;
  short: string;
  problem: string;
  action: string;
  outcome: string;
  tools: string[];
}
export interface Plan {
  id: string;
  name: string;
  audience: string;
  description: string;
  scope: string[];
}
export interface ClientCase {
  slug: string;
  name: string;
  status: 'pending' | 'verified';
  sector: string;
  headline: string;
  summary: string;
  challenge: string;
  solutions: string[];
  capabilities: string[];
  impact: string;
  technologies: string[];
  visualType: 'opportunity' | 'operations';
  sections: { title: string; text: string }[];
  image: { src: string; alt: string; fit: 'contain' | 'cover' };
}
