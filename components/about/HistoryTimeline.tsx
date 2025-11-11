'use client';

import { historyData } from '@/data/historyData';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { TimelineCard } from './TimelineCard';
import { IntroCard } from './IntroCard';

export const HistoryTimeline = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const scrollRef = useHorizontalScroll(isDesktop);

  if (isDesktop) {
    return (
      <div
        ref={scrollRef}
        className="flex overflow-x-auto cursor-grab space-x-8 py-10 pl-10 pr-20 no-scrollbar container"
      >
        {historyData.map((item, index) =>
          item.type === 'intro' ? (
            <IntroCard key={index} title={item.title} description={item.description[0]} />
          ) : (
            <TimelineCard
              key={index}
              year={item.year!}
              title={item.title}
              description={item.description}
              image={item.image!}
            />
          )
        )}
      </div>
    );
  }

  const introItem = historyData.find((item) => item.type === 'intro');
  const eventItems = historyData.filter((item) => item.type === 'event');

  return (
    <div className="py-10">
      {introItem && (
        <div className="px-4 mb-8 text-center">
          <IntroCard title={introItem.title} description={introItem.description[0]} />
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex overflow-x-auto cursor-grab space-x-8 pl-4 pr-4 no-scrollbar"
      >
        {eventItems.map((item, index) => (
          <TimelineCard
            key={index}
            year={item.year!}
            title={item.title}
            description={item.description}
            image={item.image!}
          />
        ))}
      </div>
    </div>
  );
};
