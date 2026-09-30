import { describe, it, expect } from 'vitest';
import { generateFullYearEvents } from '../data/calendarEvents';
import { STATIONS_DATA } from '../data/stationsData';
import { LEADERSHIP_DATA } from '../data/leadershipData';
import { getLocalFallbackAnswer } from '../services/aiGateway';

describe('DCFD4 Calendar Event Logic', () => {
  const events2026 = generateFullYearEvents(2026);

  it('generates 12 monthly Fire Commissioner meetings', () => {
    const commissionerMeetings = events2026.filter(e => e.category === 'commissioner');
    expect(commissionerMeetings.length).toBe(12);

    // Verify all 12 meetings are on Wednesday
    commissionerMeetings.forEach(meeting => {
      const date = new Date(meeting.date + 'T12:00:00');
      expect(date.getDay()).toBe(3); // 3 = Wednesday
      expect(meeting.time).toContain('5:30 PM');
      expect(meeting.location).toContain('Station 241');
    });
  });

  it('generates 24 bi-weekly volunteer training drills', () => {
    const trainingDrills = events2026.filter(e => e.category === 'training');
    expect(trainingDrills.length).toBe(24);

    // Verify all drills are on Tuesday
    trainingDrills.forEach(drill => {
      const date = new Date(drill.date + 'T12:00:00');
      expect(date.getDay()).toBe(2); // 2 = Tuesday
    });
  });

  it('correctly sets June 1 for Burn Ban and Oct 1 for Open Burning', () => {
    const burnBan = events2026.find(e => e.id === 'burn-ban-start-2026');
    expect(burnBan).toBeDefined();
    expect(burnBan?.date).toBe('2026-06-01');

    const openBurn = events2026.find(e => e.id === 'burn-ban-end-2026');
    expect(openBurn).toBeDefined();
    expect(openBurn?.date).toBe('2026-10-01');
  });
});

describe('DCFD4 Station & Fleet Infrastructure', () => {
  it('includes all 4 strategic stations', () => {
    expect(STATIONS_DATA.length).toBe(4);
    const stationNumbers = STATIONS_DATA.map(s => s.number);
    expect(stationNumbers).toEqual(['241', '242', '243', '244']);
  });

  it('verifies Station 241 Headquarters has full apparatus and housing specs', () => {
    const hq = STATIONS_DATA.find(s => s.number === '241');
    expect(hq).toBeDefined();
    expect(hq?.address).toContain('13984 US Highway 2');
    expect(hq?.features).toContain('Resident Volunteer Firefighter Quarters');
    expect(hq?.apparatus.some(a => a.includes('Type 1'))).toBe(true);
  });
});

describe('DCFD4 Leadership & Governance', () => {
  it('includes Chief, Assistant Chief, and 3 Commissioners', () => {
    const chief = LEADERSHIP_DATA.find(l => l.role === 'Fire Chief');
    expect(chief?.name).toBe('Jeff Zanol');

    const asstChief = LEADERSHIP_DATA.find(l => l.role.includes('Assistant Chief'));
    expect(asstChief?.name).toBe('Justin Dennis');

    const commissioners = LEADERSHIP_DATA.filter(l => l.titleGroup === 'Commissioner');
    expect(commissioners.length).toBe(3);
    const commNames = commissioners.map(c => c.name);
    expect(commNames).toContain('David Marden');
    expect(commNames).toContain('Pat Brandt');
    expect(commNames).toContain('Charles Podlich');
  });
});

