import Section from '@/components/ui/Section';
import ValueCard from '@/components/about/ValueCard';
import { valuesAbout } from '@/lib/about';

export default function PersonalValuesSection() {
  return (
    <Section id="values" title="05. Personal Values">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {valuesAbout.map((item, i) => (
          <ValueCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
