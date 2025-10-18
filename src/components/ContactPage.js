// This will be the ContactPage component
import { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { submitContactForm } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContactForm(formData);
      setSubmitStatus({ type: 'success', message: 'Повідомлення успішно відправлено! Ми зв\'яжемося з вами найближчим часом.' });
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Помилка при відправці. Спробуйте ще раз.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-forge-darkest py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-forge-orange via-forge-orange-glow to-forge-orange bg-clip-text text-transparent text-glow-orange">
              Наші контакти
            </span>
          </h1>
          <p className="text-xl text-gray-400">Готові втілити ваші ідеї в реальність</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-inner-forge p-8 metal-border">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Напишіть нам</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ім'я</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
                    placeholder="+380 XX XXX XX XX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Повідомлення</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
                  placeholder="Опишіть ваш проект..."
                ></textarea>
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-forge-orange to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-forge-glow-lg transition-all transform hover:scale-105 shadow-forge-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Відправка...' : 'Відправити повідомлення'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-inner-forge p-8 metal-border">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Контакти</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-forge-orange mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-100">Телефон</h3>
                    <p className="text-gray-300">+380 XX XXX XX XX</p>
                    <p className="text-sm text-gray-500">Пн-Пт 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-forge-orange mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-100">Email</h3>
                    <p className="text-gray-300">info@lumioforge.ua</p>
                    <p className="text-sm text-gray-500">Відповідаємо протягом 2 годин</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-forge-orange mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-100">Адреса</h3>
                    <p className="text-gray-300">м. Київ, вул. Інноваційна 42</p>
                    <p className="text-sm text-gray-500">Метро "Політехнічний інститут"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-inner-forge p-8 metal-border">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Ми в соцмережах</h2>
              <div className="space-y-4">
                <a
                  href="https://t.me/lumiotech_ua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-forge-steel rounded-2xl hover:bg-forge-metal hover:border-cyan-400 transition-colors group"
                >
                  <MessageCircle className="w-6 h-6 text-cyan-400 mr-4 group-hover:text-cyan-300 transition-colors" />
                  <div>
                    <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">Telegram</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">@lumiotech_ua - швидкі консультації та новини</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/lumiotech_ukraine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-forge-steel rounded-2xl hover:bg-forge-metal hover:border-pink-400 transition-colors group"
                >
                  <Instagram className="w-6 h-6 text-pink-400 mr-4 group-hover:text-pink-300 transition-colors" />
                  <div>
                    <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">Instagram</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">@lumiotech_ukraine - фото наших робіт</p>
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