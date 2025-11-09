import React from 'react';
import Link from 'next/link';

const MainOfficeSection: React.FC = () => {
  return (
    <div>
      <div className="text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-green-600 transition-colors">
          Главная
        </Link>
        <span className="mx-2">→</span>
        <span>Контакты</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">Санкт-Петербург</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Головной офис «СКЛ»</h3>
          <p className="text-gray-600 mb-2">Химический переулок, 1АБ</p>
          <a href="tel:+78123180545" className="text-green-100 hover:text-[#007a31] font-medium">
            +7 (812) 318-05-45
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Служба сервиса</h3>
          <p className="text-gray-600 mb-2">Пулковское ш., 56/4, лит. А</p>
          <a href="tel:88002347767" className="text-[#009B3E] hover:text-[#007a31] font-medium">
            8 (800) 234-77-67
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainOfficeSection;
