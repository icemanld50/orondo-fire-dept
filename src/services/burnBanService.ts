/**
 * Douglas County Fire District No. 4 (Orondo Fire Department)
 * Official Seasonal Burn Ban & Open Burning Schedule Service
 *
 * Seasonal Window Rules (Douglas County Code Chapter 8.12):
 * - Summer Burn Ban Active: June 1 at 00:00:00 through September 30 at 23:59:59
 * - Open Burning Permitted: October 1 at 00:00:00 through May 31 at 23:59:59
 */

export interface BurnBanState {
  isBurnBanActive: boolean;
  countdownDays: number;
  seasonLabel: string;
  seasonSummary: string;
  badgeLabel: string;
  targetDateLabel: string;
  ctaButtonText: string;
}

/**
 * Evaluates whether the Douglas County Burn Ban is currently active for any given Date.
 * Month in JS Date is 0-indexed (June = 5, July = 6, August = 7, September = 8).
 */
export function isBurnBanDate(date: Date = new Date()): boolean {
  const month = date.getMonth(); // 0-11
  // June (5), July (6), August (7), September (8)
  return month >= 5 && month <= 8;
}

/**
 * Calculates remaining days until the next seasonal transition.
 * Plain English arithmetic without LaTeX math.
 */
export function calculateCountdownDays(date: Date = new Date(), isActive?: boolean): number {
  const currentYear = date.getFullYear();
  const active = typeof isActive === 'boolean' ? isActive : isBurnBanDate(date);

  if (active) {
    // Burn ban ends October 1 at 00:00:00 of the current year (Month index 9 is October)
    const liftDate = new Date(currentYear, 9, 1, 0, 0, 0);
    const diffMs = liftDate.getTime() - date.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  } else {
    // Open burning ends next June 1 at 00:00:00 (Month index 5 is June)
    // If we are currently in Oct-Dec (month >= 9), next ban is next year's June
    const nextBanYear = date.getMonth() >= 9 ? currentYear + 1 : currentYear;
    const banDate = new Date(nextBanYear, 5, 1, 0, 0, 0);
    const diffMs = banDate.getTime() - date.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  }
}

/**
 * Returns complete reactive UI state for banner and roadmap cards.
 */
export function getBurnBanDetails(date: Date = new Date()): BurnBanState {
  const active = isBurnBanDate(date);
  const countdown = calculateCountdownDays(date, active);

  if (active) {
    return {
      isBurnBanActive: true,
      countdownDays: countdown,
      seasonLabel: 'Official Notice: Burn Ban In Effect',
      seasonSummary: 'Annual Douglas County Burn Ban is active (June 1 – Sept 30). Outdoor debris burning strictly prohibited.',
      badgeLabel: `${countdown} ${countdown === 1 ? 'Day' : 'Days'} Until Lifted (Oct 1)`,
      targetDateLabel: 'Lifted on October 1',
      ctaButtonText: 'View Burn Ban Guidelines',
    };
  } else {
    return {
      isBurnBanActive: false,
      countdownDays: countdown,
      seasonLabel: 'Season Status: Open Burning Permitted',
      seasonSummary: 'Natural yard debris burning permitted (Oct 1 – May 31). Max 4ft x 4ft x 4ft pile size.',
      badgeLabel: `${countdown} ${countdown === 1 ? 'Day' : 'Days'} Until Next Ban (June 1)`,
      targetDateLabel: 'Active through May 31',
      ctaButtonText: 'Submit Burn Notice Online',
    };
  }
}
