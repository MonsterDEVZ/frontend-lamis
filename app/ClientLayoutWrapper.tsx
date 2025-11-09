// Путь: app/ClientLayoutWrapper.tsx

'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import FloatingWidget from '@/components/ui/FloatingWidget';
// --- ИЗМЕНЕНИЕ: Импортируем вашу модалку ---
import FeedbackModal from '@/components/feedback/FeedbackModal'; // Убедитесь, что путь верный

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  // --- ИЗМЕНЕНИЕ: Добавляем состояние для управления вашей модалкой ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {children}
      <Toaster position="top-right" />

      <ScrollToTopButton />
      
      {/* --- ИЗМЕНЕНИЕ: Передаем функцию для открытия модалки в виджет --- */}
      <FloatingWidget onOpenChat={() => setIsModalOpen(true)} />

      {/* --- ИЗМЕНЕНИЕ: Рендерим вашу модалку и передаем ей состояние и функцию закрытия --- */}
      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}