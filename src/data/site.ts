import type { NavItem, PageId, PageMeta, SiteSettings } from './types';

export const site: SiteSettings = {
  url: 'https://moizk3012-bit.github.io', // change if you deploy somewhere else
  heroNetwork: true,
  heroNetworkOpacity: 0.35,
  homeWorkCount: 4,
};

export const nav: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'work', label: 'Work', href: '/work/' },
  { id: 'about', label: 'About', href: '/about/' },
  { id: 'contact', label: 'Contact', href: '/contact/' },
];

export const pageMeta: Record<PageId, PageMeta> = {
  home: {
    title: 'Moiz Azad • AI Engineer',
    description:
      'AI Engineer building GenAI and deep-learning products — from training models to shipping them on the web. Creator of WannaModel.',
  },
  work: {
    title: 'Work • Moiz Azad',
    description: 'Selected AI and machine-learning work by Moiz Azad, including the live product WannaModel.',
  },
  about: {
    title: 'About • Moiz Azad',
    description: 'Moiz Azad is an AI Engineer working with generative AI, deep learning and production ML.',
  },
  contact: {
    title: 'Contact • Moiz Azad',
    description: 'Start a project with Moiz Azad, AI Engineer.',
  },
};

/** Greetings flashed by the first-visit preloader */
export const greetings = ['Hello', 'سلام', 'Hallo', 'Bonjour', 'Hola', 'Ciao', 'Merhaba', 'Hello'];
