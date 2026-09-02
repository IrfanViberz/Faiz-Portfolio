'use client';

import { Mail, MessageSquare } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_TEXT, OWNER_EMAIL } from '@/lib/data';
import { useTranslations } from 'next-intl';

export default function DirectChannels() {
  const t = useTranslations('contact.channels');

  return (
    <div>
      <h2 className="text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-widest mb-8 transition-colors duration-500">
        {t('heading')}
      </h2>

      <div className="flex flex-col gap-4">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-start gap-4 p-6 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-tertiary)] transition-colors duration-300 group"
        >
          <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-color)] shrink-0">
            <MessageSquare className="w-5 h-5 text-[var(--text-primary)]" />
          </div>
          <div>
            <h3 className="text-base font-medium text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
              {t('whatsappTitle')}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">{t('whatsappDesc')}</p>
          </div>
        </a>

        {/* Email */}
        <a
          href={`mailto:${OWNER_EMAIL}`}
          className="w-full inline-flex items-start gap-4 p-6 rounded-md border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-tertiary)] transition-colors duration-300 group"
        >
          <div className="w-10 h-10 rounded-md bg-[var(--bg-tertiary)] flex items-center justify-center border border-[var(--border-color)] shrink-0">
            <Mail className="w-5 h-5 text-[var(--text-primary)]" />
          </div>
          <div>
            <h3 className="text-base font-medium text-[var(--text-primary)] mb-1 transition-colors">
              {t('emailTitle')}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">{t('emailDesc')}</p>
          </div>
        </a>
      </div>
    </div>
  );
}
