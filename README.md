# 🚒 Douglas County Fire District No. 4 — Orondo Fire Department (DCFD4)

> 🌐 **Live Public Deployment URL:** **[https://orondo-fire-dept.isaac-king5050.workers.dev](https://orondo-fire-dept.isaac-king5050.workers.dev)**  
> 📦 **GitHub Repository:** **[https://github.com/icemanld50/orondo-fire-dept](https://github.com/icemanld50/orondo-fire-dept)**

Official modern web portal for **Douglas County Fire District No. 4 (Orondo Fire Department)**, serving Orondo, WA, Brays Landing, Lone Pine, Turtle Rock, and Beebe Bridge along the Columbia River. Built with an authoritative emergency services **Dark Theme** (`#0b0f19`), high-contrast typography, and clean, distraction-free civic design principles.

---

## ⚡ Quick Start & Terminal Commands

### 1. Install Dependencies
```bash
cd "E:\App Projects\orondo fire dept"
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Starts the high-speed Vite development server at `http://localhost:5173`.

### 3. Run Automated Unit Tests (26 Verifiable Tests)
```bash
npx vitest run
```
Executes all 26 unit tests verifying calendar recurrence logic, past month slicing and filtering, burn ban boundaries, seasonal automated transitions (Oct 1 lifting & June 1 ban initiation), countdown math, station fleet data, authentic gallery integrity, verified live regulatory URLs, USGS & NWS weather URLs, PayPal 501(c)(3) donation checkout integration, form submission edge routing, and Wildland Strategy Tower Defense game physics.

### 4. Build for Production
```bash
npm run build
```
Generates an ultra-optimized static bundle in `./dist` ready for edge deployment.

### 5. Deploy to Cloudflare Workers Edge
```bash
npx wrangler deploy
```
Deploys the static assets and edge form router directly to Cloudflare Workers at `https://orondo-fire-dept.isaac-king5050.workers.dev`.

---

## 🌟 Key Features

1. **Full HTML5 Browser History Routing & Dynamic SEO Titles (`App.tsx`, `worker.ts`):**
   - Clean, authentic URLs for all pages (`/burn-permits`, `/volunteer`, `/calendar`, `/resources`, `/stations`, `/gallery`, `/fire-game`, `/about`, `/contact`) with browser Back/Forward navigation (`popstate`), direct bookmarking, and link sharing.
   - Dynamic `document.title` updating per route (e.g. `Outdoor Burn Rules & Permits | DCFD4 Orondo`), enabling complete Google search engine indexing.
   - Cloudflare Worker edge fallback serves `index.html` via `env.ASSETS` for direct deep URL requests with HTTP 200.

2. **Action-Oriented District Services Roadmap (HomeOverview.tsx):**
   - The homepage is organized as a clear, focused 6-step resident action roadmap:
     - 01. **Submit Burn Request:** Check seasonal restrictions and submit online burn notice.
     - 02. **Volunteer:** 100% volunteer firefighter & EMT onboarding with free gear and housing.
     - 03. **Donate:** 501(c)(3) tax-exempt donations to the Orondo Firefighters Volunteer Association with instant online PayPal checkout and check mailing details.
     - 04. **Calendar:** Public meeting dates (3rd Wednesday of every month at 5:30 PM at Station 241) and Tuesday drills.
     - 05. **Resources:** Live wildfire tracking (Watch Duty, WA DNR) and EPA AirNow smoke radar.
     - 06. **Contact:** Station 241 office, RiverCom dispatch, and online message dispatch.
   - Removed decorative pill clutter and nested micro-badges; each card features clear bold titles, contained data, and full 44px+ tap target buttons.

3. **Full-Bleed 16:9 Station Cards & Strategic Fleet Directory (StationsPage.tsx):**
   - Re-engineered station cards so photos bleed edge-to-edge across the top of each card (`aspect-[16/9] w-full object-cover`), eliminating black letterboxing and nested container frames.
   - Featured Showcase: Displays 4K Station 241 Headquarters and apparatus photograph (`/assets/station41.jpg`).
   - Station 241 Card: Razor-sharp 4K Station 241 Headquarters and frontline emergency fleet.
   - Station 242 Card: Restored and upscaled borderless 16:9 photograph of the 4-bay central corridor station on US-97.
   - Station 243 Card: High-resolution Google Maps satellite aerial imagery of 20 Greens Canyon Rd with Columbia River & station marker.
   - Station 244 Card: Restored and upscaled borderless 16:9 photograph of the 3-bay facility on US-97 near Beebe Bridge.
   - Comprehensive fleet specifications and Google Maps navigation links for all 4 DCFD4 stations.

4. **Prominently Featured Station 241 Header & Official Department Crest (Hero.tsx):**
   - The authentic high-resolution photograph of Station 241 Headquarters (`/assets/station41.jpg`) is prominently displayed across the hero header with elevated clarity (65% opacity, balanced directional gradients).
   - Showcases the red firehouse bays and frontline apparatus fleet (Command vehicle, Type 1 Structural Engine, Type 6 4x4 Brush Truck, and Heavy Water Tender) clearly behind the layout.
   - Official static Douglas County Fire District 4 crest emblem rendered with a subtle glass-morphism container backdrop.
   - **Zero Duplication Hierarchy:** All core facts are organized cleanly so each appears exactly once:
     - Headquarters location in top dispatch row (`Station 241 Headquarters • Orondo, WA`).
     - District title cleanly under motto (`Douglas County Fire District No. 4`).
     - Operational scope in narrative (`24/7 all-hazard fire suppression, wildland protection, and emergency medical services across the East Columbia River corridor and orchards`).
     - Dedicated `100% Volunteer Fire & EMS` badge, physical metrics (`4 Stations • 100+ Sq Miles • Est. 1946`), and service areas (`Protecting Orondo • Brays • Lone Pine • Beebe Bridge`) unified under the emblem.

5. **Wildfire Maps, Air Quality, Emergency Alerts & Legal Regulations (`/resources`, `/burn-permits`):**
   - 100% verified live via BrowserOS Neo browser automation, eliminating legacy 404 dead links and misdirected public records pages:
     - **Watch Duty App & Web:** Real-time volunteer radio monitoring, evacuation boundaries, and aerial flight paths (`https://app.watchduty.org`).
     - **WA DNR Wildfire Incident Dashboard:** Official Washington State Dept of Natural Resources active fires and danger levels (`https://www.dnr.wa.gov/Wildfires`).
     - **InciWeb:** Federal interagency command for complex wildfires (`https://inciweb.wildfire.gov`).
     - **NASA FIRMS:** Near real-time 3-hour satellite thermal hotspot anomaly scans (`https://firms.modaps.eosdis.nasa.gov/map`).
     - **AirNow Fire & Smoke Map:** EPA and USFS PM2.5 air quality and smoke plume tracking (`https://fire.airnow.gov`).
     - **Washington Smoke Blog:** Central Washington daily smoke meteorological forecasts (`https://wasmoke.blogspot.com`).
     - **Douglas County Emergency Management:** Official county emergency management operations (`https://www.douglascountywa.gov/231/Emergency-Management`).
     - **Douglas County Everbridge Alert Signup:** Direct citizen mobile evacuation alert registration (`https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System`).
     - **Douglas County Emergency Incidents Map:** Live public safety GIS map tracking road washouts, closures, and active hazard perimeters (`https://www.douglascountywa.gov/697/Emergency-Incidents-Map`).
     - **Douglas County Code Chapter 8.12 Open Burning:** Codified municipal outdoor burning ordinance governing unincorporated areas from June 1st to October 1st, IFC 307.4.2 adherence, adult care, and misdemeanor penalties (`https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html`).
     - **WA Dept of Ecology Outdoor & Residential Burning:** State residential clean air standards (`https://ecology.wa.gov/air-climate/air-quality/smoke-fire/outdoor-residential-burning`).
     - **WA Dept of Ecology Burn Permits Portal:** Central portal for commercial agricultural burning and orchard tear-out permits (`https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits`).
     - **WAC 173-425 Outdoor Burning:** Washington Administrative Code Clean Air Act regulations and Urban Growth Area prohibitions (`https://app.leg.wa.gov/wac/default.aspx?cite=173-425`).
     - **WA DNR Burn Restrictions & Burn Portal:** State forest fire protection regulations under WAC 332-24 and online DNR Burn Portal (`https://dnr.wa.gov/wildfire-resources/outdoor-burning/burn-restrictions`).
     - **Douglas County Burn Bans & Restrictions Notice:** Official county administrative announcements (`https://www.douglascountywa.gov/821/Burn-Bans-and-Restrictions`).
   - Interactive category filtering pills: `All Resources (18)`, `Wildfire Maps & Apps`, `Smoke & Weather`, `Local Douglas County`, and `Codes & Regulations`.

6. **Clean, Uncluttered Emergency Navigation:**
   - Navigation links streamlined to essential resident actions (`Home`, `Burn Rules`, `Volunteer`, `Calendar`, `Resources`, and `Donate & Contact`).
   - Secondary facilities placed in the dropdown (`Stations & Fleet`, `Photo Gallery`, `About DCFD4`).
   - Disruption-free emergency interface with "Ask Assistant" button removed from the global navigation bar to keep resident attention focused on public safety notices and district services.

7. **Streamlined Action-First Community Hub ("Cut the Fat"):**
   - Removed generic marketing filler and duplicate paragraphs.
   - 4 Core Action Hub Cards in a responsive 2x2 grid:
     - 🔥 **Burn Ban Details & Rules (`/burn-permits`):** Live seasonal status badge, 4x4x4 foot pile dimension visual, instant action button to check rules and submit online notice.
     - 🤝 **Volunteer With DCFD4 (`/volunteer`):** 100% volunteer-powered highlight, free NFPA turnout gear & state certifications, Station 241 resident firefighter housing, instant application button.
     - 📅 **Calendar & Key Dates (`/calendar`):** Monthly commissioner meeting note (3rd Wednesday @ 5:30 PM at Station 241), bi-weekly Tuesday training drills, burn ban seasonal dates, instant calendar sync button.
     - ❤️ **Donate & Contact (`/contact`):** Orondo Firefighters Volunteer Association 501(c)(3) tax-deductible gear funding, direct office & dispatch phone lines, station address, direct donate & contact button.

8. **Bloons TD 5 / BTD 6 Style Wildland Firefighting Tower Defense Game (`/fire-game`):**
   - 2,090px serpentine cobblestone track winding through Orondo orchards, across the Columbia River over a wooden bridge, to Station 241 Headquarters.
   - 8 Fire Balloon Tiers with classic popping & splitting mechanics: Red Grass Spark (T1), Blue Campfire Blaze (T2), Green Brush Fire (T3), Yellow Crown Fire (T4), Pink Timber Flame (T5), Charcoal Armored Smolder (T6), Canyon Firestorm (T7), and Badger Mountain Boss Inferno (T8).
   - Phased Placement Stage vs. Wave Active Stage gameplay with $650 starting cash and cash earned per popped layer plus round completion bonuses.
   - Bloons TD 5 right-hand sidebar featuring Apparatus Store (Hose Volunteer, Deck Gun Monitor, Perimeter Sprinkler, Type 6 Brush Engine, Columbia Fireboat, Dozer Line Scrape) and Tower Upgrade Depot with dual 3-tier upgrade paths, targeting priority selectors (First, Last, Strongest, Closest), and 70% sell refunds.
   - Tactical abilities: Air Tanker Phos-Chek aerial strike (16-second chemical barrier) and RiverCom Pump 2X Overdrive.
   - High-performance decoupled 60 FPS state batching with background tab visibility fallback timer.

9. **Interactive Movable Pure-Image Flex Gallery (`/gallery`):**
   - Zero words or writing on cards for an uninterrupted photography showcase.
   - HTML5 drag-and-drop reordering, 3D mouse perspective tilt, dual interactive layouts (Flex Grid and Movable Ribbon Stream), and zero-word theater lightbox.

10. **Edge-Routed Form System (`POST /api/submit-form`):**
    - Cloudflare Worker edge handler (`src/worker.ts`) validates inputs, traps spambots via silent honeypots, generates official tracking reference codes (`DCFD4-BURN-2026-XXXXXX`), and dispatches email/webhook alerts.

11. **Automated Seasonal Burn Ban Transition Engine (`burnBanService.ts`):**
    - Pure mathematical evaluation of Douglas County Code Chapter 8.12 date windows (Summer ban June 1 – Sept 30; Open burning Oct 1 – May 31).
    - 30-second interval ticker and tab visibility listener automatically transition the site from red warning to emerald open burning at 00:00:00 on October 1st in real time without requiring browser reloads or manual deployments.
    - Updates Alert Banner, Hero CTA button, Roadmap Card 1, Open Burning regulations page, and Footer links synchronously.

12. **Calendar Past Months Dynamic Slicing & Toggle (`CalendarPage.tsx`):**
    - For the current calendar year (2026), months prior to the active month (January through August) are hidden by default, displaying the current month (September) through December for immediate relevance.
    - An amber `CURRENT` badge highlights the active month card.
    - An interactive `Show Past Months (Jan – Aug)` / `Hide Past Months` toggle button with an eye icon allows users to view full-year records on demand.
    - Chronological Agenda feed similarly defaults to upcoming events with the identical full-year toggle.

13. **Authentic Community Apparatus Parade Banner (`HomeOverview.tsx`):**
    - Placed at the bottom of the "How Can We Help You Today?" section, directly following the 6 action-oriented service cards.
    - Features the authentic community action photograph (`/assets/gallery/structure_attack_2014.jpg`) with volunteer firefighters, frontline apparatus, and American flag leading the community parade.
    - Beautifully framed in a responsive, rounded dark-slate container with zero text badges or pill distractions.
