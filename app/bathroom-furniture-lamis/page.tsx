import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import Catalog from '@/components/catalog';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function BathroomFurnitureLamisPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs
        items={[
          {
            label: 'Главная',
            href: '/',
          },
          {
            label: 'Каталог товаров',
          },
        ]}
        variant="light"
      />

      <Catalog />
      <Footer />
    </main>
  );
}
