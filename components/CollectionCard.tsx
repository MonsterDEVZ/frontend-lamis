'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Collection } from '@/types';

interface CollectionCardProps {
  collection: Collection;
}

/**
 * CollectionCard Component
 * Reusable card component for displaying furniture collections
 *
 * Features:
 * - Links to collection detail page
 * - Hover effect with image scale (1.05)
 * - Dark gradient overlay for text readability
 * - Collection name positioned at bottom-left
 * - Exact specification: font-size: 32px, font-weight: bold
 */
export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      href={`/collection/${collection.slug}`}
      className="block relative aspect-[4/3] rounded-2xl overflow-hidden group"
    >
      {/* Image Container with Hover Effect */}
      <motion.div
        className="relative w-full h-full"
        whileHover={{ scale: 1.05 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
        />
      </motion.div>

      {/* Dark Gradient Overlay (bottom to top) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Collection Name - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-10">
        <h3
          className="text-white font-bold"
          style={{
            fontSize: '32px',
            lineHeight: '1.2',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {collection.name}
        </h3>
      </div>
    </Link>
  );
}
