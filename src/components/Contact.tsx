import React, { useRef, useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Instagram } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  mailLink,
  waLink,
} from '../lib/site';
import Reveal from './ui/Reveal';

type FieldName = 'name' | 'reach' | 'message';
type Errors = Partial<Record<FieldName, boolean>>;

const inputCls =
  'w-full rounded-2xl bg-alt px-4 py-3.5 text-base text-fg placeholder:text-muted outline-none border border-transparent transition-colors duration-200 focus:border-fg/40 aria-[invalid=true]:border-red-600/60 dark:aria-[invalid=true]:border-red-400/60';

const cardCls =
  'press flex items-center gap-4 rounded-2xl bg-alt p-4 transition-colors duration-200 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40';

const Contact: React.FC = () => {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [reach, setReach] = useState('');
  const [message, setMessage] = useState('');
  const [typeIdx, setTypeIdx] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const reachRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validate = (): boolean => {
    const next: Errors = {
      name: !name.trim(),
      reach: !reach.trim(),
      message: !message.trim(),
    };
    setErrors(next);
    if (next.name) nameRef.current?.focus();
    else if (next.reach) reachRef.current?.focus();
    else if (next.message) messageRef.current?.focus();
    return !(next.name || next.reach || next.message);
  };

  const buildMsg = () =>
    t.contact.msgIntro(name.trim(), t.contact.types[typeIdx], reach.trim(), message.trim());

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setOpened(false);
      return;
    }
    window.open(waLink(buildMsg()), '_blank', 'noopener');
    setOpened(true);
  };

  const onEmail = () => {
    if (!validate()) return;
    window.location.href = mailLink(t.contact.mailSubject, buildMsg());
  };

  const clear = (f: FieldName) => {
    setOpened(false);
    if (errors[f]) setErrors((p) => ({ ...p, [f]: false }));
  };

  const err = (f: FieldName) =>
    errors[f] ? (
      <p id={`c-${f}-err`} className="mt-2 px-1 text-sm text-red-600 dark:text-red-400">
        {t.contact.required}
      </p>
    ) : null;

  const a11y = (f: FieldName) => ({
    'aria-invalid': errors[f] ? (true as const) : undefined,
    'aria-describedby': errors[f] ? `c-${f}-err` : undefined,
  });

  const label = 'mb-2 block px-1 text-sm font-medium text-muted';
  const phoneHref = `tel:+${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

  const rows: {
    key: string;
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
  }[] = [
    { key: 'email', icon: <Mail size={20} />, label: t.contact.labels.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { key: 'phone', icon: <Phone size={20} />, label: t.contact.labels.phone, value: PHONE_DISPLAY, href: phoneHref },
    {
      key: 'whatsapp',
      icon: <MessageCircle size={20} />,
      label: t.contact.labels.whatsapp,
      value: t.contact.chat,
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      external: true,
    },
    {
      key: 'instagram',
      icon: <Instagram size={20} />,
      label: t.contact.labels.instagram,
      value: INSTAGRAM_HANDLE,
      href: INSTAGRAM_URL,
      external: true,
    },
    {
      key: 'address',
      icon: <MapPin size={20} />,
      label: t.contact.labels.address,
      value: t.contact.address.join('\n'),
    },
  ];

  const rowBody = (r: (typeof rows)[number]) => (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fg text-surface" aria-hidden="true">
        {r.icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm text-muted">{r.label}</span>
        <span className="block whitespace-pre-line break-words text-lg font-medium leading-snug text-fg">{r.value}</span>
      </span>
    </>
  );

  return (
    <section id="contact" className="bg-surface py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="text-center mb-12 sm:mb-20">
          <h2 className="section-title mb-5 sm:mb-8">{t.contact.title}</h2>
          <p className="section-sub mx-auto max-w-4xl">{t.contact.sub}</p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Form: first on phones */}
          <Reveal className="order-1 lg:order-2">
            <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-card p-5 sm:p-8">
              <h3 className="mb-6 text-2xl font-semibold tracking-tight text-fg">{t.contact.formTitle}</h3>

              <div className="space-y-5">
                <div>
                  <label htmlFor="c-name" className={label}>{t.contact.name}</label>
                  <input
                    ref={nameRef}
                    id="c-name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    placeholder={t.contact.namePh}
                    onChange={(e) => { setName(e.target.value); clear('name'); }}
                    className={inputCls}
                    {...a11y('name')}
                  />
                  {err('name')}
                </div>

                <div>
                  <label htmlFor="c-reach" className={label}>{t.contact.reach}</label>
                  <input
                    ref={reachRef}
                    id="c-reach"
                    type="text"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    value={reach}
                    placeholder={t.contact.reachPh}
                    onChange={(e) => { setReach(e.target.value); clear('reach'); }}
                    className={inputCls}
                    {...a11y('reach')}
                  />
                  {err('reach')}
                </div>

                <div>
                  <span id="c-type-label" className={label}>{t.contact.type}</span>
                  <div role="radiogroup" aria-labelledby="c-type-label" className="flex flex-wrap gap-2">
                    {t.contact.types.map((ty, i) => {
                      const on = i === typeIdx;
                      return (
                        <button
                          key={ty}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          tabIndex={on ? 0 : -1}
                          onClick={() => { setTypeIdx(i); setOpened(false); }}
                          onKeyDown={(e) => {
                            const n = t.contact.types.length;
                            let to = -1;
                            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (i + 1) % n;
                            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (i + n - 1) % n;
                            if (to >= 0) {
                              e.preventDefault();
                              setTypeIdx(to);
                              (e.currentTarget.parentElement?.children[to] as HTMLElement | undefined)?.focus();
                            }
                          }}
                          className={`press min-h-[44px] rounded-full border px-4 text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/40 ${
                            on
                              ? 'border-transparent bg-fg text-surface'
                              : 'border-line bg-transparent text-fg hover:bg-alt'
                          }`}
                        >
                          {ty}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="c-message" className={label}>{t.contact.message}</label>
                  <textarea
                    ref={messageRef}
                    id="c-message"
                    rows={5}
                    value={message}
                    placeholder={t.contact.messagePh}
                    onChange={(e) => { setMessage(e.target.value); clear('message'); }}
                    className={`${inputCls} resize-none`}
                    {...a11y('message')}
                  />
                  {err('message')}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button type="submit" className="btn btn-primary press w-full">
                  <MessageCircle size={20} aria-hidden="true" />
                  {t.contact.whatsapp}
                </button>
                <button type="button" onClick={onEmail} className="btn btn-ghost press w-full">
                  <Mail size={20} aria-hidden="true" />
                  {t.contact.email}
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-muted">{t.contact.hint}</p>
              <div role="status" aria-live="polite">
                {opened && (
                  <p className="mt-2 text-center text-sm font-medium text-fg">{t.contact.opened}</p>
                )}
              </div>
            </form>
          </Reveal>

          {/* Details */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <h3 className="mb-5 text-2xl font-semibold tracking-tight text-fg">{t.contact.detailsTitle}</h3>
            </Reveal>
            <ul className="space-y-3">
              {rows.map((r, i) => (
                <Reveal as="li" key={r.key} delay={80 + i * 70}>
                  {r.href ? (
                    <a
                      href={r.href}
                      className={cardCls}
                      {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {rowBody(r)}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl bg-alt p-4">{rowBody(r)}</div>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
