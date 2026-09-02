'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

// ─── Game Constants (16:9 Widescreen for PC, Responsive on Mobile) ───────────
const CANVAS_W = 560;
const CANVAS_H = 315;
const FLOOR_SPIKE_Y = 300;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  vx: number;
  vy: number;
  speed: number;
  jumpPower: number;
  gravity: number;
  isGrounded: boolean;
  color: string;
  isDead: boolean;
}

interface Platform {
  x: number;
  y: number;
  w: number;
  h: number;
  isMoving: boolean;
  vx: number;
  range: number;
  startX: number;
}

interface Spike {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Door {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

interface OfflineGameProps {
  onReturnToPortfolio?: () => void;
  customTitle?: string;
  customSubtitle?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function OfflineGame({
  onReturnToPortfolio,
  customTitle,
  customSubtitle,
}: OfflineGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState(1);
  const [isOnline, setIsOnline] = useState(false);

  // Game state refs (avoid re-renders during high-frequency loop)
  const playerRef = useRef<Player>(createPlayer());
  const platformsRef = useRef<Platform[]>([]);
  const spikesRef = useRef<Spike[]>([]);
  const doorRef = useRef<Door>({ x: 0, y: 0, w: 0, h: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const cameraXRef = useRef(0);
  const keysRef = useRef({ left: false, right: false, jump: false });
  const isPlayingRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const levelRef = useRef(1);
  const messageRef = useRef<{ text: string; color: string } | null>(null);
  const messageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Monitor network status
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsOnline(navigator.onLine);
    }
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ─── Calmer, Smoother Physics Setup ───────────────────────────────────────
  function createPlayer(): Player {
    return {
      x: 40,
      y: 170,
      width: 16,
      height: 24,
      vx: 0,
      vy: 0,
      speed: 1.65, // Slower, precise movement pace (was 2.2)
      jumpPower: -6.4, // Smooth jump height (was -7.5)
      gravity: 0.24, // Gentle gravity for a floatier, controllable arc (was 0.35)
      isGrounded: false,
      color: '#39ff14',
      isDead: false,
    };
  }

  function generateLevel(levelNum: number) {
    const platforms: Platform[] = [];
    const spikes: Spike[] = [];

    // Safe starting platform
    platforms.push({
      x: 0,
      y: 230,
      w: 120,
      h: 100,
      isMoving: false,
      vx: 0,
      range: 0,
      startX: 0,
    });

    let lastX = 120;
    let lastY = 230;
    const platformCount = 5 + levelNum * 2;
    const movingChance = Math.min(0.5, 0.15 + levelNum * 0.05);
    const spikeChance = Math.min(0.65, 0.25 + levelNum * 0.05);

    for (let i = 0; i < platformCount; i++) {
      // Balanced gap for calmer speed
      const gapX = Math.random() * 35 + 30; // 30 to 65px gap
      const gapY = (Math.random() - 0.5) * 60;
      let newY = lastY + gapY;
      newY = Math.max(110, Math.min(250, newY));
      const platWidth = Math.random() * 55 + 55; // 55 to 110px wide
      const shouldMove = i > 0 && i < platformCount - 1 && Math.random() < movingChance;
      const speed = shouldMove ? (Math.random() > 0.5 ? 0.45 : -0.45) : 0; // Gentle moving platform speed

      const p: Platform = {
        x: lastX + gapX,
        y: newY,
        w: platWidth,
        h: 300,
        isMoving: shouldMove,
        vx: speed,
        range: 45,
        startX: lastX + gapX,
      };
      platforms.push(p);

      // Add spikes on some wider static platforms
      if (!shouldMove && platWidth > 85 && Math.random() < spikeChance) {
        const spikeW = 18;
        spikes.push({
          x: p.x + p.w / 2 - spikeW / 2,
          y: p.y - 12,
          w: spikeW,
          h: 12,
        });
      }

      lastX = p.x + p.w;
      lastY = newY;
    }

    // Portal door at end
    const finalPlat = platforms[platforms.length - 1];
    const door: Door = {
      x: finalPlat.x + finalPlat.w / 2 - 15,
      y: finalPlat.y - 40,
      w: 30,
      h: 40,
    };

    platformsRef.current = platforms;
    spikesRef.current = spikes;
    doorRef.current = door;
  }

  // ─── Game Actions ─────────────────────────────────────────────────────────
  const startLevel = useCallback(() => {
    playerRef.current = createPlayer();
    generateLevel(levelRef.current);
    particlesRef.current = [];
    cameraXRef.current = 0;
    messageRef.current = null;
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
  }, []);

  const showMessage = useCallback(
    (text: string, color: string, duration: number, callback: () => void) => {
      messageRef.current = { text, color };
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
      messageTimerRef.current = setTimeout(() => {
        messageRef.current = null;
        callback();
      }, duration);
    },
    []
  );

  const triggerDeath = useCallback(() => {
    const player = playerRef.current;
    if (player.isDead) return;
    player.isDead = true;

    // Explosion particles
    const cx = player.x + player.width / 2;
    const cy = player.y + player.height / 2;
    for (let i = 0; i < 24; i++) {
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 1) * 8,
        life: 1,
        color: '#39ff14',
      });
    }

    showMessage('SYSTEM FAILURE\n\nREBOOTING...', '#ff003c', 1400, startLevel);
  }, [showMessage, startLevel]);

