'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/feedback/FeedbackModal';
import Link from 'next/link';

export default function ServiceCenterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />

      <main className="pt-24 bg-white">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[500px] flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://imagedelivery.net/sM8MbFgFUCDLJNHppRh-0g/951aef2a-878c-43ae-fc29-ae05e5ef9900/full')",
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
                Служба сервиса отвечает* <br />
                на ваши вопросы 24/7:
              </h1>

              <div className="space-y-4 mb-6">
                <p className="text-white text-lg md:text-xl opacity-90">
                  Единный колл-центр: с 9:00 – 20:00
                </p>
                <a
                  href="tel:+996755588888"
                  className="block text-3xl md:text-4xl lg:text-5xl font-bold text-white hover:text-green-400 transition-colors"
                >
                  +996 755 58 88 88
                </a>
              </div>

              <p className="text-white text-sm opacity-70">
                * Звонок по всей территории Кыргызстана. Стоимость звонка в Казахстане и Республике Беларусь определяется по тарифу оператора.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Section */}
        <section className="py-16 bg-gray-50">
          <div className="wrapper_centering px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Гарантия на нашу продукцию
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {/* Warranty Card 1 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#009B3E] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                  <svg className="w-8 h-8 text-[#009B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Санфарфор
                </h3>
                <p className="text-gray-600 mb-4">
                  Раковины, унитазы, биде
                </p>
                <p className="text-3xl font-bold text-[#009B3E]">10 лет</p>
              </div>

              {/* Warranty Card 2 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#009B3E] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                  <svg className="w-8 h-8 text-[#009B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Ванны
                </h3>
                <p className="text-gray-600 mb-4">
                  Все виды ванн
                </p>
                <p className="text-3xl font-bold text-[#009B3E]">10 лет</p>
              </div>

              {/* Warranty Card 3 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#009B3E] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                  <svg className="w-8 h-8 text-[#009B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Смесители
                </h3>
                <p className="text-gray-600 mb-4">
                  Все модели смесителей
                </p>
                <p className="text-3xl font-bold text-[#009B3E]">3 года</p>
              </div>

              {/* Warranty Card 4 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#009B3E] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                  <svg className="w-8 h-8 text-[#009B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Инсталяции
                </h3>
                <p className="text-gray-600 mb-4">
                  Системы инсталяции
                </p>
                <p className="text-3xl font-bold text-[#009B3E]">3 года</p>
              </div>

              {/* Warranty Card 5 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#009B3E] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                  <svg className="w-8 h-8 text-[#009B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Водонагреватели
                </h3>
                <p className="text-gray-600 mb-4">
                  Электрические водонагреватели
                </p>
                <p className="text-2xl font-bold text-[#009B3E]">
                  Бак: 3 года<br />ТЭН: 1 год
                </p>
              </div>

              {/* Warranty Card 6 */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#009B3E] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-6">
                  <svg className="w-8 h-8 text-[#009B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Мебель для ванной
                </h3>
                <p className="text-gray-600 mb-4">
                  Тумбы, пеналы, зеркала
                </p>
                <p className="text-3xl font-bold text-[#009B3E]">2 года</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 h-[40px] bg-[#009B3E] text-white text-base font-medium rounded-full hover:bg-[#007a31] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Оставить заявку в сервисный центр
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
