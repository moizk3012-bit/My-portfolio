import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import { ROUTER_BASENAME } from '@/lib/paths';
import './css/main.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages are prerendered at build time → hydrate them. In dev the root holds only the
// <!--app-html--> placeholder comment, so check for an element, not just any node.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
