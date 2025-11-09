'use client';
import { type FC, useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CatalogCard from './ui/CatalogCard';

const productsData = {
  caizer: [
    { 
      id: 'caizer-toilet-3016',
      name: 'Caizer 3016 Унитаз напольный',
      price: '24990',
      image: '/plumbing_section/caizer/3016.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-toilet-3016',
      images: [
        '/plumbing_section/caizer/3016.png',
        '/plumbing_section/caizer/3016 улучшенный.jpeg',
      ],
    },
    {
      id: 'caizer-3037',
      name: 'Caizer 3037 Смеситель для кухни',
      price: '13990',
      image: '/plumbing_section/caizer/3037.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-3037',
      images: [
        '/plumbing_section/caizer/3037.png',
        '/plumbing_section/caizer/3037 улучшенный.jpeg',
      ],
    },
    // Раковины
    {
      id: 'lamis-grey-900',
      name: 'Lamis Grey Set 900x450x700',
      price: '77990',
      image: '/catalog/Lamis/Lamis/LAMIS-Grey-900x450x700-2017-2024.2.22-3DDD3DSKY.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'lamis-grey-900',
      images: [
        '/catalog/Lamis/Lamis/LAMIS-Grey-900x450x700-2017-2024.2.22-3DDD3DSKY.png',
        '/catalog/Lamis/Lamis/for_example_1.jpg',
      ],
    },
    {
      id: 'eklips-1000-01',
      name: 'Eklips Set 1000x450x300 Model 01',
      price: '67990',
      image: '/catalog/Lamis/Eklips/EKLIPS-1000x450x300-01-2017-2024.5.3-3DDD3DSKY.png',
      category: 'Plumbing',
      isNew: false,
      slug: 'eklips-1000-01',
      images: [
        '/catalog/Lamis/Eklips/EKLIPS-1000x450x300-01-2017-2024.5.3-3DDD3DSKY.png',
        '/catalog/Lamis/Eklips/EKLIPS-1000x450x300-02-2017-2024.5.4-3DDD3DSKY.png',
      ],
    },
    {
      id: 'amsterdam-1000',
      name: 'Amsterdam Set 1000x600x450',
      price: '64990',
      image: '/catalog/Lamis/Amsterdam/AMSTERDAM-1000x600x450-2017-2024.5.17-3DDD3DSKY.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'amsterdam-1000',
      images: [
        '/catalog/Lamis/Amsterdam/AMSTERDAM-1000x600x450-2017-2024.5.17-3DDD3DSKY.png',
        '/catalog/Lamis/Amsterdam/AMSTERDAM-Grey-Pencil-case-1000x600x450-2017-2024.5.17-3DDD3DSKY.png',
      ],
    },
    {
      id: 'accent-grey-600',
      name: 'Accent Grey Set 600x450x600',
      price: '52990',
      image: '/catalog/Lamis/Accent/AKTSENT-Grey-600x450x600-2017-2024.2.22-3DDD3DSKY.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'accent-grey-600',
      images: [
        '/catalog/Lamis/Accent/AKTSENT-Grey-600x450x600-2017-2024.2.22-3DDD3DSKY.png',
        '/catalog/Lamis/Accent/2/example_for_2_image.jpg',
      ],
    },
    // Унитазы
    {
      id: 'caizer-toilet-01',
      name: 'Caizer Унитаз-компакт напольный',
      price: '14990',
      image: '/plumbing_section/caizer/3030.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-toilet-01',
      images: [
        '/plumbing_section/caizer/3030.png',
        '/plumbing_section/caizer/3030 улучшенный.jpeg',
      ],
    },
    {
      id: 'caizer-toilet-sink-01',
      name: 'Caizer Унитаз накладной 50см',
      price: '8990',
      image: '/plumbing_section/caizer/3038.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-toilet-sink-01',
      images: [
        '/plumbing_section/caizer/3038.png',
        '/plumbing_section/caizer/3038 улучшенный.jpeg',
      ],
    },
    {
      id: 'caizer-toilet-bath-01',
      name: 'Caizer Унитаз акриловый 170х70',
      price: '25990',
      image: '/plumbing_section/caizer/3014.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-toilet-bath-01',
      images: [
        '/plumbing_section/caizer/3014.png',
        '/plumbing_section/caizer/3014 улучшенный.jpeg',
      ],
    },
    {
      id: 'caizer-3016',
      name: 'Caizer 3016 Смеситель напольный',
      price: '24990',
      image: '/plumbing_section/caizer/3016.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-3016',
      images: [
        '/plumbing_section/caizer/3016.png',
        '/plumbing_section/caizer/3016 улучшенный.jpeg',
      ],
    },
    {
      id: 'caizer-toilet-3037',
      name: 'Caizer 3037 Унитаз для кухни',
      price: '13990',
      image: '/plumbing_section/caizer/3037.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-toilet-3037',
      images: [
        '/plumbing_section/caizer/3037.png',
        '/plumbing_section/caizer/3037 улучшенный.jpeg',
      ],
    },
    {
      id: 'caizer-bath-01',
      name: 'Caizer Ванна акриловая 170х70',
      price: '25990',
      image: '/plumbing_section/caizer/3014.png',
      category: 'Plumbing',
      isNew: true,
      slug: 'caizer-bath-01',
      images: [
        '/plumbing_section/caizer/3014.png',
        '/plumbing_section/caizer/3014 улучшенный.jpeg',
      ],
    },
    // {
    //   id: 'caizer-bath-02',
    //   name: 'Caizer Ванна стальная 150х75',
    //   price: '19990',
    //   image: '/plumbing_section/caizer/3014.png',
    //   category: 'Plumbing',
    //   isNew: false,
    //   slug: 'caizer-bath-02',
    //   images: [
    //     '/plumbing_section/caizer/3014.png',
    //     '/plumbing_section/caizer/3014 улучшенный.jpeg',
    //   ],
    // },
    // {
    //   id: 'caizer-bath-03',
    //   name: 'Caizer Ванна чугунная 180х80',
    //   price: '35990',
    //   image: '/plumbing_section/caizer/3014.png',
    //   category: 'Plumbing',
    //   isNew: false,
    //   slug: 'caizer-bath-03',
    //   images: [
    //     '/plumbing_section/caizer/3014.png',
    //     '/plumbing_section/caizer/3014 улучшенный.jpeg',
    //   ],
    // },
    // {
    //   id: 'caizer-bath-04',
    //   name: 'Caizer Ванна угловая акриловая',
    //   price: '28990',
    //   image: '/plumbing_section/caizer/3014.png',
    //   category: 'Plumbing',
    //   isNew: true,
    //   slug: 'caizer-bath-04',
    //   images: [
    //     '/plumbing_section/caizer/3014.png',
    //     '/plumbing_section/caizer/3014 улучшенный.jpeg',
    //   ],
    // },
  ],
};

// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';

const subFilters = ['Все', 'Раковины', 'Унитазы', 'Ванны', 'Смесители'];

import { SliderNavigation } from './ui/SliderNavigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const MemoizedSliderNavigation: FC<{
  swiper: SwiperType | null;
  totalSlides: number;
  currentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  isBeginning: boolean;
  isEnd: boolean;
  slidesPerView: number;
  autoplayDelay: number;
}> = ({
  swiper,
  totalSlides,
  currentSlide,
  onPrev,
  onNext,
  isBeginning,
  isEnd,
  slidesPerView,
  autoplayDelay,
}) => {
  const [progress, setProgress] = useState(0);
  const activeIndexRef = useRef(0); // Use ref for activeIndex

  useEffect(() => {
    if (!swiper) {
      setProgress(0);
      return;
    }

    const handleAutoplayTimeLeft = (s: SwiperType, time: number, percentage: number) => {
      const pageStartIndex = (currentSlide - 1) * slidesPerView;
      const slidesIntoPage = activeIndexRef.current - pageStartIndex;

      if (slidesIntoPage < 0) {
        setProgress(0);
        return;
      }

      const progressPerSlide = 100 / slidesPerView;
      const currentSlideProgress = (1 - percentage) * progressPerSlide;
      const totalPageProgress = slidesIntoPage * progressPerSlide + currentSlideProgress;

      setProgress(totalPageProgress);
    };

    const handleSlideChange = () => {
      activeIndexRef.current = swiper.activeIndex;
    };

    swiper.on('autoplayTimeLeft', handleAutoplayTimeLeft);
    swiper.on('slideChange', handleSlideChange);

    // Initial state setup
    activeIndexRef.current = swiper.activeIndex;
    setProgress(0);

    return () => {
      if (swiper.destroyed) return;
      swiper.off('autoplayTimeLeft', handleAutoplayTimeLeft);
      swiper.off('slideChange', handleSlideChange);
    };
  }, [swiper, currentSlide, slidesPerView, autoplayDelay]);

  return (
    <SliderNavigation
      totalSlides={totalSlides}
      currentSlide={currentSlide}
      onPrev={onPrev}
      onNext={onNext}
      isBeginning={isBeginning}
      isEnd={isEnd}
      progress={progress}
    />
  );
};

