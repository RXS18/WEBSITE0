import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';


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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          <div 
          className="flex items-center space-x-2 cursor-pointer transition-colors hover:text-gray-600"
          onClick={() => scrollToSection('hero')}
        >
          <img 
            src= {import.meta.env.BASE_URL + "/RXSlogo.svg"}       // <-- replace with your actual logo path
            alt="Logo"
            className="h-6 w-10s object-contain"  // adjust size as you want
          />
          <span>
            
          </span>
          <span>
            
          </span>
          <span className="text-1xl font-bold">
            Digital Works
          </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12">
            <button 
              onClick={() => scrollToSection('websites')}
              className="text-lg font-medium transition-colors hover:text-gray-600"
            >
              Sites Web
            </button>
            <button 
              onClick={() => scrollToSection('visualizations')}
              className="text-lg font-medium transition-colors hover:text-gray-600"
            >
              Visualizations
            </button>
            <button 
              onClick={() => scrollToSection('posters')}
              className="text-lg font-medium transition-colors hover:text-gray-600"
            >
              Posters
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-lg font-medium transition-colors hover:text-gray-600"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t">
          <div className="px-6 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('websites')}
              className="block text-lg font-medium transition-colors hover:text-gray-600"
            >
              Sites webs
            </button>
	    <button 
              onClick={() => scrollToSection('visualizations')}
              className="block text-lg font-medium transition-colors hover:text-gray-600"
            >
              Visualizations
            </button>
            <button 
              onClick={() => scrollToSection('posters')}
              className="block text-lg font-medium transition-colors hover:text-gray-600"
            >
              Posters
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block text-lg font-medium transition-colors hover:text-gray-600"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;