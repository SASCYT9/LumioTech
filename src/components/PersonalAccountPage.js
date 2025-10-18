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
      case 'В роботі': return 'bg-blue-900/50 text-blue-300 border border-blue-700';
      case 'Доставлено': return 'bg-green-900/50 text-green-300 border border-green-700';
      case 'Скасовано': return 'bg-red-900/50 text-red-300 border border-red-700';
      default: return 'bg-forge-metal text-gray-300 border border-forge-steel';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forge-darkest via-forge-darker to-forge-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text text-transparent">
              Особистий кабінет
            </span>
          </h1>
          <p className="text-xl text-gray-300">Керуйте вашими замовленнями та особистими даними</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column for user info and navigation */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border text-center">
              <img src={user.avatar} alt="User Avatar" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-forge-glow border-4 border-forge-steel" />
              <h2 className="text-2xl font-bold text-gray-100">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <button className="mt-4 w-full bg-gradient-to-r from-forge-orange to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-forge-glow-lg transition-all shadow-forge-glow transform hover:scale-105">
                Змінити профіль
              </button>
            </div>

            <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border">
              <h3 className="text-xl font-bold text-gray-100 mb-4">Навігація</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center p-3 rounded-lg text-gray-100 bg-forge-orange/20 font-semibold border-l-4 border-forge-orange">
                    <ShoppingBag className="w-5 h-5 mr-3 text-forge-orange" />
                    Історія замовлень
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-forge-metal transition-colors">
                    <Settings className="w-5 h-5 mr-3" />
                    Налаштування
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-forge-metal transition-colors">
                    <MapPin className="w-5 h-5 mr-3" />
                    Мої адреси
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column for order history */}
          <div className="lg:col-span-2">
            <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border">
              <h2 className="text-2xl font-bold text-gray-100 mb-6">Історія замовлень</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-forge-metal/50 rounded-2xl shadow-inner-forge p-6 border border-forge-steel hover:shadow-forge-glow transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-lg text-gray-100">{order.id}</p>
                        <p className="text-sm text-gray-400">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-300 font-medium">Склад замовлення:</p>
                      <ul className="list-disc list-inside text-sm text-gray-400">
                        {order.items.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-forge-orange">{order.total}</p>
                      <button onClick={() => setCurrentPage('orderDetails')} className="text-sm font-semibold text-forge-orange hover:text-forge-orange-glow transition-colors">Детальніше</button>
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