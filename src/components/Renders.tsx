import React, { useState } from 'react';
import { Play, Images } from 'lucide-react';
import Lightbox, { LightboxItem } from './Lightbox';
import { asset } from '../lib/asset';

interface RenderProject {
  title: string;
  category: string;
  description: string;
  media: LightboxItem[];
}

const r = (path: string) => asset(`img/renders/${path}`);

const Renders: React.FC = () => {
  const projects: RenderProject[] = [
    {
      title: 'Villa & Mercedes-Benz',
      category: 'Architecture',
      description:
        "Étude d'éclairage nocturne d'une villa contemporaine : volumes en porte-à-faux et lumière rasante, cadrés en format ultra-large.",
      media: [
        { type: 'image', src: r('VillaWithMercedesBenz/01.jpg'), title: 'Villa & Mercedes-Benz', description: "Façade principale en contre-plongée." },
        { type: 'image', src: r('VillaWithMercedesBenz/02.jpg'), title: 'Villa & Mercedes-Benz', description: "Vue d'ensemble nocturne." },
        { type: 'image', src: r('VillaWithMercedesBenz/03.jpg'), title: 'Villa & Mercedes-Benz', description: "Détail de la lumière sous le porte-à-faux." }
      ]
    },
    {
      title: 'Peak Male Experience Room',
      category: 'Intérieur',
      description:
        "Intérieur en clair-obscur, éclairé uniquement par la lumière des stores et celle de l'écran. Rendu en Cycles et en EEVEE pour comparer qualité et temps de calcul.",
      media: [
        { type: 'image', src: r('PeakMaleExperienceRoom/01-cycles.jpg'), title: 'Peak Male Experience Room', description: 'Rendu final en Cycles.', meta: 'Cycles · 5 min 16 s' },
        { type: 'image', src: r('PeakMaleExperienceRoom/03-cycles.jpg'), title: 'Peak Male Experience Room', description: 'Second cadrage en Cycles.', meta: 'Cycles' },
        { type: 'image', src: r('PeakMaleExperienceRoom/02-eevee.jpg'), title: 'Peak Male Experience Room', description: 'Même scène en EEVEE : un rendu quasi instantané.', meta: 'EEVEE · 2 s' },
        { type: 'video', src: r('PeakMaleExperienceRoom/clip-01.mp4'), title: 'Peak Male Experience Room', description: 'Travelling animé dans la scène.', meta: '150 images · 30 fps' }
      ]
    },
    {
      title: 'Backrooms',
      category: 'Environnement',
      description:
        "Couloirs sans fin et néons blafards : un exercice d'ambiance sur les espaces liminaux et la lumière fluorescente.",
      media: [
        { type: 'image', src: r('Backrooms/03.jpg'), title: 'Backrooms', description: 'Rencontre au détour du couloir.' },
        { type: 'image', src: r('Backrooms/02.jpg'), title: 'Backrooms', description: 'Perspective de couloir.' },
        { type: 'image', src: r('Backrooms/01.jpg'), title: 'Backrooms', description: 'Étude de lumière.' }
      ]
    },
    {
      title: 'How Much A Dollar Really Cost',
      category: 'Animation',
      description:
        "Court métrage d'ambiance : une silhouette traverse un paysage minimaliste. Deux séquences animées en format cinéma.",
      media: [
        { type: 'image', src: r('HowMuchADollarReallyCost/01.jpg'), title: 'How Much A Dollar Really Cost', description: 'Plan large du paysage.' },
        { type: 'video', src: r('HowMuchADollarReallyCost/clip-01.mp4'), title: 'How Much A Dollar Really Cost', description: 'Première séquence animée.', meta: '12 s · 24 fps' },
        { type: 'video', src: r('HowMuchADollarReallyCost/clip-02.mp4'), title: 'How Much A Dollar Really Cost', description: 'Seconde séquence animée.', meta: '12 s · 24 fps' }
      ]
    },
    {
      title: 'Slick Spaceship',
      category: 'Concept',
      description:
        "Vaisseau filant au ras de l'océan : étude de surfaces laquées, de reflets et de rendu de l'eau, déclinée en EEVEE et en Cycles.",
      media: [
        { type: 'image', src: r('SlickSPaceShipCuisingCloseToTheOcean/02-cycles.jpg'), title: 'Slick Spaceship', description: 'Rendu en Cycles.', meta: 'Cycles' },
        { type: 'image', src: r('SlickSPaceShipCuisingCloseToTheOcean/01-eevee.jpg'), title: 'Slick Spaceship', description: 'Rendu en EEVEE.', meta: 'EEVEE' }
      ]
    },
    {
      title: 'PC Cooler Concept',
      category: 'Produit',
      description:
        "Visualisation produit d'un support ventilé pour ordinateur portable, en éclairage studio sur fond dégradé.",
      media: [
        { type: 'image', src: r('PCCoolerConcept/01.jpg'), title: 'PC Cooler Concept', description: 'Vue trois-quarts en éclairage studio.' }
      ]
    }
  ];

  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const openProject = (projectIndex: number) => {
    setActiveProject(projectIndex);
    setActiveItem(0);
  };

  const closeViewer = () => {
    setActiveProject(null);
    setActiveItem(null);
  };

  const activeMedia = activeProject === null ? [] : projects[activeProject].media;

  return (
    <section id="renders" className="py-24 lg:py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Nos créations 3D
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Des projets modélisés, éclairés et rendus entièrement en interne — architecture,
            intérieurs, produits et animation. Chaque image ci-dessous est notre propre travail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projects.map((project, index) => {
            const videoCount = project.media.filter((m) => m.type === 'video').length;
            const imageCount = project.media.length - videoCount;

            return (
              <button
                key={index}
                type="button"
                onClick={() => openProject(index)}
                aria-label={`Voir le projet : ${project.title}`}
                className="group text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40 rounded-2xl"
              >
                <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/3] bg-gray-900">
                  <img
                    src={project.media[0].src}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                  <span className="absolute top-4 left-4 bg-white/90 text-black px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                    {project.category}
                  </span>

                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    {videoCount > 0 && (
                      <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                        <Play size={12} /> {videoCount}
                      </span>
                    )}
                    {imageCount > 1 && (
                      <span className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                        <Images size={12} /> {imageCount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {project.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        items={activeMedia}
        index={activeItem}
        onClose={closeViewer}
        onIndexChange={setActiveItem}
      />
    </section>
  );
};

export default Renders;
