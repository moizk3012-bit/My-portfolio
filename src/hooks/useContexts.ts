import { useContext } from 'react';
import type { Context } from 'react';
import { MenuContext, PreviewContext, SmoothScrollContext, TransitionContext } from '@/context/contexts';

function useRequired<T>(ctx: Context<T | null>, name: string): T {
  const value = useContext(ctx);
  if (!value) throw new Error(`${name} must be used inside its provider`);
  return value;
}

export const useSmoothScroll = () => useRequired(SmoothScrollContext, 'useSmoothScroll');
export const useMenu = () => useRequired(MenuContext, 'useMenu');
export const usePreview = () => useRequired(PreviewContext, 'usePreview');
export const usePageTransition = () => useRequired(TransitionContext, 'usePageTransition');
