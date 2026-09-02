import AboutIntro from '@/sections/about/AboutIntro';
import JourneySection from '@/sections/about/JourneySection';
import PhilosophySection from '@/sections/about/PhilosophySection';
import BeyondCodingSection from '@/sections/about/BeyondCodingSection';
import PersonalValuesSection from '@/sections/about/PersonalValuesSection';
import CurrentGoalsSection from '@/sections/about/CurrentGoalsSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutIntro />
      <JourneySection />
      <PhilosophySection />
      <BeyondCodingSection />
      <PersonalValuesSection />
      <CurrentGoalsSection />
    </div>
  );
}
