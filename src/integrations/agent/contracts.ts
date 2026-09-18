// V1 contract only. No provider calls, endpoint or widget are enabled.
export type AgentMessage = { role: 'user' | 'assistant'; text: string };
export interface AgentProvider {
  respond(messages: readonly AgentMessage[], options: { signal: AbortSignal }): Promise<AgentMessage>;
}
export interface ChatWidgetProps { endpoint: string; onContact: () => void }
export interface AgentConfiguration { provider: string; endpoint: string; apiKey: string }
