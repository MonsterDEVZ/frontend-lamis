'use client';

import { type FC, useState, useMemo, useCallback, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import CatalogCard from './ui/CatalogCard';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';

// Example Usage
// prettier-ignore
const sampleProducts = [
  // Сантехника Caizer
  { category: "Caizer", name: "Унитаз-компакт Caizer PRO", price: 14490, status: "Новинка", image: "/plumbing_section/caizer/3012.png", hoverImage: "/plumbing_section/caizer/3012 улучшенный.jpeg" },
  { category: "Caizer", name: "Подвесной унитаз Caizer Wall", price: 19990, image: "/plumbing_section/caizer/3014.png", hoverImage: "/plumbing_section/caizer/3014 улучшенный.jpeg" },
  { category: "Caizer", name: "Раковина встраиваемая Caizer Drop", price: 7800, image: "/plumbing_section/caizer/3016.png", hoverImage: "/plumbing_section/caizer/3016 улучшенный.jpeg" },
  { category: "Caizer", name: "Смеситель для раковины Caizer Flow", price: 6500, status: "Хит", image: "/plumbing_section/caizer/3030.png", hoverImage: "/plumbing_section/caizer/3030 улучшенный.jpeg" },
  { category: "Caizer", name: "Душевая система Caizer Rain", price: 25900, image: "/plumbing_section/caizer/3037.png", hoverImage: "/plumbing_section/caizer/3037 улучшенный.jpeg" },
  { category: "Caizer", name: "Ванна акриловая Caizer Wave", price: 32000, image: "/plumbing_section/caizer/3038.png", hoverImage: "/plumbing_section/caizer/3038 улучшенный.jpeg" },

  // Умные водонагреватели
  { category: "Умные водонагреватели", name: "Водонагреватель Smart 50л", price: 18500, status: "Новинка", image: "/plumbing_section/caizer/3012.png", hoverImage: "/plumbing_section/caizer/3012 улучшенный.jpeg" },
  { category: "Умные водонагреватели", name: "Проточный водонагреватель Smart Flow", price: 12300, image: "/plumbing_section/caizer/3014.png", hoverImage: "/plumbing_section/caizer/3014 улучшенный.jpeg" },
  { category: "Умные водонагреватели", name: "Водонагреватель Smart 80л Wi-Fi", price: 24000, status: "Хит", image: "/plumbing_section/caizer/3016.png", hoverImage: "/plumbing_section/caizer/3016 улучшенный.jpeg" },
  { category: "Умные водонагреватели", name: "Компактный водонагреватель 15л", price: 9800, image: "/plumbing_section/caizer/3030.png", hoverImage: "/plumbing_section/caizer/3030 улучшенный.jpeg" },

  // Зеркала Lamis
  { category: "Зеркала Lamis", name: "Зеркало Lamis с LED-подсветкой 80см", price: 8900, status: "Хит", image: "/plumbing_section/caizer/3012.png", hoverImage: "/plumbing_section/caizer/3012 улучшенный.jpeg" },
  { category: "Зеркала Lamis", name: "Зеркальный шкаф Lamis 60см", price: 13400, image: "/plumbing_section/caizer/3014.png", hoverImage: "/plumbing_section/caizer/3014 улучшенный.jpeg" },
  { category: "Зеркала Lamis", name: "Круглое зеркало Lamis 70см", price: 9900, status: "Новинка", image: "/plumbing_section/caizer/3016.png", hoverImage: "/plumbing_section/caizer/3016 улучшенный.jpeg" },
  { category: "Зеркала Lamis", name: "Зеркало Lamis с полкой и подсветкой", price: 11500, image: "/plumbing_section/caizer/3030.png", hoverImage: "/plumbing_section/caizer/3030 улучшенный.jpeg" },
  { category: "Зеркала Lamis", name: "Зеркало косметическое Lamis x5", price: 4500, image: "/plumbing_section/caizer/3038.png", hoverImage: "/plumbing_section/caizer/3037 улучшенный.jpeg" },

  // Умные водонагреватели Blesk
  { category: "Умные водонагреватели Blesk", name: "Водонагреватель Blesk 100л Smart", price: 29900, status: "Новинка", image: "/plumbing_section/caizer/3012.png", hoverImage: "/plumbing_section/caizer/3012 улучшенный.jpeg" },
  { category: "Умные водонагреватели Blesk", name: "Blesk Flat 80л с сухим ТЭНом", price: 26500, image: "/plumbing_section/caizer/3014.png", hoverImage: "/plumbing_section/caizer/3014 улучшенный.jpeg" },
  { category: "Умные водонагреватели Blesk", name: "Blesk Slim 30л", price: 15000, image: "/plumbing_section/caizer/3016.png", hoverImage: "/plumbing_section/caizer/3016 улучшенный.jpeg" },
  { category: "Умные водонагреватели Blesk", name: "Blesk Slim 60л", price: 20000, image: "/plumbing_section/caizer/3030.png", hoverImage: "/plumbing_section/caizer/3030 улучшенный.jpeg" },

  // Мебель для ванн Lamis
  { category: "lamis_furniture", name: "Тумба под раковину Lamis 75см", price: 18900, status: "Новинка", image: "/plumbing_section/caizer/3012.png", hoverImage: "/plumbing_section/caizer/3012 улучшенный.jpeg" },
  { category: "lamis_furniture", name: "Шкаф-пенал Lamis Style", price: 22500, image: "/plumbing_section/caizer/3014.png", hoverImage: "/plumbing_section/caizer/3014 улучшенный.jpeg" },
  { category: "lamis_furniture", name: "Подвесная тумба Lamis Air 60см", price: 16200, status: "Хит", image: "/plumbing_section/caizer/3016.png", hoverImage: "/plumbing_section/caizer/3016 улучшенный.jpeg" },
  { category: "lamis_furniture", name: "Комплект мебели Lamis (тумба+зеркало)", price: 29800, image: "/plumbing_section/caizer/3030.png", hoverImage: "/plumbing_section/caizer/3030 улучшенный.jpeg" },
  { category: "lamis_furniture", name: "Полка для ванной Lamis Glass", price: 5500, image: "/plumbing_section/caizer/3038.png", hoverImage: "/plumbing_section/caizer/3037 улучшенный.jpeg" },
];

const tabs = [
  { label: 'Умные водонагреватели', value: 'Умные водонагреватели' },
  { label: 'Зеркала Lamis', value: 'Зеркала Lamis' },
  { label: 'Умные водонагреватели Blesk', value: 'Умные водонагреватели Blesk' },
  { label: 'Сантехника Caizer', value: 'Caizer' },
  { label: 'Мебель для ванн Lamis', value: 'lamis_furniture' },
];

const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transform group-disabled:[&_fill]:opacity-15 ${
      direction !== 'left' ? 'rotate-180' : ''
    }`}
  >
    <path
      d="M16 9H3.83L9.42 14.59L8 16L9.53674e-07 8L8 0L9.41 1.41L3.83 7H16L16 9Z"
      fill="#1D1D1D"
    />
  </svg>
);

const PlumbingSection: FC = () => {
  const [activeFilter, setActiveFilter] = useState('Умные водонагреватели');
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  const slidesPerView = 4;
  const autoplayDelay = 5000;

  const updateSwiperState = useCallback((swiper: SwiperType) => {
    const totalPages = Math.ceil(swiper.slides.length / slidesPerView);
    let currentPage = Math.floor(swiper.activeIndex / slidesPerView) + 1;

    if (swiper.isEnd) {
      currentPage = totalPages;
    }

    setPagination({
      current: currentPage,
      total: totalPages > 0 ? totalPages : 1,
    });
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const handleNext = () => {
    if (isEnd) {
      swiperInstance?.slideTo(0);
    } else {
      swiperInstance?.slideNext();
    }
  };

  useEffect(() => {
    if (!swiperInstance) return;

    // Force-reset UI state immediately
    setPagination({ current: 1, total: 1 });
    setProgress(0);

    // Update swiper and reset its position
    swiperInstance.update();
    swiperInstance.slideTo(0);

    // Recalculate correct state and apply it
    const totalPages = Math.ceil(filteredProducts.length / slidesPerView);
    setPagination({ current: 1, total: totalPages > 0 ? totalPages : 1 });
    setIsBeginning(true);
    setIsEnd(totalPages <= 1);

    // Handle autoplay logic
    if (totalPages <= 1) {
      swiperInstance.autoplay.stop();
      setProgress(100);
    } else {
      if (swiperInstance.autoplay) {
        swiperInstance.autoplay.start();
      }
    }
  }, [activeFilter, swiperInstance]);

  return (
    <div className="max-w-[1250px] w-full mx-auto">
      <div className="flex justify-between items-end">
        <h2 className="text-[44px]">Сантехника CAIZER</h2>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-[#505357]">
            <span>{String(pagination.current).padStart(2, '0')}</span>

            <div
              className="w-24 h-0.5 rounded-full"
              style={{ backgroundColor: 'rgba(29, 29, 29, 0.15)' }}
            >
              <div
                className="h-full rounded-full bg-[#009B3E]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <span className="text-gray-400">{String(pagination.total).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="w-6 h-6 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isBeginning}
            >
              <Arrow direction="left" />
            </button>
            <button
              onClick={handleNext}
              className="w-6 h-6 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-8 mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-4 py-1 text-sm rounded-full border border-black transition-colors duration-200 cursor-pointer ${
              activeFilter === tab.value ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={slidesPerView}
        className={
          !isSwiperInitialized ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'
        }
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onAutoplayTimeLeft={(s, time, percentage) => {
          setProgress((1 - percentage) * 100);
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          updateSwiperState(swiper);
          setIsSwiperInitialized(true);
        }}
        onTransitionEnd={updateSwiperState}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.name}>
            <CatalogCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PlumbingSection;
