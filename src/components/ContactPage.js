// This will be the ContactPage component
import React from 'react';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Зв'яжіться з нами
            </span>
          </h1>
          <p className="text-xl text-gray-600">Готові втілити ваші ідеї в реальність</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Написати нам</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ім'я</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input
                    type="tel"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="+380 XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Повідомлення</label>
                <textarea
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Опишіть ваш проект..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Відправити повідомлення
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Контакти</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-cyan-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Телефон</h3>
                    <p className="text-gray-600">+380 XX XXX XX XX</p>
                    <p className="text-sm text-gray-500">Пн-Пт 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-cyan-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@lumiotech.ua</p>
                    <p className="text-sm text-gray-500">Відповідаємо протягом 2 годин</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-cyan-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Адреса</h3>
                    <p className="text-gray-600">м. Київ, вул. Інноваційна 42</p>
                    <p className="text-sm text-gray-500">Метро "Політехнічний інститут"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Соціальні мережі</h2>
              <div className="space-y-4">
                <a
                  href="https://t.me/lumiotech_ua"
                  className="flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-cyan-50 hover:border-cyan-300 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-cyan-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Telegram</h3>
                    <p className="text-gray-600 text-sm">@lumiotech_ua - швидкі консультації</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/lumiotech_ukraine"
                  className="flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-pink-50 hover:border-pink-300 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-pink-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Instagram</h3>
                    <p className="text-gray-600 text-sm">@lumiotech_ukraine - наші роботи</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;