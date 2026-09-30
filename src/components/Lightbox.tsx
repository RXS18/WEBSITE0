import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { asset } from '../lib/asset';
import { blurOf, full } from '../lib/media';
import { useI18n } from '../lib/i18n';
import { waLink } from '../lib/site';

export interface LightboxItem {
  type: 'image' | 'video';
  /** Path relative to /public (original image format, or the .mp4). */
  src: string;
  /** Videos: image path used for the poster and for the aspect ratio. */
  poster?: string;
  title: string;
  description?: string;
  meta?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  /** On-screen rect of the thumbnail that was tapped; the viewer springs out of it and back. */
  origin: DOMRect | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)';
const SPRING = 'cubic-bezier(0.22, 1.2, 0.36, 1)';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Apple's momentum projection: where a flick with velocity v (px/ms) would come to rest. */
const project = (v: number, rate = 0.998) => v * (rate / (1 - rate));

/** Progressive resistance past a boundary. */
const rubberband = (d: number, dim = 320, c = 0.55) =>
  Math.sign(d) * ((Math.abs(d) * dim * c) / (dim + c * Math.abs(d)));

interface DragState {
  id: number;
  x: number;
  y: number;
  lock: 'x' | 'y' | null;
  dx: number;
  dy: number;
  hist: { t: number; x: number; y: number }[];
}

const flipDelta = (el: HTMLElement, from: DOMRect) => {
  const to = el.getBoundingClientRect();
  return {
    dx: from.left + from.width / 2 - (to.left + to.width / 2),
    dy: from.top + from.height / 2 - (to.top + to.height / 2),
    s: from.width / to.width,
  };
};

