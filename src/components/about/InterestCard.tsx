'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Dumbbell, Cpu, BookOpen, ShoppingBag, Wrench, Trophy } from 'lucide-react';
import type { InterestItem } from '@/lib/about';
import { useEffect, useState } from 'react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Wrench,
  Gamepad2,
  Dumbbell,
  Cpu,
  BookOpen,
  Trophy,
};

interface InterestCardProps {
  item: InterestItem;
  index: number;
}

export default function InterestCard({ item, index }: InterestCardProps) {
  const Icon = iconMap[item.icon] ?? Cpu;
  const slides = item.images && item.images.length > 1 ? item.images : [item.image];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      className="rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-300 hover:border-[var(--text-tertiary)] group overflow-hidden"
    >
      {/* Image / Slideshow */}
      <div className="relative w-full h-72 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={slides[current]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current]}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/60 to-transparent" />

        {/* Slide indicator dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 shrink-0 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center transition-colors duration-500">
            <Icon className="w-4 h-4 text-[var(--text-primary)]" />
          </div>
          <h3 className="text-base font-medium text-[var(--text-primary)] transition-colors duration-500">
            {item.title}
          </h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
