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
    <div className="relative w-full overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background Photography of Station 241 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/station41.jpg"
          alt="DCFD4 Station 241"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-110"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Column */}
          <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
            
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span>Station 241 HQ • Orondo, WA</span>
              </div>
              <span className="opacity-30 hidden sm:inline">•</span>
              <a
                href="tel:5097842941"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Office: (509) 784-2941</span>
              </a>
              <span className="opacity-30 hidden sm:inline">•</span>
              <span className="text-slate-400">
                Emergencies: Dial 911
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
                Courage • Dedication <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-400">
                  Teamwork • Tradition
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-slate-200">
                Douglas County Fire District No. 4
              </p>
            </div>

            {/* Concise Mission Statement */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              24/7 all-hazard fire suppression, wildland defense, and emergency medical services along the East Columbia River corridor.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('resident-roadmap');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="min-h-[44px] flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-950/40 transition-all active:scale-95"
              >
                <span>Resident Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('burn-permits')}
                className={`min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 border ${
                  isBurnBanActive
                    ? 'border-red-500/40 text-red-300 bg-red-950/30 hover:bg-red-950/50'
                    : 'border-emerald-500/40 text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/50'
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>{isBurnBanActive ? 'Burn Ban Rules' : 'Submit Burn Notice'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Clean Department Crest */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-xs flex flex-col items-center">
              
              <div className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center select-none">
                <div className="w-full h-full rounded-full p-1.5 bg-slate-900 border-2 border-red-600/70 shadow-2xl flex items-center justify-center">
                  <img
                    src="/assets/logo.png"
                    alt="Douglas County Fire District 4 Crest"
                    className="w-full h-full object-cover rounded-full"
                    width="200"
                    height="200"
                  />
                </div>
              </div>

              {/* Minimal Credentials */}
              <div className="mt-4 text-center space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  100% Volunteer Fire & EMS
                </div>
                <div className="text-xs text-slate-300">
                  4 Stations • 100+ Sq Miles • Est. 1946
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
