import Section from '@/components/ui/Section';
import InterestCard from '@/components/about/InterestCard';
import { interests } from '@/lib/about';

export default function BeyondCodingSection() {
  return (
    <Section id="beyond-coding" title="04. Beyond The Code">
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl transition-colors duration-500">
        What shapes an engineer is not only what they build, but how they live. These pursuits keep
        the mindset sharp, grounded, and always evolving.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {interests.map((item, i) => (
          <InterestCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
