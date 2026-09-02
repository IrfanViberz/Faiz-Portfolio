'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import OfflineGame (client-only canvas)
const OfflineGame = dynamic(() => import('./OfflineGame'), { ssr: false });

interface OfflineDetectorProps {
  children: React.ReactNode;
}

/**
 * Wraps children and monitors network status.
 * When offline → shows the retro platformer game.
 * When online returns → displays a 'CONNECTION SECURE' button inside the game,
 * allowing the user to click and enter the portfolio at their own pace.
 */
export default function OfflineDetector({ children }: OfflineDetectorProps) {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }

    const goOffline = () => setIsOffline(true);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  if (isOffline) {
    return (
      <OfflineGame
        onReturnToPortfolio={() => setIsOffline(false)}
      />
    );
  }

  return <>{children}</>;
}
