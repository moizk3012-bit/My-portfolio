import { education, experience, nav, pageMeta, person, site, socials } from '@/data';
import type { PageId } from '@/data';

const base = site.url.replace(/\/$/, '');

export const pageUrl = (id: PageId) => base + (nav.find((n) => n.id === id)?.href ?? '/');

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Person structured data for search engines. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    url: `${base}/`,
    image: `${base}/images/og.jpg`,
    sameAs: socials.map((s) => s.href),
    worksFor: { '@type': 'Organization', name: experience[0]?.org },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education[0]?.org },
  };
}

/** Full <head> tags for a page (used by the build-time prerender). */
export function headTags(id: PageId): string {
  const meta = pageMeta[id];
  const url = pageUrl(id);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${base}/images/og.jpg" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (id === 'home') {
    // "<" is escaped so the JSON can never close the script tag early
    tags.push(`<script type="application/ld+json">${JSON.stringify(personJsonLd()).replace(/</g, '\\u003c')}</script>`);
  }
  return tags.join('\n    ');
}

export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;

export const sitemapXml = () =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nav
    .map((n) => `  <url><loc>${esc(pageUrl(n.id))}</loc></url>`)
    .join('\n')}\n</urlset>\n`;
