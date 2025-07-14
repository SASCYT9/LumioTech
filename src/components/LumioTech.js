import React, { useState, useRef } from 'react';
import { 
  Upload, Calculator, FileText, Printer, Palette, Clock, DollarSign, 
  Menu, X, Phone, Mail, MapPin, Instagram, MessageCircle, Music,
  Star, Award, Users, Package, ArrowRight, CheckCircle, AlertTriangle,
  Layers, Zap, Shield, Heart, Target, Home, Info, MessageSquare, Lightbulb
} from 'lucide-react';

const LumioTech = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stlFile, setStlFile] = useState(null);
  const [fileAnalysis, setFileAnalysis] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState('PLA');
  const [selectedQuality, setSelectedQuality] = useState('0.2');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('white');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [printOrientation, setPrintOrientation] = useState('auto');
  const [infillDensity, setInfillDensity] = useState(20);
  const [wallThickness, setWallThickness] = useState(1.2);
  const [supportSettings, setSupportSettings] = useState('auto');
  const [postProcessing, setPostProcessing] = useState([]);
  const [urgentOrder, setUrgentOrder] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef(null);

  const materials = {
    PLA: { 
      name: 'PLA', 
      price: 0.035, 
      density: 1.24, 
      description: 'Біорозкладний, легкий в друку',
      supportFactor: 1.0,
      minTemp: 190,
      maxTemp: 220,
      color: 'from-green-400 to-green-600'
    },
    ABS: { 
      name: 'ABS', 
      price: 0.042, 
      density: 1.04, 
      description: 'Міцний, термостійкий до 80°C',
      supportFactor: 1.2,
      minTemp: 220,
      maxTemp: 250,
      color: 'from-red-400 to-red-600'
    },
    PETG: { 
      name: 'PETG', 
      price: 0.048, 
      density: 1.27, 
      description: 'Прозорий, хімічно стійкий',
      supportFactor: 1.1,
      minTemp: 230,
      maxTemp: 250,
      color: 'from-blue-400 to-blue-600'
    },
    TPU: { 
      name: 'TPU', 
      price: 0.065, 
      density: 1.20, 
      description: 'Гнучкий, еластичний',
      supportFactor: 1.8,
      minTemp: 210,
      maxTemp: 230,
      color: 'from-purple-400 to-purple-600'
    }
  };

  const qualities = {
    '0.1': { name: '0.1mm', timeMultiplier: 3.0, description: 'Висока деталізація', icon: '💎' },
    '0.15': { name: '0.15mm', timeMultiplier: 2.0, description: 'Гарна деталізація', icon: '⭐' },
    '0.2': { name: '0.2mm', timeMultiplier: 1.0, description: 'Стандартна якість', icon: '🎯' },
    '0.25': { name: '0.25mm', timeMultiplier: 0.8, description: 'Швидко', icon: '⚡' },
    '0.3': { name: '0.3mm', timeMultiplier: 0.6, description: 'Дуже швидко', icon: '🚀' }
  };

  const services = [
    {
      title: 'Прототипування',
      description: 'Швидке виготовлення прототипів для тестування ідей',
      icon: <Zap className="w-8 h-8" />,
      price: 'від $5',
      features: ['Швидкий оборот', 'Точність ±0.1мм', 'Консультації'],
      gradient: 'from-cyan-500 to-blue-500',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600'
    },
    {
      title: 'Серійне виробництво',
      description: 'Виготовлення серій від 10 до 1000+ деталей',
      icon: <Package className="w-8 h-8" />,
      price: 'від $3/шт',
      features: ['Знижки від 20%', 'Контроль якості', 'Швидка доставка'],
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Складні моделі',
      description: 'Деталі з підпорками, внутрішніми порожнинами',
      icon: <Layers className="w-8 h-8" />,
      price: 'від $8',
      features: ['Розчинні підпорки', 'Обробка поверхні', 'Контроль геометрії'],
      gradient: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Спецматеріали',
      description: 'Друк з карбону, металу, дерева, гнучких матеріалів',
      icon: <Shield className="w-8 h-8" />,
      price: 'від $12',
      features: ['Унікальні властивості', 'Професійна якість', 'Сертифікати'],
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  // Симуляція аналізу STL файлу
  const analyzeSTLFile = async (file) => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const fileSizeKB = file.size / 1024;
    const estimatedVolume = Math.max(5, fileSizeKB * 0.1);
    
    const mockData = {
      fileName: file.name,
      fileSize: file.size,
      volume: estimatedVolume,
      surfaceArea: estimatedVolume * 6,
      triangleCount: Math.floor(estimatedVolume * 1000),
      dimensions: {
        x: Math.round(Math.pow(estimatedVolume, 1/3) * 10) / 10,
        y: Math.round(Math.pow(estimatedVolume, 1/3) * 10) / 10,
        z: Math.round(Math.pow(estimatedVolume, 1/3) * 10) / 10
      },
      complexity: {
        level: estimatedVolume > 100 ? 'Висока' : estimatedVolume > 50 ? 'Середня' : 'Низька',
        supportRequired: Math.random() > 0.6,
        supportAmount: Math.random() * 40,
        difficulty: 1 + Math.random() * 1.5,
        warnings: estimatedVolume > 100 ? ['Великий розмір'] : []
      }
    };
    
    setFileAnalysis(mockData);
    setIsAnalyzing(false);
  };

  // Розрахунок ціни
  const calculatePrice = () => {
    if (!fileAnalysis) return null;
    
    const material = materials[selectedMaterial];
    const quality = qualities[selectedQuality];
    
    const adjustedVolume = fileAnalysis.volume * (infillDensity / 100);
    const materialWeight = adjustedVolume * material.density;
    const materialCost = materialWeight * material.price;
    
    const baseTime = fileAnalysis.volume * 0.5;
    const totalPrintTime = baseTime * quality.timeMultiplier * fileAnalysis.complexity.difficulty;
    
    let supportCost = 0;
    if (fileAnalysis.complexity.supportRequired && supportSettings !== 'none') {
      supportCost = materialCost * (fileAnalysis.complexity.supportAmount / 100) * 0.7;
    }
    
    const laborCost = totalPrintTime * 6;
    const setupCost = 3;
    
    const postProcessingCost = postProcessing.reduce((total, serviceId) => {
      const servicePrices = { sanding: 8, painting: 15, assembly: 12, drilling: 5, packaging: 3 };
      return total + (servicePrices[serviceId] || 0);
    }, 0);
    
    let baseCost = materialCost + supportCost + laborCost + setupCost + postProcessingCost;
    
    if (urgentOrder) {
      baseCost *= 1.5;
    }
    
    const subtotal = baseCost * quantity;
    const quantityDiscount = quantity >= 10 ? 0.15 : quantity >= 5 ? 0.10 : quantity >= 3 ? 0.05 : 0;
    const discount = subtotal * quantityDiscount;
    const total = subtotal - discount;
    
    return {
      materialCost: materialCost.toFixed(2),
      supportCost: supportCost.toFixed(2),
      laborCost: laborCost.toFixed(2),
      setupCost: setupCost.toFixed(2),
      postProcessingCost: postProcessingCost.toFixed(2),
      printTime: totalPrintTime.toFixed(1),
      materialWeight: materialWeight.toFixed(1),
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
      quantityDiscount: (quantityDiscount * 100).toFixed(0)
    };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.toLowerCase().endsWith('.stl')) {
      setStlFile(file);
      analyzeSTLFile(file);
    } else {
      alert('Будь ласка, завантажте STL файл');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.name.toLowerCase().endsWith('.stl')) {
      setStlFile(file);
      analyzeSTLFile(file);
    }
  };

  const priceEstimate = calculatePrice();

  // Navigation
  const Navigation = () => (
    <nav className="bg-white/90 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-75 animate-pulse"></div>
              <Lightbulb className="relative h-8 w-8 text-cyan-600 mr-3" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lumio
              </span>
              <span className="text-xl font-light text-gray-700 ml-1">Tech</span>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'home' 
                  ? 'text-cyan-600 bg-cyan-50 shadow-md' 
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
              }`}
            >
              Головна
              {currentPage === 'home' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => setCurrentPage('calculator')}
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'calculator' 
                  ? 'text-cyan-600 bg-cyan-50 shadow-md' 
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
              }`}
            >
              AI Калькулятор
              {currentPage === 'calculator' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                currentPage === 'contact' 
                  ? 'text-cyan-600 bg-cyan-50 shadow-md' 
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
              }`}
            >
              Контакти
              {currentPage === 'contact' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              )}
            </button>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-cyan-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur rounded-lg mt-2 shadow-lg">
              {['home', 'calculator', 'contact'].map(page => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); setMobileMenuOpen(false); }}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all w-full text-left ${
                    currentPage === page 
                      ? 'text-cyan-600 bg-cyan-50 shadow-sm' 
                      : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
                  }`}
                >
                  {page === 'home' ? '🏠 Головна' : 
                   page === 'calculator' ? '🤖 AI Калькулятор' : '📞 Контакти'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50">
                <Lightbulb className="w-5 h-5 text-cyan-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Інноваційні технології 3D друку</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Майбутнє
              </span>
              <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                3D друку
              </span>
              <span className="block bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent text-2xl md:text-4xl font-normal mt-2">
                вже тут
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold text-cyan-600">Lumio Tech</span> - ваш партнер у світі інноваційного виробництва. 
              Від ідеї до реальності за лічені години.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button 
                onClick={() => setCurrentPage('calculator')}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center">
                  🤖 AI Калькулятор
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentPage('contact')}
                className="px-8 py-4 bg-white/90 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl border border-gray-200/50 transition-all duration-300 hover:bg-white"
              >
                📞 Консультація
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: '⚡', title: '24-48год', desc: 'Швидкість' },
                { icon: '🎯', title: '±0.1мм', desc: 'Точність' },
                { icon: '🧪', title: '15+', desc: 'Матеріалів' },
                { icon: '🏆', title: '500+', desc: 'Проектів' }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{stat.title}</div>
                    <div className="text-sm text-gray-600">{stat.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Наші послуги
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Повний спектр інноваційних рішень для втілення ваших ідей
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden border border-gray-100">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8">
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={service.iconColor}>
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-6`}>
                      {service.price}
                    </div>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Calculator Page
  const CalculatorPage = () => (
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
            Завантажте STL файл і отримайте професійний аналіз з AI рекомендаціями за секунди
          </p>
          
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
                    Перетягніть STL файл або клікніть
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">STL до 50MB</span> • Миттєвий AI аналіз
                  </p>
                </div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".stl"
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
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Зв'яжіться з нами
            </span>
          </h1>
          <p className="text-xl text-gray-600">Готові втілити ваші ідеї в реальність</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Написати нам</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ім'я</label>
                  <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Ваше ім'я"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input
                    type="tel"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="+380 XX XXX XX XX"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Повідомлення</label>
                <textarea
                  rows={4}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Опишіть ваш проект..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Відправити повідомлення
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Контакти</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-cyan-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Телефон</h3>
                    <p className="text-gray-600">+380 XX XXX XX XX</p>
                    <p className="text-sm text-gray-500">Пн-Пт 9:00-18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-cyan-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@lumiotech.ua</p>
                    <p className="text-sm text-gray-500">Відповідаємо протягом 2 годин</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-cyan-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Адреса</h3>
                    <p className="text-gray-600">м. Київ, вул. Інноваційна 42</p>
                    <p className="text-sm text-gray-500">Метро "Політехнічний інститут"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-200/50">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Соціальні мережі</h2>
              <div className="space-y-4">
                <a 
                  href="https://t.me/lumiotech_ua" 
                  className="flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-cyan-50 hover:border-cyan-300 transition-colors"
                >
                  <MessageCircle className="w-6 h-6 text-cyan-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Telegram</h3>
                    <p className="text-gray-600 text-sm">@lumiotech_ua - швидкі консультації</p>
                  </div>
                </a>
                
                <a 
                  href="https://instagram.com/lumiotech_ukraine" 
                  className="flex items-center p-4 border border-gray-200 rounded-2xl hover:bg-pink-50 hover:border-pink-300 transition-colors"
                >
                  <Instagram className="w-6 h-6 text-pink-500 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Instagram</h3>
                    <p className="text-gray-600 text-sm">@lumiotech_ukraine - наші роботи</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'calculator':
        return <CalculatorPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderCurrentPage()}
    </div>
  );
};

export default LumioTech;