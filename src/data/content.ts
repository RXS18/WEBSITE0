import { Globe, Smartphone, Zap } from 'lucide-react';
import type { L } from '../lib/i18n';

export type PosterCategory = 'events' | 'food' | 'brands' | 'institutions';

export interface PosterData {
  src: string; // relative to /public, original format (webp variants are derived)
  title: L;
  description: L;
  category: PosterCategory;
}

export const posters: PosterData[] = [
  { src: 'img/KenBin0.png', category: 'brands',
    title: { fr: 'Smart Cargo', en: 'Smart Cargo' },
    description: { fr: 'Service de livraison international.', en: 'International delivery service.' } },
  { src: 'img/BenoitCityFood0.jpg', category: 'food',
    title: { fr: 'City Food', en: 'City Food' },
    description: { fr: 'Menu pour City Food, restaurant.', en: 'Menu for City Food, a restaurant.' } },
  { src: 'img/JoeAllan.jpg', category: 'brands',
    title: { fr: 'Plug Debt', en: 'Plug Debt' },
    description: { fr: 'Marque de vêtements contemporaine.', en: 'Contemporary clothing brand.' } },
  { src: 'img/MANIF.ELBE.A4png.jpg', category: 'institutions',
    title: { fr: "Investiture à L'ELBE 2025", en: "L'ELBE Investiture 2025" },
    description: { fr: "Affiche pour l'investiture de L'ELBE 2025.", en: "Poster for the L'ELBE 2025 investiture." } },
  { src: 'img/InvestitureMamus.jpg', category: 'institutions',
    title: { fr: 'Investiture à MAMUS 2025', en: 'MAMUS Investiture 2025' },
    description: {
      fr: "Affiche pour l'investiture du nouveau gouvernement à Mama Mulezi Secondaire, 2025.",
      en: 'Poster for the new student government investiture at Mama Mulezi Secondary, 2025.',
    } },
  { src: "img/LogoL'artDeLaMusiqueV0.4by5.exp.png.jpg", category: 'brands',
    title: { fr: "L'Art de la Musique", en: "L'Art de la Musique" },
    description: { fr: "Maison de production d'artistes musicaux.", en: 'Music artist production house.' } },
  { src: 'img/MonicaTsongo.png', category: 'food',
    title: { fr: "Monica's Delicacies", en: "Monica's Delicacies" },
    description: { fr: 'Pâtisserie artisanale.', en: 'Artisan bakery.' } },
  { src: 'img/BeneditcBusole1.jpg', category: 'institutions',
    title: { fr: 'Journée mondiale des sols', en: 'World Soil Day' },
    description: {
      fr: 'Affiche informative pour le Cadastre Agricole du Nord-Kivu.',
      en: 'Informational poster for the North Kivu Agricultural Cadastre.',
    } },
  { src: 'img/KakwisiAnge.png', category: 'food',
    title: { fr: 'Flocon Doré', en: 'Flocon Doré' },
    description: { fr: 'Vente de pop-corn.', en: 'Popcorn vendor.' } },
  { src: 'img/GhandhiHoly-Investiture.jpg', category: 'institutions',
    title: { fr: "L'Investiture", en: 'The Investiture' },
    description: {
      fr: "Affiche teaser pour l'investiture du nouveau gouvernement scolaire à Mama Mulezi.",
      en: 'Teaser poster for the new student government investiture at Mama Mulezi.',
    } },
  { src: 'img/KennyBin-CineDate.jpg', category: 'events',
    title: { fr: 'Ciné Date', en: 'Ciné Date' },
    description: { fr: 'Affiche pour une soirée cinéma organisée par Kivu New Era.', en: 'Poster for a movie night hosted by Kivu New Era.' } },
  { src: 'img/AutoShow.jpeg', category: 'events',
    title: { fr: 'Auto Show 2026', en: 'Auto Show 2026' },
    description: { fr: "Affiche pour l'Auto Show organisé par Kivu New Era & S_MVN.", en: 'Poster for the Auto Show hosted by Kivu New Era & S_MVN.' } },
  { src: 'img/KivuNewEra-Logo.png', category: 'brands',
    title: { fr: 'Kivu New Era', en: 'Kivu New Era' },
    description: { fr: 'Identité visuelle et logo de marque.', en: 'Visual identity and brand logo.' } },
  { src: 'img/DonelShanny-SortieCouples.jpg', category: 'events',
    title: { fr: 'Spéciale Sortie des Couples', en: 'Couples Night Special' },
    description: { fr: 'Affiche événementielle pour une soirée dédiée aux couples.', en: 'Event poster for an evening dedicated to couples.' } },
];

