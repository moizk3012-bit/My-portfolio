import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ScrollTrigger } from '@/lib/motion';
import { coverScreen, revealScreen } from '@/lib/curtain';
import { prefersReducedMotion } from '@/lib/env';
import { elementForHash, normalizePath, pageLabel } from '@/lib/routes';
import { useMenu, usePreview, useSmoothScroll } from './useContexts';
import type { TransitionApi } from '@/context/contexts';

/**
 * Curtain page transitions on top of React Router:
 * cover the screen → change route → wait for the new page to mount → reveal it.
 * Browser back/forward changes the route directly; the page just resets and re-enters.
 */
export function usePageTransitionController() {
  const navigate = useNavigate();
  const location = useLocation();
  const scroll = useSmoothScroll();
  const menu = useMenu();
  const preview = usePreview();

  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [label, setLabel] = useState('');
  const [enterCount, setEnterCount] = useState(0);
  const busy = useRef(false);
  const routeCommitted = useRef<(() => void) | null>(null);
  const currentPath = useRef(location.pathname);

  const focusPage = () => document.getElementById('main')?.focus({ preventScroll: true });

  const markReady = useCallback(() => {
    scroll.lock(false);
    setEnterCount((c) => c + 1);
  }, [scroll]);

  const navigateTo = useCallback(
    async (href: string) => {
      if (busy.current || !rootRef.current || !labelRef.current) return;
      const target = new URL(href, window.location.href);

      // Same page: just scroll to the anchor (or the top).
      if (normalizePath(target.pathname) === normalizePath(currentPath.current)) {
        menu.close();
        scroll.scrollTo(elementForHash(target.hash) ?? 0);
        return;
      }

      busy.current = true;
      menu.close();
      preview.hide();
      setLabel(pageLabel(target.pathname));
      const curtain = { root: rootRef.current, label: labelRef.current, top: topRef.current, bottom: bottomRef.current };
      const reduced = prefersReducedMotion();

      await coverScreen(curtain, reduced);
      await new Promise<void>((resolve) => {
        routeCommitted.current = resolve;
        navigate(target.pathname + target.hash);
      });
      scroll.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
      await revealScreen(curtain, reduced);
      busy.current = false;
      setEnterCount((c) => c + 1);
      focusPage();
      const anchor = elementForHash(target.hash);
      if (anchor) scroll.scrollTo(anchor);
    },
    [menu, navigate, preview, scroll]
  );

  // Runs after the new route's components (and their effects) have mounted.
  useEffect(() => {
    if (currentPath.current === location.pathname) return;
    currentPath.current = location.pathname;
    if (routeCommitted.current) {
      routeCommitted.current();
      routeCommitted.current = null;
      return;
    }
    // Back/forward navigation (no curtain): reset scroll and replay the entrance.
    menu.close();
    preview.hide();
    scroll.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
    setEnterCount((c) => c + 1);
  }, [location.pathname, menu, preview, scroll]);

  const api = useMemo<TransitionApi>(() => ({ navigateTo, enterCount, markReady }), [navigateTo, enterCount, markReady]);
  return { api, label, rootRef, labelRef, topRef, bottomRef };
}
