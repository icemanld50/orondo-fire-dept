import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Phone, 
  Send, 
  Check, 
  Info,
  ShieldAlert,
  Loader2,
  MapPin,
  ExternalLink,
  Scale
} from 'lucide-react';
import type { BurnReportForm } from '../types';
import { submitDistrictForm } from '../services/formService';

interface OpenBurningPageProps {
  isBurnBanActive: boolean;
}

export const OpenBurningPage: React.FC<OpenBurningPageProps> = ({ isBurnBanActive }) => {
  const [formData, setFormData] = useState<BurnReportForm>({
    fullName: '',
    phone: '',
    address: '',
    burnDate: new Date().toISOString().split('T')[0],
    burnType: 'natural-debris',
    pileDimensionsConfirmed: false,
    waterSupplyConfirmed: false,
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in your name, phone number, and burn address.');
      return;
    }
    if (!formData.pileDimensionsConfirmed || !formData.waterSupplyConfirmed) {
      alert('Please confirm that your pile is 4x4x4 feet or smaller and that water/attendance is on site.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitDistrictForm({
      formType: 'open_burning',
      name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      burnDate: formData.burnDate,
      burnType: formData.burnType,
      pileDimensionsConfirmed: formData.pileDimensionsConfirmed,
      waterSupplyConfirmed: formData.waterSupplyConfirmed,
      notes: formData.notes,
    });
    setIsSubmitting(false);

    setReferenceCode(result.referenceCode);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen app-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Douglas County Clean Air & Fire Safety</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Outdoor Burning & Burn Permits
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Rules, seasonal ban schedules, and official fire department notification procedures for Douglas County Fire District No. 4.
          </p>
        </div>

        {/* Current Season Alert Banner */}
        <div className={`app-card rounded-2xl p-6 border ${
          isBurnBanActive ? 'border-red-300 dark:border-red-600/80 bg-red-50/60 dark:bg-red-950/40 text-red-950 dark:text-red-100' : 'border-emerald-300 dark:border-emerald-600/80 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${isBurnBanActive ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'} flex-shrink-0`}>
                {isBurnBanActive ? <ShieldAlert className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
              </div>
              <div>
                <span className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full ${
                  isBurnBanActive ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {isBurnBanActive ? 'Burn Ban In Effect: June 1 – September 30' : 'Open Burning Permitted: October 1 – May 31'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {isBurnBanActive 
                    ? 'Outdoor Debris Burning Is Currently Prohibited' 
                    : 'Open Burning Season Is Active in Douglas County'}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {isBurnBanActive
                    ? 'During the summer high-hazard window, all outdoor yard waste, debris, and land clearing fires are strictly banned by county ordinance. Small cooking fires in approved pits are allowed unless extreme emergency red flag bans occur.'
                    : 'Residents in DCFD4 territory may conduct clean yard waste burning provided they observe the 4x4x4 pile limit, have adult supervision with water on site, extinguish by dusk, and notify the department.'}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 self-end md:self-center">
              <a
                href="tel:5097842941"
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Questions: (509) 784-2941</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Core Rules Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Essential Burning Rules & Guidelines */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* The 4x4x4 Rule Graphic Card */}
            <div className="app-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wide">
                    The 4ft x 4ft x 4ft Dimension Rule
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Strictly enforced Washington clean air limit</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                By state law and district safety policy, individual piles of natural vegetation must not exceed <strong className="text-slate-900 dark:text-white">4 feet in width, 4 feet in length, and 4 feet in height</strong>. Piles larger than 4x4x4 generate excessive radiant heat, risk uncontrollable flare-ups, and violate Douglas County clean air rules.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-base">4 FT MAX</span>
                  <span className="text-slate-500 dark:text-slate-400">Pile Width</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-base">4 FT MAX</span>
                  <span className="text-slate-500 dark:text-slate-400">Pile Length</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="block font-black text-amber-600 dark:text-amber-400 text-base">4 FT MAX</span>
                  <span className="text-slate-500 dark:text-slate-400">Pile Height</span>
                </div>
              </div>
            </div>

            {/* Permitted vs Prohibited Materials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Allowed Items */}
              <div className="app-card rounded-2xl p-5 border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Allowed During Season</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Dry yard waste (leaves, needles, weeds, lawn clippings)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Tree pruning branches and orchard limb trimmings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Natural vegetative brush cleared on personal property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Small attended cooking campfires in approved pits</span>
                  </li>
                </ul>
              </div>

              {/* Prohibited Items */}
              <div className="app-card rounded-2xl p-5 border-red-200 dark:border-red-800/50 bg-red-50/40 dark:bg-red-950/20 space-y-3">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-extrabold text-sm uppercase">
                  <XCircle className="w-4 h-4" />
                  <span>Strictly Prohibited Always</span>
                </div>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Burning household garbage, plastics, or rubber</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Burning in 55-gallon burn barrels (illegal in WA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Treated lumber, painted wood, or construction demolition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <span>Leaving any outdoor fire unattended after dusk</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Department of Ecology Rules & Phone Numbers */}
            <div className="app-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span>Agricultural & Department of Ecology (DOE) Permits</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                  State Regulation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Large-scale orchard tree removal for development or commercial agricultural burning is regulated directly by the Washington State Department of Ecology under the Clean Air Act:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">DOE Burn Day Hotline:</span>
                  <a href="tel:18004065322" className="text-amber-600 dark:text-amber-400 font-black text-sm hover:underline">
                    1-800-406-5322
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Recording prompts #1 and #2</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white block">DOE Central Regional Office:</span>
                  <a href="tel:15095752490" className="text-blue-600 dark:text-blue-400 font-black text-sm hover:underline">
                    1-509-575-2490
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Yakima Air Quality Division</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t app-border">
                <a
                  href="https://ecology.wa.gov/air-climate/air-quality/smoke-fire/outdoor-residential-burning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 transition-colors"
                >
                  <span>WA Ecology Residential Rules</span>
                  <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
                </a>
                <a
                  href="https://ecology.wa.gov/regulations-permits/permits-certifications/air-quality-permits/burn-permits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-bold border border-slate-300 dark:border-slate-700 transition-colors"
                >
                  <span>Online Ag Permit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Official County & State Burning Regulations */}
            <div className="app-card rounded-2xl p-6 border-purple-200 dark:border-purple-900/40 bg-purple-50/30 dark:bg-purple-950/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Official County & State Burning Ordinances</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold border border-purple-200 dark:border-purple-800">
                  Legal Authority
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Outdoor burning in Orondo is strictly governed by codified municipal and state legal statutes:
              </p>
              <div className="space-y-2">
                <a
                  href="https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all text-xs group"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                      Douglas County Code Chapter 8.12 (Open Burning)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Seasonal restrictions (June 1 - Oct 1), adult care, IFC 307.4.2 & misdemeanor penalty
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 ml-2" />
                </a>

                <a
                  href="https://app.leg.wa.gov/wac/default.aspx?cite=173-425"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all text-xs group"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                      WAC 173-425 Washington State Outdoor Burning Rule
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Clean Air Act prohibitions on garbage/barrel burning and urban growth boundaries
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 ml-2" />
                </a>

                <a
                  href="https://dnr.wa.gov/wildfire-resources/outdoor-burning/burn-restrictions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all text-xs group"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                      WA DNR Burn Restrictions & Forest Rules (WAC 332-24)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      County wildfire danger ratings, campfire rules, and DNR Burn Portal
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 ml-2" />
                </a>

                <a
                  href="https://www.douglascountywa.gov/693/Everbridge-Emergency-Alert-System"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-all text-xs group"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Douglas County Everbridge Emergency Alerts
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Register mobile numbers for Level 1, 2, and 3 evacuation warnings
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-2" />
                </a>
              </div>
            </div>

            {/* Official District Boundary Map */}
            <div className="app-card rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>DCFD4 Jurisdictional Boundary Map</span>
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 font-bold border border-red-200 dark:border-red-800">
                  Official Record
                </span>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
                <img
                  src="/assets/gallery/district_boundary_map.jpg"
                  alt="Douglas County Fire District No. 4 Official Jurisdictional Boundary Map"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Online Burn Notification Submission Form */}
          <div className="lg:col-span-5">
            <div className="app-card rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-500 font-black uppercase text-xs tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Official Notification</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 uppercase">
                  Notify Fire Department
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Orondo residents must notify DCFD4 prior to lighting outdoor vegetative burns.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-600/80 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">Notice Successfully Logged!</h4>
                    <p className="text-xs text-emerald-800 dark:text-emerald-200 mt-1">
                      Your outdoor burn notification has been registered with Station 241 dispatch.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-700/60 text-xs">
                    <span className="text-slate-500 dark:text-slate-400 block">Reference Confirmation ID:</span>
                    <span className="font-mono text-red-700 dark:text-amber-400 font-black text-base">{referenceCode}</span>
                    <span className="text-slate-500 dark:text-slate-400 block mt-1">Address: {formData.address}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Reminder: Have a pressurized water hose ready at all times and extinguish completely prior to dusk.
                  </p>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        phone: '',
                        address: '',
                        burnDate: new Date().toISOString().split('T')[0],
                        burnType: 'natural-debris',
                        pileDimensionsConfirmed: false,
                        waterSupplyConfirmed: false,
                        notes: '',
                      });
                    }}
                    className="min-h-[44px] w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 transition-colors"
                  >
                    Submit Another Notice
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                      Property Owner / Resident Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (509) 555-0123"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                      Burn Site Physical Address in Orondo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14200 Highway 2, Orondo, WA"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Date of Burn */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                      Scheduled Date of Burn *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.burnDate}
                      onChange={e => setFormData({ ...formData, burnDate: e.target.value })}
                      className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  {/* Mandatory Safety Checkboxes */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.pileDimensionsConfirmed}
                        onChange={e => setFormData({ ...formData, pileDimensionsConfirmed: e.target.checked })}
                        className="w-4 h-4 mt-1 rounded text-red-600 focus:ring-red-500 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                        I certify that my pile consists solely of natural vegetation and is <strong className="text-slate-900 dark:text-white">4ft x 4ft x 4ft or smaller</strong>.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.waterSupplyConfirmed}
                        onChange={e => setFormData({ ...formData, waterSupplyConfirmed: e.target.checked })}
                        className="w-4 h-4 mt-1 rounded text-red-600 focus:ring-red-500 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                        I confirm an adult will attend the fire continuously with a charged water hose and extinguish it completely before dusk.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[48px] w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wide bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white shadow-lg shadow-red-950/20 transition-all active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting to Edge Router...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Outdoor Burn Notice</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-500">
                    You can also notify DCFD4 via phone: leave a message at <strong className="text-slate-700 dark:text-slate-400">(509) 784-2941</strong>.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
