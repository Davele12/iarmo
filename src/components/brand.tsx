export function Brand({ priority = false }: { priority?: boolean }) {
  // Pre-sized transparent WebP, used at 64–124 CSS px; no runtime image processing.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/iarmo-wordmark.webp" alt="iarmo" width={328} height={105} className="brand-image" loading={priority ? 'eager' : 'lazy'} decoding="async" />;
}
