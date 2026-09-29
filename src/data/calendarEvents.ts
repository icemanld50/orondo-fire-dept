import type { CalendarEvent } from '../types';

// Helper to format date YYYY-MM-DD
function formatDate(year: number, month: number, day: number): string {
  const m = month < 10 ? `0${month}` : `${month}`;
  const d = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${m}-${d}`;
}

// Helper to find Nth weekday in month (e.g. 3rd Wednesday)
function getNthWeekdayOfMonth(year: number, month: number, weekday: number, n: number): number {
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month - 1, day);
    if (date.getMonth() !== month - 1) break;
    if (date.getDay() === weekday) {
      count++;
      if (count === n) return day;
    }
  }
  return 1;
}

export function generateFullYearEvents(targetYear: number = 2026): CalendarEvent[] {
  const events: CalendarEvent[] = [];

  // 1. Monthly Commissioner Meetings: 3rd Wednesday of each month @ 5:30 PM
  for (let m = 1; m <= 12; m++) {
    const day = getNthWeekdayOfMonth(targetYear, m, 3, 3); // 3 = Wednesday
    events.push({
      id: `comm-meeting-${targetYear}-${m}`,
      title: `Board of Fire Commissioners Meeting`,
      date: formatDate(targetYear, m, day),
      time: '5:30 PM - 7:00 PM',
      location: 'Station 241 (HQ), 13984 US 2, Orondo, WA',
      category: 'commissioner',
      description: 'Official monthly meeting of the Douglas County Fire District No. 4 Board of Fire Commissioners. Open to the public. Agenda includes district operations, budget review, and equipment planning.',
      isRecurring: true,
    });
  }

  // 2. Training Drills: 1st & 3rd Tuesday of each month @ 7:00 PM
  for (let m = 1; m <= 12; m++) {
    const drill1Day = getNthWeekdayOfMonth(targetYear, m, 2, 1); // 1st Tuesday
    const drill2Day = getNthWeekdayOfMonth(targetYear, m, 2, 3); // 3rd Tuesday

    events.push({
      id: `training-1-${targetYear}-${m}`,
      title: `Volunteer Fire & EMS Drill: Operations`,
      date: formatDate(targetYear, m, drill1Day),
      time: '7:00 PM - 9:00 PM',
      location: 'Station 241 Training Grounds',
      category: 'training',
      description: 'Regular bi-weekly training drill for DCFD4 volunteer firefighters and EMTs. Focus on apparatus operation, hose deployment, ventilation, and emergency medical protocols.',
      isRecurring: true,
    });

    events.push({
      id: `training-2-${targetYear}-${m}`,
      title: `Volunteer Fire & EMS Drill: Scenario Practical`,
      date: formatDate(targetYear, m, drill2Day),
      time: '7:00 PM - 9:00 PM',
      location: 'Station 241 or Satellite Station',
      category: 'training',
      description: 'Hands-on practical scenario training. Live simulation of structural, wildland, or motor vehicle accident (MVA) extrication with Ballard Ambulance coordination.',
      isRecurring: true,
    });
  }

  // 3. Burn Ban Window: June 1 - September 30
  events.push({
    id: `burn-ban-start-${targetYear}`,
    title: `🔥 Annual County-Wide Burn Ban Takes Effect`,
    date: formatDate(targetYear, 6, 1),
    endDate: formatDate(targetYear, 9, 30),
    time: 'Effective 12:01 AM',
    location: 'District-Wide (Douglas County Fire District 4)',
    category: 'burn-ban',
    description: 'Annual summer burn ban strictly in effect. Outdoor burning of debris, land clearing fires, and burn barrels are prohibited. Only small cooking fires in approved pits allowed unless extreme fire danger restrictions are declared.',
    isRecurring: true,
  });

  events.push({
    id: `burn-ban-end-${targetYear}`,
    title: `🍂 Open Burning Permitted Season Begins`,
    date: formatDate(targetYear, 10, 1),
    endDate: formatDate(targetYear + 1, 5, 31),
    time: 'Effective 8:00 AM',
    location: 'District-Wide (Douglas County Fire District 4)',
    category: 'open-burning',
    description: 'Open burning season opens! Yard waste and natural debris piles up to 4x4x4 feet allowed with mandatory fire department notification, adult supervision, and water on site until dusk.',
    isRecurring: true,
  });

  // 4. Community Events throughout the year
  events.push({
    id: `community-pancake-${targetYear}`,
    title: `🥞 Annual Firefighters Pancake Breakfast & Open House`,
    date: formatDate(targetYear, 5, 23),
    time: '7:30 AM - 11:30 AM',
    location: 'Station 241 (HQ), 13984 US 2, Orondo, WA',
    category: 'community',
    description: 'Join your local Orondo volunteer firefighters for fresh pancakes, eggs, sausages, and coffee! Bring the family to tour the fire engines, meet Sparky the Fire Dog, and check out our Jaws of Life rescue tools. Donations support the Orondo Firefighters Association.',
  });

  events.push({
    id: `community-parade-${targetYear}`,
    title: `🇺🇸 Independence Day Community Fire Truck Procession`,
    date: formatDate(targetYear, 7, 4),
    time: '10:00 AM - 1:00 PM',
    location: 'US Highway 2 & Orondo Community Center',
    category: 'community',
    description: 'DCFD4 apparatus on parade with water spraying demos, free smoke detector giveaways, and summer wildland fire safety information.',
  });

  events.push({
    id: `wildland-workshop-${targetYear}`,
    title: `🌲 Wildfire Preparedness & Defensible Space Workshop`,
    date: formatDate(targetYear, 4, 18),
    time: '10:00 AM - 12:00 PM',
    location: 'Station 241 Meeting Room',
    category: 'community',
    description: 'Learn how to protect your home and orchards from Eastern Washington wildfires. Free consultation on creating defensible space, clearing brush, and ember-resistant home hardening.',
  });

  events.push({
    id: `fire-prevention-week-${targetYear}`,
    title: `🧯 National Fire Prevention Week & Station Open Tours`,
    date: formatDate(targetYear, 10, 7),
    time: '1:00 PM - 5:00 PM',
    location: 'Station 241 & Station 244 (Beebe Bridge)',
    category: 'community',
    description: 'Celebrate National Fire Prevention Week with station tours, hands-on fire extinguisher practice, child car seat inspections, and family escape planning.',
  });

  events.push({
    id: `santa-run-${targetYear}`,
    title: `🎅 Santa on the Fire Truck & Holiday Food Drive`,
    date: formatDate(targetYear, 12, 19),
    time: '1:00 PM - 6:00 PM',
    location: 'Throughout Orondo Neighborhoods & Highway 97 corridor',
    category: 'community',
    description: 'Santa Claus visits Orondo on Engine 241! Listen for the sirens and holiday music. We will be collecting non-perishable food and unwrapped toys for local Douglas County families in need.',
  });

  // 5. Health Clinics & Public Safety
  events.push({
    id: `clinic-spring-${targetYear}`,
    title: `❤️ Community Health: Blood Pressure & Glucose Clinic`,
    date: formatDate(targetYear, 3, 21),
    time: '9:00 AM - 12:00 PM',
    location: 'Station 241 Meeting Room',
    category: 'clinic',
    description: 'Free vital health checks performed by DCFD4 certified EMTs. Free blood pressure monitoring, blood sugar checks, and emergency preparedness guides.',
  });

  events.push({
    id: `clinic-cpr-${targetYear}`,
    title: `🫀 Community Hands-Only CPR & AED Certification`,
    date: formatDate(targetYear, 8, 15),
    time: '9:00 AM - 1:00 PM',
    location: 'Station 241 Training Room',
    category: 'clinic',
    description: 'Learn life-saving CPR and how to use an automated external defibrillator (AED). Free class for all Orondo residents, orchard workers, and local business owners.',
  });

  events.push({
    id: `clinic-fall-${targetYear}`,
    title: `❤️ Fall Community Health & Senior Safety Clinic`,
    date: formatDate(targetYear, 11, 14),
    time: '9:00 AM - 12:00 PM',
    location: 'Station 241 Meeting Room',
    category: 'clinic',
    description: 'Pre-winter health and home fire safety checks. Free smoke detector battery replacements and medical checkups for Orondo seniors and families.',
  });

  // 6. Holiday Observances
  events.push({
    id: `holiday-newyears-${targetYear}`,
    title: `New Year's Day (Administrative Offices Closed - 911 24/7 Active)`,
    date: formatDate(targetYear, 1, 1),
    location: 'Administrative Office Closed',
    category: 'holiday',
    description: 'District administrative offices are closed in observance of New Year’s Day. Emergency response personnel are on full duty 24/7/365. Always call 911 for emergencies.',
  });

  events.push({
    id: `holiday-memorial-${targetYear}`,
    title: `Memorial Day (Administrative Offices Closed - 911 24/7 Active)`,
    date: formatDate(targetYear, 5, 25),
    location: 'Administrative Office Closed',
    category: 'holiday',
    description: 'Remembering and honoring our nation’s fallen heroes. 24/7 emergency response fully active.',
  });

  events.push({
    id: `holiday-labor-${targetYear}`,
    title: `Labor Day (Administrative Offices Closed - 911 24/7 Active)`,
    date: formatDate(targetYear, 9, 7),
    location: 'Administrative Office Closed',
    category: 'holiday',
    description: 'Administrative offices closed. 24/7 emergency response active.',
  });

  events.push({
    id: `holiday-thanksgiving-${targetYear}`,
    title: `Thanksgiving Holiday (Administrative Offices Closed - 911 24/7 Active)`,
    date: formatDate(targetYear, 11, 26),
    location: 'Administrative Office Closed',
    category: 'holiday',
    description: 'Happy Thanksgiving from your DCFD4 firefighters and EMTs. Emergency response fully active 24/7.',
  });

  events.push({
    id: `holiday-christmas-${targetYear}`,
    title: `Christmas Day (Administrative Offices Closed - 911 24/7 Active)`,
    date: formatDate(targetYear, 12, 25),
    location: 'Administrative Office Closed',
    category: 'holiday',
    description: 'Merry Christmas to all Orondo and Douglas County residents. 24/7 emergency crews standing by.',
  });

  return events.sort((a, b) => a.date.localeCompare(b.date));
}
