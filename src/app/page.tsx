import HeroSection from "../components/home/HeroSection";
import ServiceCards from "../components/home/ServiceCards";
import FeatureSection from "../components/home/FeatureSection";
import DirectorSection from "../components/about/DirectorSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <FeatureSection />
      <DirectorSection />
    </>
  );
}
