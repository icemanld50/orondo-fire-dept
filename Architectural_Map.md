# Douglas County Fire District No. 4 (Orondo Fire Department)
## Architectural Blueprint & Systems Engineering Map

### 1. Architectural System Overview

The Douglas County Fire District 4 (DCFD4) web platform is architected as an edge-native web application deployed globally across Cloudflare Workers at:
**https://orondo-fire-dept.isaac-king5050.workers.dev**

It combines Cloudflare Workers Static Assets with an edge form router, Web Audio procedural synthesis, client-side HTML5 canvas simulations, a tactical Wildland Fire Tower Defense game engine, strict AI domain boundaries with interactive markdown site navigation, a dedicated wildfire maps and public resources portal, and an authentic 40-year photo archive presented as an interactive movable pure-image flex gallery.

```mermaid
sequenceDiagram
    autonumber
    actor Resident as Resident / Mobile Citizen
    participant Worker as Cloudflare Worker Edge (src/worker.ts)
    participant Client as React SPA Client (Vite + Tailwind)
    participant EdgeAI as Cloudflare AI Edge Proxy
    participant Email as Transactional Email / Webhook Router

    Resident->>Worker: GET / (Initial Load)
    Worker-->>Client: Stream Pre-rendered HTML5 + Static Assets (< 250ms)
    Client->>Client: Check Burn Ban Calendar (June 1 - Sept 30)
    
    rect rgb(20, 30, 45)
    Note over Resident,Client: Form Submission Flow
    Resident->>Client: Submit Burn Notice / Volunteer Interest
    Client->>Worker: POST /api/submit-form (JSON Payload)
    Worker->>Worker: Validate Fields + Honeypot Check
    Worker->>Worker: Generate Official Ref (DCFD4-BURN-2026-XXXXXX)
    Worker->>Email: Dispatch Alert to info@dcfd4.com / Webhook
    Worker-->>Client: Return Confirmation Receipt + Status 200
    Client-->>Resident: Display Verified Receipt Card
    end

    rect rgb(30, 20, 35)
    Note over Resident,EdgeAI: AI Community Safety Assistant & Site Guide
    Resident->>Client: Ask Burning / Wildfire Map / Volunteer Question
    Client->>EdgeAI: POST /nvidia/v1/chat/completions (Full Sitemap Prompt)
    alt Within District Scope
        EdgeAI-->>Client: Official Safety Information + Clickable [Page](/tab) Links
    else Off-Topic Query (Coding, Recipes, Trivia)
        EdgeAI-->>Client: Polite District Scope Refusal + [Home](/) Link
    end
    Client-->>Resident: Render Interactive Link Buttons in Chat Modal
    Resident->>Client: Click [Wildfire Maps](/resources)
    Client->>Client: Instant Tab Navigation to Selected Resource
    end
```

---

### 2. Foundational Engineering Pillars

#### 2.1 Full HTML5 Browser History Routing & Dynamic SEO Engine (`src/App.tsx`, `src/worker.ts`)
* **Clean Real-World URLs:**
  - Migrated from a single-URL SPA to authentic HTML5 History API routing. Navigating between sections calls `window.history.pushState(null, '', path)` so every page has its own real URL (`/burn-permits`, `/volunteer`, `/calendar`, `/resources`, `/stations`, `/gallery`, `/fire-game`, `/about`, `/contact`).
  - Listens to `window.addEventListener('popstate')` for native browser Back and Forward navigation buttons.
  - Dynamically updates `document.title` on each route change (e.g. `Outdoor Burn Rules & Permits | DCFD4 Orondo`), allowing search engines and social crawlers to index distinct pages.
* **Cloudflare Workers Assets SPA Edge Fallback:**
  - Configured `binding: "ASSETS"` and `not_found_handling: "single-page-application"` in `wrangler.jsonc`.
  - In `src/worker.ts`, edge requests to extensionless deep paths are cleanly served `index.html` with status 200, enabling direct bookmarking, external linking, and search bot indexing.

