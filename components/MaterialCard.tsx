import Image from 'next/image';

interface MaterialCardProps {
  title: string;
  image: string;
  fileUrl: string;
}

export default function MaterialCard({ title, image, fileUrl }: MaterialCardProps) {
  return (
    <a
      href={fileUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-[280px] bg-gray-50 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-[150px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover pointer-events-none group-hover:scale-105 transition-transform duration-300"
          quality={100}
          loading={'lazy'}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="font-medium mb-3 line-clamp-3 text-lg leading-[1.15] text-dark-100 group-hover:text-green-100 transition-colors duration-300">
          {title}
        </p>
      </div>
    </a>
  );
}
