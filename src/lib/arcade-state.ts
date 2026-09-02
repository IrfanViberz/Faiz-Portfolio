'use client';

import { useState, useEffect } from 'react';

// Global variable tracking if the arcade loader has already been dismissed in this session
let isArcadeDismissed = false;

export function getArcadeDismissed(): boolean {
  return isArcadeDismissed;
}

export function setArcadeDismissed(): void {
  isArcadeDismissed = true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('arcade-dismissed'));
  }
}

/**
 * Hook that returns true when the arcade loader has been dismissed (or was already dismissed),
 * allowing hero and intro entrance animations to play at the exact right moment.
 */
export function useArcadeReady(): boolean {
  const [ready, setReady] = useState(() => isArcadeDismissed);

  useEffect(() => {
    if (isArcadeDismissed) {
      setReady(true);
      return;
    }

    const handler = () => setReady(true);
    window.addEventListener('arcade-dismissed', handler);
    return () => window.removeEventListener('arcade-dismissed', handler);
  }, []);

  return ready;
}
