import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemePullRope from '@/components/ui/ThemePullRope';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Faiz Irfan — Software Developer',
  description:
    'Growth Engineer bridging scalable software architecture (Angular/NestJS) and digital marketing ROI. Open for new roles and complex challenges.',
  keywords: [
    'Faiz Irfan',
    'Growth Engineer',
    'Software Engineer',
    'Angular',
    'NestJS',
    'Digital Marketing',
    'Portfolio',
  ],
  authors: [{ name: 'Mohamad Faiz Irfan' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Faiz Irfan — Growth Engineer',
    description:
      'Growth Engineer bridging scalable software architecture and digital marketing ROI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ThemeProvider>
          <Navbar />
          <ThemePullRope />
          <main className="min-h-[85vh]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
