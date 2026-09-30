import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Check, 
  Navigation, 
  ShieldAlert,
  Loader2,
  HeartHandshake,
  Heart,
  ExternalLink
} from 'lucide-react';
import { submitDistrictForm } from '../services/formService';
import { PAYPAL_DONATION_URL } from '../data/donationConfig';

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
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-500">
            Headquarters & Community Donations
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Contact & Support DCFD4
          </h1>
          <p className="text-sm text-slate-400">
            Station 241 office directory, non-emergency dispatch, and volunteer association donations.
          </p>
        </div>

        {/* Emergency Advisory Callout */}
        <div className="p-4 rounded-xl border border-red-900/40 bg-red-950/20 max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-xs text-slate-300">
              For active structure fires, collisions, or medical emergencies, dial <strong className="text-white">911</strong> immediately.
            </p>
          </div>
          <span className="text-xs font-bold text-red-400 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-900/60 flex-shrink-0">
            Dial 911
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Phone & Address Directory + 501(c)(3) Support */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 501(c)(3) Donation Card */}
            <div className="rounded-2xl p-6 bg-slate-900/90 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Orondo Firefighters Volunteer Association
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Registered 501(c)(3) non-profit organization. Donations directly purchase advanced rescue tools, thermal cameras, and protective gear.
              </p>

              <div className="pt-1 space-y-2">
                <a
                  href={PAYPAL_DONATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md transition-all active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-current text-slate-950" />
                  <span>Donate Online (PayPal)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 block">Mail Checks To:</span>
                  <span>Orondo Firefighters Volunteer Association, PO Box 258, Orondo, WA 98843</span>
                </div>
              </div>
            </div>

            {/* Station 241 Headquarters Directory */}
            <div className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Station 241 Headquarters</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <Phone className="w-4 h-4 text-emerald-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Administrative Office</span>
                    <a href="tel:5097842941" className="text-amber-400 font-bold hover:underline">
                      (509) 784-2941
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <Phone className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">RiverCom 24/7 Non-Emergency Dispatch</span>
                    <a href="tel:5096639911" className="text-slate-300 hover:underline">
                      (509) 663-9911
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <Navigation className="w-4 h-4 text-red-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Physical Location</span>
                    <p className="text-slate-300">13984 US Highway 2, Orondo, WA 98843</p>
                    <a 
                      href="https://maps.google.com/?q=13984+US+Highway+2+Orondo+WA" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline text-[11px] block mt-0.5"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-7 bg-slate-900 border border-slate-800 space-y-5">
              
              <div>
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>Direct District Dispatch</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Send a Message to DCFD4
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  General inquiries, burn questions, and volunteer coordination.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-700/60 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Message Transmitted!</h4>
                    <p className="text-xs text-emerald-300 mt-1">
                      Your inquiry has been sent to Station 241 duty officers.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px]">Reference Number:</span>
                    <span className="font-mono text-amber-400 font-black text-sm">{referenceCode}</span>
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
                    className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Michael Davis"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. michael@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. (509) 555-0188"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-red-500"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Burn Regulations">Burn Regulations & Inquiries</option>
                        <option value="Volunteer Coordination">Volunteer Coordination</option>
                        <option value="Commissioner Inquiries">Commissioner Inquiries</option>
                        <option value="Donation Receipts">501(c)(3) Donation Receipts</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Type your message or question here..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                    />
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
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    Station 241 non-emergency phone: <strong className="text-slate-400">(509) 784-2941</strong>
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
