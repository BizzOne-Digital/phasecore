import Hero from '../components/sections/Hero';
import CapabilityAreas from '../components/sections/CapabilityAreas';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChoose from '../components/sections/WhyChoose';
import PortfolioPreview from '../components/sections/PortfolioPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityAreas />
      <ServicesSection />
      <WhyChoose />
      <PortfolioPreview />
    </>
  );
}
