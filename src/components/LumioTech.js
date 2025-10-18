import React, { useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import Navigation from './Navigation';
import HomePage from './HomePage';
import CalculatorPage from './CalculatorPage';
import ContactPage from './ContactPage';
import PersonalAccountPage from './PersonalAccountPage';
import GalleryPage from './GalleryPage';
import OrderDetailsPage from './OrderDetailsPage';
import Footer from './Footer';
import LegalPage from './LegalPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const LumioTech = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [orderMode, setOrderMode] = useState('3d_model');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stlFile, setStlFile] = useState(null);
  const [fileAnalysis, setFileAnalysis] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState('PLA');
  const [materialSelectionMode, setMaterialSelectionMode] = useState('manual');
  const [selectedQuality, setSelectedQuality] = useState('0.2');
  const [quantity, setQuantity] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [printOrientation, setPrintOrientation] = useState('auto');
  const [infillDensity, setInfillDensity] = useState(20);
  const [wallThickness, setWallThickness] = useState(1.2);
  const [supportSettings, setSupportSettings] = useState('auto');
  const [postProcessing] = useState([]);
  const [urgentOrder] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const materials = {
    PLA: {
      name: 'PLA',
      price: 3.0, // 3 грн за грам
      density: 1.24, // г/см³
      description: 'Екологічний, легкий у друку',
      supportFactor: 1.0,
      minTemp: 190,
      maxTemp: 220,
      color: 'from-green-400 to-green-600'
    },
    ABS: {
      name: 'ABS',
      price: 3.5, // 3.5 грн за грам
      density: 1.04,
      description: 'Міцний, термостійкий до 80°C',
      supportFactor: 1.2,
      minTemp: 220,
      maxTemp: 250,
      color: 'from-red-400 to-red-600'
    },
    PETG: {
      name: 'PETG',
      price: 4.0, // 4 грн за грам
      density: 1.27,
      description: 'Прозорий, хімічно стійкий',
      supportFactor: 1.1,
      minTemp: 230,
      maxTemp: 250,
      color: 'from-blue-400 to-blue-600'
    },
    TPU: {
      name: 'TPU',
      price: 6.0, // 6 грн за грам (гнучкий дорожчий)
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

  const calculatePrice = () => {
    if (!fileAnalysis) return null;

    const material = materials[selectedMaterial];
    const quality = qualities[selectedQuality];

    // Розрахунок ваги матеріалу (об'єм в см³ * щільність * % заповнення)
    const adjustedVolume = fileAnalysis.volume * (infillDensity / 100);
    const materialWeight = adjustedVolume * material.density; // грами
    const materialCost = materialWeight * material.price; // грн

    // Розрахунок часу друку (години)
    const baseTime = fileAnalysis.volume * 0.5; // базовий час
    const totalPrintTime = baseTime * quality.timeMultiplier * fileAnalysis.complexity.difficulty;

    // Вартість підтримок
    let supportCost = 0;
    if (fileAnalysis.complexity.supportRequired && supportSettings !== 'none') {
      const supportMaterialWeight = materialWeight * (fileAnalysis.complexity.supportAmount / 100);
      supportCost = supportMaterialWeight * material.price * 0.7; // підтримки 70% від ціни матеріалу
    }

    // Робота: 50 грн за годину друку
    const laborCost = totalPrintTime * 50;

    // Налаштування принтера
    const setupCost = 100; // 100 грн за налаштування

    // Постобробка
    const postProcessingCost = postProcessing.reduce((total, serviceId) => {
      const servicePrices = {
        sanding: 150,    // Шліфування
        painting: 300,   // Фарбування
        assembly: 200,   // Збірка
        drilling: 100,   // Свердління
        packaging: 50    // Упаковка
      };
      return total + (servicePrices[serviceId] || 0);
    }, 0);

    // Базова вартість
    let baseCost = materialCost + supportCost + laborCost + setupCost + postProcessingCost;

    // Термінове замовлення +50%
    if (urgentOrder) {
      baseCost *= 1.5;
    }

    // Знижки за кількість
    const subtotal = baseCost * quantity;
    const quantityDiscount = quantity >= 10 ? 0.20 : quantity >= 5 ? 0.15 : quantity >= 3 ? 0.10 : 0;
    const discount = subtotal * quantityDiscount;
    const total = subtotal - discount;

    return {
      materialCost: Math.round(materialCost),
      supportCost: Math.round(supportCost),
      laborCost: Math.round(laborCost),
      setupCost: Math.round(setupCost),
      postProcessingCost: Math.round(postProcessingCost),
      printTime: totalPrintTime.toFixed(1),
      materialWeight: materialWeight.toFixed(1),
      subtotal: Math.round(subtotal),
      discount: Math.round(discount),
      total: Math.round(total),
      quantityDiscount: (quantityDiscount * 100).toFixed(0)
    };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.name.toLowerCase().endsWith('.stl') || file.name.toLowerCase().endsWith('.step'))) {
      setStlFile(file);
      analyzeSTLFile(file);
    } else {
      alert('Будь ласка, завантажте STL або STEP файл');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.name.toLowerCase().endsWith('.stl') || file.name.toLowerCase().endsWith('.step'))) {
      setStlFile(file);
      analyzeSTLFile(file);
    }
  };

  const priceEstimate = calculatePrice();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'calculator':
        return <CalculatorPage
                  stlFile={stlFile}
                  setStlFile={setStlFile}
                  fileAnalysis={fileAnalysis}
                  setFileAnalysis={setFileAnalysis}
                  orderMode={orderMode}
                  setOrderMode={setOrderMode}
                  selectedMaterial={selectedMaterial}
                  setSelectedMaterial={setSelectedMaterial}
                  materialSelectionMode={materialSelectionMode}
                  setMaterialSelectionMode={setMaterialSelectionMode}
                  selectedQuality={selectedQuality}
                  setSelectedQuality={setSelectedQuality}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  isAnalyzing={isAnalyzing}
                  setIsAnalyzing={setIsAnalyzing}
                  showAdvanced={showAdvanced}
                  setShowAdvanced={setShowAdvanced}
                  infillDensity={infillDensity}
                  setInfillDensity={setInfillDensity}
                  wallThickness={wallThickness}
                  setWallThickness={setWallThickness}
                  printOrientation={printOrientation}
                  setPrintOrientation={setPrintOrientation}
                  supportSettings={supportSettings}
                  setSupportSettings={setSupportSettings}
                  urgentOrder={urgentOrder}
                  priceEstimate={priceEstimate}
                  handleFileUpload={handleFileUpload}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                  materials={materials}
                  qualities={qualities}
                  setCurrentPage={setCurrentPage}
               />;
      case 'contact':
        return <ContactPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'account':
        return <PersonalAccountPage setCurrentPage={setCurrentPage} />;
      case 'login':
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case 'register':
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case 'orderDetails':
        return <OrderDetailsPage setCurrentPage={setCurrentPage} />;
      case 'legal':
        return <LegalPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-forge-darkest flex flex-col">
        <Navigation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main className="flex-grow">
          {renderCurrentPage()}
        </main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </AuthProvider>
  );
};

export default LumioTech;