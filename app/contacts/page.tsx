// app/contacts/page.tsx

'use client';

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import MainOfficeSection from '@/components/contacts/MainOfficeSection';
import RepresentativesSection from '@/components/contacts/RepresentativesSection';
import FeedbackModal from '@/components/feedback/FeedbackModal';
import CooperationForm from '@/components/forms/CooperationForm';

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Header />

      <main className="pt-24">
        <div className="wrapper_centering md:px-10 lg:px-15 xl:px-30 mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 mx-auto">
            <MainOfficeSection />
            <RepresentativesSection />
          </div>

          <div>
            <CooperationForm />
          </div>
        </div>
      </main>

      <Footer />
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
