'use client';

import React, { useState } from 'react';
import { warrantyTermsSections } from './warrantyTermsData';

export const WarrantyTermsAccordion: React.FC = () => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="wrapper_centering px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Подробные условия гарантии
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Ознакомьтесь с полной информацией о гарантийных условиях на водонагреватели BLESK
        </p>

        <div className="max-w-5xl mx-auto space-y-4">
          {warrantyTermsSections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:border-green-100"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-100"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {section.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900">{section.title}</h3>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    openSection === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openSection === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6">{section.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
