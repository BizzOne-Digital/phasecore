import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChoose from '../components/sections/WhyChoose';
import PortfolioPreview from '../components/sections/PortfolioPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <WhyChoose />
      <PortfolioPreview />
    </>
  );
}
