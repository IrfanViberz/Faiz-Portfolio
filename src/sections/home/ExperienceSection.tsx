'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';
import { experienceItems } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <Section id="experience" title="Professional ROI & Experience">
      <div className="space-y-12">
        {experienceItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12"
          >
            {/* Timeline & Company Header */}
            <div className="md:col-span-3 pt-1">
              <div className="text-sm font-mono text-[var(--text-tertiary)] mb-1 transition-colors duration-500">
                {item.period}
              </div>
              <h3 className="text-lg font-semibold text-cyan-400 transition-colors duration-500">
                {item.company}
              </h3>
              <p className="text-xs font-mono text-amber-300/80 mt-1.5 transition-colors duration-500 font-normal">
                *Reference Contact Available Upon Request*
              </p>
            </div>

            {/* Projects List */}
            <div className="md:col-span-9 space-y-10">
              {item.projects.map((proj, pIdx) => (
                <div
                  key={pIdx}
                  className={pIdx > 0 ? 'pt-8 border-t border-[var(--border-color)]' : ''}
                >
                  <div className="mb-2">
                    <h4 className="text-lg font-medium text-[var(--text-primary)] transition-colors duration-500">
                      {proj.title}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 transition-colors duration-500">
                      {proj.role}
                    </p>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3 mb-4 transition-colors duration-500">
                    {proj.description}
                  </p>

                  {/* Business Impact callout */}
                  <div className="p-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md mb-5 border-l-4 border-l-amber-500">
                    <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider block mb-1 transition-colors duration-500">
                      Business Impact:
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] transition-colors duration-500">
                      {proj.impact}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {proj.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
