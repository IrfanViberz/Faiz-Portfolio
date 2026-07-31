'use client';

import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { obsessionsList } from '@/lib/data';

export default function LiveTerminal() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % obsessionsList.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 p-4 rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] font-mono text-xs sm:text-sm transition-colors duration-500 w-full">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-2 border-b border-[var(--border-color)] pb-2 text-[var(--text-tertiary)]">
        <Terminal className="w-4 h-4" />
        <span>brain_runtime.log</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="relative hidden sm:flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
          </span>
          STATUS: SCALING
        </span>
      </div>

      {/* Command */}
      <div className="text-[var(--text-secondary)]">
        <span className="text-blue-400 mr-2">faiz@system:~$</span>
        tail -f current_obsessions.txt
      </div>

      {/* Output */}
      <div className="text-[var(--text-primary)] mt-1 transition-opacity duration-300">
        {'>'} {obsessionsList[textIndex]}
        <span className="cursor-blink bg-[var(--text-primary)] w-2 h-4 inline-block align-middle ml-1" />
      </div>
    </div>
  );
}
