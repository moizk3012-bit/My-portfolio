// Shared shapes for everything in src/data. Components import these types,
// so a typo in a data file is caught by the compiler instead of on the page.

export type PageId = 'home' | 'work' | 'about' | 'contact';

export interface NavItem {
  id: PageId;
  label: string;
  href: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface Person {
  name: string;
  firstName: string;
  role: string;
  /** Lines shown next to the hero arrow */
  heroRole: string[];
  location: string;
  /** IANA time zone, used for the footer clock */
  timezone: string;
  email: string;
  photo: string;
  avatar: string;
  aboutPhoto: string;
}

export interface Social {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  /** true = dummy number that still needs a real value */
  placeholder?: boolean;
}

export type ProjectCategory = 'Live product' | 'Deep Learning' | 'NLP' | 'ML';
export type ProjectFilter = 'All' | ProjectCategory;

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  year: string;
  image: string;
  /** Background colour of the preview box */
  color: string;
  href: string;
  live: boolean;
  featured: boolean;
  summary: string;
  caseStudy?: CaseStudy;
}

export interface CaseStudy {
  url: string;
  stats: Stat[];
  statsNote?: string;
  built: string[];
}

export interface TimelineEntry {
  role: string;
  org: string;
  period: string;
  points: string[];
}

export interface Achievement {
  title: string;
  by: string;
  year?: string;
}

export interface Service {
  n: string;
  title: string;
  text: string;
}

export interface SiteSettings {
  /** Public address of the deployed site (canonical links, social previews, sitemap) */
  url: string;
  /** Faint neural-network lines behind the hero photo */
  heroNetwork: boolean;
  heroNetworkOpacity: number;
  /** How many projects show under "Recent work" on Home */
  homeWorkCount: number;
}
