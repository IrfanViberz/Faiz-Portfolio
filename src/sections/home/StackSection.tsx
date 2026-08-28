'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  TrendingUp,
  Terminal,
  Smartphone,
  Database,
  Activity,
  LucideIcon,
  Sparkles,
} from 'lucide-react';
import Section from '@/components/ui/Section';
import { stackItems } from '@/lib/data';

const iconMap: Record<string, LucideIcon> = {
  Terminal: Code2,
  Smartphone: Layout,
  Database: Server,
  Activity: TrendingUp,
};

const categoryThemes: Record<
  string,
  {
    cardHoverBorder: string;
    ambientGlow: string;
    iconHoverText: string;
    iconHoverBorder: string;
    iconHoverBg: string;
    badgeDot: string;
    badgeHoverText: string;
    badgeHoverBorder: string;
    badgeHoverBg: string;
    footerStatusText: string;
  }
> = {
  amber: {
    cardHoverBorder: 'hover:border-amber-500/50',
    ambientGlow: 'from-amber-500/15',
    iconHoverText: 'group-hover:text-amber-400',
    iconHoverBorder: 'group-hover:border-amber-500/40',
    iconHoverBg: 'group-hover:bg-amber-500/10',
    badgeDot: 'bg-amber-400',
    badgeHoverText: 'hover:text-amber-300',
    badgeHoverBorder: 'hover:border-amber-500/40',
    badgeHoverBg: 'hover:bg-amber-500/5',
    footerStatusText: 'text-amber-400/90',
  },
  cyan: {
    cardHoverBorder: 'hover:border-cyan-500/50',
    ambientGlow: 'from-cyan-500/15',
    iconHoverText: 'group-hover:text-cyan-400',
    iconHoverBorder: 'group-hover:border-cyan-500/40',
    iconHoverBg: 'group-hover:bg-cyan-500/10',
    badgeDot: 'bg-cyan-400',
    badgeHoverText: 'hover:text-cyan-300',
    badgeHoverBorder: 'hover:border-cyan-500/40',
    badgeHoverBg: 'hover:bg-cyan-500/5',
    footerStatusText: 'text-cyan-400/90',
  },
  emerald: {
    cardHoverBorder: 'hover:border-emerald-500/50',
    ambientGlow: 'from-emerald-500/15',
    iconHoverText: 'group-hover:text-emerald-400',
    iconHoverBorder: 'group-hover:border-emerald-500/40',
    iconHoverBg: 'group-hover:bg-emerald-500/10',
    badgeDot: 'bg-emerald-400',
    badgeHoverText: 'hover:text-emerald-300',
    badgeHoverBorder: 'hover:border-emerald-500/40',
    badgeHoverBg: 'hover:bg-emerald-500/5',
    footerStatusText: 'text-emerald-400/90',
  },
  purple: {
    cardHoverBorder: 'hover:border-purple-500/50',
    ambientGlow: 'from-purple-500/15',
    iconHoverText: 'group-hover:text-purple-400',
    iconHoverBorder: 'group-hover:border-purple-500/40',
    iconHoverBg: 'group-hover:bg-purple-500/10',
    badgeDot: 'bg-purple-400',
    badgeHoverText: 'hover:text-purple-300',
    badgeHoverBorder: 'hover:border-purple-500/40',
    badgeHoverBg: 'hover:bg-purple-500/5',
    footerStatusText: 'text-purple-400/90',
  },
};

export default function StackSection() {
  return (
    <Section id="stack" title="Technical Arsenal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {stackItems.map((stack, i) => {
          const Icon = iconMap[stack.iconName] || Code2;
          const accentKey = stack.accent || 'cyan';
          const theme = categoryThemes[accentKey] || categoryThemes.cyan;
          const skillsList =
            stack.skills && stack.skills.length > 0
              ? stack.skills
              : stack.text
              ? stack.text.split(',').map((s) => s.trim())
              : [];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
              className={`relative rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 flex flex-col justify-between transition-all duration-300 ${theme.cardHoverBorder} group overflow-hidden`}
            >
              {/* Distinct ambient top glow per category on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${theme.ambientGlow} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Header with index, minimal thin-stroke icon, and title */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-9 h-9 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 ${theme.iconHoverText} ${theme.iconHoverBorder} ${theme.iconHoverBg}`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-[var(--text-tertiary)]">
                    0{i + 1}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1 transition-colors duration-500">
                  {stack.title}
                </h4>
                {stack.tagline && (
                  <p className="text-xs text-[var(--text-secondary)] font-normal mb-5 transition-colors duration-500">
                    {stack.tagline}
                  </p>
                )}

                {/* Skill Pills with category-specific hover colors */}
                <div className="flex flex-wrap gap-2 pt-1 mb-6">
                  {skillsList.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-all duration-200 cursor-default ${theme.badgeHoverText} ${theme.badgeHoverBorder} ${theme.badgeHoverBg} hover:scale-[1.02]`}
                    >
                      <span className={`w-1 h-1 rounded-full ${theme.badgeDot} opacity-80`} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Micro-Metadata with category accent */}
              <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[var(--text-tertiary)]" strokeWidth={1.5} />
                  <span>{skillsList.length} Core Tools</span>
                </span>
                <span className={`font-medium transition-colors duration-300 ${theme.footerStatusText}`}>
                  Production Ready
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
