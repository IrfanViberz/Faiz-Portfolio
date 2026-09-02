'use client';

import Section from '@/components/ui/Section';
import Timeline from '@/components/about/Timeline';
import { useTranslations } from 'next-intl';
import type { TimelineEntry } from '@/lib/about';

export default function JourneySection() {
  const t = useTranslations('about.journey');
  const items = t.raw('items') as TimelineEntry[];

  return (
    <Section id="journey" title={t('title')}>
      <Timeline items={items} />
    </Section>
  );
}
