'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Laptop, Maximize2, X } from 'lucide-react';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { useTranslations } from 'next-intl';

export default function HardwareSection() {
  const t = useTranslations('projects.hardware');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Section title={t('title')} subtitle={t('subtitle')}>
      <div className="border border-[var(--border-color)] rounded-md p-6 sm:p-8 bg-[var(--bg-secondary)] transition-colors duration-500 relative z-10 border-l-4 border-l-[var(--invert-bg)]">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-between">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-grow">
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
                <Badge>Hardware Repair</Badge>
                <Badge>Used Item Sales</Badge>
              </div>
            </div>
          </div>

          {/* Photo Showcase */}
          <div className="w-full lg:w-80 shrink-0">
            <div
              onClick={() => setIsExpanded(true)}
              className="relative w-full h-52 sm:h-56 rounded-md overflow-hidden border border-[var(--border-color)] bg-[var(--bg-tertiary)] cursor-pointer group shadow-sm"
            >
              <Image
                src="/projects/hardware-repair.jpeg"
                alt="Laptop hardware repair & diagnostics"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-white text-xs font-mono flex items-center gap-1.5 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full rounded-lg overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[60vh] sm:h-[75vh]">
              <Image
                src="/projects/hardware-repair.jpeg"
                alt="Laptop hardware repair & diagnostics"
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
