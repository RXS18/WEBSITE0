import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'fr' | 'en';
export type L = Record<Lang, string>;

const fr = {
  nav: {
    home: 'Retour en haut',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    switchLang: 'Switch to English',
    links: [
      { id: 'renders', label: 'Créations 3D' },
      { id: 'visualizations', label: 'Visualisation' },
      { id: 'posters', label: 'Affiches' },
      { id: 'websites', label: 'Sites web' },
      { id: 'contact', label: 'Contact' },
    ],
  },
  hero: {
    eyebrow: 'Studio créatif · Goma, RDC',
    l1: 'Vos projets.',
    l2: 'dans le',
    l3: 'Virtuel.',
    sub: 'De la visualisation 3D à la création de sites web, des posters aux affiches : nous transformons vos idées en expériences visuelles et interactives.',
    cta: 'Voir nos créations',
    cta2: 'Nous écrire',
    scroll: 'Défiler',
  },
  stats: {
    founded: 'Année de création',
    posters: 'Affiches au portfolio',
    renders: 'Projets 3D rendus en interne',
    services: 'Métiers : affiche, web, 3D, animation',
  },
  renders: {
    title: 'Nos créations 3D',
    sub: "Des projets modélisés, éclairés et rendus entièrement en interne — architecture, intérieurs, produits et animation. Chaque image ci-dessous est notre propre travail.",
    view: 'Voir le projet',
  },
  compare: {
    title: 'Cycles ou EEVEE ?',
    sub: 'Même scène, deux moteurs de rendu. Glissez pour comparer la qualité et le temps de calcul.',
    hint: 'Glisser pour comparer',
    aria: 'Comparateur avant / après',
    tabs: ['Intérieur', 'Vaisseau'],
  },
  visualizations: {
    title: 'Visualisation de projets',
    sub: "Chaque projet commence par une idée. Nous vous accompagnons vers l'étape essentielle suivante — la visualisation — pour concrétiser vos investissements, vos bâtiments et vos produits.",
    cta: 'Nous en parler',
    waMsg: (t: string) => `Bonjour RXS Digital Works, je suis intéressé(e) par : ${t}.`,
    cards: [
      {
        title: 'Résidences, immeubles, complexes',
        text: "Visualisez votre maison familiale, un complexe résidentiel ou tout autre bâtiment avant même qu'il soit construit — y compris les améliorations envisagées.",
      },
      {
        title: 'Intérieurs',
        text: "Ambiances, éclairage et matières : testez l'aménagement d'une pièce avant d'acheter ou de construire.",
      },
      {
        title: 'Produits et concepts',
        text: 'Un rendu studio de votre produit, prêt pour votre catalogue, vos réseaux ou vos investisseurs.',
      },
    ],
  },
  posters: {
    title: 'Communication visuelle',
    sub: "Des visuels qui attirent l'attention de votre future clientèle. Nous vous proposons des posters, des affiches et des vidéos publicitaires qui mettent en valeur vos produits et vos services.",
    filters: { all: 'Tous', events: 'Événements', food: 'Restauration', brands: 'Marques', institutions: 'Écoles & institutions' },
    zoom: 'Agrandir',
    count: (n: number) => `${n} création${n > 1 ? 's' : ''}`,
  },
  websites: {
    title: 'Sites web',
    sub: 'Des solutions web adaptées à vos besoins. De la vitrine simple au site sur mesure, nous créons votre présence digitale avec style et performance.',
    popular: 'Plus populaire',
    quote: 'Sur devis',
    from: 'À partir de',
    cta: 'Commencer',
    bottom: "Besoin d'une solution personnalisée ? Contactez-nous pour un devis sur mesure.",
    bottomCta: 'Discuter de votre projet',
    waMsg: (p: string) => `Bonjour RXS Digital Works, je voudrais en savoir plus sur l'offre « ${p} ».`,
    waGeneric: "Bonjour RXS Digital Works, j'ai un projet de site web et j'aimerais en discuter.",
  },
  process: {
    title: 'Comment ça marche',
    sub: "Quatre étapes simples, de votre idée à la livraison.",
    steps: [
      { title: 'Brief', text: 'On écoute votre idée, votre public et vos contraintes.' },
      { title: 'Concept', text: 'Esquisses, moodboard ou maquette : vous validez la direction.' },
      { title: 'Production', text: 'Modélisation, rendu, mise en page ou développement, avec vos retours à chaque étape.' },
      { title: 'Livraison', text: "Fichiers prêts à l'emploi, pour l'écran comme pour l'impression." },
    ],
  },
  contact: {
    title: 'Créons ensemble',
    sub: 'Prêt à donner vie à votre vision ? Décrivez-nous votre projet : nous vous répondons directement sur WhatsApp.',
    formTitle: 'Parlez-nous de votre projet',
    name: 'Nom',
    namePh: 'Votre nom',
    reach: 'E-mail ou téléphone',
    reachPh: 'votre@email.com ou +243…',
    type: 'Type de projet',
    types: ['Affiche', 'Site web', 'Visualisation 3D', 'Autre'],
    message: 'Message',
    messagePh: 'Parlez-nous de votre projet…',
    whatsapp: 'Envoyer sur WhatsApp',
    email: 'Envoyer par e-mail',
    required: 'Ce champ est requis',
    hint: 'Votre message s’ouvre dans WhatsApp, prêt à envoyer.',
    opened: 'Message préparé. Il ne reste qu’à l’envoyer.',
    detailsTitle: 'Coordonnées',
    labels: { email: 'E-mail', phone: 'Téléphone', address: 'Atelier', instagram: 'Instagram', whatsapp: 'WhatsApp' },
    address: ['Q. Les volcans', 'Goma, République démocratique du Congo'],
    chat: 'Discuter maintenant',
    mailSubject: 'Nouveau projet',
    msgIntro: (name: string, type: string, reach: string, msg: string) =>
      `Bonjour RXS Digital Works,\nJe suis ${name}.\nProjet : ${type}\nContact : ${reach}\n\n${msg}`,
  },
  fab: {
    aria: 'Écrire sur WhatsApp',
    msg: "Bonjour RXS Digital Works, j'ai un projet et j'aimerais en discuter.",
  },
  lightbox: {
    close: 'Fermer',
    prev: 'Précédent',
    next: 'Suivant',
    discuss: 'Discuter de ce projet',
    waMsg: (t: string) => `Bonjour RXS Digital Works, ce projet m'intéresse : « ${t} ». Pouvons-nous en discuter ?`,
  },
  footer: {
    tagline: 'Nous créons des expériences visuelles extraordinaires depuis 2020.',
    top: 'Haut de page',
    rights: 'Tous droits réservés.',
  },
};

