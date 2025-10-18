const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import models
const User = require('./models/User');
const Order = require('./models/Order');
const Contact = require('./models/Contact');
const { auth, optionalAuth } = require('./middleware/auth');
const { parseSTLFile, validateSTLFile } = require('./services/stlParser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lumioforge';
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Telegram Bot setup
const TELEGRAM_TOKEN = '8327353602:AAElAMtTldBgL52qAsMXK4phkhK7OBMtFJQ';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Додайте ваш chat_id в .env файл
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /stl|step|obj/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Тільки STL, STEP або OBJ файли дозволені!'));
  }
});

// Helper function to send Telegram message
async function sendTelegramMessage(message, chatId = TELEGRAM_CHAT_ID) {
  try {
    if (!chatId) {
      console.error('TELEGRAM_CHAT_ID не встановлено в .env файлі');
      return;
    }
    await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    console.log('Повідомлення відправлено в Telegram');
  } catch (error) {
    console.error('Помилка при відправці в Telegram:', error);
    if (error.response && error.response.body) {
      try {
        const body = JSON.parse(error.response.body);
        console.error('Деталі помилки Telegram:', body);
      } catch (e) {
        console.error('Не вдалося розпарсити body Telegram:', error.response.body);
      }
    }
  }
}

// Helper function to format order message
function formatOrderMessage(orderData) {
  const {
    orderType,
    name,
    phone,
    email,
    fileName,
    material,
    quality,
    quantity,
    priceEstimate,
    message
  } = orderData;

  let messageText = `
🔔 <b>НОВЕ ЗАМОВЛЕННЯ - LUMIO FORGE</b> 🔔

👤 <b>Клієнт:</b>
• Ім'я: ${name || 'Не вказано'}
• Телефон: ${phone || 'Не вказано'}
• Email: ${email || 'Не вказано'}

📦 <b>Деталі замовлення:</b>
• Тип: ${orderType === '3d_model' ? '3D модель' : 'За кресленням/фото'}
`;

  if (fileName) {
    messageText += `• Файл: ${fileName}\n`;
  }

  if (material) {
    messageText += `• Матеріал: ${material}\n`;
  }

  if (quality) {
    messageText += `• Якість: ${quality}mm\n`;
  }

  if (quantity) {
    messageText += `• Кількість: ${quantity} шт\n`;
  }

  if (priceEstimate) {
    messageText += `\n💰 <b>Вартість:</b>
• Матеріал: $${priceEstimate.materialCost}
• Робота: $${priceEstimate.laborCost}
• Налаштування: $${priceEstimate.setupCost}
• <b>ВСЬОГО: $${priceEstimate.total}</b>
• Час друку: ${priceEstimate.printTime}г
`;
  }

  if (message) {
    messageText += `\n💬 <b>Повідомлення:</b>\n${message}`;
  }

  messageText += `\n\n⏰ Час: ${new Date().toLocaleString('uk-UA')}`;

  return messageText;
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Analyze STL file
app.post('/api/stl/analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Файл не завантажено'
      });
    }

    // Validate STL file
    try {
      validateSTLFile(req.file.path);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Parse STL file
    const analysis = await parseSTLFile(req.file.path);

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Помилка при аналізі STL файлу:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при аналізі файлу: ' + error.message
    });
  }
});

// Submit order with 3D model
app.post('/api/orders/3d-model', optionalAuth, upload.single('file'), async (req, res) => {
  try {
    const priceEstimate = req.body.priceEstimate ? JSON.parse(req.body.priceEstimate) : null;

    // Generate order number
    const orderNumber = await Order.generateOrderNumber();

    // Create order in database
    const order = new Order({
      orderNumber,
      orderType: '3d_model',
      user: req.user ? req.user._id : null,
      guestInfo: !req.user ? {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      } : undefined,
      items: [{
        fileName: req.file ? req.file.originalname : null,
        filePath: req.file ? req.file.path : null,
        material: req.body.material,
        quality: req.body.quality,
        quantity: parseInt(req.body.quantity) || 1,
        volume: priceEstimate ? parseFloat(priceEstimate.materialWeight) : 0,
        price: priceEstimate ? parseFloat(priceEstimate.total) : 0
      }],
      pricing: priceEstimate ? {
        materialCost: parseFloat(priceEstimate.materialCost),
        laborCost: parseFloat(priceEstimate.laborCost),
        supportCost: parseFloat(priceEstimate.supportCost),
        setupCost: parseFloat(priceEstimate.setupCost),
        postProcessingCost: parseFloat(priceEstimate.postProcessingCost),
        subtotal: parseFloat(priceEstimate.subtotal),
        discount: parseFloat(priceEstimate.discount),
        total: parseFloat(priceEstimate.total)
      } : undefined,
      status: 'pending'
    });

    await order.save();

    const orderData = {
      orderType: '3d_model',
      orderNumber,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      fileName: req.file ? req.file.originalname : null,
      material: req.body.material,
      quality: req.body.quality,
      quantity: req.body.quantity,
      priceEstimate,
      message: req.body.message
    };

    const telegramMessage = formatOrderMessage(orderData);
    await sendTelegramMessage(telegramMessage);

    // Send file to Telegram if uploaded
    if (req.file && TELEGRAM_CHAT_ID) {
      try {
        await bot.sendDocument(TELEGRAM_CHAT_ID, req.file.path, {
          caption: `3D модель: ${req.file.originalname}\nЗамовлення: ${orderNumber}`
        });
      } catch (error) {
        console.error('Помилка при відправці файлу:', error);
      }
    }

    res.json({
      success: true,
      message: 'Замовлення успішно отримано!',
      orderId: order._id,
      orderNumber: orderNumber
    });
  } catch (error) {
    console.error('Помилка при обробці замовлення:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при обробці замовлення'
    });
  }
});

