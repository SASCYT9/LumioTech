import React from 'react';
import { Camera } from 'lucide-react';

const GalleryPage = () => {
  const galleryItems = [
    { id: 1, src: 'https://placeimg.com/640/480/tech', title: 'Прототип корпусу', description: 'Матеріал: PLA, Шар: 0.15мм' },
    { id: 2, src: 'https://placeimg.com/640/480/tech/grayscale', title: 'Механічна шестерня', description: 'Матеріал: ABS, Шар: 0.1мм' },
    { id: 3, src: 'https://placeimg.com/640/480/people', title: 'Фігурка персонажа', description: 'Матеріал: PETG, Шар: 0.1мм' },
    { id: 4, src: 'https://placeimg.com/640/480/animals', title: 'Гнучкий браслет', description: 'Матеріал: TPU, Шар: 0.2мм' },
    { id: 5, src: 'https://placeimg.com/640/480/architecture', title: 'Архітектурний макет', description: 'Матеріал: PLA, Шар: 0.2мм' },
    { id: 6, src: 'https://placeimg.com/640/480/nature', title: 'Захисний кожух', description: 'Матеріал: PETG, Шар: 0.25мм' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Галерея робіт
            </span>
          </h1>
          <p className="text-xl text-gray-600">Приклади наших можливостей та якості друку</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map(item => (
            <div key={item.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img src={item.src} alt={item.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;