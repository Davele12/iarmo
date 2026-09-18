'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { services } from '@/content/es/business';
import { sizes, validateLead, type LeadErrors } from './validation';
import { assessmentTransfer } from '@/features/assessment/transfer';
import { track } from '@/integrations/analytics';
import { Arrow } from '@/components/icons';

export function LeadForm({ available }: { available: boolean }) {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [assessment, setAssessment] = useState<number[] | undefined>();
  const [attach, setAttach] = useState(true);
  const [interest, setInterest] = useState('');
  const started = useRef(false);
  const status = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const saved = assessmentTransfer.read();
    // Storage and query parameters are external browser state, read only after hydration.
    queueMicrotask(() => {
      setAssessment(saved);
      const area = new URLSearchParams(window.location.search).get('interes');
      if (services.some(service => service.id === area)) setInterest(area ?? '');
    });
  }, []);
  const errorProps = (name: keyof LeadErrors) => ({ 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `${name}-error` : undefined });
  const errorText = (name: keyof LeadErrors) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'submitting') return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = { ...data, consent: data.consent === 'on', ...(attach && assessment ? { assessment } : {}) };
    const validation = validateLead(payload);
    if (!validation.ok) {
      setErrors(validation.errors); setState('error'); setMessage('Revisa los campos indicados antes de enviar.');
      setTimeout(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    setErrors({}); setState('submitting'); setMessage('Enviando tu solicitud…');
    try {
      const response = await fetch('/api/diagnostico', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(25_000) });
      const result = await response.json() as { message?: string; errors?: LeadErrors };
      if (!response.ok) { setState('error'); setErrors(result.errors ?? {}); setMessage(result.message ?? 'No pudimos confirmar el envío. Inténtalo de nuevo.'); }
      else { setState('success'); setMessage(result.message ?? 'Recibimos tu solicitud.'); assessmentTransfer.clear(); track('form_submit', { area: interest }); }
    } catch { setState('error'); setMessage('No pudimos confirmar el envío. Revisa tu conexión y vuelve a intentarlo; tus respuestas siguen aquí.'); }
    setTimeout(() => status.current?.focus(), 0);
  }
  if (state === 'success') return <div className="form-success" ref={status} tabIndex={-1} role="status"><span aria-hidden="true">✓</span><h2>Gracias por contarnos tu reto.</h2><p>{message}</p><p>La solicitud no confirma una cita. Acordaremos la reunión contigo.</p><Link className="button button-secondary" href="/">Volver al inicio<Arrow /></Link></div>;
  return <form ref={form} noValidate onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; track('form_start'); } }} className="lead-form" aria-label="Solicitud de diagnóstico">
    {!available && <div className="form-notice"><strong>Formulario en preparación.</strong><p>Estamos habilitando la recepción de solicitudes. Por ahora, el envío no está disponible.</p></div>}
    <p className="form-hint">Los campos con * son obligatorios.</p>
    <div className="form-grid">
      <label htmlFor="name">Nombre *<input id="name" name="name" autoComplete="name" required maxLength={100} {...errorProps('name')} />{errorText('name')}</label>
      <label htmlFor="company">Empresa *<input id="company" name="company" autoComplete="organization" required maxLength={120} {...errorProps('company')} />{errorText('company')}</label>
      <label htmlFor="email">Correo empresarial *<input id="email" name="email" type="email" autoComplete="email" required maxLength={254} {...errorProps('email')} />{errorText('email')}</label>
      <label htmlFor="size">Colaboradores aproximados *<select id="size" name="size" required defaultValue="" {...errorProps('size')}><option value="" disabled>Selecciona una opción</option>{sizes.map(size => <option key={size}>{size}</option>)}</select>{errorText('size')}</label>
    </div>
    <label htmlFor="challenge">¿Qué te gustaría resolver? *<textarea id="challenge" name="challenge" rows={3} minLength={10} maxLength={1000} required placeholder="Por ejemplo: consolidar los pedidos sin volver a digitarlos." {...errorProps('challenge')} />{errorText('challenge')}</label>
    <label htmlFor="interest">Área de interés <span className="optional">(opcional)</span><select id="interest" name="interest" value={interest} onChange={e => setInterest(e.target.value)} {...errorProps('interest')}><option value="">Prefiero que lo definamos juntos</option>{services.map(service => <option value={service.id} key={service.id}>{service.title}</option>)}</select>{errorText('interest')}</label>
    <details className="optional-fields"><summary>Agregar cargo, teléfono o un mensaje <span>(opcional)</span></summary><div className="form-grid"><label htmlFor="role">Cargo<input id="role" name="role" autoComplete="organization-title" maxLength={100} {...errorProps('role')} />{errorText('role')}</label><label htmlFor="phone">Teléfono<input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} {...errorProps('phone')} />{errorText('phone')}</label></div><label htmlFor="message">Mensaje adicional<textarea id="message" name="message" rows={3} maxLength={1500} {...errorProps('message')} />{errorText('message')}</label></details>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">No completar este campo<input id="website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    {assessment && <div><label className="checkbox-label"><input type="checkbox" checked={attach} onChange={e => setAttach(e.target.checked)} />Adjuntar mis respuestas del autodiagnóstico para orientar la conversación.</label>{errorText('assessment')}</div>}
    <div><label className="checkbox-label" htmlFor="consent"><input id="consent" name="consent" type="checkbox" required {...errorProps('consent')} /><span>Autorizo el tratamiento de mis datos para atender esta solicitud y contactarme, según la <Link href="/privacy">política de privacidad</Link>. *</span></label>{errorText('consent')}</div>
    {message && <div className={`form-status ${state === 'error' ? 'is-error' : ''}`} ref={status} tabIndex={-1} role={state === 'error' ? 'alert' : 'status'}>{message}</div>}
    <button className="button button-primary submit-button" type="submit" disabled={state === 'submitting' || !available}>{state === 'submitting' ? 'Enviando solicitud…' : 'Solicitar diagnóstico'}<Arrow /></button><p className="small-note">Revisaremos tu solicitud para conocer tu situación y acordar una reunión.</p><noscript>Este formulario necesita JavaScript para validar y enviar tu solicitud.</noscript>
  </form>;
}
