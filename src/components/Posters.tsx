import React from 'react';

const Posters: React.FC = () => {
  const posters = [
    {
      title: "Smart Cargo",
      description: "Service de livraison international.",
      image: "../img/KenBin0.png",
      size: "large"
    },
    
    {
      title: "City Food",
      description: "Menu pour City food, restaurant.",
      image: "../img/BenoitCityFood.png",
      size: "medium"
    },
    {
      title: "Plug Debt",
      description: "A modern clothing brand",
      image: "../img/JoeAllan.png",
      size: "medium"
    },
    {
      title: "Flocon Doré",
      description: "La vente de pop corn",
      image: "../img/KakwisiAnge.png",
      size: "large"
    },
    {
      title: "la journée mondiale des sols. CADASTRE AGRICOL DU NORK-KIVU",
      description: "Affiche simple informartive",
      image: "../img/BeneditcBusole1.png",
      size: "medium"
    },
    {
      title: "Monica's Delicacies",
      description: "A bakery",
      image: "../img/MonicaTsongo.png",
      size: "small"
    }
  ];

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
            <div 
              key={index}
              className={`group cursor-pointer ${
                poster.size === 'large' ? 'md:col-span-2 lg:row-span-2' :
                poster.size === 'medium' ? 'md:col-span-1 lg:row-span-1' :
                'md:col-span-1 lg:row-span-1'
              }`}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/4] bg-white shadow-lg">
                <img
                  src={poster.image}
                  alt={poster.title}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Posters;