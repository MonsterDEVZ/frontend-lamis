import Image from 'next/image';

interface CollectionCardProps {
  imageUrl: string;
  title: string;
}

export default function CollectionCard({ imageUrl, title }: CollectionCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer">
      {/* Image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* Overlay with Title */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-white text-xl md:text-2xl font-semibold">{title}</h3>
      </div>
    </div>
  );
}
