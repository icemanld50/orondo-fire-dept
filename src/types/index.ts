export type CategoryType = 
  | 'commissioner'
  | 'burn-ban'
  | 'open-burning'
  | 'training'
  | 'community'
  | 'clinic'
  | 'holiday';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  endDate?: string; // For multi-day or seasonal spans
  time?: string;
  location: string;
  category: CategoryType;
  description: string;
  isRecurring?: boolean;
}

export interface StationInfo {
  id: string;
  number: string;
  name: string;
  address: string;
  description: string;
  features: string[];
  apparatus: string[];
  coords: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
}

export interface LeaderInfo {
  name: string;
  role: string;
  titleGroup: 'Chief' | 'Captain' | 'Lieutenant' | 'Commissioner' | 'Coordinator';
  bio?: string;
}

export interface BurnReportForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  burnDate: string;
  burnType: 'natural-debris' | 'agricultural' | 'cooking-fire';
  pileDimensionsConfirmed: boolean;
  waterSupplyConfirmed: boolean;
  notes?: string;
  bot_field?: string;
}

export interface VolunteerApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  ageGroup: '16-18' | '19-29' | '30-49' | '50+';
  interestedRoles: string[];
  hasExperience: boolean;
  experienceDetails?: string;
  bot_field?: string;
}
