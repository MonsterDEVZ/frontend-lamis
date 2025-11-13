# 🎯 ПРОМПТ: ЗАПОЛНЕНИЕ ТЕСТОВЫХ ДАННЫХ ДЛЯ ЛОКАЛЬНОГО ТЕСТИРОВАНИЯ

## КОНТЕКСТ

База данных пуста после миграции. Нужно создать МИНИМАЛЬНЫЕ тестовые данные для проверки всей архитектуры:

- ✅ Все 6 Section (уже существуют в nav)
- ✅ Бренды (3 шт): Lamis, Caizer, Blesk
- ✅ Category + Type + Collection для каждого бренда
- ✅ Product карточки с изображениями для каждой комбинации

**КЛЮЧЕВОЙ МОМЕНТ:** Важно чтобы **ВЕЗДЕ было минимум 1 товар** для каждой комбинации (Brand + Category + Type + Collection). Картинки могут дублироваться!

---

## ЭТАП 1: BACKEND - Создать Brand'ы (Django Admin)

Открыть: http://127.0.0.1:8000/admin/products/brand/

Добавить 3 бренда:

### Brand 1: Lamis

```
Name: Lamis
Slug: lamis
Description: Мебель и сантехника премиум класса
```

### Brand 2: Caizer

```
Name: Caizer
Slug: caizer
Description: Сантехника и керамика
```

### Brand 3: Blesk

```
Name: Blesk
Slug: blesk
Description: Водонагреватели и системы
```

---

## ЭТАП 2: SECTION 1 - МЕБЕЛЬ ДЛЯ ВАННОЙ

### 2.1 Category для Lamis в Мебели для ванной

Открыть: http://127.0.0.1:8000/admin/products/category/

На основе скриншота **Мебель для ванной** имеет коллекции:

- Akcent, Omega, Sanremo

Создать категории (только для Lamis):

#### Category 1: Ванны

```
Name: Ванны
Slug: vanny
Section: Мебель для ванной
Brand: Lamis
Description: Ванны для ванной комнаты
```

#### Category 2: Зеркала

```
Name: Зеркала
Slug: zerkala
Section: Мебель для ванной
Brand: Lamis
Description: Зеркала для ванной
```

#### Category 3: Умывалки

```
Name: Умывалки
Slug: umyvalkii
Section: Мебель для ванной
Brand: Lamis
Description: Раковины и умывальники
```

---

### 2.2 Type для каждой Category (Lamis)

Открыть: http://127.0.0.1:8000/admin/products/type/

#### Type для Ванны:

**Type 1:**

```
Name: Встраиваемые
Slug: vstraivaemye
Category: Ванны (Мебель для ванной, Lamis)
```

**Type 2:**

```
Name: Подвесные
Slug: podvesnye
Category: Ванны (Мебель для ванной, Lamis)
```

**Type 3:**

```
Name: Напольные
Slug: napolnye
Category: Ванны (Мебель для ванной, Lamis)
```

#### Type для Зеркала:

**Type 1:**

```
Name: С подсветкой
Slug: s-podsvetkoj
Category: Зеркала (Мебель для ванной, Lamis)
```

**Type 2:**

```
Name: Без подсветки
Slug: bez-podsvetki
Category: Зеркала (Мебель для ванной, Lamis)
```

#### Type для Умывалки:

**Type 1:**

```
Name: Встраиваемые
Slug: vstraivaemye-umyvalki
Category: Умывалки (Мебель для ванной, Lamis)
```

**Type 2:**

```
Name: Накладные
Slug: nakladnye
Category: Умывалки (Мебель для ванной, Lamis)
```

---

### 2.3 Collection для Lamis в Мебели для ванной

Открыть: http://127.0.0.1:8000/admin/products/collection/

На основе скриншота коллекции:

- **Akcent** (фото слева)
- **Omega** (фото в центре)
- **Sanremo** (фото справа)

#### Collection 1: Akcent

```
Name: Akcent
Slug: akcent
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Description: Коллекция Akcent - классический дизайн
```

