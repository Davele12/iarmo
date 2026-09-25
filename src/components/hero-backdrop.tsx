/** Static server-rendered artwork; HomeMotion enhances only its CSS variables. */
export function HeroBackdrop({ variant = 'hero' }: { variant?: 'hero' | 'transition' }) {
  return <div className={`hero-backdrop hero-backdrop-${variant}`} aria-hidden="true">
    <div className="hero-backdrop-pointer">
      <div className="hero-backdrop-halo" />
      {variant === 'hero' && <div className="hero-backdrop-rings">
        <span className="hero-backdrop-ring" />
        <span className="hero-backdrop-ring hero-backdrop-ring-inner" />
      </div>}
    </div>
  </div>;
}
