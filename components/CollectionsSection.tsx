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
export default function CollectionsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto px-6 lg:px-12" style={{ maxWidth: '1250px' }}>
        {/* Section Heading - Exact specification: 42px */}
        <SectionHeading>Водонагреватели BLESK</SectionHeading>

        {/* Collections Grid - 2x2 Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 mb-10" style={{ gap: '20px' }}>
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>

        {/* CTA Button - "Show More" */}
        <div className="flex justify-center">
          <CTAButton>Показать еще</CTAButton>
        </div>
      </div>
    </section>
  );
}
