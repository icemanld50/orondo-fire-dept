import React, { useState } from 'react';
import { 
  Map, 
  Wind, 
  ExternalLink, 
  ShieldAlert, 
  Smartphone, 
  Search, 
  AlertTriangle,
  Waves,
  Scale
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  category: 'maps' | 'weather' | 'local' | 'regulations';
  provider: string;
  providerType: string;
  description: string;
  url: string;
  badgeColor: string;
  features: string[];
  appLinks?: { ios?: string; android?: string };
}

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'watch-duty',
    title: 'Watch Duty Wildfire App & Map',
    category: 'maps',
    provider: 'Watch Duty 501(c)(3)',
    providerType: 'Live Radio & Volunteer',
    description: 'Real-time wildfire perimeters, evacuation notices, and air attack flight tracking for Central Washington.',
    url: 'https://app.watchduty.org',
    badgeColor: 'border-orange-500/50 bg-orange-500/20 text-orange-300',
    features: ['Active evacuation zones', 'Air attack flight tracking', 'Radio dispatch notes'],
    appLinks: {
      ios: 'https://apps.apple.com/us/app/watch-duty-wildfire-maps/id1571475727',
      android: 'https://play.google.com/store/apps/details?id=org.watchduty.app'
    }
  },
  {
    id: 'wa-dnr-dashboard',
    title: 'WA DNR Wildfire Incident Dashboard',
    category: 'maps',
    provider: 'Washington Dept of Natural Resources',
    providerType: 'Official State Fire Agency',
    description: 'Official Washington wildfire map with incident containment percentages, acreage, and danger ratings.',
    url: 'https://www.dnr.wa.gov/Wildfires',
    badgeColor: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300',
    features: ['Acres & containment %', 'DNR initial attack response', 'County IFPL levels']
  },
  {
    id: 'inciweb',
    title: 'InciWeb Interagency All-Risk System',
    category: 'maps',
    provider: 'National Wildfire Coordinating Group (NWCG)',
    providerType: 'Federal Interagency',
    description: 'National interagency incident tracking for large complex wildfires and federal response teams.',
    url: 'https://inciweb.wildfire.gov',
    badgeColor: 'border-red-500/50 bg-red-500/20 text-red-300',
    features: ['Daily perimeter shapefiles', 'Incident commander briefs', 'Official press releases']
  },
  {
    id: 'nasa-firms',
    title: 'NASA FIRMS Satellite Thermal Scan',
    category: 'maps',
    provider: 'NASA Earthdata',
    providerType: 'Orbital Satellites',
    description: 'Near real-time MODIS and VIIRS satellite hotspot detection updated every 3 hours.',
    url: 'https://firms.modaps.eosdis.nasa.gov/map',
    badgeColor: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300',
    features: ['3-hour satellite passes', 'Infrared hotspot detection', 'Global fire tracking']
  },
  {
    id: 'airnow-smoke',
    title: 'AirNow Fire and Smoke Plume Map',
    category: 'weather',
    provider: 'US EPA & US Forest Service',
    providerType: 'Federal Air Quality Network',
    description: 'Real-time PM2.5 air quality readings and satellite smoke plume overlays across Central Washington.',
    url: 'https://fire.airnow.gov',
    badgeColor: 'border-purple-500/50 bg-purple-500/20 text-purple-300',
    features: ['PM2.5 Air Quality Index', 'NOAA smoke plume polygons', 'Health advisory guidance']
  },
  {
    id: 'wa-smoke-blog',
    title: 'Washington Smoke Forecast',
    category: 'weather',
    provider: 'Washington Clean Air Agencies & DNR',
    providerType: 'State Forecast Blog',
    description: 'Expert 48-hour smoke forecasts and valley inversion projections from Washington meteorologists.',
    url: 'https://wasmoke.blogspot.com',
    badgeColor: 'border-blue-500/50 bg-blue-500/20 text-blue-300',
    features: ['Meteorologist daily briefs', 'Smoke clearing timelines', 'Health recommendations']
  },
  {
    id: 'nws-spokane-fire',
    title: 'NWS Spokane Fire Weather Forecast',
    category: 'weather',
    provider: 'National Weather Service (NOAA)',
    providerType: 'NOAA Weather Office',
    description: 'Official Red Flag Warnings, relative humidity minimums, and wind gust alerts for Douglas County.',
    url: 'https://www.weather.gov/wrh/fire?wfo=otx&layer=fwx',
    badgeColor: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
    features: ['Red Flag Warnings', 'River corridor wind gusts', 'Lightning hazard tracking']
  },
  {
    id: 'rivercom-911',
    title: 'RiverCom 911 Communications',
    category: 'local',
    provider: 'RiverCom Chelan-Douglas 911',
    providerType: 'Regional Dispatch Center',
    description: '24/7/365 emergency dispatch center for Douglas County Fire District 4 apparatus and personnel.',
    url: 'https://rivercom911.org',
    badgeColor: 'border-red-600/50 bg-red-600/20 text-red-300',
    features: ['Emergency dispatch: Dial 911', 'Non-emergency: (509) 663-9911', 'Countywide coordination']
  },
  {
    id: 'douglas-county-em',
    title: 'Douglas County Emergency Management',
    category: 'local',
    provider: "Douglas County Sheriff's Office",
    providerType: 'County Public Safety',
    description: 'Coordinates county disaster operations, evacuation level declarations, and public safety alerts.',
    url: 'https://www.douglascountywa.gov/231/Emergency-Management',
    badgeColor: 'border-emerald-600/50 bg-emerald-600/20 text-emerald-300',
    features: ['Level 1/2/3 evacuation notices', 'Disaster shelter updates', 'Hazard mitigation planning']
  },
  {
    id: 'douglas-county-everbridge',
    title: 'Douglas County Everbridge Alerts',
    category: 'local',
    provider: 'Douglas County Emergency Management',
    providerType: 'Emergency Broadcast Portal',
    description: 'Sign up your phone and email for automated SMS and call alerts during wildfires and emergencies.',
    url: 'https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System',
    badgeColor: 'border-cyan-600/50 bg-cyan-600/20 text-cyan-300',
    features: ['Instant SMS & phone calls', 'Neighborhood targeted alerts', 'Wildfire evacuation warnings']
  },
  {
    id: 'douglas-county-incident-map',
    title: 'Douglas County Incidents Map',
    category: 'local',
    provider: 'Douglas County Emergency Management',
    providerType: 'Live County GIS',
    description: 'Interactive map displaying active county road closures, fire incidents, and evacuation boundaries.',
    url: 'https://www.douglascountywa.gov/697/Emergency-Incidents-Map',
    badgeColor: 'border-rose-500/50 bg-rose-500/20 text-rose-300',
    features: ['Active road closures', 'Evacuation perimeters', 'Shelter locations']
  },
  {
    id: 'usgs-columbia-river',
    title: 'USGS Columbia River Flow & Gauge',
    category: 'local',
    provider: 'US Geological Survey (USGS)',
    providerType: 'Hydrologic Monitoring',
    description: 'Real-time Columbia River streamflow, dam reservoir levels, and water elevations near Orondo.',
    url: 'https://waterdata.usgs.gov/state/Washington/',
    badgeColor: 'border-blue-600/50 bg-blue-600/20 text-blue-300',
    features: ['Streamflow in cfs', 'Gauge elevation monitoring', 'Flood condition tracking']
  },
  {
    id: 'douglas-county-code-812',
    title: 'Douglas County Code Ch. 8.12 Open Burning',
    category: 'regulations',
    provider: 'Douglas County Commissioners',
    providerType: 'County Ordinance',
    description: 'Codified county burn regulations defining the seasonal burn ban (June 1 - October 1) and fire rules.',
    url: 'https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html',
    badgeColor: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
    features: ['Seasonal ban: June 1 – Oct 1', 'Mandatory adult supervision', 'IFC § 307.4.2 adherence']
  },
  {
    id: 'wa-ecology-burning',
    title: 'WA Dept of Ecology Outdoor Burning',
    category: 'regulations',
    provider: 'Washington Dept of Ecology',
    providerType: 'State Air Quality Agency',
    description: 'Clean Air Act rules for residential yard waste, burn barrel bans, and clean air thresholds.',
    url: 'https://ecology.wa.gov/air-climate/air-quality/smoke-fire/outdoor-residential-burning',
    badgeColor: 'border-teal-500/50 bg-teal-500/20 text-teal-300',
    features: ['Burn barrel prohibition', 'Yard waste limitations', 'Air quality ban triggers']
  },
  {
    id: 'wa-ecology-permits',
    title: 'WA Ecology Agricultural Burn Permits',
    category: 'regulations',
    provider: 'Washington Dept of Ecology',
    providerType: 'State Environmental Permitting',
    description: 'Official permit applications for commercial agricultural burning and orchard tear-outs.',
    url: 'https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits',
    badgeColor: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300',
    features: ['Agricultural burn permits', 'Hotline: (800) 406-5322', 'Commercial orchard disposal']
  },
  {
    id: 'wa-wac-173-425',
    title: 'WAC 173-425 Outdoor Burning Rule',
    category: 'regulations',
    provider: 'Washington State Legislature',
    providerType: 'Washington Admin Code',
    description: 'Codified state administrative code prohibiting burning construction debris, treated wood, and garbage.',
    url: 'https://app.leg.wa.gov/wac/default.aspx?cite=173-425',
    badgeColor: 'border-purple-500/50 bg-purple-500/20 text-purple-300',
    features: ['Prohibited toxic materials', 'Burn barrel ban', 'Civil penalty framework']
  },
  {
    id: 'wa-dnr-burn-restrictions',
    title: 'WA DNR Burn Portal & Restrictions',
    category: 'regulations',
    provider: 'Washington Dept of Natural Resources',
    providerType: 'State Forest Protection',
    description: 'Forest fire danger ratings, Industrial Fire Precaution Levels (IFPL), and DNR burn portal.',
    url: 'https://dnr.wa.gov/wildfire-resources/outdoor-burning/burn-restrictions',
    badgeColor: 'border-orange-500/50 bg-orange-500/20 text-orange-300',
    features: ['DNR Burn Portal login', 'IFPL industrial restrictions', 'State forest campfire rules']
  },
  {
    id: 'douglas-county-burn-restrictions',
    title: 'Douglas County Burn Ban Notices',
    category: 'regulations',
    provider: 'Douglas County Administration',
    providerType: 'Official County Notice',
    description: 'Current county commissioner resolutions regarding fire season restrictions and emergency bans.',
    url: 'https://www.douglascountywa.gov/821/Burn-Bans-and-Restrictions',
    badgeColor: 'border-red-500/50 bg-red-500/20 text-red-300',
    features: ['Current ban resolutions', 'Emergency declarations', 'Interagency notices']
  }
];

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'maps' | 'weather' | 'local' | 'regulations'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = RESOURCES_DATA.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Wildfire Maps & Resources
        </h1>
        <p className="text-sm text-slate-400">
          Direct links to satellite fire maps, smoke forecasts, county alerts, and burn regulations.
        </p>
        <div className="inline-block p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 max-w-xl mx-auto">
          <strong className="text-slate-300">Notice:</strong> Third-party resources, satellite feeds, and evacuation maps are provided and maintained by external regional, state, and federal agencies and are not controlled or operated by Douglas County Fire District No. 4 (Orondo Fire).
        </div>
      </div>

      {/* Emergency Advisory Callout */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-amber-900/40 bg-amber-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white uppercase">
              Immediate Fire or Smoke Emergency?
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Maps reflect satellite delays. For active fires or emergencies, dial 911 immediately.
            </p>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-300 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 flex-shrink-0">
          Emergencies: Dial 911
        </div>
      </div>

      {/* Category Tabs & Quick Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            All Resources ({RESOURCES_DATA.length})
          </button>
          <button
            onClick={() => setSelectedCategory('maps')}
            className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'maps'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-950/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Wildfire Maps</span>
          </button>
          <button
            onClick={() => setSelectedCategory('weather')}
            className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'weather'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-950/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Smoke & Weather</span>
          </button>
          <button
            onClick={() => setSelectedCategory('local')}
            className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'local'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Douglas County</span>
          </button>
          <button
            onClick={() => setSelectedCategory('regulations')}
            className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'regulations'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Regulations</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((item) => (
          <div
            key={item.id}
            className="glass-panel rounded-2xl p-5 flex flex-col justify-between space-y-4 border border-slate-800 hover:border-slate-700 transition-all shadow-md group"
          >
            <div className="space-y-3">
              
              {/* Top Badges */}
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                  {item.providerType}
                </span>
                {item.category === 'maps' && <Map className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                {item.category === 'weather' && <Wind className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                {item.category === 'local' && <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                {item.category === 'regulations' && <Scale className="w-4 h-4 text-purple-400 flex-shrink-0" />}
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {item.provider}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                {item.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 hover:border-red-500 transition-all active:scale-95 shadow-sm"
              >
                <span>Open {item.title.split(' ')[0]}</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400 group-hover:text-white" />
              </a>

              {/* Mobile App Links if available */}
              {item.appLinks && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {item.appLinks.ios && (
                    <a
                      href={item.appLinks.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    >
                      <Smartphone className="w-3 h-3 text-cyan-400" />
                      <span>iOS App</span>
                    </a>
                  )}
                  {item.appLinks.android && (
                    <a
                      href={item.appLinks.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    >
                      <Smartphone className="w-3 h-3 text-emerald-400" />
                      <span>Android</span>
                    </a>
                  )}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-10 glass-panel rounded-2xl">
          <p className="text-slate-400 text-sm">No resources found matching your search.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 min-h-[44px] px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Local River Corridor Info Footer Strip */}
      <div className="glass-panel p-4 rounded-2xl text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border border-slate-800">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>Orondo Columbia River Corridor • Washington Public Safety</span>
        </div>
        <span>Douglas County Fire District No. 4</span>
      </div>

    </div>
  );
};
