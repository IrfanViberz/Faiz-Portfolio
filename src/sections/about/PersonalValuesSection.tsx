'use client';

import Section from '@/components/ui/Section';
import ValueCard from '@/components/about/ValueCard';
import { useTranslations } from 'next-intl';
import type { ValueAboutItem } from '@/lib/about';

export default function PersonalValuesSection() {
  const t = useTranslations('about.values');
  const items = t.raw('items') as ValueAboutItem[];

  return (
    <Section id="values" title={t('title')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
        {items.map((item, i) => (
          <ValueCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
