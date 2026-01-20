import React from 'react';
import { Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    const whatsappMessage = `Bonjour ! Voici mes informations de contact :

Nom : ${name}
Email : ${email}
Sujet : ${subject}

Message :
${message}`;
    
    const whatsappUrl = `https://wa.me/243852825250?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Créons Ensemble
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Prêt à donner vie à votre vision ? Nous aimerions discuter de votre prochain projet 
            et explorer comment nous pouvons vous aider à obtenir des résultats extraordinaires.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h3 className="text-3xl font-bold mb-8">Contactez-Nous</h3>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-black rounded-full p-3">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">E-mail</p>
                  <p className="text-gray-600">rxsdigitallab@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-black rounded-full p-3">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Téléphone</p>
                  <p className="text-gray-600">+243 852 825 250</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-black rounded-full p-3">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Digital Lab</p>
                  <p className="text-gray-600">Quartier les Volcans<br />Goma, République démocratique du Congo</p>
                </div>
              </div>
              
              <div href="https://www.instagram.com/rxsdigitalworks/"className="flex items-start space-x-4">
                <div className="bg-black rounded-full p-3">
                  <Instagram className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Instagram</p>
                  <a 
                    href="https://www.instagram.com/rxsdigitalworks/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    @rxsdigitalworks
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-black rounded-full p-3">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-lg">WhatsApp</p>
                  <a 

                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Discuter maintenant
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                  placeholder="Demande de projet"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  name="message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Parlez-nous de votre projet..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Envoyer le Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;