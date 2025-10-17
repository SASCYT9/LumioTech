import React from 'react';
import { Upload, FileText, User, Phone, Mail } from 'lucide-react';

const OrderWithoutModelForm = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
          <FileText className="w-5 h-5 text-white" />
        </div>
        Замовити за кресленням або фото
      </h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Завантажте ваші файли
          </label>
          <div className="group border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-500 transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50">
            <Upload className="mx-auto mb-4 text-gray-400 group-hover:text-purple-500 transition-colors" size={48} />
            <p className="text-gray-600 mb-2 font-medium group-hover:text-purple-600 transition-colors">
              Перетягніть файли або клікніть
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">JPG, PNG, PDF, DXF до 25MB</span>
            </p>
          </div>
          <input type="file" multiple className="hidden" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Опишіть ваш проект
          </label>
          <textarea
            rows={5}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Опишіть, що саме вам потрібно, вкажіть розміри, матеріал (якщо знаєте) та інші важливі деталі."
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ім'я</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Ваше ім'я"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="+380 XX XXX XX XX"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Відправити запит на розрахунок
        </button>
      </form>
    </div>
  );
};

export default OrderWithoutModelForm;