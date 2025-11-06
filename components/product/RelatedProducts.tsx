'use client';

import type { Product } from '@/types/product';
import ProductSlider from '@/components/ui/ProductSlider';

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string | number;
}

export default function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  // Filter out current product
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 8) // Limit to 8 products for slider
    .map((product) => {
      // Parse price from string format like "12 990 С" to number
      const priceNumber = parseInt(product.price.replace(/[^\d]/g, ''), 10);

      return {
        id: product.id,
        category: product.category,
        name: product.name,
        price: priceNumber,
        status: product.isNew ? 'Новинка' : undefined,
        image: product.image,
        hoverImage: product.images?.[1] || product.image,
        colors: product.colors?.map((c) => c.hex),
        slug: product.slug,
        collection: 'Caiser', // Default collection
      };
    });

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 border-t border-gray-200">
      <ProductSlider
        title="Похожие товары"
        products={relatedProducts}
        slidesPerView={4}
        autoplayDelay={5000}
      />
    </section>
  );
}
