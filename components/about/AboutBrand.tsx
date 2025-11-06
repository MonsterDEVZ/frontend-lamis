'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';

const AboutBrand: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const longDescription = `
    Продукты IDDIS® созданы, чтобы превосходить ожидания. Они предлагают новый уровень эстетики, надёжности, красоты и удовольствия от повседневных ритуалов. IDDIS® – это премиальное качество, продуманность и дизайн, сопоставимые с европейскими брендами, по цене, доступной среднему россиянину.
    Новый уровень надёжности. Наши продукты разработаны для длительной службы и отличаются исключительной надёжностью. Мы тщательно тестируем каждую деталь, чтобы обеспечить удобство использования, интуитивный принцип работы и простой монтаж.
    Новый уровень дизайна. Наш дизайн вне времени. Он легко переживёт быстротечные тренды, даря ежедневную радость от красивых, удобных продуктов, которые безупречно работают в течение многих лет.
    Новый уровень сервиса. Экспертиза наших сотрудников и партнёров гарантирует всестороннюю поддержку на каждом этапе – от выбора продукта до установки и обслуживания. Мы предлагаем консультирование на установку и покупки и гарантируем поставку запасных частей даже спустя долгое время после прекращения производства модели.
  `;

  return (
    <section className="">
      <div className="flex flex-col items-center py-24 text-center max-w-[800px] mx-auto">
        <h2 className="text-3xl font-bold mb-4">Главное о бренде</h2>
        <div
          className="relative overflow-hidden transition-all duration-700 ease-in-out"
          style={{ maxHeight: isExpanded ? '1000px' : '120px' }}
        >
          <p className="text-lg text-gray-700 text-left">{longDescription}</p>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
        <Button onClick={() => setIsExpanded(!isExpanded)} className="mt-8" variant="secondary">
          {isExpanded ? 'Свернуть' : 'Главное о бренде'}
        </Button>
      </div>
    </section>
  );
};

export default AboutBrand;
