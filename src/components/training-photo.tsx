'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function TrainingPhoto({ src }: { src: string }) {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const photo = photoRef.current;
    if (!photo || !('IntersectionObserver' in window)) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    // SSR and reduced motion retain a clear, static photograph.
    if (reduced.matches) return;

    photo.dataset.photoState = 'pending';
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .2)) return;
      photo.dataset.photoState = 'entered';
      observer.disconnect();
    }, { threshold: .2 });

    const stopMotion = () => {
      if (!reduced.matches) return;
      observer.disconnect();
      delete photo.dataset.photoState;
    };

    observer.observe(photo);
    reduced.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', stopMotion);
      delete photo.dataset.photoState;
    };
  }, []);

  return (
    <div className="training-photo" ref={photoRef} aria-hidden="true">
      <div className="training-photo-motion">
        <div className="training-photo-crop">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 480px) calc(217vw - 87px), 960px"
            loading="lazy"
            className="training-photo-image"
          />
        </div>
      </div>
    </div>
  );
}
