'use client';

import { motion } from 'framer-motion';
import { Terminal, Smartphone, Database, Activity, LucideIcon } from 'lucide-react';
import Section from '@/components/ui/Section';
import { stackItems } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  Smartphone,
  Database,
  Activity,
};

export default function StackSection() {
  return (
    <Section id="stack" title="Technical Arsenal">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stackItems.map((stack, i) => {
          const Icon = iconMap[stack.iconName];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
              className="p-6 rounded-md border border-[var(--border-color)] flex flex-col h-full bg-[var(--bg-secondary)] transition-colors duration-500 hover:border-[var(--text-tertiary)]"
            >
              <Icon className="w-5 h-5 text-[var(--text-secondary)] mb-4 transition-colors duration-500" />
              <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
                {stack.title}
              </h4>
              <p className="text-sm text-[var(--text-tertiary)] font-mono leading-relaxed mt-auto transition-colors duration-500">
                {stack.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
