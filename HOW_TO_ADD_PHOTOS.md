# 📸 Як додати свої фото в галерею

## Крок 1: Підготуйте фото

1. Виберіть 6 найкращих фото ваших робіт
2. Рекомендований розмір: **800x600px** або більше
3. Формат: JPG або PNG
4. Назвіть файли:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`
   - `photo5.jpg`
   - `photo6.jpg`

## Крок 2: Покладіть фото в папку

Скопіюйте ваші фото в папку:
```
D:\LumioTech\LumioTech\public\images\gallery\
```

Структура має виглядати так:
```
public/
└── images/
    └── gallery/
        ├── photo1.jpg
        ├── photo2.jpg
        ├── photo3.jpg
        ├── photo4.jpg
        ├── photo5.jpg
        └── photo6.jpg
```

## Крок 3: Відредагуйте GalleryPage.js

Відкрийте файл: `src/components/GalleryPage.js`

Знайдіть масив `galleryItems` (рядки 11-48) і змініть:

### Приклад:

**Було:**
```javascript
{
  id: 1,
  src: 'https://placeimg.com/640/480/tech', // placeholder
  title: 'Прототип корпусу',
  description: 'Матеріал: PLA, Шар: 0.15мм'
}
```

**Стане:**
```javascript
{
  id: 1,
  src: '/images/gallery/photo1.jpg', // ← ваше фото!
  title: 'Механічна деталь двигуна', // ← ваша назва
  description: 'Матеріал: ABS, Шар: 0.1мм, Час друку: 8 год' // ← ваш опис
}
```

## Крок 4: Повний приклад з реальними даними

```javascript
const galleryItems = [
  {
    id: 1,
    src: '/images/gallery/photo1.jpg',
    title: 'Корпус для Arduino',
    description: 'Матеріал: PLA, Шар: 0.2мм, Час: 3 год'
  },
  {
    id: 2,
    src: '/images/gallery/photo2.jpg',
    title: 'Шестерня редуктора',
    description: 'Матеріал: PETG, Шар: 0.15мм, Час: 5 год'
  },
  {
    id: 3,
    src: '/images/gallery/photo3.jpg',
    title: 'Декоративна фігурка',
    description: 'Матеріал: PLA+, Шар: 0.1мм, Час: 12 год'
  },
  {
    id: 4,
    src: '/images/gallery/photo4.jpg',
    title: 'Гнучке кріплення',
    description: 'Матеріал: TPU, Шар: 0.2мм, Час: 4 год'
  },
  {
    id: 5,
    src: '/images/gallery/photo5.jpg',
    title: 'Прототип кейсу',
    description: 'Матеріал: ABS, Шар: 0.2мм, Час: 6 год'
  },
  {
    id: 6,
    src: '/images/gallery/photo6.jpg',
    title: 'Кронштейн для камери',
    description: 'Матеріал: PETG, Шар: 0.15мм, Час: 3 год'
  },
];
```

## Крок 5: Завантажте зміни на сайт

```bash
# Додайте всі зміни
git add .

# Зробіть commit
git commit -m "Add real gallery photos"

# Завантажте на GitHub
git push origin main
```

Vercel **автоматично** оновить сайт за 1-2 хвилини! 🚀

---

## 💡 Поради:

### Якість фото:
- Використовуйте добре освітлені фото
- Однотонний фон (білий/чорний) виглядає професійно
- Показуйте деталь з різних кутів (можна кілька фото однієї деталі)

### Оптимізація:
- Стискайте фото перед завантаженням (200-500 KB достатньо)
- Використовуйте [TinyPNG.com](https://tinypng.com/) для стиснення

### Більше/менше фото:
Хочете більше 6 фото? Просто додайте нові елементи в масив:

```javascript
{
  id: 7,
  src: '/images/gallery/photo7.jpg',
  title: 'Ще одна робота',
  description: 'Опис роботи'
},
{
  id: 8,
  src: '/images/gallery/photo8.jpg',
  title: 'І ще одна',
  description: 'Опис роботи'
},
```

Можна додати скільки завгодно!

---

## ✅ Готово!

Після `git push` ваші фото з'являться на сайті автоматично через 1-2 хвилини!

Перевірте: https://lumioforge3.vercel.app/ (натисніть Галерея в меню)
