import React from 'react';
import { 
  Flame, 
  Calendar, 
  Heart, 
  ArrowUp,
  Code2,
  Mail
} from 'lucide-react';

export const DEVELOPER_ATTRIBUTION = {
  designer: 'Isaac King',
  year: 2026,
  role: 'Website Custom Designed & Built',
  inquiryEmail: 'isaac.king5050@gmail.com',
  inquiryMailto: 'mailto:isaac.king5050@gmail.com?subject=Website%20Design%20%26%20Development%20Inquiry',
  copyright: '© 2026 Douglas County Fire Dist. No. 4 — All Rights Reserved.',
};

interface FooterProps {
  onNavigate: (tab: string) => void;
  isBurnBanActive: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isBurnBanActive }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-red-600/70 p-0.5 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/logo.png"
                  alt="Orondo Fire Department Rattlesnake Patch"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  Douglas County Fire Dist. 4
                </h3>
                <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  Orondo Fire Department • Est. 1946
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Providing all-hazard fire suppression, wildland protection, emergency medical care, and public safety education along the East Columbia River corridor.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              <span>100% Volunteer Dedicated • Dispatched 24/7/365</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('calendar')} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  District Calendar
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('burn-permits')} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Burn Regulations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('volunteer')} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Volunteer Fire / EMS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('stations')} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Stations & Fleet
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About & Leadership
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Regulations & Meeting (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">
              Quick Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('burn-permits')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isBurnBanActive ? 'Burn Ban Rules' : 'Open Burn Form'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-purple-400 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>Commissioner Dates</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('volunteer')}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-pink-400" />
                  <span>Resident Firefighter</span>
                </button>
              </li>
              <li>
                <a
                  href="https://www.paypal.com/donate?token=_0oLbUMVORj9lEdQGnlH3L_VMTZTAk-OsQN6wcJAb_9i-HsHqkwRQUIl-kZfZ3ggL2E6ubc1Lbs8cvTG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-red-400 hover:underline font-bold"
                >
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span>Donate via PayPal (501c3)</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:18004065322"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Ecology Burn Hotline: (800) 406-5322
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Station & Dispatch Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">
              Station & Dispatch
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">RiverCom 24/7 Dispatch:</span>
                <a href="tel:5096639911" className="text-base font-black text-amber-400 hover:underline">
                  (509) 663-9911
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">Station 241 Administration:</span>
                <a href="tel:5097842941" className="text-white font-bold hover:text-amber-400">
                  (509) 784-2941
                </a>
                <span className="text-slate-500 block text-[11px]">PO Box 258, Orondo, WA 98843</span>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Tagline Row */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          <p>
            Official digital portal for Douglas County Fire District No. 4 (Orondo Fire Department / DCFD4). Protecting Orondo, WA, Brays Landing, Lone Pine, Turtle Rock, and Beebe Bridge with fire suppression, emergency medical services, and open burning management.
          </p>
        </div>

        {/* Bottom Copyright, Developer Credit & Back to Top */}
        <div className="pt-4 border-t border-slate-800/60 space-y-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div className="space-y-1.5 text-center md:text-left">
              <div>
                © 2026 Douglas County Fire Dist. No. 4 — All Rights Reserved.
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Website Custom Designed &amp; Built by <strong className="text-slate-200 font-bold">Isaac King</strong> — 2026</span>
                </span>
                <span className="hidden sm:inline text-slate-600">•</span>
                <a
                  href="mailto:isaac.king5050@gmail.com?subject=Website%20Design%20%26%20Development%20Inquiry"
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email for Inquiries: <span className="underline font-medium">isaac.king5050@gmail.com</span></span>
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors flex-shrink-0"
              aria-label="Scroll back to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
