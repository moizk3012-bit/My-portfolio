import { useEffect } from 'react';
import { pageMeta } from '@/data';
import type { PageId } from '@/data';

/** Keeps the document title and description in sync on client-side navigation. */
export function usePageMeta(id: PageId) {
  useEffect(() => {
    const meta = pageMeta[id];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [id]);
}
