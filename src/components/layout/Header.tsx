import { useRef } from 'react';
import { nav, person } from '@/data';
import type { PageId } from '@/data';
import { useHeaderWatch } from '@/hooks/useMenuBehavior';
import { useMagnetic } from '@/hooks/useMagnetic';
import { AppLink } from '@/components/ui/AppLink';

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, { strength: 0.4 });
  return (
    <AppLink ref={ref} href={href} className={`nav-link${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>
      <span className="btn-text">
        <span className="btn-text-inner">{label}</span>
      </span>
      <span className="nav-dot" aria-hidden="true" />
    </AppLink>
  );
}

/** Top bar inside each page: "© Code by Moiz" logo and Work / About / Contact. */
export function Header({ page, theme }: { page: PageId; theme: 'light' | 'dark' }) {
  const ref = useRef<HTMLElement>(null);
  useHeaderWatch(ref);
  return (
    <header ref={ref} className={`header header--${theme}`} data-header>
      <AppLink className="logo" href="/" aria-label={`${person.name} — home`}>
        <span className="logo-copy">©</span>
        <span className="logo-flip">
          <span className="logo-a">Code by {person.firstName}</span>
          <span className="logo-b">{person.name}</span>
        </span>
      </AppLink>
      <nav className="nav" aria-label="Main">
        {nav
          .filter((n) => n.id !== 'home')
          .map((n) => (
            <NavLink key={n.id} href={n.href} label={n.label} active={n.id === page} />
          ))}
      </nav>
    </header>
  );
}
