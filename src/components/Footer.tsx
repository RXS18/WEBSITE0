import React from 'react';
import { ArrowUp, Instagram, Mail, MessageCircle } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { asset } from '../lib/asset';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_NUMBER } from '../lib/site';

const linkCls =
  'press inline-flex min-h-[44px] items-center gap-2 text-base text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-md';

const Footer: React.FC = () => {
  const { t } = useI18n();

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-black text-white pt-14 sm:pt-20 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <img src={asset('RXSlogo.svg')} alt="" className="h-[1.225rem] w-auto invert" />
              <span className="text-lg font-semibold tracking-tight">Digital Works</span>
            </div>
            <p className="mt-4 max-w-sm text-base text-white/60">{t.footer.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col">
              {t.nav.links.map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => goTo(link.id)} className={linkCls}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-col">
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <Instagram size={18} aria-hidden="true" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className={linkCls}>
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={`${linkCls} break-all`}>
                <Mail size={18} aria-hidden="true" className="shrink-0" />
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} RXS Digital Works. {t.footer.rights}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="press inline-flex min-h-[44px] items-center gap-2 self-start rounded-full bg-white/10 px-5 text-sm font-medium text-white backdrop-blur transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:self-auto"
          >
            <ArrowUp size={16} aria-hidden="true" />
            {t.footer.top}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
