'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pt-32 pb-20 border-b border-[var(--border-color)] transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            {/* Status badge */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse transition-colors duration-500" />
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider transition-colors duration-500">
                {t('badge')}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] text-[var(--text-primary)] mb-8 transition-colors duration-500">
              {t('headline')}
            </h1>

            {/* Description */}
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 transition-colors duration-500">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[var(--invert-bg)] text-[var(--invert-text)] hover:opacity-80 transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                {t('ctaHire')}
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
                {t('ctaProjects')}
              </Link>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden transition-colors duration-500 shadow-sm group">
              <img
                src="/profile.png"
                alt="Mohamad Faiz Irfan"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[var(--text-tertiary)] -z-10">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center mb-3">
                  <User className="w-8 h-8 text-[var(--text-tertiary)]" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                  Profile Photo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
