'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { site } from '@/config/site';
import { Arrow } from './icons';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="container nav-inner">
    <Link href="/" className="wordmark" aria-label="iarmo, inicio" onClick={() => setOpen(false)}>iarmo<span aria-hidden="true">↗</span></Link>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? 'Cerrar' : 'Menú'}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
    <nav id="main-navigation" aria-label="Principal" className={`main-nav ${open ? 'is-open' : ''}`} onKeyDown={event => { if (event.key === 'Escape') { setOpen(false); document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus(); } }}>
      {site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href || pathname.startsWith(item.href + '/') ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}
      <Link className="nav-cta" href="/diagnostico" onClick={() => setOpen(false)} data-analytics="diagnostic_cta">Agenda un diagnóstico<Arrow diagonal /></Link>
    </nav>
  </div></header>;
}
