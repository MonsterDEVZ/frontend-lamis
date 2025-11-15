import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Footer from '@/components/Footer';
import { fetchCatalogCategory } from '@/services/api/products';

interface PageProps {
  params: {
    sectionSlug: string;
    categorySlug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sectionSlug, categorySlug } = params;

  try {
    const data = await fetchCatalogCategory(sectionSlug, categorySlug);
    const { section, category, collections, types } = data;

    const itemCount = collections.length + types.length;
    const itemsList = [
      ...collections.map((c) => c.name),
      ...types.map((t) => t.name),
    ].join(', ');

    return {
      title: `${category.name} - ${section.name} | LAMIS`,
      description:
        category.description ||
        `${category.name} от ${section.name}. ${collections.length} коллекций, ${types.length} типов. ${itemsList}`,
      keywords: `${category.name}, ${section.name}, ${itemsList}`,
      openGraph: {
        title: `${category.name} - ${section.name}`,
        description:
          category.description ||
          `Выберите коллекцию или тип в категории ${category.name}. ${itemCount} вариантов.`,
        url: `https://lamis.ru/catalog/${sectionSlug}/${categorySlug}`,
        siteName: 'LAMIS',
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: `${category.name} - ${section.name}`,
        description: category.description || `${category.name} от ${section.name}`,
      },
      alternates: {
        canonical: `https://lamis.ru/catalog/${sectionSlug}/${categorySlug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Категория не найдена | LAMIS',
      description: 'Запрашиваемая категория не найдена',
    };
  }
}

export default async function CatalogCategoryPage({ params }: PageProps) {
  const { sectionSlug, categorySlug } = params;

  let data;
  try {
    data = await fetchCatalogCategory(sectionSlug, categorySlug);
  } catch (error) {
    notFound();
  }

  const { section, category, collections, types } = data;
  const hasCollections = collections.length > 0;
  const hasTypes = types.length > 0;

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
              { label: category.name },
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
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-white text-lg mt-4 max-w-3xl">{category.description}</p>
          )}
          <p className="text-white/80 text-sm mt-2">{section.name}</p>
        </div>
      </div>

      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-16 px-4">
        {/* Collections Section */}
        {hasCollections && (
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Коллекции</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/catalog/${sectionSlug}/${categorySlug}/${collection.slug}`}
                  className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {collection.image && (
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-green-100 transition-colors">
                      {collection.name}
                    </h3>
                    {collection.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {collection.description}
                      </p>
                    )}
                    <div className="text-green-100 font-medium flex items-center">
                      Смотреть товары
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Types Section */}
        {hasTypes && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {hasCollections ? 'Или выберите по типу' : 'Выберите тип'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {types.map((type) => (
                <Link
                  key={type.id}
                  href={`/catalog/${sectionSlug}/${categorySlug}/${type.slug}`}
                  className="group block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-100 transition-colors">
                    {type.name}
                  </h3>
                  {type.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">{type.description}</p>
                  )}
                  <div className="mt-4 text-green-100 font-medium flex items-center">
                    Смотреть товары
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasCollections && !hasTypes && (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Коллекции и типы не найдены</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
