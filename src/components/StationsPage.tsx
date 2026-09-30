import React from 'react';
import { 
  Building2, 
  MapPin, 
  Truck, 
  ExternalLink, 
  Navigation
} from 'lucide-react';
import { STATIONS_DATA } from '../data/stationsData';


const STATION_IMAGES: Record<string, string> = {
  'station-241': '/assets/station41.jpg',
  'station-242': '/assets/stations/station242_map.jpg',
  'station-243': '/assets/stations/station243_map.jpg',
  'station-244': '/assets/stations/station244_map.jpg',
};

export const StationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Strategic District Infrastructure</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Stations & Emergency Fleet
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Four purpose-built stations strategically positioned along the Columbia River and Highway 97 corridor to ensure lightning-fast emergency response.
          </p>
        </div>

        {/* Featured Real Station Photo Showcase */}
        <div className="glass-panel-elevated rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          <div className="relative h-72 sm:h-96 w-full bg-slate-950">
            <img
              src="/assets/station41.jpg"
              alt="Douglas County Fire District 4 Station 241 Headquarters & Fleet"
              className="w-full h-full object-cover object-[center_55%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-red-600 text-white shadow">
                  District Headquarters & Fleet
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 drop-shadow-md">
                  Station 241 — 13984 US Highway 2, Orondo, WA
                </h2>
              </div>

              <a
                href="https://maps.google.com/?q=13984+US+Highway+2+Orondo+WA+98843"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-slate-200 transition-colors shadow-lg self-start sm:self-auto"
              >
                <Navigation className="w-4 h-4 text-red-600" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STATIONS_DATA.map((station) => (
            <div
              key={station.id}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Full-Bleed Card Header Photo */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-800/80">
                  <img
                    src={STATION_IMAGES[station.id] || '/assets/station41.jpg'}
                    alt={station.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Station Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md shadow-md">
                      Station {station.number}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Header Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center font-black text-lg flex-shrink-0">
                        {station.number}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                          {station.name}
                        </h3>
                        <p className="text-xs text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{station.address}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {station.description}
                  </p>

                  {/* Facility Features */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Facility Highlights:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {station.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apparatus Housed */}
                  <div className="pt-1">
                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 flex-shrink-0" />
                      <span>Assigned Apparatus Fleet:</span>
                    </h4>
                    <ul className="text-xs text-slate-300 space-y-1.5 pl-1">
                      {station.apparatus.map((app, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Station Navigation Action */}
              <div className="px-6 sm:px-7 py-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Station {station.number} Headquarters & Egress</span>
                <a
                  href={station.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-red-400" />
                  <span>Navigate in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Mutual Aid Partnership Note */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center max-w-2xl mx-auto space-y-2">
          <h4 className="text-base font-black text-white uppercase">
            Regional Mutual Aid Operations
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            DCFD4 operates in close mutual aid partnership with Chelan County Fire District 1 & 7, Douglas County Fire District 2 & 1, Ballard Ambulance, and Washington State Department of Natural Resources (DNR) to guarantee seamless emergency coverage throughout North Central Washington.
          </p>
        </div>

      </div>
    </div>
  );
};
