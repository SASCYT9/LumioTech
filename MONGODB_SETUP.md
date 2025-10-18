# MongoDB Setup Guide для Lumio Forge

## Варіант 1: MongoDB Atlas (Cloud - Рекомендовано)

MongoDB Atlas - це хмарна база даних з безкоштовним tier'ом, ідеально підходить для production.

### Крок 1: Реєстрація

1. Перейдіть на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Зареєструйтеся (можна через Google)

### Крок 2: Створення Cluster

1. Натисніть "Build a Database"
2. Оберіть **FREE** tier (M0 Sandbox)
3. Оберіть регіон (найближчий до ваших користувачів):
   - Для України: Frankfurt (eu-central-1) або Warsaw
4. Назвіть cluster (наприклад, "LumioForge")
5. Натисніть "Create"

### Крок 3: Налаштування доступу

**Database Access:**
1. Перейдіть в "Database Access" (ліва панель)
2. "Add New Database User"
3. Створіть користувача:
   - Username: `lumioforge_user`
   - Password: Згенеруйте складний пароль (зберігайте його!)
   - Database User Privileges: "Read and write to any database"
4. "Add User"

**Network Access:**
1. Перейдіть в "Network Access"
2. "Add IP Address"
3. **Для розробки**: "Allow Access from Anywhere" (0.0.0.0/0)
4. **Для production**: Додайте конкретні IP адреси вашого сервера
5. "Confirm"

### Крок 4: Отримання Connection String

1. Повернутися до "Database" → "Clusters"
2. Натиснути "Connect" на вашому cluster
3. Обрати "Connect your application"
4. Скопіювати connection string:

```
mongodb+srv://lumioforge_user:<password>@lumioforge.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. Замінити `<password>` на ваш реальний пароль
6. Додати назву бази даних після `.net/`:

```
mongodb+srv://lumioforge_user:ваш_пароль@lumioforge.xxxxx.mongodb.net/lumioforge?retryWrites=true&w=majority
```

### Крок 5: Додати в .env

Відкрийте `.env` файл і оновіть:

```env
MONGODB_URI=mongodb+srv://lumioforge_user:ваш_пароль@lumioforge.xxxxx.mongodb.net/lumioforge?retryWrites=true&w=majority
```

---

## Варіант 2: Локальний MongoDB (Для розробки)

### Windows

1. **Завантажити MongoDB:**
   - [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Оберіть Windows, MSI installer

2. **Встановити:**
   - Запустіть MSI файл
   - Оберіть "Complete" installation
   - Install MongoDB as a Service ✓
   - Install MongoDB Compass (GUI tool) ✓

3. **Перевірити установку:**
```bash
mongod --version
```

4. **Запустити MongoDB:**
```bash
# MongoDB повинен запуститися автоматично як Windows Service

# Якщо ні, запустіть вручну:
net start MongoDB
```

5. **Створити папку для даних (якщо потрібно):**
```bash
mkdir C:\data\db
```

6. **.env налаштування:**
```env
MONGODB_URI=mongodb://localhost:27017/lumioforge
```

### macOS

1. **Встановити через Homebrew:**
```bash
# Встановити Homebrew (якщо ще не встановлено)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Встановити MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0
```

2. **Запустити MongoDB:**
```bash
brew services start mongodb-community@7.0
```

3. **.env налаштування:**
```env
MONGODB_URI=mongodb://localhost:27017/lumioforge
```

### Linux (Ubuntu/Debian)

1. **Імпортувати публічний ключ:**
```bash
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
```

2. **Створити список файлів:**
```bash
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

3. **Встановити:**
```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
```

4. **Запустити:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Автозапуск при перезавантаженні
```

5. **Перевірити статус:**
```bash
sudo systemctl status mongod
```

6. **.env налаштування:**
```env
MONGODB_URI=mongodb://localhost:27017/lumioforge
```

---

## Перевірка підключення

Після налаштування перевірте підключення:

1. **Запустіть сервер:**
```bash
npm run server
```

2. **Шукайте в логах:**
```
✅ MongoDB connected successfully
```

3. **Якщо помилка:**
   - Перевірте, чи правильний connection string в `.env`
   - Перевірте, чи MongoDB запущений
   - Перевірте IP whitelist (для Atlas)

---

## MongoDB Compass (GUI інструмент)

Для зручного перегляду даних встановіть MongoDB Compass:

1. [Завантажити Compass](https://www.mongodb.com/try/download/compass)
2. Відкрити Compass
3. Вставити ваш connection string
4. "Connect"

Тепер ви можете переглядати колекції, документи, виконувати запити візуально.

---

## Корисні команди MongoDB Shell

```bash
# Підключитися до локального MongoDB
mongosh

# Переглянути бази даних
show dbs

# Використовувати базу
use lumioforge

# Переглянути колекції
show collections

# Знайти всі замовлення
db.orders.find()

# Знайти всіх користувачів
db.users.find()

# Підрахувати кількість замовлень
db.orders.countDocuments()

# Очистити колекцію (ОБЕРЕЖНО!)
db.contacts.deleteMany({})

# Вийти
exit
```

---

## Backup і Restore

### Backup

**MongoDB Atlas:**
- Atlas робить автоматичні backup
- Можна налаштувати в Backup вкладці

**Локальний MongoDB:**
```bash
# Backup всієї бази
mongodump --uri="mongodb://localhost:27017/lumioforge" --out="/backup/$(date +%Y%m%d)"

# Backup конкретної колекції
mongodump --uri="mongodb://localhost:27017/lumioforge" --collection=orders --out="/backup/orders"
```

### Restore

```bash
# Restore всієї бази
mongorestore --uri="mongodb://localhost:27017/lumioforge" /backup/20250101

# Restore конкретної колекції
mongorestore --uri="mongodb://localhost:27017/lumioforge" --collection=orders /backup/orders/lumioforge/orders.bson
```

---

## Troubleshooting

### "MongoServerError: not authorized"
- Перевірте username і password в connection string
- Перевірте Database Access в Atlas

### "MongooseServerSelectionError: connect ECONNREFUSED"
- MongoDB не запущений
- Неправильний connection string
- Firewall блокує підключення

### "IP not whitelisted"
- Додайте ваш IP в Network Access (Atlas)
- Або додайте 0.0.0.0/0 для доступу з будь-якого IP

### MongoDB не запускається (Windows)
```bash
# Перевірити статус сервісу
net start | findstr MongoDB

# Запустити вручну
net start MongoDB

# Або через Services.msc → знайти MongoDB → Start
```

### MongoDB не запускається (Linux)
```bash
# Перевірити логи
sudo tail -f /var/log/mongodb/mongod.log

# Перезапустити
sudo systemctl restart mongod

# Якщо не працює, можливо потрібно створити папку
sudo mkdir -p /data/db
sudo chown -R mongodb:mongodb /data/db
```

---

**База даних готова! ✅**

Тепер ваш Lumio Forge проект може зберігати дані користувачів, замовлень та контактів.
