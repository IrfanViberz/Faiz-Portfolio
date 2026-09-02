'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'ms' : 'en';

    // Set cookie explicitly with path=/ so next-intl middleware accepts the user preference
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      id="language-switcher"
      type="button"
      onClick={switchLocale}
      disabled={isPending}
      aria-label={locale === 'en' ? 'Tukar ke Bahasa Melayu' : 'Switch to English'}
      title={locale === 'en' ? 'Tukar ke Bahasa Melayu' : 'Switch to English'}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)] transition-all duration-200 text-xs font-mono disabled:opacity-50 cursor-pointer shadow-xs hover:shadow-sm"
    >
      <Globe className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
      <span className="font-semibold text-[var(--text-primary)]">
        {locale === 'en' ? 'EN' : 'BM'}
      </span>
      <span className="text-[var(--text-tertiary)]">/</span>
      <span className="hover:underline">{locale === 'en' ? 'BM' : 'EN'}</span>
    </button>
  );
}
