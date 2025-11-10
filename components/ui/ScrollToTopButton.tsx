// Путь: components/ScrollToTopButton.tsx

'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  // <-- Адаптивность: Добавляем состояние для определения размера экрана
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // <-- Адаптивность: Проверяем размер экрана при загрузке и изменении
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          // <-- Адаптивность: Стили для мобильных - базовые, для десктопа - с префиксом lg:
          className="fixed bottom-4 right-4 z-40 w-9 h-9 rounded-full bg-green-100 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-all lg:w-[50px] lg:h-[50px] lg:bottom-5 lg:right-5"
          aria-label="Наверх"
        >
          {/*// <-- Адаптивность: Меняем размер иконки в зависимости от экрана */}
          <ArrowUp size={isMobile ? 22 : 30} />
        </button>
      )}
    </>
  );
}