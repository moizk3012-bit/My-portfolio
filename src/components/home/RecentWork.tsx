import { projects, site } from '@/data';
import { Button } from '@/components/ui/Button';
import { ProjectCard, ProjectList, ProjectRow } from '@/components/work/ProjectItems';

export function RecentWork() {
  const recent = projects.slice(0, site.homeWorkCount);
  return (
    <section className="section work-home">
      <div className="container">
        <p className="label">Recent work</p>
        <ProjectList>
          {recent.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </ProjectList>
        <div className="work-cards-mobile">
          {recent.map((p) => (
            <ProjectCard key={p.slug} project={p} from="home" />
          ))}
        </div>
        <div className="center-btn">
          <Button href="/work/" variant="pill" theme="outline" sup={projects.length}>
            More work
          </Button>
        </div>
      </div>
    </section>
  );
}
