import React from 'react';
import ServiceCard from './ServiceCard';

export default function ServiceCardsSection() {
  const services = [
    {
      id: 1,
      title: 'Сервисный центр',
      subtitle: 'Поддержим в любой ситуации',
      image: '/images/services/service-center.png',
    },
    {
      id: 2,
      title: 'Станьте нашим партнером',
      subtitle: 'Создаем и развиваемся',
      image: '/images/services/partnership.png',
    },
  ];

  return (
    <section className="py-[100px] bg-white">
      <div className="mx-auto px-10" style={{ maxWidth: '1250px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
