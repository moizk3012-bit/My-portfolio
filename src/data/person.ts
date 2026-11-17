import type { Person, Social } from './types';

export const person: Person = {
  name: 'Moiz Azad',
  firstName: 'Moiz',
  role: 'AI Engineer',
  heroRole: ['AI Engineer', '& GenAI Developer'],
  location: 'Pakistan',
  timezone: 'Asia/Karachi',
  email: 'moizk3012@gmail.com',
  photo: '/images/moiz-cutout.webp',
  avatar: '/images/avatar.webp',
  aboutPhoto: '/images/about.webp',
};

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/Moiz3012' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/moiz-azad-997573208/' },
  { label: 'WannaModel', href: 'https://www.wannamodel.org' },
];
