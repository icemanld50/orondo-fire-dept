import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, ChevronRight, ShieldAlert } from 'lucide-react';
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
    <div className={`w-full border-b ${
      isBurnBanActive 
        ? 'bg-red-950/70 border-red-900/50 text-red-100'
        : 'bg-emerald-950/70 border-emerald-900/50 text-emerald-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Status Label */}
          <div className="flex items-center gap-2.5">
            {isBurnBanActive ? (
              <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-semibold">
              {isBurnBanActive ? (
                <>
                  <strong className="text-white">Summer Burn Ban in Effect:</strong> Outdoor debris burning prohibited through Sept 30.
                </>
              ) : (
                <>
                  <strong className="text-white">Open Burning Permitted:</strong> Natural yard debris allowed (4x4x4 max pile).
                </>
              )}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-auto">
            <span className="text-xs text-slate-400 hidden md:inline">
              {isBurnBanActive 
                ? `${countdownDays} ${countdownDays === 1 ? 'day' : 'days'} until Oct 1 lifting`
                : `${countdownDays} ${countdownDays === 1 ? 'day' : 'days'} until June 1 ban`
              }
            </span>

            <button
              onClick={onNavigateToBurning}
              className={`min-h-[36px] flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-white ${
                isBurnBanActive
                  ? 'bg-red-600 hover:bg-red-500'
                  : 'bg-emerald-600 hover:bg-emerald-500'
              }`}
            >
              <span>{isBurnBanActive ? 'Burn Rules' : 'Notice Form'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
