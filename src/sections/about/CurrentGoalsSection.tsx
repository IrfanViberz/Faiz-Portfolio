'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { currentGoals } from '@/lib/about';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CurrentGoalsSection() {
  return (
    <Section id="goals" title="06. Current Focus & Goals">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left — Intro text */}
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-medium tracking-tighter text-[var(--text-primary)] leading-snug mb-4 transition-colors duration-500">
            What I&apos;m working toward right now.
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 transition-colors duration-500">
            Goals keep the direction clear. These are the areas I am actively developing and the
            outcomes I am focused on achieving.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-[var(--invert-bg)] text-[var(--invert-text)] hover:opacity-80 transition-all duration-300"
          >
            Let&apos;s Collaborate
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right — Goals list */}
        <div className="lg:col-span-8 space-y-3">
          {currentGoals.map((goal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: 'easeOut' }}
              className="flex items-start gap-4 p-4 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-300 hover:border-[var(--text-tertiary)]"
            >
              <span className="text-xs font-mono text-[var(--accent)] mt-0.5 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
                {goal}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
