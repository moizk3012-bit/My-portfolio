import { intro } from '@/data';
import { Button } from '@/components/ui/Button';
import { FadeIn, Parallax, WordReveal } from '@/components/ui/Reveal';

export function Intro() {
  return (
    <section className="section intro">
      <div className="container intro-grid">
        <WordReveal as="h2" className="intro-statement" lines={intro.statement} />
        <div className="intro-side">
          <FadeIn>{intro.side}</FadeIn>
          <Parallax amount={-0.25} className="intro-btn">
            <Button href="/about/">About me</Button>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
