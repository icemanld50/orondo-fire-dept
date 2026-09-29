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
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const countdownDays = useMemo(() => {
    return calculateCountdownDays(now, isBurnBanActive);
  }, [now, isBurnBanActive]);

  return (
    <div className={`w-full overflow-hidden border-b transition-colors ${
      isBurnBanActive 
        ? 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-900 text-red-950 dark:text-red-100 shadow-sm'
        : 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900 text-emerald-950 dark:text-emerald-100 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Status Label & Details */}
          <div className="flex items-center gap-3">
            <div className={`p-1.5 sm:p-2 rounded-xl flex-shrink-0 ${
              isBurnBanActive 
                ? 'bg-red-600 text-white shadow-sm' 
                : 'bg-emerald-600 text-white shadow-sm'
            }`}>
              {isBurnBanActive ? (
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  isBurnBanActive 
                    ? 'text-red-700 dark:text-red-300' 
                    : 'text-emerald-700 dark:text-emerald-300'
                }`}>
                  {isBurnBanActive ? 'Notice: Summer Burn Ban In Effect' : 'Notice: Open Burning Season Active'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                  • Orondo & East Columbia Corridor
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold mt-0.5 text-slate-800 dark:text-slate-100">
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

          {/* Right Action: Days Countdown & Link */}
          <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-between md:justify-end flex-shrink-0">
            {/* Days Countdown */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold shadow-sm ${
              isBurnBanActive
                ? 'bg-white/80 dark:bg-black/40 border-red-200 dark:border-red-800 text-red-800 dark:text-amber-300'
                : 'bg-white/80 dark:bg-black/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
            }`}>
              <Clock className="w-3.5 h-3.5 opacity-70 flex-shrink-0" />
              <span className="whitespace-nowrap">
                {isBurnBanActive ? (
                  `${countdownDays} ${countdownDays === 1 ? 'day' : 'days'} until lifted (Oct 1)`
                ) : (
                  `${countdownDays} ${countdownDays === 1 ? 'day' : 'days'} until next ban (June 1)`
                )}
              </span>
            </div>

            {/* Link Button */}
            <button
              onClick={onNavigateToBurning}
              className={`min-h-[44px] flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 text-white ${
                isBurnBanActive
                  ? 'bg-red-700 hover:bg-red-800'
                  : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
            >
              <span>{isBurnBanActive ? 'Restrictions' : 'Notice Form'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
