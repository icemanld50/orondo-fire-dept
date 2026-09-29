import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Clock, 
  Navigation, 
  ShieldAlert,
  Loader2,
  HeartHandshake,
  Heart,
  ExternalLink
} from 'lucide-react';
import { submitDistrictForm } from '../services/formService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Question',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitDistrictForm({
      formType: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `[Subject: ${formData.subject}] ${formData.message}`,
    });
    setIsSubmitting(false);

    setReferenceCode(result.referenceCode);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen app-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>Community Support & Direct Contact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Donate & Contact Orondo Fire
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Support the volunteer association, submit burn notifications, reach station command staff, or send an inquiry directly to District 4.
          </p>
        </div>

        {/* Emergency Advisory Callout - Calm Civic Warning without button */}
        <div className="app-card p-4 rounded-2xl border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-600/10 dark:bg-amber-600/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase">Active Emergency</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">For structure fires, vehicle collisions, or medical emergencies, dial 911 for RiverCom dispatch.</p>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex-shrink-0 shadow-sm">
            Emergencies: 911
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Phone & Address Directory + 501(c)(3) Support */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 501(c)(3) Community Donation & Support Card */}
            <div className="app-card rounded-3xl p-6 sm:p-7 border-amber-200 dark:border-amber-600/40 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider block">
                    501(c)(3) Non-Profit Support
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Orondo Firefighters Volunteer Association
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tax-deductible community donations directly fund life-saving equipment like hydraulic rescue jaws, AED defibrillators, thermal cameras, and high-flow nozzles that tax levies cannot fully cover.
              </p>

              {/* Online PayPal Donation Button */}
              <div className="pt-1">
                <a
                  href="https://www.paypal.com/donate?token=_0oLbUMVORj9lEdQGnlH3L_VMTZTAk-OsQN6wcJAb_9i-HsHqkwRQUIl-kZfZ3ggL2E6ubc1Lbs8cvTG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-wide text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-lg shadow-blue-950/20 border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-95 group"
                >
                  <Heart className="w-4 h-4 text-pink-300 fill-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Donate Online via PayPal</span>
                  <ExternalLink className="w-4 h-4 text-amber-300" />
                </a>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center mt-1.5">
                  Accepts PayPal balance, major debit/credit cards, and recurring monthly support.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Or Mail Tax-Deductible Checks To:</span>
                <span className="text-red-700 dark:text-amber-300 font-semibold block">Orondo Firefighters Volunteer Association</span>
                <span className="text-slate-500 dark:text-slate-400 block">PO Box 258, Orondo, WA 98843</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 block pt-0.5">Or drop off in person during business hours at Station 241.</span>
              </div>
            </div>

            <div className="app-card rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wide pb-3 border-b border-slate-200 dark:border-slate-800">
                Department Directory
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Station Headquarters */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <MapPin className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-slate-900 dark:text-white block">Station 241 (Headquarters):</span>
                    <span className="text-slate-600 dark:text-slate-300 block">13984 US Highway 2, Orondo, WA 98843</span>
                    <a
                      href="https://maps.google.com/?q=13984+US+Highway+2+Orondo+WA+98843"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-red-700 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1 pt-1"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Driving Directions</span>
                    </a>
                  </div>
                </div>

                {/* Mailing Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-slate-900 dark:text-white block">Official Mailing Address:</span>
                    <span className="text-slate-600 dark:text-slate-300 block">Douglas County Fire District No. 4</span>
                    <span className="text-slate-500 dark:text-slate-400 block">PO Box 258, Orondo, WA 98843</span>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-slate-900 dark:text-white block">Station & Administration Office:</span>
                    <a href="tel:5097842941" className="text-base font-black text-slate-900 dark:text-white hover:text-red-600 dark:hover:text-amber-400">
                      (509) 784-2941
                    </a>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Leave a message for Chief Zanol or burning notification</span>
                  </div>
                </div>

                {/* Non-Emergency Dispatch */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-slate-900 dark:text-white block">RiverCom Non-Emergency 24/7 Dispatch:</span>
                    <a href="tel:5096639911" className="text-base font-black text-emerald-700 dark:text-emerald-400 hover:underline">
                      (509) 663-9911
                    </a>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Chelan-Douglas Regional Dispatch</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-black text-slate-900 dark:text-white block">Email:</span>
                    <a href="mailto:info@dcfd4.com" className="text-red-700 dark:text-amber-400 font-bold hover:underline">
                      info@dcfd4.com
                    </a>
                  </div>
                </div>

              </div>

              {/* Public Meetings Info */}
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 text-xs text-purple-900 dark:text-purple-200 space-y-1">
                <span className="font-black text-purple-900 dark:text-purple-300 block uppercase">
                  Monthly Commissioner Public Meetings
                </span>
                <p>
                  Fire Commissioners meet on the <strong>3rd Wednesday of every month at 5:30 PM</strong> at Station 241 (13984 US 2, Orondo). The public is encouraged to attend.
                </p>
              </div>

              {/* Authentic Station 241 Photo */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[16/10]">
                <img
                  src="/assets/gallery/station41_headquarters.jpg"
                  alt="DCFD4 Station 241 Headquarters"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

            </div>

          </div>

          {/* Right Column: Online Message Form */}
          <div className="lg:col-span-7">
            <div className="app-card rounded-3xl p-6 sm:p-8 shadow-xl">
              
              <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase">
                  Send A Message To Orondo Fire
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Have a question about burn regulations, volunteering, or community relations? Submit your note below.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">Message Dispatched!</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Douglas County Fire District 4. A member of our administration or command staff will reply to you at <strong className="text-slate-900 dark:text-white">{formData.email}</strong> shortly.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <div>
                      <span>Message Tracking ID: </span>
                      <strong className="text-red-700 dark:text-amber-400 font-mono font-bold">{referenceCode}</strong>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Forwarded to Station 241 duty officers via Cloudflare Edge Router.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'General Question',
                        message: '',
                      });
                    }}
                    className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Michael Davis"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. michael@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. (509) 555-0188"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-red-500"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Burn Regulations">Burn Regulations & Inquiries</option>
                        <option value="Volunteer Interest">Volunteer or EMT Application</option>
                        <option value="Station Tour">Station Tour or School Visit</option>
                        <option value="Commissioner Meeting">Commissioner Meeting Inquiry</option>
                        <option value="Donations">Donations / Volunteer Association</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Type your message or question here..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[48px] w-full mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wide bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-50 text-white shadow-lg shadow-red-950/20 transition-all active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Transmitting to Edge Router...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to DCFD4</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
