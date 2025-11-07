'use client';

import React, { useState } from 'react';

interface CityData {
  name: string;
  address: string;
  phone: string;
}

const RepresentativesSection: React.FC = () => {
  const cities: CityData[] = [
    {
      name: 'Бишкек',
      address: 'ул. Ленинская Слобода, 26, стр. 2',
      phone: '+7 (495) 120-30-40',
    },
    {
      name: 'Манас',
      address: 'ул. Малышева, 51',
      phone: '+7 (343) 287-65-43',
    },
    {
      name: 'Ош',
      address: 'ул. Кирова, 86',
      phone: '+7 (383) 310-20-30',
    },
    {
      name: 'Баткен',
      address: 'пр. Буденновский, 93',
      phone: '+7 (863) 250-45-67',
    },
    {
      name: 'Нарын',
      address: 'ул. Московское шоссе, 18',
      phone: '+7 (846) 270-80-90',
    },
    {
      name: 'Ыссык-Кол',
      address: 'ул. Московское шоссе, 18',
      phone: '+7 (846) 270-80-90',
    },
  ];

  const [activeCity, setActiveCity] = useState<string>('Бишкек');

  const selectedCity = cities.find((city) => city.name === activeCity);

  return (

    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-13">Филиалы</h1>

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
        <div>
          <p className="text-gray-600 mb-2">{selectedCity.address}</p>
          <a
            href={`tel:${selectedCity.phone.replace(/\s|\(|\)|-/g, '')}`}
            className="text-[#009B3E] hover:text-[#007a31] font-medium text-lg"
          >
            {selectedCity.phone}
          </a>
        </div>
      )}


    </div>
  );
};

export default RepresentativesSection;