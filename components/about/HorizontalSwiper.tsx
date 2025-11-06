'use client';
import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

const HorizontalSwiper: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto">
        <Swiper
          ref={swiperRef}
          modules={[Mousewheel]}
          spaceBetween={30}
          slidesPerView={2.5}
          mousewheel={{
            forceToAxis: true,
          }}
          className="!pb-12"
        >
          <SwiperSlide>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-4xl font-bold mb-4">Дизайн,<br/> неподвластный <br/>времени</h3>
              <p className="text-gray-600">
                Наши коллекции создаются в сотрудничестве с ведущими европейскими дизайнерами. Мы предлагаем стильные и функциональные решения для ванной комнаты, которые будут актуальны долгие годы.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white rounded-lg">
              <Image src="/collections/akcent.png" alt="Akcent Collection" width={400} height={400} className="w-full h-auto rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-2xl font-bold">Akcent</h3>
                <p className="text-gray-600">Минимализм и комфорт</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white rounded-lg">
              <Image src="/collections/andalusia.png" alt="Andalusia Collection" width={400} height={400} className="w-full h-auto rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-2xl font-bold">Andalusia</h3>
                <p className="text-gray-600">Классика и изящество</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white rounded-lg">
              <Image src="/collections/lamis.png" alt="Lamis Collection" width={400} height={400} className="w-full h-auto rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-2xl font-bold">Lamis</h3>
                <p className="text-gray-600">Современный взгляд</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white rounded-lg">
              <Image src="/collections/nora.png" alt="Nora Collection" width={400} height={400} className="w-full h-auto rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-2xl font-bold">Nora</h3>
                <p className="text-gray-600">Элегантность и простота</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-white rounded-lg">
              <Image src="/collections/Item_14168.png" alt="Item 14168" width={400} height={400} className="w-full h-auto rounded-t-lg" />
              <div className="p-6">
                <h3 className="text-2xl font-bold">Future</h3>
                <p className="text-gray-600">Дизайн будущего</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default HorizontalSwiper;