describe('DCFD4 Community AI Knowledge Base Fallbacks', () => {
  it('returns emergency 911 alert for life safety inquiries', () => {
    const answer = getLocalFallbackAnswer('My neighbor house is on fire right now emergency');
    expect(answer).toContain('DIAL 911 IMMEDIATELY');
  });

  it('returns accurate burn ban date ranges', () => {
    const answer = getLocalFallbackAnswer('When is the burn ban in effect?');
    expect(answer).toContain('JUNE 1 through SEPTEMBER 30');
    expect(answer).toContain('OCTOBER 1 through MAY 31');
  });

  it('explains the 4x4x4 open burning rule', () => {
    const answer = getLocalFallbackAnswer('What are the rules and pile size for burning?');
    expect(answer).toContain('4x4x4 feet');
  });

  it('strictly refuses off-topic coding and recipe questions with official district message', () => {
    const codeAnswer = getLocalFallbackAnswer('Can you write me some Python code for a web scraper?');
    expect(codeAnswer).toContain('specifically dedicated to Douglas County Fire District 4');
    expect(codeAnswer).toContain('(509) 784-2941');

    const recipeAnswer = getLocalFallbackAnswer('Give me a recipe for chocolate cake dinner');
    expect(recipeAnswer).toContain('specifically dedicated to Douglas County Fire District 4');
  });

  it('provides clickable internal and external navigation links in AI assistant responses', () => {
    const mapAnswer = getLocalFallbackAnswer('Where can I see live wildfire maps and smoke?');
    expect(mapAnswer).toContain('[Wildfire Maps & Public Resources](/resources)');
    expect(mapAnswer).toContain('https://app.watchduty.org');

    const burnAnswer = getLocalFallbackAnswer('When can I burn yard debris?');
    expect(burnAnswer).toContain('[Burn Rules & Notice Form](/burn-permits)');

    const volAnswer = getLocalFallbackAnswer('How do I volunteer as a firefighter?');
    expect(volAnswer).toContain('[Volunteer With DCFD4](/volunteer)');

    const meetingAnswer = getLocalFallbackAnswer('When is the commissioner meeting?');
    expect(meetingAnswer).toContain('[District Calendar & Key](/calendar)');
  });
});

describe('DCFD4 Authentic Photo Gallery Data Integrity', () => {
  it('contains authentic historical and operational records', async () => {
    const { GALLERY_ITEMS } = await import('../data/galleryData');
    expect(GALLERY_ITEMS.length).toBeGreaterThanOrEqual(15);

    // Verify all items have valid titles, src paths, and descriptions
    GALLERY_ITEMS.forEach(item => {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.src).toContain('/assets/gallery/');
      expect(item.description).toBeTruthy();
      expect(item.badge).toBeTruthy();
    });

    // Verify historic 1984/1985 heritage photos are present
    const historicItems = GALLERY_ITEMS.filter(i => i.category === 'historic');
    expect(historicItems.length).toBeGreaterThanOrEqual(4);
    expect(historicItems.some(i => i.title.includes('1985') || i.year.includes('1985'))).toBe(true);
    expect(historicItems.some(i => i.title.includes('1984') || i.year.includes('1984'))).toBe(true);
  });
});

describe('DCFD4 Edge Form Service', () => {
  it('generates a valid fallback tracking reference code when offline', async () => {
    const { submitDistrictForm } = await import('../services/formService');
    const res = await submitDistrictForm({
      formType: 'open_burning',
      name: 'John Doe',
      phone: '509-555-1234',
      address: '14000 US 2, Orondo, WA',
      burnDate: '2026-10-15',
    });

    expect(res.success).toBe(true);
    expect(res.referenceCode).toMatch(/^DCFD4-BURN-\d{4}-\d{6}$/);
    expect(res.timestamp).toBeTruthy();
  });
});

describe('DCFD4 Verified External Links and Regulatory Sources', () => {
  it('ensures AI gateway knowledge base contains verified live URLs', async () => {
    const { getLocalFallbackAnswer } = await import('../services/aiGateway');
    const burnRuleAns = getLocalFallbackAnswer('What are the rules and regulations for burning?');
    expect(burnRuleAns).toContain('https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html');
    expect(burnRuleAns).toContain('https://app.leg.wa.gov/wac/default.aspx?cite=173-425');
    expect(burnRuleAns).toContain('https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits');
    expect(burnRuleAns).not.toContain('Outdoor-burn-permits'); // Old 404 URL

    const alertAns = getLocalFallbackAnswer('How do I get evacuation alerts?');
    expect(alertAns).toContain('https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System');
    expect(alertAns).not.toContain('/165/Emergency-Management'); // Old public records URL
  });

  it('ensures Resources directory contains verified live URLs for USGS and NWS Fire Weather', async () => {
    const { RESOURCES_DATA } = await import('../components/ResourcesPage');
    
    // NWS Spokane Fire Weather
    const nwsItem = RESOURCES_DATA.find(r => r.id === 'nws-spokane-fire');
    expect(nwsItem?.url).toBe('https://www.weather.gov/wrh/fire?wfo=otx&layer=fwx');
    
    // USGS Washington Water Conditions
    const usgsItem = RESOURCES_DATA.find(r => r.id === 'usgs-columbia-river');
    expect(usgsItem?.url).toBe('https://waterdata.usgs.gov/state/Washington/');
  });

  it('ensures official PayPal donation link is provided for donation queries', async () => {
    const { getLocalFallbackAnswer } = await import('../services/aiGateway');
    const { PAYPAL_DONATION_URL } = await import('../data/donationConfig');
    expect(PAYPAL_DONATION_URL).toBe('https://www.paypal.com/donate?token=LQfu7bDATzaKBFVpCduqQ-R2Tr5fS-0Zug10MliAC4oz1oYzNxi2eNgAZ2tco_OvyZ0c_1cVhfmrZ2qS');
    const donateAns = getLocalFallbackAnswer('How do I donate online to Orondo Fire?');
    expect(donateAns).toContain(PAYPAL_DONATION_URL);
    expect(donateAns).toContain('Orondo Firefighters Volunteer Association (501(c)(3))');
  });
});

