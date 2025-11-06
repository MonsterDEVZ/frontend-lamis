'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import MainOfficeSection from '@/components/contacts/MainOfficeSection';
import RepresentativesSection from '@/components/contacts/RepresentativesSection';
import FeedbackModal from '@/components/feedback/FeedbackModal';

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {/* ИЗМЕНЕНИЕ 1: Создаем единый "липкий" блок для хедера и хлебных крошек */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <Header />
        
        {/* Хлебные крошки теперь являются частью этого липкого блока */}
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600 py-4">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Главная
            </Link>
            <span className="mx-2">→</span>
            <span>Контакты</span>
          </div>
        </div>
      </header>

      {/* ИЗМЕНЕНИЕ 2: Основной контент теперь не нуждается в верхнем отступе */}
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 mt-20">
            <MainOfficeSection />
            <RepresentativesSection />
          </div>
        </div>
      </main>

      <Footer />
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}