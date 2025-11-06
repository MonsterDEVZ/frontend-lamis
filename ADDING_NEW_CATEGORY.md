# Инструкция: Добавление Новой Категории (Без Бэкенда)

Эта инструкция покажет, как вручную добавить новую категорию в трехуровневую систему фильтрации.

## Пример: Добавим категорию "Аксессуары" для бренда Lamis

---

## Шаг 1: Добавить маппинг категории в `store/filtersStore.ts`

**Файл**: `/store/filtersStore.ts`  
**Строки**: ~148-154

```typescript
// Маппинг categoryId к читаемым названиям
const categoryLabels: Record<string, string> = {
  furniture: 'Мебель для ванн',
  mirrors: 'Зеркала',
  heaters: 'Водонагреватели',
  accessories: 'Аксессуары', // ← ДОБАВЬТЕ ЭТУ СТРОКУ
  caizer: 'Сантехника Caizer',
  blesk: 'Водонагреватели Blesk',
};
```

**Важно**:
- `accessories` - это **categoryId** (используется в коде)
- `'Аксессуары'` - это **label** (отображается пользователю)

---

## Шаг 2: Добавить коллекцию в `data/collections.ts`

**Файл**: `/data/collections.ts`  
**После**: Секции "LAMIS MIRRORS COLLECTION" (~line 131)

```typescript
// ========== LAMIS ACCESSORIES COLLECTION (brandId: 1, categoryId: accessories) ==========
{
  id: 'premium-accessories',           // Уникальный ID коллекции
  name: 'Premium Accessories',         // Название для отображения
  brandId: 1,                          // 1 = Lamis
  categoryId: 'accessories',           // Связь с категорией
  slug: 'premium-accessories',         // URL-friendly slug
  description: 'Премиум аксессуары для ванной комнаты',
  image: '/catalog/Lamis/Accessories/premium-accessories.png',
},
```

**Можете добавить несколько коллекций**:
```typescript
// Коллекция 1
{
  id: 'premium-accessories',
  name: 'Premium Accessories',
  brandId: 1,
  categoryId: 'accessories',
  slug: 'premium-accessories',
  description: 'Премиум аксессуары',
  image: '/catalog/Lamis/Accessories/premium.png',
},
// Коллекция 2
{
  id: 'modern-accessories',
  name: 'Modern Accessories',
  brandId: 1,
  categoryId: 'accessories',
  slug: 'modern-accessories',
  description: 'Современные аксессуары',
  image: '/catalog/Lamis/Accessories/modern.png',
},
```

---

## Шаг 3: Добавить продукты в `data/products.ts`

**Файл**: `/data/products.ts`  
**В конце объекта**: `export const productsData = { ... }`

```typescript
export const productsData = {
  furniture: [ /* существующие продукты */ ],
  mirrors: [ /* существующие продукты */ ],
  // ... другие категории ...
  
  // ========== НОВАЯ КАТЕГОРИЯ: ACCESSORIES ==========
  accessories: [
    {
      // ОБЯЗАТЕЛЬНЫЕ ПОЛЯ
      id: 'premium-towel-holder-chrome',
      name: 'Держатель для полотенец Premium Chrome',
      price: '2 990 С',
      image: '/catalog/Lamis/Accessories/Premium/towel-holder-chrome.png',
      category: 'Accessories',
      
      // КРИТИЧЕСКИ ВАЖНО ДЛЯ ТРЕХУРОВНЕВОЙ ФИЛЬТРАЦИИ
      brandId: 1,                        // 1 = Lamis
      categoryId: 'accessories',         // Связь с категорией
      collectionId: 'premium-accessories', // Связь с коллекцией
      
      // ДОПОЛНИТЕЛЬНЫЕ ПОЛЯ
      isNew: true,
      slug: 'premium-towel-holder-chrome',
      sku: 'ACC-TWL-CHR-001',
      shortDescription: 'Хромированный держатель для полотенец',
      description: 'Современный держатель для полотенец из нержавеющей стали.',
      images: [
        '/catalog/Lamis/Accessories/Premium/towel-holder-chrome.png',
        '/catalog/Lamis/Accessories/Premium/towel-holder-chrome-2.png',
      ],
      specifications: {
        material: 'Нержавеющая сталь',
        finish: 'Хром',
        length: '60 см',
        mounting: 'Настенное',
      },
      reviews: [],
    },
    {
      id: 'premium-soap-dispenser-black',
      name: 'Дозатор для мыла Premium Black',
      price: '1 990 С',
      image: '/catalog/Lamis/Accessories/Premium/soap-dispenser-black.png',
      category: 'Accessories',
      brandId: 1,
      categoryId: 'accessories',
      collectionId: 'premium-accessories',
      isNew: false,
      slug: 'premium-soap-dispenser-black',
      sku: 'ACC-SDP-BLK-001',
      shortDescription: 'Элегантный дозатор для мыла',
      description: 'Стильный дозатор для жидкого мыла с нажимным механизмом.',
      images: [
        '/catalog/Lamis/Accessories/Premium/soap-dispenser-black.png',
      ],
      specifications: {
        material: 'Латунь',
        finish: 'Черный матовый',
        volume: '250 мл',
        mounting: 'Настольное',
      },
      reviews: [],
    },
  ],
};
```

