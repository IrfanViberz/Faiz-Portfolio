'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronUp, ChevronDown, Calendar } from 'lucide-react';
import type { TimelineEntry } from '@/lib/about';

interface TimelineProps {
  items: TimelineEntry[];
}

// Logo images mapping for each educational milestone
const educationLogos = [
  '/education/skkb.jpg',  // 01: SK Kampung Baharu
  '/education/tms.jpg',   // 02: SMK Tengku Mahmud (TMS)
  '/education/smkkk.png', // 03: SMK Kubang Kerian
  '/education/kmkt.png',  // 04: Kolej Matrikulasi Kelantan
  '/education/umpsa.png', // 05: UMPSA
];

// Strict Solid Color Palettes with Light Pastel Backgrounds (No gradients, No glows)
const schoolAmberTheme = {
  // SK & SMK — Solid Amber / Warm Ochre
  solidText: 'text-amber-800 dark:text-amber-300',
  solidAccent: 'bg-amber-600 dark:bg-amber-400',
  cardBg: 'bg-amber-50/80 dark:bg-amber-950/20',
  cardBorder: 'border-amber-200 dark:border-amber-800/60',
  fieldBadge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700/60',
  iconBox: 'bg-amber-100 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300',
  dotActive: 'border-amber-600 bg-amber-600 dark:border-amber-400 dark:bg-amber-400',
  dotPast: 'border-amber-600/50 bg-[var(--bg-primary)]',
  activeNavBg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700',
  progressDot: 'bg-amber-700 dark:bg-amber-400',
};

const matrikulasiRedTheme = {
  // Kolej Matrikulasi Kelantan — Solid Crimson Red
  solidText: 'text-red-800 dark:text-red-300',
  solidAccent: 'bg-red-600 dark:bg-red-400',
  cardBg: 'bg-red-50/80 dark:bg-red-950/20',
  cardBorder: 'border-red-200 dark:border-red-800/60',
  fieldBadge: 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200 border-red-300 dark:border-red-700/60',
  iconBox: 'bg-red-100 dark:bg-red-900/40 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300',
  dotActive: 'border-red-600 bg-red-600 dark:border-red-400 dark:bg-red-400',
  dotPast: 'border-red-600/50 bg-[var(--bg-primary)]',
  activeNavBg: 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700',
  progressDot: 'bg-red-700 dark:bg-red-400',
};

const umpsaBlueTheme = {
  // UMPSA — Solid Cobalt Blue
  solidText: 'text-blue-800 dark:text-blue-300',
  solidAccent: 'bg-blue-600 dark:bg-blue-400',
  cardBg: 'bg-blue-50/80 dark:bg-blue-950/20',
  cardBorder: 'border-blue-200 dark:border-blue-800/60',
  fieldBadge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700/60',
  iconBox: 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300',
  dotActive: 'border-blue-600 bg-blue-600 dark:border-blue-400 dark:bg-blue-400',
  dotPast: 'border-blue-600/50 bg-[var(--bg-primary)]',
  activeNavBg: 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700',
  progressDot: 'bg-blue-700 dark:bg-blue-400',
};

const milestoneThemes = [
  schoolAmberTheme, // 01: SK Kampung Baharu
  schoolAmberTheme, // 02: SMK Tengku Mahmud
  schoolAmberTheme, // 03: SMK Kubang Kerian
  matrikulasiRedTheme, // 04: Kolej Matrikulasi Kelantan
  umpsaBlueTheme, // 05: UMPSA
];

