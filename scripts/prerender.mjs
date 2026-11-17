// Renders every page to static HTML after `vite build`, so each URL is
// readable without JavaScript and by search engines. React then hydrates it.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-server');

const { render, routes, headTags, robotsTxt, sitemapXml } = await import(join(serverDir, 'entry-server.js'));
const template = readFileSync(join(dist, 'index.html'), 'utf8');
const HEAD = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;

for (const { id, path } of routes) {
  const html = template.replace(HEAD, headTags(id)).replace('<!--app-html-->', render(path));
  const file = join(dist, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`prerendered ${path}`);
}

// GitHub Pages serves 404.html for unknown URLs; the app renders its Not Found page.
writeFileSync(join(dist, '404.html'), template.replace(HEAD, '<title>Page not found • Moiz Azad</title>').replace('<!--app-html-->', ''));
writeFileSync(join(dist, 'robots.txt'), robotsTxt());
writeFileSync(join(dist, 'sitemap.xml'), sitemapXml());
rmSync(serverDir, { recursive: true, force: true });
