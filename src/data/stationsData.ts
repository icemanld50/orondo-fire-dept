import type { StationInfo } from '../types';

export const STATIONS_DATA: StationInfo[] = [
  {
    id: 'station-241',
    number: '241',
    name: 'Station 241 — Headquarters & Training Campus',
    address: '13984 US Highway 2, Orondo, WA 98843',
    description: 'The central operational hub of Douglas County Fire District 4. Located right in the heart of Orondo, this facility houses district administrative headquarters, volunteer training grounds, commissioner meeting chambers, apparatus bays, and resident firefighter living quarters.',
    features: [
      'District Administrative Office',
      'Multi-Bay Apparatus Housing',
      'Commissioner Meeting Chambers',
      'Modern Training Facility & Classroom',
      'Resident Volunteer Firefighter Quarters',
      'Emergency Backup Generator & Communications Hub',
    ],
    apparatus: [
      'Engine 241 (Type 1 Structural Pumper - 1,250 GPM)',
      'Tender 241 (Tactical Water Tender - 3,000 Gallons)',
      'Brush 241 (Type 6 Rapid Wildland 4x4 Attack Unit)',
      'Aid 241 (Equipped First-Response ALS/BLS Medic Unit with AED)',
      'Command 241 (Incident Command Rig)',
    ],
    coords: {
      lat: 47.6186,
      lng: -120.2223,
    },
    googleMapsUrl: 'https://maps.google.com/?q=13984+US+Highway+2+Orondo+WA+98843',
  },
  {
    id: 'station-242',
    number: '242',
    name: 'Station 242 — Central Corridor Station',
    address: '22170 US Highway 97, Orondo, WA 98843',
    description: 'Strategically positioned midway along the busy Highway 97 transportation and agricultural corridor to drastically cut down emergency response times to accidents, orchard fires, and residential medical calls.',
    features: [
      'Dual-Bay Rapid Deploy Apparatus Bay',
      'Highway 97 Direct Egress',
      'Auxiliary Water Refill Station',
      'Volunteer Call-In Locker Facilities',
    ],
    apparatus: [
      'Engine 242 (Type 3 Urban-Interface Engine)',
      'Brush 242 (Type 6 Off-Road Wildland Truck)',
      'Support 242 (Auxiliary Utility Rig)',
    ],
    coords: {
      lat: 47.6980,
      lng: -120.1850,
    },
    googleMapsUrl: 'https://maps.google.com/?q=22170+US+97+Orondo+WA+98843',
  },
  {
    id: 'station-243',
    number: '243',
    name: 'Station 243 — Greens Canyon Foothills Station',
    address: '20 Greens Canyon Rd, Orondo, WA 98843',
    description: 'Located in the rugged northern canyon foothills of Orondo. Built specifically to deliver rapid containment of lightning-sparked rangeland wildfires and provide rapid initial attack for rural mountain residents.',
    features: [
      'Rapid Deployment Apparatus Bay',
      'Rugged Foothill & Canyon Access',
      'High-Elevation Radio Repeater Link',
      'Seasonal Wildfire Staging Depot',
    ],
    apparatus: [
      'Brush 243 (Heavy 4x4 Wildland Attack Unit)',
      'Tender 243 (Rural Water Delivery Unit - 2,500 Gallons)',
    ],
    coords: {
      lat: 47.7420,
      lng: -120.1530,
    },
    googleMapsUrl: 'https://maps.google.com/?q=20+Greens+Canyon+Rd+Orondo+WA+98843',
  },
  {
    id: 'station-244',
    number: '244',
    name: 'Station 244 — Beebe Bridge & Columbia River Station',
    address: '23420 US Highway 97, Orondo, WA 98843',
    description: 'Situated just south of the historic Beebe Bridge on the north end of District 4. Protects the northern gateway across the Columbia River, providing mutual aid coordination with Chelan and Brewster emergency services.',
    features: [
      'Apparatus Bay with Multi-Rig Capacity',
      'Community Meeting Room',
      'Columbia River Crossing Rapid Response',
      'Regional Mutual Aid Staging Base',
    ],
    apparatus: [
      'Engine 244 (Class A Structural & Highway Rescue Engine)',
      'Brush 244 (Type 6 Wildland 4x4 Brush Truck)',
      'Aid 244 (Medical Emergency First Responder Unit)',
    ],
    coords: {
      lat: 47.8180,
      lng: -119.9880,
    },
    googleMapsUrl: 'https://maps.google.com/?q=23420+US+97+Orondo+WA+98843',
  },
];
