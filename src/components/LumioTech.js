import React, { useState } from 'react';
import Navigation from './Navigation';
import HomePage from './HomePage';
import CalculatorPage from './CalculatorPage';
import ContactPage from './ContactPage';
import PersonalAccountPage from './PersonalAccountPage';
import GalleryPage from './GalleryPage';
import OrderDetailsPage from './OrderDetailsPage';
import Footer from './Footer';
import LegalPage from './LegalPage';

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
      price: 0.035, 
      density: 1.24, 
      description: 'Біорозкладний, легкий в друку',
      supportFactor: 1.0,
      minTemp: 190,
      maxTemp: 220,
      color: 'from-blue-200 to-blue-400'
    },
    ABS: { 
      name: 'ABS', 
      price: 0.042, 
      density: 1.04, 
      description: 'Міцний, термостійкий до 80°C',
      supportFactor: 1.2,
      minTemp: 220,
      maxTemp: 250,
      color: 'from-gray-400 to-gray-600'
    },
    PETG: { 
      name: 'PETG', 
      price: 0.048, 
      density: 1.27, 
      description: 'Прозорий, хімічно стійкий',
      supportFactor: 1.1,
      minTemp: 230,
      maxTemp: 250,
      color: 'from-cyan-200 to-cyan-400'
    },
    TPU: { 
      name: 'TPU', 
      price: 0.065, 
      density: 1.20, 
      description: 'Гнучкий, еластичний',
      supportFactor: 1.8,
      minTemp: 210,
      maxTemp: 230,
      color: 'from-indigo-300 to-indigo-500'
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
      case 'orderDetails':
        return <OrderDetailsPage setCurrentPage={setCurrentPage} />;
      case 'legal':
        return <LegalPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
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
  );
};

export default LumioTech;