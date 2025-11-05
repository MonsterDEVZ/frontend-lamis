'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CTAButton from './ui/CTAButton';

import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    image: '/images/hero/slide_1.png',
    title: 'Мебель для ванн',
    subtitle: 'LAMIS',
    description: 'Мы делаем лучшие достижения в мире сантехники доступными каждому. Техника создаётся в Италии и Германии — там, где рождаются стандарты дизайна, надёжности и комфорта.',
  },
  {
    id: 2,
    image: '/images/hero/slide_2.png',
    title: 'Водонагреватели',
    subtitle: 'BLESK',
    description: 'Надежные водонагреватели для вашего дома. Современные технологии и европейское качество по доступной цене.',
  },
  {
    id: 3,
    image: '/images/hero/slide_3.png',
    title: 'Сантехника',
    subtitle: 'CAISER',
    description: 'Премиальная сантехника для ванной комнаты. Инновационный дизайн и безупречное качество из Германии.',
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const autoplayDelay = 5000; // 5 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (autoplayDelay / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 110px)', minHeight: '600px' }}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          setProgress(0);
        }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
                quality={100}
                sizes="100vw"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center w-full">
              <div className="mx-auto flex items-center h-full max-w-[1250px] w-full px-10">
                <div className="inline-flex flex-col gap-8">
                  {/* Main Heading */}
                  <h1 className="text-white font-bold text-[56px] leading-[1.2] tracking-[-0.02em] mb-0">
                    {slide.title}<br />{slide.subtitle}
                  </h1>

                  {/* Description */}
                  <p className="text-white text-base leading-[1.6] opacity-90 max-w-[500px] mb-0">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <CTAButton className="w-48">
                    Подробнее
                  </CTAButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50 flex gap-4">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              swiperRef.current?.slideToLoop(index);
            }}
            className="relative w-24 h-1 bg-white/50 overflow-hidden cursor-pointer hover:bg-white/60 transition-colors"
            aria-label={`Go to slide ${index + 1}`}
          >
            {/* Progress bar */}
            <div
              className="absolute top-0 left-0 h-full bg-[#00D856] transition-all duration-100 ease-linear"
              style={{
                width: activeIndex === index ? `${progress}%` : '0%',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
