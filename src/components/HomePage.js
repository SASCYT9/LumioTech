// This will be the HomePage component
import React from 'react';
import {
  Zap, Package, Layers, Shield, ArrowRight, Flame
} from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {

  const services = [
    {
      title: 'Прототипування',
      description: 'Швидке створення прототипів для перевірки ваших ідей',
      icon: <Zap className="w-8 h-8" />,
      price: 'від 150 грн',
      features: ['Готово за 1-3 дні', 'Точність ±0.1мм', 'Безкоштовна консультація'],
      gradient: 'from-forge-orange to-forge-orange-glow',
      iconBg: 'bg-forge-metal',
      iconColor: 'text-forge-orange'
    },
    {
      title: 'Серійне виробництво',
      description: 'Виготовлення партій від 10 до 1000+ деталей',
      icon: <Package className="w-8 h-8" />,
      price: 'від 100 грн/шт',
      features: ['Знижки до 30%', 'Гарантія якості', 'Доставка по Україні'],
      gradient: 'from-forge-orange to-red-600',
      iconBg: 'bg-forge-metal',
      iconColor: 'text-forge-orange'
    },
    {
      title: 'Складні моделі',
      description: 'Деталі з підтримками та внутрішніми каналами',
      icon: <Layers className="w-8 h-8" />,
      price: 'від 250 грн',
      features: ['Розчинні підтримки', 'Постобробка', 'Перевірка геометрії'],
      gradient: 'from-forge-orange to-yellow-500',
      iconBg: 'bg-forge-metal',
      iconColor: 'text-forge-orange'
    },
    {
      title: 'Преміум матеріали',
      description: 'Друк з карбону, нейлону, TPU та інших спецматеріалів',
      icon: <Shield className="w-8 h-8" />,
      price: 'від 400 грн',
      features: ['Унікальні властивості', 'Професійна якість', 'Технічна підтримка'],
      gradient: 'from-orange-600 to-forge-orange',
      iconBg: 'bg-forge-metal',
      iconColor: 'text-forge-orange'
    }
  ];

  return (
    <div className="min-h-screen bg-forge-darkest">
      <div className="relative overflow-hidden">
        {/* Orange glow effects similar to the logo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[600px] h-[300px] bg-anvil-glow"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-forge-orange to-red-600 rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-gradient-to-r from-orange-600 to-forge-orange rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-yellow-600 to-forge-orange rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-forge-metal/80 backdrop-blur-sm rounded-full shadow-forge-glow metal-border">
                <Flame className="w-5 h-5 text-forge-orange mr-2" />
                <span className="text-sm font-medium text-gray-300">Викувана якість. Точність до міліметра</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-transparent">
                LUMIO FORGE
              </span>
              <span className="block bg-gradient-to-r from-forge-orange via-forge-orange-glow to-forge-orange bg-clip-text text-transparent text-glow-orange text-3xl md:text-5xl mt-2">
                Кузня Майбутнього
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Де технології зустрічаються з ремеслом. Від ідеї до реальності.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => setCurrentPage('calculator')}
                className="group relative px-8 py-4 bg-gradient-to-r from-forge-orange to-red-600 text-white rounded-2xl font-semibold text-lg shadow-forge-glow-lg hover:shadow-forge-glow transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-forge-orange to-red-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center">
                  <Flame className="w-5 h-5 mr-2" />
                  Калькулятор Вартості
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className="px-8 py-4 bg-forge-metal/80 backdrop-blur-sm text-gray-200 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-forge-glow metal-border transition-all duration-300 hover:bg-forge-metal"
              >
                Замовити консультацію
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { title: '24-48год', desc: 'Швидкість' },
                { title: '±0.1мм', desc: 'Точність' },
                { title: '15+', desc: 'Матеріалів' },
                { title: '500+', desc: 'Проектів' }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-forge-dark/80 backdrop-blur-sm rounded-2xl p-6 shadow-inner-forge metal-border hover:shadow-forge-glow transition-all duration-300 hover:scale-105">
                    <div className="text-2xl font-bold bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text text-transparent">{stat.title}</div>
                    <div className="text-sm text-gray-400 mt-2">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-forge-darker/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                Наші послуги
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Повний спектр виробничих рішень в індустріальному стилі
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="relative bg-forge-dark rounded-3xl shadow-inner-forge hover:shadow-forge-glow transition-all duration-500 transform hover:scale-105 overflow-hidden metal-border">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                  <div className="relative p-8">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner-forge metal-border`}>
                      <div className={service.iconColor}>
                        {service.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-100 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                    <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-6`}>
                      {service.price}
                    </div>

                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-forge-orange to-forge-orange-glow rounded-full mr-3"></div>
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