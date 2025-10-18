import { useState } from 'react';
import { X } from 'lucide-react';
import { submitOrder3DModel } from '../services/api';

const OrderModal = ({ isOpen, onClose, orderData, stlFile }) => {
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
      const formDataToSend = new FormData();

      // Add contact info
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      // Add order details
      formDataToSend.append('material', orderData.material);
      formDataToSend.append('quality', orderData.quality);
      formDataToSend.append('quantity', orderData.quantity);
      formDataToSend.append('priceEstimate', JSON.stringify(orderData.priceEstimate));

      // Add file if exists
      if (stlFile) {
        formDataToSend.append('file', stlFile);
      }

      await submitOrder3DModel(formDataToSend);

      setSubmitStatus({
        type: 'success',
        message: 'Замовлення успішно відправлено! Ми зв\'яжемося з вами найближчим часом.'
      });

      setTimeout(() => {
        onClose();
        setFormData({ name: '', phone: '', email: '', message: '' });
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Помилка при відправці замовлення. Спробуйте ще раз.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-forge-dark/95 rounded-3xl shadow-forge-glow-lg metal-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text text-transparent">
              Оформлення замовлення
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-forge-metal rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-forge-metal/50 rounded-2xl p-6 mb-6 metal-border">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Деталі замовлення:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Матеріал:</span>
                <span className="text-forge-orange font-medium">{orderData.material}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Якість:</span>
                <span className="text-forge-orange font-medium">{orderData.quality}mm</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Кількість:</span>
                <span className="text-forge-orange font-medium">{orderData.quantity} шт</span>
              </div>
              <div className="border-t border-forge-steel my-3"></div>
              <div className="flex justify-between text-gray-100 font-bold text-lg">
                <span>Вартість:</span>
                <span className="text-forge-orange">${orderData.priceEstimate?.total}</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Ім'я *</label>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Телефон *</label>
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
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
              <label className="block text-sm font-medium text-gray-300 mb-2">Додаткові побажання</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full p-4 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-metal text-gray-100"
                placeholder="Особливі вимоги до замовлення..."
              />
            </div>

            {submitStatus && (
              <div className={`p-4 rounded-xl ${submitStatus.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}>
                {submitStatus.message}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-forge-metal text-gray-300 py-4 rounded-xl font-semibold text-lg hover:bg-forge-steel transition-all"
              >
                Скасувати
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-forge-orange to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-forge-glow-lg transition-all transform hover:scale-105 shadow-forge-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Відправка...' : 'Підтвердити замовлення'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
