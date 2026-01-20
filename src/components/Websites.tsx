import React from 'react';
import { Check, Globe, Smartphone, Search, Shield, Zap } from 'lucide-react';

const Websites: React.FC = () => {
  const packages = [
    {
      name: "Site Vitrine – Basique",
      //price: "50",
      description: "Parfait pour débuter votre présence en ligne",
      features: [
        "Site simple (1–3 pages : accueil, à propos, contact)",
        "Design responsive (ordinateur + téléphone)",
        "Maintenance basique : 2–5 $/mois selon le domaine",
        "Options : adresse e-mail professionnelle, formulaire de contact"
      ],
      icon: Globe,
      popular: false
    },
    {
      name: "Pack Standard – Professionnel",
      //price: "200",
      description: "Solution complète pour une présence professionnelle",
      features: [
        "Site complet (jusqu'à 6 pages : accueil, à propos, services, contact, blog, galerie…)",
        "Optimisation SEO de base (meilleure visibilité sur Google)",
        "Formulaire de contact + intégration Google Maps",
        "Design plus travaillé (animations, visuels personnalisés)",
        "Maintenance : 5–10 $/mois (inclut mises à jour & petite assistance)",
        "Extras possibles : plusieurs adresses e-mail pro, sauvegardes automatiques"
      ],
      icon: Smartphone,
      popular: true
    },
    {
      name: "Pack Premium – Sur Mesure",
      //price: "500",
      description: "Solution avancée pour des besoins spécifiques",
      features: [
        "Site avancé (e-commerce, réservation en ligne, catalogue produit, espace client…)",
        "Design sur mesure avec identité visuelle complète",
        "Optimisation SEO avancée + Google Analytics",
        "Sécurité renforcée (SSL, anti-spam, sauvegardes régulières)",
        "Intégration réseaux sociaux & automatisations (WhatsApp, Messenger, etc.)",
        "Maintenance : 10–20 $/mois (assistance prioritaire, suivi technique)"
      ],
      icon: Zap,
      popular: false
    }
  ];

  return (
    <section id="websites" className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Sites Web
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Des solutions web adaptées à vos besoins. De la vitrine simple au site sur mesure, 
            nous créons votre présence digitale avec style et performance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            return (
              <div 
                key={index}
                className={`relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  pkg.popular ? 'ring-2 ring-black' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Plus Populaire
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                    <IconComponent size={32} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                  {/*<div className="mb-4">*/}
                  {/*  <span className="text-5xl font-bold">{pkg.price}</span>*/}
                  {/*  <span className="text-xl text-gray-600">$</span>*/}
                  {/*</div>*/}
                  <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check size={12} className="text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <a 
                  href={`https://wa.me/243852825250?text=${encodeURIComponent(
                    pkg.name === "Site Vitrine – Basique" 
                      ? "Bonjour ! Je suis intéressé(e) par le pack Site Vitrine - Basique à 50$. Pouvez-vous me donner plus d'informations ?"
                      : pkg.name === "Pack Standard – Professionnel"
                      ? "Bonjour ! Je suis intéressé(e) par le Pack Standard - Professionnel à 200$. Pouvez-vous me donner plus d'informations ?"
                      : "Bonjour ! Je suis intéressé(e) par le Pack Premium - Sur Mesure à 500$. Pouvez-vous me donner plus d'informations ?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 text-center ${
                  pkg.popular 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
                >
                  Commencer
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Besoin d'une solution personnalisée ? Contactez-nous pour un devis sur mesure.
          </p>
          <a 
            href={`https://wa.me/243852825250?text=${encodeURIComponent("Bonjour ! J'aimerais discuter d'un projet personnalisé. Pouvez-vous me contacter pour un devis sur mesure ?")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-lg font-medium bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            <span>Discuter de Votre Projet</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Websites;