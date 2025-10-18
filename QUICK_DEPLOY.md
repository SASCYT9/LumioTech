# 🚀 Швидкий Deploy Lumio Forge

## Покрокова інструкція (15-20 хвилин)

---

## Частина 1: Backend на Render.com

### Крок 1: Створити обліковий запис

1. Перейдіть на [Render.com](https://render.com/)
2. Натисніть **Get Started** → Sign Up
3. Зареєструйтеся через **GitHub** (рекомендовано)

### Крок 2: Підготувати GitHub репозиторій

**ВАЖЛИВО**: Спочатку потрібно завантажити код на GitHub!

```bash
# У терміналі у папці проекту:

# 1. Ініціалізувати git (якщо ще не зроблено)
git init

# 2. Додати всі файли
git add .

# 3. Зробити commit
git commit -m "Initial commit - Lumio Forge"

# 4. Створіть репозиторій на GitHub.com
# Перейдіть на github.com → New repository → Назва: LumioForge

# 5. Додайте remote
git remote add origin https://github.com/ВАШ_USERNAME/LumioForge.git

# 6. Завантажте код
git branch -M main
git push -u origin main
```

### Крок 3: Deploy Backend на Render

1. На Render.com натисніть **New +** → **Web Service**
2. Підключіть ваш GitHub репозиторій **LumioForge**
3. Налаштуйте:
   - **Name**: `lumio-forge-api`
   - **Region**: Frankfurt (Europe) або найближчий
   - **Branch**: `main`
   - **Root Directory**: залишити порожнім
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Instance Type**: `Free`

4. Натисніть **Advanced** → додайте Environment Variables:

```
MONGODB_URI = ваш_mongodb_atlas_connection_string
JWT_SECRET = lumio-forge-secret-key-2025-production
TELEGRAM_BOT_TOKEN = 8327353602:AAElAMtTldBgL52qAsMXK4phkhK7OBMtFJQ
TELEGRAM_CHAT_ID = 478891619
PORT = 5000
```

5. Натисніть **Create Web Service**

6. Зачекайте 2-3 хвилини поки deploy завершиться

7. **СКОПІЮЙТЕ URL** вашого backend (наприклад: `https://lumio-forge-api.onrender.com`)

---

## Частина 2: Frontend на Vercel

### Крок 1: Створити обліковий запис Vercel

1. Перейдіть на [Vercel.com](https://vercel.com/)
2. Натисніть **Sign Up**
3. Зареєструйтеся через **GitHub**

### Крок 2: Deploy Frontend

1. На Vercel Dashboard натисніть **Add New...** → **Project**
2. Виберіть ваш репозиторій **LumioForge**
3. Налаштування:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (залишити як є)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. Натисніть **Environment Variables** → додайте:

```
REACT_APP_API_URL = https://lumio-forge-api.onrender.com/api
```

⚠️ **ВАЖЛИВО**: Замініть `lumio-forge-api.onrender.com` на ваш реальний URL з Render (з Кроку 3.7)

5. Натисніть **Deploy**

6. Зачекайте 2-3 хвилини

7. Ваш сайт буде доступний на URL типу: `https://lumio-forge.vercel.app`

---

## Частина 3: Налаштування CORS

Після deployment потрібно оновити CORS на backend:

### Варіант А: Через Render Dashboard (простіше)

1. Зайдіть на Render.com → ваш сервіс `lumio-forge-api`
2. Environment → додайте нову змінну:

```
ALLOWED_ORIGINS = https://lumio-forge.vercel.app
```

3. Збережіть → сервіс перезапуститься автоматично

### Варіант Б: Через код (якщо хочете)

Оновіть `server/index.js` - додайте після імпортів:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://lumio-forge.vercel.app', // Ваш Vercel URL
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

Потім:
```bash
git add .
git commit -m "Update CORS settings"
git push
```

Render автоматично передеплоїть.

---

## ✅ Перевірка

Відкрийте ваш сайт на Vercel URL (наприклад `https://lumio-forge.vercel.app`):

1. ✅ Сайт відкривається з темною темою
2. ✅ Форма контактів працює
3. ✅ Можна створити замовлення
4. ✅ Telegram отримує повідомлення

---

## 🎯 Ваші URLs після deployment:

- 🌐 **Frontend**: `https://lumio-forge.vercel.app`
- 🔌 **Backend API**: `https://lumio-forge-api.onrender.com`
- 🗄️ **Database**: MongoDB Atlas (вже працює)

---

## ⚠️ Важливі примітки:

### Render Free Plan обмеження:
- Сервіс "засинає" після 15 хвилин бездіяльності
- Перший запит може бути повільним (10-30 сек)
- Для production розгляньте платний план ($7/міс)

### Vercel Free Plan:
- Необмежені deployment
- Автоматичний SSL (HTTPS)
- Глобальний CDN
- Чудова швидкість

---

## 🔄 Оновлення сайту

Коли ви робите зміни в коді:

```bash
git add .
git commit -m "Опис змін"
git push
```

- Vercel автоматично передеплоїть frontend
- Render автоматично передеплоїть backend

---

## 💡 Поради:

1. **Кастомний домен**:
   - Vercel: Settings → Domains → Add
   - Render: Settings → Custom Domain

2. **Моніторинг**:
   - Render Dashboard показує логи
   - Vercel Analytics - безкоштовна аналітика

3. **SSL/HTTPS**:
   - Автоматично працює на обох платформах!

---

## 🆘 Troubleshooting

### Backend не відповідає:
- Перевірте Environment Variables на Render
- Перевірте логи: Render Dashboard → Logs

### Frontend не може з'єднатися з API:
- Перевірте REACT_APP_API_URL на Vercel
- Перевірте CORS налаштування на backend

### MongoDB помилки:
- Перевірте IP Whitelist в MongoDB Atlas (0.0.0.0/0)
- Перевірте MONGODB_URI на Render

---

**Готово! Ваш сайт в інтернеті! 🎉**
