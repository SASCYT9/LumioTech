import React from 'react';
import { CheckCircle, Loader, FileText, DollarSign, UserCheck, Truck } from 'lucide-react';

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
          iconBg: 'bg-green-500',
          lineBg: 'bg-green-500',
          text: 'text-gray-900',
        };
      case 'active':
        return {
          iconBg: 'bg-blue-500',
          lineBg: 'bg-gray-200',
          text: 'text-blue-600 font-bold',
        };
      case 'pending':
      default:
        return {
          iconBg: 'bg-gray-300',
          lineBg: 'bg-gray-200',
          text: 'text-gray-500',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Замовлення {order.id}</h1>
              <p className="text-gray-600">Дата: {order.date}</p>
            </div>
            <button onClick={() => setCurrentPage('account')} className="text-cyan-600 font-semibold hover:text-cyan-800">
              &larr; Назад до замовлень
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Прогрес виконання</h2>
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

          <div className="border-t border-gray-200 pt-6">
             <h2 className="text-2xl font-bold text-gray-800 mb-4">Деталі замовлення</h2>
             <div className="space-y-4">
                {order.items.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg flex justify-between">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">Матеріал: {item.material}, Якість: {item.quality}</p>
                        </div>
                        <p className="font-semibold">{item.quantity} шт.</p>
                    </div>
                ))}
                <div className="flex justify-between font-bold text-xl pt-4 border-t border-gray-200">
                    <span>Загалом:</span>
                    <span>{order.total}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;