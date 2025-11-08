'use client';

import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import FeedbackModal from './feedback/FeedbackModal';

export default function ServiceCardsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };
  const services = [
    {
      id: 1,
      title: 'Сервисный центр',
      subtitle: 'Поддержим в любой ситуации',
      image: '/imag494491.png',
    },
    {
      id: 2,
      title: 'Станьте нашим партнером',
      subtitle: 'Создаем и развиваемся',
      image: '/imag9dd82.png',
    },
  ];

  return (
    <section className="py-[100px] bg-white">
      <div className="container px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              image={service.image}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
