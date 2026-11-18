import type { Project } from '@/data';
import { Button } from '@/components/ui/Button';
import { FadeIn, Parallax } from '@/components/ui/Reveal';
import { Stat } from '@/components/ui/Stat';
import { asset } from '@/lib/paths';

/** Featured live-product block with a browser-framed screenshot and real stats. */
export function CaseStudy({ project }: { project: Project }) {
  const study = project.caseStudy;
  if (!study) return null;
  return (
    <section className="section case" id={project.slug}>
      <div className="container case-grid">
        <Parallax amount={-0.08} className="case-media">
          <div className="browser">
            <div className="browser-bar">
              <span />
              <span />
              <span />
              <p className="browser-url">{study.url}</p>
            </div>
            <img src={asset(project.image)} alt={`Screenshot of the ${project.title} website`} width={1440} height={900} loading="lazy" />
          </div>
        </Parallax>
        <div className="case-body">
          <p className="label">
            <span className="live-dot" />
            Featured · Live product
          </p>
          <h2 className="case-title">{project.title}</h2>
          <FadeIn className="case-summary">{project.summary}</FadeIn>
          <div className="case-stats">
            {study.stats.map((s) => (
              <Stat key={s.label} stat={s} />
            ))}
          </div>
          {study.statsNote && <p className="case-note">{study.statsNote}</p>}
          <ul className="case-built">
            {study.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="case-cta">
            <Button href={project.href} variant="pill">
              Visit live site
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
