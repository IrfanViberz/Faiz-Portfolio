'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`py-24 border-b border-[var(--border-color)] transition-colors duration-500 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {title && (
          <h2 className="text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-widest mb-12 transition-colors duration-500">
            {title}
          </h2>
        )}
        {children}
      </div>
    </motion.section>
  );
}
