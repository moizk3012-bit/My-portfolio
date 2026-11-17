import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/env';
import { useIsMobile } from './useMediaQuery';
import { useMenu, useSmoothScroll } from './useContexts';

// The left edge bulges out while the panel moves, then straightens.
const CURVED = 'M100 0 L100 0 Q-100 500 100 1000 L100 1000 Z';
const FLAT = 'M100 0 L100 0 Q100 500 100 1000 L100 1000 Z';

/** Reports to the menu context when this page's header scrolls out of view. */
export function useHeaderWatch(headerRef: RefObject<HTMLElement | null>) {
  const { setHeaderPassed } = useMenu();
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const st = ScrollTrigger.create({
      trigger: header,
      start: 'bottom top',
      onEnter: () => setHeaderPassed(true),
      onLeaveBack: () => setHeaderPassed(false),
    });
    return () => {
      st.kill();
      setHeaderPassed(false);
    };
  }, [headerRef, setHeaderPassed]);
}

/** Round menu button: always shown on phones, otherwise once the header is gone or the menu is open. */
export function useHamburgerVisibility(buttonRef: RefObject<HTMLElement | null>) {
  const { open, headerPassed } = useMenu();
  const mobile = useIsMobile();
  const show = open || headerPassed || mobile;

  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { scale: show ? 1 : 0, duration: 0.45, ease: show ? 'back.out(1.6)' : 'power3.in', overwrite: 'auto' });
  }, [buttonRef, show]);
}

interface MenuPanelRefs {
  panel: RefObject<HTMLElement | null>;
  overlay: RefObject<HTMLElement | null>;
  curve: RefObject<SVGPathElement | null>;
}

/**
 * Side-menu panel: slides in/out with a curved edge, locks page scroll,
 * moves focus in on open and back to the menu button on close, closes on Escape.
 * The panel is `inert` while closed so its links are not tabbable.
 */
export function useMenuPanel({ panel, overlay, curve }: MenuPanelRefs) {
  const { open, close, buttonRef } = useMenu();
  const scroll = useSmoothScroll();
  const wasOpen = useRef(false);
  const hiddenX = () => (panel.current?.offsetWidth ?? 0) + window.innerWidth * 0.15;

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      // React has already committed `inert={!open}` on the panel, so focus can move in now.
      const d = prefersReducedMotion() ? 0 : open ? 0.8 : 0.7;

      if (open) {
        wasOpen.current = true;
        scroll.lock(true);
        el.querySelector<HTMLElement>('.menu-link')?.focus({ preventScroll: true });
        gsap
          .timeline()
          .to(overlay.current, { autoAlpha: 1, duration: d * 0.6 }, 0)
          .fromTo(el, { x: hiddenX }, { x: 0, duration: d, ease: 'power3.inOut' }, 0)
          .fromTo(curve.current, { attr: { d: CURVED } }, { attr: { d: FLAT }, duration: d * 1.1, ease: 'power3.inOut' }, 0)
          .fromTo(el.querySelectorAll('.menu-link'), { x: 80 }, { x: 0, duration: d, stagger: 0.05, ease: 'power3.out' }, d * 0.2);
        return;
      }

      if (!wasOpen.current) {
        gsap.set(el, { x: hiddenX }); // initial, closed state
        return;
      }
      wasOpen.current = false;
      scroll.lock(false);
      if (el.contains(document.activeElement)) buttonRef.current?.focus({ preventScroll: true });
      gsap
        .timeline()
        .to(overlay.current, { autoAlpha: 0, duration: d * 0.6 }, 0)
        .set(curve.current, { attr: { d: CURVED } }, 0)
        .to(el, { x: hiddenX, duration: d, ease: 'power3.inOut' }, 0)
        .to(curve.current, { attr: { d: FLAT }, duration: d, ease: 'power3.in' }, 0);
    },
    { dependencies: [open], revertOnUpdate: false }
  );

  // Escape closes; resizing keeps the closed panel fully off-screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!wasOpen.current && panel.current) gsap.set(panel.current, { x: hiddenX() });
      }, 150);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
    // hiddenX only reads refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close, panel]);
}
