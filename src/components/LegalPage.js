import React from 'react';

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forge-darkest via-forge-darker to-forge-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text mb-6">Юридична інформація</h1>
        <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-forge-orange mb-3">Умови надання послуг</h2>
            <p className="text-gray-300 leading-relaxed">
              Ласкаво просимо до Lumio Forge! Ці умови та положення визначають правила та норми використання веб-сайту Lumio Forge, розташованого за адресою lumiotech.ua.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              Отримуючи доступ до цього веб-сайту, ми припускаємо, що ви приймаєте ці умови. Не продовжуйте використовувати Lumio Forge, якщо ви не згодні прийняти всі умови, викладені на цій сторінці.
            </p>
          </div>

          <div className="border-t border-forge-steel pt-6">
            <h3 className="text-xl font-bold text-forge-orange mb-3">Файли та інтелектуальна власність</h3>
            <p className="text-gray-300 leading-relaxed">
              Ви несете повну відповідальність за 3D-моделі та інші файли, які ви завантажуєте на наш сайт. Ви гарантуєте, що маєте всі необхідні права на використання, копіювання та розповсюдження цих файлів.
            </p>
          </div>

          <div className="border-t border-forge-steel pt-6">
            <h3 className="text-xl font-bold text-forge-orange mb-3">Конфіденційність</h3>
            <p className="text-gray-300 leading-relaxed">
              Ми поважаємо вашу конфіденційність. Ваші особисті дані та завантажені файли будуть використовуватися виключно для виконання ваших замовлень і не будуть передані третім особам без вашої згоди.
            </p>
          </div>

          <div className="border-t border-forge-steel pt-6">
            <h3 className="text-xl font-bold text-forge-orange mb-3">Відмова від відповідальності</h3>
            <p className="text-gray-300 leading-relaxed">
              Ми не несемо відповідальності за будь-які збитки, які можуть виникнути внаслідок використання наших послуг або продуктів. Якість та точність надрукованих виробів залежить від якості наданих вами 3D-моделей.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;