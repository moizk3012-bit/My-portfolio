import { useRef } from 'react';
import { person, site } from '@/data';
import { useHeroParallax } from '@/hooks/useScrollAnimations';
import { useScrollDirectionArrow } from '@/hooks/useMarquee';
import { useNeuralNetwork } from '@/hooks/useNeuralNetwork';
import { Header } from '@/components/layout/Header';
import { ArrowIcon, GlobeIcon } from '@/components/ui/Icon';
import { Marquee } from '@/components/ui/Marquee';

function NeuralNetworkCanvas({ opacity }: { opacity: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useNeuralNetwork(ref, opacity);
  return <canvas ref={ref} className="hero-network" aria-hidden="true" />;
}

/** Grey studio hero: photo, giant name marquee, location pill and role. */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  useHeroParallax(heroRef, photoRef);
  useScrollDirectionArrow(arrowRef);

  return (
    <section ref={heroRef} className="hero">
      <Header page="home" theme="light" />
      {site.heroNetwork && <NeuralNetworkCanvas opacity={site.heroNetworkOpacity} />}
      <div ref={photoRef} className="hero-photo">
        <img src={person.photo} alt={`Portrait of ${person.name}`} width={1122} height={1038} fetchPriority="high" />
      </div>
      <div className="hero-pill" data-enter>
        <p>
          Based in
          <br />
          {person.location}
        </p>
        <span className="hero-globe">
          <GlobeIcon />
        </span>
      </div>
      <div className="hero-role" data-enter>
        <span ref={arrowRef} className="hero-arrow">
          <ArrowIcon />
        </span>
        <p>
          {person.heroRole.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      </div>
      <h1 className="sr-only">
        {person.name} — {person.role}
      </h1>
      <Marquee className="hero-marquee" speed={0.045} enter>
        <span className="marquee-item">
          {person.name}
          <span className="marquee-dash"> —&nbsp;</span>
        </span>
      </Marquee>
    </section>
  );
}
