'use client';

import Image from 'next/image';
import { SlideshowLightbox } from 'lightbox.js-react';
import { useState } from 'react';

const waterHeaters = [
  {
    id: 1,
    name: 'Lamis',
    image: '/images/water-heaters/1.png',
    alt: 'Мебель для ванны LAMIS - коллекция Lamis',
    gallery: [
      '/catalog/Lamis/Lamis/LAMIS-Grey-900x450x700-2017-2024.2.22-3DDD3DSKY.png',
      '/catalog/Lamis/Lamis/LAMIS-Black-1000x450x700-2017-2024.2.21-3DDD3DSKY.png',
      '/catalog/Lamis/Lamis/LAMIS-White-800x450x700-2017-2024.2.21-3DDD3DSKY.png',
      '/catalog/Lamis/Lamis/LAMIS-Black-600x450x700-2017-2024.5.17-3DDD3DSKY.png',
    ],
  },
  {
    id: 2,
    name: 'Nora',
    image: '/images/water-heaters/2.png',
    alt: 'Мебель для ванны LAMIS - коллекция Nora',
    gallery: [
      '/catalog/Lamis/Accent/AKTSENT-Grey-600x450x600-2017-2024.2.22-3DDD3DSKY.png',
      '/catalog/Lamis/Accent/1/AKTSENT-Black-800x450x800-2017-2024.2.22-3DDD3DSKY.png',
      '/catalog/Lamis/Accent/AKTSENT-White-1000x450x800-2017-2024.2.23-3DDD3DSKY.png',
    ],
  },
  {
    id: 3,
    name: 'Akcent',
    image: '/images/water-heaters/3.png',
    alt: 'Мебель для ванны LAMIS - коллекция Akcent',
    gallery: [
      '/catalog/Lamis/Accent/1/AKTSENT-Black-800x450x800-2017-2024.2.22-3DDD3DSKY.png',
      '/catalog/Lamis/Accent/AKTSENT-Grey-600x450x600-2017-2024.2.22-3DDD3DSKY.png',
      '/catalog/Lamis/Accent/1/AKTSENT-White-1000x450x800-2017-2024.2.23-3DDD3DSKY.png',
      '/catalog/Lamis/Accent/2/example_for_2_image.jpg',
    ],
  },
  {
    id: 4,
    name: 'Andalusia',
    image: '/images/water-heaters/4.png',
    alt: 'Мебель для ванны LAMIS - коллекция Andalusia',
    gallery: [
      '/catalog/Lamis/Andalusia/ANDALUSIA-1000x600x450-2017-2024.5.4-3DDD3DSKY.png',
      '/catalog/Lamis/Andalusia/ANDALUSIA-pencil-case-1550x300x350-2017-2024.5.4-3DDD3DSKY.png',
      '/catalog/Lamis/Andalusia/example_for_all.jpg',
    ],
  },
];

export default function WaterHeatersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="wrapper_centering px-6 lg:px-12">
        {/* Section Title */}
        <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 mb-12">
          Коллекции мебели <br /> для ванн LAMIS
        </h2>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {waterHeaters.map((heater) => (
            <SlideshowLightbox
              key={heater.id}
              theme="lightbox"
              lightboxIdentifier={`furniture-gallery-${heater.id}`}
              framework="next"
              images={heater.gallery.map((img) => ({ src: img, alt: `${heater.name} коллекция` }))}
              showThumbnails={true}
              licenseKey="F64F-4934-51B8-1B2F"
            >
              <div
                className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer"
                data-lightboxjs={`furniture-gallery-${heater.id}`}
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
                  <span className="text-white font-medium text-2xl">{heater.name}</span>
                </div>
              </div>
            </SlideshowLightbox>
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
