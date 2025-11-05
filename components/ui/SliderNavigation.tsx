'use client';

import { type FC } from 'react';

interface SliderNavigationProps {
  currentSlide: number;
  totalSlides: number;
  progress?: number;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  variant?: 'dark' | 'light';
}

const Arrow: FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transform group-disabled:[&_path]:opacity-30 ${
      direction !== 'left' ? 'rotate-180' : ''
    }`}
  >
    <path
      d="M16 9H3.83L9.42 14.59L8 16L9.53674e-07 8L8 0L9.41 1.41L3.83 7H16L16 9Z"
      fill="currentColor"
      className="transition-opacity duration-300"
    />
  </svg>
);

export const SliderNavigation: FC<SliderNavigationProps> = ({
  currentSlide,
  totalSlides,
  progress = 0,
  onPrev,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
  variant = 'dark',
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#505357]';
  const progressBg = variant === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(29, 29, 29, 0.15)';
  const progressFill = variant === 'light' ? '#00D856' : '#009B3E';

  return (
    <div className="slider-switch-component flex items-center gap-6">
      {/* Counter and Progress Bar */}
      <div className={`flex items-center gap-2 text-sm ${textColor}`}>
        <span className="font-medium">{String(currentSlide).padStart(2, '0')}</span>

        <div
          className="w-24 h-0.5 rounded-full relative overflow-hidden"
          style={{ backgroundColor: progressBg }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: progressFill,
            }}
          />
        </div>

        <span className="opacity-40">{String(totalSlides).padStart(2, '0')}</span>
      </div>

      {/* Navigation Arrows */}
      <div className={`flex items-center gap-4 ${textColor}`}>
        <button
          onClick={onPrev}
          className="w-6 h-6 flex items-center justify-center group disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-300 hover:opacity-70"
          disabled={isPrevDisabled}
          aria-label="Previous slide"
        >
          <Arrow direction="left" />
        </button>
        <button
          onClick={onNext}
          className="w-6 h-6 flex items-center justify-center group disabled:opacity-30 disabled:cursor-not-allowed transition-opacity duration-300 hover:opacity-70"
          disabled={isNextDisabled}
          aria-label="Next slide"
        >
          <Arrow direction="right" />
        </button>
      </div>
    </div>
  );
};

export default SliderNavigation;
