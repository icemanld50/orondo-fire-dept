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
  Loader2,
  ShieldCheck
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
      title: 'Firefighter (Structural & Wildland)',
      icon: Flame,
      color: 'text-red-500',
      description: 'Respond to structure fires, wildfires, vehicle collisions, and technical rescues. Full NFPA gear provided free.',
    },
    {
      id: 'EMT',
      title: 'Emergency Medical Technician (EMT)',
      icon: Heart,
      color: 'text-rose-400',
      description: 'Deliver rapid life-saving trauma and medical care. District-funded national and state certifications.',
    },
    {
      id: 'Support',
      title: 'Apparatus & Operational Support',
      icon: Users,
      color: 'text-amber-400',
      description: 'Apparatus operators, radio communicators, logistics, and incident rehabilitation specialists.',
    },
  ];

  const benefits = [
    { icon: GraduationCap, title: 'Certified Training', desc: 'State-certified firefighter and EMT academies paid 100% by DCFD4.' },
    { icon: Award, title: 'Complete Gear', desc: 'Full set of custom-fitted NFPA turnout gear, boots, helmet, and district radio.' },
    { icon: Home, title: 'Station Housing', desc: 'Free resident dorm housing at Station 241 for qualified responding members.' },
    { icon: ShieldCheck, title: 'State Pension', desc: 'Washington State Volunteer Firefighters & Reserve Officers relief and pension.' },
  ];

  const handleRoleToggle = (roleId: string) => {
    setFormData(prev => {
      const exists = prev.interestedRoles.includes(roleId);
      if (exists && prev.interestedRoles.length === 1) return prev;
      return {
        ...prev,
        interestedRoles: exists 
          ? prev.interestedRoles.filter(r => r !== roleId)
          : [...prev.interestedRoles, roleId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please complete all required fields.');
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
      notes: formData.hasExperience ? `Experience: ${formData.experienceDetails}` : 'No prior experience',
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
            Recruitment & Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Volunteer With Orondo Fire
          </h1>
          <p className="text-sm text-slate-400">
            Join the 100% volunteer firefighters and EMTs protecting Douglas County Fire District 4.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Roles & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Roles */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                Paths of Service
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <div 
                      key={role.id}
                      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-5 h-5 ${role.color}`} />
                        <h3 className="text-base font-bold text-white">
                          {role.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                Volunteer Member Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => {
                  const BIcon = b.icon;
                  return (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <BIcon className="w-4 h-4" />
                        <span>{b.title}</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {b.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Training Photos */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[4/3]">
                <img
                  src="/assets/gallery/live_burn_training_2022.jpg"
                  alt="Live Fire Training"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[4/3]">
                <img
                  src="/assets/gallery/structural_training_2021.jpg"
                  alt="Structural Training"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-800 aspect-[4/3]">
                <img
                  src="/assets/gallery/brush_truck_training_2020.jpg"
                  alt="Wildland Brush Attack Drill"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl p-6 bg-slate-900 border border-slate-800 space-y-5 sticky top-24">
              
              <div>
                <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>Onboarding Application</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Apply to Join DCFD4
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  No experience required. We provide all equipment and certified training.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-700/60 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Application Received!</h4>
                    <p className="text-xs text-emerald-300 mt-1">
                      Our recruitment officer will contact you within 48 hours for an orientation interview.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px]">Reference Number:</span>
                    <span className="font-mono text-amber-400 font-black text-sm">{referenceCode}</span>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. sarah@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (509) 555-0199"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="min-h-[44px] w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Physical Address in Orondo Area *
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
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Interested Roles
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {roles.map(r => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => handleRoleToggle(r.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            formData.interestedRoles.includes(r.id)
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                          }`}
                        >
                          {r.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Prior Emergency or First Aid Experience (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="CPR, military, wildland certifications, or none..."
                      value={formData.experienceDetails}
                      onChange={e => setFormData({ 
                        ...formData, 
                        experienceDetails: e.target.value,
                        hasExperience: Boolean(e.target.value.trim())
                      })}
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
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Volunteer Application</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    Questions? Call Station 241 headquarters: <strong className="text-slate-400">(509) 784-2941</strong>
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
