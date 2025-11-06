'use client';

import { notFound } from 'next/navigation';
import { useFavoritesStore } from '@/store/favoritesStore';
import { productsData } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import ProductSlider from '@/components/ui/ProductSlider';
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
        if (
          product.relatedProducts.includes(String(p.id)) ||
          product.relatedProducts.includes(p.slug || '')
        ) {
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

  // Prepare breadcrumbs
  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: 'Ванная', href: '/bathroom' },
    { label: product.name },
  ];

  // Transform related products for slider
  const sliderProducts = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 8)
    .map((p) => {
      const priceNumber = parseInt(p.price.replace(/[^\d]/g, ''), 10);
      return {
        id: p.id,
        category: p.category,
        name: p.name,
        price: priceNumber,
        status: p.isNew ? 'Новинка' : undefined,
        image: p.image,
        hoverImage: p.images?.[1] || p.image,
        colors: p.colors?.map((c) => c.hex),
        slug: p.slug,
        collection: 'Caiser',
      };
    });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-32">
        {/* Product Detail Section */}
        <section className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Product Grid: Gallery Left, Info Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
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
          <div className="mb-16">
            <ProductTabs
              description={product.description}
              specifications={product.specifications}
            />
          </div>
        </section>

        {/* Related Products Section */}
        {sliderProducts.length > 0 && (
          <section className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ProductSlider
              title="Коллекция Bild"
              products={sliderProducts}
              slidesPerView={4}
              autoplayDelay={5000}
            />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