  const triggerNextLevel = useCallback(() => {
    const player = playerRef.current;
    if (player.isDead) return;
    player.isDead = true;

    levelRef.current++;
    setLevel(levelRef.current);

    showMessage(
      `LINK ESTABLISHED\n\nUPLOADING TO SECTOR ${levelRef.current}`,
      '#0ff',
      1400,
      startLevel
    );
  }, [showMessage, startLevel]);

  // ─── Game Loop ────────────────────────────────────────────────────────────
  const update = useCallback(() => {
    const player = playerRef.current;
    const keys = keysRef.current;
    const platforms = platformsRef.current;
    const spikes = spikesRef.current;
    const door = doorRef.current;

    if (player.isDead) {
      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= 0.025;
        if (p.life <= 0) particlesRef.current.splice(i, 1);
      }
      return;
    }

    // Moving platforms
    for (const p of platforms) {
      if (p.isMoving) {
        p.x += p.vx;
        if (Math.abs(p.x - p.startX) > p.range) p.vx *= -1;
      }
    }

    // Horizontal Input
    if (keys.left) player.vx = -player.speed;
    else if (keys.right) player.vx = player.speed;
    else player.vx = 0;

    // Jump Input
    if (keys.jump && player.isGrounded) {
      player.vy = player.jumpPower;
      player.isGrounded = false;
    }

    // Apply Gravity & Velocity
    player.vy += player.gravity;
    player.x += player.vx;
    player.y += player.vy;
    player.isGrounded = false;

    let standingOn: Platform | null = null;

    // Platform Collisions
    for (const p of platforms) {
      if (
        player.x < p.x + p.w &&
        player.x + player.width > p.x &&
        player.y < p.y + p.h &&
        player.y + player.height > p.y
      ) {
        if (player.vy > 0 && player.y + player.height - player.vy <= p.y + 12) {
          player.isGrounded = true;
          player.vy = 0;
          player.y = p.y - player.height;
          standingOn = p;
        }
      }
    }

    // Move player with moving platform
    if (standingOn?.isMoving) player.x += standingOn.vx;

    // Spike Collisions (tight collision box)
    const pb = {
      x: player.x + 3,
      y: player.y + 3,
      w: player.width - 6,
      h: player.height - 3,
    };
    for (const s of spikes) {
      if (
        pb.x < s.x + s.w &&
        pb.x + pb.w > s.x &&
        pb.y < s.y + s.h &&
        pb.y + pb.h > s.y
      ) {
        triggerDeath();
        return;
      }
    }

    // Floor Spike Death
    if (player.y + player.height >= FLOOR_SPIKE_Y) {
      player.y = FLOOR_SPIKE_Y - player.height;
      triggerDeath();
      return;
    }

    // Door Collision (Sector Complete)
    if (
      player.x < door.x + door.w &&
      player.x + player.width > door.x &&
      player.y < door.y + door.h &&
      player.y + player.height > door.y
    ) {
      triggerNextLevel();
      return;
    }

    // Smooth Camera Follow
    const targetCamX = player.x - 130;
    if (targetCamX > cameraXRef.current) {
      cameraXRef.current += (targetCamX - cameraXRef.current) * 0.07;
    }
    cameraXRef.current = Math.max(0, cameraXRef.current);
  }, [triggerDeath, triggerNextLevel]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const player = playerRef.current;
    const keys = keysRef.current;
    const cam = Math.floor(cameraXRef.current);

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.save();
    ctx.translate(-cam, 0);

