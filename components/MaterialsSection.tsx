import React from 'react';
import SectionHeading from './SectionHeading';
import MaterialCard from './MaterialCard';
import CTAButton from './ui/CTAButton';

export default function MaterialsSection() {
  const materials = [
    {
      id: 1,
      title:
        'Фото коллекции + лого LAMIS\n' +
          'Текст под фото: Все коллекции мебели для ванн\n',
      description: '',
      image: '/images/materials/materialForDownload_01.png',
    },
    {
      id: 2,
      title: 'Фото красивой раковины настольной в интерьере + лого CAISER. Все коллекции сантехники и смесителей',
      description: '',
      image: '/images/materials/materialForDownload_02.png',
    },
    {
      id: 3,
      title: 'Фото водонагревателя в интерьере + лого BLESK Все виды водонагревателей\n',
      description: '',
      image: '/images/materials/materialForDownload_03.png',
    },
    {
      id: 4,
      title: 'Фото дизайнерского зеркала над раковиной + лого LAMIS',
      description: '',
      image: '/images/materials/materialForDownload_04.png',
    },
  ];

  return (
    <section className="pb-20 bg-white">
      <div className="mx-auto px-10" style={{ maxWidth: '1250px' }}>
        <SectionHeading>Материалы для скачивания</SectionHeading>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              title={material.title}
              description={material.description}
              image={material.image}
            />
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center">
          <CTAButton>Посмотреть еще</CTAButton>
        </div>
      </div>
    </section>
  );
}
