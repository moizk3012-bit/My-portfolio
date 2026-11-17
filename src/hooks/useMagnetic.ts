import { useEffect } from 'react';
import type { RefObject } from 'react';
import { gsap } from '@/lib/motion';
import { useFinePointer } from './useMediaQuery';

interface Options {
  /** How far the element follows the cursor (0–1) */
  strength?: number;
}

/**
 * Magnetic hover: the element drifts toward the cursor and its `.btn-text`
 * label drifts further. A child `.btn-fill` rises from the bottom on enter and
 * leaves through the top. Magnetic movement only on fine pointers (mouse).
 */
export function useMagnetic(ref: RefObject<HTMLElement | null>, { strength = 0.3 }: Options = {}) {
  const fine = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fill = el.querySelector<HTMLElement>(':scope > .btn-fill');
    const text = el.querySelector<HTMLElement>('.btn-text');
    const ease = 'elastic.out(1, 0.35)';
    const xTo = gsap.quickTo(el, 'x', { duration: 1, ease });
    const yTo = gsap.quickTo(el, 'y', { duration: 1, ease });
    const txTo = text ? gsap.quickTo(text, 'x', { duration: 1, ease }) : null;
    const tyTo = text ? gsap.quickTo(text, 'y', { duration: 1, ease }) : null;
    let center: { x: number; y: number } | null = null;
    let fillTween: gsap.core.Tween | undefined;

    const onEnter = () => {
      if (fill) {
        fillTween?.kill();
        fillTween = gsap.fromTo(fill, { top: '100%' }, { top: '-50%', duration: 0.55, ease: 'power3.out' });
      }
      el.classList.add('is-hovered');
      if (!fine) return;
      const r = el.getBoundingClientRect();
      center = { x: r.left - Number(gsap.getProperty(el, 'x')) + r.width / 2, y: r.top - Number(gsap.getProperty(el, 'y')) + r.height / 2 };
    };
    const onMove = (e: MouseEvent) => {
      if (!center) return;
      const dx = e.clientX - center.x;
      const dy = e.clientY - center.y;
      xTo(dx * strength);
      yTo(dy * strength);
      txTo?.(dx * strength * 0.45);
      tyTo?.(dy * strength * 0.45);
    };
    const onLeave = () => {
      if (fill) {
        fillTween?.kill();
        fillTween = gsap.to(fill, { top: '-150%', duration: 0.55, ease: 'power3.inOut', onComplete: () => void gsap.set(fill, { top: '100%' }) });
      }
      el.classList.remove('is-hovered');
      center = null;
      xTo(0);
      yTo(0);
      txTo?.(0);
      tyTo?.(0);
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      fillTween?.kill();
      gsap.set([el, text].filter(Boolean), { x: 0, y: 0 });
    };
  }, [ref, strength, fine]);
}