#### Collection 2: Omega

```
Name: Omega
Slug: omega
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Description: Коллекция Omega - современный стиль
```

#### Collection 3: Sanremo

```
Name: Sanremo
Slug: sanremo
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Description: Коллекция Sanremo - премиум качество
```

---

### 2.4 Products для Section 1 - Мебель для ванной

Открыть: http://127.0.0.1:8000/admin/products/product/

**ПРАВИЛО:** Минимум 1 товар для каждой комбинации (Brand + Category + Type + Collection)

Картинки можно ДУБЛИРОВАТЬ из списка (в конце промпта). Главное чтобы первое изображение **ВСЕГДА** было!

#### ВАННЫ + Akcent:

**Product 1: Ванна Akcent Встраиваемая 1**

```
Name: Ванна Akcent встраиваемая 150см
Slug: vanna-akcent-vstraivaemaya-150
Section: Мебель для ванной
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Collection: Akcent (Lamis)
Type: Встраиваемые
Price: 45000
Main Image: lamis-akcent-1-main.webp
Hover Image: lamis-akcent-1-render.webp
Description: Встраиваемая ванна из коллекции Akcent
```

**Product 2: Ванна Akcent Подвесная 1**

```
Name: Ванна Akcent подвесная 140см
Slug: vanna-akcent-podvesnaya-140
Section: Мебель для ванной
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Collection: Akcent (Lamis)
Type: Подвесные
Price: 52000
Main Image: lamis-akcent-2-main.webp
Hover Image: lamis-akcent-2-render.webp
Description: Подвесная ванна Akcent
```

**Product 3: Ванна Akcent Напольная 1**

```
Name: Ванна Akcent напольная 160см
Slug: vanna-akcent-napolnaya-160
Section: Мебель для ванной
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Collection: Akcent (Lamis)
Type: Напольные
Price: 38000
Main Image: lamis-akcent-3-main.webp
Hover Image: null (можно без)
Description: Напольная ванна классического дизайна
```

#### ВАННЫ + Omega:

**Product 4: Ванна Omega Встраиваемая 1**

```
Name: Ванна Omega встраиваемая 150см
Slug: vanna-omega-vstraivaemaya-150
Section: Мебель для ванной
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Collection: Omega (Lamis)
Type: Встраиваемые
Price: 48000
Main Image: lamis-omega-1-main.webp (дублируем картинку)
Hover Image: null
Description: Встраиваемая ванна Omega
```

**Product 5: Ванна Omega Подвесная 1**

```
Name: Ванна Omega подвесная 140см
Slug: vanna-omega-podvesnaya-140
Section: Мебель для ванной
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Collection: Omega (Lamis)
Type: Подвесные
Price: 55000
Main Image: lamis-amsterdam-1-main.webp (используем другую)
Hover Image: lamis-amsterdam-1-render.webp
Description: Подвесная ванна серии Omega
```

**Product 6: Ванна Omega Напольная 1**

```
Name: Ванна Omega напольная 160см
Slug: vanna-omega-napolnaya-160
Section: Мебель для ванной
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Collection: Omega (Lamis)
Type: Напольные
Price: 41000
Main Image: lamis-andalusia-1-main.webp
Hover Image: null
Description: Напольная ванна современного дизайна
```

#### ВАННЫ + Sanremo:

**Product 7: Ванна Sanremo Встраиваемая 1**

```
Name: Ванна Sanremo встраиваемая 150см
Slug: vanna-sanremo-vstraivaemaya-150
Section: Мебель для ванной
Brand: Lamis
Category: Ванны (Мебель для ванной, Lamis)
Collection: Sanremo (Lamis)
Type: Встраиваемые
Price: 50000
Main Image: lamis-sanremo-1-main.webp
Hover Image: null
Description: Премиум ванна серии Sanremo
```

#### ЗЕРКАЛА (БЕЗ коллекции):

**Product 8: Зеркало Lamis с подсветкой 1**

