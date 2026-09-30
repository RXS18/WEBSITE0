import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { visualizationImages } from '../data/content';
import { waLink } from '../lib/site';
import Img from './ui/Img';
import Reveal from './ui/Reveal';

const Visualizations: React.FC = () => {
  const { t } = useI18n();
  const v = t.visualizations;

  return (
    <section id="visualizations" className="bg-surface py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mb-12 text-center sm:mb-20">
          <h2 className="section-title mb-5 sm:mb-8">{v.title}</h2>
          <p className="section-sub mx-auto max-w-4xl">{v.sub}</p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
          {v.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <article className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-[28px] bg-alt">
                  <div className="h-full w-full transition-transform duration-700 ease-out [@media(hover:hover)]:group-hover:scale-105">
                    <Img path={visualizationImages[i]} alt={card.title} sizes="(min-width: 1024px) 33vw, 100vw" />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em]">{card.title}</h3>
                <p className="mt-3 text-muted">{card.text}</p>
                <a
                  href={waLink(v.waMsg(card.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press group/link mt-5 inline-flex items-center gap-0.5 font-medium text-fg"
                >
                  {v.cta}
                  <ChevronRight
                    className="h-5 w-5 transition-transform duration-300 group-hover/link:translate-x-1 group-active/link:translate-x-1"
                    aria-hidden
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Visualizations;
