import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { nav } from '@/data';

export { headTags, robotsTxt, sitemapXml } from '@/lib/seo';

/** Pages to prerender at build time. */
export const routes = nav.map((n) => ({ id: n.id, path: n.href }));

/** Static HTML for one URL (used by scripts/prerender.mjs). */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
