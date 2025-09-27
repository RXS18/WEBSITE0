import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">RXS Digital Lab</h3>
          <p className="text-gray-400 mb-6">
            Créant des extraordinaires experiences visuels depuis 2020
          </p>
          <div className="border-t border-gray-800 pt-6">
          <img 
            src="../RXSlogo.svg"       // <-- replace with your actual logo path
            alt="Logo"
            className="h-6 w-10s object-contain"  // adjust size as you want
          />
            <p className="text-gray-500 text-sm">
              © 2025 RXS digital Lab. Tout droit reservé.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;