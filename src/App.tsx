import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { LiveAlertBanner } from './components/LiveAlertBanner';
import { Hero } from './components/Hero';
import { HomeOverview } from './components/HomeOverview';
import { CalendarPage } from './components/CalendarPage';
import { OpenBurningPage } from './components/OpenBurningPage';
import { VolunteerPage } from './components/VolunteerPage';
import { StationsPage } from './components/StationsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { GalleryPage } from './components/GalleryPage';
import { FireGamePage } from './components/FireGamePage';
import { ResourcesPage } from './components/ResourcesPage';
import { Footer } from './components/Footer';
import { isBurnBanDate } from './services/burnBanService';

const TAB_TO_PATH: Record<string, string> = {
  home: '/',
  'burn-permits': '/burn-permits',
  volunteer: '/volunteer',
  calendar: '/calendar',
  contact: '/contact',
  resources: '/resources',
  gallery: '/gallery',
  stations: '/stations',
  'fire-game': '/fire-game',
  about: '/about',
};

const PATH_TO_TAB: Record<string, string> = {
  '/': 'home',
  '/home': 'home',
  '/burn-permits': 'burn-permits',
  '/volunteer': 'volunteer',
  '/calendar': 'calendar',
  '/contact': 'contact',
  '/resources': 'resources',
  '/gallery': 'gallery',
  '/stations': 'stations',
  '/fire-game': 'fire-game',
  '/about': 'about',
};

const PAGE_TITLES: Record<string, string> = {
  home: 'Douglas County Fire District 4 | Orondo Fire Department (DCFD4)',
  'burn-permits': 'Burn Ban Rules & Open Burning Notice | Orondo Fire Dept (DCFD4)',
  volunteer: 'Volunteer Firefighter & EMT Recruitment | Orondo Fire Dept (DCFD4)',
  calendar: 'Public Meetings Calendar & Training Schedule | Orondo Fire Dept',
  contact: 'Donate & Contact Information | Orondo Fire Department (DCFD4)',
  resources: 'Wildfire Maps, Watch Duty & Smoke Radar | Orondo Fire Dept',
  gallery: '40-Year Documentary Photography Archive | Orondo Fire Dept',
  stations: 'Fire Stations & Apparatus Fleet | Orondo Fire Dept (DCFD4)',
  'fire-game': 'Wildland Fire Attack Tower Defense Simulator | DCFD4',
  about: 'About DCFD4, Mission & Leadership Roster | Orondo Fire Dept',
};

export const App: React.FC = () => {
  // Derive initial tab from URL path for direct deep linking and Google indexation
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      return PATH_TO_TAB[path] || 'home';
    }
    return 'home';
  });

  // Real-time date ticker: updates every 30s and on tab focus to catch midnight rollover instantly
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 30000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setCurrentDate(new Date());
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Official Douglas County burn ban window: June 1 through September 30
  // Automatically switches to false at 00:00:00 on October 1st without requiring page refresh
  const isBurnBanActive = useMemo(() => {
    return isBurnBanDate(currentDate);
  }, [currentDate]);

  // HTML5 History Navigation: Updates browser URL, titles, and enables Back/Forward buttons
  const handleNavigate = (tabId: string, pushHistory = true) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory && typeof window !== 'undefined') {
      const targetPath = TAB_TO_PATH[tabId] || '/';
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab: tabId }, '', targetPath);
      }
    }
  };

  // Synchronize browser Back and Forward button events
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      const targetTab = PATH_TO_TAB[path] || 'home';
      setActiveTab(targetTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamically update document title for SEO on every route change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = PAGE_TITLES[activeTab] || PAGE_TITLES.home;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* Top Navbar Header */}
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => handleNavigate(tab, true)}
          isBurnBanActive={isBurnBanActive}
        />

        {/* Live Burn Ban Warning Strip (rendered on Home & Burn-Permits) */}
        {(activeTab === 'home' || activeTab === 'burn-permits') && (
          <LiveAlertBanner
            isBurnBanActive={isBurnBanActive}
            onNavigateToBurning={() => handleNavigate('burn-permits', true)}
          />
        )}

        {/* Main Tab Content */}
        <main>
          {activeTab === 'home' && (
            <>
              <Hero
                onNavigate={(tab) => handleNavigate(tab, true)}
                isBurnBanActive={isBurnBanActive}
              />
              <HomeOverview
                onNavigate={(tab) => handleNavigate(tab, true)}
                isBurnBanActive={isBurnBanActive}
              />
            </>
          )}

          {activeTab === 'calendar' && <CalendarPage />}
          {activeTab === 'gallery' && <GalleryPage />}
          {activeTab === 'fire-game' && <FireGamePage />}
          {activeTab === 'burn-permits' && <OpenBurningPage isBurnBanActive={isBurnBanActive} />}
          {activeTab === 'volunteer' && <VolunteerPage />}
          {activeTab === 'stations' && <StationsPage />}
          {activeTab === 'resources' && <ResourcesPage />}
          {activeTab === 'about' && <AboutPage />}
          {activeTab === 'contact' && <ContactPage />}
        </main>
      </div>

      {/* Footer */}
      <Footer
        onNavigate={(tab) => handleNavigate(tab, true)}
        isBurnBanActive={isBurnBanActive}
      />
    </div>
  );
};

export default App;
