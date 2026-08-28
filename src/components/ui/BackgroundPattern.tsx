'use client';

import { useTheme } from '@/lib/theme-context';

/**
 * Subtle geometric background layer rendered behind all page content.
 * Uses a dot-grid pattern, soft radial gradient blobs, and faint
 * ruled lines to break up the flat single-color backdrop.
 */
export default function BackgroundPattern() {
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(63,63,70,0.45) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(161,161,170,0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top-left glow blob */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Bottom-right glow blob */}
      <div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Center accent blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] transition-colors duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 60%)',
        }}
      />

      {/* Horizontal ruled lines (faint) */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(to bottom, transparent 95%, rgba(39,39,42,0.35) 95%)'
            : 'linear-gradient(to bottom, transparent 95%, rgba(228,228,231,0.45) 95%)',
          backgroundSize: '100% 220px',
        }}
      />

      {/* Vertical accent line — left margin guide */}
      <div
        className="absolute top-0 bottom-0 left-[calc(50%-640px)] w-px hidden xl:block transition-colors duration-700"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent 0%, rgba(63,63,70,0.25) 20%, rgba(63,63,70,0.25) 80%, transparent 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(228,228,231,0.5) 20%, rgba(228,228,231,0.5) 80%, transparent 100%)',
        }}
      />

      {/* Vertical accent line — right margin guide */}
      <div
        className="absolute top-0 bottom-0 right-[calc(50%-640px)] w-px hidden xl:block transition-colors duration-700"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, transparent 0%, rgba(63,63,70,0.25) 20%, rgba(63,63,70,0.25) 80%, transparent 100%)'
            : 'linear-gradient(to bottom, transparent 0%, rgba(228,228,231,0.5) 20%, rgba(228,228,231,0.5) 80%, transparent 100%)',
        }}
      />

      {/* Vignette overlay — darkens edges */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 50%, rgba(9,9,11,0.6) 100%)'
            : 'radial-gradient(ellipse at center, transparent 50%, rgba(250,250,250,0.7) 100%)',
        }}
      />
    </div>
  );
}
