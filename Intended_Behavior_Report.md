# Douglas County Fire District No. 4 (Orondo Fire Department)
## Intended Behavior & Requirements Specification Report

### 1. Project Purpose & Scope
This project delivers a state-of-the-art, mobile-first web portal for **Douglas County Fire District No. 4 (DCFD4 / Orondo Fire Department)**, completely replacing the legacy GoDaddy builder website (`dcfd4.com`). The portal provides vital public safety communications, real-time burn ban status tracking, open burning regulations and permit notifications, volunteer firefighter recruitment, an interactive community calendar with past-month hiding, an authentic 40-year photo archive gallery, an interagency wildfire tracking and smoke resource directory, an edge-routed form processing system on Cloudflare Workers, a prominently featured header photograph of Station 241 and the frontline emergency apparatus, an authoritative distraction-free Dark Theme (`#0b0f19`), and a standalone wildland fire tower defense simulator.

---

### 2. Standard Use Case Behaviors

#### 2.1 Action-Oriented Home Page Roadmap ("How Can We Help You Today?")
* **Direct 6-Action Service Flow:**
  - Organized around a clear 6-step action roadmap directly aligned with primary resident tasks:
    1. **Submit Burn Request (`burn-permits`):** Check live seasonal burn status and submit online outdoor burning notifications for natural yard debris (4ft x 4ft x 4ft max pile).
    2. **Volunteer With DCFD4 (`volunteer`):** 100% volunteer firefighter & EMT recruitment with free NFPA turnout gear, academy training, and resident station housing.
    3. **Donate to Association (`contact` & Online PayPal):** Orondo Firefighters Volunteer Association (501(c)(3) tax-exempt non-profit) direct equipment donations with dual action buttons: instant online PayPal donation (`https://www.paypal.com/donate?token=...`) and tax/mail information navigation.
    4. **District Calendar (`calendar`):** Monthly Fire Commissioner meetings (3rd Wednesday @ 5:30 PM at Station 241) and bi-weekly Tuesday training evolutions.
    5. **Wildfire Maps & Radar (`resources`):** Watch Duty radio incident tracking, WA DNR active fire dashboard, and EPA AirNow smoke plumes.
    6. **Contact Headquarters (`contact`):** Station 241 address, administrative office phone `(509) 784-2941`, and 24/7 RiverCom Dispatch `(509) 663-9911`.
* **Zero Pill & Badge Clutter; Subtle Secondary Icons; Drastically Reduced Copy:**
  - Fluff copy removed across all sections, keeping descriptions concise (1–2 sentences max).
  - Icons on action cards are small and secondary accents, keeping primary visual focus squarely on clear, concise action titles.
  - Excessive decorative pills, badges, and redundant labels have been removed across all sections.
  - Every card features a bold, high-contrast title and full-width 44px+ tap target action buttons.
