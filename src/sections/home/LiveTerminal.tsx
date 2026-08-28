'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Copy,
  Check,
  GitBranch,
  Layers,
  Activity,
} from 'lucide-react';
import { obsessionsList } from '@/lib/data';
import { useTheme } from '@/lib/theme-context';

const tabs = [
  { id: 'runtime', label: 'brain_runtime.log', icon: Terminal },
  { id: 'frontend', label: 'design_system.json', icon: Layers },
  { id: 'telemetry', label: 'telemetry.sh', icon: Activity },
];

export default function LiveTerminal() {
  const { theme } = useTheme();
  const isDark = theme !== 'light';

  const [activeTab, setActiveTab] = useState('runtime');
  const [copied, setCopied] = useState(false);
  const [obsessionIndex, setObsessionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect for live thoughts
  useEffect(() => {
    if (activeTab !== 'runtime') return;

    const fullText = obsessionsList[obsessionIndex];
    let currentIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        // Wait before switching to next obsession
        const timeout = setTimeout(() => {
          setObsessionIndex((prev) => (prev + 1) % obsessionsList.length);
        }, 3200);
        return () => clearTimeout(timeout);
      }
    }, 38);

    return () => clearInterval(typingInterval);
  }, [obsessionIndex, activeTab]);

  const handleCopy = () => {
    let textToCopy = '';
    if (activeTab === 'runtime') {
      textToCopy = `faiz@system:~$ tail -f current_obsessions.txt\n> ${obsessionsList[obsessionIndex]}`;
    } else if (activeTab === 'frontend') {
      textToCopy = JSON.stringify(
        {
          role: 'Frontend & Growth Engineer',
          uiDiscipline: 'Pixel-Perfect / Dynamic Motion',
          stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
          performance: 'Core Web Vitals Optimized',
        },
        null,
        2
      );
    } else {
      textToCopy = 'STATUS=SCALING FPS=120 LATENCY=12ms MOTION=SPRING_PHYSICS';
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`mt-12 rounded-xl border shadow-xl overflow-hidden font-mono text-xs sm:text-sm transition-all duration-300 ${
        isDark
          ? 'border-zinc-800 bg-zinc-950 text-zinc-200'
          : 'border-slate-300 bg-slate-100 text-slate-900 shadow-slate-200/50'
      }`}
    >
      {/* Mac Window Header */}
      <div
        className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 select-none transition-colors duration-300 ${
          isDark
            ? 'bg-zinc-900/90 border-zinc-800'
            : 'bg-slate-200/80 border-slate-300'
        }`}
      >
        {/* Left: Window Controls + Tabs */}
        <div className="flex items-center gap-4">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-xs" />
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-xs" />
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs" />
          </div>

          {/* Interactive Tab Switcher */}
          <div
            className={`flex items-center gap-1 p-1 rounded-lg border transition-colors duration-300 ${
              isDark
                ? 'bg-zinc-950 border-zinc-800'
                : 'bg-white border-slate-300 shadow-2xs'
            }`}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-zinc-800 text-cyan-400 font-semibold shadow-xs border border-zinc-700'
                        : 'bg-slate-100 text-slate-950 font-bold shadow-xs border border-slate-300'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Git Branch & Live Status & Copy */}
        <div className="flex items-center gap-3 text-xs">
          <div
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors duration-300 ${
              isDark
                ? 'text-zinc-300 bg-zinc-950 border-zinc-800'
                : 'text-slate-700 bg-white border-slate-300 shadow-2xs'
            }`}
          >
            <GitBranch
              className={`w-3 h-3 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}
            />
            <span className="font-semibold">main</span>
          </div>

          <div
            className={`flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold border transition-colors duration-300 ${
              isDark
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-100 border-emerald-300 text-emerald-800'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-emerald-400' : 'bg-emerald-600'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-emerald-500' : 'bg-emerald-600'
                }`}
              />
            </span>
            <span className="tracking-wide">SCALING</span>
          </div>

          <button
            onClick={handleCopy}
            title="Copy command output"
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-all duration-200 cursor-pointer font-medium ${
              isDark
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-700'
                : 'bg-white hover:bg-slate-50 text-slate-800 hover:text-black border-slate-300 shadow-2xs'
            }`}
          >
            {copied ? (
              <>
                <Check
                  className={`w-3.5 h-3.5 ${
                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                  }`}
                />
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}
                >
                  Copied
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-xs hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Content Area */}
      <div
        className={`p-5 sm:p-6 min-h-[170px] flex flex-col justify-center transition-colors duration-300 ${
          isDark ? 'bg-zinc-950' : 'bg-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {activeTab === 'runtime' && (
            <motion.div
              key="runtime"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {/* Prior log lines to give real terminal context */}
              <div
                className={`text-xs flex flex-wrap items-center gap-2 font-mono ${
                  isDark ? 'text-zinc-400' : 'text-slate-600'
                }`}
              >
                <span>[00:37:04]</span>
                <span
                  className={`font-bold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}
                >
                  INFO
                </span>
                <span>Initializing portfolio engine v2.6.4...</span>
                <span
                  className={`font-bold ${
                    isDark ? 'text-cyan-400' : 'text-blue-700'
                  }`}
                >
                  [OK]
                </span>
              </div>

              {/* Active Command */}
              <div
                className={`flex flex-wrap items-center gap-2 ${
                  isDark ? 'text-zinc-100' : 'text-slate-900'
                }`}
              >
                <span
                  className={`font-bold ${
                    isDark ? 'text-cyan-400' : 'text-blue-700'
                  }`}
                >
                  faiz@portfolio
                </span>
                <span className={isDark ? 'text-zinc-500' : 'text-slate-400'}>
                  :
                </span>
                <span
                  className={`font-semibold ${
                    isDark ? 'text-amber-400' : 'text-slate-700'
                  }`}
                >
                  ~/mindset
                </span>
                <span
                  className={`font-bold ${
                    isDark ? 'text-zinc-300' : 'text-slate-900'
                  }`}
                >
                  $
                </span>
                <span className="font-semibold">
                  tail -f current_obsessions.txt
                </span>
              </div>

              {/* Streaming Output with Live Typewriter */}
              <div
                className={`pl-4 py-3 px-3 rounded-r-lg border-l-4 transition-colors ${
                  isDark
                    ? 'border-cyan-500 bg-cyan-950/20 text-zinc-100'
                    : 'border-blue-600 bg-slate-50 text-slate-950 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`font-bold select-none text-base leading-none mt-0.5 ${
                      isDark ? 'text-emerald-400' : 'text-blue-700'
                    }`}
                  >
                    &gt;
                  </span>
                  <div className="font-semibold leading-relaxed">
                    {displayedText}
                    <span
                      className={`inline-block w-2 h-4 ml-1 align-middle animate-pulse ${
                        isDark ? 'bg-cyan-400' : 'bg-blue-700'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'frontend' && (
            <motion.div
              key="frontend"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 text-xs sm:text-sm font-mono leading-relaxed"
            >
              <div className={isDark ? 'text-zinc-100' : 'text-slate-900'}>
                <span
                  className={`font-bold ${
                    isDark ? 'text-cyan-400' : 'text-blue-700'
                  }`}
                >
                  faiz@portfolio
                </span>
                <span className={isDark ? 'text-zinc-500' : 'text-slate-400'}>
                  :
                </span>
                <span
                  className={`font-semibold ${
                    isDark ? 'text-amber-400' : 'text-slate-700'
                  }`}
                >
                  ~/stack
                </span>
                <span
                  className={`font-bold ${
                    isDark ? 'text-zinc-300' : 'text-slate-900'
                  }`}
                >
                  $
                </span>
                <span className="font-semibold ml-2">cat design_system.json</span>
              </div>
              <div
                className={`mt-2 p-4 rounded-lg border font-mono transition-colors ${
                  isDark
                    ? 'bg-zinc-900/70 border-zinc-800 text-zinc-200'
                    : 'bg-slate-50 border-slate-200 text-slate-900 shadow-2xs'
                }`}
              >
                <span className={isDark ? 'text-zinc-400' : 'text-slate-500'}>
                  {'{'}
                </span>
                <div className="pl-4">
                  <span
                    className={`font-bold ${
                      isDark ? 'text-cyan-400' : 'text-blue-700'
                    }`}
                  >
                    &quot;focus&quot;
                  </span>
                  :
                  <span
                    className={`ml-2 font-medium ${
                      isDark ? 'text-amber-300' : 'text-slate-900'
                    }`}
                  >
                    &quot;Frontend Craft &amp; Interactive Systems&quot;
                  </span>
                  ,
                </div>
                <div className="pl-4">
                  <span
                    className={`font-bold ${
                      isDark ? 'text-cyan-400' : 'text-blue-700'
                    }`}
                  >
                    &quot;uiDiscipline&quot;
                  </span>
                  :
                  <span
                    className={`ml-2 font-medium ${
                      isDark ? 'text-emerald-300' : 'text-slate-900'
                    }`}
                  >
                    &quot;Pixel-Perfect, Micro-Animations, Glassmorphism&quot;
                  </span>
                  ,
                </div>
                <div className="pl-4">
                  <span
                    className={`font-bold ${
                      isDark ? 'text-cyan-400' : 'text-blue-700'
                    }`}
                  >
                    &quot;stack&quot;
                  </span>
                  :
                  <span
                    className={`ml-2 font-medium ${
                      isDark ? 'text-amber-300' : 'text-slate-900'
                    }`}
                  >
                    [&quot;Next.js 15&quot;, &quot;TypeScript&quot;, &quot;Tailwind v4&quot;, &quot;Framer Motion&quot;]
                  </span>
                  ,
                </div>
                <div className="pl-4">
                  <span
                    className={`font-bold ${
                      isDark ? 'text-cyan-400' : 'text-blue-700'
                    }`}
                  >
                    &quot;responsive&quot;
                  </span>
                  :
                  <span
                    className={`ml-2 font-bold ${
                      isDark ? 'text-purple-400' : 'text-blue-900'
                    }`}
                  >
                    true
                  </span>
                  ,
                  <span
                    className={`ml-3 font-bold ${
                      isDark ? 'text-cyan-400' : 'text-blue-700'
                    }`}
                  >
                    &quot;framerate&quot;
                  </span>
                  :
                  <span
                    className={`ml-2 font-bold ${
                      isDark ? 'text-amber-400' : 'text-blue-900'
                    }`}
                  >
                    120
                  </span>
                </div>
                <span className={isDark ? 'text-zinc-400' : 'text-slate-500'}>
                  {'}'}
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === 'telemetry' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className={isDark ? 'text-zinc-100' : 'text-slate-900'}>
                <span
                  className={`font-bold ${
                    isDark ? 'text-cyan-400' : 'text-blue-700'
                  }`}
                >
                  faiz@portfolio
                </span>
                <span className={isDark ? 'text-zinc-500' : 'text-slate-400'}>
                  :
                </span>
                <span
                  className={`font-semibold ${
                    isDark ? 'text-amber-400' : 'text-slate-700'
                  }`}
                >
                  ~/metrics
                </span>
                <span
                  className={`font-bold ${
                    isDark ? 'text-zinc-300' : 'text-slate-900'
                  }`}
                >
                  $
                </span>
                <span className="font-semibold ml-2">./telemetry.sh --live</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div
                  className={`p-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800'
                      : 'bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-wider font-mono font-semibold ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}
                  >
                    Core Vitals
                  </div>
                  <div
                    className={`text-base font-bold mt-1 ${
                      isDark ? 'text-emerald-400' : 'text-slate-950'
                    }`}
                  >
                    100 / 100
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800'
                      : 'bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-wider font-mono font-semibold ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}
                  >
                    Animation FPS
                  </div>
                  <div
                    className={`text-base font-bold mt-1 ${
                      isDark ? 'text-cyan-400' : 'text-slate-950'
                    }`}
                  >
                    60–120 FPS
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800'
                      : 'bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-wider font-mono font-semibold ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}
                  >
                    Theme Engine
                  </div>
                  <div
                    className={`text-base font-bold mt-1 ${
                      isDark ? 'text-purple-400' : 'text-slate-950'
                    }`}
                  >
                    Dark / Light
                  </div>
                </div>
                <div
                  className={`p-3 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-zinc-900 border-zinc-800'
                      : 'bg-slate-50 border-slate-200 shadow-2xs'
                  }`}
                >
                  <div
                    className={`text-[10px] uppercase tracking-wider font-mono font-semibold ${
                      isDark ? 'text-zinc-400' : 'text-slate-600'
                    }`}
                  >
                    Status
                  </div>
                  <div
                    className={`text-base font-bold mt-1 ${
                      isDark ? 'text-emerald-400' : 'text-slate-950'
                    }`}
                  >
                    Ready to Build
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Breadcrumb / Prompt bar */}
      <div
        className={`px-4 py-2 border-t flex items-center justify-between text-[11px] font-mono transition-colors duration-300 ${
          isDark
            ? 'bg-zinc-900/80 border-zinc-800 text-zinc-400'
            : 'bg-slate-200/80 border-slate-300 text-slate-700'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full animate-ping ${
              isDark ? 'bg-cyan-400' : 'bg-blue-600'
            }`}
          />
          <span className="font-medium">Interactive terminal session active</span>
        </div>
        <span>UTF-8 • zsh 5.9</span>
      </div>
    </div>
  );
}
