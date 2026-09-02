'use client';

import { motion } from 'framer-motion';
import { MapPin, Code2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function AboutIntro() {
  const t = useTranslations('about.intro');
  const profileFields = t.raw('profileFields') as { label: string; value: string }[];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-32 pb-24 border-b border-[var(--border-color)] transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Status badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse transition-colors duration-500" />
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider transition-colors duration-500">
            {t('badge')}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text */}
          <div className="lg:col-span-8 space-y-5">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] text-[var(--text-primary)] transition-colors duration-500"
            >
              Mohamad Faiz Irfan
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-tertiary)] transition-colors duration-500 bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                <Code2 className="w-4 h-4 text-[var(--accent)]" />
                <span>{t('role')}</span>
              </div>
              <span className="text-[var(--border-color)]">/</span>
              <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-tertiary)] transition-colors duration-500 bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span>{t('location')}</span>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl transition-colors duration-500"
            >
              {t('bio1')}
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl transition-colors duration-500"
            >
              {t('bio2')}
            </motion.p>
          </div>

          {/* Right summary card */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-500 shadow-md">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest transition-colors duration-500">
                  {t('quickProfile')}
                </span>
                <div className="relative overflow-hidden rounded-md border border-[var(--border-color)] animate-float-subtle shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer shrink-0">
                  <img
                    src="/kelantan-flag.png"
                    alt="Kelantan Flag"
                    title="Kelantan, Malaysia"
                    className="w-36 h-20 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {profileFields.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-0.5 pb-3 border-b border-[var(--border-color)] last:border-0 last:pb-0 transition-colors duration-500"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] transition-colors duration-500">
                      {label}
                    </span>
                    <span className="text-sm text-[var(--text-primary)] transition-colors duration-500">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
