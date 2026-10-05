import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Phone, 
  Send, 
  ShieldAlert,
  Loader2,
  MapPin,
  ExternalLink,
  Scale,
  Clock,
  AlertTriangle
} from 'lucide-react';
import type { BurnReportForm } from '../types';
import { submitDistrictForm } from '../services/formService';

interface OpenBurningPageProps {
  isBurnBanActive: boolean;
}

export const OpenBurningPage: React.FC<OpenBurningPageProps> = ({ isBurnBanActive }) => {
  const [formData, setFormData] = useState<BurnReportForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    burnDate: new Date().toISOString().split('T')[0],
    burnType: 'natural-debris',
    pileDimensionsConfirmed: false,
    waterSupplyConfirmed: false,
    notes: '',
    bot_field: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in your name, email address (for approval), phone number, and burn address.');
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
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      burnDate: formData.burnDate,
      burnType: formData.burnType,
      pileDimensionsConfirmed: formData.pileDimensionsConfirmed,
      waterSupplyConfirmed: formData.waterSupplyConfirmed,
      notes: formData.notes,
      bot_field: formData.bot_field,
    });
    setIsSubmitting(false);

    setReferenceCode(result.referenceCode);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">
            Douglas County Fire District No. 4
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Outdoor Burning & Burn Notices
          </h1>
          <p className="text-sm text-slate-400">
            Official guidelines, seasonal restrictions, and online burn notification dispatch.
          </p>
        </div>

        {/* Seasonal Alert Banner */}
        <div className={`rounded-2xl p-5 border ${
          isBurnBanActive 
            ? 'bg-red-950/40 border-red-900/60 text-red-200' 
            : 'bg-emerald-950/40 border-emerald-900/60 text-emerald-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${isBurnBanActive ? 'bg-red-600' : 'bg-emerald-600'} text-white flex-shrink-0`}>
                {isBurnBanActive ? <ShieldAlert className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white block">
                  {isBurnBanActive ? 'Annual Burn Ban In Effect (June 1 – Sept 30)' : 'Open Burning Season Active (Oct 1 – May 31)'}
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {isBurnBanActive 
                    ? 'All outdoor yard debris burning is prohibited by county ordinance.'
                    : 'Clean vegetative yard burning permitted with 4x4x4 pile limit, water on site, and notification.'}
                </p>
              </div>
            </div>

            <a
              href="tel:5097842941"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 transition-colors flex-shrink-0 self-end sm:self-auto"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>(509) 784-2941</span>
            </a>
          </div>
        </div>

        {/* 2-Column Layout (Form appears first on mobile, right on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core Rules */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            
            {/* The 4x4x4 Rule */}
            <div className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white uppercase">
                  The 4x4x4 Yard Burning Rule
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Residential yard waste piles must not exceed <strong className="text-white">4 feet wide, 4 feet long, and 4 feet high</strong>. Only one pile may be burned at a time.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-1 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-black text-sm block">4 FT</span>
                  <span className="text-[10px] text-slate-400 uppercase">Max Width</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-black text-sm block">4 FT</span>
                  <span className="text-[10px] text-slate-400 uppercase">Max Length</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-amber-400 font-black text-sm block">4 FT</span>
                  <span className="text-[10px] text-slate-400 uppercase">Max Height</span>
                </div>
              </div>
            </div>

            {/* Allowed vs Prohibited */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5 bg-slate-900/80 border border-emerald-900/40 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Allowed Materials</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• Clean dry leaves & needles</li>
                  <li>• Tree prunings & orchard trimmings</li>
                  <li>• Untreated brush & vegetative yard debris</li>
                </ul>
              </div>

              <div className="rounded-2xl p-5 bg-slate-900/80 border border-red-900/40 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase">
                  <XCircle className="w-4 h-4" />
                  <span>Strictly Illegal Always</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• 55-gallon burn barrels (illegal in WA)</li>
                  <li>• Household garbage, plastics, rubber</li>
                  <li>• Construction debris & treated lumber</li>
                </ul>
              </div>
            </div>

            {/* Mandatory Safety Requirements */}
            <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-white uppercase text-xs block">
                Mandatory Operational Conditions:
              </span>
              <ul className="space-y-1.5">
                <li>• An adult must attend the fire at all times until completely out.</li>
                <li>• A charged water hose or working shovel/extinguisher must be on site.</li>
                <li>• Fires must be 50+ feet from any structure and extinguished completely before dusk.</li>
                <li>• No burning during windy conditions (winds exceeding 7-10 mph).</li>
              </ul>
            </div>

            {/* Official Ordinances & DOE Links */}
            <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-400" />
                  <span>Governing Legal Statutes</span>
                </span>
                <span className="text-[10px] text-slate-500">WA State Law</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href="https://www.codepublishing.com/WA/DouglasCounty/html/DouglasCounty08/DouglasCounty0812.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
                >
                  <span>Douglas County Code 8.12</span>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                </a>
                <a
                  href="https://app.leg.wa.gov/wac/default.aspx?cite=173-425"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors"
                >
                  <span>WAC 173-425 Outdoor Burning</span>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                </a>
              </div>
            </div>

            {/* Boundary Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>DCFD4 Coverage Area Boundary Map</span>
                </span>
                <span className="text-[10px] text-slate-500">Turtle Rock to Beebe Bridge</span>
              </div>
              <img
                src="/assets/gallery/district_boundary_map.jpg"
                alt="DCFD4 Boundary Map"
                className="w-full h-auto rounded-xl object-cover"
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Burn Notice Form (First on mobile) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="rounded-2xl p-6 bg-slate-900 border border-slate-800 space-y-5 sticky top-24">
              
              <div>
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold uppercase tracking-wider">
                  <FileText className="w-4 h-4" />
                  <span>Station 241 Dispatch</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Notify Fire Department
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Orondo residents must notify DCFD4 before igniting outdoor yard burns.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-amber-950/40 border border-amber-600/60 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1.5">
                      Request Submitted • Pending Review
                    </span>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">DO NOT BURN YET</h4>
                    <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                      Your burn notice has been transmitted to Station 241 dispatch. Please wait and watch your email inbox for official written approval from DCFD4 before igniting.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-left space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Tracking Reference:</span>
                      <span className="font-mono text-amber-400 font-black text-sm">{referenceCode}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] pt-1.5 border-t border-slate-900">
                      <span className="text-slate-400">Approval Will Be Sent To:</span>
                      <span className="text-white font-medium truncate max-w-[200px]">{formData.email}</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 text-left space-y-2">
                    <p className="font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      <span>Next Steps Before Igniting:</span>
                    </p>
                    <p className="text-slate-300 leading-normal">
                      1. Check your email for authorization from <span className="text-white font-semibold">info@dcfd4.com</span>.
                    </p>
                    <p className="text-slate-300 leading-normal">
                      2. If weather, high winds, or air inversions create safety hazards, burning will be restricted.
                    </p>
                    <p className="text-slate-400 text-[10px] pt-0.5">
                      Need same-day or immediate status? Call Station 241 at <strong className="text-white">(509) 784-1841</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        address: '',
                        burnDate: new Date().toISOString().split('T')[0],
                        burnType: 'natural-debris',
                        pileDimensionsConfirmed: false,
                        waterSupplyConfirmed: false,
                        notes: '',
                        bot_field: '',
                      });
                    }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    Submit Another Burn Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot Anti-Spam Field (hidden from humans, traps automated bots) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <input
                      type="text"
                      name="bot_field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.bot_field}
                      onChange={e => setFormData({ ...formData, bot_field: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Property Owner / Resident Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Email Address (For Written Approval Notice) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john.smith@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (509) 555-0123"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Burn Site Address in Orondo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14200 Highway 2, Orondo, WA"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Scheduled Date of Burn *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.burnDate}
                      onChange={e => setFormData({ ...formData, burnDate: e.target.value })}
                      className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-2 pt-1 text-xs text-slate-300">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.pileDimensionsConfirmed}
                        onChange={e => setFormData({ ...formData, pileDimensionsConfirmed: e.target.checked })}
                        className="w-4 h-4 mt-0.5 rounded text-red-600 bg-slate-950 border-slate-700"
                      />
                      <span>I confirm pile is 4ft x 4ft x 4ft or smaller of clean yard debris.</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={formData.waterSupplyConfirmed}
                        onChange={e => setFormData({ ...formData, waterSupplyConfirmed: e.target.checked })}
                        className="w-4 h-4 mt-0.5 rounded text-red-600 bg-slate-950 border-slate-700"
                      />
                      <span>I confirm an adult will attend with water on site and extinguish before dusk.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[44px] w-full mt-2 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white transition-all shadow-md active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Burn Request (Pending Approval)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    You can also call DCFD4 to leave a notice: <strong className="text-slate-400">(509) 784-2941</strong>
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
