import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LinkButtonProps {
  href?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  primary?: boolean;
  variant?: 'default' | 'primary' | 'accent';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function LinkButton({
  href,
  icon: Icon,
  children,
  primary = false,
  variant,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: LinkButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  let colorStyle = 'bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-secondary)]';
  if (variant === 'accent') {
    colorStyle = 'bg-[var(--accent)] text-white hover:opacity-85 shadow-sm border border-transparent';
  } else if (variant === 'primary' || primary) {
    colorStyle = 'bg-[var(--invert-bg)] text-[var(--invert-text)] hover:opacity-80';
  }

  if (onClick || type !== 'button' || !href) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyle} ${colorStyle} ${className}`}
      >
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyle} ${colorStyle} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </a>
  );
}
