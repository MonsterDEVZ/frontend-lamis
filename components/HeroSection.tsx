'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '700px' }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/screen_1.png"
          alt="Мебель для ванн LAMIS"
          fill
          priority
          className="object-cover"
          quality={100}
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto" style={{ maxWidth: '1250px', width: '100%', padding: '0 40px' }}>
          <div style={{ maxWidth: '600px' }}>
            {/* Main Heading */}
            <h1
              className="text-white font-bold mb-6"
              style={{
                fontSize: '56px',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              Мебель для ванн<br />LAMIS
            </h1>

            {/* Description */}
            <p
              className="text-white mb-8"
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                opacity: '0.9',
                maxWidth: '500px'
              }}
            >
              Мы делаем лучшие достижения в мире сантехники доступными каждому.
              Техника создаётся в Италии и Германии — там, где рождаются стандарты
              дизайна, надёжности и комфорта.
            </p>

            {/* CTA Button */}
            <button
              className="text-white font-medium hover:opacity-90 transition-all"
              style={{
                backgroundColor: '#00D856',
                fontSize: '14px',
                padding: '14px 32px',
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
