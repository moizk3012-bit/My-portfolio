import { useRef } from 'react';
import { person, socials } from '@/data';
import { useLocalTime } from '@/hooks/useLocalTime';
import { useFooterCurve } from '@/hooks/useScrollAnimations';
import { AppLink } from '@/components/ui/AppLink';
import { Button } from '@/components/ui/Button';
import { ArrowIcon } from '@/components/ui/Icon';
import { Parallax } from '@/components/ui/Reveal';

export function SocialLinks({ separator }: { separator?: 'br' }) {
  return socials.map((s, i) => (
    <span key={s.label}>
      {separator === 'br' && i > 0 && <br />}
      <AppLink className="underline-link" href={s.href}>
        {s.label}
      </AppLink>
    </span>
  ));
}

function FooterBottom() {
  const time = useLocalTime(person.timezone);
  return (
    <div className="footer-bottom">
      <div className="footer-meta">
        <div>
          <p className="meta-label">Version</p>
          <p>{new Date().getFullYear()} © Edition</p>
        </div>
        <div>
          <p className="meta-label">Local time</p>
          <p>{time}</p>
        </div>
      </div>
      <div className="footer-meta footer-meta--socials">
        <div>
          <p className="meta-label">Socials</p>
          <p className="footer-socials">
            <SocialLinks />
          </p>
        </div>
      </div>
    </div>
  );
}

/** Dark footer. `bg` is the colour of the section above it (used for the curved edge). */
export function Footer({ compact = false, bg = '#ffffff' }: { compact?: boolean; bg?: string }) {
  const footerRef = useRef<HTMLElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  useFooterCurve(footerRef, curveRef, bodyRef);
  const linkedin = socials.find((s) => s.label === 'LinkedIn');

  if (compact) {
    return (
      <footer ref={footerRef} className="footer footer--compact" data-footer>
        <FooterBottom />
      </footer>
    );
  }

  return (
    <footer ref={footerRef} className="footer" data-footer>
      <div ref={curveRef} className="footer-curve" aria-hidden="true">
        <div className="footer-curve-inner" style={{ background: bg }} />
      </div>
      <div ref={bodyRef} className="footer-body">
        <div className="container">
          <div className="footer-top">
            <h2 className="footer-title">
              <span className="footer-title-row">
                <span className="avatar">
                  <img src={person.avatar} alt="" width={200} height={200} loading="lazy" />
                </span>
                <span>Let’s work</span>
              </span>
              <span className="footer-title-row">together</span>
            </h2>
            <span className="footer-arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          </div>
          <div className="footer-line">
            <Parallax amount={-0.6} className="footer-btn">
              <Button href="/contact/" theme="blue">
                Get in touch
              </Button>
            </Parallax>
          </div>
          <div className="footer-pills">
            <Button href={`mailto:${person.email}`} variant="pill" theme="outline-light">
              {person.email}
            </Button>
            {linkedin && (
              <Button href={linkedin.href} variant="pill" theme="outline-light">
                LinkedIn
              </Button>
            )}
          </div>
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
