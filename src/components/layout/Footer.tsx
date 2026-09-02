'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="py-8 border-t border-[var(--border-color)] transition-colors duration-500 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-[var(--text-tertiary)] font-mono transition-colors duration-500">
          {t('rights')}
        </div>
        <div className="text-sm text-[var(--text-secondary)] font-mono text-center md:text-right transition-colors duration-500">
          {t('tagline')}
        </div>
      </div>
    </footer>
  );
}
