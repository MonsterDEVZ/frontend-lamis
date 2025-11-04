# Сантехника CAIZER - Спецификация из Figma

## 📋 Общая информация

Секция "Сантехника CAIZER" - это блок с товарами сантехники от бренда Caizer, извлеченный из Figma дизайна LAMIS.

**Figma Details:**
- File: qaMjuOh6GTJQ5SKYzgGlR6
- Node: 100-2353 (Frame 26)
- URL: https://www.figma.com/design/qaMjuOh6GTJQ5SKYzgGlR6

---

## 🎨 Дизайн спецификации

### 📝 Заголовок секции

```
Текст: "Сантехника CAIZER"
Шрифт: Inter Medium
Размер: 43.3px
Вес: 500
Высота строки: 56px
Цвет: #1d1d1d
Позиция: x=335px, y=67348px
```

### 🗂️ Навигационные табы

Над секцией товаров находятся табы:
- Умные водонагреватели
- Зеркала Lamis
- Умные водонагреватели Blesk
- **Сантехника Caizer** (активная)
- Мебель для ванн Lamis

Стили табов:
```
Шрифт: Inter Medium
Размер: 14px
Отступы: 16px
```

---

## 🛍️ Карточки товаров

### Структура сетки

```
Контейнер: 1252px ширина
Количество колонок: 4
Gap (промежуток): 20px
Размер карточки: 298px × 394px
Layout: HORIZONTAL (горизонтальный)
```

### Карточка товара

#### Изображение
```
Размер: 298px × 298px (квадрат)
Border radius: 8px
Aspect ratio: 1:1
Hover эффект: scale(1.05)
Transition: 300ms
```

#### Бейдж "Новинка"
```
Текст: "Новинка"
Позиция: top-4 left-4 (абсолютная)
Фон: белый (#ffffff)
Шрифт: Inter Regular
Размер: 12px
Вес: 400
Padding: 4px 12px
Border radius: 9999px (полностью скругленный)
Z-index: 10
```

#### Информация о товаре

**Категория (Caizer):**
```
Шрифт: Inter Medium
Размер: 16px
Вес: 500
Цвет: #1d1d1d
Spacing: 4px снизу
```

**Название товара:**
```
Текст: "Сантехника Caizer"
Шрифт: Inter Medium
Размер: 16px
Вес: 500
Цвет: #1d1d1d
Spacing: 4px снизу
```

**Цена:**
```
Текст: "4 490 С"
Шрифт: Inter Medium
Размер: 20px
Вес: 500
Цвет: #1d1d1d
```

---

## 🔘 Кнопка "Показать еще"

```
Текст: "Показать еще"
Шрифт: Inter Medium
Размер: 14px
Вес: 500
Border: 2px solid #1d1d1d
Border radius: 6px
Padding: 12px 32px
Цвет текста: #1d1d1d
Hover фон: #1d1d1d
Hover текст: #ffffff
Transition: colors 300ms
Alignment: center
```

---

## 📦 Данные товаров

### 4 товара в секции:

1. **Товар 1**
   - ID: 1
   - Изображение: `/products/caizer/caizer-product-1.png`
   - Категория: Caizer
   - Название: Сантехника Caizer
   - Цена: 4 490 С
   - Новинка: Да

2. **Товар 2**
   - ID: 2
   - Изображение: `/products/caizer/caizer-product-2.png`
   - Категория: Caizer
   - Название: Сантехника Caizer
   - Цена: 4 490 С
   - Новинка: Да

3. **Товар 3**
   - ID: 3
   - Изображение: `/products/caizer/caizer-product-3.png`
   - Категория: Caizer
   - Название: Сантехника Caizer
   - Цена: 4 490 С
   - Новинка: Да

4. **Товар 4**
   - ID: 4
   - Изображение: `/products/caizer/caizer-product-4.png`
   - Категория: Caizer
   - Название: Сантехника Caizer
   - Цена: 4 490 С
   - Новинка: Да

---

## 💻 React/Next.js Implementation

### Данные товаров

