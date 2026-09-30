import React from 'react';
import { useI18n } from '../lib/i18n';
import Reveal from './ui/Reveal';

const Process: React.FC = () => {
  const { t } = useI18n();
  const steps = t.process.steps;

  return (
    <section id="process" className="py-16 sm:py-24 lg:py-32 bg-alt">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-20">
            <h2 className="section-title mb-5 sm:mb-8">{t.process.title}</h2>
            <p className="section-sub mx-auto max-w-4xl">{t.process.sub}</p>
          </div>
        </Reveal>

        <ol className="relative mx-auto max-w-xl lg:max-w-none lg:grid lg:grid-cols-4 lg:gap-10">
          {/* phone timeline rail */}
          <span
            aria-hidden="true"
            className="absolute left-[5px] top-2 bottom-2 w-px bg-line/15 lg:hidden"
          />
          {steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 120} className="relative pl-9 pb-12 last:pb-0 lg:pl-0 lg:pb-0 lg:pt-8">
              {/* phone dot */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full bg-fg lg:hidden"
              />
              {/* desktop hairline + dot */}
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 hidden h-px bg-line/15 lg:block"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 -top-[5px] hidden h-[11px] w-[11px] rounded-full bg-fg lg:block"
              />
              <span className="block text-5xl sm:text-6xl font-bold tabular-nums tracking-[-0.03em] text-fg/25">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
