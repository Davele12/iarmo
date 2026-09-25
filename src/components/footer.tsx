import Link from 'next/link';
import { site } from '@/config/site';
import { Brand } from './brand';
import { HomeLink } from './home-link';
export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link href="/" className="wordmark" aria-label="iarmo, inicio"><Brand /></Link><p>{site.tagline}</p></div><div className="footer-navigation"><nav aria-label="Navegación del pie">{site.navigation.map(item => <HomeLink key={item.href} href={item.href}>{item.label}</HomeLink>)}</nav><p>Automatización · Datos · Software<br />Inteligencia Artificial<br /><span>Hecho para empresas. Desde Colombia.</span></p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} iarmo</p><div><Link href="/privacy">Privacidad</Link><Link href="/terms">Términos de uso</Link><HomeLink href="/#contacto" data-analytics="contact">Agenda un diagnóstico<ArrowText /></HomeLink></div></div></div></footer>;
}
function ArrowText() { return <span aria-hidden="true"> ↗</span>; }
