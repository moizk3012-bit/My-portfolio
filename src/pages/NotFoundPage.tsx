import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Page } from './Page';

export default function NotFoundPage() {
  return (
    <Page id="home">
      <section className="page-head">
        <Header page="home" theme="dark" />
        <div className="container">
          <h1 className="page-title">Page not found</h1>
          <p className="label label--spaced">This page doesn’t exist — it may have moved.</p>
          <Button href="/" variant="pill">
            Back home
          </Button>
        </div>
      </section>
      <Footer />
    </Page>
  );
}
