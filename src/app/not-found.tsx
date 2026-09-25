import { Cta } from '@/components/ui';
export default function NotFound() {
  return <div className="container error-page"><p className="eyebrow">404 · No encontramos esta página</p><h1>Tomemos otra ruta.</h1><p>La dirección puede haber cambiado o ya no estar disponible. Puedes volver al inicio o contarnos qué necesitas.</p><div className="error-actions"><Cta href="/">Volver al inicio</Cta><Cta secondary>Agenda un diagnóstico</Cta></div></div>;
}