    // Platforms
    for (const p of platformsRef.current) {
      const color = p.isMoving ? '#f0f' : '#0ff';
      ctx.fillStyle = '#111';
      ctx.fillRect(p.x, p.y, p.w, p.h);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(p.x, p.y, p.w, p.h);
      ctx.fillStyle = color;
      ctx.fillRect(p.x + 5, p.y + 5, p.w - 10, 2);
      ctx.fillRect(p.x + 5, p.y + 12, p.w - 10, 2);
    }

    // Spike Drawing
    const drawSpikes = (sx: number, sy: number, sw: number, sh: number) => {
      ctx.fillStyle = '#ff003c';
      ctx.beginPath();
      const spikeW = 10;
      const count = Math.ceil(sw / spikeW);
      for (let i = 0; i < count; i++) {
        const bx = sx + i * spikeW;
        ctx.moveTo(bx, sy + sh);
        ctx.lineTo(bx + spikeW / 2, sy);
        ctx.lineTo(bx + spikeW, sy + sh);
      }
      ctx.fill();
    };

    // Platform Spikes
    for (const s of spikesRef.current) drawSpikes(s.x, s.y, s.w, s.h);

    // Floor Spikes (fills full camera span)
    const startX = Math.floor(cam / 10) * 10;
    drawSpikes(
      startX - 30,
      FLOOR_SPIKE_Y,
      CANVAS_W + 60,
      CANVAS_H - FLOOR_SPIKE_Y
    );

