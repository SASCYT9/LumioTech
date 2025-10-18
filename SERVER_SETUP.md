# Lumio Forge - Інструкція по налаштуванню сервера

## Встановлення залежностей

```bash
npm install
```

## Налаштування Telegram Bot

### 1. Отримайте свій Chat ID

Щоб отримувати замовлення в Telegram, потрібно дізнатися ваш Chat ID:

1. Відправте будь-яке повідомлення вашому боту в Telegram
2. Відкрийте в браузері:
   ```
   https://api.telegram.org/bot8327353602:AAElAMtTldBgL52qAsMXK4phkhK7OBMtFJQ/getUpdates
   ```
3. Знайдіть в відповіді `"chat":{"id":XXXXXXXXX}` - це і є ваш Chat ID
4. Скопіюйте це число

### 2. Налаштуйте .env файл

Відкрийте файл `.env` в корені проекту та замініть `YOUR_CHAT_ID_HERE` на ваш Chat ID:

```env
PORT=5000
TELEGRAM_BOT_TOKEN=8327353602:AAElAMtTldBgL52qAsMXK4phkhK7OBMtFJQ
TELEGRAM_CHAT_ID=ваш_chat_id_тут
```

## Запуск проекту

### Режим розробки (Development)

Запустити frontend та backend одночасно:

```bash
npm run dev
```

Або окремо:

```bash
# Тільки frontend (React)
npm start

# Тільки backend (Express)
npm run server
```

### Доступ до сайту

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## API Endpoints

### Контактна форма
```
POST /api/contact
Body: { name, phone, email, message }
```

### Замовлення з 3D моделлю
```
POST /api/orders/3d-model
Content-Type: multipart/form-data
Body: FormData з полями та файлом
```

### Замовлення за кресленням
```
POST /api/orders/custom
Content-Type: multipart/form-data
Body: FormData з даними
```

### Перевірка здоров'я сервера
```
GET /api/health
```

## Тестування Telegram Bot

Щоб перевірити чи працює Telegram Bot:

1. Запустіть сервер: `npm run server`
2. Відкрийте в браузері: http://localhost:5000/api/telegram/info
3. Якщо бачите інформацію про бота - все працює!

## Структура проекту

```
LumioTech/
├── server/
│   ├── index.js          # Express сервер
│   └── uploads/          # Завантажені файли
├── src/
│   ├── components/       # React компоненти
│   ├── services/
│   │   └── api.js       # API клієнт
│   └── ...
├── .env                  # Змінні оточення
└── package.json
```

## Що відбувається при замовленні?

1. Користувач заповнює форму на сайті
2. Дані відправляються на Express сервер
3. Сервер форматує повідомлення та відправляє в Telegram
4. Якщо є файли - вони також надсилаються в Telegram
5. Файли зберігаються в папці `server/uploads`

## Можливі проблеми

### Помилка "TELEGRAM_CHAT_ID не встановлено"
- Перевірте що ви додали свій Chat ID в `.env` файл

### Помилка "Error: listen EADDRINUSE"
- Порт 5000 або 3000 вже зайнятий
- Змініть PORT в `.env` файлі або закрийте програму, що використовує порт

### Форма не відправляється
- Перевірте що сервер запущений (`npm run server`)
- Перевірте консоль браузера на помилки
- Переконайтесь що `.env` файл налаштований

## Deployment (Розгортання)

Для розгортання на production:

1. Використайте Vercel/Netlify для frontend
2. Використайте Railway/Heroku для backend
3. Не забудьте додати змінні оточення на хостингу

## Підтримка

Якщо виникли проблеми - перевірте консоль сервера та браузера на помилки.
