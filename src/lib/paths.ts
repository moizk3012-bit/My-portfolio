import { site } from '@/data/site';

/** Base path the site is served from, e.g. "/My-portfolio/". */
export const BASE_PATH = site.basePath;

/** React Router basename: the base path without its trailing slash ("" at a domain root). */
export const ROUTER_BASENAME = BASE_PATH.replace(/\/$/, '');

/** URL for a file in /public, e.g. asset('/images/avatar.webp') → "/My-portfolio/images/avatar.webp". */
export const asset = (path: string) => BASE_PATH + path.replace(/^\//, '');
