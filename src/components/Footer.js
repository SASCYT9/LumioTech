import React from 'react';

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-500">&copy; 2025 Lumio Forge. Всі права захищено.</p>
          <div className="flex space-x-6">
            <button onClick={() => setCurrentPage('legal')} className="text-gray-500 hover:text-gray-900">
              Юридична інформація
            </button>
            <button onClick={() => setCurrentPage('contact')} className="text-gray-500 hover:text-gray-900">
              Контакти
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;