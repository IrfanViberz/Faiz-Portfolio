'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';

const philosophyPoints = [
  {
    label: 'Understand first, code second',
    detail:
      'Before writing a single line, I seek to fully understand the problem, its constraints, and the people it affects. Good code starts with good questions.',
  },
  {
    label: 'Build for scalability and maintainability',
    detail:
      'Every architectural decision is made with the future in mind. Code that is easy to change is more valuable than code that is clever.',
  },
  {
    label: 'Craft meaningful user experiences',
    detail:
      'Software only succeeds when people actually use it. Bridging technical quality with real user needs is where engineering becomes impactful.',
  },
  {
    label: 'Connect technical decisions with business goals',
    detail:
      'Technology is a means, not an end. I treat engineering choices as business decisions, ensuring every solution moves the needle toward the right outcome.',
  },
];

export default function PhilosophySection() {
  return (
    <Section id="philosophy" title="03. Engineering Philosophy">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left — Statement */}
        <div className="lg:col-span-4">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tighter text-[var(--text-primary)] leading-snug transition-colors duration-500">
            Software engineering is not only about writing code.
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed transition-colors duration-500">
            The real craft is in the decisions made before, during, and after, shaping how a system is
            built, how a team communicates, and how technology translates to real-world value.
          </p>
        </div>

        {/* Right — Principles */}
        <div className="lg:col-span-8 space-y-4">
          {philosophyPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
              className="p-5 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-300 hover:border-[var(--text-tertiary)]"
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono text-[var(--accent)] mt-0.5 shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-medium text-[var(--text-primary)] mb-1 transition-colors duration-500">
                    {point.label}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
                    {point.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
