'use client';

import Section from '@/components/ui/Section';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Gamepad2, Dumbbell, Cpu, ShoppingBag, Wrench, Trophy } from 'lucide-react';
import type { InterestItem } from '@/lib/about';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingBag,
  Wrench,
  Gamepad2,
  Dumbbell,
  Cpu,
  Trophy,
};

const interestMeta = [
  { icon: 'ShoppingBag', image: '/interests/tiktok.jpg' },
  { icon: 'Wrench',      image: '/interests/hardware.png' },
  { icon: 'Gamepad2',   image: '/interests/gaming.png' },
  { icon: 'Dumbbell',   image: '/interests/fitness.jpg' },
  { icon: 'Cpu',        image: '/interests/tech.png' },
  { icon: 'Trophy',     image: '/interests/sports.jpg' },
];

// Alternating peek offsets so cards behind lean left / right, visually indicating swipeability
const peekOffsets = [0, 28, -28, 18];
const peekRotates = [0, 4, -4, 2];

// ─── Single draggable card ────────────────────────────────────────────────────
function DeckCard({
  item,
  stackIndex,
  total,
  onSwiped,
}: {
  item: InterestItem;
  stackIndex: number;
  total: number;
  onSwiped: () => void;
}) {
  const Icon = iconMap[item.icon] ?? Cpu;
  const x = useMotionValue(0);

  // Rotate while dragging (top card only)
  const dragRotate = useTransform(x, [-220, 220], [-20, 20]);

  const isTop = stackIndex === 0;

  // Scale cards down progressively
  const scale = 1 - stackIndex * 0.045;
  // Vertical pull-back so behind cards sit slightly higher
  const yShift = stackIndex * 8;
  // Horizontal peek: cards alternate left / right
  const xPeek = peekOffsets[stackIndex] ?? 0;
  // Static slight tilt for behind cards to sell the "fanned" look
  const staticRotate = isTop ? 0 : (peekRotates[stackIndex] ?? 0);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 350) {
      onSwiped();
    }
  };

  return (
    <motion.div
      className="absolute rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-xl"
      style={{
        // Front card fills the inner stage; behind cards are inset so we see their edges
        top: 0,
        left: isTop ? 0 : '4%',
        right: isTop ? 0 : '4%',
        bottom: 0,
        x: isTop ? x : xPeek,
        rotate: isTop ? dragRotate : staticRotate,
        scale,
        y: yShift,
        zIndex: total - stackIndex,
        originX: 0.5,
        originY: 0.9,
        backgroundColor: 'var(--bg-primary)',
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileDrag={isTop ? { cursor: 'grabbing' } : undefined}
    >
      {/* Image — taller so it fills nicely */}
      <div className="relative w-full h-80 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 680px"
        />
        {/* Bottom fade into card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />

        {/* Swipe arrow hints on top card only */}
        {isTop && (
          <>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 text-lg select-none pointer-events-none">
              ‹
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 text-lg select-none pointer-events-none">
              ›
            </div>
          </>
        )}
      </div>

      {/* Content area */}
      <div className="p-5 pt-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 shrink-0 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center">
            <Icon className="w-4 h-4 text-[var(--text-primary)]" />
          </div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">{item.title}</h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function BeyondCodingSection() {
  const t = useTranslations('about.beyondCoding');
  const interestTexts = t.raw('interests') as { title: string; description: string }[];

  const interests: InterestItem[] = interestTexts.map((text, i) => ({
    ...text,
    icon: interestMeta[i].icon,
    image: interestMeta[i].image,
  }));

  // Circular deck queue
  const [deck, setDeck] = useState<number[]>(interests.map((_, i) => i));

  const handleSwiped = () => {
    setDeck((prev) => {
      const [top, ...rest] = prev;
      return [...rest, top];
    });
  };

  const total = deck.length;
  const visible = deck.slice(0, 4);

  return (
    /* Pass no title to Section — we render title + description manually in the left column */
    <Section id="beyond-coding">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

        {/* ── Left Column: Title + Description ── */}
        <div className="lg:w-[340px] shrink-0 lg:self-center">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
              SECTION 04
            </span>
            <div className="h-px w-12 bg-[var(--border-color)]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-5 leading-tight transition-colors duration-500">
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed transition-colors duration-500">
            {t('description')}
          </p>

          {/* Swipe cue */}
          <p className="mt-8 text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-widest flex items-center gap-2">
            <span>←</span>
            <span>drag to explore</span>
            <span>→</span>
          </p>
        </div>

        {/* ── Right Column: Card Deck ── */}
        <div className="flex-1 min-w-0 w-full">
          {/* Outer wrapper with side padding so peeking cards are visible */}
          <div className="relative px-8 sm:px-12">
            {/* Deck stage */}
            <div
              className="relative h-[500px] mx-auto select-none cursor-grab active:cursor-grabbing"
              style={{ maxWidth: 520 }}
            >
              <AnimatePresence>
                {[...visible].reverse().map((cardIdx, i) => {
                  const stackIndex = visible.length - 1 - i;
                  return (
                    <DeckCard
                      key={cardIdx}
                      item={interests[cardIdx]}
                      stackIndex={stackIndex}
                      total={total}
                      onSwiped={handleSwiped}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}
