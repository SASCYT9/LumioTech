import React from 'react';
import { CheckCircle, Circle, Loader, FileText, DollarSign, Package, UserCheck, Truck } from 'lucide-react';

const OrderDetailsPage = ({ setCurrentPage }) => {
  const order = {
    id: '#12345',
    date: '15.10.2025',
    total: '1250.00 грн',
    status: 'В роботі',
    items: [{ name: 'Корпус для дрона.stl', material: 'ABS', quality: '0.15mm', quantity: 1 }],
    shippingAddress: 'м. Київ, вул. Хрещатик, 22, кв. 5'
  };

  const steps = [
    { name: 'Оцінка AI', status: 'completed', icon: <FileText /> },
    { name: 'Підтвердження замовлення', status: 'completed', icon: <UserCheck /> },
    { name: 'Передплата', status: 'completed', icon: <DollarSign /> },
    { name: 'Друк', status: 'active', icon: <Loader className="animate-spin" /> },
    { name: 'Фінальна оплата', status: 'pending', icon: <DollarSign /> },
    { name: 'Доставка', status: 'pending', icon: <Truck /> },
  ];

  const getStepClass = (status) => {
    switch (status) {
      case 'completed':
        return {
          iconBg: 'bg-green-600 shadow-forge-glow',
          lineBg: 'bg-green-600',
          text: 'text-gray-100',
        };
      case 'active':
        return {
          iconBg: 'bg-forge-orange shadow-forge-glow-lg',
          lineBg: 'bg-forge-steel',
          text: 'text-forge-orange font-bold',
        };
      case 'pending':
      default:
        return {
          iconBg: 'bg-forge-steel',
          lineBg: 'bg-forge-steel',
          text: 'text-gray-400',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forge-darkest via-forge-darker to-forge-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text">Замовлення {order.id}</h1>
              <p className="text-gray-400">Дата: {order.date}</p>
            </div>
            <button onClick={() => setCurrentPage('account')} className="text-forge-orange font-semibold hover:text-forge-orange-glow transition-colors">
              &larr; Назад до замовлень
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Прогрес виконання</h2>
            <div className="relative">
              {steps.map((step, index) => (
                <div key={step.name} className="flex items-start mb-8">
                  <div className="flex flex-col items-center mr-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getStepClass(step.status).iconBg} z-10`}>
                      {step.status === 'completed' ? <CheckCircle /> : step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-1 h-24 mt-2 ${getStepClass(step.status === 'completed' ? 'completed' : 'pending').lineBg}`}></div>
                    )}
                  </div>
                  <div className={`pt-2 ${getStepClass(step.status).text}`}>
                    <h3 className="text-lg">{step.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-forge-steel pt-6">
             <h2 className="text-2xl font-bold text-gray-100 mb-4">Деталі замовлення</h2>
             <div className="space-y-4">
                {order.items.map((item, index) => (
                    <div key={index} className="p-4 bg-forge-metal/50 rounded-lg flex justify-between border border-forge-steel">
                        <div>
                            <p className="font-semibold text-gray-100">{item.name}</p>
                            <p className="text-sm text-gray-400">Матеріал: {item.material}, Якість: {item.quality}</p>
                        </div>
                        <p className="font-semibold text-forge-orange">{item.quantity} шт.</p>
                    </div>
                ))}
                <div className="flex justify-between font-bold text-xl pt-4 border-t border-forge-steel">
                    <span className="text-gray-100">Загалом:</span>
                    <span className="text-forge-orange">{order.total}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;