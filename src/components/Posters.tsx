import React, { useState } from 'react';
import Lightbox, { LightboxItem } from './Lightbox';
import { asset } from '../lib/asset';

interface Poster extends LightboxItem {
  size: 'large' | 'medium' | 'small';
}

const Posters: React.FC = () => {
  const posters: Poster[] = [
    {
      type: 'image',
      title: "Smart Cargo",
      description: "Service de livraison international.",
      src: asset("img/KenBin0.png"),
      size: "large"
    },
    {
      type: 'image',
      title: "City Food",
      description: "Menu pour City Food, restaurant.",
      src: asset("img/BenoitCityFood0.jpg"),
      size: "medium"
    },
    {
      type: 'image',
      title: "Plug Debt",
      description: "Marque de vêtements contemporaine.",
      src: asset("img/JoeAllan.jpg"),
      size: "medium"
    },
    {
      type: 'image',
      title: "Investiture à L'ELBE 2025",
      description: "Affiche pour l'investiture de L'ELBE 2025.",
      src: asset("img/MANIF.ELBE.A4png.jpg"),
      size: "large"
    },
    {
      type: 'image',
      title: "Investiture à MAMUS 2025",
      description: "Affiche pour l'investiture du nouveau gouvernement à Mama Mulezi Secondaire, 2025.",
      src: asset("img/InvestitureMamus.jpg"),
      size: "large"
    },
    {
      type: 'image',
      title: "L'Art de la Musique",
      description: "Maison de production d'artistes musicaux.",
      src: asset("img/LogoL'artDeLaMusiqueV0.4by5.exp.png.jpg"),
      size: "medium"
    },
    {
      type: 'image',
      title: "Monica's Delicacies",
      description: "Pâtisserie artisanale.",
      src: asset("img/MonicaTsongo.png"),
      size: "small"
    },
    {
      type: 'image',
      title: "Journée mondiale des sols",
      description: "Affiche informative pour le Cadastre Agricole du Nord-Kivu.",
      src: asset("img/BeneditcBusole1.jpg"),
      size: "large"
    },
    {
      type: 'image',
      title: "Flocon Doré",
      description: "Vente de pop-corn.",
      src: asset("img/KakwisiAnge.png"),
      size: "medium"
    },
    {
      type: 'image',
      title: "L'Investiture",
      description: "Affiche teaser pour l'investiture du nouveau gouvernement scolaire à Mama Mulezi.",
      src: asset("img/GhandhiHoly-Investiture.jpg"),
      size: "large"
    },
    {
      type: 'image',
      title: "Ciné Date",
      description: "Affiche pour une soirée cinéma organisée par Kivu New Era.",
      src: asset("img/KennyBin-CineDate.jpg"),
      size: "medium"
    },
    {
      type: 'image',
      title: "Auto Show 2026",
      description: "Affiche pour l'Auto Show organisé par Kivu New Era & S_MVN.",
      src: asset("img/AutoShow.jpeg"),
      size: "large"
    },
    {
      type: 'image',
      title: "Kivu New Era",
      description: "Identité visuelle et logo de marque.",
      src: asset("img/KivuNewEra-Logo.png"),
      size: "small"
    },
    {
      type: 'image',
      title: "Spéciale Sortie des Couples",
      description: "Affiche événementielle pour une soirée dédiée aux couples.",
      src: asset("img/DonelShanny-SortieCouples.jpg"),
      size: "medium"
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="posters" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Communication Visuelle
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Des visuels qui attirent l'attention de votre future clientèle. Nous vous proposons
            des posters, des affiches et des vidéos publicitaires qui mettent en valeur vos
            produits et vos services.
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
                poster.size === 'large' ? 'md:col-span-2 lg:row-span-2' : 'md:col-span-1 lg:row-span-1'
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-white shadow-lg">
                <img
                  src={poster.src}
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

      <Lightbox
        items={posters}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
      />
    </section>
  );
};

export default Posters;
