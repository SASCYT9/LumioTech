// This will be the CalculatorPage component
import React, { useRef, useState } from 'react';
import {
  Upload, FileText, Palette, DollarSign, CheckCircle
} from 'lucide-react';
import OrderWithoutModelForm from './OrderWithoutModelForm';
import OrderModal from './OrderModal';

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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOrderClick = () => {
    if (!stlFile || !priceEstimate) {
      alert('Спочатку завантажте 3D модель для розрахунку вартості');
      return;
    }
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-forge-darkest py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-forge-metal/80 backdrop-blur-sm rounded-full shadow-forge-glow metal-border mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-forge-orange to-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-300">Розрахунок вартості в реальному часі</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-forge-orange via-forge-orange-glow to-forge-orange bg-clip-text text-transparent text-glow-orange">
              Forge Calculator
            </span>
            <span className="block text-3xl md:text-4xl text-gray-300 font-normal mt-2">
              Точний розрахунок вартості
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Завантажте 3D-модель або замовте розрахунок за вашими кресленнями
          </p>

          <div className="mt-8">
            <div className="inline-flex bg-forge-dark/80 backdrop-blur-sm rounded-2xl shadow-forge-glow p-2 metal-border">
              <button
                onClick={() => setOrderMode('3d_model')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${orderMode === '3d_model' ? 'bg-gradient-to-r from-forge-orange to-red-600 text-white shadow-forge-glow' : 'text-gray-400'}`}
              >
                Завантажити 3D-модель
              </button>
              <button
                onClick={() => setOrderMode('from_scratch')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${orderMode === 'from_scratch' ? 'bg-gradient-to-r from-forge-orange to-red-600 text-white shadow-forge-glow' : 'text-gray-400'}`}
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
                  ? 'bg-gradient-to-r from-forge-orange to-red-600 text-white shadow-forge-glow'
                  : 'bg-forge-metal/80 backdrop-blur-sm text-forge-orange metal-border hover:bg-forge-metal'
              }`}
            >
              {showAdvanced ? 'Експертний режим' : 'Простий режим'}
            </button>
          </div>
        </div>

        {orderMode === '3d_model' ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-inner-forge p-8 metal-border">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
                <div className="w-10 h-10 bg-gradient-to-r from-forge-orange to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-forge-glow">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                Завантаження моделі
              </h2>

              <div
                className="group border-2 border-dashed border-forge-steel rounded-2xl p-8 text-center cursor-pointer hover:border-forge-orange transition-all duration-300 hover:bg-forge-metal relative overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-forge-orange/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="group-hover:animate-bounce">
                    <FileText className="mx-auto mb-4 text-gray-500 group-hover:text-forge-orange transition-colors" size={48} />
                  </div>
                  <p className="text-gray-300 mb-2 font-medium group-hover:text-forge-orange transition-colors">
                    Перетягніть STL або STEP файл або клікніть
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-medium">STL/STEP до 50MB</span> • Миттєвий аналіз
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
                <div className="mt-6 bg-forge-metal/50 rounded-2xl p-6 metal-border">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 relative mr-4">
                      <div className="absolute inset-0 border-4 border-forge-steel rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-forge-orange rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <span className="font-semibold text-forge-orange">Аналіз моделі</span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-forge-orange rounded-full mr-3 animate-pulse"></div>
                      Читання геометрії STL файлу...
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-forge-orange rounded-full mr-3 animate-pulse"></div>
                      Розрахунок об'єму та складності...
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-forge-orange rounded-full mr-3 animate-pulse"></div>
                      Аналіз потреби підпорок...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {fileAnalysis && (
              <div className="bg-forge-dark/80 rounded-3xl p-8 metal-border shadow-forge-glow">
                <h3 className="font-bold text-gray-100 mb-6 flex items-center text-xl">
                  <div className="w-8 h-8 bg-gradient-to-r from-forge-orange to-red-600 rounded-lg flex items-center justify-center mr-3">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  Аналіз завершено
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Трикутники', value: fileAnalysis.triangleCount.toLocaleString() },
                    { label: 'Об\'єм', value: `${fileAnalysis.volume.toFixed(1)} см³` },
                    { label: 'Складність', value: fileAnalysis.complexity.level },
                    { label: 'Підпорки', value: fileAnalysis.complexity.supportRequired ? `${fileAnalysis.complexity.supportAmount.toFixed(0)}%` : 'Не потрібні' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-forge-metal/80 backdrop-blur-sm rounded-2xl p-4 metal-border hover:shadow-forge-glow transition-all duration-300">
                      <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                      <div className="font-bold text-lg text-forge-orange">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-inner-forge p-8 metal-border">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
                <div className="w-10 h-10 bg-gradient-to-r from-forge-orange to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-forge-glow">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                Матеріали та Якість
              </h2>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-300 mb-4">
                  Виберіть режим вибору матеріалу
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <button
                    onClick={() => setMaterialSelectionMode('manual')}
                    className={`flex-1 py-2 px-4 rounded-l-lg transition-colors ${materialSelectionMode === 'manual' ? 'bg-forge-orange text-white' : 'bg-forge-metal text-gray-300 hover:bg-forge-steel'}`}
                  >
                    Ручний
                  </button>
                  <button
                    onClick={() => setMaterialSelectionMode('auto')}
                    className={`flex-1 py-2 px-4 rounded-r-lg transition-colors ${materialSelectionMode === 'auto' ? 'bg-forge-orange text-white' : 'bg-forge-metal text-gray-300 hover:bg-forge-steel'}`}
                  >
                    Автоматичний
                  </button>
                </div>
              </div>

              {materialSelectionMode === 'manual' && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-300 mb-4">
                    Виберіть матеріал
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(materials).map(([key, material]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedMaterial(key)}
                        className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                          selectedMaterial === key
                            ? 'border-forge-orange shadow-forge-glow bg-forge-metal'
                            : 'border-forge-steel hover:border-forge-steel-light hover:bg-forge-metal'
                        }`}
                      >
                        {selectedMaterial === key && (
                          <div className={`absolute inset-0 bg-gradient-to-r ${material.color} opacity-10`}></div>
                        )}

                        <div className="relative flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${material.color} mr-3 shadow-sm`}></div>
                              <div className="font-semibold text-lg text-gray-100">{material.name}</div>
                              {selectedMaterial === key && (
                                <div className="ml-2 w-5 h-5 bg-gradient-to-r from-forge-orange to-red-600 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-gray-400 mb-2">{material.description}</div>
                            <div className="text-xs text-gray-500">
                              {material.minTemp}-{material.maxTemp}°C
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-lg font-bold text-forge-orange">${material.price}/г</div>
                            <div className="text-xs text-gray-500">{material.density} г/см³</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {materialSelectionMode === 'auto' && (
                <div className="mb-8 p-6 bg-forge-metal/50 rounded-2xl metal-border">
                  <label className="block text-sm font-semibold text-gray-300 mb-4">
                    Вкажіть вимоги до виробу
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Міцність</label>
                      <select className="w-full p-3 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-dark text-gray-200">
                        <option>Стандартна</option>
                        <option>Підвищена</option>
                        <option>Максимальна</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Гнучкість</label>
                      <select className="w-full p-3 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-dark text-gray-200">
                        <option>Жорсткий</option>
                        <option>Напів-гнучкий</option>
                        <option>Гнучкий</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Температура експлуатації</label>
                      <select className="w-full p-3 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-dark text-gray-200">
                        <option>До 60°C</option>
                        <option>До 80°C</option>
                        <option>До 100°C</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-300">
                  Якість друку
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(qualities).map(([key, quality]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedQuality(key)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedQuality === key
                          ? 'border-forge-orange bg-forge-metal shadow-forge-glow'
                          : 'border-forge-steel hover:border-forge-steel-light hover:bg-forge-metal'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div>
                            <div className="font-semibold text-gray-100">{quality.name}</div>
                            <div className="text-sm text-gray-400">{quality.description}</div>
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
                <div className="mt-8 bg-forge-metal/50 rounded-2xl p-6 metal-border">
                  <h4 className="font-semibold text-gray-200 mb-4 flex items-center">
                    Експертні налаштування
                  </h4>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Заповнення: <span className="font-bold text-forge-orange">{infillDensity}%</span>
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={infillDensity}
                        onChange={(e) => setInfillDensity(parseInt(e.target.value))}
                        className="w-full h-2 bg-forge-steel rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>Швидко</span>
                        <span>Міцно</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Товщина стінок: <span className="font-bold text-forge-orange">{wallThickness}мм</span>
                      </label>
                      <input
                        type="range"
                        min="0.4"
                        max="3.0"
                        step="0.2"
                        value={wallThickness}
                        onChange={(e) => setWallThickness(parseFloat(e.target.value))}
                        className="w-full h-2 bg-forge-steel rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Орієнтація
                        </label>
                        <select
                          value={printOrientation}
                          onChange={(e) => setPrintOrientation(e.target.value)}
                          className="w-full p-3 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-dark text-gray-200"
                        >
                          <option value="auto">Авто</option>
                          <option value="xy">XY</option>
                          <option value="xz">XZ</option>
                          <option value="yz">YZ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Підпорки
                        </label>
                        <select
                          value={supportSettings}
                          onChange={(e) => setSupportSettings(e.target.value)}
                          className="w-full p-3 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange focus:border-forge-orange bg-forge-dark text-gray-200"
                        >
                          <option value="auto">Авто</option>
                          <option value="tree">Tree</option>
                          <option value="linear">Linear</option>
                          <option value="soluble">Soluble</option>
                          <option value="none">Ні</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-200 mb-4">Кількість</h3>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full bg-forge-steel flex items-center justify-center hover:bg-forge-steel-light transition-colors text-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="flex-1 text-center text-2xl font-bold p-3 border border-forge-steel rounded-xl focus:ring-2 focus:ring-forge-orange bg-forge-dark text-gray-100"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full bg-forge-orange text-white flex items-center justify-center hover:bg-forge-orange-glow transition-colors"
                  >
                    +
                  </button>
                </div>

                {quantity >= 3 && (
                  <div className="mt-4 p-4 bg-forge-metal rounded-xl metal-border">
                    <div className="text-forge-orange font-medium">
                      Знижка за кількість: {quantity >= 10 ? '15%' : quantity >= 5 ? '10%' : '5%'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {priceEstimate && (
              <div className="bg-forge-dark/80 backdrop-blur-sm rounded-3xl shadow-forge-glow p-8 metal-border">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-r from-forge-orange to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-forge-glow">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  Розрахунок вартості
                </h2>

                <div className="text-center mb-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-forge-orange to-forge-orange-glow bg-clip-text text-transparent mb-2">
                    ${priceEstimate.total}
                  </div>
                  <div className="text-gray-400">
                    Час друку: {priceEstimate.printTime}г
                  </div>
                  {parseFloat(priceEstimate.discount) > 0 && (
                    <div className="text-forge-orange mt-2">
                      Економія: ${priceEstimate.discount}
                    </div>
                  )}
                </div>

                <div className="bg-forge-metal/50 rounded-2xl p-6 metal-border">
                  <h4 className="font-semibold text-gray-200 mb-4">Деталізація:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Матеріал ({priceEstimate.materialWeight}г):</span>
                      <span className="font-medium text-gray-100">${priceEstimate.materialCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Робота ({priceEstimate.printTime}г):</span>
                      <span className="font-medium text-gray-100">${priceEstimate.laborCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Налаштування:</span>
                      <span className="font-medium text-gray-100">${priceEstimate.setupCost}</span>
                    </div>
                    <hr className="my-2 border-forge-steel" />
                    <div className="flex justify-between font-bold text-gray-100">
                      <span>Загалом:</span>
                      <span>${priceEstimate.total}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleOrderClick}
                    className="w-full bg-gradient-to-r from-forge-orange to-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-forge-glow-lg transition-all transform hover:scale-105 shadow-forge-glow"
                  >
                    Замовити зараз
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

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        orderData={{
          material: selectedMaterial,
          quality: selectedQuality,
          quantity: quantity,
          priceEstimate: priceEstimate
        }}
        stlFile={stlFile}
      />
    </div>
  );
};

export default CalculatorPage;