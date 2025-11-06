import Catalog from '@/components/catalog';

// Disable static generation for this page because it uses useSearchParams
export const dynamic = 'force-dynamic';

export default function CatalogPage() {
  return (
    <main>
      <Catalog />
    </main>
  );
}
