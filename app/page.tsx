import Header from '@/components/header/Header';
import HeroSlider from '@/components/HeroSlider';
import WaterHeatersSection from '@/components/WaterHeatersSection';
import BleskWaterHeatersSection from '@/components/BleskWaterHeatersSection';
import Collections from '@/components/Collections';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import ServiceCardsSection from '@/components/ServiceCardsSection';
import MaterialsSection from '@/components/MaterialsSection';
import Footer from '@/components/Footer';
import PlumbingSection from '@/components/PlumbingSection';

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <WaterHeatersSection />
      <PlumbingSection />
      <BleskWaterHeatersSection />
      <Collections />
      <FeaturesSection />
      <AboutSection />
      <ServiceCardsSection />
      <MaterialsSection />
      <Footer />
    </main>
  );
}