#### 2.2 Action-Oriented Community Roadmap Architecture (`src/components/HomeOverview.tsx`)
* **Structured 6-Step Resident Service Matrix:**
  - Architected as a modular, uncluttered action roadmap addressing the 6 primary community interaction vectors:
    1. `Submit Burn Request`: Real-time seasonal ban verification and online notification dispatch.
    2. `Volunteer With DCFD4`: Turnout gear, certified academy training, and station living quarters info.
    3. `Donate to Association`: Direct online PayPal checkout integration (`https://www.paypal.com/donate?token=...`) and 501(c)(3) tax-exempt check mailing instructions for frontline apparatus and PPE funding.
    4. `District Calendar`: Governance meetings (3rd Wednesday of every month at 5:30 PM) and Tuesday drill evolutions.
    5. `Wildfire & Smoke Maps`: Multi-agency radar (Watch Duty, WA DNR, EPA AirNow).
    6. `Contact Headquarters`: Headquarters address, telephone lines, and dispatch routing.
* **Minimalist, High-Efficiency UI:**
  - Removed decorative pills, badges, and repetitive micro-cards. Icons are functional anchors for eye-scanning.
  - Every card includes a bold title, concise description, contained contextual facts, and full-width 44px+ tap target buttons.
* **PayPal 501(c)(3) Online Donation Pipeline:**
  - Integrated official checkout token (`_0oLbUMVORj9lEdQGnlH3L_VMTZTAk-OsQN6wcJAb_9i-HsHqkwRQUIl-kZfZ3ggL2E6ubc1Lbs8cvTG`) verified via BrowserOS Neo for "Douglas County Fire District 4".
  - Implemented across Home Overview (Card #3), Contact & Donate page (`/contact`), Global Footer, and AI assistant knowledge base.

#### 2.3 Full-Bleed 16:9 Station Cards & Strategic Fleet Assets (`src/components/StationsPage.tsx`)
* **Full-Bleed 16:9 Edge-to-Edge Architecture (Zero Letterboxing):**
  - Re-engineered station cards so photos bleed edge-to-edge across the top of each card (`aspect-[16/9] w-full object-cover`), eliminating black letterbox bars and nested borders.
  - Featured Showcase: Displays 4K Station 241 Headquarters and apparatus photograph (`/assets/station41.jpg`).
  - Station 241 Card: 4K Station 241 Headquarters and frontline emergency fleet.
  - Station 242 Card: Restored and upscaled borderless 16:9 photograph of the 4-bay central corridor station on US-97.
  - Station 243 Card: High-resolution Google Maps satellite aerial imagery of 20 Greens Canyon Rd with Columbia River & station marker.
  - Station 244 Card: Restored and upscaled borderless 16:9 photograph of the 3-bay facility on US-97 near Beebe Bridge.
  - Full district readiness documented across Stations 241, 242, 243, and 244 with direct Google Maps navigation links.

#### 2.4 Prominently Featured Station 241 Header & Official Crest (`src/components/Hero.tsx`)
* **Prominent Station 241 Photography & Multi-Directional Gradient:**
  - Station 241 photograph (`/assets/station41.jpg`) is showcased with elevated clarity (opacity-65, contrast-105, brightness-95).
  - Uses directional gradients (`from-slate-950/90 via-slate-950/50 to-slate-950/20`) to guarantee crisp readability for headings on the left while displaying the station building and all 4 emergency apparatus (Command SUV, Type 1 Engine, Type 6 Brush Truck, Tender) clearly on the right.
  - Expanded vertical padding (`pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28`) balances visual weight across mobile and desktop displays.
* **Authoritative Dark Emergency Aesthetic:**
  - High-contrast emergency services palette: Deep slate `#0b0f19` root (`bg-slate-950`), semi-transparent glass panels (`glass-panel`), crisp white typography, and red/amber hazard indicators.
  - Multi-theme switcher removed to eliminate visual clutter and ensure an authoritative emergency command presence across mobile and desktop.
* **Authoritative Static Department Crest Emblem:**
  - Removed high-resource water-spray canvas loops, continuous flame animations, and Web Audio synthesizers in favor of an official, clean, static DCFD4 crest emblem.
  - Aligns with municipal government web accessibility and civic design standards.
* **Single-Source Content Hierarchy (Zero Redundancy):**
  - Stated all core facts in dedicated, authoritative locations:
    - `Station 241 Headquarters • Orondo, WA` resides solely in the top dispatch row.
    - `Douglas County Fire District No. 4` is the sole subtitle below the main motto.
    - Operational scope (`24/7 all-hazard fire suppression, wildland protection, and emergency medical services across the East Columbia River corridor and orchards`) is contained in the narrative.
    - Dedicated badge `100% Volunteer Fire & EMS`, physical metrics (`4 Stations • 100+ Sq Miles • Est. 1946`), and service areas (`Protecting Orondo • Brays • Lone Pine • Beebe Bridge`) are unified under the official emblem.
    - Removed redundant text across the alert banner, subheads, and narrative.

#### 2.5 Wildfire Maps, Air Quality, Emergency Alerts & Legal Regulations (`src/components/ResourcesPage.tsx`, `src/components/OpenBurningPage.tsx`)
* **Verified Multi-Agency Incident Radar & Codified Regulations:**
  - 100% verified live via BrowserOS Neo browser automation, eliminating legacy 404 dead links and misdirected public records pages:
    - *Satellite Hotspots:* NASA FIRMS 3-hour MODIS/VIIRS thermal anomaly scans.
    - *Active Incidents:* Watch Duty (radio traffic and evacuation boundaries), WA DNR dashboard, and federal InciWeb.
    - *Air Quality & Smoke Plumes:* EPA AirNow real-time PM2.5 sensors and WA Smoke Blog forecasts.
    - *County Emergency Notifications:* Douglas County Emergency Management (`https://www.douglascountywa.gov/231/Emergency-Management`), Everbridge evacuation alerts signup (`https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System`), and live Emergency Incidents Map (`https://www.douglascountywa.gov/697/Emergency-Incidents-Map`).
    - *NWS Fire Weather Forecast:* National Weather Service Western Region WFO Spokane Fire Weather Briefing (`https://www.weather.gov/wrh/fire?wfo=otx&layer=fwx`).
    - *Hydrologic Monitoring:* USGS Washington State Water Conditions & Streamflow (`https://waterdata.usgs.gov/state/Washington/`).
    - *Codified County & State Burning Regulations:* Douglas County Code Chapter 8.12 Open Burning (`https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html`), WAC 173-425 Outdoor Burning rule (`https://app.leg.wa.gov/wac/default.aspx?cite=173-425`), WA DNR Burn Restrictions under WAC 332-24 (`https://dnr.wa.gov/wildfire-resources/outdoor-burning/burn-restrictions`), and WA Department of Ecology Burn Permits Portal (`https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits`).
  - Equipped with real-time text search and 5 category filter pills: `All Resources (18)`, `Wildfire Maps & Apps`, `Smoke & Weather`, `Local Douglas County`, and `Codes & Regulations`.

#### 2.6 Clean Emergency Interface & Modular AI Assistant Architecture
* **Streamlined UI Navigation:**
  - Removed "Ask Assistant" button from the global navigation bar and hero action rows to maintain a distraction-free, authoritative municipal emergency presence.
  - Direct public safety pathways (Burn Rules, Volunteer, Calendar, Resources, Contact & Donate) take precedence.
* **Underlying Edge AI Gateway Architecture (`src/services/aiGateway.ts`):**
  - Modular AI assistant service preserved for headless edge queries or standalone citizen assistance.
  - System prompt incorporates complete route mappings for all district pages and external state agencies.
  - Answers include structured markdown links formatted as `[Page Title](/tab-name)`.

#### 2.7 Bloons TD 5 / BTD 6 Wildland Firefighting Tower Defense Engine (`src/components/FireGamePage.tsx`)
* **Bloons TD 5 Track Geometry & Interpolated Movement Physics:**
  - **Serpentine Waypoint Track:** Continuous 2,090px path across 11 precision waypoints (`TRACK_WAYPOINTS`) traversing orchard lands, crossing the Columbia River over a wooden plank bridge, and terminating at Station 241 Headquarters.
  - **Precomputed Segment Geometries:** Pre-calculated cumulative segment distances (`CUMULATIVE_LENGTHS`) allow instant `O(log n)` / constant-time coordinate interpolation along curves via `getCoordinateAtDistance(dist)`.
* **Fire Balloon Tiers (Popping & Splitting Hierarchy):**
  - **8 Distinct Fire Balloon Classes:**
    - T1: Red Grass Spark (1 HP, 1.35 speed)
    - T2: Blue Campfire Blaze (2 HP, 1.7 speed, splits into 1 Red Spark)
    - T3: Green Brush Fire (3 HP, 2.1 speed, splits into 1 Blue Campfire)
    - T4: Yellow Crown Fire (4 HP, 2.8 speed, splits into 1 Green Brush Fire)
    - T5: Pink Timber Flame (5 HP, 3.4 speed, splits into 1 Yellow Crown Fire)
    - T6: Charcoal Armored Smolder (8 HP, 1.1 speed, ember-shielded; splits into 2 Pink Timber Flames)
    - T7: Canyon Firestorm (12 HP, 2.0 speed; splits into 2 Armored Smolders)
    - T8: Badger Mountain Boss Inferno (80 HP, 0.9 speed; splits into 4 Canyon Firestorms upon containment)
* **Institutional Tower Apparatus & Dual 3-Tier Upgrade Paths:**
  - 6 Apparatus Types: Hose Volunteer ($175), Deck Gun Monitor ($350, AOE splash), Perimeter Sprinkler ($240, 360-degree mist), Type 6 Brush Engine ($480, 4x4 foam vehicle), Columbia River Fireboat ($420, water-only draft vessel), and Dozer Line Scrape ($160, 12-hit contact trap).
  - Dual 3-tier upgrade paths per unit (e.g. Hose Volunteer: Water Pressure vs Reach & Class A Foam).
  - Target Priority Selector (First, Last, Strongest, Closest).
  - 70% capital liquidation refund upon selling.
* **Decoupled 60 FPS Engine with Background Tab Visibility Fallback:**
  - Animation and collision state maintained in high-performance mutable refs (`gameRef`), syncing to React state (`cash`, `score`, `lives`, `round`) at most once per frame to prevent React render thrashing.
  - Native Web Audio oscillators throttled to 40ms intervals to eliminate audio thread crackling.
  - Background Tab Visibility Handler: Detects `document.hidden` and activates a 33ms interval fallback loop, ensuring uninterrupted simulation progress across tab switching and headless browser automation. Exposes `window.__dcfd4_game.tick(frames)` for deterministic automated testing.

#### 2.8 Interactive Movable Pure-Image Flex Gallery Architecture (`src/components/GalleryPage.tsx`)
* **Strictly Zero Words On Cards:**
  - Pure photography showcase with zero text or badges.
  - HTML5 drag-and-drop reordering, 3D cursor parallax tilt, and dual display modes (Fluid Flex Grid and Kinetic Movable Ribbon Stream).

#### 2.9 Real-Time Seasonal Burn Ban Transition Engine (`src/services/burnBanService.ts`)
* **Mathematical Schedule Model:**
  - `isBurnBanDate(date)`: Evaluates Month index in JS (June = 5 through September = 8). Active from June 1 at 00:00:00 to September 30 at 23:59:59.
  - `calculateCountdownDays(date, isActive)`: Plain English millisecond delta calculation against October 1 (when active) and June 1 (when lifted).
* **Zero-Reload Heartbeat:**
  - Both `App.tsx` and `LiveAlertBanner.tsx` run an active 30-second interval ticker and listen to browser `visibilitychange` events.
  - When midnight strikes on October 1st, state transitions automatically from red warning to emerald green open burning across the alert banner, hero CTA, roadmap Card 1, regulations page, and footer without requiring a user reload.

#### 2.10 Calendar Visible Slice & Historical Month Filtering (`src/components/CalendarPage.tsx`)
* **Dynamic Active Month Slicing:**
  - Evaluates client-side system date: `today.getFullYear()` and `today.getMonth()`.
  - When viewing the current year (2026), `visibleMonthIndices` defaults to `[currentActualMonth ... 11]` (e.g. September through December), suppressing months 0 through 7 (January through August).
  - Toggling `showPastMonths` dynamically expands the visible indices array to all 12 months (`0 ... 11`).
  - Active month detection renders an amber `CURRENT` indicator badge next to the current month name.
  - Event filtering automatically excludes events from prior months when past months are hidden, keeping both the 12-month grid and the chronological agenda feed focused on actionable upcoming dates.

#### 2.11 Home Overview Authentic Community Photo Banner Architecture (`src/components/HomeOverview.tsx`)
* **Responsive Photo Integration:**
  - High-resolution local static asset: `/assets/gallery/structure_attack_2014.jpg` (`public/assets/gallery/structure_attack_2014.jpg`).
  - Rendered at the bottom of the "How Can We Help You Today?" section, directly after the 6 action-oriented service cards.
  - Container utilizes `relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-[16/7] sm:aspect-[24/8] max-h-[360px]`.
  - Responsive image element configured with `w-full h-full object-cover object-center` and native browser `loading="lazy"`.
  - Seamless dark slate edge gradient overlay (`bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none`) for clean integration without distracting text overlays.

#### 2.12 Revamped About Page Architectural Hierarchy (`src/components/AboutPage.tsx`)
* **Civic Public Safety Hierarchy:**
  - Component renders four structured visual bands:
    1. *Community Gratitude & 501(c)(3) Support Banner:* Immediate civic acknowledgment explaining how volunteer donations fund frontline turnout gear, AEDs, and extrication tools. Direct PayPal donation button and PO Box 258 mailing instructions.
    2. *Sleek Mission & Core Values Card:* Redesigned with subtle SVG crest watermark, high-contrast typography, and a 4-pillar Core Values grid (Courage, Dedication, Teamwork, Tradition).
    3. *Frontline Wildland Crew Photo & Leadership Team:* Authentic 2525 x 1841 photo (`/assets/gallery/leadership_station_2019.jpg`) displayed in an uncropped `aspect-[16/10] sm:aspect-[16/9]` container with `object-[center_35%]`, leading directly into Command Officers and Board of Fire Commissioners cards with RCW Title 52 legal references.
    4. *Operational Boundary & 40-Year Heritage Archive:* Embedded district coverage map and historic photo archive from 1984 through 1990.

#### 2.13 Developer Attribution & Professional Inquiries Architecture (`src/components/Footer.tsx`)
* **Structured Attribution Ledger:**
  - Segregates the official district copyright notice (`© 2026 Douglas County Fire Dist. No. 4 — All Rights Reserved.`) from web developer branding.
  - Implements the developer credit: `Website Custom Designed & Built by Isaac King — 2026`.
  - Pairs with a dedicated inquiries action item: `Email for Inquiries: isaac.king5050@gmail.com` using a `mailto:` scheme pre-configured with a clean subject line.
  - Formatted with a responsive flex layout maintaining strict `min-h-[44px]` touch targets on mobile devices.
  - Exported through `DEVELOPER_ATTRIBUTION` constant and verified through automated Vitest regression suites.



