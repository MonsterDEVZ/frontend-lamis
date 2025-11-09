'use client';

import { type FC, useState, useCallback } from 'react';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import CatalogCard from './CatalogCard';

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';

interface Product {
  id?: string | number;
  category: string;
  name: string;
  price: number;
  status?: string;
  image: string;
  hoverImage: string;
  colors?: string[];
  slug?: string;
  collection?: string;
}

interface ProductSliderProps {
  title: string;
  products: Product[];
  slidesPerView?: number;
  autoplayDelay?: number;
}

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

const ProductSlider: FC<ProductSliderProps> = ({
  title,
  products,
  slidesPerView = 4,
  autoplayDelay = 5000,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);

  const updateSwiperState = useCallback(
    (swiper: SwiperType) => {
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
    },
    [slidesPerView]
  );

  const handleNext = () => {
    if (isEnd) {
      swiperInstance?.slideTo(0);
    } else {
      swiperInstance?.slideNext();
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-[44px] font-bold text-gray-900">{title}</h2>

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

            <span className="text-gray-400">
              {String(pagination.total).padStart(2, '0')}
            </span>
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
        breakpoints={{
          456: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id || index}>
            <CatalogCard
              {...product}
              collection={product.collection}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
