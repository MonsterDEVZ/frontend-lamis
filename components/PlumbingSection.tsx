'use client';

import { type FC, useState, useMemo, useCallback, useEffect } from 'react';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import CatalogCard from './ui/CatalogCard';
import { productsData } from '@/data/products';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';

const subFilters = ['Все', 'Раковины', 'Унитазы', 'Ванны', 'Смесители'];

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
  const [activeFilter, setActiveFilter] = useState('caizer');
  const [activeSubFilter, setActiveSubFilter] = useState('Все');
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);

  const filteredProducts = useMemo(() => {
    const categoryProducts = productsData[activeFilter] || [];

    const subFilteredProducts =
      activeFilter === 'caizer' && activeSubFilter !== 'Все'
        ? categoryProducts.filter((product) => {
            if (activeSubFilter === 'Раковины') {
              return product.name.toLowerCase().includes('раковин');
            }
            if (activeSubFilter === 'Унитазы') {
              return product.name.toLowerCase().includes('унитаз');
            }
            if (activeSubFilter === 'Ванны') {
              return product.name.toLowerCase().includes('ванн');
            }
            if (activeSubFilter === 'Смесители') {
              return product.name.toLowerCase().includes('смеситель');
            }
            return true;
          })
        : categoryProducts;

    return subFilteredProducts.map((product) => {
      const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);

      // Определяем коллекцию на основе категории
      let collectionName = 'Lamis';
      if (activeFilter === 'caizer') {
        collectionName = 'Caizer';
      } else if (activeFilter === 'blesk') {
        collectionName = 'Blesk';
      }

      return {
        id: product.id,
        category: product.category,
        name: product.name,
        price: priceNumber,
        status: product.isNew ? 'Новинка' : undefined,
        image: product.image,
        hoverImage: product.images?.[1] || product.image,
        slug: product.slug,
        collection: collectionName,
      };
    });
  }, [activeFilter, activeSubFilter]);

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
    <div className="container w-full">
      <div className="pl-3 md:flex md:justify-between md:items-end">
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

      {/*<div className="flex flex-wrap items-center gap-2 mb-8 mt-10">*/}
      {/*  {tabs.map((tab) => (*/}
      {/*    <button*/}
      {/*      key={tab.value}*/}
      {/*      onClick={() => setActiveFilter(tab.value)}*/}
      {/*      className={`px-4 py-1 text-sm rounded-full border border-black transition-colors duration-200 cursor-pointer ${*/}
      {/*        activeFilter === tab.value ? 'bg-black text-white' : 'bg-white text-black'*/}
      {/*      }`}*/}
      {/*    >*/}
      {/*      {tab.label}*/}
      {/*    </button>*/}
      {/*  ))}*/}
      {/*</div>*/}

      {activeFilter === 'caizer' && (
        <div className="flex flex-wrap items-center gap-2 mb-8 mt-4">
          {subFilters.map((subFilter) => (
            <button
              key={subFilter}
              onClick={() => setActiveSubFilter(subFilter)}
              className={`px-4 py-1 text-sm rounded-full border border-black transition-colors duration-200 cursor-pointer ${
                activeSubFilter === subFilter ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {subFilter}
            </button>
          ))}
        </div>
      )}

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
