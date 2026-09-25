import { validAnswers } from './scoring';

const key = 'iarmo-assessment-v1';
export interface AssessmentTransfer { save(answers: number[]): void; read(): number[] | undefined; clear(): void }
// Browser session only: no account, no name, no background CRM transmission.
export const assessmentTransfer: AssessmentTransfer = {
  save(answers) { try { sessionStorage.setItem(key, JSON.stringify(answers)); } catch { /* Storage may be disabled. */ } window.dispatchEvent(new Event('iarmo:assessment-change')); },
  read() { try { const value: unknown = JSON.parse(sessionStorage.getItem(key) ?? 'null'); return validAnswers(value) ? value : undefined; } catch { return undefined; } },
  clear() { try { sessionStorage.removeItem(key); } catch { /* Optional storage. */ } window.dispatchEvent(new Event('iarmo:assessment-change')); },
};
