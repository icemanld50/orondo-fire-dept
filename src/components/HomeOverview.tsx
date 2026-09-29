import React from 'react';
import { 
  Flame, 
  Users, 
  Calendar, 
  Heart,
  ExternalLink,
  PhoneCall, 
  ArrowRight, 
  Building2, 
  Camera, 
  Info,
  MapPin,
  Sparkles 
} from 'lucide-react';

interface HomeOverviewProps {
  onNavigate: (tab: string) => void;
  onOpenAi: () => void;
  isBurnBanActive: boolean;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({ 
  onNavigate, 
  onOpenAi, 
  isBurnBanActive 
}) => {
  return (
    <div id="resident-roadmap" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
      
      {/* ======================================================== */}
      {/* ACTION-ORIENTED DISTRICT SERVICES ROADMAP                */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header: Clear, Bold, Uncluttered */}
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-red-700 dark:text-red-400 block mb-1">
            District Services
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            How Can We Help You Today?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            Essential district services, outdoor burning guidelines, volunteer applications, and meeting schedules.
          </p>
        </div>

        {/* 6 Action-Oriented Cards - Icons are NOT the focus, Titles are primary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          
          {/* CARD 1: SUBMIT BURN REQUEST */}
          <div 
            onClick={() => onNavigate('burn-permits')}
            className={`rounded-2xl p-6 sm:p-7 border app-card transition-all cursor-pointer group flex flex-col justify-between space-y-5 ${
              isBurnBanActive 
                ? 'border-red-200 dark:border-red-900/60 hover:border-red-500' 
                : 'border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-500'
            }`}
          >
            <div className="space-y-3">
              {/* Subtle Inline Header Accent: Icon is small and secondary */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Permits & Safety
                </span>
                <Flame className={`w-4 h-4 ${isBurnBanActive ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`} />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                Outdoor Burning Permits
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {isBurnBanActive 
                  ? 'Annual summer burn ban is active. Debris burning is prohibited in Douglas County. Review restrictions and air quality rules.' 
                  : 'Submit your required burn notification online before burning natural yard debris. Pile size is limited to 4ft x 4ft x 4ft.'}
              </p>

              <div className="text-xs font-semibold pt-1">
                <span className={isBurnBanActive ? 'text-red-700 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}>
                  {isBurnBanActive ? '● Burn Ban Active (June 1 – Sept 30)' : '● Open Burning Permitted (Oct 1 – May 31)'}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('burn-permits'); }}
              className={`w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-sm ${
                isBurnBanActive
                  ? 'bg-red-700 hover:bg-red-800'
                  : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
            >
              <span>{isBurnBanActive ? 'View Burn Rules' : 'Submit Burn Notice'}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 2: VOLUNTEER */}
          <div 
            onClick={() => onNavigate('volunteer')}
            className="rounded-2xl p-6 sm:p-7 border app-card hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Recruitment
                </span>
                <Users className="w-4 h-4 text-slate-600 dark:text-amber-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                Volunteer Firefighter & EMT
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Join our 100% volunteer department. 100% free NFPA turnout gear, certified academy training, and resident station dorms at Station 241.
              </p>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                Open to community members ages 16+ across Combat, EMS, Support & Cadet roles.
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('volunteer'); }}
              className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <span>Apply to Volunteer</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 3: DONATE */}
          <div 
            onClick={() => onNavigate('contact')}
            className="rounded-2xl p-6 sm:p-7 border app-card hover:border-red-400 transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  501(c)(3) Non-Profit
                </span>
                <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                Donate to Association
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Support the Orondo Firefighters Volunteer Association. Tax-deductible contributions directly fund specialized rescue gear and life-saving equipment.
              </p>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                Tax-exempt non-profit donations via PayPal online or physical mail to PO Box 258.
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="https://www.paypal.com/donate?token=_0oLbUMVORj9lEdQGnlH3L_VMTZTAk-OsQN6wcJAb_9i-HsHqkwRQUIl-kZfZ3ggL2E6ubc1Lbs8cvTG"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-red-700 hover:bg-red-800 text-white transition-all shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Donate Online (PayPal)</span>
                </div>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('contact'); }}
                className="w-full min-h-[38px] flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                <span>Tax Information & Mail Inquiries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD 4: CALENDAR */}
          <div 
            onClick={() => onNavigate('calendar')}
            className="rounded-2xl p-6 sm:p-7 border app-card hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Governance & Drills
                </span>
                <Calendar className="w-4 h-4 text-slate-600 dark:text-purple-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                District Calendar
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Public Fire Commissioner meetings (3rd Wednesday of every month at 5:30 PM at Station 241) and bi-weekly Tuesday training evolutions.
              </p>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                Export to Google Calendar or download .ics files for Apple Calendar & Outlook.
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('calendar'); }}
              className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-all border app-border"
            >
              <span>View Public Calendar</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 5: WILDFIRE MAPS & RADAR */}
          <div 
            onClick={() => onNavigate('resources')}
            className="rounded-2xl p-6 sm:p-7 border app-card hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Incident Intelligence
                </span>
                <MapPin className="w-4 h-4 text-slate-600 dark:text-blue-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                Wildfire Maps & Radar
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Real-time incident intelligence: Watch Duty radio monitoring, WA DNR active fire dashboard, and EPA AirNow smoke radar.
              </p>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                Verified links to Douglas County Emergency Management and Everbridge Evacuation alerts.
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('resources'); }}
              className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-all border app-border"
            >
              <span>Access Wildfire Maps</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 6: CONTACT HEADQUARTERS */}
          <div 
            onClick={() => onNavigate('contact')}
            className="rounded-2xl p-6 sm:p-7 border app-card hover:border-slate-400 dark:hover:border-slate-600 transition-all cursor-pointer group flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Headquarters
                </span>
                <PhoneCall className="w-4 h-4 text-slate-600 dark:text-emerald-400" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                Contact & Administration
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect with district leadership, station administration, and public records coordination.
              </p>

              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5 pt-1">
                <div>Office: (509) 784-2941</div>
                <div>Station 241: 13984 US Highway 2, Orondo, WA</div>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('contact'); }}
              className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition-all border app-border"
            >
              <span>Contact Directory</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Authentic Frontline Apparatus & Crew Photo Banner */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border app-border shadow-md aspect-[16/7] sm:aspect-[24/8] max-h-[360px]">
          <img 
            src="/assets/gallery/structure_attack_2014.jpg" 
            alt="Douglas County Fire District 4 Frontline Apparatus and Volunteer Crew" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
            width="1200"
            height="400"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
        </div>

      </section>

      {/* ======================================================== */}
      {/* SECONDARY DISTRICT DIRECTORIES (CLEAN CIVIC STRIP)       */}
      {/* (Mini game completely hidden from menu per user request)  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto pt-4 border-t app-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">
              District Facilities & History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explore our 4 physical fire stations, apparatus roster, and historical photo archive.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* 1. Fire Stations & Fleet */}
          <div 
            onClick={() => onNavigate('stations')}
            className="p-4 sm:p-5 rounded-2xl app-card hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer group transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-red-700 dark:text-red-400 border app-border">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                  Stations & Fleet
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  Stations 241, 242, 243, 244
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

          {/* 2. Photo Gallery Archive */}
          <div 
            onClick={() => onNavigate('gallery')}
            className="p-4 sm:p-5 rounded-2xl app-card hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer group transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 border app-border">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                  Photo Archive
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  19 Authentic Historical Photos
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

          {/* 3. About & Leadership (Replacing Mini Game) */}
          <div 
            onClick={() => onNavigate('about')}
            className="p-4 sm:p-5 rounded-2xl app-card hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer group transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border app-border">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                  About DCFD4
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  Mission & Leadership Roster
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* COMPACT AI ASSISTANT PROMPT                              */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-5 app-surface border app-border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Need Fast Answers About District Services?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Our AI Assistant can guide you to burn rules, volunteer info, or meeting dates with direct links.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAi}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex-shrink-0"
          >
            Ask Community Assistant
          </button>
        </div>
      </section>

    </div>
  );
};
