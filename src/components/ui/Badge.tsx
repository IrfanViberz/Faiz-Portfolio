import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  highlight?: boolean;
}

export default function Badge({ children, highlight = false }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-mono border transition-colors duration-500 ${
        highlight
          ? 'bg-[var(--invert-bg)] text-[var(--invert-text)] border-transparent'
          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-color)]'
      }`}
    >
      {children}
    </span>
  );
}
