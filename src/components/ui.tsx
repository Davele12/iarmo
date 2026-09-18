import Link from 'next/link';
import { Arrow } from './icons';

export function Cta({ children = 'Agenda un diagnóstico', href = '/diagnostico', secondary = false, className = '' }: { children?: React.ReactNode; href?: string; secondary?: boolean; className?: string }) {
  return <Link className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`} href={href} data-analytics={href.startsWith('/diagnostico') ? 'diagnostic_cta' : undefined}>{children}<Arrow /></Link>;
}
export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'text-white' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
export function Breadcrumb({ current, parent }: { current: string; parent?: { label: string; href: string } }) {
  return <nav aria-label="Ruta de navegación" className="breadcrumb"><ol><li><Link href="/">Inicio</Link></li>{parent && <li><Link href={parent.href}>{parent.label}</Link></li>}<li aria-current="page">{current}</li></ol></nav>;
}
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></header>;
}
export function FinalCta() {
  return <section className="final-cta"><div className="container final-cta-inner"><div><p className="eyebrow">Hablemos de tu empresa</p><h2>Empecemos por lo que<br />hoy te está frenando.</h2><p>No necesitas tener la solución. Empecemos por entender el reto.</p></div><Cta /></div></section>;
}
