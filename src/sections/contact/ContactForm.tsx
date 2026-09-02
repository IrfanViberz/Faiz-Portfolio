'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';;
import { z } from 'zod';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import type { ContactFormData, ContactApiResponse } from '@/types';
import { useTranslations } from 'next-intl';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const contactSchema = z.object({
    name: z.string().min(2, t('validationName')),
    email: z.string().email(t('validationEmail')),
    message: z.string().min(10, t('validationMessage')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: ContactApiResponse = await response.json();

      if (result.success) {
        setStatus('success');
        setStatusMessage(t('successMsg'));
        reset();
      } else {
        setStatus('error');
        setStatusMessage(result.error ?? t('errorFallback'));
      }
    } catch {
      setStatus('error');
      setStatusMessage(t('networkError'));
    }
  };

  const inputClass =
    'w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-md px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-tertiary)] transition-colors placeholder:text-[var(--text-tertiary)]';

  const errorClass = 'text-xs text-red-400 mt-1 font-mono';

  return (
    <div>
      <h2 className="text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-widest mb-8 transition-colors duration-500">
        {t('heading')}
      </h2>

      {status === 'success' && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-md border border-[var(--accent)] bg-[var(--bg-tertiary)]">
          <CheckCircle className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
          <p className="text-sm text-[var(--text-secondary)]">{statusMessage}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 flex items-start gap-3 p-4 rounded-md border border-red-500/40 bg-[var(--bg-tertiary)]">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-[var(--text-secondary)]">{statusMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            {t('nameLabel')}
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            {...register('name')}
            placeholder={t('namePlaceholder')}
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            {t('emailLabel')}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            {...register('email')}
            placeholder={t('emailPlaceholder')}
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            {t('messageLabel')}
          </label>
          <textarea
            id="contact-message"
            autoComplete="off"
            {...register('message')}
            rows={5}
            placeholder={t('messagePlaceholder')}
            className={`${inputClass} resize-none`}
          />
          {errors.message && <p className={errorClass}>{errors.message.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('submitting')}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t('submit')}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
