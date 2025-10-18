# Lumio Forge - Deployment Guide

## Передумови

Перед розгортанням переконайтеся, що у вас встановлено:
- Node.js (v14+)
- MongoDB (локально або MongoDB Atlas)
- Git

## 1. Підготовка до розгортання

### Налаштування MongoDB

**Варіант A: Локальний MongoDB**
```bash
# Windows
# Завантажте і встановіть MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Запустіть MongoDB
mongod --dbpath="C:\data\db"
```

**Варіант B: MongoDB Atlas (Cloud)**
1. Зареєструйтеся на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Створіть безкоштовний cluster
3. Отримайте connection string (замініть `<password>` на ваш пароль):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/lumioforge?retryWrites=true&w=majority
   ```

### Налаштування змінних оточення

Створіть файл `.env` з наступними налаштуваннями:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/lumioforge
# Або для MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/lumioforge

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

## 2. Встановлення залежностей

```bash
npm install
```

## 3. Локальний запуск

```bash
# Запустити і сервер, і клієнт одночасно
npm run dev

# Або окремо:
npm run server  # Тільки backend (port 5000)
npm start       # Тільки frontend (port 3000)
```

## 4. Deployment Options

### A. Vercel (Рекомендовано для Frontend + Backend)

**Frontend Deployment:**

1. Створіть обліковий запис на [Vercel](https://vercel.com)

2. Встановіть Vercel CLI:
```bash
npm install -g vercel
```

3. Деплой:
```bash
# З корневої папки проєкту
vercel

# Налаштуйте Build Command: npm run build
# Output Directory: build
```

4. Додайте змінні оточення в Vercel Dashboard:
   - `REACT_APP_API_URL` = ваш backend URL

**Backend Deployment:**

Створіть окрему папку або репозиторій для backend:
```bash
vercel --prod
```

Налаштуйте `vercel.json` в папці server:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### B. Render (Найпростіший варіант)

**Frontend:**
1. Зареєструйтеся на [Render](https://render.com)
2. New → Static Site
3. Підключіть ваш GitHub репозиторій
4. Build Command: `npm run build`
5. Publish Directory: `build`

**Backend:**
1. New → Web Service
2. Підключіть ваш репозиторій
3. Build Command: `cd server && npm install`
4. Start Command: `cd server && node index.js`
5. Додайте environment variables у Render Dashboard

**MongoDB:**
- Використовуйте MongoDB Atlas (безкоштовний tier)

### C. Railway

1. Зареєструйтеся на [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Railway автоматично визначить Node.js проєкт
4. Додайте MongoDB плагін через Railway Dashboard
5. Налаштуйте environment variables

### D. Heroku

```bash
# Встановіть Heroku CLI
npm install -g heroku

# Логін
heroku login

# Створіть Heroku app
heroku create lumio-forge

# Додайте MongoDB addon
heroku addons:create mongolab:sandbox

# Додайте environment variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set TELEGRAM_BOT_TOKEN=your-token
heroku config:set TELEGRAM_CHAT_ID=your-chat-id

# Deploy
git push heroku main
```

Створіть `Procfile` у корені:
```
web: npm run server
```

### E. DigitalOcean / VPS

```bash
# 1. Підключіться до серверу
ssh user@your-server-ip

# 2. Встановіть Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Встановіть MongoDB
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

# 4. Клонуйте репозиторій
git clone https://github.com/your-username/lumio-forge.git
cd lumio-forge

# 5. Встановіть залежності
npm install

# 6. Налаштуйте .env файл
nano .env

# 7. Build frontend
npm run build

# 8. Встановіть PM2 для управління процесами
npm install -g pm2

# 9. Запустіть backend
cd server
pm2 start index.js --name lumio-forge-api

# 10. Налаштуйте Nginx як reverse proxy
sudo apt install nginx
```

Nginx конфігурація (`/etc/nginx/sites-available/lumio-forge`):
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/lumio-forge/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Активуйте конфігурацію
sudo ln -s /etc/nginx/sites-available/lumio-forge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Production Best Practices

### Безпека

1. **Змініть JWT_SECRET** на випадковий складний рядок:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

2. **HTTPS**: Використовуйте SSL сертифікати (Let's Encrypt)
```bash
sudo certbot --nginx -d yourdomain.com
```

3. **Helmet.js** для додаткової безпеки:
```bash
npm install helmet
```

У `server/index.js`:
```javascript
const helmet = require('helmet');
app.use(helmet());
```

4. **Rate Limiting**:
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Оптимізація

1. **Compression**:
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

2. **MongoDB Indexes**:
```javascript
// У моделях додайте індекси
userSchema.index({ email: 1 });
orderSchema.index({ user: 1, createdAt: -1 });
```

### Моніторинг

1. **PM2 Monitoring** (для VPS):
```bash
pm2 install pm2-logrotate
pm2 monit
```

2. **Error Tracking**: Розгляньте Sentry.io або LogRocket

### Backup

Регулярно робіть backup MongoDB:
```bash
# Backup
mongodump --uri="your-mongodb-uri" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="your-mongodb-uri" /backup/20250101
```

## 6. Після deployment

1. Перевірте всі функції:
   - Реєстрація/логін
   - Завантаження STL файлів
   - Розрахунок ціни
   - Створення замовлень
   - Telegram notifications

2. Протестуйте на різних пристроях (mobile, tablet, desktop)

3. Налаштуйте Google Analytics або інші аналітичні інструменти

4. Створіть backup стратегію

## Troubleshooting

### MongoDB Connection Error
```bash
# Перевірте, чи запущений MongoDB
sudo systemctl status mongod

# Перезапустіть
sudo systemctl restart mongod
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### CORS Issues
Переконайтеся, що ваш backend дозволяє запити з frontend домену:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-domain.com']
}));
```

## Підтримка

Якщо виникають проблеми, перевірте:
- Логи сервера: `pm2 logs` або Vercel/Render logs
- MongoDB connection
- Environment variables
- Network/Firewall settings

---

**Успішного deployment! 🚀**
