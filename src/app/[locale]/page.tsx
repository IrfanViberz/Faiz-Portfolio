import HeroSection from '@/sections/home/HeroSection';
import ExperienceSection from '@/sections/home/ExperienceSection';
import StackSection from '@/sections/home/StackSection';
import ResumeSection from '@/sections/home/ResumeSection';
import ValueSection from '@/sections/home/ValueSection';
import CTASection from '@/sections/home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ExperienceSection />
      <StackSection />
      <ResumeSection />
      <ValueSection />
      <CTASection />
    </div>
  );
}
