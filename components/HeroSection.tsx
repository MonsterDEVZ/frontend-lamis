'use client';

import Image from 'next/image';
import CTAButton from './ui/CTAButton';

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100vh - 110px)', minHeight: '600px' }}
    >
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
      <div className="relative z-10 h-full flex items-center w-full">
        <div className="mx-auto flex items-center h-full max-w-[1250px] w-full px-10">
          <div className="inline-flex flex-col gap-8">
            {/* Main Heading */}
            <h1 className="text-white font-bold text-[56px] leading-[1.2] tracking-[-0.02em] mb-0">
              Мебель для ванн
              <br />
              LAMIS
            </h1>

            {/* Description */}
            <p className="text-white text-base leading-[1.6] opacity-90 max-w-[500px] mb-0">
              Мы делаем лучшие достижения в мире сантехники доступными каждому. Техника создаётся в
              Италии и Германии — там, где рождаются стандарты дизайна, надёжности и комфорта.
            </p>

            {/* CTA Button */}
            <CTAButton className="w-48">Подробнее</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
