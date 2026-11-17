import { useRef } from 'react';
import type { RefObject } from 'react';
import { useLocation } from 'react-router';
import { greetings, nav, projects } from '@/data';
import { pageIdFromPath } from '@/lib/routes';
import { useMenu, usePageTransition } from '@/hooks/useContexts';
import { useHamburgerVisibility, useMenuPanel } from '@/hooks/useMenuBehavior';
import { useMagnetic } from '@/hooks/useMagnetic';
import { usePreloader } from '@/hooks/usePreloader';
import { AppLink } from '@/components/ui/AppLink';
import { SocialLinks } from './Footer';

// Elements that live outside the pages and persist across navigation.

export function SkipLink() {
  return (
    <a className="skip-link" href="#main">
      Skip to content
    </a>
  );
}

/** First-visit greeting screen. Unmounts itself when done. */
export function Preloader() {
  const { markReady } = usePageTransition();
  const { word, finished, rootRef, wordRef, curveRef } = usePreloader(greetings, markReady);
  if (finished) return null;
  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="preloader-panel">
        <p ref={wordRef} className="preloader-word">
          <span className="dot" />
          <span>{word}</span>
        </p>
      </div>
      <div ref={curveRef} className="curve curve--bottom" />
    </div>
  );
}

interface CurtainProps {
  label: string;
  rootRef: RefObject<HTMLDivElement | null>;
  labelRef: RefObject<HTMLParagraphElement | null>;
  topRef: RefObject<HTMLDivElement | null>;
  bottomRef: RefObject<HTMLDivElement | null>;
}

/** Page-transition curtain (animated by usePageTransitionController). */
export function TransitionCurtain({ label, rootRef, labelRef, topRef, bottomRef }: CurtainProps) {
  return (
    <div ref={rootRef} className="transition" aria-hidden="true">
      <div ref={topRef} className="curve curve--top" />
      <div className="transition-panel">
        <p ref={labelRef} className="transition-label">
          <span className="dot" />
          <span>{label}</span>
        </p>
      </div>
      <div ref={bottomRef} className="curve curve--bottom" />
    </div>
  );
}

/** Round menu button that appears once the header has scrolled away. */
export function Hamburger() {
  const { open, toggle, buttonRef } = useMenu();
  useMagnetic(buttonRef, { strength: 0.35 });
  useHamburgerVisibility(buttonRef);
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`hamburger${open ? ' is-open' : ''}`}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls="site-menu"
      onClick={toggle}
    >
      <span className="btn-fill" aria-hidden="true" />
      <span className="btn-text">
        <span className="hamburger-lines">
          <span />
          <span />
        </span>
      </span>
    </button>
  );
}

/** Side menu with a curved edge. */
export function Menu() {
  const { open, close } = useMenu();
  const { pathname } = useLocation();
  const current = pageIdFromPath(pathname);
  const panel = useRef<HTMLElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const curve = useRef<SVGPathElement>(null);
  useMenuPanel({ panel, overlay, curve });

  return (
    <>
      <div ref={overlay} className="menu-overlay" onClick={close} />
      {/* inert while closed: its links must not be reachable with Tab */}
      <aside ref={panel} id="site-menu" className="menu" aria-label="Site menu" inert={!open}>
        <svg className="menu-curve" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
          <path ref={curve} d="M100 0 L100 0 Q-100 500 100 1000 L100 1000 Z" />
        </svg>
        <div className="menu-inner">
          <div className="menu-group">
            <p className="menu-label">Navigation</p>
            <ul className="menu-links">
              {nav.map((n) => (
                <li key={n.id}>
                  <AppLink
                    className={`menu-link${n.id === current ? ' is-active' : ''}`}
                    href={n.href}
                    aria-current={n.id === current ? 'page' : undefined}
                  >
                    <span className="menu-dot" aria-hidden="true" />
                    <span className="menu-link-text">{n.label}</span>
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="menu-group">
            <p className="menu-label">Socials</p>
            <p className="menu-socials">
              <SocialLinks />
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

interface PreviewProps {
  modalRef: RefObject<HTMLDivElement | null>;
  slidesRef: RefObject<HTMLDivElement | null>;
  cursorRef: RefObject<HTMLDivElement | null>;
}

/** Floating project image + "View" circle (driven by usePreviewController). */
export function HoverPreview({ modalRef, slidesRef, cursorRef }: PreviewProps) {
  return (
    <>
      <div ref={modalRef} className="preview" aria-hidden="true">
        <div ref={slidesRef} className="preview-slides">
          {projects.map((p) => (
            <div key={p.slug} className="preview-slide" style={{ background: p.color }}>
              {/* not lazy (it is scaled to 0 until hover, so lazy images would load late),
                  but low priority so React doesn't preload them ahead of the hero */}
              <img src={p.image} alt="" decoding="async" fetchPriority="low" width={800} height={500} />
            </div>
          ))}
        </div>
      </div>
      <div ref={cursorRef} className="preview-cursor" aria-hidden="true">
        View
      </div>
    </>
  );
}
