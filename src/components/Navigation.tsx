import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { asset } from '../lib/asset';

const NAV_LINKS = [
  { id: 'websites', label: 'Sites Web' },
  { id: 'visualizations', label: 'Visualisations' },
  { id: 'renders', label: 'Créations 3D' },
  { id: 'posters', label: 'Affiches' },
  { id: 'contact', label: 'Contact' }
];

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          <button
            type="button"
            className="flex items-center space-x-3 cursor-pointer transition-colors hover:text-gray-600"
            onClick={() => scrollToSection('hero')}
            aria-label="Retour en haut"
          >
            <img
              src={asset('RXSlogo.svg')}
              alt="RXS Digital Works"
              className="h-6 w-auto object-contain"
            />
            <span className="text-lg font-bold">Digital Works</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 lg:space-x-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-lg font-medium transition-colors hover:text-gray-600"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
          <div className="px-6 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block text-lg font-medium transition-colors hover:text-gray-600"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
