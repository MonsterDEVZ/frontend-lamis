import React from 'react';
import { WarrantyCard } from './WarrantyCard';

interface WarrantyItem {
  id: string;
  name: string;
  description: string;
  period: string;
}

const warrantyItems: WarrantyItem[] = [
  { id: '1', name: 'Санфарфор', description: 'Раковины, унитазы', period: '10 лет' },
  { id: '2', name: 'Ванны', description: 'Все виды', period: '10 лет' },
  { id: '3', name: 'Смесители', description: 'Все модели', period: '3 года' },
  { id: '4', name: 'Инсталяции', description: 'Системы', period: '3 года' },
  { id: '5', name: 'Водонагреватели', description: 'BLESK', period: '3 года' },
  { id: '6', name: 'Мебель', description: 'Для ванной', period: '2 года' },
];

export const WarrantyPeriodsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="wrapper_centering px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Гарантийные сроки</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы предоставляем надежную гарантию на всю нашу продукцию
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {warrantyItems.map((item) => (
              <WarrantyCard
                key={item.id}
                name={item.name}
                description={item.description}
                period={item.period}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
