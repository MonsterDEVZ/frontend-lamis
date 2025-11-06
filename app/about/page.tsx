import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import InteractiveBrandSection from '@/components/about/InteractiveBrandSection';
import HistoryTimelineSection from '@/components/about/HistoryTimelineSection';
import TwoColumnContentSection from '@/components/about/TwoColumnContentSection';
import FullWidthContentSection from '@/components/about/FullWidthContentSection';
import StatisticsSection from '@/components/about/StatisticsSection';

export default function AboutPage() {
  return (
    <main>
      <Header />
      <div className="pt-[110px]">
        <InteractiveBrandSection />
        <HistoryTimelineSection />
        <TwoColumnContentSection />
        <FullWidthContentSection />
        <StatisticsSection />
      </div>
      <Footer />
    </main>
  );
}
