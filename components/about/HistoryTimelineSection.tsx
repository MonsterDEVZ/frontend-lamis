'use client';

import { useRef, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MousePointer2 } from 'lucide-react';

interface TimelinePoint {
  year: string;
  description: string;
  image?: string;
}

const timelineData: TimelinePoint[] = [
  {
    year: '2010',
    description:
      'Основание компании LAMIS. Начало производства мебели для ванных комнат с фокусом на доступность и качество.',
  },
  {
    year: '2012',
    description:
      'Расширение ассортимента. Добавлены смесители и аксессуары для ванной комнаты. Открытие первого официального шоу-рума.',
  },
  {
    year: '2015',
    description:
      'Запуск собственного производства керамических изделий. Получение международных сертификатов качества ISO 9001.',
  },
  {
    year: '2017',
    description:
      'Выход на рынок Центральной Азии. Открытие дистрибьюторской сети в 5 странах региона.',
  },
  {
    year: '2019',
    description:
      'Запуск линейки экологичных продуктов с использованием переработанных материалов. Внедрение технологий водосбережения.',
  },
  {
    year: '2021',
    description:
      'Запуск онлайн-платформы для B2B и B2C клиентов. Цифровизация всех бизнес-процессов компании.',
  },
  {
    year: '2023',
    description:
      'Открытие нового производственного комплекса площадью 15,000 м². Внедрение роботизированных линий производства.',
  },
  {
    year: '2025',
    description:
      'Достижение лидирующих позиций на рынке. Запуск новых коллекций премиум-сегмента и расширение экспорта.',
  },
];

export default function HistoryTimelineSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const timeline = scrollContainerRef.current;
    if (!timeline) return;

    const onWheel = (e: WheelEvent) => {
      // Only prevent default if we are in desktop view (flex-row)
      const parentElement = timeline.parentElement;
      if (parentElement && window.getComputedStyle(parentElement).flexDirection === 'row') {
        e.preventDefault();
        timeline.scrollLeft += e.deltaY;
      }
    };

    timeline.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      timeline.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <section className="max-w-[1250px] mx-auto py-16 px-4">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side - Static Content */}
        <div className="lg:w-1/3 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Наша история</h2>

          <p className="text-lg text-gray-700 leading-relaxed">
            С момента основания в 2010 году компания LAMIS прошла путь от небольшого производителя
            до одного из лидеров рынка сантехники и мебели для ванных комнат в Центральной Азии.
          </p>

          {/* Scroll Instruction - Desktop Only */}
          {isDesktop && (
            <div className="flex items-center gap-2 text-sm text-gray-500 pt-4">
              <MousePointer2 size={20} className="text-[#009B3E]" />
              <span>Прокрутите колесиком мыши для навигации по временной шкале</span>
            </div>
          )}
        </div>

        {/* Right Side - Scrolling Timeline */}
        <div className="lg:flex-1">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto lg:overflow-x-hidden lg:scrollbar-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          >
            <div className="flex gap-8 pb-4 min-w-max">
              {timelineData.map((point, index) => (
                <div key={point.year} className="relative flex flex-col items-start">
                  {/* Timeline Point */}
                  <div className="w-64 sm:w-80 flex-shrink-0 space-y-4">
                    {/* Image Placeholder */}
                    <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-6xl font-bold text-gray-400">{point.year}</span>
                    </div>

                    {/* Year */}
                    <h3 className="text-2xl font-bold text-gray-900">{point.year}</h3>

                    {/* Description */}
                    <p className="text-base text-gray-700 leading-relaxed">{point.description}</p>
                  </div>

                  {/* Dotted Line Connector */}
                  {index < timelineData.length - 1 && (
                    <div
                      className="absolute top-24 left-full w-8 h-0.5 bg-gradient-to-r from-[#009B3E] to-transparent"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(to right, #009B3E 0, #009B3E 8px, transparent 8px, transparent 16px)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Scroll Hint */}
          {!isDesktop && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
              <span>← Свайп для просмотра →</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
