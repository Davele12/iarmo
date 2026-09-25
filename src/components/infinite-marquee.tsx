import type { ReactNode } from 'react';

export function InfiniteMarquee({ children, label, className = '', reverse = false }: { children: ReactNode; label: string; className?: string; reverse?: boolean }) {
  return <div className={`infinite-marquee ${reverse ? 'infinite-marquee-reverse' : ''} ${className}`.trim()} role="group" aria-label={label}>
    <div className="infinite-marquee-track">
      <div className="infinite-marquee-set">{children}</div>
      <div className="infinite-marquee-set" aria-hidden="true">{children}</div>
      <div className="infinite-marquee-set" aria-hidden="true">{children}</div>
    </div>
  </div>;
}
