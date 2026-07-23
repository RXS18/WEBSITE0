import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  description?: string;
  meta?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/**
 * Fullscreen media viewer shared by the poster grid and the 3D showcase.
 * Closes on Escape or backdrop click, steps through items with the arrow keys.
 */
const Lightbox: React.FC<LightboxProps> = ({ items, index, onClose, onIndexChange }) => {
  const isOpen = index !== null && items.length > 0;

  const go = useCallback(
    (step: number) => {
      if (index === null || items.length === 0) return;
      onIndexChange((index + step + items.length) % items.length);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, go]);

  if (!isOpen || index === null) return null;

  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X size={24} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Précédent"
            className="absolute left-2 sm:left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Suivant"
            className="absolute right-2 sm:right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <figure
        onClick={(e) => e.stopPropagation()}
        className="max-w-6xl w-full flex flex-col items-center"
      >
        {item.type === 'video' ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="max-h-[78vh] w-auto max-w-full rounded-lg shadow-2xl bg-black"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title}
            className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
          />
        )}

        <figcaption className="mt-6 text-center px-4">
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">{item.title}</h3>
          {item.description && (
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
              {item.description}
            </p>
          )}
          {item.meta && (
            <p className="text-white/50 text-xs mt-3 font-mono tracking-wide">{item.meta}</p>
          )}
          {items.length > 1 && (
            <p className="text-white/40 text-xs mt-4">
              {index + 1} / {items.length}
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  );
};

export default Lightbox;
