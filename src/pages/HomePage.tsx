import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import TrendingSection from '../components/home/TrendingSection';
import PromoBanner from '../components/home/PromoBanner';
import FeaturesSection from '../components/home/FeaturesSection';
import PromoCardsSection from '../components/home/PromoCardsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FaqSection from '../components/home/FaqSection';

export default function HomePage() {
  useEffect(() => {
    document.title = 'TechSelf - React Electronics E-Commerce Template';
  }, []);

  return (
    <>
      <HeroSection />
      <CategorySection />
      <TrendingSection />
      <PromoBanner />
      <FeaturesSection />
      <PromoCardsSection />
      <TestimonialsSection />
      <FaqSection />
    </>
  );
}
