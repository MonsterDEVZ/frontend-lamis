# Collections Section - Quick Reference Guide

## 📐 Key Measurements

### Section Title
```
Text: "Коллекции мебели для ванн LAMIS"
Font: Inter Bold 43.3px / 56px line-height
Color: #1d1d1d
Position: x=335px, y=1300px
Margin bottom: 152px
```

### Grid Layout
```
Container: 1250px × 936px
Layout: 2×2 Grid
Gap: 20px (horizontal & vertical)
```

### Collection Cards
```
Size: 615px × 458px
Border Radius: 16px
Padding: 20px 30px (vertical horizontal)
Aspect Ratio: 1.34:1
```

### Collection Names
```
Font: Inter Bold 32px / 38.73px line-height
Color: #ffffff (white)
Position: Bottom-left of card
Alignment: flex-end (bottom)
```

---

## 🎨 Collection Items

| # | Name | Image File | Text | Position |
|---|------|-----------|------|----------|
| 1 | Ламис | `lamis.png` | "Ламис" | Top-left |
| 2 | Nora | `nora.png` | "Nora" | Top-right |
| 3 | Akcent | `akcent.png` | "Akcent" | Bottom-left |
| 4 | Andalusia | `andalusia.png` | "Andalusia" | Bottom-right |

---

## 💻 Implementation

### React/Next.js Component
```tsx
const collections = [
  { id: 1, name: 'Ламис', image: '/collections/lamis.png' },
  { id: 2, name: 'Nora', image: '/collections/nora.png' },
  { id: 3, name: 'Akcent', image: '/collections/akcent.png' },
  { id: 4, name: 'Andalusia', image: '/collections/andalusia.png' },
];

<section className="px-[335px] py-20">
  <h2 className="text-[43.3px] font-bold leading-[56px] text-[#1d1d1d] mb-[152px]">
    Коллекции мебели для ванн LAMIS
  </h2>
  <div className="grid grid-cols-2 gap-5 w-[1250px]">
    {collections.map((collection) => (
      <a
        key={collection.id}
        href={`/collections/${collection.name.toLowerCase()}`}
        className="relative w-[615px] h-[458px] rounded-2xl overflow-hidden
                   flex items-end p-5 px-[30px] group cursor-pointer"
      >
        <img
          src={collection.image}
          alt={collection.name}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t
                        from-black/60 to-transparent" />
        <span className="relative z-10 text-[32px] font-bold
                         leading-[38.73px] text-white">
          {collection.name}
        </span>
      </a>
    ))}
  </div>
</section>
```

### Vanilla CSS
```css
.collections-section {
  padding: 80px 335px;
}

.collections-title {
  font: 700 43.3px/56px 'Inter', sans-serif;
  color: #1d1d1d;
  margin-bottom: 152px;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(2, 615px);
  gap: 20px;
  width: 1250px;
}

.collection-card {
  position: relative;
  width: 615px;
  height: 458px;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 20px 30px;
}

.collection-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.collection-card:hover img {
  transform: scale(1.05);
}

.collection-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
  z-index: 1;
}

.collection-name {
  position: relative;
  z-index: 2;
  font: 700 32px/38.73px 'Inter', sans-serif;
  color: #ffffff;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Desktop (default) */
@media (min-width: 1440px) {
  .collections-section { padding: 80px 335px; }
  .collections-grid { width: 1250px; grid-template-columns: repeat(2, 615px); }
  .collection-card { width: 615px; height: 458px; }
}

/* Laptop */
@media (max-width: 1439px) {
  .collections-section { padding: 60px 80px; }
  .collections-grid { width: 100%; grid-template-columns: repeat(2, 1fr); max-width: 1100px; }
  .collection-card { width: 100%; height: 400px; }
}

/* Tablet */
@media (max-width: 1024px) {
  .collections-title { font-size: 36px; line-height: 44px; margin-bottom: 60px; }
  .collections-section { padding: 40px 40px; }
  .collection-card { height: 320px; }
}

/* Mobile */
@media (max-width: 768px) {
  .collections-section { padding: 40px 20px; }
  .collections-title { font-size: 28px; line-height: 36px; margin-bottom: 40px; }
  .collections-grid { grid-template-columns: 1fr; gap: 16px; }
  .collection-card { height: 280px; padding: 16px 24px; }
  .collection-name { font-size: 24px; line-height: 32px; }
}
```

---

## 🎯 Design Tokens

```json
{
  "collections": {
    "section": {
      "padding": {
        "desktop": "80px 335px",
        "tablet": "40px 40px",
        "mobile": "40px 20px"
      }
    },
    "title": {
      "fontSize": "43.3px",
      "lineHeight": "56px",
      "fontWeight": 700,
      "color": "#1d1d1d",
      "marginBottom": "152px"
    },
    "grid": {
      "width": "1250px",
      "columns": 2,
      "gap": "20px"
    },
    "card": {
      "width": "615px",
      "height": "458px",
      "borderRadius": "16px",
      "padding": "20px 30px"
    },
    "cardName": {
      "fontSize": "32px",
      "lineHeight": "38.73px",
      "fontWeight": 700,
      "color": "#ffffff"
    }
  }
}
```

---

## ✅ Checklist

- [x] Section title extracted (font, color, size)
- [x] Grid layout measured (2×2, 20px gap)
- [x] Card dimensions documented (615×458px, 16px radius)
- [x] All 4 collection images downloaded (2x resolution)
- [x] Collection names identified (Ламис, Nora, Akcent, Andalusia)
- [x] Text styling specified (Inter Bold 32px white)
- [x] Images renamed to meaningful names
- [x] Responsive breakpoints suggested
- [x] Implementation code provided

---

## 📂 File Locations

```
/Users/new/Desktop/Проекты/Lamis/e-commerce/public/
├── collections/
│   ├── lamis.png          (721 KB, 2x)
│   ├── nora.png           (777 KB, 2x)
│   ├── akcent.png         (659 KB, 2x)
│   └── andalusia.png      (1.2 MB, 2x)
├── COLLECTIONS_SECTION_SPECIFICATION.md
├── COLLECTIONS_QUICK_REFERENCE.md
├── collections_detailed_spec.json
├── collections_report.json
└── collections_summary.json
```

---

## 🔗 Figma Reference

- **File Key**: pbfBbexsMbbDtZStbolrzP
- **Section Y Position**: 1300px
- **Title Node ID**: 1:4164
- **Grid Container ID**: 1:4167
- **Card IDs**: 1:4168 (Ламис), 1:4169 (Nora), 1:4170 (Akcent), 1:4171 (Andalusia)

---

**Last Updated**: 2025-11-04
**Extracted From**: Figma Design File (pbfBbexsMbbDtZStbolrzP)
