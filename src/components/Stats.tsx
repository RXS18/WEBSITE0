import React from 'react';
import CountUp from './ui/CountUp';
import Reveal from './ui/Reveal';
import { useI18n } from '../lib/i18n';
import { posters, renderProjects } from '../data/content';

const Stats: React.FC = () => {
  const { t } = useI18n();
  const items = [
    { value: 2020, label: t.stats.founded },
    { value: posters.length, label: t.stats.posters },
    { value: renderProjects.length, label: t.stats.renders },
    { value: 4, label: t.stats.services },
  ];

  return (
    <section aria-label="RXS Digital Works" className="bg-surface py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 lg:grid-cols-4 lg:px-8">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="text-center lg:text-left">
            <div className="text-[clamp(2.5rem,9vw,4.5rem)] font-bold leading-none tracking-[-0.04em]">
              <CountUp value={s.value} />
            </div>
            <p className="mt-3 text-[0.9375rem] leading-snug text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Stats;
