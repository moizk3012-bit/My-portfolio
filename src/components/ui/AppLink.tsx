import type { AnchorHTMLAttributes, Ref } from 'react';
import { isExternal } from '@/lib/routes';
import { useTransitionLink } from '@/hooks/useTransitionLink';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
  /** Called before an internal navigation starts (e.g. to close a menu) */
  onNavigate?: () => void;
}

/**
 * Link that plays the page transition for internal routes and opens
 * external sites in a new tab. mailto: links open normally.
 */
export function AppLink({ href, ref, onNavigate, onClick, ...rest }: Props) {
  const onTransitionClick = useTransitionLink(href, onNavigate);
  const newTab = isExternal(href) && !href.startsWith('mailto:');
  return (
    <a
      ref={ref}
      href={href}
      {...(newTab ? { target: '_blank', rel: 'noopener' } : {})}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        onTransitionClick(e);
      }}
    />
  );
}
