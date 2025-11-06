'use client';

import { notFound } from 'next/navigation';
import { useFavoritesStore } from '@/store/favoritesStore';
import { productsData } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import RelatedProducts from '@/components/product/RelatedProducts';
import type { Product } from '@/types/product';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Helper function to find product by slug
function findProductBySlug(slug: string): Product | null {
  for (const category in productsData) {
    const product = productsData[category].find((p) => p.slug === slug);
    if (product) return product;
  }
  return null;
}

// Helper function to get related products from same category
function getRelatedProducts(product: Product): Product[] {
  const categoryProducts = productsData[product.category.toLowerCase()] || [];

  // If product has specific relatedProducts array, use those
  if (product.relatedProducts && product.relatedProducts.length > 0) {
    const related: Product[] = [];
    for (const category in productsData) {
      for (const p of productsData[category]) {
        if (product.relatedProducts.includes(String(p.id)) ||
            product.relatedProducts.includes(p.slug || '')) {
          related.push(p);
        }
      }
    }
    return related;
  }

  // Otherwise return products from same category
  return categoryProducts;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(String(product.id));
  const relatedProducts = getRelatedProducts(product);

  const handleToggleFavorite = () => {
    toggleFavorite(String(product.id));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32">
        {/* Product Detail Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Gallery */}
          <ProductGallery
            images={product.images || [product.image]}
            productName={product.name}
          />

          {/* Right: Info */}
          <ProductInfo
            id={product.id}
            name={product.name}
            sku={product.sku || `SKU-${product.id}`}
            price={product.price}
            shortDescription={product.shortDescription}
            colors={product.colors}
            isNew={product.isNew}
            onAddToFavorites={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <ProductTabs
            description={product.description}
            specifications={product.specifications}
          />
        </div>
      </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <RelatedProducts
              products={relatedProducts}
              currentProductId={product.id}
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
