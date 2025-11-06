'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveBrandSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="max-w-[1250px] mx-auto py-12 px-4">
      <div className="space-y-6">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Мы создаем функциональные и красивые решения для вашей ванной комнаты
        </h1>

        {/* Paragraphs */}
        <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
          <p>
            LAMIS — это современный бренд сантехники и мебели для ванных комнат, который сочетает в
            себе европейское качество, инновационный дизайн и доступность. Мы специализируемся на
            производстве мебели для ванных комнат, смесителей, раковин, ванн и аксессуаров,
            которые делают каждую ванную комнату уютной и стильной.
          </p>

          <p>
            Наша миссия — предложить каждому клиенту продукты высокого качества по разумной цене.
            Мы понимаем, что ванная комната — это место релаксации и комфорта, поэтому тщательно
            продумываем каждую деталь наших изделий.
          </p>
        </div>

        {/* Toggle Button */}
        <div>
          <button
            type="button"
            onClick={toggleExpanded}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#FF6B35] text-[#FF6B35] rounded-md hover:bg-[#FF6B35]/5 transition-colors duration-200 font-medium"
          >
            {isExpanded ? 'Свернуть' : 'Главное о бренде'}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              ▼
            </motion.span>
          </button>
        </div>

        {/* Animated List */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="list-disc pl-5 space-y-3 text-lg text-gray-700 mt-4">
                <li>
                  <strong>Качество:</strong> Мы используем только проверенные материалы и
                  современные технологии производства, что гарантирует долговечность и надежность
                  наших изделий.
                </li>
                <li>
                  <strong>Дизайн:</strong> Наши коллекции разработаны с учетом последних тенденций
                  в области интерьерного дизайна. От классики до минимализма — у нас есть решения
                  для любого стиля.
                </li>
                <li>
                  <strong>Доступность:</strong> Мы стремимся сделать качественную сантехнику и
                  мебель доступной для широкого круга покупателей, предлагая оптимальное
                  соотношение цены и качества.
                </li>
                <li>
                  <strong>Экологичность:</strong> Мы заботимся об окружающей среде и используем
                  экологически чистые материалы в производстве наших изделий.
                </li>
                <li>
                  <strong>Сервис:</strong> Мы ценим каждого клиента и предоставляем полную
                  поддержку на всех этапах — от выбора продукции до установки и послепродажного
                  обслуживания.
                </li>
                <li>
                  <strong>Инновации:</strong> Мы постоянно внедряем новые технологии и улучшаем
                  наши продукты, чтобы они соответствовали самым высоким стандартам качества и
                  функциональности.
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
