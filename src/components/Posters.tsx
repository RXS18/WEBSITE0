import React, { useMemo, useState } from 'react';
import { posters, type PosterCategory } from '../data/content';
import { useI18n } from '../lib/i18n';
import { useLightbox } from '../hooks/useLightbox';
import Lightbox, { type LightboxItem } from './Lightbox';
import Img from './ui/Img';
import Reveal from './ui/Reveal';

type Filter = 'all' | PosterCategory;
const FILTERS: Filter[] = ['all', 'events', 'food', 'brands', 'institutions'];

const Posters: React.FC = () => {
  const { t, l } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const { index, origin, open, close, setIndex } = useLightbox();

  const visible = useMemo(
    () => (filter === 'all' ? posters : posters.filter((p) => p.category === filter)),
    [filter]
  );

  const items: LightboxItem[] = useMemo(
    () =>
      visible.map((p) => ({
        type: 'image',
        src: p.src,
        title: l(p.title),
        description: l(p.description),
      })),
    [visible, l]
  );

  return (
    <section id="posters" className="py-16 sm:py-24 lg:py-32 bg-alt">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="section-title mb-5 sm:mb-8">{t.posters.title}</h2>
            <p className="section-sub mx-auto max-w-4xl">{t.posters.sub}</p>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className="mb-8 sm:mb-12">
            <div className="-mx-6 px-6 md:mx-0 md:px-0 flex gap-2 overflow-x-auto no-scrollbar md:justify-center">
              {FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f)}
                    className={`press shrink-0 rounded-full px-4 py-2 text-[0.9375rem] font-medium whitespace-nowrap ${
                      active ? 'bg-fg text-surface' : 'bg-fg/[0.08] text-fg'
                    }`}
                  >
                    {t.posters.filters[f]}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-center text-sm text-muted tabular-nums" aria-live="polite">
              {t.posters.count(visible.length)}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {visible.map((poster, i) => {
            const title = l(poster.title);
            return (
              <button
                key={`${filter}-${poster.src}`}
                type="button"
                aria-label={`${t.posters.zoom}: ${title}`}
                onClick={(e) => open(i, e.currentTarget.querySelector('[data-thumb]') ?? e.currentTarget)}
                className="group animate-pop relative block w-full text-left"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div
                  data-thumb
                  className="press relative aspect-[3/4] overflow-hidden rounded-2xl bg-card group-active:scale-[0.96]"
                >
                  <div className="h-full w-full transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105">
                    <Img
                      path={poster.src}
                      alt={title}
                      sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-3 pt-12 sm:p-5 sm:pt-16 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                    <h3 className="text-[0.9375rem] sm:text-lg font-semibold leading-tight tracking-[-0.01em]">
                      {title}
                    </h3>
                    <p className="mt-1 hidden sm:block text-sm leading-snug text-white/80 line-clamp-2">
                      {l(poster.description)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox items={items} index={index} origin={origin} onClose={close} onIndexChange={setIndex} />
    </section>
  );
};

export default Posters;
