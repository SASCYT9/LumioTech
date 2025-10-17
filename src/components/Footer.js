import React from 'react';
import { Lightbulb, Mail, Phone, MapPin } from 'lucide-react';

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
    <footer className="bg-gray-50 border-t border-gray-200/80">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-8 w-8 text-cyan-500" />
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Lumio
                </span>
                <span className="text-xl font-light text-gray-600 ml-1">Tech</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Ваш надійний партнер у світі інноваційного 3D друку. Від ідеї до реальності за лічені години.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Навігація</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(link => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-base text-gray-500 hover:text-cyan-600 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Юридична інформація</h3>
            <ul className="mt-4 space-y-2">
              {legalLinks.map(link => (
                <li key={link.subpage}>
                  <button
                    onClick={() => setCurrentPage(link.page, link.subpage)}
                    className="text-base text-gray-500 hover:text-cyan-600 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">Контакти</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-cyan-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-500">м. Київ, вул. Інноваційна, 1, Україна</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-cyan-500 mr-3" />
                <a href="mailto:info@lumiotech.com" className="text-gray-500 hover:text-cyan-600">info@lumiotech.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-cyan-500 mr-3" />
                <a href="tel:+380441234567" className="text-gray-500 hover:text-cyan-600">+38 (044) 123-45-67</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} LumioTech. Всі права захищено.</p>
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