export default function Timeline({ items }: TimelineProps) {
  const [currentIndex, setCurrentIndex] = useState(items.length - 1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = items.length;
  const currentItem = items[currentIndex] || items[0];
  const currentTheme = milestoneThemes[currentIndex % milestoneThemes.length];

  const goToNext = useCallback(() => {
    if (currentIndex < totalItems - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalItems]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Drag threshold handler
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number }; velocity: { y: number } }
  ) => {
    const swipeThreshold = 40;
    const velocityThreshold = 150;

    if (info.offset.y < -swipeThreshold || info.velocity.y < -velocityThreshold) {
      goToNext();
    } else if (info.offset.y > swipeThreshold || info.velocity.y > velocityThreshold) {
      goToPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Framer motion variants
  const cardVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        y: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.18 },
        scale: { duration: 0.18 },
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="outline-none rounded-2xl"
      aria-label="Interactive Journey Timeline"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Milestone Track */}
        <div className="lg:col-span-4 space-y-2 relative">
          <div className="relative pl-6 space-y-3">
            {/* Solid Vertical Timeline Line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-[var(--border-color)] rounded-full">
              {/* Solid Progress Fill */}
              <motion.div
                className={`w-full rounded-full ${currentTheme.solidAccent}`}
                initial={false}
                animate={{
                  height: `${(currentIndex / (totalItems - 1)) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>

            {items.map((item, idx) => {
              const theme = milestoneThemes[idx % milestoneThemes.length];
              const isActive = idx === currentIndex;
              const isPast = idx < currentIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 relative flex items-start gap-3 group cursor-pointer ${
                    isActive
                      ? `${theme.activeNavBg}`
                      : 'bg-[var(--bg-secondary)]/50 border-[var(--border-color)] hover:border-[var(--text-tertiary)] opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Solid Timeline Dot */}
                  <div
                    className={`absolute -left-[19px] top-4 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 z-10 ${
                      isActive
                        ? theme.dotActive
                        : isPast
                        ? theme.dotPast
                        : 'border-[var(--border-color)] bg-[var(--bg-primary)]'
                    }`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="mb-1">
                      <span
                        className={`text-xs font-mono font-medium ${
                          isActive
                            ? `${theme.solidText} font-bold`
                            : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-secondary)]'
                        }`}
                      >
                        {item.period}
                      </span>
                    </div>
                    <div
                      className={`text-xs truncate uppercase tracking-wider ${
                        isActive
                          ? 'text-[var(--text-primary)] font-semibold'
                          : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {item.institution}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Draggable Card Viewport */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div className="relative select-none flex-1 flex flex-col h-full">
            {/* Main Interactive Stage — Solid Card */}
            <div
              className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-300 flex-1 flex flex-col h-full shadow-sm"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.3}
                  onDragEnd={handleDragEnd}
                  className="w-full h-full p-6 sm:p-8 cursor-grab active:cursor-grabbing flex flex-col justify-between flex-1"
                  style={{ touchAction: 'pan-x' }}
                >
                  {/* Card Main Body */}
                  <div>
                    {/* Meta Header across the top */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)] mb-5">
                      <div
                        className={`inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-wide ${currentTheme.solidText}`}
                      >
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{currentItem.period}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {currentItem.location && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                            <MapPin className="w-3.5 h-3.5 opacity-80" />
                            <span>{currentItem.location}</span>
                          </div>
                        )}
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)] font-medium">
                          #{String(currentIndex + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Headline Row: Logo on Left top-aligned with School Name Headline & Field */}
                    <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                      {/* Logo Box top-aligned with School Headline (Larger size) */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white flex items-center justify-center p-2.5 shrink-0 shadow-sm overflow-hidden mt-0.5">
                        <Image
                          src={educationLogos[currentIndex % educationLogos.length]}
                          alt={currentItem.institution}
                          width={96}
                          height={96}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* School Name Headline, Field Subtitle (No background) & Narrative */}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight uppercase tracking-wide">
                            {currentItem.institution}
                          </h3>
                          <div
                            className={`mt-1.5 text-xs sm:text-sm font-mono font-semibold tracking-wide ${currentTheme.solidText}`}
                          >
                            {currentItem.field}
                          </div>
                        </div>

                        {/* Narrative Description */}
                        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pt-1">
                          {currentItem.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation & Progress Dots */}
                  <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
                    {/* Minimal Up/Down arrows */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPrev();
                        }}
                        disabled={currentIndex === 0}
                        aria-label="Previous Milestone"
                        className={`p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] ${
                          currentIndex === 0
                            ? 'opacity-30 cursor-not-allowed text-[var(--text-tertiary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] cursor-pointer'
                        }`}
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNext();
                        }}
                        disabled={currentIndex === totalItems - 1}
                        aria-label="Next Milestone"
                        className={`p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] ${
                          currentIndex === totalItems - 1
                            ? 'opacity-30 cursor-not-allowed text-[var(--text-tertiary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] cursor-pointer'
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress dots indicator */}
                    <div className="flex items-center gap-1.5">
                      {items.map((_, i) => {
                        const dotTheme = milestoneThemes[i % milestoneThemes.length];
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              goToIndex(i);
                            }}
                            aria-label={`Jump to milestone ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                              i === currentIndex
                                ? `w-6 ${dotTheme.progressDot}`
                                : 'w-2 bg-[var(--border-color)] hover:bg-[var(--text-tertiary)]'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



