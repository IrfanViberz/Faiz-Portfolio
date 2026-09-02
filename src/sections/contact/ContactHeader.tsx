'use client';

import { useTranslations } from 'next-intl';

export default function ContactHeader() {
  const t = useTranslations('contact.header');
  return (
    <section className="pt-32 pb-16 border-b border-[var(--border-color)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tighter text-[var(--text-primary)] mb-4 transition-colors duration-500">
          {t('title')}
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl text-lg transition-colors duration-500">
          {t('description')}
        </p>
      </div>
    </section>
  );
}
