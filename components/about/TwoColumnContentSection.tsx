'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TwoColumnContentSection() {
  const [isLeftExpanded, setIsLeftExpanded] = useState(false);
  const [isRightExpanded, setIsRightExpanded] = useState(false);

  const toggleLeftExpanded = () => {
    setIsLeftExpanded(!isLeftExpanded);
  };

  const toggleRightExpanded = () => {
    setIsRightExpanded(!isRightExpanded);
  };

  return (
    <section className="max-w-[1250px] mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Image Placeholder */}
          <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-lg font-medium">Наше производство</span>
          </div>

          {/* Heading */}
          <h3 className="text-3xl font-bold text-gray-900">Производство мирового уровня</h3>

          {/* Main Text */}
          <p className="text-lg text-gray-700 leading-relaxed">
            Наш производственный комплекс оснащен современным оборудованием ведущих европейских
            производителей. Мы используем передовые технологии на всех этапах производства — от
            обработки сырья до финальной упаковки продукции.
          </p>

          {/* Toggle Button */}
          <div>
            <button
              type="button"
              onClick={toggleLeftExpanded}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#009B3E] text-[#009B3E] rounded-md hover:bg-[#009B3E]/5 transition-colors duration-200 font-medium"
            >
              {isLeftExpanded ? 'Свернуть' : 'Читать дальше'}
              <motion.span
                animate={{ rotate: isLeftExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                ▼
              </motion.span>
            </button>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isLeftExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="space-y-4 text-lg text-gray-700 pt-2">
                  <p>
                    Каждый день наша команда из более чем 200 квалифицированных специалистов
                    работает над созданием продукции, которая сочетает в себе функциональность,
                    долговечность и эстетику. Мы гордимся тем, что можем предложить нашим клиентам
                    изделия, которые не уступают по качеству европейским аналогам, при этом
                    оставаясь доступными по цене.
                  </p>
                  <p>
                    Система контроля качества включает многоступенчатую проверку на каждом этапе
                    производства. Мы проводим испытания на прочность, водонепроницаемость и
                    долговечность покрытий, чтобы гарантировать безупречную работу наших изделий на
                    протяжении многих лет.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Image Placeholder */}
          <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-lg font-medium">Наши ценности</span>
          </div>

          {/* Heading */}
          <h3 className="text-3xl font-bold text-gray-900">Философия бренда LAMIS</h3>

          {/* Main Text */}
          <p className="text-lg text-gray-700 leading-relaxed">
            В основе нашей работы лежат простые, но важные принципы: качество, доступность и забота
            о клиентах. Мы верим, что каждый человек заслуживает комфортную и красивую ванную
            комнату, которая будет радовать долгие годы.
          </p>

          {/* Toggle Button */}
          <div>
            <button
              type="button"
              onClick={toggleRightExpanded}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#009B3E] text-[#009B3E] rounded-md hover:bg-[#009B3E]/5 transition-colors duration-200 font-medium"
            >
              {isRightExpanded ? 'Свернуть' : 'Читать дальше'}
              <motion.span
                animate={{ rotate: isRightExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                ▼
              </motion.span>
            </button>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isRightExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <ul className="list-disc pl-5 space-y-3 text-lg text-gray-700 pt-2">
                  <li>
                    <strong>Клиентоориентированность:</strong> Мы внимательно слушаем пожелания
                    наших клиентов и постоянно совершенствуем продукцию, учитывая их обратную
                    связь.
                  </li>
                  <li>
                    <strong>Инновации:</strong> Мы инвестируем в исследования и разработки, чтобы
                    предлагать самые современные решения для ванных комнат.
                  </li>
                  <li>
                    <strong>Ответственность:</strong> Мы заботимся об экологии, используя
                    безопасные материалы и технологии, которые минимизируют воздействие на
                    окружающую среду.
                  </li>
                  <li>
                    <strong>Надежность:</strong> Каждый продукт LAMIS проходит строгий контроль
                    качества и имеет официальную гарантию производителя.
                  </li>
                  <li>
                    <strong>Партнерство:</strong> Мы строим долгосрочные отношения с нашими
                    партнерами и дистрибьюторами, основанные на взаимном доверии и уважении.
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
