'use client';

import Image from 'next/image';

const bleskHeaters = [
  {
    id: 1,
    name: 'Искусство Контраста',
    image: '/blesk_1.webp',
    alt: 'Искусство Контраста',
  },
  {
    id: 2,
    name: 'Инновации для Современной Жизни',
    image: '/blesk_2.webp',
    alt: 'Инновации для Современной Жизни',
  },
  {
    id: 3,
    name: 'Энергия Природы, Умный Комфорт',
    image: '/blesk_3.webp',
    alt: 'Энергия Природы, Умный Комфорт',
  },
  {
    id: 4,
    name: 'Гармония Технологий и Природы',
    image: '/blesk_4.webp',
    alt: 'Гармония Технологий и Природы',
  },
];

export default function BleskWaterHeatersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="wrapper_centering px-6 lg:px-12">
        {/* Section Title */}
        <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 mb-12">
          Водонагреватели <br /> Blesk
        </h2>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {bleskHeaters.map((heater) => (
            <div
              key={heater.id}
              className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <Image
                src={heater.image}
                alt={heater.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Brand Label */}
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-semibold text-2xl">{heater.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        {/*<div className="flex justify-center">*/}
        {/*  <button className="bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-colors duration-300">*/}
        {/*    Посмотреть еще*/}
        {/*  </button>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
