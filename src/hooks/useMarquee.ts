import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from '@/lib/motion';
import { useReducedMotion } from './useMediaQuery';
import { useSmoothScroll } from './useContexts';

interface Options {
  /** xPercent moved per frame at rest */
  speed?: number;
  /** Fixed direction (1 → right, -1 → left). Omit to follow the scroll direction. */
  direction?: 1 | -1;
}

/**
 * Infinite marquee. The track holds two identical copies and loops between
 * xPercent 0 and -50; it speeds up with scroll speed and (unless `direction`
 * is fixed) flips with the scroll direction.
 */
export function useMarquee(trackRef: RefObject<HTMLElement | null>, { speed = 0.04, direction }: Options = {}) {
  const reduced = useReducedMotion();
  const scroll = useSmoothScroll();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;
    let x = 0;
    let dir = direction ?? -1;
    const tick = () => {
      const v = scroll.velocity();
      if (!direction) {
        if (v > 0.2) dir = -1;
        else if (v < -0.2) dir = 1;
      }
      x += dir * (speed + Math.min(Math.abs(v), 60) * 0.006);
      if (x <= -50) x += 50;
      if (x > 0) x -= 50;
      gsap.set(track, { xPercent: x });
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [trackRef, speed, direction, reduced, scroll]);
}

/** Rotates an arrow to point down while scrolling down and up while scrolling up. */
export function useScrollDirectionArrow(ref: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  const scroll = useSmoothScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let current = 1;
    const tick = () => {
      const v = scroll.velocity();
      const dir = v > 0.2 ? 1 : v < -0.2 ? -1 : 0;
      if (dir && dir !== current) {
        current = dir;
        gsap.to(el, { rotate: dir === 1 ? 0 : 180, duration: 0.6, ease: 'power3.out' });
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [ref, reduced, scroll]);
}
