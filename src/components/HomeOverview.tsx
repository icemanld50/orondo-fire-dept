import React from 'react';
import { 
  Flame, 
  Users, 
  Calendar, 
  HeartHandshake, 
  Heart,
  ExternalLink,
  Compass, 
  PhoneCall, 
  ArrowRight, 
  Building2, 
  Camera, 
  Gamepad2, 
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
    <div id="resident-roadmap" className="py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* ======================================================== */}
      {/* ACTION-ORIENTED HOME PAGE ROADMAP                        */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header: Clear, Bold, Uncluttered */}
        <div className="max-w-3xl">
          <span className="text-xs font-black uppercase tracking-widest text-red-500 block mb-1">
            District Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            How Can We Help You Today?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Select an action below to submit burning notifications, apply to volunteer, support frontline equipment, check public meeting dates, access wildfire maps, or contact headquarters.
          </p>
        </div>

        {/* 6 Action-Oriented Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* CARD 1: SUBMIT BURN REQUEST */}
          <div 
            onClick={() => onNavigate('burn-permits')}
            className={`rounded-2xl p-7 border transition-all cursor-pointer group flex flex-col justify-between space-y-6 ${
              isBurnBanActive 
                ? 'bg-slate-900/90 border-red-800/80 hover:border-red-500 hover:bg-slate-900 shadow-lg shadow-red-950/20' 
                : 'bg-slate-900/90 border-emerald-800/80 hover:border-emerald-500 hover:bg-slate-900 shadow-lg shadow-emerald-950/20'
            }`}
          >
            <div className="space-y-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isBurnBanActive 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              }`}>
                <Flame className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  Submit Burn Request
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {isBurnBanActive 
                  ? 'The annual summer burn ban is active. Outdoor debris burning is strictly prohibited. Check Douglas County guidelines and safety rules.' 
                  : 'Submit your required burn notification online before lighting natural yard debris. Pile size is limited to 4ft x 4ft x 4ft.'}
              </p>

              <div className="pt-2 text-xs font-bold">
                <span className={isBurnBanActive ? 'text-red-400' : 'text-emerald-400'}>
                  {isBurnBanActive ? '● Burn Ban in Effect (June 1 – Sept 30)' : '● Open Burning Permitted (Oct 1 – May 31)'}
                </span>
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('burn-permits'); }}
              className={`w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all shadow-md ${
                isBurnBanActive
                  ? 'bg-red-700 hover:bg-red-600'
                  : 'bg-emerald-700 hover:bg-emerald-600'
              }`}
            >
              <span>{isBurnBanActive ? 'View Burn Ban Guidelines' : 'Submit Burn Notice Online'}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 2: VOLUNTEER */}
          <div 
            onClick={() => onNavigate('volunteer')}
            className="rounded-2xl p-7 border border-slate-800 bg-slate-900/90 hover:border-amber-500 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-lg shadow-black/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  Volunteer With DCFD4
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Join our 100% volunteer department protecting lives and property across Orondo. Open to community members ages 16 and older across combat firefighting, EMS aid, support, and cadet tracks.
              </p>

              <div className="pt-2 text-xs text-slate-300">
                100% free NFPA turnout gear, certified academy training, and resident station dorms at Station 241.
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('volunteer'); }}
              className="w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-slate-950 transition-all shadow-md"
            >
              <span>Apply to Volunteer</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 3: DONATE */}
          <div 
            onClick={() => onNavigate('contact')}
            className="rounded-2xl p-7 border border-slate-800 bg-slate-900/90 hover:border-red-500 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-lg shadow-black/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                  Donate to Association
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Support the Orondo Firefighters Volunteer Association (501(c)(3) non-profit). 100% of contributions stay local to fund modern safety gear, medical equipment, and frontline apparatus.
              </p>

              <div className="pt-2 text-xs text-slate-300">
                Tax-deductible contributions directly funding frontline volunteer equipment.
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="https://www.paypal.com/donate?token=_0oLbUMVORj9lEdQGnlH3L_VMTZTAk-OsQN6wcJAb_9i-HsHqkwRQUIl-kZfZ3ggL2E6ubc1Lbs8cvTG"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-red-700 hover:bg-red-600 text-white transition-all shadow-md group/btn border border-red-500"
              >
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-amber-300 fill-amber-400" />
                  <span>Donate Online via PayPal</span>
                </span>
                <ExternalLink className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
              </a>

              <button
                onClick={(e) => { e.stopPropagation(); onNavigate('contact'); }}
                className="w-full min-h-[38px] flex items-center justify-center px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700/60"
              >
                <span>Mail Check / Tax Info</span>
              </button>
            </div>
          </div>

          {/* CARD 4: CALENDAR */}
          <div 
            onClick={() => onNavigate('calendar')}
            className="rounded-2xl p-7 border border-slate-800 bg-slate-900/90 hover:border-amber-500 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-lg shadow-black/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  District Calendar
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Official schedule for district governance, public commissioner hearings, and volunteer training drills. The Board of Commissioners meets on the 3rd Wednesday of each month at 5:30 PM at Station 241.
              </p>

              <div className="pt-2 text-xs text-slate-300">
                Public welcome at all commissioner meetings and community events.
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('calendar'); }}
              className="w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-md"
            >
              <span>View Full Calendar</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 5: RESOURCES */}
          <div 
            onClick={() => onNavigate('resources')}
            className="rounded-2xl p-7 border border-slate-800 bg-slate-900/90 hover:border-amber-500 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-lg shadow-black/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  Wildfire & Smoke Maps
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Real-time wildfire tracking and air quality monitoring for Central Washington. Track active fires via Watch Duty radio scanners, WA DNR incident maps, and EPA AirNow smoke plumes.
              </p>

              <div className="pt-2 text-xs text-slate-300">
                Instant access to verified multi-agency emergency radars and alert systems.
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('resources'); }}
              className="w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-amber-600 hover:bg-amber-500 text-slate-950 transition-all shadow-md"
            >
              <span>Open Wildfire Maps</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* CARD 6: CONTACT */}
          <div 
            onClick={() => onNavigate('contact')}
            className="rounded-2xl p-7 border border-slate-800 bg-slate-900/90 hover:border-slate-500 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between space-y-6 shadow-lg shadow-black/40"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-slate-200 transition-colors">
                  Contact Headquarters
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Connect with district headquarters at Station 241 (13984 US Highway 2, Orondo). Office: (509) 784-2941. RiverCom 24/7 Dispatch: (509) 663-9911. For emergencies, dial 911.
              </p>

              <div className="pt-2 text-xs text-slate-300">
                Office assistance, general inquiries, and station records.
              </div>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onNavigate('contact'); }}
              className="w-full min-h-[46px] flex items-center justify-between px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-md"
            >
              <span>Contact DCFD4</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Authentic Community & Frontline Apparatus Banner (100% Full Width) */}
        <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 aspect-[16/9] sm:aspect-[21/8] lg:aspect-[28/9] max-h-[440px]">
          <img 
            src="/assets/gallery/structure_attack_2014.jpg" 
            alt="Douglas County Fire District 4 volunteer firefighters and community parade apparatus" 
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECONDARY DISTRICT DIRECTORIES (CLEAN & SUBTLE)           */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">
              District Exploration & Facilities
            </h3>
            <p className="text-xs text-slate-400">
              Explore our 4 physical fire stations, authentic 40-year photo archive, or play the browser fire simulator.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* 1. Fire Stations & Fleet */}
          <div 
            onClick={() => onNavigate('stations')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-800 text-red-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block group-hover:text-red-400 transition-colors">
                  Stations & Fleet
                </span>
                <span className="text-xs text-slate-400 block">
                  Stations 241, 242, 243, 244
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

          {/* 2. Photo Gallery Archive */}
          <div 
            onClick={() => onNavigate('gallery')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-800 text-amber-400">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block group-hover:text-amber-400 transition-colors">
                  Photo Archive
                </span>
                <span className="text-xs text-slate-400 block">
                  19 Authentic Historical Photos
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

          {/* 3. Fire Attack Simulator Game */}
          <div 
            onClick={() => onNavigate('fire-game')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block group-hover:text-emerald-400 transition-colors">
                  Fire Attack Simulator
                </span>
                <span className="text-xs text-slate-400 block">
                  Wildland Defense Mini-Game
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* COMPACT AI ASSISTANT PROMPT                              */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-5 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">
                Need Fast Answers About District Services?
              </h4>
              <p className="text-xs text-slate-400">
                Our AI Assistant can guide you to burn rules, volunteer info, or meeting dates with direct links.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAi}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all active:scale-95 flex-shrink-0"
          >
            Ask Community AI Assistant
          </button>
        </div>
      </section>

    </div>
  );
};