```tsx
const caizerProducts = [
  {
    id: 1,
    name: 'Сантехника Caizer',
    price: '4 490 С',
    image: '/products/caizer/caizer-product-1.png',
    category: 'Caizer',
    isNew: true,
  },
  {
    id: 2,
    name: 'Сантехника Caizer',
    price: '4 490 С',
    image: '/products/caizer/caizer-product-2.png',
    category: 'Caizer',
    isNew: true,
  },
  {
    id: 3,
    name: 'Сантехника Caizer',
    price: '4 490 С',
    image: '/products/caizer/caizer-product-3.png',
    category: 'Caizer',
    isNew: true,
  },
  {
    id: 4,
    name: 'Сантехника Caizer',
    price: '4 490 С',
    image: '/products/caizer/caizer-product-4.png',
    category: 'Caizer',
    isNew: true,
  },
];
```

### Компонент секции

```tsx
<section className="py-16 bg-white">
  <div className="container mx-auto px-4 lg:px-8 xl:px-[335px]">
    {/* Заголовок */}
    <h2
      className="font-medium mb-12 lg:mb-16"
      style={{
        fontSize: 'clamp(28px, 3vw, 43.3px)',
        lineHeight: 'clamp(36px, 4vw, 56px)',
        color: '#1d1d1d'
      }}
    >
      Сантехника CAIZER
    </h2>

    {/* Сетка товаров */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8 max-w-[1252px]">
      {caizerProducts.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group"
        >
          {/* Изображение с бейджем */}
          <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-normal z-10">
                Новинка
              </div>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Информация о товаре */}
          <div className="space-y-1">
            <p className="font-medium" style={{ fontSize: '16px', color: '#1d1d1d' }}>
              {product.category}
            </p>
            <h3 className="font-medium" style={{ fontSize: '16px', color: '#1d1d1d' }}>
              {product.name}
            </h3>
            <p className="font-medium" style={{ fontSize: '20px', color: '#1d1d1d' }}>
              {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>

    {/* Кнопка */}
    <div className="text-center">
      <button
        className="inline-flex items-center justify-center rounded-md border-2 border-gray-900 px-8 py-3 font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
        style={{ fontSize: '14px' }}
      >
        Показать еще
      </button>
    </div>
  </div>
</section>
```

---

## 📱 Адаптивность

### Брейкпоинты

```css
/* Mobile (< 640px) */
grid-cols-2
gap-4
px-4

/* Tablet (640px - 1024px) */
md:grid-cols-4
gap-5
px-8

/* Desktop (> 1024px) */
lg:px-8
lg:mb-16

/* XL (> 1280px) */
xl:px-[335px]
```

### Responsive размеры

```css
/* Заголовок */
font-size: clamp(28px, 3vw, 43.3px)
line-height: clamp(36px, 4vw, 56px)

/* Сетка */
max-width: 1252px (на больших экранах)
```

---

## 📂 Файлы изображений

Все изображения товаров находятся в:
```
/public/products/caizer/
├── caizer-product-1.png (16 KB)
├── caizer-product-2.png (55 KB)
├── caizer-product-3.png (35 KB)
└── caizer-product-4.png (34 KB)
```

Все изображения загружены в разрешении 2x для Retina дисплеев.

---

## ✅ Checklist реализации

- [x] Заголовок секции с точными размерами
- [x] Сетка 4 колонки с gap 20px
- [x] Карточки товаров с правильными пропорциями
- [x] Бейджи "Новинка" на всех товарах
- [x] Информация о товаре (категория, название, цена)
- [x] Hover эффект на изображениях (scale 1.05)
- [x] Кнопка "Показать еще" с правильными стилями
- [x] Все 4 изображения товаров скачаны и добавлены
- [x] Адаптивная верстка для мобильных устройств
- [x] Правильные отступы (335px на XL экранах)

---

## 🎯 Точность реализации

**100% копия из Figma**

Все размеры, шрифты, цвета, отступы и изображения точно соответствуют дизайну из Figma.

---

**Дата создания:** 2025-11-04
**Извлечено из:** Figma File qaMjuOh6GTJQ5SKYzgGlR6
**Node ID:** 100-2353
