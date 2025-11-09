// Путь: app/ClientLayoutWrapper.tsx

'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import FloatingWidget from '@/components/ui/FloatingWidget';

import FeedbackModal from '@/components/feedback/FeedbackModal';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {children}
      <Toaster position="top-right" />

      <ScrollToTopButton />

      <FloatingWidget onOpenChat={() => setIsModalOpen(true)} />

      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
