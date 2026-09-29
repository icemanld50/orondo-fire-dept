import React from 'react';
import { 
  Info, 
  ShieldCheck, 
  HeartHandshake, 
  Users
} from 'lucide-react';
import { LEADERSHIP_DATA } from '../data/leadershipData';


export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen app-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>Heritage & Governance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black app-text-primary uppercase tracking-tight">
            About Douglas County Fire Dist. 4
          </h1>
          <p className="text-base sm:text-lg app-text-secondary">
            Founded in 1946 — Serving the residents and orchard communities of Orondo, Washington along the East Columbia River for 80 years.
          </p>
        </div>

        {/* Mission Statement Hero Card */}
        <div className="app-card rounded-3xl p-8 sm:p-12 border app-border text-center relative overflow-hidden shadow-sm">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-red-600 dark:text-red-400">
              Our Official District Mission
            </span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-black app-text-primary leading-relaxed italic">
              "To protect the lives and property of the citizens and visitors in our district and community through rapid emergency response, public education, and proactive fire prevention."
            </blockquote>
            <p className="text-sm font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              Courage • Dedication • Teamwork • Tradition
            </p>
          </div>
        </div>

        {/* District Territory & Scope of Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-black uppercase text-red-600 dark:text-red-400 tracking-wider">
              Coverage Territory
            </span>
            <h2 className="text-2xl sm:text-3xl font-black app-text-primary uppercase">
              Protecting The Columbia River Corridor
            </h2>
            <p className="text-sm app-text-secondary leading-relaxed">
              Douglas County Fire District No. 4 responds to 911 emergencies on the east bank of the Columbia River stretching from <strong className="app-text-primary">Turtle Rock on the southern boundary</strong> all the way to <strong className="app-text-primary">North of the Beebe Bridge</strong>.
            </p>
            <p className="text-sm app-text-secondary leading-relaxed">
              Our district encompasses four strategic apparatus stations located in <strong className="text-amber-600 dark:text-amber-400 font-semibold">Orondo</strong>, <strong className="text-amber-600 dark:text-amber-400 font-semibold">Brays Landing</strong>, <strong className="text-amber-600 dark:text-amber-400 font-semibold">Lone Pine</strong>, and at the <strong className="text-amber-600 dark:text-amber-400 font-semibold">Beebe Bridge</strong> crossing.
            </p>
            {/* Embedded Boundary Map */}
            <div className="rounded-2xl overflow-hidden border app-border app-surface shadow-sm">
              <img
                src="/assets/gallery/district_boundary_map.jpg"
                alt="DCFD4 Official Coverage Jurisdiction Boundary Map"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          <div className="app-card rounded-3xl p-6 border app-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black app-text-primary">District Fast Facts</h3>
                <p className="text-xs app-text-muted">Operating under Washington Title 52 RCW</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs app-text-secondary">
              <div className="flex items-center justify-between p-2.5 rounded-xl app-surface border app-border">
                <span className="font-semibold app-text-muted">Year Established:</span>
                <span className="font-bold app-text-primary">1946</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl app-surface border app-border">
                <span className="font-semibold app-text-muted">Governance:</span>
                <span className="font-bold app-text-primary">3 Elected Fire Commissioners</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl app-surface border app-border">
                <span className="font-semibold app-text-muted">Operational Personnel:</span>
                <span className="font-bold app-text-primary">100% Volunteer Firefighters & EMTs</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl app-surface border app-border">
                <span className="font-semibold app-text-muted">Active Stations:</span>
                <span className="font-bold app-text-primary">4 Stations (241, 242, 243, 244)</span>
              </div>
            </div>

            {/* Historic Bay Photo */}
            <div className="pt-2">
              <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 block mb-1">
                Historic Station 241 (1985 Archive)
              </span>
              <div className="rounded-xl overflow-hidden border app-border">
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
        <div className="app-card rounded-3xl p-6 sm:p-8 border app-border space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b app-border pb-3">
            <div>
              <span className="text-xs font-black uppercase text-red-600 dark:text-red-400 tracking-wider">
                Preserving District Heritage
              </span>
              <h3 className="text-xl sm:text-2xl font-black app-text-primary uppercase">
                40+ Years of Orondo Volunteer Brotherhood
              </h3>
            </div>
            <span className="text-xs app-text-muted">
              Authentic Archive: 1984 – Present
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl overflow-hidden app-surface border app-border group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/gallery/historic_engine_2441_1984.jpg"
                  alt="Historic DCFD4 Engine 2441 in 1984"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">1984 Fleet</span>
                <h4 className="text-xs font-black app-text-primary">Engine 2441 Heritage</h4>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden app-surface border app-border group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/gallery/historic_crew_1985.jpg"
                  alt="Volunteer Firefighters and Rig in 1985"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">1985 Crew</span>
                <h4 className="text-xs font-black app-text-primary">Volunteer Brotherhood</h4>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden app-surface border app-border group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/gallery/extrication_rescue_1990.jpg"
                  alt="1990 Highway 97 Vehicle Rescue"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">1990 Incident</span>
                <h4 className="text-xs font-black app-text-primary">Highway 97 Extrication</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership & Commissioners Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black app-text-primary uppercase tracking-tight">
              Department Leadership & Commissioners
            </h2>
            <p className="text-xs sm:text-sm app-text-muted">
              Meet the command officers and public fire commissioners safeguarding District 4.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEADERSHIP_DATA.map((leader, idx) => (
              <div
                key={idx}
                className="app-card rounded-2xl p-6 border app-border hover:border-red-500/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      leader.titleGroup === 'Chief' 
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30'
                        : leader.titleGroup === 'Commissioner'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                        : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                    }`}>
                      {leader.role}
                    </span>
                    <h3 className="text-lg font-black app-text-primary mt-1">
                      {leader.name}
                    </h3>
                  </div>
                  <div className="p-2 rounded-xl app-surface text-slate-500 dark:text-slate-400 border app-border">
                    <Users className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs app-text-secondary leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>

          {/* Authentic Leadership & Station 241 Campus Photo */}
          <div className="rounded-2xl overflow-hidden border app-border app-surface aspect-[21/9] sm:aspect-[24/9]">
            <img
              src="/assets/gallery/leadership_station_2019.jpg"
              alt="DCFD4 Command Leadership and Frontline Rigs at Station 241"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>

        {/* Volunteer Association & Community Donations */}
        <div className="app-card rounded-3xl p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-transparent shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                  Community 501(c)(3) Support
                </span>
                <h3 className="text-xl sm:text-2xl font-black app-text-primary">
                  Orondo Firefighters Volunteer Association
                </h3>
              </div>
            </div>

            <div className="text-xs app-text-secondary max-w-sm">
              Community donations directly fund critical life-saving rescue tools, advanced AED defibrillators, thermal imaging cameras, and firefighting nozzles.
            </div>
          </div>

          <p className="text-xs sm:text-sm app-text-secondary leading-relaxed border-t app-border pt-4">
            We couldn't accomplish our mission without the heartfelt support of the community of Orondo. Donations are pooled to purchase equipment that tax levies cannot fully cover. You can mail tax-deductible checks payable to <strong className="app-text-primary">Orondo Firefighters Volunteer Association</strong> at <strong className="text-amber-600 dark:text-amber-400">PO Box 258, Orondo, WA 98843</strong> or drop off during business hours at Station 241.
          </p>
        </div>

      </div>
    </div>
  );
};

