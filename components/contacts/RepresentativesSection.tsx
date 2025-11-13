'use client';

import { cn } from '@/styles';
import React, { useState } from 'react';

interface CityData {
  name: string;
  address: string;
  phone: string;
}

interface CountryData {
  name: string;
  cities: CityData[];
}

const countries: CountryData[] = [
  {
    name: 'Кыргызстан',
    cities: [
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
    ],
  },
  {
    name: 'Узбекистан',
    cities: [
      // Данные будут добавлены позже
    ],
  },
  {
    name: 'Казахстан',
    cities: [
      // Данные будут добавлены позже
    ],
  },
];

const RepresentativesSection: React.FC = () => {
  const [activeCountry, setActiveCountry] = useState<string>('Кыргызстан');
  const [activeCity, setActiveCity] = useState<string>('Бишкек');

  const selectedCountry = countries.find((country) => country.name === activeCountry);
  const selectedCity = selectedCountry?.cities.find((city) => city.name === activeCity);

  // При смене страны, выбираем первый город этой страны
  const handleCountryChange = (countryName: string) => {
    setActiveCountry(countryName);
    const country = countries.find((c) => c.name === countryName);
    if (country && country.cities.length > 0) {
      setActiveCity(country.cities[0].name);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8 mt-13">Филиалы</h1>

      {/* Countries */}
      <div className="flex flex-wrap gap-6 mb-6">
        {countries.map((country) => (
          <button
            key={country.name}
            onClick={() => handleCountryChange(country.name)}
            className={cn(
              `text-lg font-semibold transition-all pb-2 px-1 border-b-3`,
              activeCountry === country.name
                ? 'text-green-100 border-green-100'
                : 'text-gray-500 hover:text-green-100 border-transparent'
            )}
          >
            {country.name}
          </button>
        ))}
      </div>

      {/* Cities */}
      {selectedCountry && selectedCountry.cities.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-4 mb-4 border-b border-dark-50">
            {selectedCountry.cities.map((city) => (
              <button
                key={city.name}
                onClick={() => setActiveCity(city.name)}
                className={`
                  text-base font-medium transition-colors pb-1
                  ${
                    activeCity === city.name
                      ? 'text-green-100 border-b-2 border-green-100'
                      : 'text-gray-600 hover:text-green-100'
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
                className="text-green-100 hover:text-[#007a31] font-medium text-lg"
              >
                {selectedCity.phone}
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="text-gray-500 py-4">Филиалы в этой стране скоро появятся</div>
      )}
    </div>
  );
};

export default RepresentativesSection;