```
Name: Зеркало с LED подсветкой 80см
Slug: zerkalo-led-80
Section: Мебель для ванной
Brand: Lamis
Category: Зеркала (Мебель для ванной, Lamis)
Collection: (оставить пусто)
Type: С подсветкой
Price: 12000
Main Image: lamis-led-1-main.webp
Hover Image: lamis-led-1-render.webp
Description: Зеркало с теплой LED подсветкой
```

**Product 9: Зеркало Lamis без подсветки 1**

```
Name: Зеркало без подсветки 80см
Slug: zerkalo-bez-80
Section: Мебель для ванной
Brand: Lamis
Category: Зеркала (Мебель для ванной, Lamis)
Collection: (оставить пусто)
Type: Без подсветки
Price: 6000
Main Image: lamis-nora-1-main.webp
Hover Image: null
Description: Простое зеркало классического дизайна
```

#### УМЫВАЛКИ (БЕЗ коллекции):

**Product 10: Умывалка встраиваемая 1**

```
Name: Умывалка встраиваемая 60см
Slug: umyvalka-vstraivaemaya-60
Section: Мебель для ванной
Brand: Lamis
Category: Умывалки (Мебель для ванной, Lamis)
Collection: (оставить пусто)
Type: Встраиваемые
Price: 8500
Main Image: lamis-compact-1-main.webp
Hover Image: lamis-compact-1-render.webp
Description: Встраиваемая керамическая раковина
```

**Product 11: Умывалка накладная 1**

```
Name: Умывалка накладная 50см
Slug: umyvalka-nakladnaya-50
Section: Мебель для ванной
Brand: Lamis
Category: Умывалки (Мебель для ванной, Lamis)
Collection: (оставить пусто)
Type: Накладные
Price: 5500
Main Image: lamis-compact-2-main.webp
Hover Image: null
Description: Накладная раковина на столешницу
```

---

## ЭТАП 3: SECTION 2 - САНФАРФОР

**Важно:** В Санфарфоре НЕ ДОЛЖНО БЫТЬ Collection'ов! Только Category + Type!

### 3.1 Category для Caizer в Санфарфоре

#### Category 1: Унитазы

```
Name: Унитазы
Slug: unitazy
Section: Санфарфор
Brand: Caizer
Description: Унитазы и сиденья
```

#### Category 2: Раковины

```
Name: Раковины
Slug: rakoviny
Section: Санфарфор
Brand: Caizer
Description: Раковины для ванной
```

#### Category 3: Биде

```
Name: Биде
Slug: bide
Section: Санфарфор
Brand: Caizer
Description: Биде различных типов
```

### 3.2 Type для Санфарфора

#### Type для Унитазы:

**Type 1:**

```
Name: Напольные
Slug: napolnye-unitazy
Category: Унитазы (Санфарфор, Caizer)
```

**Type 2:**

```
Name: Подвесные
Slug: podvesnye-unitazy
Category: Унитазы (Санфарфор, Caizer)
```

#### Type для Раковины:

**Type 1:**

```
Name: Встраиваемые
Slug: vstraivaemye-rakoviny
Category: Раковины (Санфарфор, Caizer)
```

**Type 2:**

```
Name: Накладные
Slug: nakladnye-rakoviny
Category: Раковины (Санфарфор, Caizer)
```

#### Type для Биде:

**Type 1:**

```
Name: Напольные
Slug: napolnye-bide
Category: Биде (Санфарфор, Caizer)
```

### 3.3 Products для Санфарфора

**Product 1: Унитаз напольный**

```
Name: Унитаз напольный Caizer Standard
Slug: unitaz-caizer-standard
Section: Санфарфор
Brand: Caizer
Category: Унитазы (Санфарфор, Caizer)
Collection: (пусто!)
Type: Напольные
Price: 15000
Main Image: caizer-premium-1-main.webp
Hover Image: caizer-premium-1-render.webp
Description: Надежный напольный унитаз
```

**Product 2: Унитаз подвесной**

