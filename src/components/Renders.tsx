import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Images, Play } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { renderProjects } from '../data/content';
import Img from './ui/Img';
import Reveal from './ui/Reveal';
import Lightbox, { type LightboxItem } from './Lightbox';
import { useLightbox } from '../hooks/useLightbox';
import Compare from './Compare';

const GAP = 16;

const Renders: React.FC = () => {
  const { t, l } = useI18n();
  const { index, origin, open, close, setIndex } = useLightbox();
  const [projectIdx, setProjectIdx] = useState(0);
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const items: LightboxItem[] = useMemo(() => {
    const p = renderProjects[projectIdx];
    return p.media.map((m) => ({
      type: m.type,
      src: m.src,
      poster: m.poster,
      title: p.title,
      description: l(m.description),
      meta: m.meta,
    }));
  }, [projectIdx, l]);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const i = Math.round(el.scrollLeft / (first.offsetWidth + GAP));
    setActive(Math.max(0, Math.min(renderProjects.length - 1, i)));
  }, []);

  const goTo = (i: number) => {
    const el = scroller.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    el.scrollTo({ left: i * (first.offsetWidth + GAP), behavior: 'smooth' });
  };

  const card = (p: (typeof renderProjects)[number], i: number) => {
    const videos = p.media.filter((m) => m.type === 'video').length;
    const images = p.media.length;
    const cover = p.media[0].poster ?? p.media[0].src;
    return (
      <button
        key={p.title}
        type="button"
        onClick={(e) => {
          setProjectIdx(i);
          open(0, e.currentTarget.firstElementChild);
        }}
        aria-label={`${t.renders.view}: ${p.title}`}
        className="press group block w-[82%] shrink-0 snap-center text-left md:w-auto"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/5">
          <div className="h-full w-full transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105">
            <Img path={cover} alt={p.title} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw" />
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
            {l(p.category)}
          </span>
          <span className="absolute bottom-3 right-3 flex gap-1.5">
            {videos > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-md">
                <Play className="h-3 w-3" aria-hidden /> {videos}
              </span>
            )}
            {images > 1 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-md">
                <Images className="h-3 w-3" aria-hidden /> {images}
              </span>
            )}
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em]">{p.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-white/60 md:line-clamp-none">{l(p.description)}</p>
      </button>
    );
  };

  return (
    <section id="renders" className="bg-black py-16 text-white sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-0 md:px-6 lg:px-8">
        <Reveal className="mb-12 px-6 text-center sm:mb-20 md:px-0">
          <h2 className="section-title mb-5 sm:mb-8">{t.renders.title}</h2>
          <p className="section-sub mx-auto max-w-4xl !text-white/60">{t.renders.sub}</p>
        </Reveal>

        <div
          ref={scroller}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 scroll-px-6 md:grid md:snap-none md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 lg:grid-cols-3"
        >
          {renderProjects.map((p, i) => (
            <React.Fragment key={p.title}>{card(p, i)}</React.Fragment>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {renderProjects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => goTo(i)}
              aria-label={p.title}
              aria-current={i === active}
              className="press flex h-6 w-4 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-4 bg-white' : 'w-1.5 bg-white/30'
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mt-20 px-6 sm:mt-32 md:px-0">
          <Compare />
        </div>
      </div>

      <Lightbox items={items} index={index} origin={origin} onClose={close} onIndexChange={setIndex} />
    </section>
  );
};

export default Renders;
