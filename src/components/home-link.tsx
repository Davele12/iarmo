'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<'a'>, 'href'> & { href: string; interest?: string };

// Native fragments keep browser history and keyboard navigation on the home.
export function HomeLink({ href, interest, onClick, ...props }: Props) {
  const pathname = usePathname();
  const local = pathname === '/' && href.startsWith('/#');
  const handleClick: ComponentProps<'a'>['onClick'] = event => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (local) {
      if (interest) window.dispatchEvent(new CustomEvent('iarmo:contact-interest', { detail: interest }));
      const target = document.getElementById(href.slice(2));
      // Focus without scrolling; the native anchor performs the smooth scroll.
      target?.focus({ preventScroll: true });
    }
  };
  return local
    ? <a {...props} href={href.slice(1)} onClick={handleClick} />
    : <Link {...props} href={interest ? `/?interes=${encodeURIComponent(interest)}${href.slice(1)}` : href} onClick={handleClick} />;
}