type Dict = typeof fr;

const en: Dict = {
  nav: {
    home: 'Back to top',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLang: 'Passer en français',
    links: [
      { id: 'renders', label: '3D Work' },
      { id: 'visualizations', label: 'Visualization' },
      { id: 'posters', label: 'Posters' },
      { id: 'websites', label: 'Websites' },
      { id: 'contact', label: 'Contact' },
    ],
  },
  hero: {
    eyebrow: 'Creative studio · Goma, DRC',
    l1: 'Your projects.',
    l2: 'in the',
    l3: 'Virtual.',
    sub: 'From 3D visualization to website design, from posters to print ads: we turn your ideas into visual, interactive experiences.',
    cta: 'See our work',
    cta2: 'Get in touch',
    scroll: 'Scroll',
  },
  stats: {
    founded: 'Year founded',
    posters: 'Posters in the portfolio',
    renders: '3D projects rendered in-house',
    services: 'Crafts: posters, web, 3D, animation',
  },
  renders: {
    title: 'Our 3D work',
    sub: 'Projects modelled, lit and rendered entirely in-house — architecture, interiors, products and animation. Every image below is our own work.',
    view: 'View project',
  },
  compare: {
    title: 'Cycles or EEVEE?',
    sub: 'Same scene, two render engines. Drag to compare quality and render time.',
    hint: 'Drag to compare',
    aria: 'Before / after comparison',
    tabs: ['Interior', 'Spaceship'],
  },
  visualizations: {
    title: 'Project visualization',
    sub: 'Every project starts with an idea. We guide you to the next essential step — visualization — so your investments, buildings and products become concrete.',
    cta: 'Talk to us about it',
    waMsg: (t: string) => `Hello RXS Digital Works, I'm interested in: ${t}.`,
    cards: [
      {
        title: 'Homes, buildings, complexes',
        text: 'See your family home, a residential complex or any other building before it is even built — including the improvements you have in mind.',
      },
      {
        title: 'Interiors',
        text: 'Mood, lighting and materials: try out a room layout before you buy or build.',
      },
      {
        title: 'Products and concepts',
        text: 'A studio render of your product, ready for your catalogue, social media or investors.',
      },
    ],
  },
  posters: {
    title: 'Visual communication',
    sub: 'Visuals that catch the eye of your future customers. We design posters, flyers and promo videos that showcase your products and services.',
    filters: { all: 'All', events: 'Events', food: 'Food', brands: 'Brands', institutions: 'Schools & institutions' },
    zoom: 'Enlarge',
    count: (n: number) => `${n} design${n > 1 ? 's' : ''}`,
  },
  websites: {
    title: 'Websites',
    sub: 'Web solutions tailored to your needs. From a simple showcase to a fully custom site, we build your digital presence with style and performance.',
    popular: 'Most popular',
    quote: 'Custom quote',
    from: 'From',
    cta: 'Get started',
    bottom: 'Need something tailor-made? Contact us for a custom quote.',
    bottomCta: 'Discuss your project',
    waMsg: (p: string) => `Hello RXS Digital Works, I'd like to know more about the "${p}" package.`,
    waGeneric: "Hello RXS Digital Works, I have a website project and I'd like to discuss it.",
  },
  process: {
    title: 'How it works',
    sub: 'Four simple steps, from your idea to delivery.',
    steps: [
      { title: 'Brief', text: 'We listen to your idea, your audience and your constraints.' },
      { title: 'Concept', text: 'Sketches, moodboard or mock-up: you approve the direction.' },
      { title: 'Production', text: 'Modelling, rendering, layout or development, with your feedback at every step.' },
      { title: 'Delivery', text: 'Ready-to-use files, for screen and for print.' },
    ],
  },
  contact: {
    title: "Let's create together",
    sub: 'Ready to bring your vision to life? Tell us about your project: we reply directly on WhatsApp.',
    formTitle: 'Tell us about your project',
    name: 'Name',
    namePh: 'Your name',
    reach: 'Email or phone',
    reachPh: 'you@email.com or +243…',
    type: 'Project type',
    types: ['Poster', 'Website', '3D visualization', 'Other'],
    message: 'Message',
    messagePh: 'Tell us about your project…',
    whatsapp: 'Send on WhatsApp',
    email: 'Send by email',
    required: 'This field is required',
    hint: 'Your message opens in WhatsApp, ready to send.',
    opened: 'Message ready. Just hit send.',
    detailsTitle: 'Contact details',
    labels: { email: 'Email', phone: 'Phone', address: 'Studio', instagram: 'Instagram', whatsapp: 'WhatsApp' },
    address: ['Q. Les volcans', 'Goma, Democratic Republic of the Congo'],
    chat: 'Chat now',
    mailSubject: 'New project',
    msgIntro: (name: string, type: string, reach: string, msg: string) =>
      `Hello RXS Digital Works,\nI'm ${name}.\nProject: ${type}\nContact: ${reach}\n\n${msg}`,
  },
  fab: {
    aria: 'Message us on WhatsApp',
    msg: "Hello RXS Digital Works, I have a project and I'd like to discuss it.",
  },
  lightbox: {
    close: 'Close',
    prev: 'Previous',
    next: 'Next',
    discuss: 'Discuss this project',
    waMsg: (t: string) => `Hello RXS Digital Works, I'm interested in this project: "${t}". Can we talk?`,
  },
  footer: {
    tagline: 'Creating extraordinary visual experiences since 2020.',
    top: 'Back to top',
    rights: 'All rights reserved.',
  },
};

const dictionaries: Record<Lang, Dict> = { fr, en };

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  /** Pick the current language from a {fr, en} pair. */
  l: (value: L) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = 'rxs-lang';

const initialLang = (): Lang => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch {
    /* private mode */
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang: (next) => {
        setLangState(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
      },
      t: dictionaries[lang],
      l: (v) => v[lang],
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
};
