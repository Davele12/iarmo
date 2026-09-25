'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/config/site';
import { Arrow } from './icons';
import { Brand } from './brand';
import { HomeLink } from './home-link';

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname && pathname !== '/') return;
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
    const header = document.querySelector<HTMLElement>('.site-header');
    const syncIndicator = (key: string) => {
      const navigation = nav.current;
      const marker = indicator.current;
      if (!navigation || !marker) return;
      const target = [...navigation.querySelectorAll<HTMLAnchorElement>('a')].find(link => link.hash === `#${key}`);
      if (!target) { marker.style.opacity = '0'; return; }
      const navigationRect = navigation.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      marker.style.opacity = '1';
      marker.style.width = `${targetRect.width}px`;
      marker.style.transform = `translateX(${targetRect.left - navigationRect.left}px)`;
    };
    const update = () => {
      const headerHeight = header?.getBoundingClientRect().height ?? 76;
      const line = Math.max(headerHeight + 56, Math.min(window.innerHeight * .35, 320));
      const section = sections.filter(item => item.getBoundingClientRect().top <= line).at(-1) ?? sections[0];
      if (section) {
        const next = section.dataset.nav ?? section.id;
        setActive(next);
        window.requestAnimationFrame(() => syncIndicator(next));
      }
    };
    let observer: IntersectionObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      const headerHeight = header?.getBoundingClientRect().height ?? 76;
      observer = new IntersectionObserver(update, { rootMargin: `-${Math.round(headerHeight + 8)}px 0px -60% 0px`, threshold: [0, .01, 1] });
      sections.forEach(section => observer?.observe(section));
      update();
    };
    observe();
    window.addEventListener('hashchange', update);
    window.addEventListener('scroll', update, { passive: true });
    const resizeObserver = typeof ResizeObserver === 'undefined' || !header ? undefined : new ResizeObserver(observe);
    if (resizeObserver && header) resizeObserver.observe(header);
    return () => { observer?.disconnect(); resizeObserver?.disconnect(); window.removeEventListener('hashchange', update); window.removeEventListener('scroll', update); };
  }, [pathname]);
  return <header className="site-header" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}><div className="container nav-inner">
    <HomeLink href="/#inicio" className="wordmark" aria-label="iarmo, inicio" onClick={() => setOpen(false)}><Brand priority /></HomeLink>
    <button ref={toggle} className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Menú'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><span aria-hidden="true">{open ? '−' : '+'}</span><span className="menu-label">{open ? 'Cerrar' : 'Menú'}</span></button>
    <nav ref={nav} id="main-navigation" aria-label="Principal" className={open ? 'main-nav is-open' : 'main-nav'}><span ref={indicator} className="nav-active-indicator" aria-hidden="true" />
      {site.navigation.map(item => <HomeLink key={item.href} href={item.href} aria-current={pathname === '/' && active === item.href.slice(2) ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}</HomeLink>)}
    </nav>
    <HomeLink className="button button-primary nav-cta" href="/#contacto" aria-current={pathname === "/" && active === "contacto" ? "location" : undefined} onClick={() => setOpen(false)} data-analytics="diagnostic_cta"><span>Agenda un diagnóstico</span><Arrow diagonal /></HomeLink>
  </div></header>;
}
