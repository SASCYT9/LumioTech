# Lumio Forge - 3D Printing Service Platform

<div align="center">

![Lumio Forge Logo](public/favicon.ico)

**Професійна платформа для 3D друку з темною індустріальною темою**

[Демо](#) | [Документація](#документація) | [API](#api)

</div>

---

## 📋 Зміст

- [Про проект](#про-проект)
- [Можливості](#можливості)
- [Технології](#технології)
- [Швидкий старт](#швидкий-старт)
- [Структура проекту](#структура-проекту)
- [Документація](#документація)
- [API](#api)
- [Deployment](#deployment)

---

## 🎯 Про проект

**Lumio Forge** - це повнофункціональна веб-платформа для послуг 3D друку з темною індустріальною темою та orange акцентами. Проект включає:

- ✅ Завантаження та аналіз 3D моделей (STL, STEP, OBJ)
- ✅ Автоматичний розрахунок вартості на базі реальних параметрів
- ✅ Систему управління замовленнями
- ✅ Аутентифікацію користувачів
- ✅ Інтеграцію з Telegram для сповіщень
- ✅ MongoDB базу даних
- ✅ Responsive dark theme дизайн

---

## ⚡ Можливості

### Для клієнтів:

- **Калькулятор вартості 3D друку**
  - Завантаження STL/STEP/OBJ файлів
  - Реальний парсинг 3D моделей
  - Вибір матеріалів (PLA, ABS, PETG, TPU)
  - Налаштування якості та параметрів друку
  - Миттєвий розрахунок ціни

- **Система замовлень**
  - Замовлення за 3D моделлю
  - Замовлення за кресленням/фото
  - Відстеження статусу замовлення
  - Історія замовлень

- **Особистий кабінет**
  - Реєстрація/логін
  - Управління профілем
  - Перегляд історії замовлень
  - Збереження адрес доставки

### Для адміністраторів:

- Telegram сповіщення про нові замовлення
- MongoDB база даних для зберігання всіх даних
- API для управління замовленнями
- Система аутентифікації JWT

---

## 🛠 Технології

### Frontend
- **React** 18.x - UI framework
- **Tailwind CSS** - Styling з кастомною темою
- **Axios** - HTTP клієнт
- **Lucide React** - Іконки

### Backend
- **Node.js** + **Express** - Server framework
- **MongoDB** + **Mongoose** - База даних
- **JWT** - Аутентифікація
- **Multer** - File uploads
- **node-stl** - STL парсинг
- **node-telegram-bot-api** - Telegram інтеграція

### Dev Tools
- **Concurrently** - Паралельний запуск dev серверів
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing

---

## 🚀 Швидкий старт

### Передумови

- Node.js (v14+)
- MongoDB (локально або Atlas)
- npm або yarn

### Встановлення

1. **Клонувати репозиторій:**
```bash
git clone https://github.com/your-username/lumio-forge.git
cd lumio-forge
```

2. **Встановити залежності:**
```bash
npm install
```

3. **Налаштувати MongoDB:**

Дивіться детальну інструкцію в [MONGODB_SETUP.md](MONGODB_SETUP.md)

Швидкий варіант:
- Використайте [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (безкоштовно)
- Або встановіть MongoDB локально

4. **Налаштувати Telegram бота:**

Виконайте інструкції з [SERVER_SETUP.md](SERVER_SETUP.md):
```bash
# Отримати ваш Telegram Chat ID
node server/getChatId.js
```

5. **Створити .env файл:**
```env
# Server
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/lumioforge
# Або для Atlas:
# MONGODB_URI=mongodb+srv://user:password@cluster.xxxxx.mongodb.net/lumioforge

# JWT
JWT_SECRET=your-secret-key-here

# Telegram
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id
```

6. **Запустити проект:**
```bash
# Development mode (frontend + backend)
npm run dev

# Або окремо:
npm run server  # Тільки backend (port 5000)
npm start       # Тільки frontend (port 3000)
```

7. **Відкрити у браузері:**
```
http://localhost:3000
```

---

## 📁 Структура проекту

```
lumio-forge/
├── public/                  # Статичні файли
│   ├── favicon.ico
│   └── index.html
├── src/                     # Frontend React
│   ├── components/         # React компоненти
│   │   ├── HomePage.js
│   │   ├── CalculatorPage.js
│   │   ├── ContactPage.js
│   │   ├── PersonalAccountPage.js
│   │   ├── GalleryPage.js
│   │   ├── OrderDetailsPage.js
│   │   ├── LegalPage.js
│   │   ├── Navigation.js
│   │   ├── Footer.js
│   │   ├── OrderModal.js
│   │   └── OrderWithoutModelForm.js
│   ├── services/           # API клієнт
│   │   └── api.js
│   ├── index.css           # Global styles
│   └── index.js            # Entry point
├── server/                  # Backend Node.js
│   ├── models/             # MongoDB моделі
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Contact.js
│   ├── middleware/         # Express middleware
│   │   └── auth.js
│   ├── services/           # Business logic
│   │   └── stlParser.js    # STL файл парсинг
│   ├── uploads/            # Завантажені файли
│   ├── index.js            # Express server
│   └── getChatId.js        # Telegram helper
├── .env                     # Environment variables
├── tailwind.config.js       # Tailwind конфігурація
├── package.json
├── DEPLOYMENT.md            # Deployment guide
├── MONGODB_SETUP.md         # MongoDB setup guide
├── SERVER_SETUP.md          # Server setup guide
└── README.md
```

---

## 📚 Документація

### Налаштування

- [MongoDB Setup](MONGODB_SETUP.md) - Детальна інструкція з налаштування бази даних
- [Server Setup](SERVER_SETUP.md) - Налаштування backend та Telegram бота
- [Test Guide](TEST_GUIDE.md) - Інструкції для тестування

### Deployment

- [Deployment Guide](DEPLOYMENT.md) - Повний гайд з deployment на різні платформи:
  - Vercel
  - Render
  - Railway
  - Heroku
  - DigitalOcean / VPS

---

## 🔌 API

### Authentication

```javascript
POST /api/auth/register    // Реєстрація
POST /api/auth/login       // Логін
GET  /api/auth/me          // Отримати поточного користувача
PUT  /api/auth/profile     // Оновити профіль
```

### Orders

```javascript
POST /api/orders/3d-model  // Створити замовлення з 3D моделлю
POST /api/orders/custom    // Створити custom замовлення
GET  /api/orders           // Отримати замовлення користувача (auth)
GET  /api/orders/:id       // Отримати конкретне замовлення (auth)
```

### STL Analysis

```javascript
POST /api/stl/analyze      // Аналіз STL файлу
```

### Contact

```javascript
POST /api/contact          // Відправити контактну форму
```

### Health Check

```javascript
GET /api/health            // Перевірка статусу сервера
```

**Приклад використання:**

```javascript
import { analyzeSTLFile, submitOrder3DModel } from './services/api';

// Аналіз STL
const analysis = await analyzeSTLFile(file);
console.log(analysis.volume, analysis.dimensions);

// Створення замовлення
const formData = new FormData();
formData.append('file', stlFile);
formData.append('name', 'Іван');
formData.append('email', 'ivan@example.com');
formData.append('material', 'PLA');
formData.append('quantity', 1);

const response = await submitOrder3DModel(formData);
console.log('Order ID:', response.orderId);
```

---

## 🎨 Дизайн

### Кольорова схема Lumio Forge

```javascript
{
  forge: {
    darkest: '#090b0d',   // Найтемніший фон
    darker: '#0f1115',    // Темний фон
    dark: '#1a1d23',      // Базовий темний
    orange: '#ff6b35',    // Основний orange
    'orange-glow': '#ff8c42', // Яскравий orange
    steel: '#4a5568',     // Металевий сірий
    'steel-light': '#718096',
    metal: '#2d3748',     // Темний метал
  }
}
```

### Кастомні класи

```css
.metal-border          // Металева рамка
.shadow-forge-glow     // Orange свічення
.shadow-inner-forge    // Внутрішня тінь
.text-glow-orange      // Текст з orange glow
```

---

## 🚢 Deployment

### Швидкий Deployment на Vercel (Рекомендовано)

1. Встановіть Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой frontend:
```bash
vercel
```

3. Деплой backend окремо або використайте Render/Railway

Детальніше в [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🔒 Безпека

- Паролі хешуються з bcrypt
- JWT токени для аутентифікації
- Валідація файлів (розмір, тип)
- CORS налаштовано
- Environment variables для секретів
- MongoDB connection з authentication

**Production checklist:**
- [ ] Змінити JWT_SECRET на складний рандомний ключ
- [ ] Налаштувати HTTPS
- [ ] Додати rate limiting
- [ ] Налаштувати CORS для конкретних доменів
- [ ] Встановити Helmet.js
- [ ] Налаштувати MongoDB IP whitelist

---

## 🧪 Тестування

```bash
# Запустити тести (коли будуть додані)
npm test

# Запустити з coverage
npm run test:coverage
```

**Ручне тестування:**
1. Перевірте реєстрацію/логін
2. Завантажте STL файл
3. Перевірте розрахунок ціни
4. Створіть замовлення
5. Перевірте Telegram сповіщення

---

<div align="center">

**Зроблено з ❤️ для Lumio Forge**

[⬆ Повернутися до початку](#lumio-forge---3d-printing-service-platform)

</div>
