// This will be the CalculatorPage component
import React, { useRef } from 'react';
import {
  Upload, FileText, Palette, DollarSign, CheckCircle
} from 'lucide-react';
import OrderWithoutModelForm from './OrderWithoutModelForm';

const CalculatorPage = ({
  stlFile,
  setStlFile,
  fileAnalysis,
  setFileAnalysis,
  orderMode,
  setOrderMode,
  selectedMaterial,
  setSelectedMaterial,
  materialSelectionMode,
  setMaterialSelectionMode,
  selectedQuality,
  setSelectedQuality,
  quantity,
  setQuantity,
  isAnalyzing,
  setIsAnalyzing,
  showAdvanced,
  setShowAdvanced,
  infillDensity,
  setInfillDensity,
  wallThickness,
  setWallThickness,
  printOrientation,
  setPrintOrientation,
  supportSettings,
  setSupportSettings,
  urgentOrder,
  priceEstimate,
  handleFileUpload,
  handleDragOver,
  handleDrop,
  materials,
  qualities,
  setCurrentPage
}) => {
  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">AI аналіз в реальному часі</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lumio AI
            </span>
            <span className="block text-3xl md:text-4xl text-gray-700 font-normal mt-2">
              Smart Calculator
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Завантажте 3D-модель або замовте розрахунок за вашими кресленнями
          </p>

          <div className="mt-8">
            <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-200/50">
              <button
                onClick={() => setOrderMode('3d_model')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${orderMode === '3d_model' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' : 'text-gray-600'}`}
              >
                Завантажити 3D-модель
              </button>
              <button
                onClick={() => setOrderMode('from_scratch')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${orderMode === 'from_scratch' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' : 'text-gray-600'}`}
              >
                Замовити за кресленням/фото
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                showAdvanced
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-purple-600 border border-purple-200 hover:bg-purple-50'
              }`}
            >
              {showAdvanced ? '⚙️ Експертний режим' : '🔧 Простий режим'}
            </button>
          </div>
        </div>

        {orderMode === '3d_model' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                Smart Upload
              </h2>

              <div
                className="group border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-cyan-500 transition-all duration-300 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-blue-50 relative overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="group-hover:animate-bounce">
                    <FileText className="mx-auto mb-4 text-gray-400 group-hover:text-cyan-500 transition-colors" size={48} />
                  </div>
                  <p className="text-gray-600 mb-2 font-medium group-hover:text-cyan-600 transition-colors">
                    Перетягніть STL або STEP файл або клікніть
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">STL/STEP до 50MB</span> • Миттєвий AI аналіз
                  </p>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".stl,.step"
                onChange={handleFileUpload}
                className="hidden"
              />

              {isAnalyzing && (
                <div className="mt-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 relative mr-4">
                      <div className="absolute inset-0 border-4 border-cyan-200 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <span className="font-semibold text-cyan-800">🤖 AI аналізує вашу модель</span>
                  </div>

                  <div className="space-y-2 text-sm text-cyan-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 animate-pulse"></div>
                      Читання геометрії STL файлу...
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 animate-pulse"></div>
                      Розрахунок об'єму та складності...
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 animate-pulse"></div>
                      Аналіз потреби підпорок...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {fileAnalysis && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200 shadow-xl">
                <h3 className="font-bold text-emerald-800 mb-6 flex items-center text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  AI Analysis Complete ✨
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Трикутники', value: fileAnalysis.triangleCount.toLocaleString(), icon: '🔺' },
                    { label: 'Об\'єм', value: `${fileAnalysis.volume.toFixed(1)} см³`, icon: '📦' },
                    { label: 'Складність', value: fileAnalysis.complexity.level, icon: '⚙️' },
                    { label: 'Підпорки', value: fileAnalysis.complexity.supportRequired ? `${fileAnalysis.complexity.supportAmount.toFixed(0)}%` : 'Не потрібні', icon: '🏗️' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 hover:shadow-lg transition-all duration-300">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                      <div className="font-bold text-lg text-gray-800">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                Матеріали та Якість
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Виберіть режим вибору матеріалу
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <button
                    onClick={() => setMaterialSelectionMode('manual')}
                    className={`flex-1 py-2 px-4 rounded-l-lg transition-colors ${materialSelectionMode === 'manual' ? 'bg-cyan-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Ручний
                  </button>
                  <button
                    onClick={() => setMaterialSelectionMode('auto')}
                    className={`flex-1 py-2 px-4 rounded-r-lg transition-colors ${materialSelectionMode === 'auto' ? 'bg-cyan-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Автоматичний
                  </button>
                </div>
              </div>

              {materialSelectionMode === 'manual' && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Виберіть матеріал
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(materials).map(([key, material]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedMaterial(key)}
                        className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                          selectedMaterial === key
                            ? 'border-cyan-400 shadow-lg shadow-cyan-500/25 bg-gradient-to-r from-cyan-50 to-blue-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {selectedMaterial === key && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${material.color} opacity-5`}></div>
                        )}

                        <div className="relative flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${material.color} mr-3 shadow-sm`}></div>
                              <div className="font-semibold text-lg">{material.name}</div>
                              {selectedMaterial === key && (
                                <div className="ml-2 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{material.description}</div>
                            <div className="text-xs text-gray-500">
                              🌡️ {material.minTemp}-{material.maxTemp}°C
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-lg font-bold text-cyan-600">${material.price}/г</div>
                            <div className="text-xs text-gray-500">{material.density} г/см³</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {materialSelectionMode === 'auto' && (
                <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Вкажіть вимоги до виробу
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Міцність</label>
                      <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                        <option>Стандартна</option>
                        <option>Підвищена</option>
                        <option>Максимальна</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Гнучкість</label>
                      <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                        <option>Жорсткий</option>
                        <option>Напів-гнучкий</option>
                        <option>Гнучкий</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Температура експлуатації</label>
                      <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                        <option>До 60°C</option>
                        <option>До 80°C</option>
                        <option>До 100°C</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Якість друку
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(qualities).map(([key, quality]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedQuality(key)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedQuality === key
                          ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg shadow-purple-500/25'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{quality.icon}</span>
                          <div>
                            <div className="font-semibold">{quality.name}</div>
                            <div className="text-sm text-gray-600">{quality.description}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {quality.timeMultiplier}x час
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {showAdvanced && (
                <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="text-xl mr-2">⚙️</span>
                    Експертні налаштування
                  </h4>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Заповнення: <span className="font-bold text-cyan-600">{infillDensity}%</span>
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={infillDensity}
                        onChange={(e) => setInfillDensity(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>💨 Швидко</span>
                        <span>🛡️ Міцно</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Товщина стінок: <span className="font-bold text-cyan-600">{wallThickness}мм</span>
                      </label>
                      <input
                        type="range"
                        min="0.4"
                        max="3.0"
                        step="0.2"
                        value={wallThickness}
                        onChange={(e) => setWallThickness(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Орієнтація
                        </label>
                        <select
                          value={printOrientation}
                          onChange={(e) => setPrintOrientation(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        >
                          <option value="auto">🤖 Авто</option>
                          <option value="xy">📐 XY</option>
                          <option value="xz">📏 XZ</option>
                          <option value="yz">📐 YZ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Підпорки
                        </label>
                        <select
                          value={supportSettings}
                          onChange={(e) => setSupportSettings(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        >
                          <option value="auto">🤖 Авто</option>
                          <option value="tree">🌳 Tree</option>
                          <option value="linear">📏 Linear</option>
                          <option value="soluble">💧 Soluble</option>
                          <option value="none">❌ Ні</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📦 Кількість</h3>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="flex-1 text-center text-2xl font-bold p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-700 transition-colors"
                  >
                    +
                  </button>
                </div>

                {quantity >= 3 && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-green-800 font-medium">
                      🎉 Знижка за кількість: {quantity >= 10 ? '15%' : quantity >= 5 ? '10%' : '5%'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {priceEstimate && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  Розрахунок вартості
                </h2>

                <div className="text-center mb-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    ${priceEstimate.total}
                  </div>
                  <div className="text-gray-600">
                    ⏱️ Час друку: {priceEstimate.printTime}г
                  </div>
                  {parseFloat(priceEstimate.discount) > 0 && (
                    <div className="text-green-600 mt-2">
                      💰 Економія: ${priceEstimate.discount}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Деталізація:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Матеріал ({priceEstimate.materialWeight}г):</span>
                      <span className="font-medium">${priceEstimate.materialCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Робота ({priceEstimate.printTime}г):</span>
                      <span className="font-medium">${priceEstimate.laborCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Налаштування:</span>
                      <span className="font-medium">${priceEstimate.setupCost}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Загалом:</span>
                      <span>${priceEstimate.total}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    🚀 Замовити зараз
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <OrderWithoutModelForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;