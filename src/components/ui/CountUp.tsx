import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  /** Plain digits, no thousands separator (for years). */
  className?: string;
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Counts from 0 to `value` once when scrolled into view. */
const CountUp: React.FC<CountUpProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [instant] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined'
  );
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || instant) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        setN(Math.round(value * easeOutExpo(p)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, instant]);

  return <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>{instant ? value : n}</span>;
};

export default CountUp;