```
Name: Унитаз подвесной Caizer Premium
Slug: unitaz-caizer-premium-подвесной
Section: Санфарфор
Brand: Caizer
Category: Унитазы (Санфарфор, Caizer)
Collection: (пусто!)
Type: Подвесные
Price: 22000
Main Image: caizer-premium-2-main.webp
Hover Image: caizer-premium-2-render.webp
Description: Подвесной унитаз премиум серии
```

**Product 3: Раковина встраиваемая**

```
Name: Раковина встраиваемая Caizer
Slug: rakoviny-caizer-vstraivaemaya
Section: Санфарфор
Brand: Caizer
Category: Раковины (Санфарфор, Caizer)
Collection: (пусто!)
Type: Встраиваемые
Price: 8000
Main Image: caizer-premium-1-main.webp (дублируем)
Hover Image: null
Description: Встраиваемая раковина
```

**Product 4: Раковина накладная**

```
Name: Раковина накладная Caizer
Slug: rakoviny-caizer-nakladnaya
Section: Санфарфор
Brand: Caizer
Category: Раковины (Санфарфор, Caizer)
Collection: (пусто!)
Type: Накладные
Price: 5500
Main Image: caizer-premium-2-main.webp (дублируем)
Hover Image: null
Description: Накладная раковина на стол
```

**Product 5: Биде напольное**

```
Name: Биде напольное Caizer
Slug: bide-caizer-napolnoe
Section: Санфарфор
Brand: Caizer
Category: Биде (Санфарфор, Caizer)
Collection: (пусто!)
Type: Напольные
Price: 12000
Main Image: caizer-premium-1-main.webp (дублируем)
Hover Image: null
Description: Керамическое биде
```

---

## ЭТАП 4: SECTION 3 - СМЕСИТЕЛИ

### 4.1 Category для Blesk (или Lamis)

#### Category 1: Для ванны

```
Name: Для ванны
Slug: dlya-vanny-smesiteli
Section: Смесители
Brand: Blesk
Description: Смесители для ванны
```

#### Category 2: Для кухни

```
Name: Для кухни
Slug: dlya-kuhni
Section: Смесители
Brand: Blesk
Description: Смесители для кухни
```

### 4.2 Type для Смесителей

**Type 1: Однорычажные**

```
Name: Однорычажные
Slug: odnorychazhnye-smesiteli
Category: Для ванны (Смесители, Blesk)
```

**Type 2: Двухвентильные**

```
Name: Двухвентильные
Slug: dvuhventilnye-smesiteli
Category: Для ванны (Смесители, Blesk)
```

### 4.3 Products для Смесителей

**Product 1:**

```
Name: Смеситель однорычажный для ванны
Slug: smesitel-odnorychazhnyj-vanna
Section: Смесители
Brand: Blesk
Category: Для ванны (Смесители, Blesk)
Collection: (пусто!)
Type: Однорычажные
Price: 3500
Main Image: blesk-standard-1-main.webp
Hover Image: blesk-standard-1-render.webp
Description: Надежный однорычажный смеситель
```

**Product 2:**

```
Name: Смеситель двухвентильный для ванны
Slug: smesitel-dvuhventilnyj-vanna
Section: Смесители
Brand: Blesk
Category: Для ванны (Смесители, Blesk)
Collection: (пусто!)
Type: Двухвентильные
Price: 2800
Main Image: blesk-standard-1-main.webp (дублируем)
Hover Image: null
Description: Классический двухвентильный смеситель
```

**Product 3:**

```
Name: Смеситель однорычажный для кухни
Slug: smesitel-odnorychazhnyj-kuhnya
Section: Смесители
Brand: Blesk
Category: Для кухни (Смесители, Blesk)
Collection: (пусто!)
Type: Однорычажные
Price: 4200
Main Image: blesk-standard-1-main.webp (дублируем)
Hover Image: blesk-standard-1-render.webp
Description: Смеситель для кухни с выдвижным шлангом
```

---

## ЭТАП 5: SECTION 4 - ИНСТАЛЯЦИИ