export interface RenderMedia {
  type: 'image' | 'video';
  src: string; // relative to /public
  poster?: string; // for videos: image path (original format) used as thumbnail
  description: L;
  meta?: string;
}

export interface RenderProject {
  title: string;
  category: L;
  description: L;
  media: RenderMedia[];
}

const R = (p: string) => `img/renders/${p}`;

export const renderProjects: RenderProject[] = [
  {
    title: 'Villa & Mercedes-Benz',
    category: { fr: 'Architecture', en: 'Architecture' },
    description: {
      fr: "Étude d'éclairage nocturne d'une villa contemporaine : volumes en porte-à-faux et lumière rasante, cadrés en format ultra-large.",
      en: 'Night lighting study of a contemporary villa: cantilevered volumes and raking light, framed in ultra-wide format.',
    },
    media: [
      { type: 'image', src: R('VillaWithMercedesBenz/01.jpg'), description: { fr: 'Façade principale en contre-plongée.', en: 'Main façade, low angle.' } },
      { type: 'image', src: R('VillaWithMercedesBenz/02.jpg'), description: { fr: "Vue d'ensemble nocturne.", en: 'Night overview.' } },
      { type: 'image', src: R('VillaWithMercedesBenz/03.jpg'), description: { fr: 'Détail de la lumière sous le porte-à-faux.', en: 'Light detail under the cantilever.' } },
    ],
  },
  {
    title: 'Peak Male Experience Room',
    category: { fr: 'Intérieur', en: 'Interior' },
    description: {
      fr: "Intérieur en clair-obscur, éclairé uniquement par la lumière des stores et celle de l'écran. Rendu en Cycles et en EEVEE pour comparer qualité et temps de calcul.",
      en: 'Chiaroscuro interior lit only by blind light and the screen glow. Rendered in Cycles and EEVEE to compare quality and render time.',
    },
    media: [
      { type: 'image', src: R('PeakMaleExperienceRoom/01-cycles.jpg'), description: { fr: 'Rendu final en Cycles.', en: 'Final render in Cycles.' }, meta: 'Cycles · 5 min 16 s' },
      { type: 'image', src: R('PeakMaleExperienceRoom/03-cycles.jpg'), description: { fr: 'Second cadrage en Cycles.', en: 'Second framing in Cycles.' }, meta: 'Cycles' },
      { type: 'image', src: R('PeakMaleExperienceRoom/02-eevee.jpg'), description: { fr: 'Même scène en EEVEE : un rendu quasi instantané.', en: 'Same scene in EEVEE: a near-instant render.' }, meta: 'EEVEE · 2 s' },
      { type: 'video', src: R('PeakMaleExperienceRoom/clip-01.mp4'), poster: R('PeakMaleExperienceRoom/01-cycles.jpg'), description: { fr: 'Travelling animé dans la scène.', en: 'Animated tracking shot through the scene.' }, meta: '150 frames · 30 fps' },
    ],
  },
  {
    title: 'Backrooms',
    category: { fr: 'Environnement', en: 'Environment' },
    description: {
      fr: "Couloirs sans fin et néons blafards : un exercice d'ambiance sur les espaces liminaux et la lumière fluorescente.",
      en: 'Endless corridors and pale neon: a mood study on liminal spaces and fluorescent light.',
    },
    media: [
      { type: 'image', src: R('Backrooms/03.jpg'), description: { fr: 'Rencontre au détour du couloir.', en: 'An encounter around the corner.' } },
      { type: 'image', src: R('Backrooms/02.jpg'), description: { fr: 'Perspective de couloir.', en: 'Corridor perspective.' } },
      { type: 'image', src: R('Backrooms/01.jpg'), description: { fr: 'Étude de lumière.', en: 'Lighting study.' } },
    ],
  },
  {
    title: 'How Much A Dollar Really Cost',
    category: { fr: 'Animation', en: 'Animation' },
    description: {
      fr: "Court métrage d'ambiance : une silhouette traverse un paysage minimaliste. Deux séquences animées en format cinéma.",
      en: 'Atmospheric short film: a silhouette crosses a minimalist landscape. Two animated sequences in cinema format.',
    },
    media: [
      { type: 'image', src: R('HowMuchADollarReallyCost/01.jpg'), description: { fr: 'Plan large du paysage.', en: 'Wide shot of the landscape.' } },
      { type: 'video', src: R('HowMuchADollarReallyCost/clip-01.mp4'), poster: R('HowMuchADollarReallyCost/01.jpg'), description: { fr: 'Première séquence animée.', en: 'First animated sequence.' }, meta: '12 s · 24 fps' },
      { type: 'video', src: R('HowMuchADollarReallyCost/clip-02.mp4'), poster: R('HowMuchADollarReallyCost/01.jpg'), description: { fr: 'Seconde séquence animée.', en: 'Second animated sequence.' }, meta: '12 s · 24 fps' },
    ],
  },
  {
    title: 'Slick Spaceship',
    category: { fr: 'Concept', en: 'Concept' },
    description: {
      fr: "Vaisseau filant au ras de l'océan : étude de surfaces laquées, de reflets et de rendu de l'eau, déclinée en EEVEE et en Cycles.",
      en: 'A spaceship skimming the ocean: a study of lacquered surfaces, reflections and water rendering, in EEVEE and Cycles.',
    },
    media: [
      { type: 'image', src: R('SlickSPaceShipCuisingCloseToTheOcean/02-cycles.jpg'), description: { fr: 'Rendu en Cycles.', en: 'Cycles render.' }, meta: 'Cycles' },
      { type: 'image', src: R('SlickSPaceShipCuisingCloseToTheOcean/01-eevee.jpg'), description: { fr: 'Rendu en EEVEE.', en: 'EEVEE render.' }, meta: 'EEVEE' },
    ],
  },
  {
    title: 'PC Cooler Concept',
    category: { fr: 'Produit', en: 'Product' },
    description: {
      fr: "Visualisation produit d'un support ventilé pour ordinateur portable, en éclairage studio sur fond dégradé.",
      en: 'Product visualization of a ventilated laptop stand, studio-lit on a gradient backdrop.',
    },
    media: [
      { type: 'image', src: R('PCCoolerConcept/01.jpg'), description: { fr: 'Vue trois-quarts en éclairage studio.', en: 'Three-quarter view, studio lighting.' } },
    ],
  },
];

