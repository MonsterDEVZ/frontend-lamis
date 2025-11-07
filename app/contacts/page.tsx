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
      

      <main className="pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            <MainOfficeSection />
            <RepresentativesSection />
          </div>
          <section className="mb-20 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Остались вопросы?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Нажмите на кнопку ниже, чтобы оставить заявку, и наш менеджер свяжется с вами для консультации.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-700 transition-colors"
            >
              Связаться с нами
            </button>
          </section>
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