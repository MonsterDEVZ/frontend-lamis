'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FeedbackForm from './FeedbackForm';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { name: string; phone: string; }) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Feedback submitted:', data);

      // Уведомление об успехе с новым дизайном
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'toast-enter' : 'toast-leave'
            } max-w-sm w-full bg-green-600 shadow-lg rounded-lg pointer-events-auto flex items-center justify-between p-4`} 
          >

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-white" /> 
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-white">Заявка принята! Мы свяжемся с вами.</p> 
              </div>
            </div>
            
 
            <div className="flex items-center">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="p-1 rounded-full hover:bg-green-700 transition-colors focus:outline-none"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        ),
        {
          duration: 4000,
        }
      );
      
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);

      // Уведомление об ошибке (остается прежним для контраста)
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'toast-enter' : 'toast-leave'
            } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex border border-gray-200`}
          >
            <div className="flex-shrink-0 bg-red-500 p-4 flex items-center justify-center rounded-l-lg">
              <XCircle className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1 w-0 p-4">
              <div className="flex flex-col">
                <p className="text-base font-bold text-gray-900">Произошла ошибка</p>
                <p className="mt-1 text-sm text-gray-600">Не удалось отправить заявку.</p>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl max-w-md w-full shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <FeedbackForm 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;