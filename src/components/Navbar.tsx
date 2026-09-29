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
  Gamepad2,
  ChevronDown,
  MapPin,
  PhoneCall
} from 'lucide-react';

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

  // Secondary pages housed inside the desktop "More ▾" dropdown
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
      id: 'fire-game', 
      label: 'Fire Attack Game', 
      icon: Gamepad2, 
      desc: 'Tactical browser fire defense simulator' 
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
      {/* Top Header - Solid Background, Distraction-Free */}
      <header className="sticky top-0 z-40 w-full bg-slate-950 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Logo and Brand Title - Clean, uncluttered lockup with generous right spacing */}
            <div 
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0 mr-4 sm:mr-6 lg:mr-8 xl:mr-10"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900 border-2 border-red-600/80 p-0.5 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0">
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
                  <span className="text-base sm:text-lg xl:text-xl font-black tracking-tight text-white uppercase group-hover:text-red-400 transition-colors whitespace-nowrap">
                    Orondo Fire
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-red-600/30 text-red-300 border border-red-500/50">
                    DCFD #4
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase whitespace-nowrap">
                  Douglas County • Est. 1946
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links with Dropdown Menu - Sleek & Spacious */}
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
                        ? 'bg-red-600 text-white shadow-md shadow-red-950/60'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Desktop Dropdown: "Explore & Tools ▾" */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                    isDropdownActive || dropdownOpen
                      ? 'bg-slate-800 text-amber-300 border border-amber-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                  aria-expanded={dropdownOpen}
                >
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Explore & Archive</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>

                {/* Dropdown Card */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-3 py-1.5 border-b border-slate-900 mb-1">
                      District Maps, Fleet & Tools
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
                              ? 'bg-red-600/20 text-white border border-red-500/40' 
                              : 'text-slate-300 hover:text-white hover:bg-slate-900'
                          }`}
                        >
                          <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                            isSubActive ? 'bg-red-600 text-white' : 'bg-slate-900 text-amber-400 border border-slate-800'
                          }`}>
                            <SubIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-bold text-xs sm:text-sm leading-tight text-white">
                              {subItem.label}
                            </span>
                            <span className="block text-[11px] text-slate-400 truncate mt-0.5">
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

            {/* Right Action Buttons - Phone number removed per user request */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              
              {/* Ask Community Assistant AI Button */}
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 hover:text-amber-200 transition-all shadow-sm"
                title="Ask Assistant about burning regulations, meeting dates, or stations"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="whitespace-nowrap">Ask Assistant</span>
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-red-400" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-slate-950 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/assets/logo.png" 
                    alt="Logo" 
                    className="w-10 h-10 rounded-full border border-red-600/50" 
                  />
                  <div>
                    <h3 className="font-black text-white text-base leading-tight">ORONDO FIRE</h3>
                    <p className="text-[11px] text-slate-400 uppercase font-medium">Douglas County FD #4</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-slate-400 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Core User Action Links */}
              <div className="py-3 border-b border-slate-800/80">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block px-3 mb-1">
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
                            ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/60'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-400'}`} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Secondary Explore & Resources Links */}
              <div className="py-3 border-b border-slate-800/80">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block px-3 mb-1">
                  Maps, Fleet & Media
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
                            ? 'bg-red-600 text-white font-bold shadow-md shadow-red-950/60'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-400'}`} />
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
                className="w-full mt-4 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-slate-800 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ask Community Assistant</span>
              </button>
            </div>

            {/* Direct Phone Dial Buttons in Drawer Footer */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <a
                href="tel:5097842941"
                className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Call Station: (509) 784-2941</span>
              </a>
              <a
                href="tel:5096639911"
                className="min-h-[40px] w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-950 border border-slate-800"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>RiverCom 24/7: (509) 663-9911</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