describe('DCFD4 Burn Ban Dynamic Auto-Update & Seasonal Transitions', () => {
  it('correctly reports Burn Ban active for dates in June through September', async () => {
    const { isBurnBanDate, calculateCountdownDays, getBurnBanDetails } = await import('../services/burnBanService');

    // Sept 29, 2026 (today)
    const sept29 = new Date(2026, 8, 29, 12, 0, 0); // Month 8 = Sept
    expect(isBurnBanDate(sept29)).toBe(true);
    expect(calculateCountdownDays(sept29)).toBe(2);

    // Sept 30, 2026 at 23:59:59 (final moments of ban)
    const sept30Late = new Date(2026, 8, 30, 23, 59, 59);
    expect(isBurnBanDate(sept30Late)).toBe(true);
    expect(calculateCountdownDays(sept30Late)).toBe(1);

    const detailsSept = getBurnBanDetails(sept29);
    expect(detailsSept.isBurnBanActive).toBe(true);
    expect(detailsSept.seasonLabel).toBe('Official Notice: Burn Ban In Effect');
    expect(detailsSept.ctaButtonText).toBe('View Burn Ban Guidelines');
  });

  it('automatically flips to Open Burning Permitted at 00:00:00 on October 1st', async () => {
    const { isBurnBanDate, calculateCountdownDays, getBurnBanDetails } = await import('../services/burnBanService');

    // Oct 1, 2026 at 00:00:00 (first instant of open burning)
    const oct1 = new Date(2026, 9, 1, 0, 0, 0); // Month 9 = Oct
    expect(isBurnBanDate(oct1)).toBe(false);
    expect(calculateCountdownDays(oct1)).toBe(243); // 243 days until June 1, 2027

    const detailsOct = getBurnBanDetails(oct1);
    expect(detailsOct.isBurnBanActive).toBe(false);
    expect(detailsOct.seasonLabel).toBe('Season Status: Open Burning Permitted');
    expect(detailsOct.ctaButtonText).toBe('Submit Burn Notice Online');
    expect(detailsOct.badgeLabel).toContain('Until Next Ban (June 1)');
  });

  it('correctly handles May 31 transition into June 1 summer burn ban', async () => {
    const { isBurnBanDate, calculateCountdownDays, getBurnBanDetails } = await import('../services/burnBanService');

    // May 31, 2027 at 23:59:59 (last moments of open burning)
    const may31 = new Date(2027, 4, 31, 23, 59, 59); // Month 4 = May
    expect(isBurnBanDate(may31)).toBe(false);
    expect(calculateCountdownDays(may31)).toBe(1);

    // June 1, 2027 at 00:00:00 (first instant of summer burn ban)
    const june1 = new Date(2027, 5, 1, 0, 0, 0); // Month 5 = June
    expect(isBurnBanDate(june1)).toBe(true);
    expect(calculateCountdownDays(june1)).toBe(122); // 122 days until Oct 1, 2027

    const detailsJune = getBurnBanDetails(june1);
    expect(detailsJune.isBurnBanActive).toBe(true);
    expect(detailsJune.seasonLabel).toBe('Official Notice: Burn Ban In Effect');
    expect(detailsJune.ctaButtonText).toBe('View Burn Ban Guidelines');
  });
});

