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
  sections: { title: string; text: string }[];
}
