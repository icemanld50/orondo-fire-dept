import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  Calendar, 
  Users, 
  Building2, 
  Phone, 
  Menu, 
  X, 
  Sparkles,
  Home,
  Camera,
  ChevronDown,
  MapPin,
  Info
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

  const primaryLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'burn-permits', label: 'Burn Rules', icon: Flame },
    { id: 'volunteer', label: 'Volunteer', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: MapPin },
    { id: 'contact', label: 'Donate & Contact', icon: Phone },
  ];

  const dropdownLinks = [
    { id: 'stations', label: 'Stations & Fleet', desc: '4 active stations & frontline rigs', icon: Building2 },
    { id: 'gallery', label: 'Photo Archive', desc: '40-year photo collection', icon: Camera },
    { id: 'about', label: 'About DCFD4', desc: 'Mission, history & commissioners', icon: Info },
  ];

  const isDropdownActive = ['stations', 'gallery', 'about'].includes(activeTab);

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
      <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Logo and Brand Title */}
            <div 
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0 mr-4 sm:mr-6 lg:mr-8 xl:mr-10"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900 border-2 border-red-600/80 p-0.5 shadow-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform flex-shrink-0">
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
                  <span className="text-xs font-black text-red-500 tracking-wider">
                    DCFD #4
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 tracking-wider uppercase whitespace-nowrap">
                  Douglas County • Est. 1946
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {primaryLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-500'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              {/* Desktop Dropdown: "Explore ▾" */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all border ${
                    isDropdownActive || dropdownOpen
                      ? 'bg-slate-800 text-amber-300 border-amber-500/40'
                      : 'text-slate-300 border-transparent hover:text-white hover:bg-slate-800/70'
                  }`}
                  aria-expanded={dropdownOpen}
                >
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Explore</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 py-1.5 border-b border-slate-800 mb-1">
                      More District Resources
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
                              ? 'bg-red-600/20 text-white border border-red-500/30' 
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${
                            isSubActive ? 'bg-red-600 text-white' : 'bg-slate-800 text-amber-400 border border-slate-700'
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

            {/* Right Action: Ask Assistant & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={onOpenAiAssistant}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-amber-300 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 transition-all shadow-sm"
                title="Ask Assistant"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="whitespace-nowrap">Ask Assistant</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:bg-slate-800 border border-slate-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/98 border-t border-slate-800 px-4 pt-3 pb-6 space-y-1">
            {primaryLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-red-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 pb-1 border-t border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-500 px-2">
              Explore More
            </div>

            {dropdownLinks.map((subItem) => {
              const SubIcon = subItem.icon;
              const isSubActive = activeTab === subItem.id;
              return (
                <button
                  key={subItem.id}
                  onClick={() => handleTabClick(subItem.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                    isSubActive 
                      ? 'bg-red-600/20 text-white border border-red-500/30' 
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <SubIcon className="w-5 h-5 text-amber-400" />
                  <span>{subItem.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
};
