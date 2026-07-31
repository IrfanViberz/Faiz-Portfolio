'use client';

import { motion } from 'framer-motion';
import type { ValueAboutItem } from '@/lib/about';

interface ValueCardProps {
  item: ValueAboutItem;
  index: number;
}

export default function ValueCard({ item, index }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      className="p-6 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-300 hover:border-[var(--text-tertiary)] border-l-4 border-l-[var(--invert-bg)]"
    >
      <h3 className="text-base font-medium text-[var(--text-primary)] mb-3 transition-colors duration-500">
        {item.title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
        {item.description}
      </p>
    </motion.div>
  );
}
