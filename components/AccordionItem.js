// Путь к файлу: components/AccordionItem.js

'use client';

import { useState } from 'react';

// Кастомная иконка "+" / "x" с анимацией
const AccordionIcon = ({ isOpen }) => {
  return (
    // Контейнер для анимации вращения
    <div
      className={`relative w-3 h-3 transition-transform duration-300 ease-in-out mt-1 ${
        isOpen ? 'rotate-45' : ''
      }`}
    >
      {/* Горизонтальная линия */}
      <span
        className={`absolute top-1/2 left-0 w-full h-0.5 rounded-full transition-colors duration-300 ${
          isOpen ? 'bg-white' : 'bg-gray-400'
        }`}
        style={{ transform: 'translateY(-50%)' }}
      ></span>
      {/* Вертикальная линия */}
      <span
        className={`absolute top-0 left-1/2 w-0.5 h-full rounded-full transition-colors duration-300 ${
          isOpen ? 'bg-white' : 'bg-gray-400'
        }`}
        style={{ transform: 'translateX(-50%)' }}
      ></span>
    </div>
  );
};

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        {/* Заголовок, меняющий цвет при активации */}
        <span
          className={`text-lg font-semibold transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-white/80'
          }`}
        >
          {title}
        </span>

        {/* Наша новая кастомная иконка */}
        <AccordionIcon isOpen={isOpen} />
      </button>

      {/* Выпадающий контент */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen pb-4' : 'max-h-0'
        }`}
      >
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;