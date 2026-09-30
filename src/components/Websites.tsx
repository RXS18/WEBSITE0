import React from 'react';
import { Check } from 'lucide-react';
import { packages } from '../data/content';
import { useI18n } from '../lib/i18n';
import { SHOW_PRICES, waLink } from '../lib/site';
import Reveal from './ui/Reveal';

const Websites: React.FC = () => {
  const { t, l } = useI18n();

  return (
    <section id="websites" className="py-16 sm:py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="section-title mb-5 sm:mb-8">{t.websites.title}</h2>
            <p className="section-sub mx-auto max-w-4xl">{t.websites.sub}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:items-stretch">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            const inv = pkg.popular;
            const name = l(pkg.name);
            return (
              <Reveal
                key={name}
                delay={i * 90}
                className={`flex ${inv ? 'lg:-translate-y-3' : ''}`}
              >
                <article
                  className={`flex w-full flex-col rounded-[28px] p-7 sm:p-9 ${
                    inv ? 'bg-fg text-surface' : 'bg-alt text-fg'
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        inv ? 'bg-surface/15' : 'bg-fg/[0.08]'
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    {inv && (
                      <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold tracking-wide text-fg">
                        {t.websites.popular}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.02em]">{name}</h3>
                  <p className={`mt-2 text-[0.9375rem] leading-relaxed ${inv ? 'text-surface/70' : 'text-muted'}`}>
                    {l(pkg.description)}
                  </p>

                  <div className="mt-6 mb-7">
                    {SHOW_PRICES ? (
                      <>
                        <span className={`block text-sm ${inv ? 'text-surface/70' : 'text-muted'}`}>
                          {t.websites.from}
                        </span>
                        <span className="text-5xl font-bold tracking-[-0.03em] tabular-nums">${pkg.price}</span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold tracking-[-0.03em]">{t.websites.quote}</span>
                    )}
                  </div>

                  <ul className="mb-8 flex-1 space-y-3.5">
                    {pkg.features.map((f) => (
                      <li key={f.en} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            inv ? 'bg-surface text-fg' : 'bg-fg text-surface'
                          }`}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className={inv ? 'text-surface/90' : ''}>{l(f)}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={waLink(t.websites.waMsg(name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn press w-full ${inv ? 'btn-light' : 'btn-primary'}`}
                  >
                    {t.websites.cta}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 sm:mt-16 text-center">
            <p className="section-sub mx-auto mb-6 max-w-2xl !text-lg sm:!text-xl">{t.websites.bottom}</p>
            <a
              href={waLink(t.websites.waGeneric)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary press"
            >
              {t.websites.bottomCta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Websites;
