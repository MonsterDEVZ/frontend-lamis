'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CTAButton from './ui/CTAButton';
import SliderNavigation from './ui/SliderNavigation';

import 'swiper/css';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const slides = [
  {
    id: 1,
    image: '/images/water-heaters/1.png',
    title: 'Мебель для',
    subtitle: 'ванн LAMIS',
    description:
      'Изысканность, функциональность,  дизайнерские модели. Водонепроницаемая итальянская краска Sirca, немецкая фурнитура Tallsen.',
  },
  {
    id: 2,
    image: '/images/hero/slide_2.png',
    title: 'Сантехника',
    subtitle: 'CAISER',
    description:
      'Премиальная сантехника из фарфора, камня, стали по немецкой технологии. Гарантия 10 лет.',
  },
  {
    id: 3,
    image: '/blesk_2.webp',
    title: 'Водонагреватели',
    subtitle: 'BLESK',
    description:
        'Экономичные, многолетние, сенсорные водонагреватели с увеличенными магниевыми анодами. Гарантия 10 лет.',
  },
  {
    id: 4,
    image: '/hero_4-image.jpg',
    title: 'Дизайнерского зеркала',
    subtitle: 'LAMIS',
    description:
      'Ваше отражение заслуживает идеального обрамления. Откройте мир эксклюзивного дизайна с нашими зеркалами. Создайте свой уникальный стиль.',
  },
];

const autoplayDelay = 5000; // 5 seconds

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: isDesktop ? 'calc(100vh - 70px)' : 'calc(600px - 70px)',
        minHeight: '600px',
      }}
      // style={{ height: isDesktop ? 'calc(100vh - 70px)' : 'calc(530px - 70px)', minHeight: '600px' }}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
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
              <div className="wrapper_centering flex items-center h-full w-full px-10">
                <div className="inline-flex flex-col items-center lg:items-start gap-8">
                  {/* Main Heading */}
                  <h1 className="text-white font-bold text-[56px] leading-[1.2] tracking-[-0.02em] mb-0 text-center lg:text-left">
                    {slide.title}
                    <br />
                    {slide.subtitle}
                  </h1>

                  {/* Description */}
                  <p className="text-white text-base leading-[1.6] opacity-90 max-w-[500px] mb-0 text-center lg:text-left">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <CTAButton className="w-48">Подробнее</CTAButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider Navigation */}
      <div className="absolute bottom-12 left-1/2 lg:left-[32%] -translate-x-1/2 z-5">
        <SliderNavigation
          currentSlide={activeIndex + 1}
          totalSlides={slides.length}
          autoplayDelay={autoplayDelay}
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
          variant="light"
        />
      </div>
    </section>
  );
}
