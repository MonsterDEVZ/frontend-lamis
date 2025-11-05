import React from 'react';
import SectionHeading from './SectionHeading';
import MaterialCard from './MaterialCard';
import CTAButton from './ui/CTAButton';

export default function MaterialsSection() {
  const materials = [
    {
      id: 1,
      title: 'Все артикулы, технические характеристики и варианты отделки в одном удобном PDF-документе.',
      description: '',
      fileInfo: 'PDF • 25 MB',
      image: '/images/materials/materialForDownload_01.png',
    },
    {
      id: 2,
      title: 'Готовые модели для 3ds Max, ArchiCAD и SketchUp. Просто перетащите в вашу сцену.',
      description: '',
      fileInfo: 'MAX • FBX • OBJ • 120 MB',
      image: '/images/materials/materialForDownload_02.png',
    },
    {
      id: 3,
      title: 'Бесшовные текстуры высокого разрешения для создания фотореалистичных визуализаций.',
      description: '',
      fileInfo: 'JPG • 4K • 85 MB',
      image: '/images/materials/materialForDownload_03.png',
    },
    {
      id: 4,
      title: 'Точные чертежи и инструкции для всех изделий. Незаменимо для строителей и инженеров.',
      description: '',
      fileInfo: 'PDF • DWG • 5 MB',
      image: '/images/materials/materialForDownload_04.png',
    },
  ];

  return (
    <section className="pb-20 bg-white">
      <div className="mx-auto px-10" style={{ maxWidth: '1250px' }}>
        <SectionHeading>Материалы для скачивания</SectionHeading>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              title={material.title}
              description={material.description}
              fileInfo={material.fileInfo}
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
