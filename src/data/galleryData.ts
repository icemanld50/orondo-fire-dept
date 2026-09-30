export interface GalleryItem {
  id: string;
  title: string;
  src: string;
  thumbnail?: string;
  category: 'action' | 'apparatus' | 'historic' | 'community';
  categoryLabel: string;
  year: string;
  location: string;
  description: string;
  badge: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'station41-hq',
    title: 'Station 241 Headquarters & Apparatus Bays',
    src: '/assets/gallery/station41_headquarters.jpg',
    category: 'apparatus',
    categoryLabel: 'Apparatus & Stations',
    year: 'Modern Fleet',
    location: '13984 US Highway 2, Orondo, WA',
    description: 'Central operations headquarters of Douglas County Fire District 4, housing primary frontline structural pumpers, heavy brush trucks, tenders, and resident firefighter quarters.',
    badge: 'Headquarters'
  },
  {
    id: 'wildland-action',
    title: 'Wildland Brush Fire Attack',
    src: '/assets/gallery/wildland_action.jpg',
    category: 'action',
    categoryLabel: 'Frontline Action',
    year: '2019',
    location: 'Orondo Foothills & US 97 Corridor',
    description: 'DCFD4 volunteer firefighters deploying high-pressure wildland hoselines to contain active rangeland brush fires in steep sagebrush terrain.',
    badge: 'Wildland Defense'
  },
  {
    id: 'pateros-wildfire',
    title: 'Pateros Wildfire Mutual Aid Response',
    src: '/assets/gallery/pateros_wildfire_response.jpg',
    category: 'action',
    categoryLabel: 'Frontline Action',
    year: '2014',
    location: 'Carlton Complex / Pateros Sector',
    description: 'Douglas County Fire District 4 apparatus deployed under state mutual aid mobilization during catastrophic North Central Washington wildfire complexes.',
    badge: 'Mutual Aid Mobilization'
  },
  {
    id: 'wildland-fire-2014',
    title: 'Columbia Corridor Firestorm Suppression',
    src: '/assets/gallery/wildland_fire_2014.jpg',
    category: 'action',
    categoryLabel: 'Frontline Action',
    year: '2014',
    location: 'East Columbia River Ridge',
    description: 'Intense fire suppression operations protecting agricultural orchards and residential properties along the river corridor during extreme summer fire danger.',
    badge: 'Brush Attack'
  },
  {
    id: 'structure-attack-2014',
    title: 'Independence Day Community Parade & Apparatus',
    src: '/assets/gallery/structure_attack_2014.jpg',
    category: 'community',
    categoryLabel: 'Training & Community',
    year: '2014',
    location: 'Orondo Community Parade',
    description: 'DCFD4 volunteer firefighters and youth cadet walking with the American flag and patriotic bunting ahead of the district frontline engine and brush truck during the Orondo community parade.',
    badge: 'Community Parade'
  },
  {
    id: 'apparatus-drill-2019',
    title: 'Apparatus Operations & Water Tender Drill',
    src: '/assets/gallery/apparatus_drill_2019.jpg',
    category: 'apparatus',
    categoryLabel: 'Apparatus & Stations',
    year: '2019',
    location: 'Station 241 Grounds',
    description: 'Volunteer crews conducting heavy apparatus pumping drills, drop-tank water shuttle operations, and master stream evaluations.',
    badge: 'Apparatus Training'
  },
  {
    id: 'crew-training-2019',
    title: 'Volunteer Firefighter Drill & Evolution',
    src: '/assets/gallery/crew_training_2019.jpg',
    category: 'community',
    categoryLabel: 'Training & Community',
    year: '2019',
    location: 'District 4 Training Field',
    description: 'Weekly Thursday evening volunteer drills covering SCBA confidence, search and rescue, rapid intervention team (RIT) tactics, and ladder operations.',
    badge: 'Volunteer Drills'
  },
  {
    id: 'frontline-apparatus-action',
    title: 'Frontline Attack Rig in Field Deployment',
    src: '/assets/gallery/frontline_apparatus_action.jpg',
    category: 'apparatus',
    categoryLabel: 'Apparatus & Stations',
    year: 'Recent Operations',
    location: 'Douglas County Rangeland',
    description: 'All-wheel drive wildland engine staged in rural rangeland, equipped with foam induction, auxiliary pump-and-roll, and off-road drafting suction.',
    badge: 'Initial Attack Engine'
  },
  {
    id: 'heavy-rescue-apparatus',
    title: 'Heavy Rescue & Equipment Tender 3333',
    src: '/assets/gallery/heavy_rescue_apparatus.jpg',
    category: 'apparatus',
    categoryLabel: 'Apparatus & Stations',
    year: 'Fleet Operations',
    location: 'Station 242 Bay',
    description: 'Specialized support apparatus carrying hydraulic extrication tools, cribbing, emergency lighting, and hazmat containment supplies.',
    badge: 'Special Operations'
  },
  {
    id: 'engine-crew-ops',
    title: 'Engine Company Staging & Tactical Setup',
    src: '/assets/gallery/engine_crew_ops.jpg',
    category: 'apparatus',
    categoryLabel: 'Apparatus & Stations',
    year: 'Operations',
    location: 'Highway 97 Incident',
    description: 'Command and engine apparatus on scene establishing incident management, staging traffic control, and deploying initial attack teams.',
    badge: 'Incident Command'
  },
  {
    id: 'historic-station-241-1985',
    title: 'Station 241 Apparatus Bay (1985)',
    src: '/assets/gallery/historic_station_241_1985.jpg',
    category: 'historic',
    categoryLabel: 'Historic Heritage',
    year: '1985',
    location: 'Orondo, WA',
    description: 'Original Station 241 facility as it stood in 1985, demonstrating 40+ years of continuous community commitment and volunteer service in Orondo.',
    badge: '1985 Station Heritage'
  },
  {
    id: 'historic-engine-2441-1984',
    title: 'Historic Engine 2441 (1984)',
    src: '/assets/gallery/historic_engine_2441_1984.jpg',
    category: 'historic',
    categoryLabel: 'Historic Heritage',
    year: '1984',
    location: 'District Station Bay',
    description: 'Frontline 1984 DCFD4 fire engine 2441, an iconic chapter in Orondo’s emergency apparatus history serving Douglas County farms and orchards.',
    badge: '1984 Historic Engine'
  },
  {
    id: 'historic-crew-1985',
    title: 'Volunteer Firefighters & Apparatus (1985)',
    src: '/assets/gallery/historic_crew_1985.jpg',
    category: 'historic',
    categoryLabel: 'Historic Heritage',
    year: '1985',
    location: 'Orondo Community',
    description: 'Pioneering volunteer firefighters gathered beside the station apparatus in 1985, honoring generations of neighbors protecting neighbors.',
    badge: '1985 Crew Memorial'
  },
  {
    id: 'wildland-ops-1985',
    title: 'Wildland Operations in Orondo Coulees (1985)',
    src: '/assets/gallery/wildland_ops_1985.jpg',
    category: 'historic',
    categoryLabel: 'Historic Heritage',
    year: '1985',
    location: 'Douglas County Foothills',
    description: 'Vintage four-wheel drive brush rig working steep sage coulees in 1985 with early portable pump technology.',
    badge: '1985 Wildland Unit'
  },
  {
    id: 'extrication-rescue-1990',
    title: 'Highway 97 Extrication Rescue (1990)',
    src: '/assets/gallery/extrication_rescue_1990.jpg',
    category: 'historic',
    categoryLabel: 'Historic Heritage',
    year: '1990',
    location: 'US Highway 97 Milepost 215',
    description: 'Historic rescue operation demonstrating DCFD4’s multi-decade role in motor vehicle extrication and emergency trauma response.',
    badge: '1990 Rescue Response'
  },
  {
    id: 'winter-response-2015',
    title: 'Winter Snowstorm Response (2015)',
    src: '/assets/gallery/winter_response_2015.jpg',
    category: 'action',
    categoryLabel: 'Frontline Action',
    year: '2015',
    location: 'Badger Mountain Road',
    description: 'Chained apparatus navigating steep snowy mountain roads during freezing Eastern Washington blizzards to deliver emergency aid.',
    badge: 'Winter All-Weather'
  },
  {
    id: 'community-event-2015',
    title: 'Community Fire Safety & Holiday Outreach (2015)',
    src: '/assets/gallery/community_event_2015.jpg',
    category: 'community',
    categoryLabel: 'Training & Community',
    year: '2015',
    location: 'Orondo Community Center',
    description: 'DCFD4 volunteer firefighters hosting local families, educating youth on home smoke alarms, stop-drop-and-roll, and wildland defensible space.',
    badge: 'Community Outreach'
  },
  {
    id: 'district-boundary-map',
    title: 'Official DCFD4 Boundary & Jurisdiction Map',
    src: '/assets/gallery/district_boundary_map.jpg',
    category: 'apparatus',
    categoryLabel: 'Apparatus & Stations',
    year: 'Official Map',
    location: 'Douglas County, WA',
    description: 'Official jurisdictional boundary of District 4 extending along the east shore of the Columbia River from Turtle Rock north past Beebe Bridge.',
    badge: 'Jurisdiction Map'
  },
  {
    id: 'leadership-station-2019',
    title: 'Department Leadership & Operations Inspection',
    src: '/assets/gallery/leadership_station_2019.jpg',
    category: 'community',
    categoryLabel: 'Training & Community',
    year: '2019',
    location: 'Station 241 Training Bay',
    description: 'Officers and Chief staff conducting equipment compliance audits, hose pressure testing, and station inventory reviews.',
    badge: 'Leadership & Safety'
  }
];
