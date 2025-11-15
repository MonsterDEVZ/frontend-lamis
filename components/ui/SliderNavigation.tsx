/**
 * @file SliderNavigation.tsx
 * @description A reusable component for Swiper.js navigation, including pagination, progress bar, and navigation arrows.
 *
 * @component SliderNavigation
 *
 * @prop {number} totalSlides - The total number of slides.
 * @prop {number} currentSlide - The current active slide number (1-based).
 * @prop {() => void} onPrev - Function to call when the previous button is clicked.
 * @prop {() => void} onNext - Function to call when the next button is clicked.
 * @prop {boolean} [isBeginning] - Optional. Whether the swiper is at the beginning. Disables the prev button.
 * @prop {boolean} [isEnd] - Optional. Whether the swiper is at the end. Disables the next button for non-looping sliders.
 * @prop {number} [progress] - Optional. The progress of the autoplay timer (0-100).
 * @prop {'light' | 'dark'} [variant='dark'] - The color variant of the component.
 * @prop {string} [className] - Optional additional class names.
 *
 * @example
 * <SliderNavigation
 *   totalSlides={5}
 *   currentSlide={2}
 *   onPrev={() => swiper.slidePrev()}
 *   onNext={() => swiper.slideNext()}
 *   isBeginning={swiper.isBeginning}
 *   isEnd={swiper.isEnd}
 *   progress={autoplayProgress}
 *   variant="light"
 * />
 */
'use client';
import type { FC } from 'react';
import { cn } from '@/styles';

const Arrow: FC<{ direction: 'left' | 'right'; disabled?: boolean }> = ({
  direction,
  disabled,
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transform ${direction !== 'left' ? 'rotate-180' : ''}`}
  >
    <path
      d="M16 9H3.83L9.42 14.59L8 16L9.53674e-07 8L8 0L9.41 1.41L3.83 7H16L16 9Z"
      fill="currentColor"
      className={cn('transition-opacity duration-300', { 'opacity-30': disabled })}
    />
  </svg>
);

interface SliderNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  isBeginning?: boolean;
  isEnd?: boolean;
  progress?: number;
  variant?: 'light' | 'dark';
  className?: string;
}

export const SliderNavigation: FC<SliderNavigationProps> = ({
  totalSlides,
  currentSlide,
  onPrev,
  onNext,
  isBeginning = false,
  isEnd = false,
  progress = 0,
  variant = 'dark',
  className,
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#505357]';
  const totalColor = variant === 'light' ? 'text-white' : 'text-[#505357]';
  const progressBg = variant === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(29, 29, 29, 0.15)';
  const progressFill = 'var(--color-green-100)';

  return (
    <div className={cn('flex items-center gap-6', className)}>
      {/* Counter and Progress Bar */}
      <div className={cn('flex items-center gap-2 text-sm', textColor)}>
        <span className="font-medium">{String(currentSlide).padStart(2, '0')}</span>

        <div
          className="w-[120px] lg:w-24 h-0.5 rounded-full relative overflow-hidden"
          style={{ backgroundColor: progressBg }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: progressFill,
         
            }}
          />
        </div>

        <span className={totalColor}>{String(totalSlides).padStart(2, '0')}</span>
      </div>

      {/* Navigation Arrows */}
      <div className={cn('hidden lg:flex items-center gap-4', textColor)}>
        <button
          onClick={onPrev}
          className="w-6 h-6 flex items-center justify-center group disabled:cursor-not-allowed transition-opacity duration-300 hover:opacity-70"
          disabled={isBeginning}
          aria-label="Previous slide"
        >
          <Arrow direction="left" disabled={isBeginning} />
        </button>
        <button
          onClick={onNext}
          className="w-6 h-6 flex items-center justify-center group disabled:cursor-not-allowed transition-opacity duration-300 hover:opacity-70"
          disabled={isEnd}
          aria-label="Next slide"
        >
          <Arrow direction="right" disabled={isEnd} />
        </button>
      </div>
    </div>
  );
};

export default SliderNavigation;
