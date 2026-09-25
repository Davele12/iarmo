import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/config/site';

export const alt = `iarmo — ${site.tagline}.`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/brand/iarmo-wordmark.png'));
  return new ImageResponse(
    <div style={{ background: '#ffffff', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '64px 80px', color: '#0f172a', fontFamily: 'sans-serif' }}>
      {/* ImageResponse renders an embedded asset, not a browser image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${logo.toString('base64')}`} width={246} height={79} alt="iarmo" />
      <div style={{ display: 'flex', fontSize: 28, marginTop: 24, color: '#0369a1' }}>{site.tagline}</div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 52, fontSize: 78, letterSpacing: '-3px', lineHeight: 1.08, fontWeight: 600 }}>
        <span>Tu empresa puede</span><span style={{ color: '#374151' }}>operar mejor.</span>
      </div>
      <div style={{ display: 'flex', fontSize: 25, marginTop: 36, color: '#475569' }}>Automatización · Datos · Software · Inteligencia Artificial</div>
      <div style={{ display: 'flex', position: 'absolute', right: 80, top: 74, background: '#0ea5e9', borderRadius: 50, width: 48, height: 48 }} />
      <div style={{ display: 'flex', position: 'absolute', left: 80, right: 80, bottom: 56, height: 2, background: '#e2e8f0' }} />
    </div>, size,
  );
}
