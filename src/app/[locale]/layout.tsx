import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Press_Start_2P } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemePullRope from '@/components/ui/ThemePullRope';
import ArcadeLoader from '@/components/arcade/ArcadeLoader';
import OfflineDetector from '@/components/arcade/OfflineDetector';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const pressStart2P = Press_Start_2P({
  variable: '--font-press-start',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Faiz Irfan — IT & Software Professional',
  description:
    'IT & Software Professional with experience in software development, PC & laptop repair, hardware troubleshooting, and technical support.',
  keywords: [
    'Faiz Irfan',
    'IT Professional',
    'Software Developer',
    'Hardware Troubleshooting',
    'PC Repair',
    'Angular',
    'NestJS',
    'Portfolio',
  ],
  authors: [{ name: 'Mohamad Faiz Irfan' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Faiz Irfan — IT & Software Professional',
    description:
      'IT & Software Professional with experience in software development, PC & laptop repair, hardware troubleshooting, and technical support.',
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ms')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            {/* Retro Arcade Loading Overlay — renders on top of everything */}
            <ArcadeLoader />
            <Navbar />
            <ThemePullRope />
            {/* Offline Detector — swaps to game when connection drops */}
            <OfflineDetector>
              <main className="min-h-[85vh]">{children}</main>
              <Footer />
            </OfflineDetector>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
