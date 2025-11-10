import Header from '@/components/header/Header';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Catalog from '@/components/catalog';

// Disable static generation for this page because it uses useSearchParams
export const dynamic = 'force-dynamic';

export default function CatalogPage() {
  return (
    <main>
      <Header />

      <div className="absolute z-10 top-24 md:top-32 w-full">
        <div className="wrapper_centering">
          <Breadcrumbs
            items={[{ label: 'Главная', href: '/' }, { label: 'Каталог' }]}
            variant="light"
            resetPosition
            className="px-0!"
          />
        </div>
      </div>

      <Catalog />
    </main>
  );
}
