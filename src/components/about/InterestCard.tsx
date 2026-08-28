'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gamepad2, Dumbbell, Cpu, BookOpen, ShoppingBag, Wrench } from 'lucide-react';
import type { InterestItem } from '@/lib/about';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Wrench,
  Gamepad2,
  Dumbbell,
  Cpu,
  BookOpen,
};

interface InterestCardProps {
  item: InterestItem;
  index: number;
}

export default function InterestCard({ item, index }: InterestCardProps) {
  const Icon = iconMap[item.icon] ?? Cpu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      className="rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-300 hover:border-[var(--text-tertiary)] group overflow-hidden"
    >
      {/* Image */}
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* subtle gradient overlay at bottom for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="w-9 h-9 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center mb-4 transition-colors duration-500">
          <Icon className="w-4 h-4 text-[var(--text-primary)]" />
        </div>
        <h3 className="text-base font-medium text-[var(--text-primary)] mb-2 transition-colors duration-500">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
