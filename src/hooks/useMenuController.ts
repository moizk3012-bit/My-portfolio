import { useCallback, useMemo, useRef, useState } from 'react';
import type { MenuApi } from '@/context/contexts';

/** Open/closed state of the side menu and whether the page header is out of view. */
export function useMenuController(): MenuApi {
  const [open, setOpen] = useState(false);
  const [headerPassed, setHeaderPassed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);

  return useMemo(() => ({ open, headerPassed, setHeaderPassed, toggle, close, buttonRef }), [open, headerPassed, toggle, close]);
}
