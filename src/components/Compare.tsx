import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '../lib/i18n';
import { comparePairs } from '../data/content';
import { blurOf } from '../lib/media';
import Img from './ui/Img';
import Reveal from './ui/Reveal';

const clamp = (v: number) => Math.max(0, Math.min(100, v));
const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

const Compare: React.FC = () => {
  const { t } = useI18n();
  const [pairIdx, setPairIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const posRef = useRef(50);
  const raf = useRef(0);
  const dragging = useRef(false);
  const interacted = useRef(false);

  const pair = comparePairs[pairIdx];
  const dim = blurOf(pair.before.src);
  const ratio = dim ? `${dim.w} / ${dim.h}` : '16 / 9';

  const setPosition = useCallback((v: number, commit = true) => {
    const c = clamp(v);
    posRef.current = c;
    box.current?.style.setProperty('--pos', `${c}%`);
    if (commit) setPos(Math.round(c));
  }, []);

  const interact = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (!interacted.current) {
      interacted.current = true;
      setTouched(true);
    }
  }, []);

  const fromPointer = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    setPosition(((e.clientX - r.left) / r.width) * 100, false);
  };

  // Intro sweep
  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (interacted.current) return;
        const keys = [50, 28, 64, 50];
        const total = 1600;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / total);
          const seg = Math.min(keys.length - 2, Math.floor(p * (keys.length - 1)));
          const local = p * (keys.length - 1) - seg;
          setPosition(keys[seg] + (keys[seg + 1] - keys[seg]) * ease(local), false);
          if (p < 1) raf.current = requestAnimationFrame(step);
          else setPos(50);
        };
        raf.current = requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [setPosition]);

  const switchPair = (i: number) => {
    setPairIdx(i);
    setPosition(50);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 20 : 5;
    let v: number | null = null;
    if (e.key === 'ArrowLeft') v = posRef.current - step;
    else if (e.key === 'ArrowRight') v = posRef.current + step;
    else if (e.key === 'Home') v = 0;
    else if (e.key === 'End') v = 100;
    if (v === null) return;
    e.preventDefault();
    interact();
    setPosition(v);
  };

  const chip = (side: { label: string; time: string }) => side.label + (side.time ? ` · ${side.time}` : '');

  return (
    <div>
      <Reveal className="mb-8 text-center sm:mb-12">
        <h3 className="section-title mb-5 sm:mb-8">{t.compare.title}</h3>
        <p className="section-sub mx-auto max-w-3xl !text-white/60">{t.compare.sub}</p>
      </Reveal>

      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full bg-white/10 p-1" role="tablist">
          {t.compare.tabs.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={i === pairIdx}
              onClick={() => switchPair(i)}
              className={`press rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                i === pairIdx ? 'bg-white text-black' : 'text-white/70'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={box}
        role="slider"
        tabIndex={0}
        aria-label={t.compare.aria}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pos}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          interact();
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current) fromPointer(e);
        }}
        onPointerUp={() => {
          dragging.current = false;
          setPos(Math.round(posRef.current));
        }}
        onPointerCancel={() => {
          dragging.current = false;
          setPos(Math.round(posRef.current));
        }}
        className="relative mx-auto max-w-5xl cursor-ew-resize select-none overflow-hidden rounded-3xl bg-white/5"
        style={{ aspectRatio: ratio, touchAction: 'pan-y', ['--pos' as string]: '50%' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Img path={pair.after.src} alt={pair.after.label} sizes="(min-width: 1024px) 1024px, 100vw" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}>
          <Img path={pair.before.src} alt={pair.before.label} sizes="(min-width: 1024px) 1024px, 100vw" />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]"
          style={{ left: 'var(--pos)' }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-lg text-white shadow-lg backdrop-blur-md">
            <span aria-hidden className="-mt-0.5 tracking-tighter">‹ ›</span>
          </span>
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {chip(pair.before)}
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {chip(pair.after)}
        </span>
        <span
          className={`pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-md transition-opacity duration-500 ${
            touched ? 'opacity-0' : 'opacity-100'
          }`}
        >
          ↔ {t.compare.hint}
        </span>
      </div>
    </div>
  );
};

export default Compare;
