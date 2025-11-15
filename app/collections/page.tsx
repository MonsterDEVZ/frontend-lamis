import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Footer from '@/components/Footer';
import CollectionsGrid from '@/components/collections/CollectionsGrid';

export default function CollectionsPage() {
  return (
    <main>
      <HeaderWithSuspense />
      <div className="pt-[110px]">
        <div className="container mx-auto px-4 py-12">
          <CollectionsGrid />
        </div>
      </div>
      <Footer />
    </main>
  );
}