const autoplayDelay = 5000;

const PlumbingSection: FC = () => {
  const [activeSubFilter, setActiveSubFilter] = useState('Все');
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isSwiperInitialized, setIsSwiperInitialized] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px)');

  const currentSlidesPerView = useMemo(() => {
    if (isDesktop) {
      return 4;
    }
    if (isTablet) {
      return 3;
    }
    return 2;
  }, [isDesktop, isTablet]);

  const filteredProducts = useMemo(() => {
    const categoryProducts = productsData['caizer'] || [];

    const subFilteredProducts =
      activeSubFilter === 'Все'
        ? categoryProducts
        : categoryProducts.filter((product) => {
            if (activeSubFilter === 'Раковины') {
              return (
                product.name.toLowerCase().includes('раковин') ||
                product.id === 'lamis-grey-900' ||
                product.id === 'eklips-1000-01' ||
                product.id === 'amsterdam-1000' ||
                product.id === 'accent-grey-600'
              );
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
            return false; // Если activeSubFilter не 'Все' и не соответствует ни одному из фильтров, возвращаем false
          });

    return subFilteredProducts.map((product) => {
      const priceNumber = parseInt(product.price, 10);

      // Определяем коллекцию на основе категории
      const collectionName = 'Caizer';

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
  }, [activeSubFilter]);

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

  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    if (isEnd) {
      swiperInstance?.slideTo(0);
    } else {
      swiperInstance?.slideNext();
    }
  }, [isEnd, swiperInstance]);

  useEffect(() => {
    if (!swiperInstance) return;

    // Force-reset UI state immediately
    setPagination({ current: 1, total: 1 });

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
    } else {
      if (swiperInstance.autoplay) {
        swiperInstance.autoplay.start();
      }
    }
  }, [swiperInstance, filteredProducts]);

  return (
    <div className="wrapper_centering w-full">
      <div className="md:flex md:justify-between md:items-end">
        <h2 className="text-[32px] md:text-[44px] font-bold">Сантехника CAIZER</h2>

        {filteredProducts.length > currentSlidesPerView && (
          <MemoizedSliderNavigation
            swiper={swiperInstance}
            totalSlides={pagination.total}
            currentSlide={pagination.current}
            onPrev={handlePrev}
            onNext={handleNext}
            isBeginning={isBeginning}
            isEnd={isEnd}
            slidesPerView={currentSlidesPerView}
            autoplayDelay={autoplayDelay}
          />
        )}
      </div>

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