* **Online 501(c)(3) PayPal Donation Integration:**
  - Verified official PayPal donation checkout URL for "Douglas County Fire District 4":
    `https://www.paypal.com/donate?token=LQfu7bDATzaKBFVpCduqQ-R2Tr5fS-0Zug10MliAC4oz1oYzNxi2eNgAZ2tco_OvyZ0c_1cVhfmrZ2qS`
  - Centralized single source of truth in `src/data/donationConfig.ts` (`PAYPAL_DONATION_URL`).
  - Integrated across 4 key touchpoints:
    1. **Home Overview Roadmap (Card #3):** High-contrast "Donate Online via PayPal" button and secondary "Mail Check / Tax Info" button.
    2. **Contact & Donate Page (`/contact`):** Dedicated 501(c)(3) Volunteer Association card featuring gradient PayPal button, multi-card/recurring support notice, and physical check mailing instructions (PO Box 258, Orondo, WA 98843).
    3. **Global Footer:** Direct "Donate via PayPal (501c3)" link with Heart icon under Quick Resources.
    4. **AI Assistant Knowledge Base:** Returns the direct PayPal link whenever residents ask about donations, contributing, or supporting volunteers.
* **Secondary Facility Exploration:**
  - Kept distinct facilities (Fire Stations 241–244, Photo Gallery) cleanly organized in a quiet secondary directory strip below the roadmap. Mini-game is hidden from all menus.

#### 2.2 Streamlined Desktop Navigation Bar & Authoritative Dark Theme
* **Action-Aligned Links:**
  - Desktop navbar links directly match the roadmap: `Home`, `Burn Rules`, `Volunteer`, `Calendar`, `Resources`, and `Donate & Contact`.
  - Secondary pages are housed neatly inside the "Explore ▾" dropdown menu (`Stations & Fleet`, `Photo Gallery`, `About DCFD4`). Mini-game (`/fire-game`) is hidden from menus.
* **Authoritative Dark Emergency Aesthetic:**
  - Clean `#0b0f19` deep-slate dark palette with glass panels, high-contrast typography, and amber/red emergency accents. Multi-theme switcher removed to preserve visual gravity and avoid clutter.

#### 2.3 Full-Bleed 16:9 Station Cards & Verified Facility Directory (`/stations`)
* **Full-Bleed Edge-to-Edge Card Architecture (Zero Black Bars):**
  - Eliminated letterboxing and nested container frames across all station cards.
  - Every card features a full-width 16:9 header image with smooth hover scaling, a floating glass Station ID pill, and contained information below:
    1. **Station 241 Headquarters (13984 US Highway 2):** Showcases the razor-sharp 4K photograph of the headquarters building, 4 apparatus bays, and frontline fleet (Command, Engine, Brush, Tender) across both the top hero showcase and the Station 241 card.
    2. **Station 242 (22170 US Highway 97):** Restored and upscaled 16:9 photograph of the 4-bay central corridor station with "DCFD 4" lettering under bright Washington skies with zero black margins.
    3. **Station 243 (20 Greens Canyon Rd):** Integrated high-resolution Google Maps satellite aerial imagery capturing the Columbia River, Highway 97, Greens Canyon Rd, and the station parcel marker.
    4. **Station 244 (23420 US Highway 97):** Restored and upscaled 16:9 photograph of the 3-bay facility against the coulee hillside near Beebe Bridge.
  - Complete facility highlights, apparatus assignments, and direct 44px+ Google Maps navigation buttons on every station card.

#### 2.4 Hero Header, Authoritative Emblem & Prominent Station 241 Photography
* **Prominent Station 241 Headquarters & Apparatus Photography:**
  - Station 241 photograph (`/assets/station41.jpg`) is showcased with elevated clarity (opacity-65, contrast-105, brightness-95).
  - Employs a calibrated directional gradient overlay (`from-slate-950/90 via-slate-950/50 to-slate-950/20`) ensuring high-contrast legibility for text on the left, while displaying the station building and all 4 emergency apparatus (Command SUV, Type 1 Engine, Type 6 Brush Truck, Tender) clearly on the right.
  - Generous vertical padding (`pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28`) gives the photograph breathing room.
* **Strict Single-Source Content Architecture (Zero Duplication):**
  - Eliminated all repetitive phrasing and overlapping labels across the hero section.
  - Station location and office contact stated calmly: `Office: (509) 784-2941 • Emergencies: Dial 911`. No disruptive flashing 911 call buttons.
  - District title and mission narrative focused on essential public safety facts without fluff.
* **Authoritative Crest Emblem:**
  - Replaced the water-spray canvas animation, flame loop, and Web Audio synthesizer with an official, high-resolution static DCFD4 department crest emblem set within a subtle glass-morphism container backdrop.

#### 2.5 Wildfire Maps, Air Quality, Emergency Alerts & Codified Regulations (`/resources`)
* **Dedicated Resource & Regulatory Directory:**
  - 100% verified live via BrowserOS Neo browser automation, eliminating legacy 404 dead links and misdirected public records pages:
    1. *Watch Duty Wildfire App & Web Map (`https://app.watchduty.org`):* Real-time radio-monitored fire tracking, perimeter shapefiles, and flight tracking with direct App Store & Google Play links.
    2. *WA DNR Wildfire Incident Dashboard (`https://www.dnr.wa.gov/Wildfires`):* Official Washington State Department of Natural Resources incident map, active fires, and county fire danger ratings.
    3. *InciWeb All-Risk Incident System (`https://inciweb.wildfire.gov`):* Federal interagency command tracking for complex fires.
    4. *NASA FIRMS Satellite Hotspot Detection (`https://firms.modaps.eosdis.nasa.gov/map`):* 3-hour orbital thermal anomaly detections.
    5. *AirNow Fire & Smoke Map (`https://fire.airnow.gov`):* Real-time EPA PM2.5 air quality and smoke plume tracking.
    6. *Washington Smoke Information Blog (`https://wasmoke.blogspot.com`):* Central WA meteorological smoke transport forecasts.
    7. *RiverCom 911 Communications (`https://rivercom911.org`):* Chelan-Douglas 911 regional dispatch.
    8. *Douglas County Emergency Management (`https://www.douglascountywa.gov/231/Emergency-Management`):* Official county emergency management operations (verified replacing obsolete `/165/Emergency-Management` public records page).
    9. *Douglas County Everbridge Alert Signup (`https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System`):* Direct registration portal for citizen Level 1, 2, and 3 evacuation notifications.
    10. *Douglas County Emergency Incidents Map (`https://www.douglascountywa.gov/697/Emergency-Incidents-Map`):* Live public safety GIS map tracking road washouts, closures, and active hazard perimeters.
    11. *Douglas County Code Chapter 8.12 Open Burning (`https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html`):* Codified municipal burning ordinance governing unincorporated areas from June 1st to October 1st, IFC 307.4.2 adherence, adult care, and misdemeanor penalties.
    12. *WA Dept of Ecology Outdoor & Residential Burning (`https://ecology.wa.gov/air-climate/air-quality/smoke-fire/outdoor-residential-burning`):* State residential clean air standards (verified replacing broken 404 URL).
    13. *WA Dept of Ecology Burn Permits Portal (`https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits`):* Central portal for commercial agricultural burning and orchard tear-out permits.
    14. *WAC 173-425 Outdoor Burning (`https://app.leg.wa.gov/wac/default.aspx?cite=173-425`):* Washington Administrative Code Clean Air Act regulations and Urban Growth Area prohibitions.
    15. *WA DNR Burn Restrictions & Burn Portal (`https://dnr.wa.gov/wildfire-resources/outdoor-burning/burn-restrictions`):* State forest fire protection regulations under WAC 332-24 and online DNR Burn Portal.
    16. *Douglas County Burn Bans & Restrictions Notice (`https://www.douglascountywa.gov/821/Burn-Bans-and-Restrictions`):* Official county administrative announcements.
    17. *NWS Spokane Fire Weather Briefing (`https://www.weather.gov/wrh/fire?wfo=otx&layer=fwx`):* Official NOAA National Weather Service Western Region fire weather briefing for Eastern Washington and Zone WAZ704 / Douglas County (verified replacing obsolete `/otx/fire` 404).
    18. *USGS Washington Water Conditions & River Flow (`https://waterdata.usgs.gov/state/Washington/`):* Official USGS real-time hydrologic monitoring for Washington and the Columbia River reach (verified replacing decommissioned legacy NWISWeb `/wa/nwis/current/?type=flow` 404).
  - Interactive category filtering pills: `All Resources (18)`, `Wildfire Maps & Apps`, `Smoke & Weather`, `Local Douglas County`, and `Codes & Regulations`.

#### 2.6 Form Routing Architecture & Legacy Site Inspection Findings
* **Inspection of Original `dcfd4.com/open-burning` GoDaddy Form:**
  - Audited using BrowserOS Neo React DOM and fiber inspection:
    - Target backend endpoint: `https://contact.apps-api.instantpage.secureserver.net/v3/messages`
    - GoDaddy Account ID: `b043253e-f7f7-499d-8cda-9482877d5e98`
    - Website ID: `c3ca08d7-f8f3-4ebe-ad65-7a2d414c7f4d`
    - Widget ID: `ed286f30-58f7-4cde-9517-4ae52f713bb8`
    - Form Identifier: `CONTACT_US`
    - DNS MX Verification: `dcfd4.com` points to Google Workspace (`aspmx.l.google.com`), routing submissions to `info@dcfd4.com`.
  - In our modern edge router (`src/worker.ts`), all forms route seamlessly by default to `info@dcfd4.com`, with zero dependency on GoDaddy's proprietary backend, and allow setting custom destinations via the `DESTINATION_EMAIL` environment secret.

#### 2.6 Streamlined Emergency Interface & AI Assistant Architecture
* **Streamlined Navbar (Zero Distraction):**
  - The "Ask Assistant" button was completely removed from the global navigation bar and hero action rows to maintain a distraction-free, authoritative municipal emergency presence.
  - Direct public safety pathways (Burn Rules, Volunteer, Calendar, Resources, Contact & Donate) take precedence.
* **Underlying Edge AI Gateway Architecture (`src/services/aiGateway.ts`):**
  - Standalone service modules remain preserved in codebase architecture for headless queries or future integration.
  - System prompt provides complete context of the website structure and official external agencies with verified live URLs.

#### 2.7 Bloons TD 5 Style Wildland Firefighting Tower Defense Game (`/fire-game`)
* **Bloons TD 5/6 Mechanics Re-Themed for Wildland Fire Suppression:**
  - **Serpentine Cobblestone Track:** Fires travel along a continuous 2,090px winding track starting from the coulee hills, traversing lush Orondo apple orchards, crossing the Columbia River over a wooden plank bridge, and terminating at Station 241 Headquarters.
  - **Fire Balloon Tiers (Popping & Splitting Physics):**
    - *Tier 1: Red Grass Spark* (1 HP, Speed 1.35) - Pops into steam.
    - *Tier 2: Blue Campfire Blaze* (2 HP, Speed 1.7) - Pops and splits into 1 Red Spark.
    - *Tier 3: Green Brush Fire* (3 HP, Speed 2.1) - Pops and splits into 1 Blue Campfire.
    - *Tier 4: Yellow Crown Fire* (4 HP, Speed 2.8) - High-velocity flare, pops into 1 Green Brush Fire.
    - *Tier 5: Pink Timber Flame* (5 HP, Speed 3.4) - Rapid timber runner, pops into 1 Yellow Crown Fire.
    - *Tier 6: Charcoal Armored Smolder* (8 HP, Speed 1.1) - Heavy protective ember crust immune to light water; requires foam/cannon splash to pierce; splits into 2 Pink Timber Flames.
    - *Tier 7: Canyon Firestorm* (12 HP, Speed 2.0) - High-heat vortex; splits into 2 Armored Smolders.
    - *Tier 8: Badger Mountain Boss Inferno* (80 HP, Speed 0.9) - Massive wildfire boss with boss health bar; splits into 4 Canyon Firestorms upon containment.
  - **Phased Gameplay (Placement Stage vs. Wave Active):**
    - *Placement Stage:* Players review cash reserves ($650 start), strategize unit placement, buy apparatus, and configure dual upgrade tiers before triggering the wave.
    - *Wave Active Stage:* Fires spawn from the queue; water cannons engage targets; cash is earned per layer popped ($1) plus round completion bonuses ($100+); speed can be toggled between 1X and 2X.
  - **Bloons TD 5 Right-Hand Sidebar & Tower Upgrade Depot:**
    - Apparatus Store featuring 6 distinct units:
      1. *Hose Volunteer ($175, Land):* Volunteer with fog nozzle. Upgrade Path 1: Fog Nozzle / Twin Handlines / Tri-Nozzle Deluge. Upgrade Path 2: Hose Reel Reach / Class A Foam / High-Pressure CAF Nozzle.
      2. *Deck Gun Monitor ($350, Land):* Master stream turret with area-of-effect splash damage. Upgrade Path 1: Stang Monitor / Industrial Deluge / Hydro-Cannon. Upgrade Path 2: Reach / Piercing Hydro-Jet / Dual Heavy Water Cannons.
      3. *Perimeter Sprinkler ($240, Land):* 360-degree radial mist manifold. Upgrade Path 1: 12-Nozzle / 16-Nozzle / Orchard Deluge Grid. Upgrade Path 2: Radius Expansion / Wetting Agent / Sustained Mist Blanket.
      4. *Type 6 Brush Engine ($480, Land):* Mobile 4x4 attack rig shooting high-speed foam. Upgrade Path 1: Rapid Pump / Dual Crosslay Lines / Wildland Attack Beast. Upgrade Path 2: Long-Distance Foam / Heavy Gel / Thermal Quench Foam.
      5. *Columbia River Fireboat ($420, River-Only):* High-volume marine draft vessel that can only be deployed in the river channel. Upgrade Path 1: Twin Marine Monitors / Triple Jet Array / Columbia Deluge Flagship. Upgrade Path 2: High-Volume Draft / Foam Proportioner / Regional River Monitor.
      6. *Dozer Line Scrape ($160, Land Trap):* Mineral soil trench acting as a passive contact trap (absorbs 12 hits before being consumed).
    - *Targeting AI Selector:* First, Last, Strongest, and Closest target modes.
    - *Sell Unit:* Recoups 70% of total invested capital for strategic apparatus repositioning.
  - **Tactical Abilities & Mobile-First Controls:**
    - *Air Tanker Phos-Chek Strike:* Drops crimson chemical retardant barrier for 16 seconds; earned every 5 rounds.
    - *RiverCom Pump 2X Overdrive:* Doubles water delivery pump speed for 10 seconds ($150).
    - *Background Visibility Fallback & Frame Batching:* Automatically switches to a fallback ticker if the browser tab is minimized or hidden, and batches state updates to React once per frame for guaranteed 60 FPS performance without render thrashing.
  - **Volunteer Service Cards (`/volunteer`):**
    - Redundant "Role Overview" pills removed from all 4 service track cards, maintaining clean, unencumbered headings and minimum 44px tap targets.

#### 2.8 Pure Visual Interactive Movable Flex Photo Gallery (`/gallery`)
* **Strictly Zero Words On Images or Cards:**
  - Pure uninterrupted photography with zero text, badges, titles, year tags, or locations on photo cards.
  - HTML5 drag-and-drop reordering, 3D mouse perspective tilt, dual layouts (Flex Grid and Movable Ribbon Stream), and zero-word theater lightbox.

#### 2.9 Automated Seasonal Burn Ban Transition Architecture (October 1st Lifting Mechanics)
* **Deterministic Seasonal Calendar Windows:**
  - **Summer Burn Ban Active:** June 1 at 00:00:00 through September 30 at 23:59:59 (Douglas County Code Chapter 8.12).
  - **Open Burning Permitted:** October 1 at 00:00:00 through May 31 at 23:59:59 (Natural vegetation only, max 4x4x4 ft pile size).
* **30-Second Real-Time Heartbeat & Tab Focus Rollover:**
  - `App.tsx` and `LiveAlertBanner.tsx` maintain an active 30-second interval ticker and listen to browser `visibilitychange` events via [`src/services/burnBanService.ts`](file:///E:/App%20Projects/orondo%20fire%20dept/src/services/burnBanService.ts).
  - At exactly 00:00:00 on October 1st, `isBurnBanActive` flips automatically from `true` to `false` without requiring any user browser reload, server restart, or code deployment.
* **Component-Level Visual & Functional Transformations on October 1st:**
  1. *Live Alert Banner (`LiveAlertBanner.tsx`):* Switches from deep alert red (`from-red-950 via-red-900 border-red-800 text-red-100`) to vibrant emerald green (`from-emerald-950 via-slate-900 border-emerald-800 text-emerald-100`). Icon changes from pulsing `ShieldAlert` to `CheckCircle2`. Badge flips to `Season Status: Open Burning Permitted`. Countdown switches from `X Days Until Lifted (Oct 1)` to `243 Days Until Next Ban (June 1)`. Button flips from `Restrictions >` to `Notice Form >`.
  2. *Hero Header Button (`Hero.tsx`):* CTA button text dynamically changes from `Burn Ban Details` (red border) to `Submit Burn Request` (emerald border).
  3. *Home Page Action Roadmap - Card 1 (`HomeOverview.tsx`):* Border switches from red to emerald (`border-emerald-800/80 hover:border-emerald-500`). Icon turns emerald. Status dot changes from `● Burn Ban in Effect` to `● Open Burning Permitted (Oct 1 – May 31)`. Main action button turns into an emerald button: `Submit Burn Notice Online`.
  4. *Regulations Page (`OpenBurningPage.tsx`):* Top status banner turns emerald with headline `Open Burning Season Is Active in Douglas County`, guiding residents on lawful 4x4x4 ft pile burning, adult supervision, and water on site.
  5. *Footer Quick Resources (`Footer.tsx`):* Link flips from `Burn Ban Rules` to `Open Burn Form`.
  6. *Calendar (`CalendarPage.tsx`):* Highlights October 1st with the official `Open Burning Season Begins` milestone badge.
  7. *AI Community Assistant (`aiGateway.ts`):* System prompt and local fallback engine provide open burning rules and notice form links.

#### 2.10 Calendar Past Months Filtering & Current Slice Default
* **Default Active Slicing (Current Month to End of Year):**
  - In `CalendarPage.tsx`, for the current year (2026), past months (January through August) are hidden by default, immediately presenting the current month (September) through December.
  - An amber `CURRENT` badge is automatically displayed on the active month header (`September`).
  - A dedicated toggle button `Show Past Months (Jan – Aug)` / `Hide Past Months` with an eye icon allows users to reveal or collapse historical months on demand.
  - Chronological Agenda view similarly scopes by default to upcoming events (`September – December`) with the identical toggle option to view the full year.

#### 2.11 Home Overview Community Apparatus Banner Placement
* **Authentic Frontline Photography at Bottom of Section:**
  - Placed at the bottom of the "How Can We Help You Today?" section, directly after the 6 action-oriented service cards in `HomeOverview.tsx`.
  - Displays the authentic high-resolution community photo:
    `/assets/gallery/structure_attack_2014.jpg` (`https://orondo-fire-dept.isaac-king5050.workers.dev/assets/gallery/structure_attack_2014.jpg`).
  - Features volunteer firefighters, apparatus, and American flag leading the community parade with cheering spectators.
  - Beautifully framed with responsive rounded corners (`rounded-2xl sm:rounded-3xl`), border styling (`border-slate-800 shadow-2xl`), responsive aspect ratio (`aspect-[16/7] sm:aspect-[24/8] max-h-[360px]`), and subtle slate gradient overlay with zero distracting overlaid text pills or labels.

#### 2.12 Revamped About DCFD4 Page Hierarchy & Sleek Mission Architecture (`/about`)
* **Community-First Information Flow:**
  - **1. Community Donations & Gratitude Header:** Prominently positions gratitude to district residents and supporters at the very top: *"Thank You to Our Donors & Supporters — Made Possible by Community Generosity"*. Details how community contributions directly fund frontline turnout gear, AEDs, extrication tools, and thermal cameras. Includes direct 501(c)(3) PayPal donation button (`min-h-[44px]`) and PO Box 258 mailing instructions.
  - **2. Sleek District Mission Statement Card:** Redesigned with a deep slate gradient, subtle department crest watermark, stylized quote typography, and a 4-pillar Core Values grid (Courage, Dedication, Teamwork, Tradition).
  - **3. Authentic Wildland Crew Photo + Leadership & Commissioners:** Displays the authentic high-resolution photograph of the DCFD4 wildland crew in yellow Nomex jackets and helmets standing with Pulaskis and shovels (`/assets/gallery/leadership_station_2019.jpg`) using an uncropped responsive `aspect-[16/10] sm:aspect-[16/9]` frame with `object-[center_35%]`, immediately followed by Command Officers and the Board of Fire Commissioners cards.
  - **4. District Operational Jurisdiction & Heritage Archive:** Coverage map, 100+ sq mile territory details, Title 52 RCW fast facts, and the 40+ year heritage archive (1984 Engine 2441, 1985 Crew, 1990 Extrication).

#### 2.13 Developer Attribution & Professional Inquiries Link Architecture (`Footer.tsx`)
* **Clear Distinction Between Municipal Ownership & Engineering Attribution:**
  - Preserves official Douglas County Fire District No. 4 copyright (`© 2026 Douglas County Fire Dist. No. 4 — All Rights Reserved.`) as the primary legal entity.
  - Features an elegant developer attribution line:
    `Website Custom Designed & Built by Isaac King — 2026`
  - Includes a direct, clickable inquiries badge:
    `Email for Inquiries: isaac.king5050@gmail.com`
  - Pre-configures subject line (`mailto:isaac.king5050@gmail.com?subject=Website%20Design%20%26%20Development%20Inquiry`).
  - Strict minimum 44px tap target (`min-h-[44px]`) to guarantee effortless mobile touch interaction.
  - Exported as a strongly typed `DEVELOPER_ATTRIBUTION` object with verified unit tests.

---

### 3. Undesired Behaviors to Explicitly Avoid
1. **Never Show Instructions for the Logo Easter Egg:** Do NOT write "Click to put out", "Click to ignite", or any tooltip instructions. The water splash and steam sizzle must remain a delightful hidden secret.
2. **Never Plaster Duplicate Information Across Multiple Pages:** Avoid repeating station addresses, 911 blurbs, and commissioner meeting times on every screen; present them cleanly in their dedicated single source of truth.
3. **Never Output Raw LaTeX Math Syntax:** All calculations and dimensions must use clean plain English arithmetic (e.g., 4 x 4 x 4 feet).
4. **Never Generate AI Mock Images:** Only authentic photos scraped from `dcfd4.com` are used.
5. **Never Render Plain Text for Links in AI Responses:** All page references and regulatory sources must be rendered as interactive, clickable buttons or links.
