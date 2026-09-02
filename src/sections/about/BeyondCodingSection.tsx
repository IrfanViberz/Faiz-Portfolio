'use client';

import Section from '@/components/ui/Section';
import InterestCard from '@/components/about/InterestCard';
import { useTranslations } from 'next-intl';
import type { InterestItem } from '@/lib/about';

// Icons and images are locale-independent — only text changes
const interestMeta = [
  { icon: 'ShoppingBag', image: '/interests/tiktok.jpg' },
  { icon: 'Wrench', image: '/interests/hardware.png' },
  { icon: 'Gamepad2', image: '/interests/gaming.png' },
  { icon: 'Dumbbell', image: '/interests/fitness.jpg' },
  { icon: 'Cpu', image: '/interests/tech.png', images: ['/interests/tech.png', '/interests/learning.png'] },
  { icon: 'Trophy', image: '/interests/sports.jpg' },
];

export default function BeyondCodingSection() {
  const t = useTranslations('about.beyondCoding');
  const interestTexts = t.raw('interests') as { title: string; description: string }[];

  const interests: InterestItem[] = interestTexts.map((text, i) => ({
    ...text,
    icon: interestMeta[i].icon,
    image: interestMeta[i].image,
    images: interestMeta[i].images,
  }));

  return (
    <Section id="beyond-coding" title={t('title')}>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl transition-colors duration-500">
        {t('description')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {interests.map((item, i) => (
          <InterestCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </Section>
  );
}