### 5.1 Category для Blesk

#### Category 1: Для унитаза

```
Name: Для унитаза
Slug: dlya-unitaza-instalyacii
Section: Инсталяции
Brand: Blesk
Description: Инсталляции для унитаза
```

### 5.2 Type

**Type 1: Подвесная**

```
Name: Подвесная
Slug: podvesnaya-instalyaciya
Category: Для унитаза (Инсталяции, Blesk)
```

### 5.3 Products

**Product 1:**

```
Name: Инсталляция подвесная для унитаза
Slug: instalyaciya-unitaz-podvesnaya
Section: Инсталяции
Brand: Blesk
Category: Для унитаза (Инсталяции, Blesk)
Collection: (пусто!)
Type: Подвесная
Price: 8500
Main Image: blesk-standard-1-main.webp
Hover Image: null
Description: Встроенная инсталляция
```

---

## ЭТАП 6: SECTION 5 - ВОДОНАГРЕВАТЕЛИ

### 6.1 Category для Blesk

#### Category 1: Накопительные

```
Name: Накопительные
Slug: nakopitelnye
Section: Водонагреватели (электрические)
Brand: Blesk
Description: Накопительные водонагреватели
```

### 6.2 Type

**Type 1: 50л**

```
Name: 50л
Slug: 50l
Category: Накопительные (Водонагреватели, Blesk)
```

**Type 2: 100л**

```
Name: 100л
Slug: 100l
Category: Накопительные (Водонагреватели, Blesk)
```

### 6.3 Products

**Product 1:**

```
Name: Водонагреватель 50л Blesk
Slug: vodonagrevatel-50l-blesk
Section: Водонагреватели (электрические)
Brand: Blesk
Category: Накопительные (Водонагреватели, Blesk)
Collection: (пусто!)
Type: 50л
Price: 6500
Main Image: blesk-standard-1-main.webp
Hover Image: blesk-standard-1-render.webp
Description: Экономичный водонагреватель
```

**Product 2:**

```
Name: Водонагреватель 100л Blesk
Slug: vodonagrevatel-100l-blesk
Section: Водонагреватели (электрические)
Brand: Blesk
Category: Накопительные (Водонагреватели, Blesk)
Collection: (пусто!)
Type: 100л
Price: 9500
Main Image: blesk-standard-1-main.webp (дублируем)
Hover Image: null
Description: Мощный водонагреватель
```

---

## ЭТАП 7: SECTION 6 - ДИЗАЙНЕРСКИЕ И УМНЫЕ ЗЕРКАЛА

### 7.1 Category для Lamis

#### Category 1: С подсветкой

```
Name: С подсветкой
Slug: s-podsvetkoj-zerkala
Section: Дизайнерские и умные зеркала
Brand: Lamis
Description: Зеркала с LED подсветкой
```

#### Category 2: Умные зеркала

```
Name: Умные зеркала
Slug: umnye-zerkala
Section: Дизайнерские и умные зеркала
Brand: Lamis
Description: Зеркала с сенсором и функциями
```

### 7.2 Type

#### Type для "С подсветкой":

**Type 1:**

```
Name: LED теплое
Slug: led-teploe
Category: С подсветкой (Дизайнерские и умные зеркала, Lamis)
```

#### Type для "Умные зеркала":

**Type 1:**

```
Name: С датчиком движения
Slug: s-datchikom-dvizheniya
Category: Умные зеркала (Дизайнерские и умные зеркала, Lamis)
```

### 7.3 Products

**Product 1:**

```
Name: Зеркало с LED подсветкой 100см
Slug: zerkalo-led-100-dizajnerskoe
Section: Дизайнерские и умные зеркала
Brand: Lamis
Category: С подсветкой (Дизайнерские и умные зеркала, Lamis)
Collection: (пусто!)
Type: LED теплое
Price: 18000
Main Image: lamis-led-1-main.webp
Hover Image: lamis-led-1-render.webp
Description: Премиум зеркало с теплой подсветкой
```

