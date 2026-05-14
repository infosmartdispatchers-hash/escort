import React from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Calendar, Clock, Star, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Bespoke() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <span className="text-xs font-bold text-primary tracking-[0.3em] uppercase">Bespoke Arrangements</span>
            <h1 className="font-serif text-6xl text-on-surface leading-tight">
              A service as unique as your <span className="italic text-primary">vision.</span>
            </h1>
            <p className="text-lg text-on-surface-variant leading-loose max-w-xl">
              For arrangements that transcend our standard directory—international multi-city tours, complex social navigation, or highly specific cultural requirements—our senior concierge team is at your disposal.
            </p>
          </div>

          <div className="space-y-8">
            <BespokeFeature 
              icon={<ShieldCheck size={24} />}
              title="Absolute Discretion"
              description="Privacy is our highest currency. All bespoke requests are handled by a single dedicated agent."
            />
            <BespokeFeature 
              icon={<Star size={24} />}
              title="Global Roster"
              description="Access individuals not listed in our public directory, curated from our private international network."
            />
            <BespokeFeature 
              icon={<MapPin size={24} />}
              title="Complex Itineraries"
              description="From private jets to secure villa arrangements, we manage the logistics of your shared time."
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface-container-low rounded-[40px] p-12 soft-shadow border border-outline-variant/10"
        >
          <h2 className="font-serif text-3xl text-on-surface mb-8">Request Introduction</h2>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InputGroup label="Full Name" placeholder="Hon. Alexander J." />
              <InputGroup label="Preferred City" placeholder="Zurich, Paris, etc." />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Nature of Engagement</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Social Gala', 'International Travel', 'Art & Culture', 'Corporate Support', 'Private Event'].map(type => (
                  <button 
                    key={type} 
                    type="button"
                    className="py-3 px-4 rounded-xl border border-outline-variant/30 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/5 hover:border-primary/30 transition-all text-on-surface-variant"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">The Requirement</label>
              <textarea 
                className="w-full bg-surface-container-lowest border-none rounded-2xl p-6 text-sm focus:ring-1 focus:ring-primary h-40 placeholder:text-on-surface-variant/40 shadow-inner" 
                placeholder="Describe the intellectual and social profile you are seeking..."
              />
            </div>

            <button className="w-full bg-primary text-on-primary py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:opacity-95 active:scale-95 transition-all">
              <Send size={18} />
              Submit to Concierge
            </button>
            <p className="text-center text-[10px] text-on-surface-variant/60 uppercase tracking-widest font-bold">A senior agent will contact you within 60 minutes.</p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

function BespokeFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-xl text-on-surface">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="w-full bg-surface-container-lowest border-none rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40 shadow-inner"
      />
    </div>
  );
}
