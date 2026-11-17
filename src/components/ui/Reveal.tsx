import { Fragment, useRef } from 'react';
import type { ElementType, ReactNode } from 'react';
import { useCountUp, useFadeReveal, useParallax, useWordReveal } from '@/hooks/useScrollAnimations';

/** Text whose words slide up into view. `lines` are separated by line breaks. */
export function WordReveal({ as: Tag = 'span', lines, className }: { as?: ElementType; lines: string | string[]; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  useWordReveal(ref);
  const list = Array.isArray(lines) ? lines : [lines];
  return (
    <Tag ref={ref} className={className}>
      {list.map((line, i) => (
        <Fragment key={i}>
          {line.split(/\s+/).map((word, j) => (
            <Fragment key={j}>
              <span className="w">
                <span className="wi">{word}</span>
              </span>{' '}
            </Fragment>
          ))}
          {i < list.length - 1 && <br />}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Paragraph that fades and rises into view. */
export function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useFadeReveal(ref);
  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}

/** Wrapper that drifts vertically while scrolling (negative = up). */
export function Parallax({ amount, className, children }: { amount: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, amount);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Number that counts up when scrolled into view (server-renders the final value). */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value);
  return <span ref={ref}>{value.toLocaleString('en-US')}</span>;
}
