import Header from '@/components/header/Header';
import Footer from '@/components/Footer';
import Banner from '@/components/about/Banner';
import AboutBrand from '@/components/about/AboutBrand';
import HorizontalSwiper from '@/components/about/HorizontalSwiper';
import TwoColumnInfo from '@/components/about/TwoColumnInfo';
import OneColumnInfo from '@/components/about/OneColumnInfo';
import Infographics from '@/components/about/Infographics';

export default function AboutPage() {
  return (
    <main>
      <Header />
      <Banner />
      <AboutBrand />
      <HorizontalSwiper />
      <TwoColumnInfo />
      <OneColumnInfo />
      <Infographics />
      <Footer />
    </main>
  );
}
