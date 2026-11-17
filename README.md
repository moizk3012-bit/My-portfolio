# Moiz Azad — Portfolio

Personal portfolio of **Moiz Azad, AI Engineer**. Four pages (Home, Work, About, Contact) with smooth scrolling, magnetic buttons, curtain page transitions and a cursor-following project preview.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit, hook and render tests
npm run typecheck  # TypeScript
npm run lint       # ESLint (TypeScript + React hooks rules)
npm run build      # static site in dist/, every page prerendered
npm run preview    # serve the built site
```

## Project structure

```
src/
  data/        ← all site content, typed (edit these files to change the text)
    types.ts       shared interfaces (Person, Project, Stat, …)
    site.ts        site URL, settings, navigation, page titles
    person.ts      name, role, contact, socials
    projects.ts    projects + WannaModel case study
    about.ts       intro, services, experience, education, stats, stack
    index.ts       `import { person, projects } from '@/data'`
  hooks/       ← all behaviour, as custom hooks (animations, menu, transitions, forms, …)
  lib/         ← pure functions with no React (time, contact, routes, SEO, curtain animation)
  context/     ← React contexts + thin providers that wire hooks together
  components/  ← presentational .tsx components; they render markup and call hooks
    ui/            Button, AppLink, WordReveal, CountUp, Marquee, icons
    layout/        Header, Footer, menu, preloader, transition curtain, hover preview
    home/ work/ about/ contact/
  pages/       ← one component per route, composed from sections
  css/         ← styles
  main.tsx         browser entry (hydrates the prerendered HTML)
  entry-server.tsx build-time render used by scripts/prerender.mjs
```

### Notes on the data

- Values marked `// PLACEHOLDER` in `src/data/about.ts` are dummy numbers. Replace them with real ones.
- The WannaModel numbers in `src/data/projects.ts` come from Google Search Console (November 2026). Refresh them now and then.
- `site.url` in `src/data/site.ts` is used for canonical links, social previews and the sitemap.

## Stack

React 19 + TypeScript, Vite, React Router, GSAP + ScrollTrigger (`@gsap/react`), and Lenis. Each page is rendered to static HTML at build time and then hydrated, so it loads fast and search engines can read it.

## Deploy

`.github/workflows/deploy.yml` lints, type-checks, tests and builds the site, then publishes it to GitHub Pages on every push to `main`. In the repo, set Settings → Pages → Source to **GitHub Actions**.
