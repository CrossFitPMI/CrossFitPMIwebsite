import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/AboutHero';
import AboutMission from '@/components/AboutMission';
import Community from '@/components/Community';
import CoachesSection from '@/components/CoachesSection';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import MapSection from '@/components/MapSection';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutMission />
        <Community />
        <CoachesSection />
        <ReviewsMarquee />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}

