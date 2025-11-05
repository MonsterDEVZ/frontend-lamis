import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WaterHeatersSection from "@/components/WaterHeatersSection";
import CollectionsSection from "@/components/CollectionsSection";
import ReviewsSection from "@/components/ReviewsSection";

export default function HomePage() {
  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSection />
      </div>
      <WaterHeatersSection />
      <CollectionsSection />
      <ReviewsSection />
      {/* Остальные секции будут добавлены позже */}
    </main>
  );
}
