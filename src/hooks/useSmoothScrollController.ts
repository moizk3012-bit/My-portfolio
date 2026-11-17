import { useEffect, useMemo, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/env';
import type { SmoothScrollApi } from '@/context/contexts';

/** Creates the Lenis smooth-scroll instance (skipped for reduced motion) and its API. */
export function useSmoothScrollController(): SmoothScrollApi {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return useMemo<SmoothScrollApi>(
    () => ({
      scrollTo(target, { immediate = false } = {}) {
        const lenis = lenisRef.current;
        const offset = typeof target === 'number' ? 0 : -40;
        if (lenis) lenis.scrollTo(target, immediate ? { immediate: true, force: true } : { offset, duration: 1.2, force: true });
        else if (typeof target === 'number') window.scrollTo(0, target);
        else target.scrollIntoView();
      },
      lock(locked) {
        const lenis = lenisRef.current;
        if (lenis) {
          if (locked) lenis.stop();
          else lenis.start();
        }
        document.documentElement.classList.toggle('is-locked', locked);
      },
      velocity: () => lenisRef.current?.velocity ?? 0,
    }),
    []
  );
}
