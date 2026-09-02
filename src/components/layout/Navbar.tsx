'use client';

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');

  const navLinks = [
    { href: '/', label: t('overview') },
    { href: '/projects', label: t('projects') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-[var(--bg-nav)] backdrop-blur-md border-b border-[var(--border-color)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between pr-16 sm:pr-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-[var(--text-primary)] hover:opacity-70 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          faiz_irfan<span className="text-[var(--text-tertiary)]">/</span>portfolio
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-[var(--text-primary)]'
                  : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="text-[var(--text-primary)] p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden absolute top-16 left-0 w-full bg-[var(--bg-nav)] backdrop-blur-md border-b border-[var(--border-color)] shadow-xl"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left text-sm font-medium transition-colors ${
                    i === navLinks.length - 1 ? 'pt-4 border-t border-[var(--border-color)]' : ''
                  } ${
                    pathname === link.href
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-tertiary)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
