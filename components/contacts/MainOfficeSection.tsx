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
      <h2 className="text-2xl font-semibold text-gray-700 mb-8">Сервисный центр</h2>

      <div className="grid grid-cols-1 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Единный колл-центр</h3>
          <p className="text-gray-600 mb-2">Часы работы: с 9:00 – 20:00</p>
          <a href="tel:+996755588888" className="text-[#009B3E] hover:text-[#007a31] font-medium text-xl">
            +996 755 58 88 88
          </a>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Гарантия на нашу продукцию</h3>
          <p className="text-gray-600 mb-4">Мы ценим каждого нашего клиента, поэтому мы даём гарантию на нашу продукцию:</p>
          <ul className="space-y-2 text-gray-700">
            <li>• Санфарфор (раковины, унитазы, биде) – <strong>10 лет</strong></li>
            <li>• Ванны – <strong>10 лет</strong></li>
            <li>• Смесители – <strong>3 года</strong></li>
            <li>• Инсталяция – <strong>3 года</strong></li>
            <li>• Водонагреватели – <strong>на бак 3 года, на тен 1 год</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainOfficeSection;
