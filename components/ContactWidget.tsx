// Путь: components/ContactWidget.tsx

'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageSquare, ChevronDown, ArrowUp } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

type ContactWidgetProps = {
  onOpenFeedbackModal: () => void;
};

export default function ContactWidget({ onOpenFeedbackModal }: ContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mainButtonIcon = isOpen ? <ChevronDown size={32} /> : <MessageSquare size={28} />;

  return (
    // 👇 ВОТ ЭТА СТРОКА. Я ИЗМЕНИЛ gap-3 НА gap-2, ЧТОБЫ УМЕНЬШИТЬ РАССТОЯНИЕ
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-2">
      {/* Кнопка "Наверх" */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-all"
          aria-label="Наверх"
        >
          <ArrowUp size={28} />
        </button>
      )}

      {/* Выпадающие кнопки */}
      <div
        className={`flex flex-col items-center gap-2 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <a
          href="https://wa.me/ВАШ_НОМЕР_WHATSAPP"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700"
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </a>
        <button
          onClick={onOpenFeedbackModal}
          className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700"
          aria-label="Открыть форму обратной связи"
        >
          <MessageSquare size={28} />
        </button>
        <a
          href="tel:ВАШ_НОМЕР_ТЕЛЕФОНА"
          className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700"
          aria-label="Позвонить"
        >
          <Phone size={28} />
        </a>
      </div>

      {/* Главная кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl hover:bg-indigo-700 transition-transform duration-300"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      >
        {mainButtonIcon}
      </button>
    </div>
  );
}