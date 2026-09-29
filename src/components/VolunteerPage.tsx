import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  Heart, 
  Home, 
  Award, 
  Send, 
  GraduationCap, 
  Check,
  Loader2
} from 'lucide-react';
import type { VolunteerApplicationForm } from '../types';
import { submitDistrictForm } from '../services/formService';

export const VolunteerPage: React.FC = () => {
  const [formData, setFormData] = useState<VolunteerApplicationForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    ageGroup: '19-29',
    interestedRoles: ['Firefighter'],
    hasExperience: false,
    experienceDetails: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    {
      id: 'Firefighter',
      title: 'Structural & Wildland Firefighter',
      icon: Flame,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/40',
      border: 'border-red-200 dark:border-red-600/40',
      description: 'Respond to structural fires, wildfires, vehicle accidents, and rescue emergencies. Train as an apparatus operator, interior attack firefighter, or wildland specialist. All personal protective equipment (turnout gear) provided free.',
    },
    {
      id: 'EMT',
      title: 'Emergency Medical Technician (EMT)',
      icon: Heart,
      color: 'text-pink-600 dark:text-pink-400',
      bg: 'bg-pink-50 dark:bg-pink-950/40',
      border: 'border-pink-200 dark:border-pink-600/40',
      description: 'Deliver life-saving care on trauma and medical calls. Certified EMTs receive district medical kits and AEDs to provide rapid initial care. Partnered with Ballard Ambulance and Lake Chelan Community Hospital.',
    },
    {
      id: 'Resident',
      title: 'Resident Firefighter Program',
      icon: Home,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-600/40',
      description: 'Live rent-free at Station 241 in exchange for staffing duty shifts! An extraordinary opportunity for recruits pursuing full-time fire service careers or local professionals seeking an immersive brotherhood experience.',
    },
    {
      id: 'Auxiliary',
      title: 'Auxiliary & Support Services',
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-600/40',
      description: 'Crucial logistical support behind the frontlines. Provide incident rehab meals and hydration at major incidents, organize pancake breakfasts and open houses, manage IT systems, or assist with vehicle maintenance.',
    },
  ];

  const handleRoleToggle = (roleId: string) => {
    setFormData(prev => {
      const exists = prev.interestedRoles.includes(roleId);
      return {
        ...prev,
        interestedRoles: exists 
          ? prev.interestedRoles.filter(r => r !== roleId)
          : [...prev.interestedRoles, roleId]
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitDistrictForm({
      formType: 'volunteer',
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      roleInterest: formData.interestedRoles,
      message: `[Age: ${formData.ageGroup}] ${formData.experienceDetails}`,
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
            <Users className="w-4 h-4" />
            <span>Join Douglas County Fire District 4</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Now Is The Time To Make A Difference
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Our department is 100% volunteer-powered. Whether you are 16 or 80, a college student or retiree, there is a meaningful place for you on our team.
          </p>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="app-card p-5 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center justify-center mx-auto">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase">100% Free Gear & Training</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">All certified NFPA turnout gear, boots, helmets, and state training provided at zero cost.</p>
          </div>

          <div className="app-card p-5 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-600/10 dark:bg-amber-600/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Home className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase">Resident Housing Available</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Station 241 offers comfortable residential quarters for members staffing emergency shifts.</p>
          </div>

          <div className="app-card p-5 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase">Career Launchpad</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Gain real incident call experience, leadership credentials, and EMT certifications for career fire departments.</p>
          </div>

          <div className="app-card p-5 rounded-2xl text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase">Unmatched Brotherhood</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Join a tight-knit family of neighbors dedicated to protecting lives and property in Orondo.</p>
          </div>
        </div>

        {/* Roles Cards Grid */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Choose Your Path Of Service
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">We match your personal passions and schedule to the right role.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map(role => {
              const Icon = role.icon;

              return (
                <div
                  key={role.id}
                  className="app-card rounded-2xl p-6 transition-all shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${role.bg} ${role.color} border ${role.border} flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">{role.title}</h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Volunteer Application Form */}
        <div className="max-w-2xl mx-auto app-card rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">
              Volunteer Interest Application
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Submit your info below and our leadership team will reach out to invite you for a station tour and introduction!
            </p>
          </div>

          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xl">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">Thank You, {formData.fullName}!</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Your volunteer application has been transmitted to Assistant Chief Justin Dennis and Chief Jeff Zanol. We will be in touch shortly to schedule an orientation tour at Station 241!
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>
                  <span>Official Application Receipt: </span>
                  <strong className="text-red-700 dark:text-amber-400 font-mono font-bold">{referenceCode}</strong>
                </div>
                <div>
                  <span>Selected Tracks: </span>
                  <strong className="text-slate-900 dark:text-white">{formData.interestedRoles.join(', ')}</strong>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Routed securely to DCFD4 volunteer coordinator via Cloudflare Edge.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="min-h-[44px] px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (509) 555-0199"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sarah@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                    Age Group
                  </label>
                  <select
                    value={formData.ageGroup}
                    onChange={e => setFormData({ ...formData, ageGroup: e.target.value as any })}
                    className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-red-500"
                  >
                    <option value="16-18">16 - 18 (Cadet Program)</option>
                    <option value="19-29">19 - 29</option>
                    <option value="30-49">30 - 49</option>
                    <option value="50+">50+ (Experienced / Retiree)</option>
                  </select>
                </div>
              </div>

              {/* Role Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-2">
                  Interested Service Tracks (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {roles.map(r => (
                    <label 
                      key={r.id} 
                      className="min-h-[44px] flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:border-slate-400 dark:hover:border-slate-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.interestedRoles.includes(r.id)}
                        onChange={() => handleRoleToggle(r.id)}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-900 dark:text-white">{r.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                  Residential Address (Orondo / Douglas County area)
                </label>

                <input
                  type="text"
                  placeholder="e.g. 14000 US 2, Orondo, WA"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1">
                  Prior Emergency or Trades Experience (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any prior EMS, military, mechanical, CDL driving, medical, or volunteer experience..."
                  value={formData.experienceDetails}
                  onChange={e => setFormData({ ...formData, experienceDetails: e.target.value })}
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
                    <span>Transmitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Volunteer Interest</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

        {/* Authentic Drill Photos Showcase */}
        <div className="space-y-4 pt-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase">
              See Our Volunteers In Action
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Photographed during official Douglas County Fire District 4 weekly evolutions and multi-station apparatus drills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="app-card rounded-2xl overflow-hidden shadow-xl group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/gallery/apparatus_drill_2019.jpg"
                  alt="DCFD4 Volunteer Apparatus Operations Drill"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-red-700 dark:text-amber-400 uppercase">Station 241 Drill Grounds</span>
                  <span>Apparatus Drill</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Pumping & Water Shuttle</h4>
              </div>
            </div>

            <div className="app-card rounded-2xl overflow-hidden shadow-xl group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/gallery/crew_training_2019.jpg"
                  alt="DCFD4 Volunteer Firefighters Conducting Training"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-red-700 dark:text-amber-400 uppercase">District Training Field</span>
                  <span>Tactical Drills</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Combat Firefighter & SCBA</h4>
              </div>
            </div>

            <div className="app-card rounded-2xl overflow-hidden shadow-xl group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/assets/gallery/wildland_action.jpg"
                  alt="DCFD4 Volunteers on Wildland Initial Attack"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-red-700 dark:text-amber-400 uppercase">Douglas County Hills</span>
                  <span>Field Operations</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Wildland Hose Deployments</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
