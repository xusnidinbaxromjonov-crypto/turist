import { HeroSection } from '../sections/HeroSection';
import { SmartMapSection } from '../sections/SmartMapSection';
import { DiscoverSection } from '../sections/DiscoverSection';
import { RoutesSection } from '../sections/RoutesSection';
import { TripPlannerSection } from '../sections/TripPlannerSection';
import { BusinessesSection } from '../sections/BusinessesSection';
import { StatisticsSection } from '../sections/StatisticsSection';
import { WhyFargonaSection } from '../sections/WhyFargonaSection';
import { GovernmentSection } from '../sections/GovernmentSection';
import { EventsGallerySection } from '../sections/EventsGallerySection';
import { MobileAppSection } from '../sections/MobileAppSection';

export const Home = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SmartMapSection />
      <DiscoverSection />
      <RoutesSection />
      <TripPlannerSection />
      <BusinessesSection />
      <StatisticsSection />
      <WhyFargonaSection />
      <GovernmentSection />
      <EventsGallerySection />
      <MobileAppSection />
    </div>
  );
};
