import HeroSection from "../components/home/HeroSection";
import ServiceCards from "../components/home/ServiceCards";
import FeatureSection from "../components/home/FeatureSection";
import NoticeSection from "../components/home/NoticeSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceCards />
      <FeatureSection />
      <NoticeSection />
    </>
  );
}
