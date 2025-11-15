import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Catalog from '@/components/catalog';
import Footer from '@/components/Footer';

// Disable static generation for this page because it uses useSearchParams
export const dynamic = 'force-dynamic';

export default function CatalogPage() {
  return (
    <main>
      <HeaderWithSuspense />

      <div className="absolute z-10 top-[90px] md:top-[120px] w-full">
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
      <Footer />
    </main>
  );
}
