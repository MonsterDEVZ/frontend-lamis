import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/about/Banner';
import AboutBrand from '@/components/about/AboutBrand';
import InfoCardAccordion from '@/components/about/InfoCardAccordion';
import { HistoryTimeline } from '@/components/about/HistoryTimeline';
import { cn } from '@/styles';

const card1 = {
  title: 'Премиум, доступный каждому',
  description: `Продукты IDDIS® созданы, чтобы превосходить ожидания. Они предлагают новый уровень эстетики, надёжности, красоты и удовольствия от повседневных ритуалов. IDDIS® – это премиальное качество, продуманность и дизайн, сопоставимые с европейскими брендами, по цене, доступной среднему россиянину.<br/>• Новый уровень надёжности. Наши продукты разработаны для длительной службы и отличаются исключительной надёжностью. Мы тщательно тестируем каждую деталь, чтобы обеспечить удобство использования, интуитивный принцип работы и простой монтаж.<br/>• Новый уровень дизайна. Наш дизайн вне времени. Он легко переживёт быстротечные тренды, даря ежедневную радость от красивых, удобных продуктов, которые безупречно работают в течение многих лет.<br/>• Новый уровень сервиса. Экспертиза наших сотрудников и партнёров гарантирует всестороннюю поддержку на каждом этапе – от выбора продукта до установки и обслуживания. Мы предлагаем консультирование на установку и покупки и гарантируем поставку запасных частей даже спустя долгое время после прекращения производства модели.`,
  imageUrl: '/images/about-brand.png', // Placeholder image
};
const card2 = {
  title: 'Экспертиза, проверенная временем и стандартами',
  description: `Наша приверженность качеству подтверждена не только нашей репутацией, но и строгими стандартами, которые мы соблюдаем:<br/>• Уровень тестирования нашей продукции значительно выше, чем у других российских марок. Трёхступенчатая система контроля включает входной контроль материалов, промежуточный контроль на всех этапах производства и итоговый контроль готовой продукции.`,
  imageUrl: '/images/about-brand.png', // Placeholder image
};

const card3 = {
  title: 'Дизайнерские решения, созданные для жизни',
  description: `Мы используем только высококачественные материалы и современные технологии. Наши заводы оснащены передовым оборудованием, что позволяет нам контролировать качество на каждом этапе производства. Мы гордимся тем, что наша продукция соответствует самым высоким мировым стандартам.
  <br/>
  Мы используем только высококачественные материалы и современные технологии. Наши заводы оснащены передовым оборудованием, что позволяет нам контролировать качество на каждом этапе производства. Мы гордимся тем, что наша продукция соответствует самым высоким мировым стандартам.
  `,
  imageUrl: '/images/about-brand.png', // Placeholder image
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
      <Header />
      <Banner />
      <AboutBrand />

      <HistoryTimeline />

      {/* Two Column Info */}
      <section
        className="container py-24"
        style={{
          paddingBlock: '96px',
        }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCardAccordion {...card1} />
          <InfoCardAccordion {...card2} />
        </div>

        {/* One Column Info */}
        <div className="mt-24 w-full">
          <InfoCardAccordion {...card3} />
        </div>
      </section>

      {/* Infographics */}
      <section className="container bg-white w-full" style={{ paddingBottom: '96px' }}>
        <div className="overflow-hidden overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-5 border_solid border-[#1d1d1d] rounded-[18px] min-w-[1154px]">
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-[#1d1d1d] py-5 border_solid border-[#1d1d1d] rounded-[18px] min-w-[1154px]"> */}
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-center h-36',
                  index === 3 || index === 7 ? '' : 'border_right border-[#1d1d1d]'
                )}
              >
                <div className="text-center px-4">
                  <p className="text-sm text-[#1d1d1d] font-medium">{metric.top}</p>
                  <p className="text-[32px] leading-[30px] font-bold text-[#009B3E] my-1.5">
                    {metric.middle}
                    {metric.note && <sup className="text-xl font-semibold">{metric.note}</sup>}
                  </p>
                  <p className="text-sm text-[#1d1d1d] font-medium">{metric.bottom}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 text-sm leading-6 text-[#1D1D1D] opacity-70">
          <p>*9 изделий из 10 000 в год; по данным аналитического центра «СКЛ».</p>
          <p>
            **исследование на знание брендов сантехники, выборка 1000 чел., компания OMI, декабрь
            2022 г.
          </p>
          <p>
            ***81,5% опрошенных готовы рекомендовать бренд LAMIS®; исследование «Мнение сантехников
            о бренде водосливной арматуры LAMIS®», агентство BCGroup, 2024 г.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
