import { aboutText } from '@/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WordReveal } from '@/components/ui/Reveal';
import { AboutLead, Services, StackMarquee, StatsBand, Timeline } from '@/components/about/AboutSections';
import { Page } from './Page';

export default function AboutPage() {
  return (
    <Page id="about">
      <section className="page-head">
        <Header page="about" theme="dark" />
        <div className="container">
          <WordReveal as="h1" className="page-title" lines={aboutText.title} />
        </div>
      </section>
      <AboutLead />
      <Services />
      <StatsBand />
      <Timeline />
      <StackMarquee />
      <Footer />
    </Page>
  );
}