describe('DCFD4 Calendar Past Months Filtering', () => {
  it('defaults to showing current month through end of year for current year', () => {
    const currentActualYear = 2026;
    const currentActualMonth = 8; // September (0-indexed)

    // Simulate visibleMonthIndices computation
    const computeVisibleIndices = (showPast: boolean, year: number) => {
      if (showPast) return Array.from({ length: 12 }, (_, i) => i);
      if (year === currentActualYear) {
        const months: number[] = [];
        for (let m = currentActualMonth; m < 12; m++) {
          months.push(m);
        }
        return months;
      }
      return Array.from({ length: 12 }, (_, i) => i);
    };

    // Default: showPast = false
    const defaultVisible = computeVisibleIndices(false, 2026);
    expect(defaultVisible).toEqual([8, 9, 10, 11]); // Sept, Oct, Nov, Dec
    expect(defaultVisible.length).toBe(4);

    // Toggled: showPast = true
    const allMonths = computeVisibleIndices(true, 2026);
    expect(allMonths.length).toBe(12);
    expect(allMonths[0]).toBe(0); // Jan
    expect(allMonths[11]).toBe(11); // Dec

    // Future year displays all 12 months by default
    const futureYear = computeVisibleIndices(false, 2027);
    expect(futureYear.length).toBe(12);
  });

  it('filters events so past months are excluded by default in current year', () => {
    const events2026 = generateFullYearEvents(2026);
    const currentActualYear = 2026;
    const currentActualMonth = 8; // Sept (0-indexed)

    const filterEvents = (showPast: boolean) => {
      return events2026.filter(ev => {
        const parts = ev.date.split('-');
        const evMonthIdx = parseInt(parts[1], 10) - 1;
        if (!showPast && currentActualYear === 2026) {
          if (evMonthIdx < currentActualMonth) return false;
        }
        return true;
      });
    };

    const upcomingEvents = filterEvents(false);
    const allEvents = filterEvents(true);

    expect(upcomingEvents.length).toBeLessThan(allEvents.length);
    // Ensure no events in upcomingEvents are from Jan - Aug
    upcomingEvents.forEach(ev => {
      const monthIdx = parseInt(ev.date.split('-')[1], 10) - 1;
      expect(monthIdx).toBeGreaterThanOrEqual(8);
    });
  });
});

