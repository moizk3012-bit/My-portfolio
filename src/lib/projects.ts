import type { Project } from '@/data';

/** Where a project links to: the featured project opens its case study when listed on Home. */
export function projectHref(project: Project, from: 'home' | 'work'): string {
  return project.featured && from === 'home' ? `/work/#${project.slug}` : project.href;
}
