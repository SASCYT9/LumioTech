import React from 'react';

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forge-darkest via-forge-darker to-forge-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text mb-6">Політика та умови</h1>
        <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-forge-orange mb-3">Ключові умови</h2>
            <p className="text-gray-300 leading-relaxed">
              Вітаємо в Lumio Forge! Користуючись нашим сайтом та послугами, ви погоджуєтесь з умовами, викладеними нижче. Будь ласка, уважно ознайомтесь з ними.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              Продовжуючи користуватися сайтом, ви підтверджуєте свою згоду з нашою політикою. Якщо ви не згодні, будь ласка, не використовуйте наш сервіс.
            </p>
          </div>

          <div className="border-t border-forge-steel pt-6">
            <h3 className="text-xl font-bold text-forge-orange mb-3">Ваші файли та право власності</h3>
            <p className="text-gray-300 leading-relaxed">
              Ви несете повну відповідальність за 3D-моделі, які завантажуєте. Ви повинні мати всі необхідні права на їх використання. Ми не перевіряємо авторські права на моделі, це ваша зона відповідальності.
            </p>
          </div>

          <div className="border-t border-forge-steel pt-6">
            <h3 className="text-xl font-bold text-forge-orange mb-3">Конфіденційність даних</h3>
            <p className="text-gray-300 leading-relaxed">
              Ми гарантуємо конфіденційність ваших даних. Ваша особиста інформація та завантажені файли використовуються виключно для обробки замовлень і ніколи не передаються третім особам.
            </p>
          </div>

          <div className="border-t border-forge-steel pt-6">
            <h3 className="text-xl font-bold text-forge-orange mb-3">Наша відповідальність</h3>
            <p className="text-gray-300 leading-relaxed">
              Якість друку напряму залежить від якості наданої вами 3D-моделі. Ми не несемо відповідальності за можливі неточності чи дефекти, що виникли через помилки в моделі. Проте, ми завжди готові допомогти та проконсультувати вас для досягнення найкращого результату.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;