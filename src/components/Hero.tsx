import React from 'react';
import { 
  Flame, 
  ArrowRight,
  PhoneCall,
  MapPin
} from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
  isBurnBanActive: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, isBurnBanActive }) => {
  return (
    <div className="relative w-full overflow-hidden border-b app-border transition-colors">
      {/* Background Photography of Station 241 with Theme-Aware Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/station41.jpg"
          alt="Douglas County Fire District 4 Station 241 Headquarters"
          className="w-full h-full object-cover object-center opacity-15 dark:opacity-40 filter contrast-105 scale-105 transform duration-1000"
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
        />
        {/* Light theme gradient overlay for maximum typographic clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/90 to-slate-100/70 dark:from-slate-950 dark:via-slate-950/75 dark:to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            
            {/* Clean Municipal Meta Info Row (Zero Pill Clutter, No Emergency Buttons) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-700 dark:text-red-400 flex-shrink-0" />
                <span>Station 241 HQ • Orondo, WA</span>
              </div>
              <span className="opacity-30 hidden sm:inline">•</span>
              <a
                href="tel:5097842941"
                className="flex items-center gap-1.5 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                title="Office Telephone"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>Office: (509) 784-2941</span>
              </a>
              <span className="opacity-30 hidden sm:inline">•</span>
              <span className="text-slate-500 dark:text-slate-400">
                Emergencies: Dial 911
              </span>
            </div>

            {/* Main Headline - High Contrast, Dignified */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white uppercase leading-tight">
                Courage • Dedication <br />
                <span className="text-red-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-red-500 dark:via-orange-400 dark:to-amber-300">
                  Teamwork • Tradition
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-200">
                Douglas County Fire District No. 4
              </p>
            </div>

            {/* Essential Mission Statement - Zero Fluff */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              24/7 all-hazard fire suppression, wildland protection, and emergency medical services across Orondo and the East Columbia River corridor.
            </p>

            {/* 2 Focused Hero Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('resident-roadmap');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="min-h-[46px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-red-700 hover:bg-red-800 text-white shadow-sm transition-all active:scale-95"
              >
                <span>Resident Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('burn-permits')}
                className={`min-h-[46px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 border app-surface shadow-sm ${
                  isBurnBanActive
                    ? 'border-red-600/40 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
                    : 'border-emerald-600/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>{isBurnBanActive ? 'Burn Ban Guidelines' : 'Submit Burn Request'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean, Authoritative Department Crest (No Water Animation, No Rotating Flames) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs flex flex-col items-center">
              
              {/* Prestigious Department Emblem Frame */}
              <div className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center select-none">
                <div className="w-full h-full rounded-full p-1.5 app-surface border-2 border-red-700/60 shadow-lg dark:shadow-2xl flex items-center justify-center">
                  <img
                    src="/assets/logo.png"
                    alt="Douglas County Fire District 4 Rattlesnake Crest"
                    className="w-full h-full object-cover rounded-full"
                    width="200"
                    height="200"
                  />
                </div>
              </div>

              {/* Department Credential Information - Clean Typography */}
              <div className="mt-4 text-center space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-amber-400">
                  100% Volunteer Fire & EMS
                </div>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  4 Stations • 100+ Square Miles • Est. 1946
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Serving Orondo, Brays Landing, Lone Pine & Beebe Bridge
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
