'use client';

import { useState } from 'react';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import HeroSlider from '@/components/HeroSlider';
import WaterHeatersSection from '@/components/WaterHeatersSection';
import BleskWaterHeatersSection from '@/components/BleskWaterHeatersSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import ServiceCardsSection from '@/components/ServiceCardsSection';
import MaterialsSection from '@/components/MaterialsSection';
import Footer from '@/components/Footer';
import PlumbingSection from '@/components/PlumbingSection';
import FeedbackModal from '@/components/feedback/FeedbackModal';
// import CooperationForm from '@/components/forms/CooperationForm';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <HeaderWithSuspense />
      <HeroSlider />
      <WaterHeatersSection />
      <PlumbingSection />
      <BleskWaterHeatersSection />
      <FeaturesSection />
      <AboutSection />
      <ServiceCardsSection />
      <MaterialsSection />
      {/* <CooperationForm /> */}

      <Footer />
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
