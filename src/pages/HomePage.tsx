import { Hero } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { RecentWork } from '@/components/home/RecentWork';
import { Footer } from '@/components/layout/Footer';
import { Page } from './Page';

export default function HomePage() {
  return (
    <Page id="home">
      <Hero />
      <Intro />
      <RecentWork />
      <Footer />
    </Page>
  );
}
