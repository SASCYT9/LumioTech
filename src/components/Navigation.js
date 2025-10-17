// This will be the Navigation component
import React from 'react';
import { Menu, X, Lightbulb, User } from 'lucide-react';

// Sub-component for navigation links
const NavLink = ({ page, currentPage, setCurrentPage, children }) => (
  <button
    onClick={() => setCurrentPage(page)}
    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out group ${
      currentPage === page
        ? 'text-cyan-600'
        : 'text-gray-600 hover:text-cyan-600'
    }`}
  >
    {children}
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out ${
        currentPage === page ? 'scale-x-100' : ''
      }`}
    ></span>
  </button>
);

const Navigation = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const navItems = [
    { page: 'home', label: 'Головна' },
    { page: 'gallery', label: 'Галерея' },
    { page: 'contact', label: 'Контакти' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-200/60">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Lightbulb className="relative h-8 w-8 text-cyan-500" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lumio
              </span>
              <span className="text-xl font-light text-gray-600 ml-1">Tech</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              {navItems.map(item => (
                <NavLink key={item.page} page={item.page} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('account')}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-cyan-600 transition-colors"
                title="Особистий кабінет"
              >
                <User size={20} />
              </button>
              <button
                onClick={() => setCurrentPage('calculator')}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                AI Калькулятор
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-cyan-600 p-2 rounded-md hover:bg-gray-50 transition-colors"
              aria-label="Відкрити меню"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {[...navItems, { page: 'account', label: 'Особистий кабінет' }, { page: 'calculator', label: 'AI Калькулятор' }].map(item => (
            <button
              key={item.page}
              onClick={() => { setCurrentPage(item.page); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                currentPage === item.page
                  ? 'bg-cyan-50 text-cyan-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;