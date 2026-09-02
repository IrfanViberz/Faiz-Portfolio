'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="pb-32 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center border-t border-[var(--border-color)] pt-32 transition-colors duration-500">
        <h2 className="text-3xl font-medium tracking-tight text-[var(--text-primary)] mb-6 transition-colors duration-500">
          {t('title')}
        </h2>
        <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10 transition-colors duration-500">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-amber-500 hover:bg-amber-400 text-black shadow-md transition-all duration-300"
          >
            <MessageSquare className="w-4 h-4 text-black" />
            {t('button')}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
