import { useRef } from 'react';
import type { Project, ProjectFilter } from '@/data';
import { useProjectFilter } from '@/hooks/useProjectFilter';
import type { WorkView } from '@/hooks/useProjectFilter';
import { useStaggerIn } from '@/hooks/useScrollAnimations';
import { Button } from '@/components/ui/Button';
import { GridIcon, ListIcon } from '@/components/ui/Icon';
import { ProjectCard, ProjectList, ProjectRowFull } from './ProjectItems';

const VIEWS: { id: WorkView; label: string; Icon: typeof ListIcon }[] = [
  { id: 'list', label: 'List view', Icon: ListIcon },
  { id: 'grid', label: 'Grid view', Icon: GridIcon },
];

/** All projects with category filters and a list/grid toggle. */
export function AllWork({ projects, filters }: { projects: Project[]; filters: ProjectFilter[] }) {
  const { filter, setFilter, view, setView, visible, counts } = useProjectFilter(projects, filters);
  const scopeRef = useRef<HTMLElement>(null);
  useStaggerIn(scopeRef, '.work-row, .work-card', `${filter}-${view}`);

  return (
    <section ref={scopeRef} className="section work-all" data-work-view={view}>
      <div className="container">
        <div className="work-controls">
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <Button
                key={f}
                variant="pill"
                theme="outline"
                className={`filter${f === filter ? ' is-active' : ''}`}
                sup={counts[f]}
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
          <div className="view-toggle" role="group" aria-label="Layout">
            {VIEWS.map(({ id, label, Icon }) => (
              <Button
                key={id}
                variant="icon"
                theme="outline"
                className={id === view ? 'is-active' : undefined}
                aria-label={label}
                aria-pressed={id === view}
                onClick={() => setView(id)}
              >
                <Icon />
              </Button>
            ))}
          </div>
        </div>

        <div className="work-list-head" aria-hidden="true">
          <span>Project</span>
          <span>Category</span>
          <span>Stack</span>
          <span>Year</span>
        </div>
        <ProjectList className="work-list work-list--full">
          {visible.map((p) => (
            <ProjectRowFull key={p.slug} project={p} />
          ))}
        </ProjectList>
        <div className="work-grid">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
