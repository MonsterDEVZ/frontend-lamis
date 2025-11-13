import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[500px] flex flex-col bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/951aef2a-878c-43ae-fc29-ae05e5ef9900/full')",
          opacity: 0.4,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Breadcrumbs - at the top of banner */}
      <div className="relative z-10 wrapper_centering px-6 lg:px-12 pt-6 pb-0">
        <div className="text-sm text-white">
          <Link href="/" className="hover:text-green-400 transition-colors opacity-80 hover:opacity-100">
            Главная
          </Link>
          <span className="mx-2 opacity-60">→</span>
          <span className="opacity-80">Сервисный центр</span>
        </div>
      </div>

      {/* Content - Left Aligned */}
      <div className="relative z-10 wrapper_centering px-6 lg:px-12 py-16 flex-1 flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Служба сервиса отвечает <br />
            на ваши вопросы 24/7
          </h1>

          <div className="space-y-4 mb-6">
            <p className="text-white text-lg md:text-xl opacity-90">
              Единый колл-центр: с 9:00 – 20:00
            </p>
            <a
              href="tel:+996755588888"
              className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white hover:text-green-400 transition-colors"
            >
              +996 755 58 88 88
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
