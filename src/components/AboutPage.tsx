import React from 'react';
import { 
  Info, 
  ShieldCheck, 
  HeartHandshake, 
  Users,
  Heart,
  ExternalLink,
  Award,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { LEADERSHIP_DATA } from '../data/leadershipData';
import { PAYPAL_DONATION_URL } from '../data/donationConfig';

export const AboutPage: React.FC = () => {
  const chiefOfficers = LEADERSHIP_DATA.filter(l => l.titleGroup === 'Chief' || l.titleGroup === 'Captain' || l.titleGroup === 'Lieutenant');
  const commissioners = LEADERSHIP_DATA.filter(l => l.titleGroup === 'Commissioner');

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>Heritage & Governance • Est. 1946</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            About Douglas County Fire Dist. 4
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Founded in 1946 — Serving the residents, orchard communities, and visitors of Orondo, Washington along the East Columbia River for 80 years.
          </p>
        </div>

        {/* 1. COMMUNITY GRATITUDE & DONATIONS BANNER ("THANK YOU TO OUR COMMUNITY") */}
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-amber-500/40 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 shadow-2xl relative overflow-hidden">
          {/* Subtle amber ambient backdrop glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>Made Possible By Community Generosity</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Thank You to Our Donors & Supporters
              </h2>
              
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Douglas County Fire District 4 is a <strong className="text-white">100% volunteer department</strong>. While statutory property tax levies maintain our physical stations and primary engines, it is <strong className="text-amber-300">direct community contributions</strong> from Orondo residents, local fruit growers, and businesses that fund our frontline life-saving gear.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Custom-fitted NFPA turnout gear for new recruits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Advanced cardiac AED defibrillators & medic supplies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Hydraulic vehicle extrication jaws & cutters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Thermal imaging cameras & wildland hand tools</span>
                </div>
              </div>
            </div>

            {/* Donation Action Card */}
            <div className="w-full lg:w-80 flex-shrink-0 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 shadow-xl">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  Tax-Deductible 501(c)(3)
                </span>
                <h3 className="text-base font-black text-white">
                  Orondo Firefighters Volunteer Association
                </h3>
              </div>

              <a
                href={PAYPAL_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg active:scale-98"
              >
                <Heart className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Donate via PayPal</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>

              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 space-y-1">
                <span className="font-semibold text-slate-300 block">Or Mail a Check Payable to:</span>
                <p className="text-slate-300 font-mono">
                  Orondo Firefighters Volunteer Assn.<br />
                  PO Box 258, Orondo, WA 98843
                </p>
                <p className="text-[10px] text-slate-400 pt-1">
                  Tax receipts issued for all community donations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. DISTRICT MISSION STATEMENT (SLEEK & PROFESSIONAL) */}
        <div className="glass-panel-elevated rounded-3xl p-8 sm:p-12 border border-red-500/30 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle department crest watermark background */}
          <div className="absolute -right-8 -bottom-8 opacity-5 w-80 h-80 pointer-events-none select-none">
            <img src="/assets/logo.png" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-red-600/50 text-red-300 text-xs font-black uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-red-400" />
              <span>Our Official District Mission</span>
            </div>

            <blockquote className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-snug tracking-tight">
              “To protect the lives and property of the citizens and visitors in our district and community through rapid emergency response, public education, and proactive fire prevention.”
            </blockquote>

            <div className="pt-2">
              <div className="inline-block p-1 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 px-4 py-1.5 block">
                  Courage • Dedication • Teamwork • Tradition
                </span>
              </div>
            </div>

            {/* 4 Core Values Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-left border-t border-slate-800/80">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 space-y-1">
                <div className="flex items-center gap-2 text-red-400 font-black text-sm uppercase">
                  <Flame className="w-4 h-4" />
                  <span>Courage</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Stepping forward during critical emergencies to protect life and rural homesteads.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 space-y-1">
                <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dedication</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">
                  100% volunteer readiness on call 24 hours a day, 365 days a year for our neighbors.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 space-y-1">
                <div className="flex items-center gap-2 text-orange-400 font-black text-sm uppercase">
                  <Users className="w-4 h-4" />
                  <span>Teamwork</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Seamless crew coordination on the fireline and regional mutual aid collaboration.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/70 space-y-1">
                <div className="flex items-center gap-2 text-yellow-400 font-black text-sm uppercase">
                  <Award className="w-4 h-4" />
                  <span>Tradition</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Upholding eight decades of continuous public safety service established in 1946.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 3. THE CREW PHOTO ("THE GUYS IN HELMETS") & LEADERSHIP / COMMISSIONERS LIST */}
        <div className="space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-red-500 tracking-wider">
              Department Operations & Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Command Leadership & Fire Commissioners
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Meet the volunteer command officers, firefighters, and elected citizen commissioners guiding Douglas County Fire District 4.
            </p>
          </div>

          {/* Featured Crew Photo ("The Guys in Helmets") */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <img
                src="/assets/gallery/leadership_station_2019.jpg"
                alt="DCFD4 Volunteer Wildland Firefighters and Field Command in Orondo, WA"
                className="w-full h-full object-cover object-[center_35%] group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-red-600/90 text-white backdrop-blur-md shadow">
                  Frontline Volunteer Crew
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-1.5 drop-shadow-md">
                  Wildland Attack & Structure Protection Responders
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  DCFD4 volunteer firefighters equipped with full wildland turnout gear, tools, and training along the Columbia River corridor.
                </p>
              </div>
            </div>
          </div>

          {/* Leadership Cards: Chief Officers & Captains */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span>Command & Operational Officers</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chiefOfficers.map((leader, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        leader.titleGroup === 'Chief' 
                          ? 'bg-red-600/30 text-red-300 border border-red-500/50'
                          : 'bg-orange-600/30 text-orange-300 border border-orange-500/50'
                      }`}>
                        {leader.role}
                      </span>
                      <div className="p-1.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="text-lg font-black text-white">
                      {leader.name}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Board of Fire Commissioners Cards */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Board of Fire Commissioners (Public Governance)</span>
              </h3>
              <span className="text-xs text-slate-400">
                Elected Under Title 52 RCW • Public Meetings 3rd Wed Monthly @ 5:30 PM
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commissioners.map((comm, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/50">
                      {comm.role}
                    </span>
                    <div className="p-1.5 rounded-xl bg-slate-900 text-purple-400 border border-slate-800">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-white">
                    {comm.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {comm.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 4. THEN THE REST: DISTRICT JURISDICTION & 40-YEAR HERITAGE ARCHIVE */}
        <div className="pt-8 border-t border-slate-800/80 space-y-12">
          
          {/* Coverage Territory & Scope of Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase text-red-500 tracking-wider">
                Coverage Territory
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase">
                Protecting The Columbia River Corridor
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Douglas County Fire District No. 4 responds to 911 emergencies on the east bank of the Columbia River stretching from <strong className="text-white">Turtle Rock on the southern boundary</strong> all the way to <strong className="text-white">North of the Beebe Bridge</strong>.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our district encompasses four strategic apparatus stations located in <strong className="text-amber-400">Orondo</strong>, <strong className="text-amber-400">Brays Landing</strong>, <strong className="text-amber-400">Lone Pine</strong>, and at the <strong className="text-amber-400">Beebe Bridge</strong> crossing.
              </p>
              {/* Embedded Boundary Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-lg">
                <img
                  src="/assets/gallery/district_boundary_map.jpg"
                  alt="DCFD4 Official Coverage Jurisdiction Boundary Map"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">District Fast Facts</h3>
                  <p className="text-xs text-slate-400">Operating under Washington Title 52 RCW</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-400">Year Established:</span>
                  <span className="font-bold text-white">1946</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-400">Governance:</span>
                  <span className="font-bold text-white">3 Elected Fire Commissioners</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-400">Operational Personnel:</span>
                  <span className="font-bold text-white">100% Volunteer Firefighters & EMTs</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-400">Active Stations:</span>
                  <span className="font-bold text-white">4 Stations (241, 242, 243, 244)</span>
                </div>
              </div>

              {/* Historic Bay Photo */}
              <div className="pt-2">
                <span className="text-[10px] font-black uppercase text-amber-400 block mb-1">
                  Historic Station 241 (1985 Archive)
                </span>
                <div className="rounded-xl overflow-hidden border border-slate-800">
                  <img
                    src="/assets/gallery/historic_station_241_1985.jpg"
                    alt="Historic Orondo Station 241 in 1985"
                    className="w-full h-36 object-cover hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 40-Year Heritage Spotlight */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-black uppercase text-red-500 tracking-wider">
                  Preserving District Heritage
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                  40+ Years of Orondo Volunteer Brotherhood
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Authentic Archive: 1984 – Present
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/assets/gallery/historic_engine_2441_1984.jpg"
                    alt="Historic DCFD4 Engine 2441 in 1984"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-bold text-amber-400">1984 Fleet</span>
                  <h4 className="text-xs font-black text-white">Engine 2441 Heritage</h4>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/assets/gallery/historic_crew_1985.jpg"
                    alt="Volunteer Firefighters and Rig in 1985"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-bold text-amber-400">1985 Crew</span>
                  <h4 className="text-xs font-black text-white">Volunteer Brotherhood</h4>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/assets/gallery/extrication_rescue_1990.jpg"
                    alt="1990 Highway 97 Vehicle Rescue"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-bold text-amber-400">1990 Incident</span>
                  <h4 className="text-xs font-black text-white">Highway 97 Extrication</h4>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
