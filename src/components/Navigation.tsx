import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { asset } from '../lib/asset';
import { useI18n } from '../lib/i18n';

const LangToggle: React.FC<{ className?: string; light?: boolean }> = ({ className = '', light }) => {
  const { lang, setLang, t } = useI18n();
  const on = 'font-semibold';
  const off = light ? 'text-white/55' : 'text-muted';
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
      aria-label={t.nav.switchLang}
      className={`press rounded-full px-2.5 py-1.5 text-[0.8125rem] tracking-wide ${className}`}
    >
      <span className={lang === 'fr' ? on : off}>FR</span>
      <span className={light ? 'text-white/30' : 'text-muted/50'}> / </span>
      <span className={lang === 'en' ? on : off}>EN</span>
    </button>
  );
};

const Navigation: React.FC = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);
  useEffect(() => { openRef.current = open; }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const hero = document.getElementById('hero');
      const heroBottom = hero ? hero.offsetHeight - 72 : 0;
      setOverHero(y < heroBottom);

      const dy = y - lastY;
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 160 && !openRef.current);
        lastY = y;
      }
      if (y < 160) setHidden(false);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollToSection = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    );
  };

  const light = overHero && !open; // white text over the dark hero
  const glass = !overHero || open;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        glass
          ? 'bg-surface/70 shadow-[0_1px_0_rgb(var(--line)/0.08)] backdrop-blur-xl backdrop-saturate-150'
          : 'bg-transparent'
      } ${light ? 'text-white' : 'text-fg'}`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:h-16 lg:px-8">
        <button
          type="button"
          className="press flex items-center gap-2.5"
          onClick={() => scrollToSection('hero')}
          aria-label={t.nav.home}
        >
          <img
            src={asset('RXSlogo.svg')}
            alt="RXS Digital Works"
            className={`h-[1.05rem] w-auto object-contain transition-[filter] duration-300 ${
              light ? 'invert' : 'dark:invert'
            }`}
          />
          <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">Digital Works</span>
        </button>

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {t.nav.links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-[0.9375rem] font-medium transition-opacity hover:opacity-100 ${
                light ? 'opacity-85' : 'opacity-70'
              }`}
            >
              {link.label}
            </button>
          ))}
          <LangToggle light={light} className={light ? 'bg-white/10' : 'bg-fg/5'} />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LangToggle light={light} />
          <button
            className="press -mr-2 flex h-11 w-11 items-center justify-center"
            onClick={() => setOpen(!open)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex h-[calc(100svh-3.5rem)] flex-col px-5 pt-4">
            {t.nav.links.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
                className={`press hairline border-b py-5 text-left text-3xl font-semibold tracking-[-0.03em] text-fg transition-[opacity,transform] duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* scroll progress */}
      <div className="absolute inset-x-0 bottom-0 h-[2px]">
        <div
          ref={progressRef}
          className={`h-full origin-left ${light ? 'bg-white/70' : 'bg-fg'}`}
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </nav>
  );
};

export default Navigation;
