# SCSS Структура

## Файлы

### `variables.scss`
Глобальные переменные для цветов, размеров, отступов и т.д.

**Использование:**
```scss
.my-component {
  color: $color-primary;
  font-size: $font-size-base;
  padding: $spacing-md;
}
```

### `mixins.scss`
Переиспользуемые SCSS миксины для общих стилей.

**Примеры использования:**

```scss
// Контейнер
.container {
  @include container;
}

// Flex between
.header {
  @include flex-between;
}

// Кнопка
.button {
  @include button-primary;
}

// Responsive
.component {
  @include mobile {
    font-size: 14px;
  }

  @include desktop {
    font-size: 16px;
  }
}
```

### `components/*.scss`
Стили для отдельных компонентов.

## Как использовать

1. Импортируйте переменные и миксины в начале вашего SCSS файла:
```scss
@import '../variables';
@import '../mixins';
```

2. Используйте переменные и миксины в ваших стилях:
```scss
.my-component {
  @include container;
  background-color: $color-black;
  padding: $spacing-lg;
}
```

## Преимущества

- ✅ Централизованное управление цветами и размерами
- ✅ Переиспользуемые миксины
- ✅ Легко поддерживать консистентность дизайна
- ✅ Удобная работа с responsive дизайном
- ✅ Меньше дублирования кода
