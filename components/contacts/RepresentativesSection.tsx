'use client';

import React, { useState } from 'react';
import YandexMapEmbed from './YandexMapEmbed';

interface CityData {
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
}

const RepresentativesSection: React.FC = () => {
  const cities: CityData[] = [
    {
      name: 'Манас',
      address: 'ул. Ленинская Слобода, 26, стр. 2',
      phone: '+7 (495) 120-30-40',
      mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A2f9e5d6f1c9b8a0d7e6f5a4b3c2d1e0f&amp;source=constructor',
    },
    {
      name: 'Бишкек',
      address: 'ул. Малышева, 51',
      phone: '+7 (343) 287-65-43',
      mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A3a0f6e7g2d0c9b1e8f7g6b5d4e3f2g1h&amp;source=constructor',
    },
    {
      name: 'Ош',
      address: 'ул. Кирова, 86',
      phone: '+7 (383) 310-20-30',
      mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A4b1g7f8h3e1d0c2f9g8h7c6e5f4g3h2i&amp;source=constructor',
    },
    {
      name: 'Баткен',
      address: 'пр. Буденновский, 93',
      phone: '+7 (863) 250-45-67',
      mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A5c2h8g9i4f2e1d3g0h9i8d7f6g5h4i3j&amp;source=constructor',
    },
    {
      name: 'Нарын',
      address: 'ул. Московское шоссе, 18',
      phone: '+7 (846) 270-80-90',
      mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A6d3i9h0j5g3f2e4h1i0j9e8g7h6i5j4k&amp;source=constructor',
    },
    {
      name: 'Ыссык-Кол',
      address: 'ул. Московское шоссе, 18',
      phone: '+7 (846) 270-80-90',
      mapUrl: 'https://yandex.ru/map-widget/v1/?um=constructor%3A6d3i9h0j5g3f2e4h1i0j9e8g7h6i5j4k&amp;source=constructor',
    },
  ];

  const [activeCity, setActiveCity] = useState<string>('Москва');

  const selectedCity = cities.find((city) => city.name === activeCity);

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Представительства</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => setActiveCity(city.name)}
            className={`
              text-base font-medium transition-colors pb-1
              ${
                activeCity === city.name
                  ? 'text-[#009B3E] border-b-2 border-[#009B3E]'
                  : 'text-gray-600 hover:text-[#009B3E]'
              }
            `}
          >
            {city.name}
          </button>
        ))}
      </div>

      {selectedCity && (
        <div className="mb-13">
          <p className="text-gray-600 mb-2">{selectedCity.address}</p>
          <a
            href={`tel:${selectedCity.phone.replace(/\s|\(|\)|-/g, '')}`}
            className="text-[#009B3E] hover:text-[#007a31] font-medium text-lg"
          >
            {selectedCity.phone}
          </a>
        </div>
      )}

      {selectedCity && <YandexMapEmbed mapUrl={selectedCity.mapUrl} />}
    </div>
  );
};

export default RepresentativesSection;
