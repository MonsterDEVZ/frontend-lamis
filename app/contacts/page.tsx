// app/contacts/page.tsx

'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import MainOfficeSection from '@/components/contacts/MainOfficeSection';
import RepresentativesSection from '@/components/contacts/RepresentativesSection';
import FeedbackModal from '@/components/feedback/FeedbackModal';

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />
      
      {/* ИЗМЕНЕНИЕ 1: Основной контент получает отступ сверху, равный высоте хедера */}
      <main className="pt-24"> {/* pt-24 - это пример. Подберите точное значение */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
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