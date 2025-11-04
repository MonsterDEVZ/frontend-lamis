/**
 * useSwiper Hook
 * Инкапсулирует всю логику управления Swiper
 *
 * @example
 * const { swiperInstance, currentSlide, totalSlides, handlePrev, handleNext, handleInit } = useSwiper();
 */

import { useState, useCallback, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';

interface UseSwiperReturn {
  swiperInstance: SwiperType | null;
  currentSlide: number;
  totalSlides: number;
  handlePrev: () => void;
  handleNext: () => void;
  handleInit: (swiper: SwiperType) => void;
  handleSlideChange: (swiper: SwiperType) => void;
  goToSlide: (index: number) => void;
}

export function useSwiper(): UseSwiperReturn {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  /**
   * Инициализация Swiper
   */
  const handleInit = useCallback((swiper: SwiperType) => {
    setSwiperInstance(swiper);
    setTotalSlides(swiper.slides.length);
  }, []);

  /**
   * Обработка смены слайда
   */
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setCurrentSlide(swiper.activeIndex);
  }, []);

  /**
   * Переход к предыдущему слайду
   */
  const handlePrev = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  }, [swiperInstance]);

  /**
   * Переход к следующему слайду
   */
  const handleNext = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  }, [swiperInstance]);

  /**
   * Переход к конкретному слайду
   */
  const goToSlide = useCallback(
    (index: number) => {
      if (swiperInstance) {
        swiperInstance.slideTo(index);
      }
    },
    [swiperInstance]
  );

  /**
   * Клавиатурная навигация
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!swiperInstance) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [swiperInstance, handlePrev, handleNext]);

  return {
    swiperInstance,
    currentSlide,
    totalSlides,
    handlePrev,
    handleNext,
    handleInit,
    handleSlideChange,
    goToSlide,
  };
}
