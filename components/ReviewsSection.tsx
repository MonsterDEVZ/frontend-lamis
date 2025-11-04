import React from 'react';
import SectionHeading from './SectionHeading';
import ReviewCard from './ReviewCard';
import { reviews } from '@/data/reviews';

/**
 * ReviewsSection Component
 * Displays customer reviews in a grid layout
 */
export default function ReviewsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="mx-auto" style={{ maxWidth: '1250px' }}>
        <SectionHeading>Отзывы</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              date={review.date}
              rating={review.rating}
              text={review.text}
              avatar={review.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
