'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';

// ─── Clean Unified Entrance Animation ─────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function HeroSection() {
  const t = useTranslations('hero');
  const [isFlipped, setIsFlipped] = useState(false);

  // Easter egg: auto flip back to original profile after 3 seconds
  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFlipped]);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-32 pb-20 border-b border-[var(--border-color)] transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── Left Content Column ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse transition-colors duration-500" />
              <span className="text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider transition-colors duration-500">
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] text-[var(--text-primary)] transition-colors duration-500"
            >
              {t('headline')}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-[var(--text-secondary)] leading-relaxed transition-colors duration-500"
            >
              {t('description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 relative z-10 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-[var(--invert-bg)] text-[var(--invert-text)] hover:opacity-85 active:scale-95 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('ctaHire')}</span>
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] active:scale-95 transition-all duration-200"
              >
                <span>{t('ctaProjects')}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right Image 3D Flip Card Container (Secret Easter Egg) ── */}
          <motion.div
            variants={imageVariants}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              className="relative w-full max-w-sm aspect-[4/5] perspective-1000 cursor-pointer select-none"
              onClick={toggleFlip}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* ── FRONT FACE (Clean Profile Photo) ── */}
                <div
                  className="absolute inset-0 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden shadow-sm group"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src="/profile.png"
                    alt="Mohamad Faiz Irfan"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                  />

                  {/* Fallback User Avatar */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-[var(--text-tertiary)] -z-10">
                    <div className="w-16 h-16 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center mb-3">
                      <User className="w-8 h-8 text-[var(--text-tertiary)]" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Profile Photo
                    </span>
                  </div>
                </div>

                {/* ── BACK FACE (Full Anime Alter Ego Portrait + CHECKMATE text) ── */}
                <div
                  className="absolute inset-0 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden shadow-md group"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <img
                    src="/profile-hover.jpg"
                    alt="Alter Ego"
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* CHECKMATE Game Font Text Banner */}
                  <div className="absolute bottom-7 left-0 right-0 px-4 text-center pointer-events-none">
                    <p
                      className="retro-font text-white text-sm sm:text-base tracking-[0.25em] uppercase font-bold"
                      style={{
                        textShadow:
                          '0 0 10px rgba(236,72,153,0.9), 0 0 20px rgba(168,85,247,0.8), 2px 2px 0px #000',
                      }}
                    >
                      CHECKMATE
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
