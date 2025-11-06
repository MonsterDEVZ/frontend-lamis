'use client';

import { useState } from 'react';
import type { ProductSpecification } from '@/types/product';

interface ProductTabsProps {
  description?: string;
  specifications?: ProductSpecification[];
}

type TabType = 'description' | 'specifications';

export default function ProductTabs({
  description,
  specifications,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    { id: 'description' as TabType, label: 'Описание' },
    { id: 'specifications' as TabType, label: 'Характеристики' },
  ];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 text-base font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            {description ? (
              <p className="text-gray-600 leading-relaxed">{description}</p>
            ) : (
              <p className="text-gray-400 italic">Описание товара отсутствует</p>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            {specifications && specifications.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 p-0"
                  >
                    <span className="text-sm text-gray-600">{spec.label}</span>
                    <span className="text-base font-medium text-gray-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">
                Технические характеристики отсутствуют
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
