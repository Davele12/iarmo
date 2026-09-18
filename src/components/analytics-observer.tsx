'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/integrations/analytics';

export function AnalyticsObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/planes') track('plans_view');
    if (pathname.startsWith('/casos/')) track('case_view', { location: pathname });
    const listener = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('[data-analytics]') : null;
      const name = target?.getAttribute('data-analytics');
      if (name === 'diagnostic_cta' || name === 'contact') track(name, { location: pathname });
    };
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [pathname]);
  return null;
}
