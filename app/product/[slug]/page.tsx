'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useFavoritesStore } from '@/store/favoritesStore';
import { fetchProducts } from '@/services/api/products';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import ProductSlider from '@/components/ui/ProductSlider';
import type { Product } from '@/types/product';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = product ? favorites.includes(String(product.id)) : false;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        // Fetch all products and find by slug
        // TODO: Add API endpoint to get product by slug directly
        const response = await fetchProducts({});
        const foundProduct = response.data.find((p) => p.slug === slug);

        if (!foundProduct) {
          notFound();
          return;
        }

        setProduct(foundProduct);

        // Load related products from same category
        if (foundProduct.category_id) {
          const relatedResponse = await fetchProducts({
            sectionId: foundProduct.section_id,
            brandId: foundProduct.brand_id,
            categoryId: foundProduct.category_id,
            itemsPerPage: 8,
          });
          setRelatedProducts(relatedResponse.data.filter((p) => p.id !== foundProduct.id));
        }
      } catch (error) {
        console.error('Error loading product:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(String(product.id));
    }
  };

  if (loading || !product) {
    return (
      <>
        <HeaderWithSuspense />
        <main className="min-h-screen bg-white pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#009B3E] mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка товара...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Prepare breadcrumbs
  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: product.section_name || 'Раздел', href: `/catalog?sectionId=${product.section_id}` },
    { label: product.name },
  ];

  // Transform related products for slider
  const sliderProducts = relatedProducts.slice(0, 8).map((p) => {
    const priceNumber = parseFloat(p.price);
    return {
      id: p.id,
      category: p.category_name || '',
      name: p.name,
      price: priceNumber,
      status: p.is_new ? 'Новинка' : undefined,
      image: p.main_image_url || p.image,
      hoverImage: p.hover_image_url || p.main_image_url || p.image,
      colors: p.colors?.map((c: any) => c.hex),
      slug: p.slug,
      collection: p.brand_name || 'Collection',
    };
  });

  // Transform product images for gallery
  const productImages = [
    product.main_image_url || product.image,
    product.hover_image_url || '',
    ...(Array.isArray(product.images) ? product.images : []),
  ].filter(Boolean);

  return (
    <>
      <HeaderWithSuspense />

      <main className="min-h-screen bg-white pt-24">
        {/* Product Detail Section */}
        <section className="wrapper_centering py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} resetPosition />

          {/* Product Grid: Gallery Left, Info Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 mt-10">
            {/* Left: Gallery */}
            <ProductGallery images={productImages} productName={product.name} />

            {/* Right: Info */}
            <ProductInfo
              id={product.id}
              name={product.name}
              sku={`SKU-${product.id}`}
              price={`${parseFloat(product.price).toLocaleString('ru-RU')} ₽`}
              shortDescription={product.description || ''}
              colors={product.colors || []}
              isNew={product.is_new || false}
              onAddToFavorites={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          </div>

          {/* Product Details Tabs */}
          <div className="mb-16">
            <ProductTabs
              description={product.description || 'Описание недоступно'}
              specifications={[]}
            />
          </div>
        </section>

        {/* Related Products Section */}
        {sliderProducts.length > 0 && (
          <section className="wrapper_centering px-4 sm:px-6 lg:px-8 pb-16">
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
