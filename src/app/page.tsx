import HeroSection from '@/sections/home/HeroSection';
import ValueSection from '@/sections/home/ValueSection';
import ExperienceSection from '@/sections/home/ExperienceSection';
import StackSection from '@/sections/home/StackSection';
import ResumeSection from '@/sections/home/ResumeSection';
import CTASection from '@/sections/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValueSection />
      <ExperienceSection />
      <StackSection />
      <ResumeSection />
      <CTASection />
    </>
  );
}
