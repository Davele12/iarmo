'use client';
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="es-CO"><body style={{ margin: 0, padding: '12vh 8vw', fontFamily: 'Arial, sans-serif', fontSize: 18, lineHeight: 1.65, background: '#ffffff', color: '#0f172a' }}><main><p>iarmo · Error inesperado</p><h1>No pudimos cargar el sitio.</h1><p>Vuelve a intentarlo en un momento. No hemos confirmado ninguna solicitud desde esta pantalla.</p><button onClick={reset} style={{ padding: '14px 24px', fontSize: 16, minHeight: 52, background: '#0ea5e9', color: '#0f172a', borderRadius: 12, border: 0 }}>Volver a intentar</button></main></body></html>;
}
