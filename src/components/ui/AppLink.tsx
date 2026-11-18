import type { AnchorHTMLAttributes, Ref } from 'react';
import { useHref } from 'react-router';
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
  const external = isExternal(href);
  // Route paths ("/work/") become real URLs with the base path ("/My-portfolio/work/").
  const routed = useHref(external ? '/' : href);
  // useHref drops the trailing slash for "/" ("/My-portfolio"); keep it so Pages needn't redirect.
  const routedHref = href.endsWith('/') && !routed.endsWith('/') ? `${routed}/` : routed;
  const onTransitionClick = useTransitionLink(href, onNavigate);
  const newTab = external && !href.startsWith('mailto:');
  return (
    <a
      ref={ref}
      href={external ? href : routedHref}
      {...(newTab ? { target: '_blank', rel: 'noopener' } : {})}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        onTransitionClick(e);
      }}
    />
  );
}
