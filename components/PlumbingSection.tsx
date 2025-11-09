'use client';

import { type FC, useState, useMemo, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CatalogCard from './ui/CatalogCard';
import { productsData } from '@/data/products';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';

const subFilters = ['Все', 'Раковины', 'Унитазы', 'Ванны', 'Смесители'];

import { SliderNavigation } from './ui/SliderNavigation';

const autoplayDelay = 5000;

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

  const updateSwiperState = useCallback((swiper: SwiperType) => {
    const activeSlidesPerView = swiper.params.slidesPerView as number;
    const totalPages = Math.ceil(swiper.slides.length / activeSlidesPerView);
    let currentPage = Math.floor(swiper.activeIndex / activeSlidesPerView) + 1;

    if (swiper.isEnd) {
      currentPage = totalPages;
    }

    setPagination({ current: currentPage, total: totalPages > 0 ? totalPages : 1 });
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
    const activeSlidesPerView = swiperInstance.params.slidesPerView as number;
    const totalPages = Math.ceil(filteredProducts.length / activeSlidesPerView);
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
    <div className="wrapper_centering w-full">
      <div className="pl-3 md:flex md:justify-between md:items-end">
        <h2 className="text-[44px]">Сантехника CAIZER</h2>

        <SliderNavigation
          totalSlides={pagination.total}
          currentSlide={pagination.current}
          onPrev={() => swiperInstance?.slidePrev()}
          onNext={handleNext}
          isBeginning={isBeginning}
          isEnd={isEnd}
          progress={progress}
        />
      </div>

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
        breakpoints={{
          0: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
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
