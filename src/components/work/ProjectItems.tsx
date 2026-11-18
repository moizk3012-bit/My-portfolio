import type { ReactNode } from 'react';
import type { Project } from '@/data';
import { projectHref } from '@/lib/projects';
import { useHoverPreviewTrigger } from '@/hooks/useHoverPreviewTrigger';
import { AppLink } from '@/components/ui/AppLink';
import { asset } from '@/lib/paths';

const LiveDot = ({ project }: { project: Project }) => (project.live ? <span className="live-dot" /> : null);

/** Hover-preview list wrapper: the floating image follows the cursor over its rows. */
export function ProjectList({ children, className = 'work-list' }: { children: ReactNode; className?: string }) {
  const { listProps } = useHoverPreviewTrigger();
  return (
    <ul className={className} {...listProps}>
      {children}
    </ul>
  );
}

/** Compact row (Home): big title left, category right. */
export function ProjectRow({ project }: { project: Project }) {
  const { rowProps } = useHoverPreviewTrigger();
  return (
    <li className="work-row" {...rowProps(project.slug)}>
      <AppLink className="work-row-link" href={projectHref(project, 'home')}>
        <h3 className="work-row-title">{project.title}</h3>
        <p className="work-row-cat">
          <LiveDot project={project} />
          {project.category}
        </p>
      </AppLink>
    </li>
  );
}

/** Full row (Work page): Project / Category / Stack / Year. */
export function ProjectRowFull({ project }: { project: Project }) {
  const { rowProps } = useHoverPreviewTrigger();
  return (
    <li className="work-row work-row--full" {...rowProps(project.slug)}>
      <AppLink className="work-row-link" href={projectHref(project, 'work')}>
        <h3 className="work-row-title">{project.title}</h3>
        <p className="work-row-col">
          <LiveDot project={project} />
          {project.category}
        </p>
        <p className="work-row-col">{project.tags.join(' · ')}</p>
        <p className="work-row-col work-row-year">{project.year}</p>
      </AppLink>
    </li>
  );
}

/** Grid card: coloured box with image, title, category + year. */
export function ProjectCard({ project, from = 'work' }: { project: Project; from?: 'home' | 'work' }) {
  return (
    <article className="work-card">
      <AppLink className="work-card-link" href={projectHref(project, from)}>
        <div className="work-card-media" style={{ background: project.color }}>
          <img src={asset(project.image)} alt={`${project.title} preview`} loading="lazy" width={800} height={500} />
        </div>
        <h3 className="work-card-title">{project.title}</h3>
        <div className="work-card-meta">
          <span>
            <LiveDot project={project} />
            {project.category}
          </span>
          <span>{project.year}</span>
        </div>
      </AppLink>
    </article>
  );
}
