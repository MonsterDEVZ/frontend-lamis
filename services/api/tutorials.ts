/**
 * Tutorials API Service
 * Сервис для работы с API видео-туториалов
 */

export interface Video {
  id: number | string;
  title: string;
  videoId: string;
}

export interface TutorialCategory {
  pageTitle: string;
  pageBannerUrl: string;
  videos: Video[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Получить туториалы по категории
 * @param categorySlug - slug категории (например: 'furniture-installation')
 * @returns Данные категории с видео
 * 
 * Ожидаемая структура ответа API:
 * {
 *   "pageTitle": "Установка мебели",
 *   "pageBannerUrl": "https://example.com/images/furniture-banner.jpg",
 *   "videos": [
 *     { "id": 1, "title": "Как собрать шкаф", "videoId": "abc123def45" },
 *     { "id": 2, "title": "Крепление полок", "videoId": "ghi678jkl90" }
 *   ]
 * }
 */
export async function getTutorialsByCategory(categorySlug: string): Promise<TutorialCategory> {
  const response = await fetch(`${API_BASE_URL}/tutorials/${categorySlug}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tutorials: ${response.statusText}`);
  }

  const data: TutorialCategory = await response.json();
  return data;
}
