// This will be the Navigation component
import React from 'react';
import { Menu, X, Flame, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Sub-component for navigation links
const NavLink = ({ page, currentPage, setCurrentPage, children }) => (
  <button
    onClick={() => setCurrentPage(page)}
    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out group ${
      currentPage === page
        ? 'text-forge-orange'
        : 'text-gray-300 hover:text-forge-orange'
    }`}
  >
    {children}
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-forge-orange to-forge-orange-glow transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out ${
        currentPage === page ? 'scale-x-100' : ''
      }`}
    ></span>
  </button>
);

const Navigation = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const { user } = useAuth();

  const navItems = [
    { page: 'home', label: 'Головна' },
    { page: 'gallery', label: 'Галерея' },
    { page: 'contact', label: 'Контакти' },
  ];

  return (
    <nav className="bg-forge-dark/95 backdrop-blur-xl shadow-forge-glow sticky top-0 z-50 border-b border-forge-orange/20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-forge-orange to-red-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Flame className="relative h-8 w-8 text-forge-orange" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-forge-orange via-forge-orange-glow to-forge-orange bg-clip-text text-transparent">
                Lumio
              </span>
              <span className="text-xl font-light text-gray-300 ml-1">Forge</span>
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
              {user ? (
                <button
                  onClick={() => setCurrentPage('account')}
                  className="flex items-center gap-2 p-2 px-3 rounded-full text-gray-300 hover:bg-forge-metal hover:text-forge-orange transition-colors"
                  title="Особистий кабінет"
                >
                  <User size={20} />
                  <span className="text-sm">{user.name}</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage('login')}
                  className="flex items-center gap-2 p-2 px-3 rounded-full text-gray-300 hover:bg-forge-metal hover:text-forge-orange transition-colors"
                  title="Вхід"
                >
                  <LogIn size={20} />
                  <span className="text-sm">Вхід</span>
                </button>
              )}
              <button
                onClick={() => setCurrentPage('calculator')}
                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-forge-orange to-red-600 rounded-full shadow-forge-glow hover:shadow-forge-glow-lg hover:scale-105 transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forge-orange"
              >
                Калькулятор
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-forge-orange p-2 rounded-md hover:bg-forge-metal transition-colors"
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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-forge-dark">
          {[
            ...navItems,
            { page: 'calculator', label: 'Калькулятор' },
            user
              ? { page: 'account', label: `Кабінет (${user.name})` }
              : { page: 'login', label: 'Вхід' }
          ].map(item => (
            <button
              key={item.page}
              onClick={() => { setCurrentPage(item.page); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                currentPage === item.page
                  ? 'bg-forge-metal text-forge-orange'
                  : 'text-gray-300 hover:bg-forge-metal hover:text-forge-orange'
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