'use client';
import { historyData } from '@/data/historyData';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { TimelineCard } from './TimelineCard';
import { IntroCard } from './IntroCard';

export const HistoryTimeline = () => {
  const scrollRef = useHorizontalScroll();

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto cursor-grab space-x-8 py-10 pl-10 pr-20 no-scrollbar"
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
};
