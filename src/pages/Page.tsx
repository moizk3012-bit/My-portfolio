import { useRef } from 'react';
import type { ReactNode } from 'react';
import type { PageId } from '@/data';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useEnterAnimation } from '@/hooks/useEnterAnimation';

/** Common page wrapper: keeps title/description in sync and plays the entrance animation. */
export function Page({ id, children }: { id: PageId; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  usePageMeta(id);
  useEnterAnimation(ref);
  return (
    <div ref={ref} className={`page page--${id}`}>
      {children}
    </div>
  );
}
