import Link from 'next/link';
import { site } from '@/config/site';
export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top"><div><Link href="/" className="wordmark" aria-label="iarmo, inicio">iarmo<span aria-hidden="true">↗</span></Link><p>Tu brazo tecnológico<br />para crecer.</p></div><div className="footer-navigation"><nav aria-label="Navegación del pie">{site.navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav><p>Automatización · Datos · Software<br />Inteligencia Artificial<br /><span>Hecho para empresas. Desde Colombia.</span></p></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} iarmo</p><div><Link href="/privacy">Privacidad</Link><Link href="/terms">Términos de uso</Link><Link href="/diagnostico" data-analytics="contact">Hablemos<ArrowText /></Link></div></div></div></footer>;
}
function ArrowText() { return <span aria-hidden="true"> ↗</span>; }
