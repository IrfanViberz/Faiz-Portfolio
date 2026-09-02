'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { useTranslations } from 'next-intl';

export default function ValueSection() {
  const t = useTranslations('value');
  const items = t.raw('items') as { title: string; desc: string }[];

  return (
    <Section id="value" title={t('title')}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
            className="p-6 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-500 hover:border-[var(--text-tertiary)]"
          >
            <h3 className="text-base font-medium text-[var(--text-primary)] mb-3 transition-colors duration-500">
              {item.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
