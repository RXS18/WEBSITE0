import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Posters: React.FC = () => {
  const posters = [
    {
      title: "Smart Cargo",
      description: "Service de livraison international.",
      image: import.meta.env.BASE_URL + "/img/KenBin0.png",
      size: "large"
    },
    {
      title: "City Food",
      description: "Menu pour City food, restaurant.",
      image: import.meta.env.BASE_URL + "/img/BenoitCityFood0.jpg",
      size: "medium"
    },
    {
      title: "Plug Debt",
      description: "A modern clothing brand",
      image: import.meta.env.BASE_URL + "/img/JoeAllan.jpg",
      size: "medium"
    },
    {
      title: "Investitutre à L'ELBE 2025",
      description: "Poster pour l'investiture de L'ELBE 2025",
      image: import.meta.env.BASE_URL + "/img/MANIF.ELBE.A4png.jpg",
      size: "large"
    },
    {
      title: "Institure à MAMUS 2025",
      description: "Poster pour l'investiture du nouveau gouvernement à Mama Mulezi S'econdaire 2025",
      image: import.meta.env.BASE_URL + "/img/InvestitureMamus.jpg",
      size: "large"
    },
    {
      title: "L'Art de la musique",
      description: "Maison de production d'artises musicaux",
      image: import.meta.env.BASE_URL + "/img/LogoL'artDeLaMusiqueV0.4by5.exp.png.jpg",
      size: "medium"
    },
    {
      title: "Monica's Delicacies",
      description: "A bakery",
      image: import.meta.env.BASE_URL + "/img/MonicaTsongo.png",
      size: "small"
    },
    {
      title: "la journée mondiale des sols. CADASTRE AGRICOL DU NORK-KIVU",
      description: "Affiche simple informartive",
      image: import.meta.env.BASE_URL + "/img/BeneditcBusole1.jpg",
      size: "large"
    },
    {
      title: "Flocon Doré",
      description: "La vente de pop corn",
      image: import.meta.env.BASE_URL + "/img/KakwisiAnge.png",
      size: "medium"
    },
    {
      title: "L'Investiture",
      description: "Affiche teaser pour l'investiture du nouveau gouvernement scolaire à Mama Mulezi",
      image: import.meta.env.BASE_URL + "/img/GhandhiHoly-Investiture.jpg",
      size: "large"
    },
    {
      title: "Ciné Date",
      description: "Affiche pour une soirée cinéma organisée par Kivu New Era",
      image: import.meta.env.BASE_URL + "/img/KennyBin-CineDate.jpg",
      size: "medium"
    },
    {
      title: "Auto Show 2026",
      description: "Affiche pour l'Auto Show organisé par Kivu New Era & S_MVN",
      image: import.meta.env.BASE_URL + "/img/AutoShow.jpeg",
      size: "large"
    },
    {
      title: "Kivu New Era",
      description: "Identité visuelle et logo de marque",
      image: import.meta.env.BASE_URL + "/img/KivuNewEra-Logo.png",
      size: "small"
    },
    {
      title: "Spéciale Sortie des Couples",
      description: "Affiche événementielle pour une soirée dédiée aux couples",
      image: import.meta.env.BASE_URL + "/img/DonelShanny-SortieCouples.jpg",
      size: "medium"
    }

  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const go = useCallback((step: number) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + step + posters.length) % posters.length;
    });
  }, [posters.length]);

  // Keyboard controls + background scroll lock while the viewer is open
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, go]);

  const activePoster = activeIndex === null ? null : posters[activeIndex];

  return (
    <section id="posters" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Communication Visuelle
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Des visuels qui attirent l'attention de votre future clientelle, nous vous proposons des Posters, Affiches, Vidéos publicitaire qui favorisent vos produits et services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {posters.map((poster, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Agrandir : ${poster.title}`}
              className={`group cursor-pointer text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-black/40 rounded-2xl ${
                poster.size === 'large' ? 'md:col-span-2 lg:row-span-2' :
                poster.size === 'medium' ? 'md:col-span-1 lg:row-span-1' :
                'md:col-span-1 lg:row-span-1'
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-white shadow-lg">
                <img
                  src={poster.image}
                  alt={poster.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {poster.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {poster.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activePoster && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePoster.title}
          onClick={close}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Poster précédent"
            className="absolute left-2 sm:left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Poster suivant"
            className="absolute right-2 sm:right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronRight size={28} />
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full flex flex-col items-center"
          >
            <img
              src={activePoster.image}
              alt={activePoster.title}
              className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
            />
            <figcaption className="mt-6 text-center px-4">
              <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">
                {activePoster.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
                {activePoster.description}
              </p>
              <p className="text-white/40 text-xs mt-4">
                {(activeIndex ?? 0) + 1} / {posters.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default Posters;
