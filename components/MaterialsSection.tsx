import React from 'react';
import SectionHeading from './SectionHeading';
import MaterialCard from './MaterialCard';
import CTAButton from './ui/CTAButton';

export default function MaterialsSection() {
  const materials = [
    {
      id: 1,
      title:
        'Все коллекции мебели для ванн',
      description: '',
      image: 'Image__01.webp',
    },
    {
      id: 2,
      title: 'Все коллекции сантехники и смесителей',
      description: '',
      image: 'Image__02.webp',
    },
    {
      id: 3,
      title: 'Все виды водонагревателей',
      description: '',
      image: 'Image__03.webp',
    },
    {
      id: 4,
      title: 'Вся коллекция дизайнерских и умных зеркал',
      description: '',
      image: 'Image__04.webp',
    },
  ];

  return (
    <section className="pb-20 bg-white">
      <div className="mx-auto px-10" style={{ maxWidth: '1250px' }}>
        <SectionHeading>Материалы для скачивания</SectionHeading>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {materials?.map((material) => (
            <MaterialCard
              key={material.id}
              title={material.title}
              description={material.description}
              image={`https://pub-abbe62b0e52d438ea38505b6a2c733d7.r2.dev/images/${material.image}`}
            />
          ))}
        </div>

        {/* Show More Button */}
        {/*<div className="flex justify-center">*/}
        {/*  <CTAButton>Посмотреть еще</CTAButton>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
