import React, { useState } from 'react';
import { 
  Map, 
  Wind, 
  Radio, 
  ExternalLink, 
  ShieldAlert, 
  Smartphone, 
  Search, 
  Compass,
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
    providerType: 'Real-Time Volunteer & Radio Monitored',
    description: 'The premier real-time wildfire tracking service for the Western US. Powered by vetted radio monitors and retired wildland firefighters, delivering real-time perimeter updates, evacuation notices, and flight tracking before official press releases.',
    url: 'https://app.watchduty.org',
    badgeColor: 'border-orange-500/50 bg-orange-500/20 text-orange-300',
    features: ['Active evacuation zones', 'Air attack flight tracking', 'Live dispatch radio notes', 'Push alert notifications'],
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
    description: 'The official Washington State wildfire map and incident report dashboard. Provides acreage updates, containment percentages, responding interagency units, and county-by-county wildfire danger ratings.',
    url: 'https://www.dnr.wa.gov/Wildfires',
    badgeColor: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300',
    features: ['Official acres & containment %', 'DNR initial attack response', 'County industrial fire precaution levels (IFPL)', 'State forest burn restrictions']
  },
  {
    id: 'inciweb',
    title: 'InciWeb Interagency All-Risk System',
    category: 'maps',
    provider: 'National Wildfire Coordinating Group (NWCG)',
    providerType: 'Federal Interagency Command',
    description: 'National interagency incident information system tracking large, complex wildfires and federal response efforts managed by Type 1, 2, and 3 Incident Management Teams across Washington and the Pacific Northwest.',
    url: 'https://inciweb.wildfire.gov',
    badgeColor: 'border-red-500/50 bg-red-500/20 text-red-300',
    features: ['Incident commander briefs', 'Detailed daily fire perimeter shapefiles', 'Road closure maps', 'Official press releases']
  },
  {
    id: 'nasa-firms',
    title: 'NASA FIRMS Satellite Thermal Anomaly Scan',
    category: 'maps',
    provider: 'NASA Earthdata',
    providerType: 'Near Real-Time Orbital Satellites',
    description: 'Near real-time satellite imagery showing active thermal hotspots detected from MODIS and VIIRS satellite sensors in orbit. Updates every 3 hours to detect new spot fires and active burn lines before ground verification.',
    url: 'https://firms.modaps.eosdis.nasa.gov/map',
    badgeColor: 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300',
    features: ['3-hour satellite thermal passes', 'High-resolution MODIS/VIIRS infrared', 'Historical fire progression tracking', 'Global coverage']
  },
  {
    id: 'airnow-smoke',
    title: 'AirNow Fire and Smoke Plume Map',
    category: 'weather',
    provider: 'US EPA & US Forest Service',
    providerType: 'Federal Air Quality Network',
    description: 'Combined real-time mapping of PM2.5 air quality monitors, satellite-detected smoke plumes, and wildfire locations. Essential for checking air health in Orondo, Chelan, and East Wenatchee during wildfire season.',
    url: 'https://fire.airnow.gov',
    badgeColor: 'border-purple-500/50 bg-purple-500/20 text-purple-300',
    features: ['Real-time PM2.5 Air Quality Index (AQI)', 'Overlaid NOAA smoke plume polygons', 'Low-cost sensor calibration (PurpleAir)', 'Health advisory guidance']
  },
  {
    id: 'wa-smoke-blog',
    title: 'Washington Smoke Information Forecast',
    category: 'weather',
    provider: 'Washington Clean Air Agencies & DNR',
    providerType: 'Multi-Agency Technical Blog',
    description: 'Expert daily smoke meteorological forecasts published collaboratively by WA Dept of Ecology, DNR, EPA, and Tribal air authorities. Provides 48-hour transport forecasts for Central Washington valleys.',
    url: 'https://wasmoke.blogspot.com',
    badgeColor: 'border-blue-500/50 bg-blue-500/20 text-blue-300',
    features: ['Meteorologist written forecasts', 'Inversion & smoke clearing predictions', 'County burn ban air restrictions', 'Vulnerable group health tips']
  },
  {
    id: 'nws-spokane-fire',
    title: 'NWS Spokane Fire Weather Forecast',
    category: 'weather',
    provider: 'National Weather Service (NOAA)',
    providerType: 'Federal Climatology & Weather Office',
    description: 'Official fire weather briefings for Eastern Washington (Zone WAZ704 / Douglas County). Features real-time Red Flag Warnings, gusty wind forecasts, Haines Index atmospheric instability, and dry lightning threats.',
    url: 'https://www.weather.gov/wrh/fire?wfo=otx&layer=fwx',
    badgeColor: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
    features: ['Red Flag Warning notices', 'Relative humidity minimums', 'Wind gust forecasts (Columbia River Corridor)', 'Spot fire weather monitoring']
  },
  {
    id: 'rivercom-911',
    title: 'RiverCom 911 Communications',
    category: 'local',
    provider: 'RiverCom Chelan-Douglas 911',
    providerType: 'Regional Emergency Dispatch',
    description: 'The intergovernmental 911 communications agency dispatching Douglas County Fire District 4 apparatus and personnel across all incidents in our jurisdiction. Operates 24/7/365.',
    url: 'https://rivercom911.org',
    badgeColor: 'border-red-600/50 bg-red-600/20 text-red-300',
    features: ['Douglas & Chelan County coordination', 'Non-emergency dispatch: (509) 663-9911', 'Emergency dispatch call center', 'CAD incident processing']
  },
  {
    id: 'douglas-county-em',
    title: 'Douglas County Emergency Management',
    category: 'local',
    provider: "Douglas County Sheriff's Office",
    providerType: 'County Public Safety & Alerting',
    description: 'Official county emergency management portal. Coordinates disaster response, hazard mitigation, shelter locations, and public safety alerts across Douglas County.',
    url: 'https://www.douglascountywa.gov/231/Emergency-Management',
    badgeColor: 'border-emerald-600/50 bg-emerald-600/20 text-emerald-300',
    features: ['Level 1 (Ready) / 2 (Set) / 3 (GO!) alerts', 'Emergency operations coordination', 'Hazard mitigation planning', 'Disaster shelter coordination']
  },
  {
    id: 'douglas-county-everbridge',
    title: 'Douglas County Everbridge Alert Signup',
    category: 'local',
    provider: 'Douglas County Emergency Management',
    providerType: 'Official Emergency Broadcast',
    description: 'Direct citizen registration portal for Douglas County emergency notifications. Register mobile phones and emails for real-time text and phone call alerts during wildfires, evacuations, and flash floods.',
    url: 'https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System',
    badgeColor: 'border-cyan-600/50 bg-cyan-600/20 text-cyan-300',
    features: ['Instant SMS & automated phone alerts', 'Localized neighborhood targeting', 'Wildfire evacuation warnings', 'Severe weather & road closures']
  },
  {
    id: 'douglas-county-incident-map',
    title: 'Douglas County Emergency Incidents Map',
    category: 'local',
    provider: 'Douglas County Emergency Management',
    providerType: 'Live Public Safety GIS',
    description: 'Interactive county GIS portal mapping active emergency incidents, road washouts, active wildfires, evacuation perimeters, and emergency shelter stations in real time.',
    url: 'https://www.douglascountywa.gov/697/Emergency-Incidents-Map',
    badgeColor: 'border-rose-500/50 bg-rose-500/20 text-rose-300',
    features: ['Live incident GIS layers', 'Active road closures & detours', 'Evacuation boundary shapefiles', 'Shelter & safe zone markers']
  },
  {
    id: 'usgs-columbia-river',
    title: 'USGS Washington Water Conditions & River Flow',
    category: 'local',
    provider: 'US Geological Survey (USGS)',
    providerType: 'Federal Hydrologic Monitoring',
    description: 'Real-time USGS hydrologic monitoring across Washington State and the Columbia River Basin. Tracks streamflow (cfs), gauge elevations, reservoir reaches, and flood stages bordering Orondo.',
    url: 'https://waterdata.usgs.gov/state/Washington/',
    badgeColor: 'border-blue-600/50 bg-blue-600/20 text-blue-300',
    features: ['Real-time cubic feet per second (cfs)', 'Gauge elevation near Rocky Reach & Wells', 'Flood stage monitoring', 'National Water Dashboard map layers']
  },
  {
    id: 'douglas-county-code-812',
    title: 'Douglas County Code Chapter 8.12 Open Burning',
    category: 'regulations',
    provider: 'Douglas County Board of Commissioners',
    providerType: 'Codified County Ordinance',
    description: 'Codified outdoor burning ordinance governing unincorporated Douglas County. Establishes seasonal restrictions (June 1 - October 1), fire district permit authority under RCW 52.12.101, IFC Section 307.4.2 adherence, adult supervision, and misdemeanor enforcement under Ordinance TLS 10-01-01B.',
    url: 'https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html',
    badgeColor: 'border-amber-500/50 bg-amber-500/20 text-amber-300',
    features: ['Seasonal burn ban: June 1 – Oct 1', 'RCW 52.12.101 Fire District permit authority', 'Mandatory competent adult attendance', 'International Fire Code § 307.4.2 compliance']
  },
  {
    id: 'wa-ecology-burning',
    title: 'WA Dept of Ecology Outdoor & Residential Burning',
    category: 'regulations',
    provider: 'Washington Dept of Ecology Central Region',
    providerType: 'State Air Quality Regulatory Agency',
    description: 'Official Washington Department of Ecology guidelines on outdoor residential burning, clean air regulations, burn barrel prohibitions, and air quality burn ban thresholds for Central Washington.',
    url: 'https://ecology.wa.gov/air-climate/air-quality/smoke-fire/outdoor-residential-burning',
    badgeColor: 'border-teal-500/50 bg-teal-500/20 text-teal-300',
    features: ['Yard waste burning limits', 'Burn barrel ban enforcement', 'Urban Growth Area (UGA) rules', 'Clean Air Act compliance standards']
  },
  {
    id: 'wa-ecology-permits',
    title: 'WA Dept of Ecology Burn Permits Portal',
    category: 'regulations',
    provider: 'Washington Dept of Ecology Central Region',
    providerType: 'State Environmental Permitting',
    description: 'Central portal to apply for Washington State agricultural burning permits, orchard tear-outs, and commercial land clearing burns. Features the online permit application system.',
    url: 'https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits',
    badgeColor: 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300',
    features: ['Agricultural burn permit applications', 'Central Region hotline: 1-800-406-5322', 'Commercial orchard disposal permits', 'Online permit portal & tutorials']
  },
  {
    id: 'wa-wac-173-425',
    title: 'WAC 173-425 Washington State Outdoor Burning Rule',
    category: 'regulations',
    provider: 'Washington State Legislature',
    providerType: 'Washington Administrative Code (WAC)',
    description: 'The codified administrative rule implementing the Washington Clean Air Act (RCW 70A.15). Explicitly prohibits burning construction debris, treated wood, plastics, and garbage, and restricts open burning inside designated growth boundaries.',
    url: 'https://app.leg.wa.gov/wac/default.aspx?cite=173-425',
    badgeColor: 'border-purple-500/50 bg-purple-500/20 text-purple-300',
    features: ['Statewide burn barrel prohibition', 'WAC 173-425-050 prohibited materials', 'Urban Growth Area (UGA) burn bans', 'Civil penalty enforcement framework']
  },
  {
    id: 'wa-dnr-burn-restrictions',
    title: 'WA DNR Burn Restrictions & Burn Portal',
    category: 'regulations',
    provider: 'Washington Dept of Natural Resources',
    providerType: 'State Forest Protection Authority',
    description: 'Official DNR forest fire protection portal. Details current county fire danger levels, Industrial Fire Precaution Levels (IFPL), campfire restrictions on state lands, and access to the DNR Burn Portal under WAC 332-24.',
    url: 'https://dnr.wa.gov/wildfire-resources/outdoor-burning/burn-restrictions',
    badgeColor: 'border-orange-500/50 bg-orange-500/20 text-orange-300',
    features: ['DNR Burn Portal login (burnportal.dnr.wa.gov)', 'WAC 332-24 forest fire rules', 'IFPL industrial woods restrictions', 'Interactive statewide fire danger map']
  },
  {
    id: 'douglas-county-burn-restrictions',
    title: 'Douglas County Burn Bans & Restrictions Notice',
    category: 'regulations',
    provider: 'Douglas County Administration',
    providerType: 'Official County Notice',
    description: 'Official county bulletin on seasonal burn restrictions, high-hazard fire season announcements, and direct coordination with local fire districts.',
    url: 'https://www.douglascountywa.gov/821/Burn-Bans-and-Restrictions',
    badgeColor: 'border-red-500/50 bg-red-500/20 text-red-300',
    features: ['Official county commission burn notices', 'Seasonal start & end date declarations', 'Fire district coordination links', 'Emergency ban amendments']
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Page Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/40 text-red-300 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Interagency Coordination & Public Safety</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Wildfire Maps & Public Resources
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Direct access to real-time satellite fire scans, interagency wildfire tracking apps, EPA smoke plumes, Douglas County emergency notification channels, and official burning regulations.
        </p>
      </div>

      {/* Emergency Notice Callout */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-red-600/50 bg-red-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2.5 rounded-xl bg-red-600/30 text-red-400 border border-red-500/50 flex-shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white uppercase">
              Active Fire or Smoke Emergency?
            </h2>
            <p className="text-xs text-red-200 mt-0.5">
              Do not rely on web maps or delayed reports during life-threatening situations. Call 911 immediately.
            </p>
          </div>
        </div>
        <a 
          href="tel:911"
          className="min-h-[44px] flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-950/60 border border-red-400 transition-all active:scale-95 flex-shrink-0 w-full sm:w-auto"
        >
          <Radio className="w-4 h-4" />
          <span>Dial 911</span>
        </a>
      </div>

      {/* Category Tabs & Quick Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Resources ({RESOURCES_DATA.length})
          </button>
          <button
            onClick={() => setSelectedCategory('maps')}
            className={`min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'maps'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-950/60'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Wildfire Maps & Apps</span>
          </button>
          <button
            onClick={() => setSelectedCategory('weather')}
            className={`min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'weather'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-950/60'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Smoke & Weather</span>
          </button>
          <button
            onClick={() => setSelectedCategory('local')}
            className={`min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'local'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Local Douglas County</span>
          </button>
          <button
            onClick={() => setSelectedCategory('regulations')}
            className={`min-h-[40px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'regulations'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Codes & Regulations</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search maps, apps, or alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((item) => (
          <div
            key={item.id}
            className="glass-panel-elevated rounded-3xl p-6 border border-slate-800 hover:border-slate-700 flex flex-col justify-between space-y-5 transition-all hover:scale-[1.01] shadow-xl group"
          >
            <div className="space-y-4">
              
              {/* Top Badges */}
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                  {item.providerType}
                </span>
                {item.category === 'maps' && <Map className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                {item.category === 'weather' && <Wind className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                {item.category === 'local' && <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                {item.category === 'regulations' && <Scale className="w-4 h-4 text-purple-400 flex-shrink-0" />}
              </div>

              {/* Title & Organization */}
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  {item.provider}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                {item.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 hover:border-red-500 transition-all active:scale-95 shadow-md"
              >
                <span>Launch {item.title.split(' ')[0]} Web</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>

              {/* Mobile App Links if available */}
              {item.appLinks && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {item.appLinks.ios && (
                    <a
                      href={item.appLinks.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors"
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
                      className="min-h-[40px] flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white border border-slate-800 transition-colors"
                    >
                      <Smartphone className="w-3 h-3 text-emerald-400" />
                      <span>Android App</span>
                    </a>
                  )}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">No resources found matching your search term.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Local River Corridor Info Footer Strip */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>Orondo Columbia River Corridor • Washington State Public Safety Network</span>
        </div>
        <span>Douglas County Fire District No. 4</span>
      </div>

    </div>
  );
};
