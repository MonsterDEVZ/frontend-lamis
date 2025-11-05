'use client';
import type { FC } from 'react';
import { collections } from '@/data/collections';
import CollectionCard from './CollectionCard';
import SectionHeading from './SectionHeading';
import PaginationControls from './ui/PaginationControls';
import Header from './Header';

interface IProps {}

const Collections: FC<IProps> = () => {
  return (
    <section className="pb-12">
      <Header />

      <div className="h-40" />

      <div className="container">
        <SectionHeading>Коллекции</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>

        <PaginationControls
          currentPage={1}
          totalPages={5}
          itemsPerPage={''}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
          onShowMore={() => {}}
        />
      </div>
    </section>
  );
};

export default Collections;
