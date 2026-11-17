import { createContext } from 'react';
import type { RefObject, MouseEvent } from 'react';

export interface SmoothScrollApi {
  scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean }) => void;
  lock: (locked: boolean) => void;
  velocity: () => number;
}

export interface MenuApi {
  open: boolean;
  /** true once the page header has scrolled out of view */
  headerPassed: boolean;
  setHeaderPassed: (passed: boolean) => void;
  toggle: () => void;
  close: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}

export interface PreviewApi {
  show: (e: MouseEvent) => void;
  hide: () => void;
  select: (slug: string) => void;
}

export interface TransitionApi {
  /** Navigate with the curtain transition */
  navigateTo: (href: string) => void;
  /** Increments each time a page is revealed (after preloader / transition) */
  enterCount: number;
  /** Called by the preloader when it has finished */
  markReady: () => void;
}

export const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);
export const MenuContext = createContext<MenuApi | null>(null);
export const PreviewContext = createContext<PreviewApi | null>(null);
export const TransitionContext = createContext<TransitionApi | null>(null);
