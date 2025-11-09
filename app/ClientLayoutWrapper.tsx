// Путь: app/ClientLayoutWrapper.tsx

'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import ContactWidget from '@/components/ContactWidget';
import FeedbackForm from '@/components/feedback/FeedbackForm'; // Ваш компонент, который мы не меняем

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);

  return (
    <>
      {children}
      <Toaster position="top-right" />

      <ContactWidget onOpenFeedbackModal={() => setFeedbackModalOpen(true)} />

      {isFeedbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none w-[448px] px-7 rounded-2xl m-auto h-107 bg-white">
          <div className="pointer-events-auto" >
            
            <FeedbackForm
            
              onCancel={() => setFeedbackModalOpen(false)}
              onSubmit={() => {
                
                console.log('Form submitted!');
              }}
              isSubmitting={false}
              
            />
          </div>
        </div>
      )}
    </>
  );
}