// Submit order without model (by drawing/photo)
app.post('/api/orders/custom', optionalAuth, upload.array('files', 10), async (req, res) => {
  try {
    // Generate order number
    const orderNumber = await Order.generateOrderNumber();

    // Create order in database
    const order = new Order({
      orderNumber,
      orderType: 'custom',
      user: req.user ? req.user._id : null,
      guestInfo: !req.user ? {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      } : undefined,
      customDetails: {
        projectDescription: req.body.projectDescription,
        requirements: req.body.message,
        deadline: req.body.deadline ? new Date(req.body.deadline) : undefined,
        budget: req.body.budget,
        files: req.files ? req.files.map(f => f.path) : []
      },
      status: 'pending'
    });

    await order.save();

    const orderData = {
      orderType: 'custom',
      orderNumber,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      message: req.body.message,
      projectDescription: req.body.projectDescription,
      quantity: req.body.quantity,
      deadline: req.body.deadline
    };

    const telegramMessage = formatOrderMessage(orderData);
    await sendTelegramMessage(telegramMessage);

    // Send files to Telegram if uploaded
    if (req.files && req.files.length > 0 && TELEGRAM_CHAT_ID) {
      for (const file of req.files) {
        try {
          await bot.sendDocument(TELEGRAM_CHAT_ID, file.path, {
            caption: `Файл: ${file.originalname}\nЗамовлення: ${orderNumber}`
          });
        } catch (error) {
          console.error('Помилка при відправці файлу:', error);
        }
      }
    }

    res.json({
      success: true,
      message: 'Запит успішно відправлено!',
      orderId: order._id,
      orderNumber: orderNumber
    });
  } catch (error) {
    console.error('Помилка при обробці запиту:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при обробці запиту'
    });
  }
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      phone,
      email,
      message
    });
    await contact.save();

    const telegramMessage = `
🔔 <b>НОВЕ ПОВІДОМЛЕННЯ З ФОРМИ КОНТАКТІВ</b> 🔔

👤 <b>Відправник:</b>
• Ім'я: ${name || 'Не вказано'}
• Телефон: ${phone || 'Не вказано'}
• Email: ${email || 'Не вказано'}

💬 <b>Повідомлення:</b>
${message}

⏰ Час: ${new Date().toLocaleString('uk-UA')}
`;

    await sendTelegramMessage(telegramMessage);

    res.json({
      success: true,
      message: 'Повідомлення успішно відправлено!'
    });
  } catch (error) {
    console.error('Помилка при відправці повідомлення:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при відправці повідомлення'
    });
  }
});

// AUTH ROUTES

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Користувач з таким email вже існує'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'lumio-forge-secret-key-2025',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Реєстрація успішна!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Помилка при реєстрації:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при реєстрації'
    });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Невірний email або пароль'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Невірний email або пароль'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'lumio-forge-secret-key-2025',
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Вхід успішний!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Помилка при вході:', error);
    res.status(500).json({
      success: false,
      message: 'Помилка при вході'
    });
  }
});

// Get current user
app.get('/api/auth/me', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        addresses: req.user.addresses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні даних користувача'
    });
  }
});

// Update user profile
app.put('/api/auth/profile', auth, async (req, res) => {
  try {
    const { name, phone, addresses } = req.body;

    if (name) req.user.name = name;
    if (phone) req.user.phone = phone;
    if (addresses) req.user.addresses = addresses;

    await req.user.save();

    res.json({
      success: true,
      message: 'Профіль оновлено!',
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        addresses: req.user.addresses
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Помилка при оновленні профілю'
    });
  }
});

// ORDER ROUTES

// Get user orders
app.get('/api/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні замовлень'
    });
  }
});

// Get specific order
app.get('/api/orders/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Замовлення не знайдено'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Помилка при отриманні замовлення'
    });
  }
});

// Get bot info (для тестування)
app.get('/api/telegram/info', async (req, res) => {
  try {
    const info = await bot.getMe();
    res.json({ success: true, botInfo: info });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Telegram Bot connected`);
  if (!TELEGRAM_CHAT_ID) {
    console.log('⚠️  УВАГА: TELEGRAM_CHAT_ID не встановлено! Додайте його в .env файл');
  }
});
