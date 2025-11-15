import React from 'react';
import Link from 'next/link';
import SectionHeading from './SectionHeading';
import MaterialCard from './MaterialCard';
import CTAButton from './ui/CTAButton';

const materials = [
  {
    id: 1,
    title: 'Каталог мебели для ванн Lamis 2025',
    image: '/images/materials/materialForDownload_01.png',
    description: 'Полный каталог всей мебели для ванных комнат.',
    fileUrl: '/downloads/lamis-catalog-2025.pdf',
  },
  {
    id: 2,
    title: 'Каталог сантехники Caizer',
    image: '/images/materials/materialForDownload_02.png',
    description: 'Вся сантехника и смесители от бренда Caizer.',
    fileUrl: '/downloads/caizer-catalog.pdf',
  },
  {
    id: 3,
    title: 'Сертификат качества на водонагреватели',
    image: '/images/materials/materialForDownload_03.png',
    description: 'Подтверждение соответствия стандартам.',
    fileUrl: '/downloads/certificate.png',
  },
  {
    id: 4,
    title: 'Логотипы Lamis в высоком разрешении',
    image: '/images/materials/materialForDownload_04.png',
    description: 'Набор логотипов для дизайнеров и партнеров.',
    fileUrl: '/downloads/lamis-logos.zip',
  },
];

export default function MaterialsSection() {
  return (
    <section className="pb-20 bg-white">
      <div className="wrapper_centering">
        <SectionHeading>Материалы для скачивания</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {materials.map((material) => (
            <MaterialCard
              key={material.id}
              title={material.title}
              image={material.image}
              description={material.description}
              fileUrl={material.fileUrl}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/downloads">
            <CTAButton>Посмотреть все материалы</CTAButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
