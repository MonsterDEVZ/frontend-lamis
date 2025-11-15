import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Footer from '@/components/Footer';
import { fetchCatalogSection } from '@/services/api/products';

interface PageProps {
  params: {
    sectionSlug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sectionSlug } = params;

  try {
    const data = await fetchCatalogSection(sectionSlug);
    const { section, categories } = data;

    return {
      title: `${section.name} - Каталог | LAMIS`,
      description:
        section.description ||
        `Выберите категорию в секции ${section.name}. ${categories.length} доступных категорий.`,
      keywords: `${section.name}, каталог, ${categories.map((c) => c.name).join(', ')}`,
      openGraph: {
        title: `${section.name} - Каталог`,
        description:
          section.description || `Каталог товаров ${section.name}. ${categories.length} категорий.`,
        url: `https://lamis.ru/catalog/${sectionSlug}`,
        siteName: 'LAMIS',
        type: 'website',
        images: section.image
          ? [
              {
                url: section.image,
                width: 1200,
                height: 630,
                alt: section.name,
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${section.name} - Каталог`,
        description: section.description || `Каталог товаров ${section.name}`,
      },
      alternates: {
        canonical: `https://lamis.ru/catalog/${sectionSlug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Секция не найдена | LAMIS',
      description: 'Запрашиваемая секция не найдена',
    };
  }
}

export default async function CatalogSectionPage({ params }: PageProps) {
  const { sectionSlug } = params;

  let data;
  try {
    data = await fetchCatalogSection(sectionSlug);
  } catch (error) {
    notFound();
  }

  const { section, categories } = data;

  return (
    <main>
      <HeaderWithSuspense />

      <div className="absolute z-10 top-24 md:top-32 w-full">
        <div className="wrapper_centering">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Каталог', href: '/catalog' },
              { label: section.name },
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
            {section.name}
          </h1>
          {section.description && (
            <p className="text-white text-lg mt-4 max-w-3xl">{section.description}</p>
          )}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Выберите категорию</h2>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Категории не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog/${sectionSlug}/${category.slug}`}
                className="group block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-green-100 transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-gray-600 text-sm line-clamp-3">{category.description}</p>
                )}
                <div className="mt-4 text-green-100 font-medium flex items-center">
                  Перейти
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
        )}
      </div>

      <Footer />
    </main>
  );
}

// Generate static params for all sections at build time
export async function generateStaticParams() {
  // You can fetch all sections from API here if needed
  // For now, return common sections
  return [
    { sectionSlug: 'lamis' },
    { sectionSlug: 'caizer' },
    { sectionSlug: 'blesk' },
  ];
}
