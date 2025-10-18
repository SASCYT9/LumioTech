const NodeStl = require('node-stl');
const fs = require('fs');

/**
 * Parse STL file and extract real geometry data
 * @param {string} filePath - Path to STL file
 * @returns {Promise<Object>} - Parsed STL data with real dimensions and volume
 */
async function parseSTLFile(filePath) {
  try {
    // Read STL file
    const stl = new NodeStl(filePath);

    // Get bounding box (dimensions)
    const boundingBox = stl.boundingBox;
    const dimensions = {
      x: parseFloat((boundingBox[0].x - boundingBox[1].x).toFixed(2)),
      y: parseFloat((boundingBox[0].y - boundingBox[1].y).toFixed(2)),
      z: parseFloat((boundingBox[0].z - boundingBox[1].z).toFixed(2))
    };

    // Calculate volume in cubic centimeters
    const volume = parseFloat(stl.volume.toFixed(2));

    // Get surface area in square centimeters
    const surfaceArea = parseFloat(stl.area.toFixed(2));

    // Get number of triangles (facets)
    const triangleCount = stl.facetCount;

    // Get file stats
    const stats = fs.statSync(filePath);
    const fileSize = stats.size;

    // Calculate complexity metrics
    const complexity = calculateComplexity(dimensions, volume, surfaceArea, triangleCount);

    return {
      fileName: filePath.split('/').pop(),
      fileSize,
      dimensions,
      volume,
      surfaceArea,
      triangleCount,
      complexity,
      parsedAt: new Date()
    };
  } catch (error) {
    console.error('Error parsing STL file:', error);
    throw new Error('Не вдалося розпарсити STL файл: ' + error.message);
  }
}

/**
 * Calculate complexity metrics for 3D model
 */
function calculateComplexity(dimensions, volume, surfaceArea, triangleCount) {
  // Calculate volume to surface area ratio
  const volumeToSurfaceRatio = volume / surfaceArea;

  // Determine if support is likely needed based on Z height and model shape
  const heightToWidthRatio = dimensions.z / Math.max(dimensions.x, dimensions.y);
  const supportRequired = heightToWidthRatio > 1.5 || volumeToSurfaceRatio < 0.5;

  // Estimate support amount (percentage)
  let supportAmount = 0;
  if (supportRequired) {
    supportAmount = Math.min(40, heightToWidthRatio * 15 + (1 - volumeToSurfaceRatio) * 20);
  }

  // Calculate difficulty based on various factors
  const sizeFactor = Math.max(dimensions.x, dimensions.y, dimensions.z) / 100;
  const detailFactor = triangleCount / 10000;
  const difficulty = 1 + Math.min(1.5, (sizeFactor * 0.3 + detailFactor * 0.4 + supportAmount * 0.01));

  // Generate warnings
  const warnings = [];
  const maxDimension = Math.max(dimensions.x, dimensions.y, dimensions.z);

  if (maxDimension > 200) {
    warnings.push('Великий розмір - може потребувати спеціального обладнання');
  }
  if (volume > 500) {
    warnings.push('Великий об\'єм - тривалий час друку');
  }
  if (triangleCount > 100000) {
    warnings.push('Висока деталізація - можливе збільшення часу обробки');
  }
  if (dimensions.z < 2) {
    warnings.push('Дуже тонка модель - ризик деформації');
  }
  if (supportRequired && supportAmount > 30) {
    warnings.push('Потребує багато підтримки - додаткові витрати матеріалу');
  }

  // Determine complexity level
  let level = 'Низька';
  if (difficulty > 1.5) {
    level = 'Середня';
  }
  if (difficulty > 2.0) {
    level = 'Висока';
  }

  return {
    level,
    supportRequired,
    supportAmount: parseFloat(supportAmount.toFixed(1)),
    difficulty: parseFloat(difficulty.toFixed(2)),
    warnings,
    metrics: {
      heightToWidthRatio: parseFloat(heightToWidthRatio.toFixed(2)),
      volumeToSurfaceRatio: parseFloat(volumeToSurfaceRatio.toFixed(4)),
      maxDimension: parseFloat(maxDimension.toFixed(2))
    }
  };
}

/**
 * Validate STL file before processing
 */
function validateSTLFile(filePath) {
  try {
    const stats = fs.statSync(filePath);

    // Check file size (max 50MB)
    if (stats.size > 50 * 1024 * 1024) {
      throw new Error('Файл занадто великий (максимум 50MB)');
    }

    // Check file extension
    if (!filePath.toLowerCase().endsWith('.stl')) {
      throw new Error('Тільки STL файли підтримуються');
    }

    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  parseSTLFile,
  validateSTLFile,
  calculateComplexity
};
