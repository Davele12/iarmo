'use client';
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="es-CO"><body style={{ margin: 0, padding: '12vh 8vw', fontFamily: 'Arial, sans-serif', background: '#f7f8f2', color: '#172b28' }}><main><p>iarmo · Error inesperado</p><h1>No pudimos cargar el sitio.</h1><p>Vuelve a intentarlo en un momento. No hemos confirmado ninguna solicitud desde esta pantalla.</p><button onClick={reset} style={{ padding: '14px 24px', fontSize: 16, background: '#245c46', color: 'white', borderRadius: 6, border: 0 }}>Volver a intentar</button></main></body></html>;
}
