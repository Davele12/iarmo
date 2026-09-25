'use client';

import { useEffect } from 'react';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

type RoutePoint = { x: number; y: number };
type MethodGeometry = {
  futurePath: SVGPathElement;
  activePath: SVGPathElement;
  dot: SVGCircleElement;
  halo: SVGCircleElement;
  length: number;
  samples: RoutePoint[];
};

// Progressive enhancement: all content is visible in the server HTML.
export function HomeMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.home-story');
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(min-width: 961px) and (hover: hover) and (pointer: fine)');
    const compact = window.matchMedia('(max-width: 600px)');
    const hero = root.querySelector<HTMLElement>('#inicio');
    const header = document.querySelector<HTMLElement>('.site-header');
    let pointer: { x: number; y: number } | undefined;
    const sections = [...root.querySelectorAll<HTMLElement>('[data-section]')];
    const methodSection = sections.find(section => section.dataset.motionSection === 'method');
    const targets = [...root.querySelectorAll<HTMLElement>('[data-reveal], .section-heading, .solution-item, .plan-card, .about-story > div')];
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('reveal-entered');
          observer?.unobserve(entry.target);
        }
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
      : undefined;

    for (const target of targets) {
      const siblings = [...(target.parentElement?.children ?? [])];
      target.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(target), 3) * 80}ms`);
      if (!reduced.matches && target.getBoundingClientRect().top > window.innerHeight) {
        target.classList.add('reveal-pending');
        observer?.observe(target);
      }
    }

    // Method route: geometry (marker positions, path length, sampled points) is only
    // recomputed when layout actually changes (mount + ResizeObserver). Per-frame scroll
    // work below only interpolates cached samples and writes transform/opacity/stroke — no
    // layout reads in the hot path.
    let methodGeometry: MethodGeometry | null = null;
    const SAMPLE_COUNT = 48;
    const buildMethodPath = (points: RoutePoint[], bulge: number) => {
      let d = `M${points[0].x},${points[0].y} `;
      for (let index = 0; index < points.length - 1; index++) {
        const start = points[index];
        const end = points[index + 1];
        const direction = index % 2 === 0 ? 1 : -1;
        const c1x = start.x + bulge * direction;
        const c1y = start.y + (end.y - start.y) * .33;
        const c2x = end.x + bulge * direction;
        const c2y = start.y + (end.y - start.y) * .66;
        d += `C${c1x},${c1y} ${c2x},${c2y} ${end.x},${end.y} `;
      }
      return d;
    };
    const rebuildMethodRoute = () => {
      if (!methodSection) { methodGeometry = null; return; }
      const svg = methodSection.querySelector<SVGSVGElement>('.method-route-svg');
      const futurePath = methodSection.querySelector<SVGPathElement>('.method-route-path-future');
      const activePath = methodSection.querySelector<SVGPathElement>('.method-route-path-active');
      const dot = methodSection.querySelector<SVGCircleElement>('.method-route-dot');
      const halo = methodSection.querySelector<SVGCircleElement>('.method-route-dot-halo');
      const stepsEl = methodSection.querySelector<HTMLElement>('.method-steps');
      const markers = [...methodSection.querySelectorAll<HTMLElement>('.method-step-marker i')];
      if (!svg || !futurePath || !activePath || !dot || !halo || !stepsEl || markers.length < 2) { methodGeometry = null; return; }
      const containerRect = stepsEl.getBoundingClientRect();
      if (containerRect.width <= 0 || containerRect.height <= 0) { methodGeometry = null; return; }
      svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);
      const points = markers.map(marker => {
        const rect = marker.getBoundingClientRect();
        return { x: rect.left + rect.width / 2 - containerRect.left, y: rect.top + rect.height / 2 - containerRect.top };
      });
      const bulge = compact.matches ? 8 : fine.matches ? 22 : 14;
      const d = buildMethodPath(points, bulge);
      futurePath.setAttribute('d', d);
      activePath.setAttribute('d', d);
      const length = activePath.getTotalLength();
      const samples: RoutePoint[] = [];
      for (let index = 0; index <= SAMPLE_COUNT; index++) {
        const point = activePath.getPointAtLength((index / SAMPLE_COUNT) * length);
        samples.push({ x: point.x, y: point.y });
      }
      activePath.style.strokeDasharray = String(length);
      methodGeometry = { futurePath, activePath, dot, halo, length, samples };
    };

    let scrollFrame = 0;
    const updateScrollMotion = () => {
      scrollFrame = 0;
      const viewport = window.innerHeight || 1;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const headerHeight = header?.getBoundingClientRect().height ?? 0;
        const progress = reduced.matches ? 0 : clamp((headerHeight - rect.top) / Math.max(1, rect.height + headerHeight));
        const maxTravel = window.innerWidth <= 600 ? 16 : window.innerWidth <= 960 ? 24 : 48;
        const enabled = !reduced.matches && fine.matches && rect.bottom > 0 && rect.top < viewport;
        const x = enabled && pointer ? clamp((pointer.x - rect.left) / rect.width * 2 - 1, -1, 1) * 8 : 0;
        const y = enabled && pointer ? clamp((pointer.y - rect.top) / rect.height * 2 - 1, -1, 1) * 8 : 0;
        hero.style.setProperty('--hero-progress', String(progress));
        hero.style.setProperty('--hero-halo-x', `${progress * maxTravel / 2}px`);
        hero.style.setProperty('--hero-halo-y', `${progress * maxTravel}px`);
        hero.style.setProperty('--hero-ring-y', `${progress * maxTravel / 2}px`);
        hero.style.setProperty('--hero-ring-scale', String(1 + progress * .04));
        hero.style.setProperty('--hero-pointer-x', `${x}px`);
        hero.style.setProperty('--hero-pointer-y', `${y}px`);
      }
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const progress = reduced.matches ? 1 : clamp((viewport - rect.top) / Math.max(1, viewport + rect.height));
        const exit = reduced.matches ? 0 : clamp((viewport * .42 - rect.bottom) / Math.max(1, viewport * .42));
        section.style.setProperty('--section-progress', String(progress));
        section.style.setProperty('--section-exit', String(exit));
        section.style.setProperty('--section-opacity', String(1 - exit * .14));
        section.style.setProperty('--section-shift', `${exit * -8}px`);
        if (section.dataset.motionSection === 'method') {
          const methodTravel = Math.max(1, rect.height - viewport);
          const methodProgress = reduced.matches ? 1 : clamp(-rect.top / methodTravel);
          const steps = [...section.querySelectorAll<HTMLElement>('.method-step')];
          const methodActive = reduced.matches
            ? Math.max(0, steps.length - 1)
            : Math.min(Math.max(0, steps.length - 1), Math.floor(methodProgress * steps.length));
          const methodPosition = methodProgress * steps.length;
          const transitionProgress = methodActive >= steps.length - 1
            ? 1
            : clamp((methodPosition - methodActive - .25) / .65);
          section.style.setProperty('--method-progress', String(methodProgress));
          steps.forEach((step, stepIndex) => {
            const isActive = stepIndex === methodActive;
            const isPast = stepIndex < methodActive;
            const isNext = stepIndex === methodActive + 1;
            const state = isActive ? 'active' : isPast ? 'completed' : isNext ? 'next' : 'future';
            const opacity = reduced.matches ? 1 : isActive ? 1 : isPast ? .82 : isNext ? .58 + transitionProgress * .42 : .58;
            const scale = reduced.matches ? 1 : isActive ? 1.01 : isPast ? .985 : isNext ? .96 + transitionProgress * .05 : .96;
            const shift = reduced.matches ? 0 : isActive ? 0 : isPast ? -2 : isNext ? 8 - transitionProgress * 8 : 6;
            step.style.setProperty('--phase-opacity', String(opacity));
            step.style.setProperty('--phase-scale', String(scale));
            step.style.setProperty('--phase-shift', `${shift}px`);
            step.dataset.phaseState = state;
            step.classList.toggle('is-active', isActive);
            step.classList.toggle('is-past', isPast);
            step.classList.toggle('is-next', isNext);
            if (stepIndex === methodActive) step.setAttribute('aria-current', 'step');
            else step.removeAttribute('aria-current');
          });
          if (methodGeometry) {
            const routeProgress = reduced.matches ? 1 : clamp(methodPosition / steps.length);
            const sampleIndex = routeProgress * (methodGeometry.samples.length - 1);
            const lowerIndex = Math.floor(sampleIndex);
            const upperIndex = Math.min(methodGeometry.samples.length - 1, lowerIndex + 1);
            const mix = sampleIndex - lowerIndex;
            const lower = methodGeometry.samples[lowerIndex];
            const upper = methodGeometry.samples[upperIndex];
            const point = { x: lower.x + (upper.x - lower.x) * mix, y: lower.y + (upper.y - lower.y) * mix };
            methodGeometry.activePath.style.strokeDashoffset = String(methodGeometry.length * (1 - routeProgress));
            methodGeometry.dot.setAttribute('cx', String(point.x));
            methodGeometry.dot.setAttribute('cy', String(point.y));
            methodGeometry.halo.setAttribute('cx', String(point.x));
            methodGeometry.halo.setAttribute('cy', String(point.y));
          }
        }
      });
    };
    const requestScrollMotion = () => { if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollMotion); };
    const resetReveal = () => {
      if (reduced.matches) {
        observer?.disconnect();
        targets.forEach(target => target.classList.remove('reveal-pending'));
      } else {
        for (const target of targets) {
          if (target.classList.contains('reveal-entered')) continue;
          if (target.getBoundingClientRect().top > window.innerHeight) {
            target.classList.add('reveal-pending');
            observer?.observe(target);
          }
        }
      }
      requestScrollMotion();
    };
    const focusReveal = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) event.target.closest('.reveal-pending')?.classList.remove('reveal-pending');
    };
    const resetPointer = () => {
      pointer = undefined;
      requestScrollMotion();
    };
    const pointerMove = (event: PointerEvent) => {
      if (reduced.matches || !fine.matches || event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX, y: event.clientY };
      requestScrollMotion();
    };
    const handleGeometryChange = () => {
      rebuildMethodRoute();
      requestScrollMotion();
    };

    reduced.addEventListener('change', resetReveal);
    reduced.addEventListener('change', resetPointer);
    reduced.addEventListener('change', handleGeometryChange);
    fine.addEventListener('change', resetPointer);
    fine.addEventListener('change', handleGeometryChange);
    compact.addEventListener('change', handleGeometryChange);
    root.addEventListener('focusin', focusReveal);
    hero?.addEventListener('pointermove', pointerMove, { passive: true });
    hero?.addEventListener('pointerleave', resetPointer);
    const rootResizeObserver = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(handleGeometryChange);
    rootResizeObserver?.observe(root);
    window.addEventListener('scroll', requestScrollMotion, { passive: true });
    window.addEventListener('resize', requestScrollMotion);
    rebuildMethodRoute();
    updateScrollMotion();

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(scrollFrame);
      targets.forEach(target => { target.classList.remove('reveal-pending', 'reveal-entered'); target.style.removeProperty('--reveal-delay'); });
      sections.forEach(section => {
        section.style.removeProperty('--section-progress');
        section.style.removeProperty('--section-exit');
        section.style.removeProperty('--section-opacity');
        section.style.removeProperty('--section-shift');
        section.style.removeProperty('--method-progress');
        section.querySelectorAll<HTMLElement>('.method-step').forEach(step => {
          step.classList.remove('is-active', 'is-past', 'is-next');
          delete step.dataset.phaseState;
          for (const property of ['--phase-opacity', '--phase-scale', '--phase-shift']) step.style.removeProperty(property);
          step.removeAttribute('aria-current');
        });
      });
      if (methodSection) {
        methodSection.querySelector<SVGPathElement>('.method-route-path-future')?.removeAttribute('d');
        const activePath = methodSection.querySelector<SVGPathElement>('.method-route-path-active');
        activePath?.removeAttribute('d');
        activePath?.style.removeProperty('stroke-dasharray');
        activePath?.style.removeProperty('stroke-dashoffset');
        methodSection.querySelector<SVGSVGElement>('.method-route-svg')?.removeAttribute('viewBox');
      }
      reduced.removeEventListener('change', resetReveal);
      reduced.removeEventListener('change', resetPointer);
      reduced.removeEventListener('change', handleGeometryChange);
      fine.removeEventListener('change', resetPointer);
      fine.removeEventListener('change', handleGeometryChange);
      compact.removeEventListener('change', handleGeometryChange);
      root.removeEventListener('focusin', focusReveal);
      hero?.removeEventListener('pointermove', pointerMove);
      hero?.removeEventListener('pointerleave', resetPointer);
      rootResizeObserver?.disconnect();
      window.removeEventListener('scroll', requestScrollMotion);
      window.removeEventListener('resize', requestScrollMotion);
      for (const property of ['--hero-progress', '--hero-halo-x', '--hero-halo-y', '--hero-ring-y', '--hero-ring-scale', '--hero-pointer-x', '--hero-pointer-y']) hero?.style.removeProperty(property);
    };
  }, []);
  return null;
}
