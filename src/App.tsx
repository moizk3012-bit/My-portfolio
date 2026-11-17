import { Route, Routes } from 'react-router';
import { AppProviders } from '@/context/Providers';
import { Hamburger, Menu, Preloader, SkipLink } from '@/components/layout/Chrome';
import HomePage from '@/pages/HomePage';
import WorkPage from '@/pages/WorkPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

/** Whole app minus the router (BrowserRouter in the browser, StaticRouter when prerendering). */
export function App() {
  return (
    <AppProviders>
      <SkipLink />
      <Preloader />
      <Hamburger />
      <Menu />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </AppProviders>
  );
}
