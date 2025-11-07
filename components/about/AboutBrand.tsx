'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';

const AboutBrand: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const longDescription = `
    Мы стремимся сделать лучшие достижения в мире сантехники доступными каждому.
    Мы предлагаем новый уровень дизайна, надежности и комфорта, воплощая
    премиальный опыт в каждом продукте и сервисе.
    <br/><br/>
    Основные факты:<br/>
    Мы стремимся сделать лучшие достижения в мире сантехники доступными каждому.
    Мы предлагаем новый уровень дизайна, надежности и комфорта, воплощая
    премиальный опыт в каждом продукте и сервисе.
  `;

  return (
    <section>
      <div className="flex flex-col items-center py-24 text-center mx-auto">
        <h2 className="text-[44px] leading-14 font-bold text-center text-[#1d1d1d]">
          Lamis® — сантехника, которая <br /> качественно улучшает жизнь
        </h2>

        <div
          className="relative overflow-hidden transition-all duration-700 ease-in-out mt-6 max-w-[650px]"
          style={{ maxHeight: isExpanded ? '1000px' : '120px' }}
        >
          <p
            className="text-sm text-[#1d1d1d] text-left"
            dangerouslySetInnerHTML={{ __html: longDescription }}
          />

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-white to-transparent"></div>
          )}
        </div>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline_gr"
          className="mt-8 px-6 h-12"
        >
          {isExpanded ? 'Свернуть' : 'Главное о бренде'}
        </Button>
      </div>
    </section>
  );
};

export default AboutBrand;
