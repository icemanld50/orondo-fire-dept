import React from 'react';
import { 
  Flame, 
  Users, 
  Calendar, 
  Heart,
  ExternalLink,
  ArrowRight, 
  Building2, 
  Camera, 
  Info,
  MapPin
} from 'lucide-react';
import { PAYPAL_DONATION_URL } from '../data/donationConfig';

interface HomeOverviewProps {
  onNavigate: (tab: string) => void;
  isBurnBanActive: boolean;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({ 
  onNavigate, 
  isBurnBanActive 
}) => {
  return (
    <div id="resident-roadmap" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Services Section */}
      <section className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 block mb-1">
            Resident Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            How Can We Help You?
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Access burning notices, recruitment, meetings, maps, and district directory.
          </p>
        </div>

        {/* 6 Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Card 1: Burn Rules */}
          <div 
            onClick={() => onNavigate('burn-permits')}
            className="rounded-2xl p-6 bg-slate-800/85 border border-slate-700/80 hover:border-red-500/70 hover:bg-slate-800 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg shadow-black/30"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  Burn Rules & Notice
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isBurnBanActive 
                  ? 'Summer burn ban in effect. Outdoor debris burning is prohibited until Oct 1.'
                  : 'Open burning permitted for clean yard debris. 4x4x4 pile maximum with water on site.'}
              </p>
            </div>
            <button className="min-h-[44px] w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-red-600 text-white border border-slate-700/60 hover:border-red-500 transition-colors">
              <span>{isBurnBanActive ? 'View Ban Guidelines' : 'Submit Burn Notice'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Volunteer */}
          <div 
            onClick={() => onNavigate('volunteer')}
            className="rounded-2xl p-6 bg-slate-800/85 border border-slate-700/80 hover:border-red-500/70 hover:bg-slate-800 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg shadow-black/30"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  Volunteer Fire & EMS
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Serve your neighbors. Free state-certified academy training, NFPA turnout gear, and station living quarters.
              </p>
            </div>
            <button className="min-h-[44px] w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-red-600 text-white border border-slate-700/60 hover:border-red-500 transition-colors">
              <span>Apply to Volunteer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: 501(c)(3) Donations */}
          <div className="rounded-2xl p-6 bg-slate-800/85 border border-amber-500/40 hover:border-amber-500/80 hover:bg-slate-800 transition-all flex flex-col justify-between space-y-4 shadow-lg shadow-black/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">
                  Donate to Volunteers
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Orondo Firefighters Volunteer Association (501c3). 100% of contributions fund rescue tools and medical equipment.
              </p>
            </div>
            <div className="space-y-2">
              <a
                href={PAYPAL_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all shadow-md"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Donate via PayPal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={() => onNavigate('contact')}
                className="w-full text-center text-[11px] font-semibold text-slate-300 hover:text-white transition-colors py-1"
              >
                Mail Check / Tax Info →
              </button>
            </div>
          </div>

          {/* Card 4: Calendar */}
          <div 
            onClick={() => onNavigate('calendar')}
            className="rounded-2xl p-6 bg-slate-800/85 border border-slate-700/80 hover:border-red-500/70 hover:bg-slate-800 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg shadow-black/30"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  District Calendar
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fire Commissioner meetings (3rd Wednesday @ 5:30 PM, Station 241) and regular Tuesday evening training drills.
              </p>
            </div>
            <button className="min-h-[44px] w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-red-600 text-white border border-slate-700/60 hover:border-red-500 transition-colors">
              <span>View Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 5: Wildfire Maps */}
          <div 
            onClick={() => onNavigate('resources')}
            className="rounded-2xl p-6 bg-slate-800/85 border border-slate-700/80 hover:border-red-500/70 hover:bg-slate-800 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg shadow-black/30"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  Wildfire & Smoke Maps
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Real-time incident tracking via Watch Duty, WA DNR active fire dashboard, and EPA AirNow smoke plumes.
              </p>
            </div>
            <button className="min-h-[44px] w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-red-600 text-white border border-slate-700/60 hover:border-red-500 transition-colors">
              <span>Access Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 6: Contact */}
          <div 
            onClick={() => onNavigate('contact')}
            className="rounded-2xl p-6 bg-slate-800/85 border border-slate-700/80 hover:border-red-500/70 hover:bg-slate-800 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg shadow-black/30"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  Contact & Stations
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Station 241 office at (509) 784-2941. RiverCom dispatch at (509) 663-9911. Direct online messaging.
              </p>
            </div>
            <button className="min-h-[44px] w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-red-600 text-white border border-slate-700/60 hover:border-red-500 transition-colors">
              <span>Contact Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Community Apparatus Photograph: Full Width */}
        <div className="pt-4">
          <div className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
            <img
              src="/assets/gallery/structure_attack_2014.jpg"
              alt="DCFD4 Volunteers and Apparatus"
              className="w-full h-auto max-h-[460px] object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

      </section>

      {/* Clean Secondary Facilities Exploration Strip */}
      <section className="max-w-7xl mx-auto border-t border-slate-800/80 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div
            onClick={() => onNavigate('stations')}
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all"
          >
            <div className="p-2 rounded-lg bg-slate-800 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-bold text-sm text-white group-hover:text-red-400 transition-colors">
                Stations 241 – 244
              </span>
              <span className="text-xs text-slate-400">
                Frontline apparatus & locations
              </span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('gallery')}
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all"
          >
            <div className="p-2 rounded-lg bg-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                40-Year Photo Archive
              </span>
              <span className="text-xs text-slate-400">
                Historical & training gallery
              </span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('about')}
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all"
          >
            <div className="p-2 rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                About DCFD4
              </span>
              <span className="text-xs text-slate-400">
                Commissioners & district history
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
