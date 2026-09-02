'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, ShieldCheck, Users } from 'lucide-react';
import type { ValueAboutItem } from '@/lib/about';

interface ValueCardProps {
  item: ValueAboutItem;
  index: number;
}

const icons = [TrendingUp, Target, ShieldCheck, Users];

export default function ValueCard({ item, index }: ValueCardProps) {
  const Icon = icons[index % icons.length];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      className="p-6 sm:p-7 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-all duration-300 hover:border-[var(--text-tertiary)] shadow-sm flex flex-col justify-between"
    >
      <div>
        {/* Top bar: Clean Icon + Subtle Index Number */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center">
            <Icon className="w-5 h-5 text-[var(--text-primary)]" />
          </div>
          <span className="text-xs font-mono text-[var(--text-tertiary)] tracking-wider">
            {num}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2.5 transition-colors duration-500">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
