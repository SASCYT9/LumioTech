// This will be the HomePage component
import React from 'react';
import {
  Zap, Package, Layers, Shield, ArrowRight, Lightbulb
} from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {

  const services = [
    {
      title: 'Прототипування',
      description: 'Швидке виготовлення прототипів для тестування ідей',
      icon: <Zap className="w-8 h-8" />,
      price: 'від $5',
      features: ['Швидкий оборот', 'Точність ±0.1мм', 'Консультації'],
      gradient: 'from-cyan-500 to-blue-500',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600'
    },
    {
      title: 'Серійне виробництво',
      description: 'Виготовлення серій від 10 до 1000+ деталей',
      icon: <Package className="w-8 h-8" />,
      price: 'від $3/шт',
      features: ['Знижки від 20%', 'Контроль якості', 'Швидка доставка'],
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Складні моделі',
      description: 'Деталі з підпорками, внутрішніми порожнинами',
      icon: <Layers className="w-8 h-8" />,
      price: 'від $8',
      features: ['Розчинні підпорки', 'Обробка поверхні', 'Контроль геометрії'],
      gradient: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Спецматеріали',
      description: 'Друк з карбону, металу, дерева, гнучких матеріалів',
      icon: <Shield className="w-8 h-8" />,
      price: 'від $12',
      features: ['Унікальні властивості', 'Професійна якість', 'Сертифікати'],
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50">
                <Lightbulb className="w-5 h-5 text-cyan-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Інноваційні технології 3D друку</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Майбутнє
              </span>
              <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                3D друку
              </span>
              <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent text-2xl md:text-4xl font-normal mt-2">
                вже тут
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-cyan-600">Lumio Tech</span> - ваш партнер у світі інноваційного виробництва.
              Від ідеї до реальності за лічені години.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => setCurrentPage('calculator')}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center">
                  🤖 AI Калькулятор
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className="px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 hover:bg-white"
              >
                📞 Консультація
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: '⚡', title: '24-48год', desc: 'Швидкість' },
                { icon: '🎯', title: '±0.1мм', desc: 'Точність' },
                { icon: '🧪', title: '15+', desc: 'Матеріалів' },
                { icon: '🏆', title: '500+', desc: 'Проектів' }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{stat.title}</div>
                    <div className="text-sm text-gray-600">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Наші послуги
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Повний спектр інноваційних рішень для втілення ваших ідей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-gray-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <div className="relative p-8">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={service.iconColor}>
                        {service.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                    <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-6`}>
                      {service.price}
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;