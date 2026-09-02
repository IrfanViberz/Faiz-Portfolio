'use client';

import { Laptop } from 'lucide-react';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { useTranslations } from 'next-intl';

export default function HardwareSection() {
  const t = useTranslations('projects.hardware');

  return (
    <Section title={t('title')} subtitle={t('subtitle')}>
      <div className="border border-[var(--border-color)] rounded-md p-6 sm:p-8 bg-[var(--bg-secondary)] transition-colors duration-500 relative z-10 border-l-4 border-l-[var(--invert-bg)]">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          {/* Icon */}
          <div className="mt-1 shrink-0">
            <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors duration-500 border border-[var(--border-color)]">
              <Laptop className="w-5 h-5 text-[var(--text-primary)]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow max-w-2xl">
            <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
              {t('cardTitle')}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 transition-colors duration-500">
              {t('cardDesc')}
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge highlight>Meta (Facebook) Ads</Badge>
              <Badge highlight>Shopee Ads</Badge>
              <Badge>Hardware Diagnostics</Badge>
              <Badge>Market Arbitrage</Badge>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
