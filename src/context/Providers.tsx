import type { ReactNode } from 'react';
import { MenuContext, PreviewContext, SmoothScrollContext, TransitionContext } from './contexts';
import { useSmoothScrollController } from '@/hooks/useSmoothScrollController';
import { useMenuController } from '@/hooks/useMenuController';
import { usePreviewController } from '@/hooks/usePreviewController';
import { usePageTransitionController } from '@/hooks/usePageTransitionController';
import { HoverPreview, TransitionCurtain } from '@/components/layout/Chrome';

// Providers only wire hooks to context — all behaviour lives in the hooks.

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <SmoothScrollContext.Provider value={useSmoothScrollController()}>{children}</SmoothScrollContext.Provider>;
}

function MenuProvider({ children }: { children: ReactNode }) {
  return <MenuContext.Provider value={useMenuController()}>{children}</MenuContext.Provider>;
}

function PreviewProvider({ children }: { children: ReactNode }) {
  const { api, modalRef, slidesRef, cursorRef } = usePreviewController();
  return (
    <PreviewContext.Provider value={api}>
      {children}
      <HoverPreview modalRef={modalRef} slidesRef={slidesRef} cursorRef={cursorRef} />
    </PreviewContext.Provider>
  );
}

function TransitionProvider({ children }: { children: ReactNode }) {
  const { api, label, rootRef, labelRef, topRef, bottomRef } = usePageTransitionController();
  return (
    <TransitionContext.Provider value={api}>
      {children}
      <TransitionCurtain label={label} rootRef={rootRef} labelRef={labelRef} topRef={topRef} bottomRef={bottomRef} />
    </TransitionContext.Provider>
  );
}

/** All app-wide providers, in dependency order. Must be rendered inside a Router. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <MenuProvider>
        <PreviewProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </PreviewProvider>
      </MenuProvider>
    </SmoothScrollProvider>
  );
}
