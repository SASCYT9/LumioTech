import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Settings, MapPin, LogOut, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PersonalAccountPage = ({ setCurrentPage }) => {
  const { user, logout, getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Якщо користувач не залогінений, перенаправляємо на логін
    if (!user) {
      setCurrentPage('login');
      return;
    }

    // Завантаження замовлень користувача
    const fetchOrders = async () => {
      try {
        const token = getToken();
        const response = await fetch('/api/orders/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Помилка завантаження замовлень:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, setCurrentPage, getToken]);

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  if (!user) {
    return null;
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
      case 'В роботі': return 'bg-blue-900/50 text-blue-300 border border-blue-700';
      case 'completed':
      case 'Доставлено': return 'bg-green-900/50 text-green-300 border border-green-700';
      case 'cancelled':
      case 'Скасовано': return 'bg-red-900/50 text-red-300 border border-red-700';
      case 'in_progress': return 'bg-orange-900/50 text-orange-300 border border-orange-700';
      default: return 'bg-forge-metal text-gray-300 border border-forge-steel';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'pending': return 'Очікує';
      case 'in_progress': return 'В роботі';
      case 'completed': return 'Доставлено';
      case 'cancelled': return 'Скасовано';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
              <div className="w-32 h-32 rounded-full mx-auto mb-4 shadow-forge-glow border-4 border-forge-steel bg-gradient-to-br from-forge-orange to-red-600 flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-100">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              {user.phone && <p className="text-gray-400">{user.phone}</p>}
              <button
                onClick={handleLogout}
                className="mt-4 w-full bg-forge-metal/50 text-gray-300 py-3 rounded-xl font-semibold hover:bg-forge-metal transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Вийти
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

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 text-forge-orange animate-spin" />
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Ще немає замовлень</p>
                  <button
                    onClick={() => setCurrentPage('calculator')}
                    className="mt-4 px-6 py-3 bg-gradient-to-r from-forge-orange to-red-600 text-white rounded-xl font-semibold shadow-forge-glow hover:shadow-forge-glow-lg transition-all transform hover:scale-105"
                  >
                    Створити замовлення
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="bg-forge-metal/50 rounded-2xl shadow-inner-forge p-6 border border-forge-steel hover:shadow-forge-glow transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-bold text-lg text-gray-100">#{order._id.slice(-8)}</p>
                          <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClass(order.status)}`}>
                          {formatStatus(order.status)}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-300 font-medium">Деталі:</p>
                        <p className="text-sm text-gray-400">
                          Матеріал: {order.material} | Якість: {order.quality}мм | Кількість: {order.quantity}шт
                        </p>
                        {order.fileName && (
                          <p className="text-sm text-gray-400 mt-1">Файл: {order.fileName}</p>
                        )}
                      </div>
                      {order.progress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Прогрес</span>
                            <span>{order.progress}%</span>
                          </div>
                          <div className="w-full bg-forge-darkest rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-forge-orange to-red-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${order.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-bold text-forge-orange">{order.totalPrice} грн</p>
                        <button
                          onClick={() => setCurrentPage('orderDetails')}
                          className="text-sm font-semibold text-forge-orange hover:text-forge-orange-glow transition-colors"
                        >
                          Детальніше
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountPage;