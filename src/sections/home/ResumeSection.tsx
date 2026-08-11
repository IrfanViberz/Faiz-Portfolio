'use client';

import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Globe } from 'lucide-react';
import Section from '@/components/ui/Section';
import Badge from '@/components/ui/Badge';

const resumeVersions = [
  {
    lang: 'English',
    badge: 'EN',
    title: 'Resume — English Version',
    description:
      'Official English CV detailing full-stack software development, tech stack, and engineering achievements.',
    viewUrl: '/resume-en.pdf',
    downloadName: 'Mohamad_Faiz_Irfan_Resume_EN.pdf',
  },
  {
    lang: 'Bahasa Melayu',
    badge: 'BM',
    title: 'Resume — Versi Bahasa Melayu',
    description:
      'Resume versi Bahasa Melayu merangkumi pengalaman pembangunan perisian, kepakaran teknikal, dan pencapaian projek.',
    viewUrl: '/resume-bm.pdf',
    downloadName: 'Mohamad_Faiz_Irfan_Resume_BM.pdf',
  },
];

export default function ResumeSection() {
  return (
    <Section id="resume" title="Curriculum Vitae / Resume">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {resumeVersions.map((ver, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
            className="border border-[var(--border-color)] rounded-lg p-6 sm:p-7 bg-[var(--bg-secondary)] transition-all duration-300 hover:border-[var(--text-tertiary)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[var(--text-primary)]" />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                  <Badge highlight>{ver.badge}</Badge>
                </div>
              </div>

              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
                {ver.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 transition-colors duration-500">
                {ver.description}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
              <a
                href={ver.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                View PDF
              </a>
              <a
                href={ver.viewUrl}
                download={ver.downloadName}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-500 shadow-sm transition-all duration-300"
              >
                <Download className="w-4 h-4 shrink-0 text-white" />
                Download CV
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
