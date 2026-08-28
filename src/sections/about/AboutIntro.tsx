'use client';

import { motion } from 'framer-motion';
import { MapPin, Code2 } from 'lucide-react';

export default function AboutIntro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pt-32 pb-24 border-b border-[var(--border-color)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Status badge */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse transition-colors duration-500" />
          <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider transition-colors duration-500">
            The person behind the code
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text */}
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] text-[var(--text-primary)] mb-6 transition-colors duration-500">
              Mohamad Faiz Irfan
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-tertiary)] transition-colors duration-500 bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                <Code2 className="w-4 h-4 text-[var(--accent)]" />
                <span>Software Developer</span>
              </div>
              <span className="text-[var(--border-color)]">/</span>
              <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-tertiary)] transition-colors duration-500 bg-[var(--bg-secondary)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span>Born 2001, Kelantan, Malaysia</span>
              </div>
            </div>

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-5 max-w-2xl transition-colors duration-500">
              I am a software developer passionate about building scalable digital solutions that
              solve real-world problems and create genuine value for users and businesses.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl transition-colors duration-500">
              My approach combines a strong engineering foundation with a product mindset. I care
              deeply about why something is built, not just how. I bring the same energy to
              architecting a backend system as I do to understanding the business problem it&apos;s
              meant to solve.
            </p>
          </div>

          {/* Right summary card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-500 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest transition-colors duration-500">
                  Quick Profile
                </span>
                <div className="relative overflow-hidden rounded-md border border-[var(--border-color)] animate-float-subtle shadow-sm hover:scale-105 transition-transform duration-300 cursor-pointer shrink-0">
                  <img
                    src="/kelantan-flag.png"
                    alt="Kelantan Flag"
                    title="Kelantan, Malaysia"
                    className="w-36 h-20 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Full Name', value: 'Mohamad Faiz Irfan bin Mohamad Zaid' },
                  { label: 'Role', value: 'Software Developer' },
                  { label: 'Specialisation', value: 'Frontend & Mobile Engineering' },
                  { label: 'Stack', value: 'Angular · NestJS · Ionic · Flutter' },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-0.5 pb-3 border-b border-[var(--border-color)] last:border-0 last:pb-0 transition-colors duration-500"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] transition-colors duration-500">
                      {label}
                    </span>
                    <span className="text-sm text-[var(--text-primary)] transition-colors duration-500">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
