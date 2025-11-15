// src/data/mock-tutorials.ts

// Определяем типы, чтобы TypeScript был доволен
interface Video {
  id: number | string;
  title: string;
  videoId: string;
}

interface TutorialCategory {
  pageTitle: string;
  pageBannerUrl: string;
  videos: Video[];
}

// Создаем ОБНОВЛЕННЫЙ объект с нашими временными данными
export const MOCK_TUTORIALS_DATA: Record<string, TutorialCategory> = {
  // 1. Установка мебели (10 видео)
  'furniture-installation': {
    pageTitle: 'Установка мебели',
    pageBannerUrl:
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    videos: [
      { id: 1, title: 'Сборка шкафа-купе', videoId: 'dQw4w9WgXcQ' },
      { id: 2, title: 'Крепление навесных полок', videoId: 'L_jWHffIx5E' },
      { id: 3, title: 'Монтаж кухонного гарнитура', videoId: 'fNFzfwLM72c' },
      { id: 4, title: 'Сборка комода: пошаговая инструкция', videoId: '3tmd-ClpJxA' },
      { id: 5, title: 'Установка мебельных петель', videoId: 'o_asQ1xO4pI' },
      { id: 6, title: 'Регулировка фасадов', videoId: '6-x_y8n-1s' },
      { id: 7, title: 'Монтаж встроенной техники', videoId: 'dQw4w9WgXcQ' },
      { id: 8, title: 'Установка столешницы', videoId: 'L_jWHffIx5E' },
      { id: 9, title: 'Сборка кровати с подъемным механизмом', videoId: 'fNFzfwLM72c' },
      { id: 10, title: 'Советы по уходу за мебелью', videoId: '3tmd-ClpJxA' },
    ],
  },
  // 2. Установка раковины (10 видео)
  'sink-installation': {
    pageTitle: 'Установка раковины',
    pageBannerUrl:
      'https://images.unsplash.com/photo-1601121141499-17ae80afc03a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    videos: [
      { id: 11, title: 'Монтаж подвесной раковины', videoId: 'fNFzfwLM72c' },
      { id: 12, title: 'Установка сифона и гофры', videoId: '3tmd-ClpJxA' },
      { id: 13, title: 'Герметизация швов силиконом', videoId: 'o_asQ1xO4pI' },
      { id: 14, title: 'Установка накладной раковины на столешницу', videoId: '6-x_y8n-1s' },
      { id: 15, title: 'Подключение смесителя к раковине', videoId: 'dQw4w9WgXcQ' },
      { id: 16, title: 'Как избежать протечек', videoId: 'L_jWHffIx5E' },
      { id: 17, title: 'Установка раковины с пьедесталом', videoId: 'fNFzfwLM72c' },
      { id: 18, title: 'Выбор правильных инструментов', videoId: '3tmd-ClpJxA' },
      { id: 19, title: 'Демонтаж старой раковины', videoId: 'o_asQ1xO4pI' },
      { id: 20, title: 'Проверка системы на герметичность', videoId: '6-x_y8n-1s' },
    ],
  },
  // 3. Установка ванн (10 видео)
  'bath-installation': {
    pageTitle: 'Установка ванн',
    pageBannerUrl:
      'https://images.unsplash.com/photo-1586798271654-0471bb1b0803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    videos: [
      { id: 21, title: 'Монтаж акриловой ванны на каркас', videoId: 'o_asQ1xO4pI' },
      { id: 22, title: 'Установка и регулировка ножек', videoId: '6-x_y8n-1s' },
      { id: 23, title: 'Подключение системы слива-перелива', videoId: 'dQw4w9WgXcQ' },
      { id: 24, title: 'Установка чугунной ванны', videoId: 'L_jWHffIx5E' },
      { id: 25, title: 'Монтаж экрана под ванну', videoId: 'fNFzfwLM72c' },
      { id: 26, title: 'Гидроизоляция примыкания к стене', videoId: '3tmd-ClpJxA' },
      { id: 27, title: 'Установка стальной ванны', videoId: 'o_asQ1xO4pI' },
      { id: 28, title: 'Как правильно выставить уровень', videoId: '6-x_y8n-1s' },
      { id: 29, title: 'Врезка смесителя в борт ванны', videoId: 'dQw4w9WgXcQ' },
      { id: 30, title: 'Советы по эксплуатации', videoId: 'L_jWHffIx5E' },
    ],
  },
  // 4. Установка смесителей (НОВАЯ КАТЕГОРИЯ, 10 видео)
  'faucet-installation': {
    pageTitle: 'Установка смесителей',
    pageBannerUrl:
      'https://images.unsplash.com/photo-1616763484369-964a4b7a6733?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    videos: [
      { id: 31, title: 'Демонтаж старого смесителя', videoId: '3tmd-ClpJxA' },
      { id: 32, title: 'Установка смесителя на раковину', videoId: 'o_asQ1xO4pI' },
      { id: 33, title: 'Подключение гибкой подводки', videoId: '6-x_y8n-1s' },
      { id: 34, title: 'Монтаж настенного смесителя для ванны', videoId: 'dQw4w9WgXcQ' },
      { id: 35, title: 'Установка эксцентриков', videoId: 'L_jWHffIx5E' },
      { id: 36, title: 'Смеситель для кухни с выдвижным изливом', videoId: 'fNFzfwLM72c' },
      { id: 37, title: 'Замена картриджа в смесителе', videoId: '3tmd-ClpJxA' },
      { id: 38, title: 'Установка гигиенического душа', videoId: 'o_asQ1xO4pI' },
      { id: 39, title: 'Типичные ошибки при монтаже', videoId: '6-x_y8n-1s' },
      { id: 40, title: 'Первый запуск и проверка', videoId: 'dQw4w9WgXcQ' },
    ],
  },
  // 5. Установка водонагревателей (НОВАЯ КАТЕГОРИЯ, 10 видео)
  'water-heater-installation': {
    pageTitle: 'Установка водонагревателей',
    pageBannerUrl:
      'https://images.unsplash.com/photo-1621038943537-33129b797855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    videos: [
      { id: 41, title: 'Выбор места для монтажа', videoId: 'L_jWHffIx5E' },
      { id: 42, title: 'Крепление накопительного бойлера к стене', videoId: 'fNFzfwLM72c' },
      { id: 43, title: 'Подключение к системе водопровода', videoId: '3tmd-ClpJxA' },
      { id: 44, title: 'Установка группы безопасности', videoId: 'o_asQ1xO4pI' },
      { id: 45, title: 'Электрическое подключение и заземление', videoId: '6-x_y8n-1s' },
      { id: 46, title: 'Монтаж проточного водонагревателя', videoId: 'dQw4w9WgXcQ' },
      { id: 47, title: 'Заполнение системы водой и первый пуск', videoId: 'L_jWHffIx5E' },
      { id: 48, title: 'Чистка и замена анода', videoId: 'fNFzfwLM72c' },
      { id: 49, title: 'Как слить воду из бойлера', videoId: '3tmd-ClpJxA' },
      { id: 50, title: 'Настройка температуры и режима работы', videoId: 'o_asQ1xO4pI' },
    ],
  },
};
