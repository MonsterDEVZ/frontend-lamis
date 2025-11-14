'use client';
import { useState, useMemo, useEffect, type FC } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PaginationControls from '../ui/PaginationControls';
import FilterSection from '../ui/FilterSection';
import SkeletonLoader from '../ui/SkeletonLoader';
import { useFiltersStore } from '@/store/filtersStore';
import type { Product as StoreProduct } from '@/store/filtersStore';
import CatalogCardResponsive from '../ui/CatalogCardResponsive';
import EmptyState from '../ui/EmptyState';
import { fetchProducts, fetchSections } from '@/services/api/products';
import { Section } from '@/types/product';

/**
 * CATALOG COMPONENT WITH CLIENT-SIDE FILTERING
 *
 * NEW ARCHITECTURE:
 * 1. Load ALL products for section from backend (single API call)
 * 2. Filter by category/collection/type in memory (instant!)
 * 3. No double-firing, no flickering, perfect UX
 *
 * FLOW:
 * - User clicks section → API call to load ALL products
 * - User clicks category → Filter in memory (instant!)
 * - User clicks collection → Filter in memory (instant!)
 * - User clicks type → Filter in memory (instant!)
 */

const Catalog: FC = () => {
  // Zustand store for filter state (NO API calls)
  const {
    selectedSectionId,
    selectedCategoryId,
    selectedCollectionId,
    selectedTypeId,
    isLoading,
    setSectionId,
    setCategoryId,
    setCollectionId,
    setTypeId,
    setIsLoading,
  } = useFiltersStore();

  // URL params
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionIdFromUrl = searchParams.get('sectionId');
  const categoryIdFromUrl = searchParams.get('categoryId');
  const collectionIdFromUrl = searchParams.get('collectionId');
  const typeIdFromUrl = searchParams.get('typeId');

  // ALL products for current section (loaded once)
  const [allProducts, setAllProducts] = useState<StoreProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Section metadata
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  // Pagination (client-side)
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // ===== SYNC URL → STORE =====
  // Initialize filters from URL on mount
  useEffect(() => {
    if (sectionIdFromUrl) {
      const sectionId = parseInt(sectionIdFromUrl, 10);
      if (!isNaN(sectionId) && sectionId !== selectedSectionId) {
        setSectionId(sectionId);
      }
    }

    if (categoryIdFromUrl) {
      const categoryId = parseInt(categoryIdFromUrl, 10);
      if (!isNaN(categoryId) && categoryId !== selectedCategoryId) {
        setCategoryId(categoryId);
      }
    } else if (selectedCategoryId !== null) {
      setCategoryId(null);
    }

    if (collectionIdFromUrl) {
      const collectionId = parseInt(collectionIdFromUrl, 10);
      if (!isNaN(collectionId) && collectionId !== selectedCollectionId) {
        setCollectionId(collectionId);
      }
    } else if (selectedCollectionId !== null) {
      setCollectionId(null);
    }

    if (typeIdFromUrl) {
      const typeId = parseInt(typeIdFromUrl, 10);
      if (!isNaN(typeId) && typeId !== selectedTypeId) {
        setTypeId(typeId);
      }
    } else if (selectedTypeId !== null) {
      setTypeId(null);
    }
  }, [sectionIdFromUrl, categoryIdFromUrl, collectionIdFromUrl, typeIdFromUrl]);

  // ===== LOAD ALL PRODUCTS FOR SECTION =====
  // Single API call when section changes
  useEffect(() => {
    if (!selectedSectionId) {
      setAllProducts([]);
      return;
    }

    const loadAllProducts = async () => {
      setIsLoadingProducts(true);
      setError(null);
      setIsLoading(true);

      try {
        // Fetch ALL products for this section (backend does minimal filtering)
        const response = await fetchProducts({
          sectionId: selectedSectionId,
          page: 1,
          itemsPerPage: 500, // Large limit to get all products
        });

        setAllProducts(response.data);
        setCurrentPage(1); // Reset to first page
      } catch (err) {
        console.error('Error loading products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setAllProducts([]);
      } finally {
        setIsLoadingProducts(false);
        setIsLoading(false);
      }
    };

    loadAllProducts();
  }, [selectedSectionId]); // ONLY when section changes!

  // ===== LOAD SECTION METADATA =====
  useEffect(() => {
    if (!selectedSectionId) {
      setCurrentSection(null);
      return;
    }

    const loadSectionData = async () => {
      try {
        const sections = await fetchSections();
        const section = sections.find((s) => s.id === selectedSectionId);
        setCurrentSection(section || null);
      } catch (err) {
        console.error('Error fetching section data:', err);
        setCurrentSection(null);
      }
    };

    loadSectionData();
  }, [selectedSectionId]);

  // ===== CLIENT-SIDE FILTERING =====
  // Filter products in memory (instant!)
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by category
    if (selectedCategoryId !== null) {
      filtered = filtered.filter((p) => p.category === selectedCategoryId);
    }

    // Filter by collection (mutually exclusive with type)
    if (selectedCollectionId !== null) {
      filtered = filtered.filter((p) => p.collection === selectedCollectionId);
    }

    // Filter by type (mutually exclusive with collection)
    if (selectedTypeId !== null) {
      filtered = filtered.filter((p) => p.type === selectedTypeId);
    }

    return filtered;
  }, [allProducts, selectedCategoryId, selectedCollectionId, selectedTypeId]);

  // ===== COMPUTE AVAILABLE FILTERS =====
  // Extract unique categories from all products
  const availableCategories = useMemo(() => {
    const categoryMap = new Map<number, { id: number; name: string }>();

    allProducts.forEach((product) => {
      if (product.category && product.category_name) {
        categoryMap.set(product.category, {
          id: product.category,
          name: product.category_name,
        });
      }
    });

    return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts]);

  // Extract unique collections from products in selected category
  const availableCollections = useMemo(() => {
    const collectionMap = new Map<number, { id: number; name: string }>();

    const productsToCheck = selectedCategoryId
      ? allProducts.filter((p) => p.category === selectedCategoryId)
      : allProducts;

    productsToCheck.forEach((product) => {
      if (product.collection && product.collection_name) {
        collectionMap.set(product.collection, {
          id: product.collection,
          name: product.collection_name,
        });
      }
    });

    return Array.from(collectionMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts, selectedCategoryId]);

  // Extract unique types from products in selected category
  const availableTypes = useMemo(() => {
    const typeMap = new Map<number, { id: number; name: string }>();

    const productsToCheck = selectedCategoryId
      ? allProducts.filter((p) => p.category === selectedCategoryId)
      : allProducts;

    productsToCheck.forEach((product) => {
      if (product.type && product.type_name) {
        typeMap.set(product.type, {
          id: product.type,
          name: product.type_name,
        });
      }
    });

    return Array.from(typeMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [allProducts, selectedCategoryId]);

  // ===== PAGINATION (CLIENT-SIDE) =====
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // ===== HANDLERS (NO API CALLS!) =====
  // Handlers only update URL, Zustand store updated by useEffect
  const handleCategoryClick = (categoryId: number | null) => {
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (selectedSectionId) params.append('sectionId', selectedSectionId.toString());
    if (categoryId) params.append('categoryId', categoryId.toString());

    router.push(`/catalog?${params.toString()}`);
  };

  const handleCollectionClick = (collectionId: number | null) => {
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (selectedSectionId) params.append('sectionId', selectedSectionId.toString());
    if (selectedCategoryId) params.append('categoryId', selectedCategoryId.toString());
    if (collectionId) params.append('collectionId', collectionId.toString());

    router.push(`/catalog?${params.toString()}`);
  };

  const handleTypeClick = (typeId: number | null) => {
    setCurrentPage(1);

    const params = new URLSearchParams();
    if (selectedSectionId) params.append('sectionId', selectedSectionId.toString());
    if (selectedCategoryId) params.append('categoryId', selectedCategoryId.toString());
    if (typeId) params.append('typeId', typeId.toString());

    router.push(`/catalog?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pb-24">
      {/* Global Loading Overlay */}
      <SkeletonLoader isLoading={isLoading} text="Загружаем товары..." />

      {/* Hero Section */}
      <div
        className="w-full min-h-[550px] md:min-h-[650px] lg:min-h-[750px] bg-cover bg-center relative flex items-center"
        style={{ backgroundImage: "url('/images/hero/screen_1.png')" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-black/70 to-black/50" />

        <div className="wrapper_centering px-6 md:px-10 lg:px-20 pt-20 md:pt-100 pb-0 md:pb-5 lg:pb-24 relative z-10">
          <div className="max-w-4xl">
            <h1
              className="text-white text-[28px] md:text-[32px] lg:text-[44px]! font-bold mb-6 leading-tight text-balance"
              style={{
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
                letterSpacing: '-0.5px',
              }}
              dangerouslySetInnerHTML={{
                __html: `${currentSection?.title || 'Каталог товаров'}`,
              }}
            />

            {currentSection?.description && (
              <div className="text-white/95 text-[13px] md:text-[14px] lg:text-[15px] space-y-3 md:space-y-4">
                {currentSection.description
                  .split('\n\n')
                  .filter((p: string) => p.trim())
                  .map((paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="leading-normal md:leading-[1.6] lg:leading-[1.65]"
                      style={{
                        textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="wrapper_centering mt-8 sm:mt-12 md:mt-50 pb-8 px-4">
        {/* LEVEL 2: Category filtering */}
        {selectedSectionId !== null && availableCategories.length > 0 && (
          <FilterSection
            title="Все категории"
            items={availableCategories}
            selectedId={selectedCategoryId}
            onSelect={handleCategoryClick}
            allLabel="Все категории"
          />
        )}

        {/* LEVEL 3a: Collection filtering */}
        {selectedCategoryId !== null && availableCollections.length > 0 && (
          <FilterSection
            title="Все коллекции"
            items={availableCollections}
            selectedId={selectedCollectionId}
            onSelect={handleCollectionClick}
            allLabel="Все коллекции"
          />
        )}

        {/* LEVEL 3b: Type filtering */}
        {selectedCategoryId !== null && availableTypes.length > 0 && (
          <FilterSection
            title="Все виды"
            items={availableTypes}
            selectedId={selectedTypeId}
            onSelect={handleTypeClick}
            allLabel="Все виды"
          />
        )}

        {/* Products Grid */}
        {isLoadingProducts ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-100"></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <p className="text-red-600 text-lg mb-4">Ошибка загрузки товаров</p>
            <p className="text-gray-600">{error}</p>
          </div>
        ) : paginatedProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-6 divide-y divide-dark-50 md:divide-transparent border_y border-dark-50 md:border-transparent mt-8">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="py-5 md:py-0">
                <CatalogCardResponsive
                  {...product}
                  collection={product.collection_name || product.brand_name || 'Без коллекции'}
                  image={product.main_image_url || '/placeholder.webp'}
                  hoverImage={product.hover_image_url || product.main_image_url || '/placeholder.webp'}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoadingProducts && !error && paginatedProducts.length > 0 && (
        <div className="wrapper_centering">
          <div className="flex justify-between items-center gap-4 mt-12 w-full">
            <PaginationControls
              className="w-full"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
