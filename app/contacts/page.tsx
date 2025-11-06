'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import FeedbackModal from '@/components/feedback/FeedbackModal';

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 py-16 min-h-[60vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Контакты</h1>
        <div className="max-w-2xl">
          <p className="text-lg text-gray-600 mb-8">
            У вас есть вопросы? Свяжитесь с нами, и мы с радостью вам поможем!
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsModalOpen(true)}
          >
            Задать вопрос
          </Button>
        </div>
      </div>
      <Footer />
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
