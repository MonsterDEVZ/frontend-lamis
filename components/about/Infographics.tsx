import React from 'react';

interface MetricProps {
  top: string;
  middle: string;
  bottom: string;
  note?: string;
}

const Metric: React.FC<MetricProps> = ({ top, middle, bottom, note }) => (
  <div className="text-center px-4">
    <p className="text-sm text-gray-500 uppercase tracking-wider">{top}</p>
    <p className="text-5xl lg:text-6xl font-bold text-green-600 my-2">
      {middle}
      {note && <sup className="text-xl font-semibold">{note}</sup>}
    </p>
    <p className="text-sm text-gray-500">{bottom}</p>
  </div>
);

const Infographics: React.FC = () => {
  const metrics = [
    { top: 'продано более', middle: '10 000 000', bottom: 'смесителей', note: '*' },
    { top: 'качество', middle: '0,09%', bottom: 'брака', note: '**' },
    { top: 'в компании', middle: 'ТОП-3', bottom: 'производителей' },
    { top: 'на рынке', middle: '15 лет', bottom: 'опыта' },
    { top: 'сотрудников', middle: '500+', bottom: 'в штате' },
    { top: 'гарантия', middle: '10 лет', bottom: 'на смесители' },
    { top: 'сервис', middle: '200+', bottom: 'центров в РФ' },
    { top: 'доверие', middle: '99%', bottom: 'клиентов', note: '***' },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto">
        <div className="bg-white rounded-2xl p-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-16">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="relative flex items-center justify-center 
                          sm:after:content-[''] sm:after:absolute sm:after:right-0 sm:after:top-1/2 sm:after:-translate-y-1/2 sm:after:h-2/3 sm:after:w-[1px] sm:after:bg-gray-200
                          md:after:content-[''] md:after:absolute md:after:right-0 md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-2/3 md:after:w-[1px] md:after:bg-gray-200
                          sm:[&:nth-child(2n)]:after:hidden
                          md:[&:nth-child(4n)]:after:hidden"
              >
                <Metric {...metric} />
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-xs text-gray-400 space-y-2">
            <p>* По данным за 2024 год.</p>
            <p>** По результатам внутреннего контроля качества.</p>
            <p>*** Уровень удовлетворенности по данным опросов клиентов.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Infographics;
