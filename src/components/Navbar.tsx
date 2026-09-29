import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  Calendar, 
  Users, 
  Building2, 
  Info, 
  Phone, 
  Menu, 
  X, 
  Sparkles,
  Home,
  Camera,
  ChevronDown,
  MapPin,
  PhoneCall
} from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAiAssistant: () => void;
  isBurnBanActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiAssistant,
  isBurnBanActive: _isBurnBanActive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Primary core action links visible on desktop navbar
  const primaryLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'burn-permits', label: 'Burn Rules', icon: Flame },
    { id: 'volunteer', label: 'Volunteer', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: MapPin },
    { id: 'contact', label: 'Donate & Contact', icon: Phone },
  ];

  // Secondary pages housed inside the desktop "Explore & Archive ▾" dropdown (mini game hidden per user request)
  const dropdownLinks = [
    { 
      id: 'stations', 
      label: 'Stations & Fleet', 
      icon: Building2, 
      desc: 'Stations 241, 242, 243, 244' 
    },
    { 
      id: 'gallery', 
      label: 'Photo Gallery', 
      icon: Camera, 
      desc: 'Authentic 40-year photo archive' 
    },
    { 
      id: 'about', 
      label: 'About DCFD4', 
      icon: Info, 
      desc: 'History, mission, leadership' 
    },
  ];

  const isDropdownActive = dropdownLinks.some(item => item.id === activeTab);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Header - Theme-aware, Clean & Authoritative */}
      <header className="sticky top-0 z-40 w-full app-surface border-b app-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Logo and Brand Title */}
            <div 
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0 mr-4 sm:mr-6 lg:mr-8 xl:mr-10"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-red-700/80 p-0.5 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0">
                <img 
                  src="/assets/logo.png" 
                  alt="Douglas County Fire District 4 Emblem" 
                  className="w-full h-full object-cover rounded-full"
                  width="44"
                  height="44"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg xl:text-xl font-black tracking-tight text-slate-900 dark:text-white uppercase group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors whitespace-nowrap">
                    Orondo Fire
                  </span>
                  <span className="text-xs font-black text-red-700 dark:text-red-400 tracking-wider">
                    DCFD #4
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase whitespace-nowrap">
                  Douglas County • Est. 1946
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links with Dropdown Menu */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Primary Action Links */}
              {primaryLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-red-700 text-white shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-600 dark:text-red-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Desktop Dropdown: "Explore & Archive ▾" */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all border ${
                    isDropdownActive || dropdownOpen
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-amber-300 border-slate-300 dark:border-amber-500/40'
                      : 'text-slate-700 dark:text-slate-300 border-transparent hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  aria-expanded={dropdownOpen}
                >
                  <Building2 className="w-4 h-4 text-slate-600 dark:text-amber-400" />
                  <span>Explore & Archive</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl app-surface app-border shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1.5 border-b app-border mb-1">
                      District Maps & Archive
                    </div>
                    {dropdownLinks.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;
                      return (
                        <button
                          key={subItem.id}
                          onClick={() => handleTabClick(subItem.id)}
                          className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                            isSubActive 
                              ? 'bg-red-600/10 text-red-700 dark:text-white border border-red-500/30' 
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                            isSubActive ? 'bg-red-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 border app-border'
                          }`}>
                            <SubIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-xs sm:text-sm leading-tight text-slate-900 dark:text-white">
                              {subItem.label}
                            </span>
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {subItem.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action Utilities: Theme Switcher & Ask Assistant */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              
              {/* Theme Switcher Variation Selector */}
              <ThemeSwitcher />

              {/* Ask Community Assistant AI Button */}
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold app-surface border app-border text-slate-800 dark:text-amber-300 hover:border-slate-400 dark:hover:border-amber-500/60 transition-all shadow-sm"
                title="Ask Assistant about burning regulations, meeting dates, or stations"
              >
                <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span className="whitespace-nowrap">Ask Assistant</span>
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border app-border transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full app-surface border-l app-border shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b app-border">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/assets/logo.png" 
                    alt="Logo" 
                    className="w-10 h-10 rounded-full border border-red-700/50" 
                  />
                  <div>
                    <h3 className="font-black text-slate-900 dark:text-white text-base leading-tight">ORONDO FIRE</h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-medium">Douglas County FD #4</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Core User Action Links */}
              <div className="py-3 border-b app-border">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-3 mb-1">
                  Primary Actions
                </span>
                <div className="space-y-1">
                  {primaryLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`min-h-[44px] w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-red-700 text-white font-bold shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-600 dark:text-red-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Secondary Explore & Resources Links (Mini game hidden) */}
              <div className="py-3 border-b app-border">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block px-3 mb-1">
                  District Maps & Media
                </span>
                <div className="space-y-1">
                  {dropdownLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className={`min-h-[44px] w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-red-700 text-white font-bold shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600 dark:text-amber-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Ask Assistant Action */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAssistant();
                }}
                className="w-full mt-4 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold app-surface border app-border text-slate-800 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Ask Community Assistant</span>
              </button>
            </div>

            {/* Station Office Phone in Drawer Footer */}
            <div className="pt-4 border-t app-border space-y-2 text-xs">
              <a
                href="tel:5097842941"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold app-surface border app-border text-slate-800 dark:text-white"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Station Office: (509) 784-2941</span>
              </a>
              <p className="text-[11px] text-center text-slate-500">
                In an emergency, please dial 911.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
