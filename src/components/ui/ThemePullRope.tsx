'use client';

import { useCallback, useState } from 'react';
import { useTheme } from '@/lib/theme-context';

export default function ThemePullRope() {
  const { toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = useCallback(() => {
    if (isPulling) return;
    setIsPulling(true);

    // Trigger theme change at the lowest point of the pull
    setTimeout(() => {
      toggleTheme();
    }, 250);

    // Reset the rope
    setTimeout(() => {
      setIsPulling(false);
    }, 500);
  }, [isPulling, toggleTheme]);

  return (
    <div
      className="fixed top-16 right-4 sm:right-12 z-[100] flex flex-col items-center select-none cursor-pointer"
      onClick={handlePull}
      role="button"
      aria-label="Toggle theme"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handlePull()}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Rope */}
      <div
        className="w-[2px] bg-[var(--rope-color)] origin-top transition-all duration-300 ease-in-out"
        style={{
          height: '40px',
          transform: isPulling ? 'scaleY(2.5)' : 'scaleY(1)',
        }}
      />
      {/* Handle */}
      <div
        className="w-6 h-12 rounded-full border-2 border-[var(--border-color)] bg-[var(--bg-primary)] shadow-sm flex items-center justify-center transition-all duration-300 ease-in-out group hover:border-[var(--text-tertiary)]"
        style={{
          transform: isPulling ? 'translateY(60px)' : 'translateY(0)',
        }}
      >
        <div className="w-2 h-4 rounded-full bg-[var(--border-color)] group-hover:bg-[var(--text-tertiary)] transition-colors" />
      </div>
    </div>
  );
}
