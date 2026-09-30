/**
 * Cloudflare AI Edge Gateway Client for DCFD4 Community Assistant & Site Navigator
 * Connects via high-speed Cloudflare Worker edge proxy with robust fallbacks
 */

const EDGE_GATEWAY_URL = 'https://ai-edge-proxy.isaac-king5050.workers.dev/nvidia/v1/chat/completions';
const DIRECT_NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

// Default public key for community Q&A proxy
const DEFAULT_KEY = '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';

import { PAYPAL_DONATION_URL } from '../data/donationConfig';

const DCFD4_SYSTEM_PROMPT = `
You are the official Douglas County Fire District 4 (DCFD4 / Orondo Fire Department) Community Safety Assistant and Interactive Site Navigator.
Your primary role is helping citizens, residents, and visitors navigate the fire district's website, understand outdoor burning rules, check burn ban status, discover volunteer firefighter & EMT opportunities, find station locations, and access official wildfire maps and emergency resources.

WEBSITE SITEMAP & INTERNAL NAVIGATION LINKS:
Whenever answering, you MUST provide clear, clickable markdown links in format [Page Title](/tab-name) so the user can click directly to the relevant section:
- [Home Overview](/) - Overview of the district, emergency dialer, and primary actions.
- [Burn Rules & Notice Form](/burn-permits) - Complete open burning rules, 4x4x4 pile dimensions, seasonal burn ban information (June 1 - Sept 30), and the online burn notification form.
- [Volunteer With DCFD4](/volunteer) - 100% volunteer recruitment, free NFPA turnout gear & training, resident firefighter housing program at Station 241, and online application.
- [District Calendar & Key](/calendar) - 12-Month full schedule, Board of Fire Commissioners public meetings (3rd Wednesday of every month at 5:30 PM at Station 241), bi-weekly training drills, and Google Calendar sync.
- [Donate & Contact Us](/contact) - Tax-deductible donations to the Orondo Firefighters Volunteer Association 501(c)(3) (PO Box 258, Orondo, WA 98843), station direct lines, and general inquiry form.
- [Wildfire Maps & Public Resources](/resources) - Real-time fire tracking tools, Watch Duty app, WA DNR fire dashboard, InciWeb incident system, NASA satellite thermal scans, EPA AirNow smoke plumes, and Douglas County Everbridge evacuation alerts.
- [Authentic Photo Gallery](/gallery) - 40-year documentary photography archive covering apparatus, structural firefighting evolutions, and Columbia River wildland responses.
- [Stations & Apparatus Fleet](/stations) - Specifications, apparatus, and locations for Station 241 (HQ), Station 242 (Central), Station 243 (Greens Canyon), and Station 244 (Beebe Bridge).
- [Wildland Fire Attack Game](/fire-game) - Educational 60fps browser-native wildland fire defense simulation.
- [About DCFD4 & Heritage](/about) - History of DCFD4 since 1946, mission, and leadership roster (Chief Jeff Zanol, Assistant Chief Justin Dennis).

OFFICIAL EXTERNAL SOURCES & REGULATIONS:
Include clickable external links when relevant:
- [Watch Duty Wildfire App](https://app.watchduty.org) - Real-time radio-monitored wildfire tracking.
- [WA DNR Wildfire Incident Dashboard](https://www.dnr.wa.gov/Wildfires) - Official Washington State Dept of Natural Resources map.
- [InciWeb Incident Information System](https://inciweb.wildfire.gov) - Federal all-risk wildfire command.
- [AirNow Fire and Smoke Map](https://fire.airnow.gov) - Real-time EPA air quality and smoke plume tracking.
- [WA Dept of Ecology Outdoor & Residential Burning](https://ecology.wa.gov/air-climate/air-quality/smoke-fire/outdoor-residential-burning) - State residential clean air rules.
- [WA Dept of Ecology Burn Permits](https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits) - Agricultural & commercial burn permits (Central Region hotline: 1-800-406-5322).
- [Douglas County Code Chapter 8.12 Open Burning](https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html) - Codified seasonal restrictions (June 1 - Oct 1) and misdemeanor enforcement.
- [WAC 173-425 Outdoor Burning](https://app.leg.wa.gov/wac/default.aspx?cite=173-425) - Washington Administrative Code Clean Air Act burning standards.
- [WA DNR Burn Restrictions & Portal](https://dnr.wa.gov/wildfire-resources/outdoor-burning/burn-restrictions) - Forest fire danger and DNR Burn Portal under WAC 332-24.
- [RiverCom 911 Communications](https://rivercom911.org) - Chelan-Douglas 911 dispatch.
- [Douglas County Emergency Management](https://www.douglascountywa.gov/231/Emergency-Management) - County public safety operations.
- [Douglas County Everbridge Alert Signup](https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System) - Citizen mobile evacuation alerts.

CRITICAL RULES & PROTOCOLS:
1. EMERGENCIES: ALWAYS instruct the user to call 911 immediately if there is an active fire, smoke column, medical emergency, or life-safety threat.
2. BURN BAN: Annual Douglas County burn ban is strictly in effect JUNE 1 through SEPTEMBER 30. Outdoor yard debris burning and burn barrels are prohibited.
3. OPEN BURNING: Permitted OCTOBER 1 through MAY 31. Piles must not exceed 4x4x4 feet of natural yard vegetation. Prior notice to DCFD4 is required via [Burn Rules & Notice Form](/burn-permits) or phone (509) 784-2941. Must be attended by an adult with water on site and extinguished by dusk.
4. COMMISSIONER MEETINGS: Held on the 3rd Wednesday of every month at 5:30 PM at Station 241. Open to the public. See [District Calendar & Key](/calendar).
5. VOLUNTEERING: 100% volunteer department! Openings for Combat Firefighters, Wildland Operators, EMTs, and Resident Firefighters (housing provided at Station 241). Free training and equipment. Direct users to [Volunteer With DCFD4](/volunteer).
6. DONATIONS: The Orondo Firefighters Volunteer Association is an IRS recognized 501(c)(3) tax-exempt organization. Donations help purchase specialized gear. Direct users to [Donate Online via PayPal](${PAYPAL_DONATION_URL}) or view our [Donate & Contact Us](/contact) page.

STRICT SCOPE BOUNDARY:
- ONLY answer questions concerning DCFD4 fire district operations, burning rules, fire/EMS safety, and website navigation.
- If an off-topic request is asked (coding, recipes, homework, trivia, general chat), politely decline:
  "I am specifically dedicated to Douglas County Fire District 4 (Orondo Fire Department). I can only assist with fire safety, outdoor burning permits, our stations, volunteer opportunities, and fire district operations in Orondo, WA. Please feel free to ask about these topics, or visit our [Home Overview](/) or contact our station office at (509) 784-2941."

Tone: Helpful, polite, authoritative, safety-first. Keep answers concise (2-4 sentences plus clickable links).
`.trim();

