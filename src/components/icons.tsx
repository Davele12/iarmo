export function Arrow({ diagonal = false, className = '' }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function CapabilityIcon({ index }: { index: number }) {
  const paths = [
    'M4 5h6v6H4zM14 13h6v6h-6zM10 8h7v5M7 11v5h7',
    'M5 19V9M12 19V4M19 19v-7M3 21h18',
    'M3 5h18v14H3zM3 9h18M7 14l2 2-2 2M12 17h5',
    'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
    'M4 19 9 9l5 6 6-12M15 3h5v5M3 21h18',
  ];
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={paths[index % paths.length]} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" /></svg>;
}
