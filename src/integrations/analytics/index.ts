export type AnalyticsEvent = 'diagnostic_cta' | 'form_start' | 'form_submit' | 'assessment_start' | 'assessment_complete' | 'plans_view' | 'case_view' | 'contact';
export type EventProperties = { location?: string; area?: string };
export interface AnalyticsAdapter { track(event: AnalyticsEvent, properties?: EventProperties): void }
let adapter: AnalyticsAdapter = { track() {} };
export function configureAnalytics(next: AnalyticsAdapter) { adapter = next; }
export function track(event: AnalyticsEvent, properties?: EventProperties) { try { adapter.track(event, properties); } catch { /* Analytics must never interrupt a user journey. */ } }
