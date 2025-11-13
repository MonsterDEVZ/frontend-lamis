import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import MaterialCard from '@/components/MaterialCard';
import SectionHeading from '@/components/SectionHeading';

const allMaterials = [
  {
    id: 1,
    title: 'Каталог мебели для ванн Lamis 2025',
    image: '/images/materials/materialForDownload_01.png',
    description: 'Полный каталог всей мебели для ванных комнат, включая новые коллекции.',
    fileUrl: '/downloads/lamis-catalog-2025.pdf',
  },
  {
    id: 2,
    title: 'Каталог сантехники Caizer',
    image: '/images/materials/materialForDownload_02.png',
    description: 'Вся сантехника и смесители от бренда Caizer в одном удобном файле.',
    fileUrl: '/downloads/caizer-catalog.pdf',
  },
  {
    id: 3,
    title: 'Сертификат качества на водонагреватели',
    image: '/images/materials/materialForDownload_03.png',
    description: 'Официальный сертификат, подтверждающий соответствие стандартам.',
    fileUrl: '/downloads/certificate.png',
  },
  {
    id: 4,
    title: 'Логотипы Lamis в высоком разрешении',
    image: '/images/materials/materialForDownload_04.png',
     description: 'Набор логотипов в форматах AI, EPS и SVG для дизайнеров и партнеров.',
    fileUrl: '/downloads/lamis-logos.zip',
  },
   {
    id: 5,
    title: 'Инструкция по установке',
    image: '/images/materials/materialForDownload_04.png',
    description: 'Подробное руководство по установке нашей продукции.',
    fileUrl: '/downloads/installation-guide.pdf',
  },
  {
    id: 6,
    title: 'Гарантийный талон',
    image: '/images/materials/materialForDownload_04.png',
    description: 'Шаблон гарантийного талона для сервисных центров.',
    fileUrl: '/downloads/warranty.pdf',
  },
];

export default function DownloadsPage() {
  return (
    <main>
      <Header />
      <div className="bg-white pt-32 pb-20">
        <div className="wrapper_centering">
          <SectionHeading>Материалы для скачивания</SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {allMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                title={material.title}
                description={material.description}
                image={material.image}
                fileUrl={material.fileUrl}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
