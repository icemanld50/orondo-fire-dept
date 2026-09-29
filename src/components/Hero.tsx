import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
  isBurnBanActive: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, isBurnBanActive }) => {
  // Easter egg: Flame circle is burning by default; clicking it sprays water and puts it out permanently
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [isSpraying, setIsSpraying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleEmblemClick = () => {
    // If already extinguished, it should NOT relight
    if (isExtinguished) {
      return;
    }

    setIsSpraying(true);
    setIsExtinguished(true);

    // Procedural Web Audio: High-pressure firefighter hose spray rush + sizzling steam
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        
        // 1. High-pressure water jet rushing sound
        const waterBufferSize = Math.floor(ctx.sampleRate * 1.6);
        const waterBuffer = ctx.createBuffer(1, waterBufferSize, ctx.sampleRate);
        const waterData = waterBuffer.getChannelData(0);
        for (let i = 0; i < waterBufferSize; i++) {
          waterData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.45));
        }

        const waterNoise = ctx.createBufferSource();
        waterNoise.buffer = waterBuffer;

        const waterFilter = ctx.createBiquadFilter();
        waterFilter.type = 'bandpass';
        waterFilter.frequency.setValueAtTime(1600, ctx.currentTime);
        waterFilter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 1.2);
        waterFilter.Q.setValueAtTime(2.5, ctx.currentTime);

        const waterGain = ctx.createGain();
        waterGain.gain.setValueAtTime(0.25, ctx.currentTime);
        waterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

        waterNoise.connect(waterFilter);
        waterFilter.connect(waterGain);
        waterGain.connect(ctx.destination);
        waterNoise.start();

        // 2. High-frequency sizzling steam sizzle
        const sizzleBuffer = ctx.createBuffer(1, waterBufferSize, ctx.sampleRate);
        const sizzleData = sizzleBuffer.getChannelData(0);
        for (let i = 0; i < waterBufferSize; i++) {
          sizzleData[i] = (Math.random() * 2 - 1) * (1 - i / waterBufferSize);
        }

        const sizzleSource = ctx.createBufferSource();
        sizzleSource.buffer = sizzleBuffer;

        const sizzleFilter = ctx.createBiquadFilter();
        sizzleFilter.type = 'highpass';
        sizzleFilter.frequency.setValueAtTime(3500, ctx.currentTime);

        const sizzleGain = ctx.createGain();
        sizzleGain.gain.setValueAtTime(0.12, ctx.currentTime);
        sizzleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);

        sizzleSource.connect(sizzleFilter);
        sizzleFilter.connect(sizzleGain);
        sizzleGain.connect(ctx.destination);
        sizzleSource.start();
      }
    } catch (_) {}

    // Water spray animation sequence lasts 1600ms
    setTimeout(() => {
      setIsSpraying(false);
    }, 1600);

    // Note: Once extinguished, it NEVER rekindles or relights
  };

  // Canvas particle animation simulating the Fire Attack game's water spray & steam physics
  useEffect(() => {
    if (!isSpraying || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;
    const maxFrames = 96; // ~1.6s @ 60fps

    interface WaterDrop {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      life: number;
      maxLife: number;
    }

    interface SteamPuff {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const waterParticles: WaterDrop[] = [];
    const steamParticles: SteamPuff[] = [];

    const nozzleX = 25;
    const nozzleY = canvas.height - 25;
    const targetX = canvas.width / 2;
    const targetY = canvas.height / 2;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frame++;

      // 1. Spawn pressurized water drops from nozzle while spraying
      if (frame < maxFrames - 20) {
        for (let i = 0; i < 5; i++) {
          const angle = Math.atan2(targetY - nozzleY, targetX - nozzleX) + (Math.random() - 0.5) * 0.18;
          const speed = 12 + Math.random() * 4;
          waterParticles.push({
            x: nozzleX + (Math.random() - 0.5) * 4,
            y: nozzleY + (Math.random() - 0.5) * 4,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 2.2 + Math.random() * 1.6,
            life: 0,
            maxLife: 28 + Math.random() * 8,
          });
        }
      }

      // 2. Draw firefighter nozzle tip
      ctx.save();
      ctx.translate(nozzleX, nozzleY);
      const nozzleAngle = Math.atan2(targetY - nozzleY, targetX - nozzleX);
      ctx.rotate(nozzleAngle);
      ctx.fillStyle = '#b45309'; // Brass nozzle
      ctx.fillRect(-6, -5, 20, 10);
      ctx.fillStyle = '#94a3b8'; // Chrome nozzle tip
      ctx.fillRect(14, -4, 6, 8);
      ctx.restore();

      // 3. Update & render water stream particles (identical to game physics)
      for (let i = waterParticles.length - 1; i >= 0; i--) {
        const p = waterParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // Gravity arc
        p.life++;

        // Draw glowing cyan water drop
        ctx.fillStyle = 'rgba(56, 189, 248, 0.95)';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Collision with flame ring -> Spawns billowing steam
        const distToCenter = Math.hypot(p.x - targetX, p.y - targetY);
        if (distToCenter < 110 && Math.random() < 0.45) {
          steamParticles.push({
            x: p.x + (Math.random() - 0.5) * 10,
            y: p.y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -1.2 - Math.random() * 2,
            radius: 6 + Math.random() * 6,
            alpha: 0.75,
          });
        }

        if (p.life >= p.maxLife || p.x > canvas.width || p.y > canvas.height) {
          waterParticles.splice(i, 1);
        }
      }

      // 4. Update & render billowy rising steam puffs
      for (let j = steamParticles.length - 1; j >= 0; j--) {
        const s = steamParticles[j];
        s.x += s.vx;
        s.y += s.vy;
        s.radius += 0.4;
        s.alpha -= 0.022;

        if (s.alpha <= 0) {
          steamParticles.splice(j, 1);
          continue;
        }

        ctx.fillStyle = `rgba(240, 249, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frame < maxFrames || waterParticles.length > 0 || steamParticles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpraying]);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      {/* Background Station Image - Brought through visibly with balanced overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/station41.jpg"
          alt="Douglas County Fire District 4 Station 241 Headquarters"
          className="w-full h-full object-cover object-center opacity-45 filter contrast-105 scale-105 transform duration-1000"
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/35" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/50 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            
            {/* Header Tagline & Phone Dialers */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Station 241 Headquarters • Orondo, WA</span>
              </div>

              <a
                href="tel:911"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm border border-red-400 shadow-lg shadow-red-950/40 transition-all active:scale-95"
                title="Call 911 for Emergencies"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Emergency: Call 911</span>
              </a>

              <a
                href="tel:5097842941"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-md transition-all active:scale-95 text-xs sm:text-sm font-semibold"
                title="Call Station 241 Office"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>(509) 784-2941</span>
              </a>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none drop-shadow-lg">
                Courage • Dedication <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300">
                  Teamwork • Tradition
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-slate-200 drop-shadow-md">
                Douglas County Fire District No. 4
              </p>
            </div>

            {/* Concise Mission Statement */}
            <p className="text-base sm:text-lg text-slate-200/95 max-w-2xl leading-relaxed drop-shadow-md">
              Providing 24/7 all-hazard fire suppression, wildland protection, and emergency medical services across the East Columbia River corridor and orchards.
            </p>

            {/* 2 Focused Hero Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('resident-roadmap');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="min-h-[46px] flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-orange-950/40 transition-all active:scale-95"
              >
                <span>Resident Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('burn-permits')}
                className={`min-h-[46px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md ${
                  isBurnBanActive
                    ? 'bg-slate-900 hover:bg-slate-800 text-red-300 border border-red-600/60'
                    : 'bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-600/60'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>{isBurnBanActive ? 'Burn Ban Details' : 'Submit Burn Request'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Rattlesnake Emblem with Active Burning Flame Circle (Easter Egg Extinguish) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs flex flex-col items-center">
              
              {/* Interactive Emblem Container */}
              <div 
                onClick={handleEmblemClick}
                className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-full cursor-pointer flex items-center justify-center select-none group"
              >
                {/* 1. ACTIVELY BURNING FLAME CIRCLE (BY DEFAULT) */}
                {!isExtinguished && (
                  <>
                    {/* Fiery Outer Rotating Dashed Ring 1 */}
                    <div className="absolute -inset-4 sm:-inset-5 rounded-full border-4 border-dashed border-amber-500 animate-[spin_8s_linear_infinite] opacity-90 pointer-events-none" />
                    
                    {/* Fiery Inner Counter-Rotating Ring 2 */}
                    <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border-2 border-dashed border-red-500 animate-[spin_5s_linear_infinite_reverse] opacity-80 pointer-events-none" />
                    
                    {/* Warm Fire Glow Backlight */}
                    <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-red-600/40 via-orange-500/35 to-amber-400/40 blur-xl animate-pulse pointer-events-none" />
                  </>
                )}

                {/* 2. REAL-TIME CANVAS WATER SPRAY & STEAM ANIMATION (GAME PHYSICS) */}
                {isSpraying && (
                  <canvas
                    ref={canvasRef}
                    width={260}
                    height={260}
                    className="absolute -inset-4 z-40 pointer-events-none"
                  />
                )}

                {/* Emblem Image Frame */}
                <div className={`relative z-10 w-full h-full rounded-full bg-slate-900 border-4 p-1 shadow-2xl transition-all duration-500 ${
                  isExtinguished 
                    ? 'border-slate-700 shadow-slate-950/60 filter grayscale-[0.2]' 
                    : 'border-amber-400 shadow-orange-950/90 ring-4 ring-orange-500/40 group-hover:scale-105'
                }`}>
                  <img
                    src="/assets/logo.png"
                    alt="Douglas County Fire District 4 Rattlesnake Insignia"
                    className="w-full h-full object-cover rounded-full pointer-events-none"
                  />
                </div>
              </div>

              {/* Single-Source Department Identity below Emblem */}
              <div className="mt-4 text-center space-y-1">
                <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-xs uppercase tracking-wider">
                  100% Volunteer Fire & EMS
                </span>
                <p className="text-xs text-slate-300 font-semibold pt-1">
                  4 Stations • 100+ Sq Miles • Est. 1946
                </p>
                <p className="text-[11px] text-slate-400">
                  Protecting Orondo • Brays • Lone Pine • Beebe Bridge
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
