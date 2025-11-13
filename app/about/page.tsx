'use client';

import { useRef, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Footer from '@/components/Footer';
import Banner from '@/components/about/Banner';
import AboutBrand from '@/components/about/AboutBrand';
import InfoCardAccordion from '@/components/about/InfoCardAccordion';

const card1 = {
  title: 'Ценности и преимущества',
  description: `•\tКонтроль качества на всех этапах — от поступления материалов до отгрузки готового изделия. 
•\tСовременное оборудование — роботизированные станки, ручные и полуавтоматические линии покраски, гибкие сборочные зоны. 
•\tЭкологичность и безопасность — используем сертифицированные материалы и экологичные технологии, включая водяные фильтры на покрасочном участке. 
•\tГибкий ассортимент — от лаконичных решений до дизайнерских коллекций премиум-класса. 
•\tСкорость и стабильность поставок — собственное производство обеспечивает контроль сроков и объёмов. 
•\tПоддержка партнёров — брендированные материалы, контент, техническое сопровождение. 
•\tОткрытость к трендам — посещаем международные выставки, обновляем коллекции в соответствии с мировыми тенденциями. 
`,
  imageUrl: '/images/about-brand.png',
};
const card2 = {
  title: 'Ассортимент',
  description: `На сегодняшний день в каталоге более 3000 моделей. К 2025 году представлено 25 коллекций мебели. \n Основные группы товаров: o\tТумбы под раковину (подвесные и напольные)
o\tПеналы (подвесные и напольные)
o\tЗеркала с подсветкой и сенсорными датчиками
o\tСанфарфор (раковины, унитазы)
o\tВанны
o\tСмесители
o\tИнсталяции
o\tВодонагреватели \n\n Дизайны: от минимализма с глянцевыми фасадами до текстур, имитирующих натуральное дерево.
Цветовая палитра: универсальная, трендовая, от базового белого до глубоких оттенков графита и древесных текстур. 
`,
  imageUrl: '/images/about-brand.png',
};

const card3 = {
  title: 'Дизайн и разработка',
  description: `LAMIS ежегодно обновляет свои коллекции, внедряя современные форматы и технологии.
Мы анализируем рынок, участвуем в международных выставках, сотрудничаем с дизайнерами и проектируем продукцию, соответствующую эстетике 2025 года и запросам требовательного B2B-сегмента.\n
Технология производства и материалы 
Качество — стратегический приоритет LAMIS. 
•\tКорпуса мебели: влагостойкий ЛДСП и МДФ от европейских производителей: 
KRONOSPAN и EGGER (Австрия). Отличается прочностью, стабильностью формы, 
устойчивостью к влаге и перепадам температуры. \n
•\tФасады: 
Ø\tМДФ с покраской — в премиум-линейках. Используем итальянскую краску SIRCA: трёхслойное нанесение + финишный лак и полировка. Эффекты: глянец, мат. Покрасочная камера оборудована водяным фильтром, обеспечивающим экологическую безопасность и отсутствие вредных выбросов. 
Ø\tПлёнка ПВХ — в доступных сериях. Прочное покрытие, стойкое к износу, влаге, бытовой химии и УФ.\n 
•\tФурнитура: премиального качества от бренда TALLSEN (Германия). Во всех изделиях — доводчики, надёжные петли и направляющие. 
•\tСборка: ручная и полуавтоматическая, с многоступенчатым контролем ОТК. 
•\tУпаковка: ударопрочная, влагозащитная, с обязательной маркировкой.\n
Все эти меры позволяют гарантировать длительный срок службы мебели и высокий потребительский комфорт. 
Сроки производства и производственные мощности 
•\tСтандартные модели — готовность в течение 6 рабочих дней 
•\tСкладская программа — постоянное наличие ключевых моделей для оперативной отгрузки 
Текущая производственная мощность: 
до 10 000 изделий в месяц с возможностью масштабирования под объёмы партнёров. 
`,
  imageUrl: '/images/about-brand.png',
};

const metrics = [
  { top: 'Продано более', middle: '10 000 000', bottom: 'смесителей', note: '' },
  { top: 'Качество', middle: '0,09%', bottom: 'брака', note: '' },
  { top: 'В компании', middle: 'ТОП-3', bottom: 'производителей' },
  { top: 'На рынке', middle: '15 лет', bottom: 'опыта' },
  { top: 'Сотрудников', middle: '500+', bottom: 'в штате' },
  { top: 'Гарантия', middle: '10 лет', bottom: 'на смесители' },
  { top: 'Сервис', middle: '200+', bottom: 'центров в РФ' },
  { top: 'Доверие', middle: '99%', bottom: 'клиентов', note: '' },
];

export default function AboutPage() {
  return (
    <main>
      <HeaderWithSuspense />
      <Banner />
      <AboutBrand />
      {/*<HistoryTimeline />*/}

      {/* Two Column Info */}
      <section
        className="wrapper_centering py-24 mx-auto"
        style={{
          paddingBlock: '96px',
        }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCardAccordion {...card1} />
          <InfoCardAccordion {...card2} />
        </div>
        <div className="mt-24 w-full">
          <InfoCardAccordion {...card3} />
        </div>
      </section>

      {/* Infographics */}
      {/*<section*/}
      {/*  className="wrapper_centering bg-white w-full mx-auto"*/}
      {/*  style={{ paddingBottom: '96px' }}*/}
      {/*>*/}
      {/*<div className="overflow-hidden overflow-x-auto">*/}
      {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-5 border_solid border-dark-100 rounded-[18px] min-w-[1154px]">*/}
      {/*  /!* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-[#1d1d1d] py-5 border_solid border-[#1d1d1d] rounded-[18px] min-w-[1154px]"> *!/*/}
      {/*  {metrics.map((metric, index) => (*/}
      {/*    <div*/}
      {/*      key={index}*/}
      {/*      className={cn(*/}
      {/*        'flex items-center justify-center h-36',*/}

      {/*        'border-r border-dark-100',*/}
      {/*        'sm:last:border-r-0',*/}
      {/*        'md:nth-[4n]:border-r-0'*/}
      {/*      )}*/}
      {/*    >*/}
      {/*      <div className="text-center px-4">*/}
      {/*        <p className="text-sm text-dark-100 font-medium">{metric.top}</p>*/}
      {/*        <p className="text-[32px] leading-[30px] font-bold text-[#009B3E] my-1.5">*/}
      {/*          {metric.middle}*/}
      {/*          {metric.note && <sup className="text-xl font-semibold">{metric.note}</sup>}*/}
      {/*        </p>*/}
      {/*        <p className="text-sm text-[#1d1d1d] font-medium">{metric.bottom}</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*</div>*/}

      {/*<div className="mt-7 text-sm leading-6 text-[#1D1D1D] opacity-70">*/}
      {/*  <p>*9 изделий из 10 000 в год; по данным аналитического центра «СКЛ».</p>*/}
      {/*  <p>*/}
      {/*    **исследование на знание брендов сантехники, выборка 1000 чел., компания OMI, декабрь*/}
      {/*    2022 г.*/}
      {/*  </p>*/}
      {/*  <p>*/}
      {/*    ***81,5% опрошенных готовы рекомендовать бренд LAMIS®; исследование «Мнение сантехников*/}
      {/*    о бренде водосливной арматуры LAMIS®», агентство BCGroup, 2024 г.*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*</section>*/}

      <Footer />
    </main>
  );
}
