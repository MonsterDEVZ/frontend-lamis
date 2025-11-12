'use client';

import SectionHeading from './SectionHeading';
import CollectionCard from './CollectionCard';
import CTAButton from './ui/CTAButton';
import { collections } from '@/data/collections';

/**
 * CollectionsSection Component
 * Main section displaying all furniture collections
 *
 * Features:
 * - Data-driven rendering from centralized collections.ts
 * - Responsive grid: 2x2 on desktop (md:), 1 column on mobile
 * - Exact gap specification: 20px (gap-5)
 * - "Show More" CTA button
 */

// Список коллекций для отображения на главной странице в указанном порядке
const homePageCollectionIds = [
  'accent',
  'palermo',
  'lamis',
  'sevilya',
  'omega',
  'deluxe',
  'kapetown',
  'nora',
  'sanremo',
  'andalusia',
];

export default function CollectionsSection() {
  // Фильтруем и сортируем коллекции согласно списку для главной страницы
  const homePageCollections = homePageCollectionIds
    .map((id) => collections.find((col) => col.id === id))
    .filter((col) => col !== undefined);

  return (
    <section className="py-20 bg-white">
      <div className="wrapper_centering px-6 lg:px-12">
        {/* Section Heading - Exact specification: 42px */}
        <SectionHeading>Наши коллекции</SectionHeading>

        {/* Collections Grid - 2x2 Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 mb-10" style={{ gap: '20px' }}>
          {homePageCollections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>

        {/* CTA Button - "Show More" */}
        {/*<div className="flex justify-center">*/}
        {/*  <CTAButton>Показать еще</CTAButton>*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
