import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import Img from './ui/Img';
import { asset } from '../lib/asset';
import { useI18n } from '../lib/i18n';

const POSTER = 'img/renders/VillaWithMercedesBenz/01.jpg';

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Hero: React.FC = () => {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Motion is opt-out: skip the video for reduced-motion and data-saver users.
  const [playVideo] = useState(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    return !reduce && !saveData;
  });
  const [videoReady, setVideoReady] = useState(false);

  // Parallax: the film scales up and the copy fades as you scroll away.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9)));
      sectionRef.current?.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Don't decode video nobody can see.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !playVideo || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => undefined);
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [playVideo]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-black px-6 pb-24 pt-28 text-white sm:pt-32"
    >
      <div
        className="absolute inset-0"
        style={{ transform: 'scale(calc(1 + var(--p, 0) * 0.12))', willChange: 'transform' }}
      >
        <Img path={POSTER} alt="" eager sizes="100vw" />
        {playVideo && (
          <video
            ref={videoRef}
            src={asset('hero.mp4')}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onPlaying={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/80" />

      <div
        className="relative mx-auto w-full max-w-5xl text-center animate-fade-in-up"
        style={{
          opacity: 'calc(1 - var(--p, 0) * 1.3)',
          transform: 'translateY(calc(var(--p, 0) * -40px))',
        }}
      >
        <p className="mx-auto mb-6 inline-block rounded-full bg-white/12 px-4 py-1.5 text-[0.8125rem] font-medium tracking-wide text-white/90 backdrop-blur-xl">
          {t.hero.eyebrow}
        </p>

        <h1 className="text-[clamp(2.75rem,12.5vw,8rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          {t.hero.l1}
          <br />
          <span className="text-white/45">{t.hero.l2}</span>
          <br />
          {t.hero.l3}
        </h1>

        <p className="mx-auto mt-8 max-w-[32ch] text-[1.0625rem] leading-[1.5] tracking-[-0.011em] text-white/80 sm:mt-10 sm:max-w-2xl sm:text-xl md:text-2xl">
          {t.hero.sub}
        </p>

        <div className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <button onClick={() => go('renders')} className="btn btn-light press">
            <span>{t.hero.cta}</span>
            <ArrowDown size={18} />
          </button>
          <button onClick={() => go('contact')} className="btn btn-glass press">
            <MessageCircle size={18} />
            <span>{t.hero.cta2}</span>
          </button>
        </div>
      </div>

      <button
        onClick={() => go('renders')}
        aria-label={t.hero.scroll}
        className="absolute inset-x-0 bottom-6 mx-auto flex h-10 w-10 items-center justify-center text-white/60"
        style={{ opacity: 'calc(1 - var(--p, 0) * 4)' }}
      >
        <ArrowDown size={20} className="motion-safe:animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
