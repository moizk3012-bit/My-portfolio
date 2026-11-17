import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Diagonal arrow pointing down-right. */
export const ArrowIcon = (props: IconProps) => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
    <path d="M1 1l12 12M13 3v10H3" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export const GlobeIcon = (props: IconProps) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.6" />
    <ellipse className="globe-meridian" cx="16" cy="16" rx="6" ry="13" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 16h26M5 9.5h22M5 22.5h22" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const ListIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
    <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const GridIcon = (props: IconProps) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
    <path d="M2 2h7v7H2zM11 2h7v7h-7zM2 11h7v7H2zM11 11h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
