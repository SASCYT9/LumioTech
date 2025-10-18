import React, { useState } from 'react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = ({ setCurrentPage }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      setCurrentPage('account');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forge-darkest via-forge-darker to-forge-dark py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-forge-metal rounded-2xl mb-4 shadow-forge-glow metal-border">
            <LogIn className="w-8 h-8 text-forge-orange" />
          </div>
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text text-transparent">
              Вхід до кабінету
            </span>
          </h1>
          <p className="text-gray-400">Керуйте своїми замовленнями</p>
        </div>

        <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-forge-metal/50 border border-forge-metal rounded-xl text-gray-200 focus:outline-none focus:border-forge-orange transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-forge-metal/50 border border-forge-metal rounded-xl text-gray-200 focus:outline-none focus:border-forge-orange transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-forge-orange to-red-600 text-white rounded-xl font-semibold text-lg shadow-forge-glow hover:shadow-forge-glow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Вхід...' : 'Увійти'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Немає акаунту?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-forge-orange hover:text-forge-orange-glow transition-colors font-medium"
              >
                Зареєструватися
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            ← Повернутися на головну
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
