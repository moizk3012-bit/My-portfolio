import { nav } from '@/data';
import type { PageId } from '@/data';

/** "/work/#x" → "/work/" (pathname with a trailing slash, no query/hash). */
export function normalizePath(href: string): string {
  const path = href.replace(/^https?:\/\/[^/]+/, '').split(/[?#]/)[0] || '/';
  return path.endsWith('/') ? path : `${path}/`;
}

/** Page id for a path, or null for unknown pages. */
export function pageIdFromPath(href: string): PageId | null {
  const path = normalizePath(href);
  return nav.find((n) => n.href === path)?.id ?? null;
}

/** Label shown on the transition curtain ("Work", "About", …). */
export function pageLabel(href: string): string {
  const id = pageIdFromPath(href);
  return nav.find((n) => n.id === id)?.label ?? '';
}

/** True for links that should open in a new tab / leave the site. */
export const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith('mailto:');

/** The element a "#hash" points to — null-safe, never throws on odd hashes. */
export function elementForHash(hash: string): HTMLElement | null {
  if (!hash || hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}
