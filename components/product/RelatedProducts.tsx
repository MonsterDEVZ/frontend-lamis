'use client';

import type { Product } from '@/types/product';
import CatalogCard from '@/components/ui/CatalogCard';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string | number;
}

export default function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  // Filter out current product
  const relatedProducts = products.filter(
    (product) => product.id !== currentProductId
  );

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Похожие товары
        </h2>
        <p className="text-gray-600">
          Товары из той же категории, которые могут вам понравиться
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.slice(0, 4).map((product) => {
          // Parse price from string format like "12 990 С" to number
          const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);

          return (
            <CatalogCard
              key={product.id}
              name={product.name}
              price={priceNumber}
              image={product.image}
              hoverImage={product.images?.[1] || product.image}
              category={product.category}
              status={product.isNew ? 'Новинка' : undefined}
              colors={product.colors?.map((c) => c.hex)}
            />
          );
        })}
      </div>
    </section>
  );
}
