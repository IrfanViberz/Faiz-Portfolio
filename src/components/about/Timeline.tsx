'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import type { TimelineEntry } from '@/lib/about';

interface TimelineProps {
  items: TimelineEntry[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border-color)] transition-colors duration-500 hidden md:block" />

      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 relative"
          >
            {/* Dot on timeline */}
            <div className="hidden md:flex md:col-span-1 justify-start pt-1.5">
              <div className="w-[15px] h-[15px] rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-primary)] transition-colors duration-500 z-10 shrink-0" />
            </div>

            {/* Period */}
            <div className="md:col-span-2 pt-0.5">
              <span className="text-xs font-mono text-[var(--text-tertiary)] transition-colors duration-500">
                {item.period}
              </span>
            </div>

            {/* Content */}
            <div className="md:col-span-9 p-5 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-500 hover:border-[var(--text-tertiary)]">
              <div className="flex items-start gap-3 mb-2">
                <GraduationCap className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-[var(--text-primary)] transition-colors duration-500">
                    {item.institution}
                  </h4>
                  {item.location && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[var(--text-tertiary)]" />
                      <span className="text-xs font-mono text-[var(--text-tertiary)] transition-colors duration-500">
                        {item.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
                {item.field}
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
