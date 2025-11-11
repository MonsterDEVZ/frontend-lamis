'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CTAButton from './ui/CTAButton';
import SliderNavigation from './ui/SliderNavigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// @ts-ignore
import 'swiper/css';

const slides = [
  {
    id: 1,
    image:
      'https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/951aef2a-878c-43ae-fc29-ae05e5ef9900/full',
    title: 'Мебель для',
    subtitle: 'ванных LAMIS',
    description:
      'Изысканность, функциональность, дизайнерские модели. Водонепроницаемая итальянская краска Sirca, немецкая фурнитура Tallsen.',
  },
  {
    id: 2,
    image:
      'https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/ef0abf8c-40d2-4d04-7d85-184eaf0fc800/full',
    title: 'Санфарфор',
    subtitle: 'CAISER',
    description:
      'Премиальная сантехника из фарфора, камня и стали, созданная по немецкой технологии. Гарантия — 10 лет.',
  },
  {
    id: 3,
    image:
      'https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/ef0abf8c-40d2-4d04-7d85-184eaf0fc800/full',
    title: 'Смесители',
    subtitle: 'CAISER',
    description:
      'Это искусство комфорта на вашей кухне и в ванной. Латунь придаёт высокую прочность, долговечность и антибактериальные свойства. Картридж Sedal делает более одного миллиона циклов, защиту от налётов и экономию воды.',
  },
  {
    id: 4,
    image:
      'https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/ef0abf8c-40d2-4d04-7d85-184eaf0fc800/full',
    title: 'Инсталяции',
    subtitle: 'CAISER',
    description:
      'Скрытая элегантность вашего интерьера. Они дарят простор сниженный шум и экономию воды. Прочный металлический каркас, способным выдерживать большие нагрузки.',
  },
  {
    id: 5,
    image:
      'https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/691db7a2-0959-458f-1aa0-fa6f77b16e00/full',
    title: 'Водонагреватели',
    subtitle: '(электрические)',
    description:
      'Экономичные, долговечные, сенсорные водонагреватели с увеличенными магниевыми анодами. Гарантия — 10 лет.',
  },
  {
    id: 6,
    image:
      'https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/d42c3a2e-71fb-4818-3614-aa073bbf5d00/full',
    title: 'Дизайнерские и умные',
    subtitle: 'зеркала LAMIS',
    description:
      'Ваше отражение заслуживает идеального обрамления. Откройте мир эксклюзивного дизайна и дополнительных функций (3 вида подсветки холодный-тёплый-нейтральный), сенсорные датчики на движение, подогрев-антипар.',
  },
];

const autoplayDelay = 5000; // 5 seconds

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const handleAutoplayTimeLeft = (_s: SwiperType, _time: number, percentage: number) => {
      // Progress from 0 to 100% for the current slide
      const currentProgress = (1 - percentage) * 100;
      setProgress(currentProgress);
    };

    const handleSlideChange = () => {
      // Reset progress when slide changes
      setProgress(0);
    };

    swiper.on('autoplayTimeLeft', handleAutoplayTimeLeft);
    swiper.on('slideChange', handleSlideChange);

    return () => {
      if (swiper.destroyed) return;
      swiper.off('autoplayTimeLeft', handleAutoplayTimeLeft);
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiperRef.current, activeIndex]);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: isDesktop ? 'calc(100vh - 70px)' : 'calc(600px - 70px)',
        minHeight: '600px',
      }}
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
              <div className="wrapper_centering flex items-center justify-center lg:justify-start h-full w-full px-10">
                <div className="inline-flex flex-col items-center lg:items-start gap-8">
                  {/* Main Heading */}
                  <h1 className="text-white font-bold text-[40px] md:text-[56px] leading-12 md:leading-[1.2] tracking-[-0.02em] mb-0 text-center lg:text-left">
                    {slide.title}
                    <br />
                    {slide.subtitle}
                  </h1>

                  {/* Description */}
                  <p className="text-white text-base leading-[22px] opacity-90 max-w-[500px] mb-0 text-center lg:text-left">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <CTAButton
                    className="w-40 md:w-48 px-0!"
                    // onClick={() => handleSubButtonClick(actionButtons[1])}
                  >
                    Подробнее
                  </CTAButton>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slider Navigation */}
      <div className="absolute bottom-12 left-0 right-0 z-5 w-full">
        <div className="wrapper_centering w-full px-10">
          <div className="flex justify-center lg:justify-start">
            <SliderNavigation
              currentSlide={activeIndex + 1}
              totalSlides={slides.length}
              progress={progress}
              onPrev={() => swiperRef.current?.slidePrev()}
              onNext={() => swiperRef.current?.slideNext()}
              variant="light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