---

## Шаг 4: (Опционально) Добавить ссылку в хедер

**Файл**: `/components/header/Header.tsx`  
**После**: Ссылки "Дизайнерские зеркала Lamis" (~line 89)

```typescript
{
  href: '/catalog?brandId=1&categoryId=accessories',
  title: 'Аксессуары Lamis',
},
```

---

## Как Работает Фильтрация После Добавления

### 1. Переход из хедера
```
Пользователь кликает "Аксессуары Lamis"
  ↓
URL: /catalog?brandId=1&categoryId=accessories
  ↓
УРОВЕНЬ 1 (Бренд): selectedBrandId = 1
  ↓ Появляются табы категорий
УРОВЕНЬ 2 (Категория): selectedCategoryId = 'accessories' (автоматически выбрано)
  ↓ Появляются табы коллекций
УРОВЕНЬ 3 (Коллекции): Показываются "Premium Accessories", "Modern Accessories"
  ↓
Показываются все аксессуары
```

### 2. Клик по коллекции
```
Пользователь кликает "Premium Accessories"
  ↓
selectedCollectionId = 'premium-accessories'
  ↓
Показываются только продукты с collectionId: 'premium-accessories'
```

---

## Проверочный Чеклист

- [ ] **Шаг 1**: Добавлен маппинг в `categoryLabels` в `filtersStore.ts`
- [ ] **Шаг 2**: Добавлена коллекция(и) в `collections.ts` с правильными:
  - `brandId` (1 = Lamis, 2 = Caizer, 3 = Blesk)
  - `categoryId` (например, 'accessories')
- [ ] **Шаг 3**: Добавлены продукты в `productsData` с **тремя обязательными полями**:
  - `brandId`
  - `categoryId`
  - `collectionId`
- [ ] **Шаг 4** (опционально): Добавлена ссылка в хедер
- [ ] **Тест**: Запустили `npm run dev` и проверили, что:
  - Категория появляется в табах
  - Коллекции появляются при выборе категории
  - Продукты фильтруются правильно

---

## Важные Замечания

1. **brandId** - это число:
   - `1` = Lamis
   - `2` = Caizer
   - `3` = Blesk

2. **categoryId** - это строка в camelCase:
   - ✅ `'accessories'`
   - ❌ `'Accessories'`
   - ❌ `'accessories-category'`

3. **collectionId** - это строка в kebab-case:
   - ✅ `'premium-accessories'`
   - ✅ `'modern-accessories'`
   - ❌ `'Premium Accessories'`

4. **Все три поля обязательны** для каждого продукта:
   ```typescript
   brandId: 1,
   categoryId: 'accessories',
   collectionId: 'premium-accessories',
   ```

5. **Изображения**: Убедитесь, что путь к изображениям существует в `/public/`

---

## Быстрый Пример: Добавить "Смесители" для Lamis

```typescript
// 1. filtersStore.ts
faucets: 'Смесители',

// 2. collections.ts
{
  id: 'modern-faucets',
  name: 'Modern Faucets',
  brandId: 1,
  categoryId: 'faucets',
  slug: 'modern-faucets',
  description: 'Современные смесители',
  image: '/catalog/Lamis/Faucets/modern.png',
},

// 3. products.ts
export const productsData = {
  // ...
  faucets: [
    {
      id: 'modern-basin-faucet-chrome',
      name: 'Смеситель для раковины Modern Chrome',
      price: '8 990 С',
      image: '/catalog/Lamis/Faucets/Modern/basin-chrome.png',
      category: 'Faucets',
      brandId: 1,
      categoryId: 'faucets',
      collectionId: 'modern-faucets',
      isNew: true,
      slug: 'modern-basin-faucet-chrome',
      // ... остальные поля
    },
  ],
};

// 4. Header.tsx
{
  href: '/catalog?brandId=1&categoryId=faucets',
  title: 'Смесители Lamis',
},
```

Готово! 🎉