/** Before/after pairs for the Cycles vs EEVEE comparator. `before` = slower/higher quality. */
export const comparePairs = [
  {
    title: 'Peak Male Experience Room',
    before: { src: R('PeakMaleExperienceRoom/01-cycles.jpg'), label: 'Cycles', time: '5 min 16 s' },
    after: { src: R('PeakMaleExperienceRoom/02-eevee.jpg'), label: 'EEVEE', time: '2 s' },
  },
  {
    title: 'Slick Spaceship',
    before: { src: R('SlickSPaceShipCuisingCloseToTheOcean/02-cycles.jpg'), label: 'Cycles', time: '' },
    after: { src: R('SlickSPaceShipCuisingCloseToTheOcean/01-eevee.jpg'), label: 'EEVEE', time: '' },
  },
];

export const visualizationImages = [
  R('VillaWithMercedesBenz/01.jpg'),
  R('PeakMaleExperienceRoom/01-cycles.jpg'),
  R('PCCoolerConcept/01.jpg'),
];

export interface PackageData {
  name: L;
  price: number;
  description: L;
  features: L[];
  icon: typeof Globe;
  popular: boolean;
}

export const packages: PackageData[] = [
  {
    name: { fr: 'Site Vitrine – Basique', en: 'Showcase Site – Basic' },
    price: 50,
    description: { fr: 'Parfait pour débuter votre présence en ligne', en: 'Perfect to start your online presence' },
    features: [
      { fr: 'Site simple (1–3 pages : accueil, à propos, contact)', en: 'Simple site (1–3 pages: home, about, contact)' },
      { fr: 'Design responsive (ordinateur + téléphone)', en: 'Responsive design (desktop + phone)' },
      { fr: 'Maintenance basique : 2–5 $/mois selon le domaine', en: 'Basic maintenance: $2–5/month depending on the domain' },
      { fr: 'Options : adresse e-mail professionnelle, formulaire de contact', en: 'Options: professional email address, contact form' },
    ],
    icon: Globe,
    popular: false,
  },
  {
    name: { fr: 'Pack Standard – Professionnel', en: 'Standard Pack – Professional' },
    price: 200,
    description: { fr: 'Solution complète pour une présence professionnelle', en: 'A complete solution for a professional presence' },
    features: [
      { fr: "Site complet (jusqu'à 6 pages : accueil, à propos, services, contact, blog, galerie…)", en: 'Full site (up to 6 pages: home, about, services, contact, blog, gallery…)' },
      { fr: 'Optimisation SEO de base (meilleure visibilité sur Google)', en: 'Basic SEO (better visibility on Google)' },
      { fr: 'Formulaire de contact + intégration Google Maps', en: 'Contact form + Google Maps integration' },
      { fr: 'Design plus travaillé (animations, visuels personnalisés)', en: 'More refined design (animations, custom visuals)' },
      { fr: 'Maintenance : 5–10 $/mois (inclut mises à jour & petite assistance)', en: 'Maintenance: $5–10/month (includes updates & light support)' },
      { fr: 'Extras possibles : plusieurs adresses e-mail pro, sauvegardes automatiques', en: 'Possible extras: several professional emails, automatic backups' },
    ],
    icon: Smartphone,
    popular: true,
  },
  {
    name: { fr: 'Pack Premium – Sur Mesure', en: 'Premium Pack – Custom' },
    price: 500,
    description: { fr: 'Solution avancée pour des besoins spécifiques', en: 'An advanced solution for specific needs' },
    features: [
      { fr: 'Site avancé (e-commerce, réservation en ligne, catalogue produit, espace client…)', en: 'Advanced site (e-commerce, online booking, product catalogue, client area…)' },
      { fr: 'Design sur mesure avec identité visuelle complète', en: 'Custom design with a full visual identity' },
      { fr: 'Optimisation SEO avancée + Google Analytics', en: 'Advanced SEO + Google Analytics' },
      { fr: 'Sécurité renforcée (SSL, anti-spam, sauvegardes régulières)', en: 'Enhanced security (SSL, anti-spam, regular backups)' },
      { fr: 'Intégration réseaux sociaux & automatisations (WhatsApp, Messenger, etc.)', en: 'Social media integration & automations (WhatsApp, Messenger, etc.)' },
      { fr: 'Maintenance : 10–20 $/mois (assistance prioritaire, suivi technique)', en: 'Maintenance: $10–20/month (priority support, technical follow-up)' },
    ],
    icon: Zap,
    popular: false,
  },
];
