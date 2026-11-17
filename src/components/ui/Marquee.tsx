import { useRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { useMarquee } from '@/hooks/useMarquee';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  speed?: number;
  direction?: 1 | -1;
  /** Include in the page entrance animation */
  enter?: boolean;
}

/** Endless horizontal loop of `children` (rendered twice for a seamless wrap). */
export function Marquee({ children, speed, direction, enter, ...rest }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  useMarquee(trackRef, { ...(speed !== undefined && { speed }), ...(direction !== undefined && { direction }) });
  return (
    <div aria-hidden="true" {...(enter && { 'data-enter': '' })} {...rest}>
      <div className="marquee-track" ref={trackRef}>
        {children}
        {children}
      </div>
    </div>
  );
}
