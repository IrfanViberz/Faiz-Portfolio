import Section from '@/components/ui/Section';
import Timeline from '@/components/about/Timeline';
import { timeline } from '@/lib/about';

export default function JourneySection() {
  return (
    <Section id="journey" title="02. My Journey & Education">
      <Timeline items={timeline} />
    </Section>
  );
}
