import { useCallback, useState } from 'react';

/** Tracks which item is open and the on-screen rect of the thumbnail that opened it. */
export const useLightbox = () => {
  const [index, setIndex] = useState<number | null>(null);
  const [origin, setOrigin] = useState<DOMRect | null>(null);

  const open = useCallback((i: number, el?: Element | null) => {
    setOrigin(el ? el.getBoundingClientRect() : null);
    setIndex(i);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    setOrigin(null);
  }, []);

  return { index, origin, open, close, setIndex };
};
