import { featuredProject, projectFilters, projects } from '@/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WordReveal } from '@/components/ui/Reveal';
import { CaseStudy } from '@/components/work/CaseStudy';
import { AllWork } from '@/components/work/AllWork';
import { Page } from './Page';

export default function WorkPage() {
  return (
    <Page id="work">
      <section className="page-head">
        <Header page="work" theme="dark" />
        <div className="container">
          <WordReveal as="h1" className="page-title" lines={['Building intelligent', 'products']} />
        </div>
      </section>
      {featuredProject && <CaseStudy project={featuredProject} />}
      <AllWork projects={projects} filters={projectFilters} />
      <Footer />
    </Page>
  );
}
