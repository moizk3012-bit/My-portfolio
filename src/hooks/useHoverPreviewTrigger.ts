import { useCallback, useMemo } from 'react';
import { usePreview } from './useContexts';

/** Mouse handlers that make a project list drive the floating preview. */
export function useHoverPreviewTrigger() {
  const preview = usePreview();

  const listProps = useMemo(() => ({ onMouseEnter: preview.show, onMouseLeave: preview.hide }), [preview]);
  const rowProps = useCallback((slug: string) => ({ onMouseEnter: () => preview.select(slug) }), [preview]);

  return { listProps, rowProps };
}
