import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '650px' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-brand.png"
          alt="О бренде"
          fill
          className="object-cover object-center"
          quality={100}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="wrapper_centering w-full">
          <div style={{ maxWidth: '600px' }}>
            {/* Heading */}
            <h2
              className="text-white font-bold mb-4"
              style={{
                fontSize: '42px',
                lineHeight: '1.2',
              }}
            >
              О бренде
            </h2>

            {/* Description */}
            <p
              className="text-white mb-6"
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                opacity: '0.9',
              }}
            >
              Lamis — это производитель товаров для ванной комнаты и кухни с европейским подходом к
              качеству, дизайну и сервису.
            </p>

            {/* CTA Button */}

            <Link href="/about">
              <button
                className="flex items-center justify-center gap-2 text-white font-medium hover:opacity-90 transition-all bg-green-100"
                style={{
                  fontSize: '14px',
                  padding: '12px 24px',
                  borderRadius: '100px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
