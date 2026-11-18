import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { nav } from '@/data';
import { ROUTER_BASENAME } from '@/lib/paths';

export { headTags, robotsTxt, sitemapXml } from '@/lib/seo';

/** Pages to prerender at build time. */
export const routes = nav.map((n) => ({ id: n.id, path: n.href }));

/** Static HTML for one route path like "/work/" (used by scripts/prerender.mjs). */
export function render(path: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter basename={ROUTER_BASENAME} location={ROUTER_BASENAME + path}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
