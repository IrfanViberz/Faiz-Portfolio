'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
}: SectionProps) {
  // Parse numbered section titles like "01. Side Projects"
  const numberMatch = title?.match(/^(\d{2})\.\s*(.+)$/);
  const number = numberMatch ? numberMatch[1] : null;
  const cleanTitle = numberMatch ? numberMatch[2] : title;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`pt-10 pb-20 sm:pb-24 border-b border-[var(--border-color)] transition-colors duration-500 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {title && (
          <div className="mb-10 sm:mb-12">
            {number ? (
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] transition-colors duration-300">
                    SECTION {number}
                  </span>
                  <div className="h-px flex-1 max-w-xs bg-[var(--border-color)] transition-colors duration-300" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-500">
                  {cleanTitle}
                </h2>
              </div>
            ) : (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-500">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-2.5 text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed transition-colors duration-500">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
