// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { render, routes } from './entry-server';

describe('prerendered pages', () => {
  it.each(routes)('$path renders complete HTML', ({ path }) => {
    const html = render(path);
    expect(html).not.toMatch(/undefined|\[object Object\]|NaN/);
    expect(html).toContain('data-header');
    expect(html).toContain('data-footer');
    expect(html).toContain('id="site-menu"');
  });

  it('marks the current page in the header nav', () => {
    expect(render('/work/')).toMatch(/<a href="\/work\/" class="nav-link is-active" aria-current="page">/);
  });

  it('does not preload the hover-preview images ahead of the hero', () => {
    expect(render('/')).not.toMatch(/rel="preload" as="image" href="\/images\/covers/);
  });

  it('keeps the closed menu out of the tab order', () => {
    expect(render('/')).toMatch(/<aside[^>]*id="site-menu"[^>]*inert=""/);
  });

  it('renders the real numbers server-side (no JS needed to read them)', () => {
    expect(render('/work/')).toContain('1,500');
  });

  it('falls back to the Not Found page for unknown URLs', () => {
    expect(render('/nope/')).toContain('Page not found');
  });
});
