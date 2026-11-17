import { useEffect, useMemo, useRef } from 'react';
import { projects } from '@/data';
import { gsap } from '@/lib/motion';
import { hasFinePointer } from '@/lib/env';
import type { PreviewApi } from '@/context/contexts';

const indexOf = new Map(projects.map((p, i) => [p.slug, i]));

/**
 * Drives the floating project image + "View" circle that follow the cursor
 * over project lists. Returns the API for rows and the refs for the overlay.
 */
export function usePreviewController() {
  const modalRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followers = useRef<((x: number, y: number) => void) | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    const cursor = cursorRef.current;
    if (!modal || !cursor || !hasFinePointer()) return;
    gsap.set([modal, cursor], { xPercent: -50, yPercent: -50, scale: 0 });
    const mx = gsap.quickTo(modal, 'x', { duration: 0.8, ease: 'power3' });
    const my = gsap.quickTo(modal, 'y', { duration: 0.8, ease: 'power3' });
    const cx = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
    const cy = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });
    followers.current = (x, y) => {
      mx(x);
      my(y);
      cx(x);
      cy(y);
    };
    const onMove = (e: globalThis.MouseEvent) => followers.current?.(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      followers.current = null;
    };
  }, []);

  const api = useMemo<PreviewApi>(
    () => ({
      show(e) {
        if (!followers.current) return;
        gsap.set([modalRef.current, cursorRef.current], { x: e.clientX, y: e.clientY });
        gsap.to([modalRef.current, cursorRef.current], { scale: 1, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      },
      hide() {
        if (!followers.current) return;
        gsap.to([modalRef.current, cursorRef.current], { scale: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' });
      },
      select(slug) {
        const i = indexOf.get(slug) ?? 0;
        gsap.to(slidesRef.current, { yPercent: -100 * i, duration: 0.6, ease: 'power3.inOut', overwrite: 'auto' });
      },
    }),
    []
  );

  return { api, modalRef, slidesRef, cursorRef };
}
