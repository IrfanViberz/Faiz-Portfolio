'use client';

import { useCallback, useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';

export default function ThemePullRope() {
  const { toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const [opacity, setOpacity] = useState(1);

  // Fade out as user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      // Start fading after 80px, fully gone by 350px
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 350);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className="fixed top-16 right-4 sm:right-12 z-[100] flex flex-col items-center select-none cursor-pointer transition-opacity duration-300"
      onClick={handlePull}
      role="button"
      aria-label="Toggle theme"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handlePull()}
      style={{
        WebkitTapHighlightColor: 'transparent',
        opacity,
        pointerEvents: opacity < 0.1 ? 'none' : 'auto',
      }}
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
        className="w-6 h-12 rounded-full border-2 border-[var(--invert-bg)] bg-[var(--invert-bg)] shadow-md flex items-center justify-center transition-all duration-300 ease-in-out group hover:scale-105"
        style={{
          transform: isPulling ? 'translateY(60px)' : 'translateY(0)',
        }}
      >
        <div className="w-2 h-4 rounded-full bg-[var(--invert-text)] group-hover:opacity-80 transition-opacity" />
      </div>
    </div>
  );
}