    // Door Portal
    const door = doorRef.current;
    ctx.fillStyle = '#111';
    ctx.fillRect(door.x, door.y, door.w, door.h);
    ctx.strokeStyle = '#39ff14';
    ctx.strokeRect(door.x, door.y, door.w, door.h);
    ctx.fillStyle = 'rgba(57, 255, 20, 0.25)';
    ctx.fillRect(door.x, door.y, door.w, door.h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(door.x + 10, door.y + 10, 10, 20);

    // Player Robot
    if (!player.isDead) {
      const px = player.x;
      const py = player.y;
      ctx.fillStyle = player.color;
      ctx.fillRect(px, py + 4, 16, 16); // Body
      ctx.fillRect(px + 6, py - 4, 4, 8); // Antenna
      ctx.fillStyle = '#ff003c';
      ctx.fillRect(px + 6, py - 6, 4, 2); // Antenna tip
      ctx.fillStyle = '#000';
      if (keys.left) ctx.fillRect(px + 2, py + 8, 4, 4); // Look left
      else ctx.fillRect(px + 10, py + 8, 4, 4); // Look right
      ctx.fillStyle = '#555';
      ctx.fillRect(px - 2, py + 20, 20, 4); // Treads
    }

    // Particles
    for (const p of particlesRef.current) {
      ctx.fillStyle = `rgba(57, 255, 20, ${Math.max(0, p.life)})`;
      ctx.fillRect(p.x, p.y, 3, 3);
    }

    ctx.restore();

    // Message Overlay Screen
    const msg = messageRef.current;
    if (msg) {
      ctx.fillStyle = 'rgba(0,0,0,0.85)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = msg.color;
      ctx.font = '11px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      const lines = msg.text.split('\n');
      const startY = CANVAS_H / 2 - (lines.length * 18) / 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, CANVAS_W / 2, startY + i * 18);
      });
    }
  }, []);

  const gameLoop = useCallback(() => {
    if (!isPlayingRef.current) return;
    update();
    draw();
    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [update, draw]);

  // ─── Init & Cleanup ──────────────────────────────────────────────────────
  useEffect(() => {
    levelRef.current = 1;
    setLevel(1);
    startLevel();
    isPlayingRef.current = true;
    gameLoop();

    return () => {
      isPlayingRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, [startLevel, gameLoop]);

  // ─── Keyboard Controls ───────────────────────────────────────────────────
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keysRef.current.left = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keysRef.current.right = true;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW')
        keysRef.current.jump = true;
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') keysRef.current.left = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') keysRef.current.right = false;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW')
        keysRef.current.jump = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  // ─── Touch Controls Helper ───────────────────────────────────────────────
  const setupTouch = (keyName: 'left' | 'right' | 'jump') => ({
    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      keysRef.current[keyName] = true;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      e.preventDefault();
      keysRef.current[keyName] = false;
    },
    onMouseDown: () => {
      keysRef.current[keyName] = true;
    },
    onMouseUp: () => {
      keysRef.current[keyName] = false;
    },
    onMouseLeave: () => {
      keysRef.current[keyName] = false;
    },
  });

  return (
    <div
      className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-3 sm:p-6 select-none"
      style={{ touchAction: 'none' }}
    >
      {/* ── CONNECTION SECURE NOTIFICATION BANNER (When Wi-Fi / Online returns) ── */}
      {isOnline && onReturnToPortfolio && (
        <div className="w-full max-w-[500px] md:max-w-[720px] lg:max-w-[800px] mb-3 animate-fadeInUp">
          <button
            type="button"
            onClick={onReturnToPortfolio}
            className="w-full py-2.5 px-4 rounded-xl border-2 border-[#39ff14] bg-[#39ff14]/15 hover:bg-[#39ff14] text-[#39ff14] hover:text-black retro-font text-[10px] md:text-xs tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(57,255,20,0.35)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#39ff14] animate-ping shrink-0" />
            <span className="arcade-blink">
              &gt; CONNECTION SECURE — PRESS TO ENTER PORTFOLIO &lt;
            </span>
          </button>
        </div>
      )}

      {/* ── Header Status Bar (Wider on PC/Laptop) ── */}
      <div className="flex items-center justify-between w-full max-w-[500px] md:max-w-[720px] lg:max-w-[800px] mb-3 px-2">
        <div>
          {customTitle ? (
            <p className="retro-font text-[#ff003c] text-[10px] md:text-xs animate-pulse">
              {customTitle}
            </p>
          ) : isOnline ? (
            <p className="retro-font text-[#39ff14] text-[10px] md:text-xs font-bold">
              ● CONNECTION SECURE
            </p>
          ) : (
            <p className="retro-font text-[#ff003c] text-[10px] md:text-xs animate-pulse">
              NO SIGNAL
            </p>
          )}

          <p className="retro-font text-gray-400 text-[8px] md:text-[9px] mt-1">
            {customSubtitle || (isOnline ? 'LINK RESTORED' : 'EMERGENCY PROTOCOL')}
          </p>
        </div>

        <div className="text-right">
          <p className="retro-font text-white text-[10px] md:text-xs">
            SECTOR: <span className="text-[#0ff] font-bold">{level}</span>
          </p>
        </div>
      </div>

      {/* ── Game Canvas Container (Wider on PC/Laptop: max-w-[720px] / max-w-[800px]) ── */}
      <div className="relative w-full max-w-[500px] md:max-w-[720px] lg:max-w-[800px] border-4 border-zinc-700 rounded-sm overflow-hidden bg-black shadow-2xl">
        <canvas
          ref={canvasRef}
          className="arcade-canvas block w-full"
          width={CANVAS_W}
          height={CANVAS_H}
        />
      </div>

      {/* ── Mobile Controls (Touch Buttons) ── */}
      <div className="md:hidden flex justify-between w-full max-w-[500px] mt-4 px-2 gap-4">
        <div className="flex gap-2 w-1/2">
          <button
            type="button"
            className="arcade-action-btn h-12 w-full active:scale-95"
            {...setupTouch('left')}
          >
            ◀
          </button>
          <button
            type="button"
            className="arcade-action-btn h-12 w-full active:scale-95"
            {...setupTouch('right')}
          >
            ▶
          </button>
        </div>
        <button
          type="button"
          className="arcade-action-btn h-12 w-1/2 font-bold retro-font text-xs active:scale-95"
          {...setupTouch('jump')}
        >
          JUMP
        </button>
      </div>

      {/* ── Desktop Controls Hint ── */}
      <p className="hidden md:block retro-font text-gray-500 text-[9px] mt-4 text-center leading-relaxed">
        ARROWS / WASD TO MOVE • SPACE TO JUMP • AVOID RED SPIKES
      </p>
    </div>
  );
}