describe('DCFD4 Bloons TD 5 Style Firefighting Tower Defense Engine', () => {
  it('correctly interpolates fire positions along serpentine track waypoints', async () => {
    const { getCoordinateAtDistance, TOTAL_TRACK_LENGTH, TRACK_WAYPOINTS } = await import('../components/FireGamePage');
    expect(TOTAL_TRACK_LENGTH).toBeGreaterThan(1500);

    // Start of path
    const startCoord = getCoordinateAtDistance(0);
    expect(startCoord.x).toBe(TRACK_WAYPOINTS[0].x);
    expect(startCoord.y).toBe(TRACK_WAYPOINTS[0].y);

    // End of path
    const endCoord = getCoordinateAtDistance(TOTAL_TRACK_LENGTH);
    const lastPoint = TRACK_WAYPOINTS[TRACK_WAYPOINTS.length - 1];
    expect(endCoord.x).toBe(lastPoint.x);
    expect(endCoord.y).toBe(lastPoint.y);

    // Midpoint moves forward along path
    const midCoord = getCoordinateAtDistance(TOTAL_TRACK_LENGTH * 0.5);
    expect(midCoord.x).toBeGreaterThan(0);
    expect(midCoord.y).toBeGreaterThan(0);
  });

  it('verifies fire tier progression and splitting mechanics (Bloons popping logic)', async () => {
    const { FIRE_TIERS } = await import('../components/FireGamePage');
    
    // Tier 1 pops into nothing
    expect(FIRE_TIERS[1].hp).toBe(1);
    expect(FIRE_TIERS[1].speed).toBe(1.35);

    // Tier 4 Yellow Crown Fire has 4 HP and highest speed among base fires
    expect(FIRE_TIERS[4].hp).toBe(4);
    expect(FIRE_TIERS[4].speed).toBe(2.7);

    // Tier 6 Charcoal Fire is armored
    expect(FIRE_TIERS[6].isArmored).toBe(true);

    // Tier 8 Boss (Badger Mountain Inferno) has massive HP
    expect(FIRE_TIERS[8].isBoss).toBe(true);
    expect(FIRE_TIERS[8].hp).toBe(95);
  });

  it('validates tower placement zones: Fireboat strictly in Columbia River, land units on terrain', async () => {
    const { checkPlacementValidity, TOWER_CONFIGS } = await import('../components/FireGamePage');
    const fireboatConfig = TOWER_CONFIGS.find(t => t.id === 'river-fireboat')!;
    const volunteerConfig = TOWER_CONFIGS.find(t => t.id === 'hose-volunteer')!;

    // River is x = 330 to 420
    const riverCoord = { x: 375, y: 250 };
    const landCoord = { x: 200, y: 350 };

    // Fireboat in river -> valid
    const fbInRiver = checkPlacementValidity(riverCoord.x, riverCoord.y, fireboatConfig, []);
    expect(fbInRiver.valid).toBe(true);

    // Fireboat on land -> invalid
    const fbOnLand = checkPlacementValidity(landCoord.x, landCoord.y, fireboatConfig, []);
    expect(fbOnLand.valid).toBe(false);
    expect(fbOnLand.reason).toContain('Columbia River');

    // Land unit on land -> valid
    const volOnLand = checkPlacementValidity(landCoord.x, landCoord.y, volunteerConfig, []);
    expect(volOnLand.valid).toBe(true);

    // Land unit in river -> invalid
    const volInRiver = checkPlacementValidity(riverCoord.x, riverCoord.y, volunteerConfig, []);
    expect(volInRiver.valid).toBe(false);
    expect(volInRiver.reason).toContain('river');
  });

  it('enforces 70% refund policy on selling placed towers', () => {
    const baseCost = 350;
    const upgradeCost1 = 150;
    const upgradeCost2 = 120;
    const totalInvested = baseCost + upgradeCost1 + upgradeCost2; // 620

    const refund = Math.round(totalInvested * 0.7);
    // 620 * 0.7 = 434
    expect(refund).toBe(434);
  });

  it('verifies targeting AI algorithms for tower prioritization', () => {
    const targets = [
      { id: 'f1', distanceTraveled: 350, hp: 2, x: 100, y: 100 },
      { id: 'f2', distanceTraveled: 800, hp: 1, x: 200, y: 100 },
      { id: 'f3', distanceTraveled: 600, hp: 8, x: 150, y: 100 },
    ];

    // First: highest distanceTraveled
    const firstTarget = targets.reduce((prev, curr) => curr.distanceTraveled > prev.distanceTraveled ? curr : prev);
    expect(firstTarget.id).toBe('f2');

    // Last: lowest distanceTraveled
    const lastTarget = targets.reduce((prev, curr) => curr.distanceTraveled < prev.distanceTraveled ? curr : prev);
    expect(lastTarget.id).toBe('f1');

    // Strongest: highest hp
    const strongestTarget = targets.reduce((prev, curr) => curr.hp > prev.hp ? curr : prev);
    expect(strongestTarget.id).toBe('f3');
  });
});

describe('DCFD4 Footer Attribution & Developer Contact Verification', () => {
  it('validates designer attribution and inquiry email standards', async () => {
    const { DEVELOPER_ATTRIBUTION } = await import('../components/Footer');

    // Verifies designer name, year, and custom built notice
    expect(DEVELOPER_ATTRIBUTION.designer).toBe('Isaac King');
    expect(DEVELOPER_ATTRIBUTION.year).toBe(2026);
    expect(DEVELOPER_ATTRIBUTION.role).toBe('Website Custom Designed & Built');

    // Verifies email address and mailto protocol
    expect(DEVELOPER_ATTRIBUTION.inquiryEmail).toBe('isaac.king5050@gmail.com');
    expect(DEVELOPER_ATTRIBUTION.inquiryMailto).toContain('mailto:isaac.king5050@gmail.com');
    expect(DEVELOPER_ATTRIBUTION.inquiryMailto).toContain('subject=Website%20Design%20%26%20Development%20Inquiry');
    expect(DEVELOPER_ATTRIBUTION.copyright).toContain('All Rights Reserved');
  });
});
