const isBrowser = typeof window !== 'undefined';

const matches = (query: string) => isBrowser && window.matchMedia(query).matches;

export const prefersReducedMotion = () => matches('(prefers-reduced-motion: reduce)');
export const hasFinePointer = () => matches('(hover: hover) and (pointer: fine)');
export const isMobileViewport = () => matches('(max-width: 767px)');
