import { useRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { AppLink } from './AppLink';

type Variant = 'round' | 'pill' | 'icon';
type Theme = 'dark' | 'blue' | 'outline' | 'outline-light';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  theme?: Theme;
  className?: string;
  /** Small superscript count, e.g. "More work ⁶" */
  sup?: string | number;
  strength?: number;
}

type LinkProps = BaseProps & { href: string };
type ActionProps = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

const classes = (variant: Variant, theme: Theme, extra?: string) => ['btn', `btn--${variant}`, `btn--${theme}`, extra].filter(Boolean).join(' ');

function Label({ children, sup }: { children: ReactNode; sup?: string | number | undefined }) {
  return (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span className="btn-text">
        <span className="btn-text-inner">
          {children}
          {sup !== undefined && <sup>{sup}</sup>}
        </span>
      </span>
    </>
  );
}

/** Magnetic round / pill / icon button with the rising blue fill. Renders a link when given `href`. */
export function Button(props: LinkProps | ActionProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const { children, variant = 'round', theme = 'dark', className, sup, strength, href, ...rest } = props;
  useMagnetic(ref, strength === undefined ? {} : { strength });
  const cls = classes(variant, theme, className);

  if (href !== undefined) {
    return (
      <AppLink ref={ref} href={href} className={cls}>
        <Label sup={sup}>{children}</Label>
      </AppLink>
    );
  }
  const { type = 'button', ...buttonProps } = rest as Omit<ActionProps, keyof BaseProps | 'href'>;
  return (
    <button ref={ref} type={type} className={cls} {...buttonProps}>
      <Label sup={sup}>{children}</Label>
    </button>
  );
}
