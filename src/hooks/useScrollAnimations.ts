import { useRef } from 'react';
import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/motion';
import { useReducedMotion } from './useMediaQuery';

// Scroll-driven animations. useGSAP reverts every tween and ScrollTrigger
// created here when the component unmounts, so nothing leaks between pages.

/** Words (`.wi` spans rendered by <WordReveal>) slide up when scrolled into view. */
export function useWordReveal(ref: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current.querySelectorAll('.wi'), {
        yPercent: 110,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.015,
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      });
    },
    { dependencies: [reduced] }
  );
}

/** Element fades and rises into place when scrolled into view. */
export function useFadeReveal(ref: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%' } });
    },
    { dependencies: [reduced] }
  );
}

/**
 * Drifts the element vertically while it crosses the viewport.
 * `amount` is a fraction of its height (negative = moves up).
 */
export function useParallax(ref: RefObject<HTMLElement | null>, amount: number) {
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { yPercent: -amount * 50 },
        { yPercent: amount * 50, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    },
    { dependencies: [amount, reduced] }
  );
}

/** Hero photo sinks slightly as the hero scrolls away. */
export function useHeroParallax(heroRef: RefObject<HTMLElement | null>, photoRef: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced || !heroRef.current || !photoRef.current) return;
      gsap.to(photoRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { dependencies: [reduced] }
  );
}

/** The curved edge above the footer flattens while the footer content rises in. */
export function useFooterCurve(
  footerRef: RefObject<HTMLElement | null>,
  curveRef: RefObject<HTMLElement | null>,
  bodyRef: RefObject<HTMLElement | null>
) {
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (reduced || !footerRef.current || !curveRef.current) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: footerRef.current, start: 'top bottom', end: 'bottom bottom', scrub: true } });
      tl.fromTo(curveRef.current, { height: '10vh' }, { height: 0, ease: 'none' }, 0);
      if (bodyRef.current) tl.fromTo(bodyRef.current, { yPercent: -25 }, { yPercent: 0, ease: 'none' }, 0);
    },
    { dependencies: [reduced] }
  );
}

/** Number counts up from 0 to `value` the first time it scrolls into view. */
export function useCountUp(ref: RefObject<HTMLElement | null>, value: number) {
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      const el = ref.current;
      if (reduced || !el) return;
      const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
      const counter = { v: 0 };
      el.textContent = '0';
      gsap.to(counter, {
        v: value,
        duration: 2,
        ease: 'power3.out',
        onUpdate: () => void (el.textContent = fmt(counter.v)),
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
      return () => void (el.textContent = fmt(value));
    },
    { dependencies: [value, reduced] }
  );
}

/** Items fade up with a stagger whenever `key` changes (e.g. a filter) — not on first mount. */
export function useStaggerIn(scopeRef: RefObject<HTMLElement | null>, selector: string, key: unknown) {
  const reduced = useReducedMotion();
  const mounted = useRef(false);
  useGSAP(
    () => {
      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      if (reduced || !scopeRef.current) return;
      gsap.fromTo(scopeRef.current.querySelectorAll(selector), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' });
    },
    { dependencies: [key, reduced], scope: scopeRef }
  );
}
