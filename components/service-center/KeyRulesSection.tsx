import React from 'react';
import { KeyRuleCard } from './KeyRuleCard';

const keyRules = [
  {
    id: '1',
    title: 'Что нужно иметь',
    iconBgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    bulletColor: 'text-blue-500',
    hoverBorderColor: 'hover:border-green-100',
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    items: [
      { bold: 'Гарантийный талон', text: 'с печатью торгующей организации' },
      { bold: 'Кассовый чек', text: 'с датой покупки' },
      { bold: 'Серийный номер', text: 'на корпусе изделия' },
    ],
  },
  {
    id: '2',
    title: 'Что нужно делать',
    iconBgColor: 'bg-green-50',
    iconColor: 'text-green-100',
    bulletColor: 'text-green-100',
    hoverBorderColor: 'hover:border-green-100',
    icon: (
      <svg className="w-6 h-6 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    items: [
      { bold: 'Вызвать мастера', text: 'из авторизованного сервисного центра' },
      { bold: 'Проводить ТО', text: 'раз в год (чистка бака, замена анода)' },
      { bold: 'Хранить документы', text: 'весь гарантийный срок' },
    ],
  },
  {
    id: '3',
    title: 'Чего не делать',
    iconBgColor: 'bg-red-50',
    iconColor: 'text-red-500',
    bulletColor: 'text-red-500',
    hoverBorderColor: 'hover:border-red-100',
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    items: [
      { bold: 'Не демонтировать', text: 'изделие самостоятельно' },
      { bold: 'Не включать', text: 'водонагреватель с пустым баком' },
      { bold: 'Не ремонтировать', text: 'без авторизованного мастера' },
    ],
  },
];

export const KeyRulesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="wrapper_centering px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Важная информация</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ключевые правила для получения гарантийного обслуживания
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {keyRules.map((rule) => (
            <KeyRuleCard key={rule.id} {...rule} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6 text-left max-w-3xl">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-700">
                  <strong>Обратите внимание:</strong> Выезд мастера от города до населенных пунктов
                  оплачивается отдельно. Диагностика и ремонт при заводском браке — бесплатно.
                  Гарантия действует только на территории Кыргызстана.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
