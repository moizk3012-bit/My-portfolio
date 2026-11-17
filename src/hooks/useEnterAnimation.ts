import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/env';
import { usePageTransition } from './useContexts';

/**
 * Plays the page entrance ([data-enter] and the header rise into place)
 * each time the page is revealed — after the preloader or a page transition.
 */
export function useEnterAnimation(scopeRef: RefObject<HTMLElement | null>) {
  const { enterCount } = usePageTransition();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!enterCount || !scope || prefersReducedMotion()) return;
    const items = scope.querySelectorAll('[data-enter], [data-header]');
    const tween = gsap.fromTo(items, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.06, clearProps: 'transform' });
    return () => {
      tween.kill();
    };
  }, [enterCount, scopeRef]);
}
