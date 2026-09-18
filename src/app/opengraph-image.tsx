import { ImageResponse } from 'next/og';
export const alt = 'iarmo — Tu empresa puede operar mejor.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{ background: '#f7f8f2', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '70px 85px', color: '#172b28', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', fontSize: 58, fontWeight: 700, letterSpacing: '-4px' }}>iarmo ↗</div><div style={{ display: 'flex', flexDirection: 'column', marginTop: 60, fontSize: 80, letterSpacing: '-4px', lineHeight: 1.05 }}><span>Tu empresa puede</span><span style={{ color: '#245c46' }}>operar mejor.</span></div><div style={{ display: 'flex', fontSize: 25, marginTop: 38 }}>Automatización · Datos · Software · Inteligencia Artificial</div><div style={{ display: 'flex', position: 'absolute', right: 85, top: 80, background: '#d8f36a', borderRadius: 100, width: 100, height: 100, alignItems: 'center', justifyContent: 'center', fontSize: 60 }}>↗</div></div>, size);
}
