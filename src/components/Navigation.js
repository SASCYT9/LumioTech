// This will be the Navigation component
import React from 'react';
import { Menu, X, Lightbulb } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-75 animate-pulse"></div>
              <Lightbulb className="relative h-8 w-8 text-cyan-600 mr-3" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lumio
              </span>
              <span className="text-xl font-light text-gray-700 ml-1">Tech</span>
            </div>
          </div>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'home'
                  ? 'text-cyan-600 bg-cyan-50 shadow-md'
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
              }`}
            >
              Головна
              {currentPage === 'home' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setCurrentPage('calculator')}
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'calculator'
                  ? 'text-cyan-600 bg-cyan-50 shadow-md'
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
              }`}
            >
              AI Калькулятор
              {currentPage === 'calculator' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'contact'
                  ? 'text-cyan-600 bg-cyan-50 shadow-md'
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
              }`}
            >
              Контакти
              {currentPage === 'contact' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              )}
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-cyan-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur rounded-lg mt-2 shadow-lg">
              {['home', 'calculator', 'contact'].map(page => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all w-full text-left ${
                    currentPage === page
                      ? 'text-cyan-600 bg-cyan-50 shadow-sm'
                      : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
                  }`}
                >
                  {page === 'home' ? '🏠 Головна' :
                   page === 'calculator' ? '🤖 AI Калькулятор' : '📞 Контакти'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;