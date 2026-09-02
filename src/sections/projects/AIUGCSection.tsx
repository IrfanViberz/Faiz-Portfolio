'use client';

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import LinkButton from '@/components/ui/LinkButton';

export default function AIUGCSection() {
  const t = useTranslations('projects.aiUgc');

  return (
    <Section title={t('title')} subtitle={t('subtitle')}>
      <div className="space-y-6 relative z-10">
        {/* TikTok AI UGC Card */}
        <div className="border border-[var(--border-color)] rounded-md p-6 sm:p-8 bg-[var(--bg-secondary)] transition-colors duration-500 border-l-4 border-l-[var(--invert-bg)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
              {/* Icon */}
              <div className="mt-1 shrink-0">
                <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors duration-500 border border-[var(--border-color)] overflow-hidden p-1.5">
                  <img src="/logos/tiktok-logo.png" alt="TikTok Logo" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow max-w-2xl">
                <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
                  {t('tiktokTitle')}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 transition-colors duration-500">
                  {t('tiktokDesc')}
                </p>
                <div className="flex gap-2 flex-wrap mb-6 sm:mb-0">
                  <Badge highlight>TikTok Ads Manager</Badge>
                  <Badge>Google Flow</Badge>
                  <Badge>AI Automation</Badge>
                  <Badge>ROAS Optimization</Badge>
                </div>
              </div>
            </div>

            {/* Link */}
            <div className="flex flex-col gap-3 min-w-[160px] shrink-0 sm:self-center">
              <LinkButton href="https://www.tiktok.com/@snowwies_" icon={ArrowUpRight} primary>
                {t('viewTiktok')}
              </LinkButton>
            </div>
          </div>
        </div>

        {/* YouTube Shorts AI & Video Edits Channel Card */}
        <div className="border border-[var(--border-color)] rounded-md p-6 sm:p-8 bg-[var(--bg-secondary)] transition-colors duration-500 border-l-4 border-l-red-500">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
              {/* Icon */}
              <div className="mt-1 shrink-0">
                <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center transition-colors duration-500 border border-[var(--border-color)] overflow-hidden p-1.5">
                  <img src="/logos/youtube-logo.png" alt="YouTube Logo" className="w-full h-full object-contain" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow max-w-2xl">
                <h3 className="text-xl font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
                  {t('youtubeTitle')}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 transition-colors duration-500">
                  {t('youtubeDesc')}
                </p>
                <div className="flex gap-2 flex-wrap mb-4 sm:mb-0">
                  <Badge highlight>Video Editing &amp; Storytelling</Badge>
                  <Badge highlight>n8n Automation</Badge>
                  <Badge>Google Flow (Omni Flash)</Badge>
                  <Badge>GPT-4o &amp; ElevenLabs</Badge>
                  <Badge>Flux AI &amp; Creatomate</Badge>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[210px] shrink-0 lg:self-center">
              <a
                href="https://youtube.com/@winking2608?si=RfJ8sTNXnMuD_Ufn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 shadow-xs transition-all duration-300 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4 text-red-600 shrink-0" />
                <span>{t('viewVideoEdits')}</span>
              </a>
              <a
                href="https://www.youtube.com/@beforeyouscroll26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 shadow-xs transition-all duration-300 cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>{t('viewAiChannel')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
