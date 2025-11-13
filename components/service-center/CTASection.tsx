import React from 'react';

interface CTASectionProps {
  onOpenModal: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenModal }) => {
  return (
    <section className="py-16 bg-white">
      <div className="wrapper_centering px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Нужна помощь?</h2>
          <p className="text-gray-600 mb-8">
            Оставьте заявку, и наш специалист свяжется с вами в ближайшее время
          </p>
          <button
            onClick={onOpenModal}
            className="px-8 h-12 bg-green-100 text-white text-base font-medium rounded-full hover:bg-[#007a31] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Оставить заявку в сервисный центр
          </button>
        </div>
      </div>
    </section>
  );
};
