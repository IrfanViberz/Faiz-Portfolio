'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/lib/theme-context';
import { useRouter, usePathname } from '@/i18n/routing';
import { getArcadeDismissed, setArcadeDismissed } from '@/lib/arcade-state';
import OfflineGame from './OfflineGame';

const LOADING_MESSAGES = [
  'Reticulating splines...',
  'Generating spikes...',
  'Lubricating moving platforms...',
  'Downloading more RAM...',
  'Calibrating physics engine...',
  'Bribing the server...',
  'Defragmenting pixels...',
  'Compiling portfolio assets...',
];

type Phase = 'loading' | 'ready' | 'offline' | 'dismissed';

export default function ArcadeLoader() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const router = useRouter();
  const pathname = usePathname();

  // If already dismissed in this page lifecycle (e.g. language switch), skip immediately
  const [phase, setPhase] = useState<Phase>(() => {
    if (getArcadeDismissed()) {
      return 'dismissed';
    }
    return 'loading';
  });

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(LOADING_MESSAGES[0]);
  const [sliding, setSliding] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  const pickMessage = () =>
    LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

  // ─── Loading simulation ─────────────────────────────────────────────────
  const startLoading = useCallback(() => {
    setPhase('loading');
    setMessage(pickMessage());
    progressRef.current = 0;
    setProgress(0);

    intervalRef.current = setInterval(() => {
      // If offline mid-load, switch to game
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setPhase('offline');
        return;
      }

      const jump = Math.floor(Math.random() * 8) + 1;
      progressRef.current = Math.min(100, progressRef.current + jump);
      setProgress(progressRef.current);

      // Swap message every ~25%
      if (progressRef.current % 25 < jump) setMessage(pickMessage());

      if (progressRef.current >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setMessage('LOAD COMPLETE');
        setTimeout(() => setPhase('ready'), 500);
      }
    }, 120);
  }, []);

  // ─── Start loading unless already dismissed in this session lifecycle ───
  useEffect(() => {
    if (getArcadeDismissed()) {
      setPhase('dismissed');
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setPhase('offline');
    } else {
      startLoading();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startLoading]);

  // ─── Online / Offline listeners ─────────────────────────────────────────
  useEffect(() => {
    const goOffline = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (phase !== 'dismissed') setPhase('offline');
    };

    const goOnline = () => {
      if (phase === 'offline') {
        if (progressRef.current < 100) {
          startLoading();
        } else {
          setPhase('ready');
        }
      }
    };

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, [phase, startLoading]);

  // ─── Press Start handler (Navigates to Overview '/' upon entering) ───────
  const handleStart = () => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;

    setArcadeDismissed();

    // Reset location to Overview (home) on start
    if (pathname !== '/') {
      router.replace('/');
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    setSliding(true);
    setTimeout(() => setPhase('dismissed'), 800);
  };

  // ─── Don't render anything once dismissed ───────────────────────────────
  if (phase === 'dismissed') return null;

  // ─── Offline → show game ────────────────────────────────────────────────
  if (phase === 'offline') {
    return <OfflineGame onReturnToPortfolio={handleStart} />;
  }

  // ─── Loading / Ready Overlay (Theme-Adaptive) ───────────────────────────
  return (
    <div
      className={`fixed inset-0 z-[55] flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
        isLight ? 'bg-[#f4f4f7] text-zinc-900 crt-light' : 'bg-black text-white crt'
      } ${sliding ? 'arcade-slide-up' : ''}`}
    >
      {/* Brand Header */}
      <div className="text-center mb-8">
        <h1
          className={`retro-font text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-widest ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}
          style={{
            textShadow: isLight
              ? '0 0 10px rgba(0,0,0,0.1)'
              : '0 0 10px rgba(255,255,255,0.5)',
          }}
        >
          FAIZ IRFAN
          <br />
          <span className={isLight ? 'text-emerald-600 font-bold' : 'text-[#39ff14]'}>
            PORTFOLIO
          </span>
        </h1>
      </div>

      {/* Loading bar */}
      {phase === 'loading' && (
        <div className="w-full max-w-md flex flex-col items-center">
          <p
            className={`retro-font text-xs md:text-sm mb-4 h-4 text-center ${
              isLight ? 'text-zinc-600' : 'text-gray-400'
            }`}
          >
            {message}
          </p>
          <div
            className={`w-full h-8 border-4 p-1 rounded-sm relative transition-colors duration-300 ${
              isLight
                ? 'border-zinc-900 bg-white shadow-[0_0_15px_rgba(0,0,0,0.08)]'
                : 'border-white bg-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
            }`}
          >
            <div
              className={`h-full transition-all duration-100 ease-linear ${
                isLight ? 'bg-zinc-900' : 'bg-white'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p
            className={`retro-font text-sm mt-4 font-bold ${
              isLight ? 'text-zinc-900' : 'text-white'
            }`}
          >
            {progress}%
          </p>
        </div>
      )}

      {/* Press Start button */}
      {phase === 'ready' && (
        <button
          type="button"
          onClick={handleStart}
          className={`retro-font text-xl md:text-2xl mt-8 cursor-pointer focus:outline-none transition-colors z-50 ${
            isLight
              ? 'text-emerald-700 hover:text-black font-bold'
              : 'text-[#39ff14] hover:text-white'
          }`}
        >
          <span className="arcade-blink">&gt; PRESS START &lt;</span>
        </button>
      )}
    </div>
  );
}