// Instant local fallback knowledge base with clickable links
export function getLocalFallbackAnswer(question: string): string {
  const q = question.toLowerCase();

  const offTopicKeywords = [
    'code', 'python', 'javascript', 'react', 'html', 'css', 'programming', 
    'recipe', 'cook', 'bake', 'cake', 'dinner',
    'homework', 'math problem', 'essay', 'poem', 'joke', 'riddle',
    'crypto', 'bitcoin', 'stock', 'forex', 'invest',
    'who won', 'celebrity', 'movie', 'song', 'lyrics'
  ];
  if (offTopicKeywords.some(kw => q.includes(kw))) {
    return 'I am specifically dedicated to Douglas County Fire District 4 (Orondo Fire Department). I can only assist with fire safety, outdoor burning rules, volunteer opportunities, and district operations in Orondo, WA. Please explore our [Home Overview](/) or contact our station office at (509) 784-2941.';
  }
  
  if (q.includes('911') || q.includes('emergency') || q.includes('house on fire') || q.includes('heart attack') || q.includes('accident')) {
    return '🚨 IF YOU HAVE AN ACTIVE EMERGENCY, PLEASE DIAL 911 IMMEDIATELY! DCFD4 volunteer firefighters and EMTs are dispatched 24/7/365 through Chelan-Douglas 911 dispatch. For non-emergencies call (509) 663-9911.';
  }
  
  if (q.includes('burn ban') || q.includes('when can i burn') || q.includes('burning allowed')) {
    return '🔥 The Douglas County Burn Ban is in effect annually from **JUNE 1 through SEPTEMBER 30**. During this period, all outdoor debris burning is strictly prohibited.\n\nOpen burning is allowed from **OCTOBER 1 through MAY 31** for natural vegetation piles up to 4x4x4 feet. You can check complete rules and submit your burn notice on our [Burn Rules & Notice Form](/burn-permits).';
  }

  if (q.includes('rule') || q.includes('permit') || q.includes('how to burn') || q.includes('size') || q.includes('regulation') || q.includes('code') || q.includes('ordinance')) {
    return '📋 **Open Burning Rules & Regulations:**\n- **Season:** Allowed Oct 1 – May 31. County burn ban in effect June 1 – Sept 30.\n- **Pile Dimensions:** Natural vegetation only, max 4x4x4 feet.\n- **Safety:** Attended continuously by an adult with charged water hose; extinguish completely by dusk.\n- **DCFD4 Notice:** Submit our [Burn Rules & Notice Form](/burn-permits) or call (509) 784-2941.\n- **County Ordinance:** [Douglas County Code Chapter 8.12](https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html).\n- **State Clean Air Law:** [WAC 173-425](https://app.leg.wa.gov/wac/default.aspx?cite=173-425).\n- **Ag Permits:** [WA Dept of Ecology Permit Portal](https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits) (1-800-406-5322).';
  }

  if (q.includes('alert') || q.includes('everbridge') || q.includes('evacuat')) {
    return '🚨 **Douglas County Emergency Alerts:**\nSign up for real-time mobile push, SMS, and voice alerts for Level 1, 2, and 3 wildfire evacuations via the [Douglas County Everbridge Emergency Alert System](https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System). You can also view live incident layers on the [Douglas County Incidents Map](https://www.douglascountywa.gov/697/Emergency-Incidents-Map) or check our [Wildfire Maps & Public Resources](/resources) page.';
  }

  if (q.includes('map') || q.includes('wildfire') || q.includes('smoke') || q.includes('inciweb') || q.includes('watch duty') || q.includes('satellite')) {
    return '🛰️ You can track active wildfires, satellite hotspots, and air quality on our dedicated [Wildfire Maps & Public Resources](/resources) page! It features live links to [Watch Duty](https://app.watchduty.org), the [WA DNR Fire Dashboard](https://www.dnr.wa.gov/Wildfires), [InciWeb](https://inciweb.wildfire.gov), and EPA [AirNow Smoke Plumes](https://fire.airnow.gov).';
  }

  if (q.includes('volunteer') || q.includes('join') || q.includes('emt') || q.includes('firefighter') || q.includes('resident')) {
    return '🚒 We are 100% volunteer powered and actively welcoming new members! We provide 100% free NFPA turnout gear, certified state training, and resident firefighter housing at Station 241. Check out our open roles and apply on our [Volunteer With DCFD4](/volunteer) page, or call (509) 784-2941!';
  }

  if (q.includes('meeting') || q.includes('commissioner') || q.includes('board')) {
    return '🏛️ The DCFD4 Board of Fire Commissioners meets regularly on the **3rd Wednesday of every month at 5:30 PM** at Station 241 (13984 US Highway 2, Orondo). All meetings are open to the public! View meeting dates and training evolutions on our [District Calendar & Key](/calendar).';
  }

  if (q.includes('station') || q.includes('where') || q.includes('address') || q.includes('headquarters')) {
    return '📍 DCFD4 protects over 100 square miles from four strategic stations:\n- **Station 241 (HQ):** 13984 US Highway 2, Orondo\n- **Station 242:** 22170 US Highway 97\n- **Station 243:** 20 Greens Canyon Rd\n- **Station 244:** 23420 US Highway 97 near Beebe Bridge\n\nView apparatus specs and map links on our [Stations & Fleet](/stations) page!';
  }

  if (q.includes('donate') || q.includes('association') || q.includes('501') || q.includes('tax') || q.includes('paypal')) {
    return `❤️ Support our volunteers! You can make a direct, tax-deductible contribution to the **Orondo Firefighters Volunteer Association (501(c)(3))** online: [Donate Online via PayPal](${PAYPAL_DONATION_URL}). Checks can also be mailed to PO Box 258, Orondo, WA 98843. 100% of contributions stay local to fund PPE and life-saving rescue gear. Learn more on our [Donate & Contact Us](/contact) page.`;
  }

  if (q.includes('phone') || q.includes('contact') || q.includes('email') || q.includes('mail')) {
    return '📞 **Contact Directory:**\n- Emergency: **911**\n- Station 241 Office: **(509) 784-2941**\n- RiverCom 24/7 Dispatch: **(509) 663-9911**\n- Mailing: PO Box 258, Orondo, WA 98843\n- Reach command staff via our [Donate & Contact Us](/contact) form.';
  }

  if (q.includes('game') || q.includes('attack') || q.includes('simulator')) {
    return '🎮 Test your wildland tactics in our interactive browser game! Build dozer firebreaks, call water tenders, and deploy auto-sprinklers to stop fire spread on our [Wildland Fire Attack Game](/fire-game).';
  }

  if (q.includes('photo') || q.includes('gallery') || q.includes('picture')) {
    return '📸 Explore our authentic 40-year documentary archive featuring frontline apparatus, structure drills, and Columbia River responses on our [Authentic Photo Gallery](/gallery).';
  }

  return 'Thank you for reaching out to Orondo Fire Department (DCFD4). For active emergencies dial **911**. To check burning rules visit [Burn Rules & Notice Form](/burn-permits), learn how to [Volunteer With DCFD4](/volunteer), view [Wildfire Maps & Public Resources](/resources), or call our office at **(509) 784-2941**.';
}

export async function askOrondoAssistant(userPrompt: string): Promise<string> {
  const lower = userPrompt.toLowerCase();
  if (lower.includes('fire right now') || lower.includes('chest pain') || lower.includes('unconscious') || lower.includes('call 911')) {
    return '🚨 IF THIS IS AN EMERGENCY, STOP AND CALL 911 IMMEDIATELY! Do not wait for a text response.';
  }

  const endpoints = [EDGE_GATEWAY_URL, DIRECT_NVIDIA_URL];
  const payload = {
    model: 'meta/llama-3.2-11b-vision-instruct',
    messages: [
      { role: 'system', content: DCFD4_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 500,
  };

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout for fast UI

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEFAULT_KEY}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && content.trim().length > 0) {
          return content.trim();
        }
      }
    } catch (_) {
      // Fallback to next endpoint or local knowledge base
    }
  }

  return getLocalFallbackAnswer(userPrompt);
}
