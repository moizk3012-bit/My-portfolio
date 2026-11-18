import { aboutText, awards, certificates, education, experience, person, services, stack, stats } from '@/data';
import type { Achievement, TimelineEntry } from '@/data';
import { ArrowIcon } from '@/components/ui/Icon';
import { Marquee } from '@/components/ui/Marquee';
import { FadeIn, Parallax } from '@/components/ui/Reveal';
import { Stat } from '@/components/ui/Stat';
import { asset } from '@/lib/paths';

export function AboutLead() {
  return (
    <section className="section about-lead">
      <div className="container">
        <div className="rule-with-badge">
          <span className="rule" />
          <Parallax amount={-0.3} className="badge-circle">
            <ArrowIcon />
          </Parallax>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <FadeIn className="about-big">{aboutText.lead}</FadeIn>
            <FadeIn className="about-small">{aboutText.more}</FadeIn>
          </div>
          <div className="about-photo">
            <Parallax amount={0.12} className="about-photo-inner">
              <img src={asset(person.aboutPhoto)} alt={person.name} width={900} height={1125} loading="lazy" />
            </Parallax>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section services">
      <div className="container">
        <p className="label">I can help you with …</p>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.n} className="service">
              <p className="service-n">{s.n}</p>
              <span className="service-rule" />
              <h3 className="service-title">{s.title}</h3>
              <p className="service-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="section stats-band">
      <div className="container stats-grid">
        {stats.map((s) => (
          <Stat key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}

function TimelineList({ items }: { items: TimelineEntry[] }) {
  return (
    <ul className="xp-list">
      {items.map((e) => (
        <li key={`${e.role}-${e.org}`} className="xp-row">
          <p className="xp-period">{e.period}</p>
          <div className="xp-main">
            <h3 className="xp-role">{e.role}</h3>
            <p className="xp-org">{e.org}</p>
          </div>
          <ul className="xp-points">
            {e.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function AchievementList({ items }: { items: Achievement[] }) {
  return (
    <ul className="badge-list">
      {items.map((a) => (
        <li key={a.title} className="badge-row">
          <h3>{a.title}</h3>
          <p>{a.by}</p>
          <p className="badge-year">{a.year}</p>
        </li>
      ))}
    </ul>
  );
}

export function Timeline() {
  return (
    <section className="section xp">
      <div className="container">
        <p className="label">Experience</p>
        <TimelineList items={experience} />
        <p className="label label--spaced">Education</p>
        <TimelineList items={education} />
        <p className="label label--spaced">Certificates &amp; awards</p>
        <AchievementList items={[...certificates, ...awards]} />
      </div>
    </section>
  );
}

const Chips = ({ items }: { items: string[] }) => (
  <div className="chip-row">
    {items.map((s) => (
      <span key={s} className="chip">
        {s}
      </span>
    ))}
  </div>
);

export function StackMarquee() {
  const half = Math.ceil(stack.length / 2);
  return (
    <section className="section stack">
      <p className="label container">Tools I work with</p>
      <Marquee className="chip-marquee" speed={0.03} direction={1}>
        <Chips items={stack.slice(0, half)} />
      </Marquee>
      <Marquee className="chip-marquee" speed={0.03} direction={-1}>
        <Chips items={stack.slice(half)} />
      </Marquee>
    </section>
  );
}
