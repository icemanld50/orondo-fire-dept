import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, ChevronRight, ShieldAlert, Clock } from 'lucide-react';
import { calculateCountdownDays } from '../services/burnBanService';

interface LiveAlertBannerProps {
  isBurnBanActive: boolean;
  onNavigateToBurning: () => void;
}

export const LiveAlertBanner: React.FC<LiveAlertBannerProps> = ({
  isBurnBanActive,
  onNavigateToBurning,
}) => {
  // Real-time ticker to auto-refresh countdown at midnight without reload
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Days countdown calculation in clean plain English logic
  const countdownDays = useMemo(() => {
    return calculateCountdownDays(now, isBurnBanActive);
  }, [now, isBurnBanActive]);

  return (
    <div className={`w-full overflow-hidden border-b transition-colors ${
      isBurnBanActive 
        ? 'bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-red-800 text-red-100 shadow-inner'
        : 'bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-emerald-800 text-emerald-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Status Label & Details */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl flex-shrink-0 ${
              isBurnBanActive ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {isBurnBanActive ? (
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isBurnBanActive ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {isBurnBanActive ? 'Official Notice: Burn Ban In Effect' : 'Season Status: Open Burning Permitted'}
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  Orondo & East Columbia Corridor
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                {isBurnBanActive ? (
                  <>
                    Annual Douglas County Burn Ban is active (June 1 – Sept 30). Outdoor debris burning strictly prohibited.
                  </>
                ) : (
                  <>
                    Natural yard debris burning permitted (Oct 1 – May 31). Max 4ft x 4ft x 4ft pile size.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right Action: Days Countdown Badge + Details Link */}
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-between md:justify-end flex-shrink-0">
            {/* Days Countdown Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border shadow-sm ${
              isBurnBanActive
                ? 'bg-black/40 border-amber-500/70 text-amber-300'
                : 'bg-black/30 border-emerald-500/50 text-emerald-300'
            }`}>
              <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wide whitespace-nowrap">
                {isBurnBanActive ? (
                  `${countdownDays} ${countdownDays === 1 ? 'Day' : 'Days'} Until Lifted (Oct 1)`
                ) : (
                  `${countdownDays} ${countdownDays === 1 ? 'Day' : 'Days'} Until Next Ban (June 1)`
                )}
              </span>
            </div>

            {/* Link Button */}
            <button
              onClick={onNavigateToBurning}
              className={`min-h-[44px] flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                isBurnBanActive
                  ? 'bg-red-700 hover:bg-red-600 text-white border border-red-500'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500'
              }`}
            >
              <span>{isBurnBanActive ? 'Restrictions' : 'Notice Form'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
