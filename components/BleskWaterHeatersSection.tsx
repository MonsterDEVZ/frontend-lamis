'use client';
import Image from 'next/image';
import { SlideshowLightbox } from 'lightbox.js-react';

const waterHeaters = [
  {
    id: 1,
    name: 'До 25% экономии электроэнергии',
    image: '/blesk_1.webp',
    alt: 'До 25% экономии электроэнергии',
  },
  {
    id: 2,
    name: 'Нагрев воды всего за 29 минут',
    image: '/blesk_2.webp',
    alt: 'Нагрев воды всего за 29 минут',
  },
  {
    id: 3,
    name: '99,9% защита от бактерий',
    image: '/blesk_3.webp',
    alt: '99,9% защита от бактерий',
  },
  {
    id: 4,
    name: 'Многоступенчатая проверка качества по международным стандартам',
    image: '/blesk_4.webp',
    alt: 'Многоступенчатая проверка качества по международным стандартам',
  },
];

export default function BleskWaterHeatersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="wrapper_centering px-6 lg:px-12">
        {/* Section Title */}
        <h2 className="text-3xl md:text-[44px] font-bold text-gray-900 mb-12">
          Водонагреватели <br /> (электрические)
        </h2>

        {/* --- ИЗМЕНЕНИЕ: Убрали общий SlideshowLightbox отсюда --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {waterHeaters.map((heater) => (
            // --- ИЗМЕНЕНИЕ: Теперь SlideshowLightbox находится внутри .map() для каждой карточки ---
            <SlideshowLightbox
              key={heater.id}
              theme="lightbox"
              // Создаем уникальный идентификатор для каждой галереи
              lightboxIdentifier={`blesk-gallery-${heater.id}`}
              framework="next"
              // В галерею передаем массив из ОДНОЙ картинки, принадлежащей этой карточке
              images={[{ src: heater.image, alt: heater.alt }]}
              showThumbnails={true}
              licenseKey="F64F-4934-51B8-1B2F"
            >
              <div
                className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer"
                // Указываем data-атрибут с тем же уникальным идентификатором
                data-lightboxjs={`blesk-gallery-${heater.id}`}
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
            </SlideshowLightbox>
          ))}
        </div>
      </div>
    </section>
  );
}