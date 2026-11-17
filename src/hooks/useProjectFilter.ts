import { useEffect, useMemo, useState } from 'react';
import { ScrollTrigger } from '@/lib/motion';
import type { Project, ProjectFilter } from '@/data';

export type WorkView = 'list' | 'grid';

/** Category filter + list/grid view state for a list of projects. */
export function useProjectFilter(projects: Project[], filters: ProjectFilter[]) {
  const [filter, setFilter] = useState<ProjectFilter>('All');
  const [view, setView] = useState<WorkView>('list');

  const visible = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [projects, filter]);

  const counts = useMemo(
    () =>
      Object.fromEntries(filters.map((f) => [f, f === 'All' ? projects.length : projects.filter((p) => p.category === f).length])) as Record<
        ProjectFilter,
        number
      >,
    [projects, filters]
  );

  // Page height changed — let scroll-driven animations re-measure.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [visible, view]);

  return { filter, setFilter, view, setView, visible, counts };
}
