import { describe, expect, it } from 'vitest';
import { formatLocalTime } from './time';
import { buildMailto, validateContact } from './contact';
import { isExternal, normalizePath, pageIdFromPath, pageLabel } from './routes';
import { projectHref } from './projects';
import { headTags, robotsTxt, sitemapXml } from './seo';
import { projects } from '@/data';

describe('formatLocalTime', () => {
  it('formats Pakistan time with GMT offset', () => {
    expect(formatLocalTime(new Date('2026-11-18T16:15:00Z'))).toBe('09:15 PM GMT+5');
    expect(formatLocalTime(new Date('2026-11-18T03:05:00Z'))).toBe('08:05 AM GMT+5');
  });
});

describe('contact', () => {
  const ok = { name: 'Jane', email: 'jane@acme.co', org: 'Acme', services: 'RAG', message: 'Hi Moiz & team?' };

  it('reports every invalid field', () => {
    expect(validateContact({ name: '', email: 'x', message: '' })).toEqual({
      name: 'Please enter your name.',
      email: 'Please enter a valid email.',
      message: 'Please write a short message.',
    });
    expect(validateContact(ok)).toEqual({});
  });

  it('returns null for invalid input', () => {
    expect(buildMailto('me@x.co', { ...ok, name: '' })).toBeNull();
    expect(buildMailto('me@x.co', { ...ok, email: 'nope' })).toBeNull();
  });

  it('builds an encoded mailto link', () => {
    const url = buildMailto('me@x.co', ok)!;
    expect(url.startsWith('mailto:me@x.co?subject=')).toBe(true);
    expect(url).toContain(encodeURIComponent('Hi Moiz & team?'));
  });
});

describe('routes', () => {
  it('normalizes paths and maps them to pages', () => {
    expect(normalizePath('/work#x')).toBe('/work/');
    expect(normalizePath('http://localhost:5173/about/?a=1')).toBe('/about/');
    expect(pageIdFromPath('/')).toBe('home');
    expect(pageIdFromPath('/work')).toBe('work');
    expect(pageIdFromPath('/nope/')).toBeNull();
    expect(pageLabel('/contact/')).toBe('Contact');
  });

  it('detects external links', () => {
    expect(isExternal('https://github.com')).toBe(true);
    expect(isExternal('mailto:a@b.co')).toBe(true);
    expect(isExternal('/work/')).toBe(false);
  });

  it('sends the featured project to its case study from Home only', () => {
    const featured = projects.find((p) => p.featured)!;
    expect(projectHref(featured, 'home')).toBe('/work/#wannamodel');
    expect(projectHref(featured, 'work')).toBe(featured.href);
  });
});

describe('seo', () => {
  it('uses absolute canonical and social image URLs', () => {
    const head = headTags('about');
    expect(head).toContain('<title>About • Moiz Azad</title>');
    expect(head).toContain('rel="canonical" href="https://moizk3012-bit.github.io/about/"');
    expect(head).toContain('og:image" content="https://moizk3012-bit.github.io/images/og.jpg"');
  });

  it('embeds Person structured data on Home only, safely', () => {
    const json = headTags('home').match(/<script type="application\/ld\+json">(.*)<\/script>/)![1]!;
    expect(JSON.parse(json)).toMatchObject({ '@type': 'Person', name: 'Moiz Azad' });
    expect(json).not.toContain('</');
    expect(headTags('work')).not.toContain('ld+json');
  });

  it('lists every page in the sitemap', () => {
    expect(sitemapXml().match(/<loc>/g)).toHaveLength(4);
    expect(robotsTxt()).toContain('Sitemap: https://moizk3012-bit.github.io/sitemap.xml');
  });
});
