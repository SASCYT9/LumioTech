import React from 'react';
import { User, ShoppingBag, Settings, MapPin } from 'lucide-react';

const PersonalAccountPage = ({ setCurrentPage }) => {
  const user = {
    name: 'Ярослав Воділа',
    email: 'yarik.vodila@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
  };

  const orders = [
    { id: '#12345', date: '15.10.2025', total: '1250.00 грн', status: 'В роботі', items: ['Корпус для дрона.stl'] },
    { id: '#12344', date: '12.10.2025', total: '850.50 грн', status: 'Доставлено', items: ['Кріплення для камери.stl'] },
    { id: '#12342', date: '05.10.2025', total: '2300.00 грн', status: 'Доставлено', items: ['Шестерня редуктора.step', 'Захисний кожух.stl'] },
    { id: '#12341', date: '01.10.2025', total: '450.00 грн', status: 'Скасовано', items: ['Прототип ручки.stl'] }
  ];

  const addresses = [
    { name: 'Дім', address: 'м. Київ, вул. Хрещатик, 22, кв. 5' },
    { name: 'Робота', address: 'м. Київ, вул. Інститутська, 1, офіс 303' }
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'В роботі': return 'bg-blue-100 text-blue-800';
      case 'Доставлено': return 'bg-green-100 text-green-800';
      case 'Скасовано': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Особистий кабінет
            </span>
          </h1>
          <p className="text-xl text-gray-600">Керуйте вашими замовленнями та особистими даними</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column for user info and navigation */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50 text-center">
              <img src={user.avatar} alt="User Avatar" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <button className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg">
                Змінити профіль
              </button>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Навігація</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center p-3 rounded-lg text-gray-700 bg-cyan-50 font-semibold border-l-4 border-cyan-500">
                    <ShoppingBag className="w-5 h-5 mr-3 text-cyan-600" />
                    Історія замовлень
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <Settings className="w-5 h-5 mr-3" />
                    Налаштування
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100">
                    <MapPin className="w-5 h-5 mr-3" />
                    Мої адреси
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column for order history */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Історія замовлень</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-lg text-gray-800">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 font-medium">Склад замовлення:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {order.items.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">{order.total}</p>
                      <button onClick={() => setCurrentPage('orderDetails')} className="text-sm font-semibold text-cyan-600 hover:text-cyan-800">Детальніше</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountPage;