'use client';

import { useState } from 'react';
import HeaderWithSuspense from '@/components/header/HeaderWithSuspense';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/feedback/FeedbackModal';
import { HeroSection } from '@/components/service-center/HeroSection';
import { WarrantyPeriodsSection } from '@/components/service-center/WarrantyPeriodsSection';
import { KeyRulesSection } from '@/components/service-center/KeyRulesSection';
import { WarrantyTermsAccordion } from '@/components/service-center/WarrantyTermsAccordion';
import { CTASection } from '@/components/service-center/CTASection';

export default function ServiceCenterPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <HeaderWithSuspense />

      <main className="pt-24 bg-white">
        <HeroSection />
        <WarrantyPeriodsSection />
        <KeyRulesSection />
        <WarrantyTermsAccordion />
        <CTASection onOpenModal={() => setIsModalOpen(true)} />
      </main>

      <Footer />
      <FeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
