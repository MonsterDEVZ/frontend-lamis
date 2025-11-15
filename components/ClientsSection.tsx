'use client';

import React from 'react';
import { clients } from '@/data/clients';
import SectionHeading from './SectionHeading';

export default function ClientsSection() {
  // Дублируем массив клиентов для бесконечной прокрутки
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="pb-20 bg-white overflow-hidden">
      <div className="wrapper_centering">
        <SectionHeading>Наши клиенты</SectionHeading>
      </div>

      {/* Контейнер для бесконечного скроллера */}
      <div className="relative mt-12">
        {/* Градиенты по краям для эффекта затухания */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Скроллер */}
        <div className="overflow-hidden">
          <div className="flex items-center animate-scroll-infinite">
            {duplicatedClients.map((client, index) => (
              <div key={`${client.id}-${index}`} className="flex-shrink-0 mx-4 md:mx-6 lg:mx-8">
                <div className="flex items-center justify-center select-none">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-16 md:h-20 max-w-[120px] md:max-w-[150px] object-contain"
                    />
                  ) : (
                    <p
                      className="font-semibold text-center text-3xl md:text-4xl"
                      style={{ color: '#000' }}
                    >
                      {client.name}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Добавляем CSS для анимации */}
      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
