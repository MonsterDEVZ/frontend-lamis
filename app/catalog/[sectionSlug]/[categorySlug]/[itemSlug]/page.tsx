import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Footer from '@/components/Footer';
import CatalogCardResponsive from '@/components/ui/CatalogCardResponsive';
import EmptyState from '@/components/ui/EmptyState';
import { fetchCatalogProducts } from '@/services/api/products';

interface PageProps {
  params: {
    sectionSlug: string;
    categorySlug: string;
    itemSlug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sectionSlug, categorySlug, itemSlug } = params;

  try {
    const data = await fetchCatalogProducts(sectionSlug, categorySlug, itemSlug);
    const { section, category, collection, type, products } = data;

    const itemName = collection?.name || type?.name || '';
    const itemDescription = collection?.description || type?.description;
    const itemType = collection ? 'Коллекция' : 'Тип';

    // Get product images for Open Graph
    const productImages = products
      .slice(0, 4)
      .map((p) => p.main_image_url || p.image)
      .filter(Boolean);

    const title = `${itemName} - ${category.name} - ${section.name} | LAMIS`;
    const description =
      itemDescription ||
      `${itemType} ${itemName} от ${section.name}. ${products.length} товаров в категории ${category.name}.`;

    return {
      title,
      description,
      keywords: `${itemName}, ${category.name}, ${section.name}, ${products
        .slice(0, 10)
        .map((p) => p.name)
        .join(', ')}`,
      openGraph: {
        title: `${itemName} - ${itemType}`,
        description,
        url: `https://lamis.ru/catalog/${sectionSlug}/${categorySlug}/${itemSlug}`,
        siteName: 'LAMIS',
        type: 'website',
        images: productImages.length
          ? productImages.map((img) => ({
              url: img,
              width: 800,
              height: 600,
              alt: itemName,
            }))
          : collection?.image
            ? [
                {
                  url: collection.image,
                  width: 1200,
                  height: 630,
                  alt: itemName,
                },
              ]
            : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${itemName} - ${itemType}`,
        description,
      },
      alternates: {
        canonical: `https://lamis.ru/catalog/${sectionSlug}/${categorySlug}/${itemSlug}`,
      },
      robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    };
  } catch (error) {
    return {
      title: 'Страница не найдена | LAMIS',
      description: 'Запрашиваемая коллекция или тип не найдены',
    };
  }
}

export default async function CatalogProductsPage({ params }: PageProps) {
  const { sectionSlug, categorySlug, itemSlug } = params;

  let data;
  try {
    data = await fetchCatalogProducts(sectionSlug, categorySlug, itemSlug);
  } catch (error) {
    notFound();
  }

  const { section, category, collection, type, products } = data;

  // Determine what we're showing - collection or type
  const itemName = collection?.name || type?.name || '';
  const itemDescription = collection?.description || type?.description;
  const itemType = collection ? 'Коллекция' : 'Тип';

  return (
    <main>
      <HeaderWithSuspense />

      <div className="absolute z-10 top-24 md:top-32 w-full">
        <div className="wrapper_centering">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Каталог', href: '/catalog' },
              { label: section.name, href: `/catalog/${sectionSlug}` },
              { label: category.name, href: `/catalog/${sectionSlug}/${categorySlug}` },
              { label: itemName },
            ]}
            variant="light"
            resetPosition
            className="px-0!"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="w-full h-[350px] md:h-[400px] bg-cover bg-center pb-8 sm:pb-16 md:pb-24 flex items-end"
        style={{ backgroundImage: "url('/images/hero/screen_1.png')" }}
      >
        <div className="wrapper_centering px-4">
          <div className="text-white/80 text-sm mb-2">
            {itemType} / {section.name} / {category.name}
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold">
            {itemName}
          </h1>
          {itemDescription && (
            <p className="text-white text-lg mt-4 max-w-3xl">{itemDescription}</p>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-16 px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Товары</h2>
          <div className="text-gray-600">
            Найдено: <span className="font-semibold">{products.length}</span>
          </div>
        </div>

        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-6 divide-y divide-dark-50 md:divide-transparent border_y border-dark-50 md:border-transparent">
            {products.map((product) => (
              <div key={product.id} className="py-5 md:py-0">
                <CatalogCardResponsive
                  {...product}
                  collection={
                    collection?.name || type?.name || product.collection_name || 'Без категории'
                  }
                  image={product.main_image_url || product.image || '/placeholder.webp'}
                  hoverImage={
                    product.hover_image_url ||
                    product.main_image_url ||
                    product.image ||
                    '/placeholder.webp'
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
