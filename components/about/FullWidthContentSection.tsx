'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FullWidthContentSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="max-w-[1250px] mx-auto py-16 px-4">
      <div className="space-y-6">
        {/* Image Placeholder */}
        <div className="w-full aspect-[2/1] bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400 text-xl font-medium">Дизайнерские коллекции LAMIS</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Дизайнерские решения, созданные для жизни
        </h2>

        {/* Main Text */}
        <p className="text-lg text-gray-700 leading-relaxed">
          Команда дизайнеров LAMIS работает над созданием коллекций, которые сочетают в себе
          актуальные тренды и вневременную элегантность. Каждая коллекция — это результат
          тщательного анализа потребностей рынка, исследований в области эргономики и эстетики.
        </p>

        {/* Toggle Button */}
        <div>
          <button
            type="button"
            onClick={toggleExpanded}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#009B3E] text-[#009B3E] rounded-md hover:bg-[#009B3E]/5 transition-colors duration-200 font-medium"
          >
            {isExpanded ? 'Свернуть' : 'Читать дальше'}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              ▼
            </motion.span>
          </button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="space-y-4 text-lg text-gray-700 pt-2">
                <p>
                  Мы уделяем особое внимание деталям: от плавных линий и обтекаемых форм до
                  продуманных решений для хранения. Наши дизайнеры создают продукты, которые не
                  просто красивы, но и максимально удобны в повседневном использовании.
                </p>
                <p>
                  В ассортименте LAMIS представлены коллекции в различных стилях: от классического
                  до современного минимализма. Мы предлагаем широкую цветовую палитру и различные
                  варианты отделки, чтобы каждый клиент мог найти идеальное решение для своего
                  интерьера.
                </p>
                <p>
                  Наши дизайнеры регулярно посещают международные выставки, следят за трендами
                  мировой индустрии и работают в тесном сотрудничестве с ведущими специалистами в
                  области интерьерного дизайна. Это позволяет нам создавать продукты, которые
                  соответствуют самым высоким мировым стандартам.
                </p>
                <p>
                  Кроме того, мы предлагаем возможность кастомизации наших изделий. Вы можете
                  выбрать размеры, цвета, материалы и комплектацию, чтобы получить мебель для ванной
                  комнаты, которая идеально впишется в ваш интерьер и будет отвечать всем вашим
                  требованиям.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
