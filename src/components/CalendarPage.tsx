import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Clock, 
  MapPin, 
  Download, 
  ExternalLink,
  Flame,
  Shield,
  Heart,
  Users,
  Building,
  Flag,
  CalendarDays,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import type { CalendarEvent, CategoryType } from '../types';
import { generateFullYearEvents } from '../data/calendarEvents';


const CATEGORY_CONFIG: Record<CategoryType, { label: string; color: string; bg: string; border: string; icon: any }> = {
  'commissioner': {
    label: 'Commissioner Meetings',
    color: 'text-slate-800 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-900',
    border: 'border-slate-300 dark:border-slate-700',
    icon: Building,
  },
  'burn-ban': {
    label: 'Burn Ban Season',
    color: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/60',
    border: 'border-red-200 dark:border-red-600/40',
    icon: Flame,
  },
  'open-burning': {
    label: 'Open Burning Season',
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/60',
    border: 'border-emerald-200 dark:border-emerald-600/40',
    icon: Shield,
  },
  'training': {
    label: 'Volunteer Training Drills',
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/60',
    border: 'border-amber-200 dark:border-amber-600/40',
    icon: Users,
  },
  'community': {
    label: 'Community Events & Open Houses',
    color: 'text-orange-700 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950/60',
    border: 'border-orange-200 dark:border-orange-600/40',
    icon: CalendarDays,
  },
  'clinic': {
    label: 'Health & CPR Clinics',
    color: 'text-pink-700 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-950/60',
    border: 'border-pink-200 dark:border-pink-600/40',
    icon: Heart,
  },
  'holiday': {
    label: 'Holiday Observances',
    color: 'text-slate-600 dark:text-slate-400',
    bg: 'bg-slate-100 dark:bg-slate-900',
    border: 'border-slate-200 dark:border-slate-800',
    icon: Flag,
  },
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const CalendarPage: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // null = 12-month year view
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'year' | 'agenda'>('year');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Current date evaluation for hiding past months by default
  const today = useMemo(() => new Date(), []);
  const currentActualYear = today.getFullYear();
  const currentActualMonth = today.getMonth(); // 0-indexed (Sept = 8)

  // Default: hide past months, showing current month as the start through the end of the year
  const [showPastMonths, setShowPastMonths] = useState(false);

  // Month indices to render in the grid
  const visibleMonthIndices = useMemo(() => {
    if (showPastMonths) {
      return Array.from({ length: 12 }, (_, i) => i);
    }
    // In current year, start from current month through index 11 (December)
    if (currentYear === currentActualYear) {
      const months: number[] = [];
      for (let m = currentActualMonth; m < 12; m++) {
        months.push(m);
      }
      return months;
    }
    return Array.from({ length: 12 }, (_, i) => i);
  }, [currentYear, showPastMonths, currentActualYear, currentActualMonth]);

  // Active category filters
  const [activeCategories, setActiveCategories] = useState<Record<CategoryType, boolean>>({
    'commissioner': true,
    'burn-ban': true,
    'open-burning': true,
    'training': true,
    'community': true,
    'clinic': true,
    'holiday': true,
  });

  // All events for the current year
  const allYearEvents = useMemo(() => {
    return generateFullYearEvents(currentYear);
  }, [currentYear]);

  // Filtered events based on sidebar checkboxes, selected month, and showPastMonths setting
  const filteredEvents = useMemo(() => {
    return allYearEvents.filter(ev => {
      if (!activeCategories[ev.category]) return false;
      const parts = ev.date.split('-');
      const evMonthIdx = parseInt(parts[1], 10) - 1; // 0-indexed

      if (selectedMonth !== null) {
        if (evMonthIdx !== selectedMonth) return false;
      } else if (!showPastMonths && currentYear === currentActualYear) {
        // By default, hide events from past months in the current year
        if (evMonthIdx < currentActualMonth) return false;
      }
      return true;
    });
  }, [allYearEvents, activeCategories, selectedMonth, showPastMonths, currentYear, currentActualYear, currentActualMonth]);


  // Count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      'commissioner': 0,
      'burn-ban': 0,
      'open-burning': 0,
      'training': 0,
      'community': 0,
      'clinic': 0,
      'holiday': 0,
    };
    allYearEvents.forEach(e => {
      if (counts[e.category] !== undefined) {
        counts[e.category]++;
      }
    });
    return counts;
  }, [allYearEvents]);

  const toggleCategory = (cat: CategoryType) => {
    setActiveCategories(prev => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const selectAllCategories = () => {
    setActiveCategories({
      'commissioner': true,
      'burn-ban': true,
      'open-burning': true,
      'training': true,
      'community': true,
      'clinic': true,
      'holiday': true,
    });
  };

  const clearAllCategories = () => {
    setActiveCategories({
      'commissioner': false,
      'burn-ban': false,
      'open-burning': false,
      'training': false,
      'community': false,
      'clinic': false,
      'holiday': false,
    });
  };

  // Helper to generate Google Calendar URL
  const getGoogleCalendarUrl = (event: CalendarEvent) => {
    const title = encodeURIComponent(`DCFD4: ${event.title}`);
    const details = encodeURIComponent(`${event.description}\n\nLocation: ${event.location}\nDouglas County Fire District 4`);
    const location = encodeURIComponent(event.location);
    const dateFormatted = event.date.replace(/-/g, '');
    const dates = `${dateFormatted}T180000Z/${dateFormatted}T200000Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Helper to generate .ics file for download
  const downloadIcsFile = (event: CalendarEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Douglas County Fire District 4//Calendar//EN
BEGIN:VEVENT
UID:${event.id}@dcfd4.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART;VALUE=DATE:${event.date.replace(/-/g, '')}
SUMMARY:DCFD4: ${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render a single miniature month calendar for the 12-month year grid
  const renderMiniMonth = (monthIndex: number) => {
    const firstDay = new Date(currentYear, monthIndex, 1).getDay();
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();

    // Events in this month
    const monthEvents = filteredEvents.filter(ev => {
      const parts = ev.date.split('-');
      return parseInt(parts[0]) === currentYear && parseInt(parts[1]) === monthIndex + 1;
    });

    const eventsByDay: Record<number, CalendarEvent[]> = {};
    monthEvents.forEach(e => {
      const day = parseInt(e.date.split('-')[2]);
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(e);
    });

    return (
      <div 
        key={monthIndex}
        className="app-card rounded-2xl p-4 transition-all flex flex-col justify-between"
      >
        <div>
          {/* Month Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                {MONTH_NAMES[monthIndex]}
              </h3>
              {currentYear === currentActualYear && monthIndex === currentActualMonth && (
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  Current
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {monthEvents.length} {monthEvents.length === 1 ? 'event' : 'events'}
            </span>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase pb-1">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Blank leading slots */}
            {Array.from({ length: firstDay }).map((_, idx) => (
              <div key={`blank-${idx}`} className="h-7" />
            ))}

            {/* Days of month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const hasEvents = eventsByDay[dayNum] && eventsByDay[dayNum].length > 0;
              const primaryEvent = hasEvents ? eventsByDay[dayNum][0] : null;
              const config = primaryEvent ? CATEGORY_CONFIG[primaryEvent.category] : null;

              return (
                <button
                  key={`day-${dayNum}`}
                  disabled={!hasEvents}
                  onClick={() => {
                    if (primaryEvent) setSelectedEvent(primaryEvent);
                  }}
                  className={`h-7 w-7 mx-auto rounded-lg flex flex-col items-center justify-center relative font-semibold transition-all ${
                    hasEvents
                      ? `${config?.bg} ${config?.color} border ${config?.border} hover:scale-110 cursor-pointer shadow-sm`
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  title={primaryEvent ? `${primaryEvent.title} (${primaryEvent.time || ''})` : ''}
                >
                  <span className="text-[11px]">{dayNum}</span>
                  {hasEvents && (
                    <span className="w-1 h-1 rounded-full bg-red-600 dark:bg-amber-400 mt-[-2px]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Month Event Highlights List */}
        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5 min-h-[56px]">
          {monthEvents.slice(0, 2).map(ev => {
            const cfg = CATEGORY_CONFIG[ev.category];
            return (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className={`w-full text-left text-[11px] font-semibold truncate px-2 py-1 rounded-md ${cfg.bg} ${cfg.color} border ${cfg.border} hover:brightness-110 dark:hover:brightness-125 transition-all flex items-center gap-1.5`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                <span className="truncate">{ev.title}</span>
              </button>
            );
          })}
          {monthEvents.length > 2 && (
            <button
              onClick={() => {
                setSelectedMonth(monthIndex);
                setViewMode('agenda');
              }}
              className="text-[10px] text-red-700 dark:text-amber-400 font-bold hover:underline block text-center w-full"
            >
              + {monthEvents.length - 2} more events
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen app-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Top Heading & Year Navigation Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-2">
              <CalendarIcon className="w-4 h-4" />
              <span>Full Year Master Schedule</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Community & District Calendar
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Official public meeting dates, volunteer training drills, annual burn ban windows, and community events.
            </p>
          </div>

          {/* Year Controls & View Toggle */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Year Step Buttons */}
            <div className="flex items-center app-card rounded-xl p-1">
              <button
                onClick={() => setCurrentYear(prev => prev - 1)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Previous Year"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 font-black text-slate-900 dark:text-white text-lg tracking-wide">
                {currentYear}
              </span>
              <button
                onClick={() => setCurrentYear(prev => prev + 1)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Next Year"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center app-card rounded-xl p-1">
              <button
                onClick={() => {
                  setViewMode('year');
                  setSelectedMonth(null);
                }}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'year'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                12-Month Year View
              </button>
              <button
                onClick={() => setViewMode('agenda')}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'agenda'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Agenda List View
              </button>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700"
            >
              <Filter className="w-4 h-4 text-red-600 dark:text-amber-400" />
              <span>Category Key</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left Sidebar Key + Right Calendar Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: CATEGORY KEY & FILTER PANEL                 */}
          {/* ======================================================== */}
          <aside className={`lg:col-span-4 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="app-card rounded-2xl p-6 shadow-sm space-y-6">
              
              {/* Key Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 border border-red-500/30">
                    <Filter className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-900 dark:text-white text-base tracking-wide uppercase">
                      Calendar Key
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Filter events by department category</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={selectAllCategories}
                    className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:underline px-1"
                  >
                    All
                  </button>
                  <span className="text-slate-400 dark:text-slate-600">|</span>
                  <button
                    onClick={clearAllCategories}
                    className="text-[11px] font-bold text-slate-500 dark:text-slate-400 hover:underline px-1"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Category Checkboxes List */}
              <div className="space-y-3">
                {(Object.keys(CATEGORY_CONFIG) as CategoryType[]).map(cat => {
                  const cfg = CATEGORY_CONFIG[cat];
                  const Icon = cfg.icon;
                  const isChecked = activeCategories[cat];
                  const count = categoryCounts[cat];

                  return (
                    <label
                      key={cat}
                      className={`min-h-[44px] flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? `${cfg.bg} ${cfg.border} shadow-sm`
                          : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 opacity-60 hover:opacity-80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${cfg.color}`} />
                          <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide">
                            {cfg.label}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                        isChecked ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Recurring Meeting Note */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-extrabold uppercase tracking-wide text-red-700 dark:text-amber-400 block">
                  🏛️ Commissioner Meetings
                </span>
                <p className="leading-relaxed">
                  Held regularly on the <strong className="text-slate-900 dark:text-white">3rd Wednesday of each month at 5:30 PM</strong> at Station 241 (13984 US Highway 2, Orondo). Public welcome!
                </p>
              </div>

              {/* Authentic Community Event Photo */}
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[16/10]">
                <img
                  src="/assets/gallery/community_event_2015.jpg"
                  alt="DCFD4 Community Outreach and Event"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Quick Subscribe & Download Info */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-2">
                <p className="font-semibold text-slate-800 dark:text-slate-300">Sync with your Personal Calendar:</p>
                <p className="text-[11px] leading-relaxed">
                  Click any event on the calendar to instantly add it to your Google Calendar or download standard Apple/Outlook .ics files.
                </p>
              </div>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* RIGHT CALENDAR VIEW: 12-MONTH GRID OR AGENDA LIST        */}
          {/* ======================================================== */}
          <main className="lg:col-span-8">
            {viewMode === 'year' ? (
              <div>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span>
                      {currentYear === currentActualYear && !showPastMonths
                        ? `Showing ${filteredEvents.length} events from ${MONTH_NAMES[currentActualMonth]} through December ${currentYear}`
                        : `Showing ${filteredEvents.length} scheduled events for ${currentYear}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {currentYear === currentActualYear && (
                      <button
                        onClick={() => setShowPastMonths(prev => !prev)}
                        className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        {showPastMonths ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
                            <span>Hide Past Months</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
                            <span>Show Past Months (Jan – {MONTH_NAMES[Math.max(0, currentActualMonth - 1)].slice(0, 3)})</span>
                          </>
                        )}
                      </button>
                    )}
                    <span className="text-red-700 dark:text-amber-400 font-semibold hidden md:inline">Tip: Click on highlighted days to view details</span>
                  </div>
                </div>

                {/* Visible Months Responsive Grid (1 col mobile, 2 col tablet, 3 col desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {visibleMonthIndices.map(mIdx => renderMiniMonth(mIdx))}
                </div>
              </div>
            ) : (
              /* Chronological Agenda Feed */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 gap-3">
                  <div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wide">
                      {currentYear} Chronological Agenda
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {currentYear === currentActualYear && !showPastMonths
                        ? `${filteredEvents.length} upcoming events (${MONTH_NAMES[currentActualMonth]} – December)`
                        : `${filteredEvents.length} events matching selected filters`}
                    </span>
                  </div>

                  {currentYear === currentActualYear && (
                    <button
                      onClick={() => setShowPastMonths(prev => !prev)}
                      className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-all flex items-center gap-1.5 self-start sm:self-center shadow-sm"
                    >
                      {showPastMonths ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
                          <span>Hide Past Months</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-red-600 dark:text-amber-400" />
                          <span>Show Past Months (Jan – {MONTH_NAMES[Math.max(0, currentActualMonth - 1)].slice(0, 3)})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {filteredEvents.length === 0 ? (
                  <div className="app-card rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400">
                    <p className="text-base font-semibold">No events match your selected category filters.</p>
                    <button
                      onClick={selectAllCategories}
                      className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white"
                    >
                      Reset Category Filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map(event => {
                      const cfg = CATEGORY_CONFIG[event.category];
                      const Icon = cfg.icon;

                      return (
                        <div
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`app-card rounded-2xl p-5 border transition-all cursor-pointer hover:scale-[1.01] ${cfg.border} shadow-md`}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className={`p-2.5 rounded-xl ${cfg.bg} ${cfg.color} border ${cfg.border} flex-shrink-0 mt-0.5 sm:mt-0`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                                    {cfg.label}
                                  </span>
                                  {event.isRecurring && (
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                                      Monthly Recurring
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
                                  {event.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-600 dark:text-slate-300 mt-1">
                                  <span className="flex items-center gap-1 font-semibold text-red-700 dark:text-amber-300">
                                    <CalendarIcon className="w-3.5 h-3.5" />
                                    {event.date}
                                  </span>
                                  {event.time && (
                                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                                      {event.time}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                                    {event.location}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                              className="min-h-[44px] self-end sm:self-center px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>

      </div>

      {/* ======================================================== */}
      {/* EVENT DETAILS MODAL                                      */}
      {/* ======================================================== */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg app-card rounded-2xl p-6 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full ${CATEGORY_CONFIG[selectedEvent.category].bg} ${CATEGORY_CONFIG[selectedEvent.category].color} border ${CATEGORY_CONFIG[selectedEvent.category].border}`}>
                  {CATEGORY_CONFIG[selectedEvent.category].label}
                </span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Event Title */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {selectedEvent.title}
              </h2>
            </div>

            {/* Event Metadata Cards */}
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <CalendarIcon className="w-4 h-4 text-red-600 dark:text-amber-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Date: </span>
                  <span>{selectedEvent.date}</span>
                  {selectedEvent.endDate && <span> through {selectedEvent.endDate}</span>}
                </div>
              </div>

              {selectedEvent.time && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">Time: </span>
                    <span>{selectedEvent.time}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">Location: </span>
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>{selectedEvent.description}</p>
            </div>

            {/* Export & Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={getGoogleCalendarUrl(selectedEvent)}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => downloadIcsFile(selectedEvent)}
                className="min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
              >
                <Download className="w-4 h-4 text-red-600 dark:text-amber-400" />
                <span>Download .ICS File</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
