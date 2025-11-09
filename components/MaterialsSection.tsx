import SectionHeading from './SectionHeading';
import MaterialCard from './MaterialCard';

const materials = [
  {
    id: 1,
    title: 'Все коллекции мебели для ванн',
    image: '/images/materials/materialForDownload_01.png',
    fileUrl: '/images/materials/materialForDownload_01.png', // Placeholder URL
  },
  {
    id: 2,
    title: 'Все коллекции сантехники и смесителей',
    image: '/images/materials/materialForDownload_02.png',
    fileUrl: '/files/materials/collection_plumbing.pdf', // Placeholder URL
  },
  {
    id: 3,
    title: 'Все виды водонагревателей',
    image: '/images/materials/materialForDownload_03.png',
    fileUrl: '/files/materials/water_heaters.pdf', // Placeholder URL
  },
  {
    id: 4,
    title: 'Вся коллекция дизайнерских и умных зеркал',
    image: '/images/materials/materialForDownload_04.png',
    fileUrl: '/files/materials/designer_mirrors.pdf', // Placeholder URL
  },
];

export default function MaterialsSection() {
  return (
    <section
      className="wrapper_centering pb-24"
      style={{
        paddingBottom: '96px',
      }}
    >
      <SectionHeading>Материалы для скачивания</SectionHeading>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {materials.map((material) => (
          <MaterialCard
            key={material.id}
            title={material.title}
            image={material.image}
            fileUrl={material.fileUrl}
          />
        ))}
      </div>
    </section>
  );
}
