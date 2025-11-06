import React from 'react';
import InfoCard from './InfoCard';

const OneColumnInfo: React.FC = () => {
  const card = {
    title: "Наше производство",
    description: `Мы используем только высококачественные материалы и современные технологии. Наши заводы оснащены передовым оборудованием, что позволяет нам контролировать качество на каждом этапе производства. Мы гордимся тем, что наша продукция соответствует самым высоким мировым стандартам.`,
    imageUrl: "/images/about-brand.png", // Placeholder image
  };

  return (
    <section className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto">
        <InfoCard {...card} align="center" />
      </div>
    </section>
  );
};

export default OneColumnInfo;