**Product 2:**

```
Name: Умное зеркало с датчиком
Slug: umnoe-zerkalo-datchik
Section: Дизайнерские и умные зеркала
Brand: Lamis
Category: Умные зеркала (Дизайнерские и умные зеркала, Lamis)
Collection: (пусто!)
Type: С датчиком движения
Price: 25000
Main Image: lamis-led-2-main.webp
Hover Image: null
Description: Зеркало включается при приближении
```

---

## ИТОГО: МИНИМАЛЬНЫЙ НАБОР ДАННЫХ

```
✅ 6 Section (существуют)
✅ 3 Brand: Lamis, Caizer, Blesk
✅ Category: ~16 шт (по 2-3 на раздел)
✅ Type: ~20 шт (по 1-2 на категорию)
✅ Collection: ~3 шт (только в Мебели для ванной)
✅ Product: ~30+ шт (минимум 1 для каждой комбинации)
```

---

## ССЫЛКИ НА КАРТИНКИ (используй эти URL)

```
Lamis коллекции:
- lamis-akcent-1-main.webp
- lamis-akcent-1-render.webp
- lamis-akcent-2-main.webp
- lamis-akcent-2-render.webp
- lamis-akcent-3-main.webp
- lamis-omega-1-main.webp
- lamis-sanremo-1-main.webp
- lamis-amsterdam-1-main.webp
- lamis-amsterdam-1-render.webp
- lamis-andalusia-1-main.webp
- lamis-appalon-1-main.webp
- lamis-compact-1-main.webp
- lamis-compact-1-render.webp
- lamis-compact-2-main.webp
- lamis-harmony-1-main.webp
- lamis-lamis-1-main.webp
- lamis-lamis-1-render.webp
- lamis-lamis-2-main.webp
- lamis-led-1-main.webp
- lamis-led-1-render.webp
- lamis-led-2-main.webp
- lamis-lux-1-main.webp
- lamis-lux-1-render.webp
- lamis-lux-2-main.webp
- lamis-nora-1-main.webp
- lamis-palermo-1-main.webp
- lamis-sevilya-1-main.webp
- lamis-solo-1-main.webp
- lamis-solo-1-render.webp
- lamis-solo-2-main.webp
- lamis-solo-2-render.webp

Caizer:
- caizer-premium-1-main.webp
- caizer-premium-1-render.webp
- caizer-premium-2-main.webp
- caizer-premium-2-render.webp

Blesk:
- blesk-standard-1-main.webp
- blesk-standard-1-render.webp

Base URL: https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/catalog/
```

**Используй полный URL:**

```
https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/catalog/lamis-akcent-1-main.webp
```

---

## ПРАВИЛО ЗАПОЛНЕНИЯ

1. **ВСЕГДА** первое изображение (main_image_url) должно быть
2. Второе (hover_image_url) опционально - может быть NULL
3. Картинки могут дублироваться (тестовые данные!)
4. Важно чтобы **ВЕЗДЕ было минимум 1 товар** для каждой комбинации
5. Slug должен быть уникален или может дублироваться если в разных Section

---

## ПРОВЕРКА

После заполнения проверить в админке:

```
✅ http://127.0.0.1:8000/admin/products/brand/ → 3 бренда
✅ http://127.0.0.1:8000/admin/products/category/ → ~16 категорий
✅ http://127.0.0.1:8000/admin/products/type/ → ~20 типов
✅ http://127.0.0.1:8000/admin/products/collection/ → 3 коллекции
✅ http://127.0.0.1:8000/admin/products/product/ → 30+ товаров
```

И в API:

```
✅ GET /api/v1/brands/ → 3 бренда
✅ GET /api/v1/categories/?section_id=1&brand_id=1 → категории для раздела
✅ GET /api/v1/types/?category_id=1 → типы для категории
✅ GET /api/v1/products/?section_id=1 → товары показываются с картинками
```

---

## НАЧНИ С ЭТАПА 1 (BRAND'Ы)!