const Viewer: React.FC<Omit<LightboxProps, 'index'> & { index: number }> = ({
  items, index, origin, onClose, onIndexChange,
}) => {
  const { t } = useI18n();
  const item = items[index];

  const mediaRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [openIndex] = useState(index);
  const closing = useRef(false);
  const drag = useRef<DragState | null>(null);
  const suppressClick = useRef(false);

  const go = useCallback(
    (step: number) => onIndexChange((index + step + items.length) % items.length),
    [index, items.length, onIndexChange]
  );

  /* ---- open: spring out of the thumbnail ---- */
  useLayoutEffect(() => {
    const el = mediaRef.current;
    backdropRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' });
    chromeRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, delay: 120, easing: 'ease-out', fill: 'backwards' });
    if (!el || !origin || prefersReducedMotion()) return;
    const { dx, dy, s } = flipDelta(el, origin);
    el.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${s})`, borderRadius: `${16 / s}px` },
        { transform: 'translate(0, 0) scale(1)', borderRadius: '12px' },
      ],
      { duration: 520, easing: EASE_OUT }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- focus + scroll lock ---- */
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  /* ---- preload neighbours ---- */
  useEffect(() => {
    [1, -1].forEach((step) => {
      const n = items[(index + step + items.length) % items.length];
      if (n && n.type === 'image') new Image().src = full(n.src);
    });
  }, [index, items]);

  /* ---- dismiss (reverse FLIP, or slide down after a drag) ---- */
  const dismiss = useCallback(
    (mode: 'flip' | 'down') => {
      if (closing.current) return;
      closing.current = true;
      const el = mediaRef.current;
      if (!el || prefersReducedMotion()) { onClose(); return; }

      const bd = backdropRef.current;
      const chrome = chromeRef.current;
      const bdOpacity = bd ? getComputedStyle(bd).opacity : '1';
      bd?.animate([{ opacity: Number(bdOpacity) }, { opacity: 0 }], { duration: 300, easing: 'ease-out', fill: 'forwards' });
      chrome?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, fill: 'forwards' });

      const from = el.style.transform || 'none';
      let anim: Animation;
      if (mode === 'flip' && origin && index === openIndex) {
        const { dx, dy, s } = flipDelta(el, origin);
        anim = el.animate(
          [
            { transform: 'none', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 1, offset: 0.82 },
            { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 0 },
          ],
          { duration: 400, easing: EASE_OUT, fill: 'forwards' }
        );
      } else {
        anim = el.animate(
          [
            { transform: from, opacity: 1 },
            { transform: `translateY(${window.innerHeight * 0.5}px) scale(0.9)`, opacity: 0 },
          ],
          { duration: 260, easing: 'cubic-bezier(0.4, 0, 1, 1)', fill: 'forwards' }
        );
      }
      anim.onfinish = () => onClose();
    },
    [index, onClose, origin, openIndex]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss('flip');
      if (e.key === 'ArrowRight' && items.length > 1) go(1);
      if (e.key === 'ArrowLeft' && items.length > 1) go(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dismiss, go, items.length]);

  /* ---- pointer gestures: 1:1 tracking, velocity-aware release ---- */
  const springBack = () => {
    const el = mediaRef.current;
    if (!el) return;
    const from = el.style.transform || 'none';
    el.style.transform = '';
    el.animate([{ transform: from }, { transform: 'none' }], { duration: 420, easing: SPRING });
    [backdropRef.current, chromeRef.current].forEach((n) => {
      if (!n) return;
      n.style.transition = 'opacity 300ms ease-out';
      n.style.opacity = '1';
    });
  };

  const applyDrag = (d: DragState) => {
    const el = mediaRef.current;
    if (!el) return;
    if (d.lock === 'y') {
      const ty = d.dy > 0 ? d.dy : rubberband(d.dy);
      el.style.transform = `translateY(${ty}px) scale(${1 - Math.min(Math.abs(ty), 400) / 2200})`;
      const o = String(1 - Math.min(Math.max(ty, 0) / 520, 0.8));
      [backdropRef.current, chromeRef.current].forEach((n) => {
        if (!n) return;
        n.style.transition = 'none';
        n.style.opacity = o;
      });
    } else if (d.lock === 'x') {
      el.style.transform = `translateX(${d.dx}px)`;
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (closing.current || e.button > 0) return;
    if (item.type === 'video') {
      const r = e.currentTarget.getBoundingClientRect();
      if (e.clientY > r.bottom - 64) return; // leave the native controls alone
    }
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, lock: null, dx: 0, dy: 0, hist: [{ t: e.timeStamp, x: e.clientX, y: e.clientY }] };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.lock) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return; // hysteresis
      d.lock = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x';
      if (d.lock === 'x' && (items.length < 2 || item.type === 'video')) { drag.current = null; return; }
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    d.dx = dx;
    d.dy = dy;
    d.hist.push({ t: e.timeStamp, x: e.clientX, y: e.clientY });
    if (d.hist.length > 6) d.hist.shift();
    applyDrag(d);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId || !d.lock) return;
    suppressClick.current = true;
    setTimeout(() => { suppressClick.current = false; }, 0);

    const last = d.hist[d.hist.length - 1];
    const ref = d.hist.find((h) => last.t - h.t <= 100) ?? d.hist[0];
    const dt = Math.max(1, last.t - ref.t);
    const w = mediaRef.current?.getBoundingClientRect().width ?? 300;

    if (d.lock === 'y') {
      const vy = (last.y - ref.y) / dt;
      if (d.dy + project(vy) > 160 && d.dy > 24) dismiss('down');
      else springBack();
    } else {
      const vx = (last.x - ref.x) / dt;
      const total = d.dx + project(vx, 0.99);
      if (Math.abs(total) > w * 0.35) {
        if (mediaRef.current) mediaRef.current.style.transform = '';
        go(total < 0 ? 1 : -1);
      } else springBack();
    }
  };

  /* ---- sizing: reserve the final box before the image loads, so the FLIP is exact ---- */
  const ratioKey = item.type === 'video' ? item.poster : item.src;
  const meta = ratioKey ? blurOf(ratioKey) : undefined;
  const ratio = meta ? meta.w / meta.h : 16 / 9;
  const boxStyle: React.CSSProperties = {
    aspectRatio: String(ratio),
    width: `min(100%, calc(68svh * ${ratio}))`,
    touchAction: 'none',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={() => { if (!suppressClick.current) dismiss('flip'); }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
    >
      <div ref={backdropRef} className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      <div ref={chromeRef} className="pointer-events-none absolute inset-0 z-10">
        <div className="pointer-events-auto flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6">
          <p className="text-sm tabular-nums text-white/50">
            {items.length > 1 ? `${index + 1} / ${items.length}` : ''}
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={(e) => { e.stopPropagation(); dismiss('flip'); }}
            aria-label={t.lightbox.close}
            className="press flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl hover:bg-white/20"
          >
            <X size={22} />
          </button>
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label={t.lightbox.prev}
              className="press pointer-events-auto absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 sm:flex"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label={t.lightbox.next}
              className="press pointer-events-auto absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 sm:flex"
            >
              <ChevronRight size={26} />
            </button>
          </>
        )}

        <div
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto absolute inset-x-0 bottom-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-16 text-center"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
        >
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-2xl">{item.title}</h3>
          {item.description && (
            <p className="mx-auto mt-1.5 max-w-xl text-sm text-white/70 sm:text-base">{item.description}</p>
          )}
          {item.meta && <p className="mt-2 font-mono text-xs tracking-wide text-white/45">{item.meta}</p>}
          <a
            href={waLink(t.lightbox.waMsg(item.title))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light press mt-4 !py-2.5 text-sm"
          >
            <MessageCircle size={16} />
            {t.lightbox.discuss}
          </a>
        </div>
      </div>

      <div
        key={index}
        ref={mediaRef}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={boxStyle}
        className={`relative mb-24 max-w-[calc(100%-2rem)] overflow-hidden rounded-xl bg-neutral-900 shadow-2xl sm:mb-28 ${
          index !== openIndex ? 'animate-pop' : ''
        }`}
      >
        {item.type === 'video' ? (
          <video
            src={asset(item.src)}
            poster={item.poster ? full(item.poster) : undefined}
            controls
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        ) : (
          <img
            src={full(item.src)}
            alt={item.title}
            draggable={false}
            className="h-full w-full select-none object-contain"
          />
        )}
      </div>
    </div>
  );
};

const Lightbox: React.FC<LightboxProps> = (props) => {
  if (props.index === null || props.items.length === 0) return null;
  return <Viewer {...props} index={props.index} />;
};

export default Lightbox;
