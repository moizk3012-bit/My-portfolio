import { describe, expect, it } from 'vitest';
import { person, projectFilters, projects, socials, stats } from '@/data';

describe('data', () => {
  it('has exactly one featured project — WannaModel, live, with a case study', () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0]).toMatchObject({ slug: 'wannamodel', live: true });
    expect(featured[0]!.caseStudy?.stats.length).toBeGreaterThan(0);
  });

  it('uses unique project slugs and known filter categories', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const p of projects) expect(projectFilters).toContain(p.category);
  });

  it('never exposes a phone number in contact details', () => {
    const contact = JSON.stringify({ person, socials }).replace(/https?:\/\/[^"]+/g, '');
    expect(contact).not.toMatch(/\+?\d[\d\s-]{8,}/);
  });

  it('marks every About-page stat as a placeholder until real numbers are added', () => {
    for (const s of stats) expect(s.placeholder).toBe(true);
  });
});
