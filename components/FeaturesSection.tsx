import SectionHeading from './SectionHeading';
import FeatureCard from './FeatureCard';
import { features } from '@/data/features';

export default function FeaturesSection() {
  return (
    <section className="wrapper_centering pb-24">
      <SectionHeading>Почему выбирают «Lamis»</SectionHeading>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* First row - 3 cards */}
        {features.slice(0, 3).map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}

        {/* Second row - 2 cards */}
        {features.slice(3, 5).map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
}
