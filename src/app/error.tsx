'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="container error-page"><p className="eyebrow">Algo no salió como esperábamos</p><h2>No pudimos cargar esta sección.</h2><p>Inténtalo de nuevo. Si el problema continúa, vuelve al inicio.</p><div className="error-actions"><button className="button button-primary" onClick={reset}>Volver a intentar</button><Link className="button button-secondary" href="/">Ir al inicio</Link></div></div>;
}
