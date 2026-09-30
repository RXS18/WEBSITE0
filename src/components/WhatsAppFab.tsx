import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { waLink } from '../lib/site';

const WhatsAppFab: React.FC = () => {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pulse, setPulse] = useState(false);
  const pulsed = useRef(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      setScrolled(window.scrollY > 500);
      setDialogOpen(document.body.style.overflow === 'hidden');
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });

    const mo = new MutationObserver(() => setDialogOpen(document.body.style.overflow === 'hidden'));
    mo.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    let io: IntersectionObserver | undefined;
    const contact = document.getElementById('contact');
    if (contact && typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(([e]) => setContactVisible(e.isIntersecting), { threshold: 0.1 });
      io.observe(contact);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      mo.disconnect();
      io?.disconnect();
    };
  }, []);

  const visible = scrolled && !contactVisible && !dialogOpen;

  useEffect(() => {
    if (visible && !pulsed.current) {
      pulsed.current = true;
      setPulse(true);
      const id = window.setTimeout(() => setPulse(false), 3000);
      return () => clearTimeout(id);
    }
  }, [visible]);

  return (
    <a
      href={waLink(t.fab.msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.fab.aria}
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
      className={`press fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366] ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        transition: 'opacity 300ms ease, transform 450ms cubic-bezier(0.22,1.25,0.36,1)',
      }}
    >
      {pulse && (
        <span aria-hidden="true" className="absolute inset-0 animate-ping1 rounded-full bg-[#25D366]/40" />
      )}
      <MessageCircle size={26} aria-hidden="true" className="relative" />
    </a>
  );
};

export default WhatsAppFab;
