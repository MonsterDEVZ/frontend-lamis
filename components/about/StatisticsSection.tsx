interface StatisticData {
  metric: string;
  description: string;
  footnote?: string;
}

const statisticsData: StatisticData[] = [
  {
    metric: '10 000 000',
    description: 'довольных клиентов по всему миру',
    footnote: '1',
  },
  {
    metric: '15+',
    description: 'лет опыта в индустрии сантехники',
  },
  {
    metric: 'ТОП-3',
    description: 'производителей в Центральной Азии',
    footnote: '2',
  },
  {
    metric: '500+',
    description: 'моделей в ассортименте',
  },
  {
    metric: '25',
    description: 'стран, куда мы экспортируем продукцию',
  },
  {
    metric: '200+',
    description: 'квалифицированных сотрудников',
  },
  {
    metric: '15 000 м²',
    description: 'площадь производственного комплекса',
  },
  {
    metric: '99.5%',
    description: 'положительных отзывов от клиентов',
    footnote: '3',
  },
];

export default function StatisticsSection() {
  return (
    <section className="max-w-[1250px] mx-auto py-16 px-4">
      <div className="space-y-8">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          LAMIS в цифрах
        </h2>

        {/* Statistics Grid */}
        <div className="border border-gray-300 rounded-lg p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statisticsData.map((stat, index) => (
              <div
                key={index}
                className={`
                  flex flex-col items-center text-center
                  ${
                    // Add right border to all items except last in row
                    index % 4 !== 3 ? 'lg:border-r lg:border-gray-300' : ''
                  }
                  ${
                    // For small screens, add border except for even-indexed items (0-based, so odd positions)
                    index % 2 === 0 ? 'sm:border-r sm:border-gray-300 lg:border-r-0' : ''
                  }
                  ${
                    // Remove border for last item on small screens when it's odd
                    index === statisticsData.length - 1 && index % 2 === 0
                      ? 'sm:border-r-0'
                      : ''
                  }
                  ${
                    // Re-add border for lg screens based on position
                    index % 4 === 0 || index % 4 === 1 || index % 4 === 2
                      ? 'lg:border-r lg:border-gray-300'
                      : 'lg:border-r-0'
                  }
                `}
              >
                {/* Metric */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-[#009B3E]">
                    {stat.metric}
                  </span>
                  {stat.footnote && (
                    <sup className="text-lg text-[#009B3E] font-semibold">{stat.footnote}</sup>
                  )}
                </div>

                {/* Description */}
                <p className="text-base text-gray-700 mt-3">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footnotes */}
        <div className="space-y-2">
          <p className="text-xs text-gray-500">
            <sup>1</sup> По данным внутренней аналитики компании за период 2010-2025 гг.
          </p>
          <p className="text-xs text-gray-500">
            <sup>2</sup> По результатам исследования рынка сантехники Центральной Азии, проведенного
            независимым агентством MarketResearch Asia в 2024 году.
          </p>
          <p className="text-xs text-gray-500">
            <sup>3</sup> На основе отзывов клиентов, размещенных на официальных платформах и в
            социальных сетях за последние 12 месяцев.
          </p>
        </div>
      </div>
    </section>
  );
}
