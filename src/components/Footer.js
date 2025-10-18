import React from 'react';
import { Flame, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const quickLinks = [
    { page: 'home', label: 'Головна' },
    { page: 'gallery', label: 'Галерея' },
    { page: 'calculator', label: 'Калькулятор' },
    { page: 'account', label: 'Кабінет' },
  ];

  const legalLinks = [
    { page: 'legal', label: 'Умови надання послуг', subpage: 'terms' },
    { page: 'legal', label: 'Політика конфіденційності', subpage: 'privacy' },
  ];

  return (
    <footer className="bg-forge-dark border-t border-forge-orange/20">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-8 w-8 text-forge-orange" />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text text-transparent">
                  Lumio
                </span>
                <span className="text-xl font-light text-gray-300 ml-1">Forge</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Ваш надійний партнер у світі індустріального 3D друку. Викована якість для ваших ідей.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Навігація</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-base text-gray-400 hover:text-forge-orange transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Юридична інформація</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map(link => (
                <li key={link.subpage}>
                  <button
                    onClick={() => setCurrentPage(link.page, link.subpage)}
                    className="text-base text-gray-400 hover:text-forge-orange transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Контакти</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-forge-orange mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">м. Київ, вул. Інноваційна, 1, Україна</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-forge-orange mr-3" />
                <a href="mailto:info@lumioforge.com" className="text-gray-400 hover:text-forge-orange">info@lumioforge.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-forge-orange mr-3" />
                <a href="tel:+380441234567" className="text-gray-400 hover:text-forge-orange">+38 (044) 123-45-67</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-forge-orange/20 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Lumio Forge. Всі права захищено.</p>
          {/* Placeholder for social media icons */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
             {/* Add social media icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;