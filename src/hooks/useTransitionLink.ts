import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import { isExternal } from '@/lib/routes';
import { usePageTransition } from './useContexts';

/**
 * Click handler for internal links: plays the curtain transition instead of
 * a hard navigation. Leaves modified clicks (new tab, etc.) and external links alone.
 */
export function useTransitionLink(href: string, onNavigate?: () => void) {
  const { navigateTo } = usePageTransition();
  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (isExternal(href) || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      onNavigate?.();
      navigateTo(href);
    },
    [href, navigateTo, onNavigate]
  );
}
